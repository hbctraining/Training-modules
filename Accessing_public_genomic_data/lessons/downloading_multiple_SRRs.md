# Downloading multiple SRRs

Since most (good) studies include multiple samples and a high number of replicates, it is useful to know how to download all the sequencing runs from all samples in a study, without having to hunt down and type in individual SRR numbers one by one. Using the study accession number as previously shown, we can navigate to the summary page for the study. 

<img src="../img/mov10_geo.png" width="600">

Towards the bottom of the page you will find a link for "SRA" under the heading "Relations".

<img src="../img/sra_relations.png" width="600">

Clicking on this link takes you to a page that lists all the biological samples for the study - each with a link to their specific runs and files. If we were only interested in one sample, we could follow the relevant link and find its runs. But generally we want the files for all samples and their replicates, and to find this in one comprehensive list, we use the **run selector**. Navigate to the bottom of the page and click "send to" and click the radio button for "run relector", and then press "go".

<img src="../img/send_to_run_selector.png" width="600">

#Run selector
You'll notice that the run selector has aggregated all the information for the study samples, including a table of metadata at the top, giving information on: **LibraryLayout** (whether the reads were sequenced using single or paired end sequencing), **Platform** (which sequencing technology was used) and other useful information that should be noted for downstream analysis.

<img src="../img/run_table.png" width="600">

Below this there is also a summary line detailing the total number of runs in the study, and the option to download the RunInfoTable or Accession List, in text format. The RunInfoTable is a very useful text summary of all metadata for all runs in the study, and the Accession List is a list of all the SRR accession numbers for the study.

Also on this page is a listing of each run and the corresponding sample it came from, as well as its associated metadata. This table is useful in that each row is "clickable", which allows you to select a subset of runs that you may be interested in. You'll notice that clicking a subset of runs spawns a new download option - a RunInfoTable & Accession List that is only relevant to your chosen subset.

Download the Accession list for the data you are interested in to your desktop (everything included by default). Copy it to the server using the following command:

```bash
$ scp /path/on/your/computer/to/list_of_SRRs.txt yourusername@hms.harvard.edu:/n/scratch2/yourusername/
```

Now we have what we need to run a fastq-dump for all of the SRRs we want

>**NOTE:**
>Sometimes, when referencing/reproducing a published paper, the relevant samples under study are given as sample numbers (GSM numbers), not SRRs, and sometimes belong to different GEO datasets (eg: different parts of a series, or separate datasets for case and control experiments). If this is the case, download the RunInfoTables for each of the relevant studies as shown, cut both the SRR and GSM columns from each RunInfo file, and append these to a single list using the following command:
>```bash
>$ cut -f5,8 RunInfoTable.txt >> full_list_SRR__GSM.txt
>```
>Then, download this python script, which will map the list of GSM numbers from the paper, to a list of corresponding SRRs for the sample subset.
Run the script locally using:
>```bash
>$ python find_SRRs.py
>```

#Parallelizing the SRR download
Unfortunately, since the SRA-toolkit doesn't have its own methods for downloading multiple SRR files at once in parallel, we've written a script (or two) to do this for you. The first script is a loop, which goes through your list of SRR's, and calls a second script at each iteration, passing it an SRR number in the list.

```bash
$ vim sra_fqdump.sh
```
```bash
#!/bin/bash
#SBATCH -t 0-10:00       # Runtime
#SBATCH -p short            # Partition (queue)
#SBATCH -J your_job_name             # Job name
#SBATCH -o run.o             # Standard out
#SBATCH -e run.e             # Standard error
#SBATCH --cpus-per-task=1    # CPUs per task
#SBATCH --mem-per-cpu=8G     # Memory needed per core
#SBATCH --mail-type=NONE      # Mail when the job ends
#SBATCH --mail-user=youremailaddress@hsph.harvard.edu

module load sratoolkit/2.8.1

#while there are lines in the list of SRRs file
while read p
do
#call the bash script that does the fastq dump, passing it the SRR number next in file
sbatch inner_script.sh $p
done <list_of_SRRs.txt
```
The script that is called inside the loop (inner_script.sh) is the one that takes the given SRR number and runs fastq-dump on it:

