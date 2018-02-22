## Accessing the shell

Since this workshop assumes that you have a working knowledge of *bash* and in turn know how to access it on your own computer. If you are not sure, we have this information below.

> **With Macs** use the "**Terminal**" utility. 
> 
> **With Windows** you can use your favorite utility or follow our suggestion of using "**Git BASH**". Git BASH is part of the [Git for Windows](https://git-for-windows.github.io/) download, and is a *bash* emulator.

## The command prompt

Once again, you are likely familiar with what a command prompt is, but to ensure that everyone in the class is on the same page, we have a short description below.

> It is a string of characters ending with `$` after which you enter the command to ask shell to do something. 
>
> The string of charaters before the `$` usually represent information about the computer you are working on and your current directory; e.g. **`[MacBook-Pro-5:~]$`**.

## Downloading data

We will be exploring slightly more advanced capabilities of the shell by working with data from an RNA sequencing experiment. 

> *NOTE: If you attended the [Intro to shell](https://hbctraining.github.io/Training-modules/Intro_shell/) workshop with us last month, you should have already downlaoded this data.*

Before we download the data, let's check the folder we are currently in:

```bash
$ pwd
```

> On a **Mac** your current folder should be something starting with `/Users/`, like `/Users/marypiper/`.
> 
> On a **Windows** machine your current folder should be something starting with `/c/Users/marypiper`. To find this in your File explorer try clicking on PC and navigating to that path.

Once you know to which folder you are downloading your data, right click on the link below:

**Download RNA-Seq data to your working directory:** [right-click here](https://github.com/hbctraining/Training-modules/blob/master/Intro_shell/data/unix_lesson.zip?raw=true) and choose **Save link as** or **Download link as** or the equivalent.

Type the 'list' command to check that you have downloaded the file to the correct location (your present working directory):

```bash
$ ls -l
```

You should see `unix_lesson.zip` as part of the output to the screen.

Now, let's decompress the folder, using the `unzip` command:

```bash
$ unzip unix_lesson.zip 
```

> When you run the unzip command, you are decompressing the zipped folder, just like you would by double-clicking on it outside the Terminal. As it decompresses, you will usually see "verbose output" listing the files and folders being decompressed or inflated.
> 
> ```bash
> 
> Archive:  unix_lesson.zip
>    creating: unix_lesson/
>    creating: unix_lesson/.my_hidden_directory/
>   inflating: unix_lesson/.my_hidden_directory/hidden.txt  
>    creating: unix_lesson/genomics_data/
>    creating: unix_lesson/other/
>   inflating: unix_lesson/other/Mov10_rnaseq_metadata.txt  
>   inflating: unix_lesson/other/sequences.fa  
>    creating: unix_lesson/raw_fastq/
>   inflating: unix_lesson/raw_fastq/Irrel_kd_1.subset.fq  
>   inflating: unix_lesson/raw_fastq/Irrel_kd_2.subset.fq  
>   inflating: unix_lesson/raw_fastq/Irrel_kd_3.subset.fq  
>   inflating: unix_lesson/raw_fastq/Mov10_oe_1.subset.fq  
>   inflating: unix_lesson/raw_fastq/Mov10_oe_2.subset.fq  
>   inflating: unix_lesson/raw_fastq/Mov10_oe_3.subset.fq  
>   inflating: unix_lesson/README.txt  
>    creating: unix_lesson/reference_data/
>   inflating: unix_lesson/reference_data/chr1-hg19_genes.gtf  
> ```

Now, run the `ls` command again. 

```bash
$ ls -l
```

You should see a folder/directory called `unix_lesson`, which means you are all set with the data download! 

Now, let's learn about [using the text editor vim](https://hbctraining.github.io/Intro-to-Shell/lessons/03_vim.html) on the command line interface.
