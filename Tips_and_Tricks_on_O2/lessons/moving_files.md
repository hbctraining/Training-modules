# Moving files on and off the cluster

## Learning Objectives
- Implement `curl` and `wget` to retrieve data from external resources
- Transfer data to and from O2 using `scp` and `rsync`
- Recognize when to implement Globus
- Recall the iGenomes resource on the cluster
- Create symbolic links for within your data

## Downloading external data

When you want to obtain your data from the sequencing facility, it will likely be stored on some remote computer and they will give you login credentials which will allow you to access it. You will then need to copy that over to O2 our your computing cluster of choice so that you can carry out the analysis on it. Next, we will describe the steps that you would need to take to copy files on and off of the cluster.

### `wget`

You will sometimes find yourself wanting to download data from a website. There are two comparable commands that you can use to accomplish this task. The first one is `wget` and the most common syntax for using it is:

```bash
wget [http://www.example.com/data]
```

Let's try to do this in order to download the reference genome for _E. coli_ from NCBI:

```bash
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/005/845/GCA_000005845.2_ASM584v2/GCA_000005845.2_ASM584v2_genomic.fna.gz
```

> Note: If you lose your connection during the download process and would like to resume it midway through, the `-c` will ***c***ontinue the download where it left off:
>```
>wget -c [http://www.example.com/data]
>```

### `curl`

A common alternative to `wget` is `curl` and many purposes they are extremely similiar and which you decide to use is a matter of personal preference. The general syntax is:

```
curl -L -O [http://www.example.com/data]
```

The `-O` option will use the filename given on the website as its filename to write to. Alternatively, if you wanted to name it something different, you can use the `-o` option and then follow it with the preferred name like:

```
curl -L -o preferred_name  [http://www.example.com/data]
```

The `-L` option tells curl to follow any redirections the HTML address gives to the data. For example, webpage might redirect from it's "Download" button to a different page when the data is actually stored. This `-L` option tells `curl` to follow this redirection. In some cases it is need, 

Let's use `curl` to download the *E. coli* gene annotations from NCBI:

```bash
curl -L -O https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/005/845/GCA_000005845.2_ASM584v2/GCA_000005845.2_ASM584v2_genomic.gff.gz
```

> Note: You can also do this exact same task with `wget`. We are just demonstrating `curl` in order to give you an option.

>Lastly, if you connection gets lost midway through a transfer, you can use the `-C` option followed by `-` to resume the download where it left off. For example:
>```
>curl -C - -L -O [http://www.example.com/data]
>```

### `curl` versus `wget`

For many purposes `curl` and `wget` are similar, but there are some small differences:

1) In `curl` you can use the `-O` option multiple times to carry out multiple downloads simulatenously. 

```
curl -L -O [http://www.example.com/data_file_1] -O [http://www.example.com/data_file_2]
```

2) In `wget` you can recursively download a directory (meaning that you also download all subdirectories) with the `-r`. Typically this isn't super useful because the source will typically pack this up all into a compressed package, but nonetheless it is something that `wget` can do that `curl` cannot do.

In general, `curl` has *a bit* more options and flexibility than `wget` but the vast majority, if not all, of those options are ***far*** beyond the scope of this module and for this module it comes down to a personal preference. That being said, as you download data and tools from various sources you may see different developers having different preferences. This is mostly a primer for understanding both of the cases that you will likely run into.

## md5sum

When you are copying files between two locations and you want to ensure the copying went smoothly or are interested to see if two files are the same. Checksums can be thought of as an alphanumeric fingerprint for a file and they are used to ensure that two files are the same. It is common for people/insitutions to provide an list of md5sums for files that are availible to download. `md5sum` is one common checksum. ***Importantly, it is theorectically possible that two different files have the same md5sum, but it is practically nearly impossible.*** The syntax for checking the md5sum of a file is:

```bash
md5sum <file>
```

