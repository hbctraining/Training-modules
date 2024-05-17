---
title: "Moving files on and off the cluster"
author: "Will Gammerdinger, Heather Wick, Meeta Mistry"
---

## Learning Objectives
- Implement `curl` and `wget` to retrieve data from external resources
- Transfer data to and from O2 using `scp` and `rsync`
- Recognize when to implement Globus
- Recall the iGenomes resource on the cluster
- Create symbolic links

## Overview/quick links

* [Dowloading data using `wget` or `curl`](#dlext)
* [Checking file transfer success with md5sum](#md5sum) 
* [Copying files to and from the cluster with `scp` and `rsync`](#scprsync)
* [Securely sharing data across clusters with Globus](#globus)
* [O2 shared reference files (iGenome)](#igenome)
* [Symbolic links](#symlinks)

## Moving files on and off the cluster

A common question is **how do I get my data on to the cluster?**  

Depending on the analysis you are performing, the data you want could be located:

* On another cluster or server where your sequencing facility hosts the data
* On your own local machine
* Public data that is accessible via a web resource

Next, we will introduce you to commands that help you copy files on and off of the cluster, in addition to some helpful ways of working with files that currently reside on the cluster.

## Downloading external data using `wget` or `curl` <a name="dlext"></a>

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

### Checking file transfer success with md5sum <a name="md5sum"></a>

When you are copying files between two locations and you want to ensure the copying went smoothly or are interested to see if two files are the same. Checksums can be thought of as an alphanumeric fingerprint for a file and they are used to ensure that two files are the same -- in other words, you can ensure that the file you downloaded did not get truncated or corrupted during the download. It is common for people/insitutions to provide a list of md5sums for files that are availible to download. `md5sum` is one common checksum. ***Importantly, it is theorectically possible that two different files have the same md5sum, but it is practically nearly impossible.*** The syntax for checking the md5sum of a file is:

```bash
md5sum <file>
```

Let's check the `md5sum` for the *E. coli* reference genome that we downloaded.

```bash
md5sum GCA_000005845.2_ASM584v2_genomic.fna.gz
```

This should hopefully return:

```
7e69874199f23fd21b060dc0b2b72321  GCA_000005845.2_ASM584v2_genomic.fna.gz
```

Now, we can cross-reference this md5sum with the md5sum that [NCBI provides for the file](https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/005/845/GCA_000005845.2_ASM584v2/md5checksums.txt):

```
7e69874199f23fd21b060dc0b2b72321  ./GCA_000005845.2_ASM584v2_genomic.fna.gz
```

**If these match you can have confidence that the file download was complete.**

***

**Exercise**

1. Check the `md5sum` for the `GCA_000005845.2_ASM584v2_genomic.gff.gz`. Does it match the `md5sum` on the NCBI website for this file? 

***


## Copying files to and from the cluster <a name="scprsync"></a>

It is really important that when you are transferring data using `scp` or `rsync` (discussed next), that you **utilize the transfer nodes** for your file transfer. The transfer nodes have the address of:

```bash
username@transfer.rc.hms.harvard.edu
```

* If you are **on the cluster** and you want to move/copy files off to a remote location, be sure that you are logged in to the **transfer node**.
* If you are **at a remote location** and wanting to move/copy the files from the cluster to your current location you will want to include the transfer node in your command as displayed below. We will describe this in more detail later in the section. Importantly, you the **Terminal window** you are using **can't be connected to O2.**

### `scp`

Similar to the `cp` command to copy there is a command that allows you to **securely copy files between computers**. The command is called `scp` and allows files to be copied to, from, or between different hosts. It uses `ssh` for data transfer and provides the same authentication and same level of security as `ssh`.

```bash
# DO NOT RUN
# Usage example for scp to copy a file on O2 to your local machine
scp username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2 Path/to/directory/local_machine
```

Let's try copying over the *E. coli* reference genome that we downloaded from NCBI **from our scratch space on O2 to our local machine**. 

First open up a **new terminal** window, that is **not connected to O2.**

```bash
# Be sure to replace `<username>` twice with your O2 username and `<first_letter_of_username>` with the first letter of your username
scp username@transfer.rc.hms.harvard.edu:/n/scratch/users/<first_letter_of_username>/<username>/GCA_000005845.2_ASM584v2_genomic.fna.gz  .
```

You will be prompted for your password and silently prompted by approval for Duo. Now see that the file has transferred over:

```bash
$ ls GCA_000005845.2_ASM584v2_genomic.fna.gz
```

> **NOTE:** Windows users may encounter a permissions error when using `scp` to copy over locally. We are not sure how to troubleshoot this, but will update materials as we obtain more information.

> #### From local machine to the O2 cluster using `scp`
> If you wanted to do the reverse, you will need to indicate the transfer node in your destinatation argument as show below:
> 
>```bash
> ### DO NOT RUN
>scp GCA_000005845.2_ASM584v2_genomic.fna.gz username@transfer.rc.hms.harvard.edu:~
>```

### `rsync` 

`rsync` is used to **copy or synchronize data between directories**. This can be on/off the cluster or within the cluster filesystem. It has many advantages over `cp`, `scp` etc. 

**Salient Features of `rsync`**

* If the command (or transfer) is interrupted, you can start it again and *it will restart from where it was interrupted*.
* Once a folder has been synced between 2 locations, the next time you run `rsync` it will *only update and not copy everything over again*. 
* It runs a check to ensure that every file it is "syncing" over is the exact same in both locations. This check is run using a version of [checksum](https://en.wikipedia.org/wiki/Checksum) which ensures the data integrity during the data transfer process. 


When copying over large datasets to or from a remote machine, `rsync` works similarly to `scp` as shown below. This time we are going to **copy the reference genome back onto the cluster using `rsync`**.

```bash
# DO NOT RUN
# Usage example for ryncs to copy a file on local machine to O2 using rsync
rsync -av - e ssh Path/to/directory/local_machine username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2
```

Let's first change the name of our file so we can distinguis it from the file that is already present on O2. **In your Terminal window that you were using with the `scp` example above, type in:**

```bash
mv GCA_000005845.2_ASM584v2_genomic.fna.gz renamed_GCA_000005845.2_ASM584v2_genomic.fna.gz
```

```bash
# Be sure to replace <username> with your username
rsync -av -e ssh renamed_GCA_000005845.2_ASM584v2_genomic.fna.gz <username>@transfer.rc.hms.harvard.edu:~
```

* `a` is for archive - means it preserves permissions (owners, groups), times, symbolic links, and devices.
* `v` is for verbosity - means that it prints on the screen what is being copied
* `-e ssh` is for encryption - means that we want to use the ssh protocol for encryption of the file transfer

You will again be prompted for your password and Duo approval. We should now be able to see that the newly named reference genome has been uploaded to O2 by using **`ls` in the Terminal window that is connected to O2**:

```bash
ls ~
```

*More helpful information and examples using rsync can be found [at this link](https://www.comentum.com/rsync.html)*

> ### A file transfer alternative without using the command line interface
> If you have a few fairly small files to move on/off the cluster, you can also use a program like [Filezilla](https://filezilla-project.org/) to copy over files. It is not recommended for larger files or big datasets as it can timeout and cause issues. Note that here the transfer nodes are also required.


## Securely sharing data across clusters with Globus <a name="globus"></a>

<img src="../img/logo_globus-solid.svg" width="200" align="center">

Perhaps you are working on a project with a collaborator who works in Europe and you want to securely share your data. This task can be quite difficult without one of you distributing your username and password to the other, which would be a security risk, or posting the data publicly where others could download it and thus the data transfer isn't private. This is where [Globus](https://www.globus.org/) comes in. Globus is **a file sharing tool for sharing data with between users on different computing clusters**. One example of this is that it is sometimes used with retrieving sequencing data from sequencing cores.

At Harvard, Globus can be used for:

- Providing secure access to individual directories on O2 for collaborators outside of Harvard/HMS
- HMS credentials or O2 user accounts are not required for the collaborators when using Globus
- HMS-RC offers periodic information sessions on Globus

HMS-RC's information page on Globus can be found [here](https://harvardmed.atlassian.net/wiki/spaces/O2/pages/2046689281/Using+Globus+on+O2) and for the purposes of this module we won't dive anymore into it, but it is important to know that this tool exists, particularly when collaborating with researchers who don't have HMS creditials.


## O2 shared reference files (iGenome) <a name="igenome"></a>

Another O2 quality-of-life feature is that HMS-RC has a directory called `/n/shared_db/igenome/03032016/` which holds reference genomes, alignment indexes, annotation files and much more for many common model organisms. Therefore, oftentimes you don't even need to download many of the reference files that you will need for your analysis.

***

**Exercise**

1. Navigate to the `/n/shared_db/igenome/03032016/` directory and see if you can find the organism that you study there.

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

This is the **first place we have now seen a symbolic link**. `genome.fa` is the link name and it is pointing, with a relative path, to the reference genome FASTA file that we were just looking at (../WholeGenomeFasta/genome.fa). We are going to talk more about symbolic links, sometimes called symlinks, in the next section.

## Symbolic Links <a name="symlinks"></a>

Sometimes you will have files or folders containing files on a computing cluster that you would like to have in a few places. A few examples where this might happen:

1) The software package you are using wants you to have a specific directory structure for the data, but you do not want to move the data.
2) There is a large file that is used as input to many different analyses and you would rather not have duplicate copies of it.

Both of these are good places to implement *symbolic links*. Symbolic links can be thought of as arrows for computer, pointing to where a file or folder is located, as we saw in the above example with the human reference genome. Symbolic links require negliable amounts of space and thus mean you can use them to point to large files elsewhere on the computing system. If these symbolic links get deleted or broken, they have no impact on the data they they were pointing to. Additionally, they can be named anything, so it can be helpful if a software package is looking for a specific name for an input file.

Let's go ahead and make our own symbolic link. First, navigate to our `home` directory:

```bash
cd ~
```

The syntax for making a symbolic link is:

```bash
ln -s </path/to/file_to_be_linked_to> </path/to/link_name>
```

Assume we we want to make a symbolic link to our compressed *E. coli* reference annotation that we had downloaded to the `scratch` space and we are going to call it `E_coli.gff.gz`. We could do that:

```
ln -s /n/scratch/users/${USER:0:1}/${USER}/GCA_000005845.2_ASM584v2_genomic.gff.gz E_coli.gff.gz
```

When you now view this directory with `ls -l`, it will display the link like:

```
E_coli.gff.gz -> /n/scratch/users/w/wig051/GCA_000005845.2_ASM584v2_genomic.gff.gz
```

If you want to keep the original file name as the link name you can use just the path to where the symbolic link will be created and not include a new `<link_name>`. Since we are putting the link in our current directory, we can use `.`.

***Importantly, if the original file or folder is deleted or moved, the symbolic link will become broken.*** It is common on many distributions for symbolic links to blink if they becomes broken.

> **NOTE**: The `-s` option is necessacary for creating a symbolic link. Without the `-s` option, a ***hard link*** is created and modifications to the linked file will be carried over to the original. Generally, speaking hard links are typically not very common.

### Removing symbolic links

Sometimes, you will no longer need a symbolic link -- maybe the original file has been deleted or moved, rendering the link broken, or you are restructuring your directory. You can remove a symbolic link just as you would remove a file or directory, and it will not delete the original file:

```
rm E_coli.gff.gz
```

You can check to see for yourself that the original file was not deleted:

```
ls /n/scratch/users/w/wig051/GCA_000005845.2_ASM584v2_genomic.gff.gz
```
> Note: to remove a symbolic link to a directory, you will need to use `rm -r <symbolic_link>`. **Be very careful that you are in the directory that contains the symbolic link and not in the directory that contains the original directory, or you will delete the entire contents of the original directory!**

***

[Next Lesson >>](job_managment.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

