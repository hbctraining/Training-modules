
# Arrays in Slurm

When I am working on large data sets my mind often drifts back to an old Simpsons episode. Bart is in France and being taught to pick grapes. They show him a detailed technique and he does it successfully. Then they say:


<p align = "center">
<img src="../img/simpsons.gif">
</p>
     
<p align = "center">
We've all been here
</p>

A pipeline or process may seem easy or fast when you have 1-3 samples but totally daunting when you have 50. When scaling up you need to consider file overwriting, computational resources, and time.

One easy way to scale up is to use the array feature in slurm.

## What is a job array?

Atlassian says this about job arrays on O2: "Job arrays can be leveraged to quickly submit a number of similar jobs. For example, you can use job arrays to start multiple instances of the same program on different input files, or with different input parameters. A job array is technically one job, but with multiple tasks." [link](https://harvardmed.atlassian.net/wiki/spaces/O2/pages/1586793632/Using+Slurm+Basic#Job-Arrays).

Array jobs run simultaneously rather than one at a time which means they are very fast! Additionally, running a job array is very simple!  

```bash
sbatch --array=1-10 my_script.sh
```

This will run my_script.sh 10 times with the job IDs 1,2,3,4,5,6,7,8,9,10

We can also put this directly into the bash script itself (although we will continue with the command line version here.
```bash
$SBATCH --array=1-10
```

We can specify any job IDs we want.

```bash
sbatch --array=1,7,12 my_script.sh
```
This will run my_script.sh 3 times with the job IDs 1,7,12

Of course we don't want to run the same job on the same input files over and over, that would be pointless. We can use the job IDs within our script to specify different input or output files. In bash the job id is given a special variable `${SLURM_ARRAY_TASK_ID}`


## How can I use ${SLURM_ARRAY_TASK_ID}?

The value of `${SLURM_ARRAY_TASK_ID}` is simply job ID. If I run 

```bash
sbatch --array=1,7 my_script.sh
```
This will start two jobs, one where `${SLURM_ARRAY_TASK_ID}` is 1 and one where it is 7

There are several ways we can use this. If we plan ahead and name our files with these numbers (e.g., sample_1.fastq, sample_2.fastq) we can directly refer to these files in our script: `sample_${SLURM_ARRAY_TASK_ID}.fastq` However, using the ID for input files is often not a great idea as it means you need to strip away most of the information that you might put in these names.

Instead we can keep our sample names in a separate folder and use [awk](awk.md) to pull the file names. 

here is our complete list of long sample names which is found in our file `samples.txt`:

```
DMSO_control_day1_rep1
DMSO_control_day1_rep2
DMSO_control_day2_rep1
DMSO_control_day2_rep2
DMSO_KO_day1_rep1
DMSO_KO_day1_rep2
DMSO_KO_day2_rep1
DMSO_KO_day2_rep2
Drug_control_day1_rep1
Drug_control_day1_rep2
Drug_control_day2_rep1
Drug_control_day2_rep2
Drug_KO_day1_rep1
Drug_KO_day1_rep2
Drug_KO_day2_rep1
Drug_KO_day2_rep2
```

If we renamed all of these to 1-16 we would lose a lot of information that may be helpful to have on hand. If these are all sam files and we want to convert them to bam files our script could look like this

```bash

file=$(awk -v  awkvar="${SLURM_ARRAY_TASK_ID}" 'NR==awkvar' samples.txt)

samtools view -S -b ${file}.sam > ${file}.bam

```

Since we have sixteen samples we would run this as 

```bash
sbatch --array=1-16 my_script.sh
```

So what is this script doing? `file=$(awk -v  awkvar="${SLURM_ARRAY_TASK_ID}" 'NR==awkvar' samples.txt)` pulls the line of `samples.txt` that matched the job ID. Then we assign that to a variable called `${file}` and use that to run our command.

Job IDs can also be helpful for output files or folders. We saw above how we used the job ID to help name our output bam file. But creating and naming folders is helpful in some instances as well. 

```bash

file=$(awk -v  awkvar="${SLURM_ARRAY_TASK_ID}" 'NR==awkvar' samples.txt)

PREFIX="Folder_$SLURM_ARRAY_TASK_ID"
     mkdir $PREFIX
        cd $PREFIX2

samtools view -S -b ${file}.sam > ${file}.bam

```    

This script differs from our previous one in that it makes a folder with the job ID (Folder_1 for job ID 1) then moves inside of it to execute the command. Instead of getting all 16 of our bam files output in a single folder each of them will be in its own folder labled Folder_1 to Folder_16. 

**NOTE** That we define `${file}` BEFORE we move into our new folder as samples.txt is only present in the main directory. 