Let's check the `md5sum` for the *E. coli* reference genome that we downloaded.

```bash
md5sum GCA_000005845.2_ASM584v2_genomic.fna.gz
```

This should hopeful return:

```
7e69874199f23fd21b060dc0b2b72321  GCA_000005845.2_ASM584v2_genomic.fna.gz
```

Now, we can cross-reference this md5sum with the md5sum that [NCBI provides for the file](https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/005/845/GCA_000005845.2_ASM584v2/md5checksums.txt):

```
7e69874199f23fd21b060dc0b2b72321  ./GCA_000005845.2_ASM584v2_genomic.fna.gz
```

If these match you can have confidence that the file download was complete.


## Globus

Perhaps you are working on a project with a collaborator who works in Europe and you want to securely share your data. This task can be quite difficult without one of you distributing your username and password to the other, which would be a security risk, or posting the data publicly where others could download it and thus the data transfer isn't private. This is where [Globus](https://www.globus.org/) comes in. Globus is a file sharing tool for sharing data with between users on different computing clusters. One example of this is that it is sometimes used with retrieving sequencing data from sequencing cores.

At Harvard, Globus can be used for:

- Providing secure access to individual directories on O2 for collaborators outside of Harvard/HMS
- HMS credentials or O2 user accounts are not required for the collaborators when using Globus
- HMS-RC offers periodic information sessions on Globus

HMS-RC's information page on Globus can be found [here](https://harvardmed.atlassian.net/wiki/spaces/O2/pages/2046689281/Using+Globus+on+O2) and for the purposes of this module we won't dive anymore into it, but it is important to know that this tool exists, particularly when collaborating with researchers who don't have HMS creditials.

## Copying files to and from the cluster