```bash
$ vim inner_script.sh
```

```bash
#!/bin/bash
#SBATCH -t 0-10:00       # Runtime
#SBATCH -p short            # Partition (queue)
#SBATCH -J your_job_name             # Job name
#SBATCH -o run.o             # Standard out
#SBATCH -e run.e             # Standard error
#SBATCH --cpus-per-task=1    # CPUs per task
#SBATCH --mem-per-cpu=8G     # Memory needed per core
#SBATCH --mail-type=NONE      # Mail when the job ends
#SBATCH --mail-user=youremailaddress@hsph.harvard.edu

#for single end reads only
fastq-dump $1
```

In this way (by calling a script within a script) we will start a new job for each SRR download, and in this way download all the files at once in parallel -- much quicker than if we had to wait for each one to run sequentially. To run the main script:

```bash
$ sbatch sra_fqdump.sh
```

#Paired end files
An important thing to note before you start the download of your files, is the **LibraryLayout** information (found in the RunInfoTable) - ie: whether your data is single or paired end. Unlike the standard format for paired end data, where we normally find two fastq files labelled as sample1_001.fastq and sample1_002.fastq, SRR files can be very misleading in that even paired end reads are found in one single file, with sequence pairs concatenated alongside each other. Because of this format, paired files need to be split at the download step. SRA toolkit has an option for this called "--split-files". By using this, one single SRR file will download as SRRxxx_1.fastq and SRRxxx_2.fastq.

Furthermore, there is a very helpful improvement on this function called "--split-3" which splits your SRR into 3 files: one for read 1, one for read 2, and one for any orphan reads (ie: reads that aren't present in both files). This is important for downstream analysis, as some aligners require your paired reads to be in sync (ie: present in each file at the same line number) and orphan reads can throw this order off. Change the inner_script.sh as follows if your reads are paired end:

```bash
#!/bin/bash
#SBATCH -t 0-10:00       # Runtime
#SBATCH -p short            # Partition (queue)
#SBATCH -J you_job_name             # Job name
#SBATCH -o run.o             # Standard out
#SBATCH -e run.e             # Standard error
#SBATCH --cpus-per-task=1    # CPUs per task
#SBATCH --mem-per-cpu=8G     # Memory needed per core
#SBATCH --mail-type=NONE      # Mail when the job ends
#SBATCH --mail-user=youremailaddress@hsph.harvard.edu

#splits paired read sra files into two normal fastq files plus a third for any orphaned reads, to keep paired files in sync
fastq-dump --split-3  $1
```

#Bypassing storage issues
Another important consideration when downloading large datasets to the server, is the maximum storage limit in your location. If you are downloading files to your home directory, the maximum allowed storage is 100GB. This can be a problem when downloading tens or hundreds of fastq files, as SRA-toolkit does not download the fastq files directly but writes an intermediate (equally large) cache file first, which is not removed. Because of this, you may run into storage errors very quickly, and will notice your files not downloading completely, and storage errors writing to your run.e error file. If this is the case, the scratch space on O2 (/n/scratch2) is a location with much greater storage (12TB limit), and a better place to run large downloads. However, the cache files that SRA-toolkit writes, are automatically directed to your home directory by default, even if you are working elsewhere. Because of this, we need to write a short configuration file to tell SRA-toolkit to write its cache files to the scratch space, instead of our home.

```bash
#navigate to your scratch space (replace 'username' with your username)
cd /n/scratch2/username

#make a directory for ncbi configuration settings
mkdir -p ~/.ncbi
#write configuration file with a line that redirects the cache
echo '/repository/user/main/public/root = "/n/scratch2/username/sra-cache"' > ~/.ncbi/user-settings.mkfg
```