Alternatively, when you have analyzed your data you may have some files that you would like to download from the cluster. You can use a program like [Filezilla](https://filezilla-project.org/) to copy over files from a computing cluster to your local machine, but there are other ways to do so using the command-line interface. 

### `scp`

Similar to the `cp` command to copy there is a command that allows you to **securely copy files between computers**. The command is called `scp` and allows files to be copied to, from, or between different hosts. It uses `ssh` for data transfer and provides the same authentication and same level of security as `ssh`. It is really important that when you are transfer data using `scp` or `rsync` (discussed next), that you utilize the transfer nodes for your file transfer. The transfer nodes have the address of:

```
username@transfer.rc.hms.harvard.edu
```

In the usage example below, the first argument is the **location on the remote server** and the second argument is the **destination on your local machine**. **Importantly, you the Terminal window you are using can't be connected to O2.**

> *You can also do this in the opposite direction by swapping the arguments.*

```bash
# DO NOT RUN
# Usage example for how to use scp
scp username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2 Path/to/directory/local_machine
```

Let's try copying over the *E. coli* reference genome that we download from NCBI from our scratch space to our local machine. **In a new terminal window**, type:

```bash
# Be sure to replace username twice with your O2 username and first_letter_of_username with the first letter of your username
scp username@transfer.rc.hms.harvard.edu:/n/scratch/users/first_letter_of_username/username/GCA_000005845.2_ASM584v2_genomic.fna.gz  .
```

Now see that the file has transferred over:

```bash
$ ls GCA_000005845.2_ASM584v2_genomic.fna.gz
```

> **NOTE:** Windows users may encounter a permissions error when using `scp` to copy over locally. We are not sure how to troubleshoot this, but will update materials as we obtain more information.

### `rsync` 

`rsync` is used to copy or synchronize data between directories. It has many advantages over `cp`, `scp` etc. It works in a specific direction, i.e. from the first directory **to** the second directory, similar to `cp`.

**Salient Features of `rsync`**

* If the command (or transfer) is interrupted, you can start it again and *it will restart from where it was interrupted*.
* Once a folder has been synced between 2 locations, the next time you run `rsync` it will *only update and not copy everything over again*. 
* It runs a check to ensure that every file it is "syncing" over is the exact same in both locations. This check is run using a version of [checksum](https://en.wikipedia.org/wiki/Checksum) which ensures the data integrity during the data transfer process. 

### Between different machines

When copying over large datasets to or from a remote machine, `rsync` works similarly to `scp`. This time we are going to copy the reference genome back onto the cluster using `rsync`.

```bash
# Be sure to replace username with your username
rsync -av -e ssh GCA_000005845.2_ASM584v2_genomic.fna.gz username@transfer.rc.hms.harvard.edu:~
```

* `a` is for archive - means it preserves permissions (owners, groups), times, symbolic links, and devices.
* `v` is for verbosity - means that it prints on the screen what is being copied
* `-e ssh` is for encryption - means that we want to use the ssh protocol for encryption of the file transfer

We should now be able to see that the reference genome has been uploaded to O2 by using `ls` on our home directory on our Terminal window that is connected to O2:

```bash
ls ~
```

>Note: We could have also done this task with `scp`:
>```bash
>scp GCA_000005845.2_ASM584v2_genomic.fna.gz username@transfer.rc.hms.harvard.edu:~
>```
>
>And we could have also downloaded the file to our local machine with `wget` using:
>
>```bash
>rsync -av -e ssh username@transfer.rc.hms.harvard.edu:/n/scratch/users/first_letter_of_username/username/GCA_000005845.2_ASM584v2_genomic.fna.gz  .
>```

*More helpful information and examples using rsync can be found [at this link](https://www.comentum.com/rsync.html)*

### Exercise

Check the `md5sum` for the `GCA_000005845.2_ASM584v2_genomic.fna.gz`. Does it match the `md5sum` on the NCBI website for this file? 


### iGenome

Another O2 quality-of-life feature is that HMS-RC has a directory called `/n/shared_db/igenome/03032016/` which holds reference genomes, alignment indexes, annotation files and much more for many common model organisms. Therefore, oftentimes you don't even need to download many of the files that you will need to do any analysis.

### Exercise

Navigate to the `/n/shared_db/igenome/03032016/` directory and see if you can find the organism that you study there.

***

Let's explore the human reference by:

```bash
cd /n/shared_db/igenome/03032016/Homo_sapiens/UCSC/hg38/
ls -l
```

We can we see that there are two directories:

```bash
total 0
drwxrwxr-x 2 ld32 ritg 4096 Aug 18  2015 Annotation
drwxrwxr-x 2 ld32 ritg 4096 Oct 16  2019 Sequence
```

Let's further go into the `Seqeunce` directory:

```bash
cd Sequence
ls -l
```

From here we can see that this hold directories containing indices for Bowtie, Bowtie2 and STAR aligners, as well as the whole genome reference sequence. 

```bash
total 0
drwxrwxr-x 2 ld32 ritg 4096 Aug 18  2015 AbundantSequences
drwxrwxr-x 2 ld32 ritg 4096 Aug 18  2015 Bowtie2Index
drwxrwxr-x 2 ld32 ritg 4096 Aug 18  2015 BowtieIndex
drwxrwxr-x 2 ld32 ritg 4096 Aug 18  2015 BWAIndex
drwxrwxr-x 2 ld32 ritg 4096 May 14  2020 Chromosomes
drwxrwxr-x 2 ld32 ritg 4096 Oct 16  2019 star2.5.4a
drwxrwxr-x 2 ld32 ritg 4096 Jul 12  2020 WholeGenomeFasta
```

We can look inside of the `WholeGenomeFasta`:

```bash
ls -l WholeGenomeFasta
```

And see:

```bash
total 3087891
-rwxrwxr-x 1 ld32  ritg      32798 Aug 18  2015 genome.dict
-rwxrwxr-x 1 ld32  ritg 3161924569 Aug 18  2015 genome.fa
-rw-rw-r-- 1 ak150 ritg       7802 Jul 12  2020 genome.fa.fai
-rwxrwxr-x 1 ld32  ritg      34045 Aug 18  2015 GenomeSize.xml
```

The genome FASTA file is here `genome.fa`, along with a dictionary (genome.dict), FASTA index (genome.fa.fai) and genome size XML (GenomeSize.xml). 

Let's take a brief look at the `Bowtie2Index` directory:

```bash
ls -l Bowtie2Index
```

The contents of this directory might seem mostly normal at first glance:

```bash
total 4068535
-rwxrwxr-x 1 ld32 ritg 982504890 Aug 18  2015 genome.1.bt2
-rwxrwxr-x 1 ld32 ritg 733719120 Aug 18  2015 genome.2.bt2
-rwxrwxr-x 1 ld32 ritg     10880 Aug 18  2015 genome.3.bt2
-rwxrwxr-x 1 ld32 ritg 733719113 Aug 18  2015 genome.4.bt2
lrwxrwxrwx 1 ld32 ritg        29 Aug 18  2015 genome.fa -> ../WholeGenomeFasta/genome.fa
-rwxrwxr-x 1 ld32 ritg 982504890 Aug 18  2015 genome.rev.1.bt2
-rwxrwxr-x 1 ld32 ritg 733719120 Aug 18  2015 genome.rev.2.bt2
```

It moslty just indices for Bowtie2 (files ending in .bt2), but there is a particular file of interest here:

```bash
lrwxrwxrwx 1 ld32 ritg        29 Aug 18  2015 genome.fa -> ../WholeGenomeFasta/genome.fa
```

This is the first place we have now seen a symbolic link. `genome.fa` is the link name and it is pointing, with a relative path, to the reference genome FASTA file that we were just looking at (../WholeGenomeFasta/genome.fa). We are going to talk more about symbolic links, sometimes called symlinks, in the next section.

## Symbolic Links

Sometimes you will have large files on a computing cluster that you would like to have in a few places. A few cases where this might happen:

1) The software package you are using wants you to have a specific directory structure for the data
2) While this isn't as much of a concern on O2 since data in `home` and the `data` directories are backed up regularly, you may be on a computing cluster without such rigorous data back-up practices. If this the case, you might like to have your data in two locations in case the original data is accidentally deleted.

Both of these are good places to implement *symbolic links*. Symbolic links can be thought of as arrows for computer, pointing to where a file is located, as we saw in the above example with the human reference genome. Symbolic links require negliable amounts of space and thus mean you can use them to point to large files elsewhere on the computing system. If these symbolic links get deleted or broken, they have no impact on the data they they were pointing to. Additionally, they can be named anything, so it can be helpful if a software package is looking for a specific name for an input file.

Let's go ahead and make our own symbolic link. First, navigate to our `home` directory:

```bash
cd ~
```

The syntax for making a symbolic link is:

```
ln -s <file_to_be_linked_to> <link_name>
```

Assume we we want to make a symbolic link to our compressed *E. coli* reference annotation that we had downloaded to the `scratch` space and we are going to call it `E_coli.gff.gz`. We could do that:

```
ln -s /n/scratch/users/${USER:0:1}/${USER}/GCA_000005845.2_ASM584v2_genomic.gff.gz E_coli.gff.gz
```

When you now view this directory with `ls -l`, it will display the link like:

```
E_coli.gff.gz -> /n/scratch/users/w/wig051/GCA_000005845.2_ASM584v2_genomic.gff.gz
```

If you want to keep the current name you can use `.` for `<link name>`.

***Importantly, if the original file is deleted or moved, the symbolic link will become broken.*** It is common on many distributions for symbolic links to blink if they becomes broken.

> Note: The `-s` option is necessacary for creating a symbolic link. Without the `-s` option, a ***hard link*** is created and modifications to the linked file will be carried over to the original. Generally, speaking hard links are typically not very common.

***

[Next Lesson >>](job_managment.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

