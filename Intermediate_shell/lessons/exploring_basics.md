---
title: "The Shell"
author: "Sheldon  McKay, Mary Piper, Radhika Khetani"
date: "August 7, 2017"
---

## Learning Objectives
- Review basic commands in shell

## The basics

```bash
$ ls -l ~/unix_lesson

$ cd ~/unix_lesson

$ ls -l
```

> 'cd' = 'change directory'
>
> `ls` = 'list' and it lists the contents of a directory.
>
> The `-l` argument modifies the default output of `ls` and gives a lot more information (long listing)

**Wildcards**

The '*' character is a "wildcard" and is a shortcut for "everything". Thus, if you enter `ls *.sh`, you will see all the files in a given directory ending in `.sh`. 

Now try these commands:

```bash
$ ls -l */

$ ls raw_fastq/M*fq

$ ls raw_fastq/M*1*fq

$ ls raw_fastq/M*1.*fq
```

> An asterisk/star is only one of the many wildcards in UNIX, but this is the most powerful one.

**Tab completion**

```bash
$ ls raw_fastq/Mov10_oe_<tab><tab>
```

When you hit the first tab, nothing happens. The reason is that there are multiple files that start with `Mov10_oe_`. Thus, the shell does not know which one to fill in. When you hit tab again, the shell will list the possible choices.

> **Tab completion is your friend!** It helps prevent spelling mistakes, and speeds up the process of typing in the full command.

**Examining Files**

We now know how to move around the file system and look at the contents of directories, but how do we look at the contents of files?

The easiest way to examine a file is to just print out all of the contents using the command `cat`. Print the contents of `unix_lesson/other/sequences.fa` by entering the following command:

```bash
$ cat other/sequences.fa
```

This prints out the all the contents of `sequences.fa` to the screen.

`cat` is a terrific command, but when the file is really big, it can be annoying to use. The command, `less`, is useful for this case. Let's take a look at the raw_fastq files. These files are quite large, so we probably do not want to use the `cat` command to look at them. 

```bash
less raw_fastq/Mov10_oe_1.subset.fq
```

Please note that FASTQ files have four lines of data associated with each sequenced "read", or each record in the output from the sequencer. There a header line, followed by the nucleotide sequence, similar to a FASTA file, but in addition there is additional information which corresponds to the sequencing quality for each nucleotide. 

<span class="caption">Shortcuts for `less`</span>

| key              | action                 |
| ---------------- | ---------------------- |
| <kbd>SPACE</kbd> | to go forward          |
| <kbd>b</kbd>     | to go backwards        |
| <kbd>g</kbd>     | to go to the beginning |
| <kbd>G</kbd>     | to go to the end       |
| <kbd>q</kbd>     | to quit                |


The commands  `head` and `tail` offer another way to look at files, and in this case, just look at part of them. This can be particularly useful if we just want to see the beginning or end of the file, or see how it's formatted.

```bash
$ head raw_fastq/Mov10_oe_1.subset.fq

$ head -n 4 raw_fastq/Mov10_oe_1.subset.fq
```

```bash
$ tail -n 8 raw_fastq/Mov10_oe_1.subset.fq
```

The `-n` option to either of these commands can be used to print the first or last `n` lines of a file. To print the first/last line of the file use:

**Searching within files**

Suppose we want to see how many reads in our file `Mov10_oe_1.subset.fq` are "bad", with 10 consecutive Ns (`NNNNNNNNNN`).

```bash
$ cd ~/unix_lesson/raw_fastq

$ grep NNNNNNNNNN Mov10_oe_1.subset.fq
```

Since each record in the FASTQ file is four lines and the second line is the sequence, we can use the `-B` and `-A` arguments for `grep` to return the matched line plus one before (`-B1`) and two lines after (`-A2`).

```bash
$ grep -B 1 -A 2 NNNNNNNNNN Mov10_oe_1.subset.fq
```

**Redirection**

We've identified reads that don't look great and we want to capture them in a new file. We can do that with something called "redirection". The idea is that we're redirecting the output from the terminal (all the stuff that went whizzing by) to something else. In this case, we want to print it to a file, so that we can look at it later.

```bash
$ grep -B 1 -A 2 NNNNNNNNNN Mov10_oe_1.subset.fq > bad_reads.txt
```

The prompt should sit there a little bit, and then it should look like nothing happened. But you should have a new file called `bad_reads.txt`. 

```bash
$ ls -l

## check how many lines in this new file with the "word count" command and the `-l` modifier to only show the  number of lines

$ wc -l bad_reads.txt
```

If we use `>>`, it will append to rather than overwrite a file.  This can be useful for saving more than one search, for example.
    
```bash
$ grep -B 1 -A 2 NNNNNNNNNN Irrel_kd_1.subset.fq >> bad_reads.txt

$ wc -l bad_reads.txt
```

We can also use th pipe `|` to redirect the output of a command as input for a different command.

```bash
$ grep -B 1 -A 2 NNNNNNNNNN Irrel_kd_1.subset.fq | wc -l
```

The philosophy behind these **redirection** commands is that none of them really do anything all that impressive on their own. BUT, when you start chaining them together, you can do some really powerful things and very efficiently. 

## Basic commands, shortcuts, and keystrokes of note

```
## Commands

cd            # change directory to "~" or to specified directory
ls            # list contents of current or specified directory
man <command> # display manual for specified command
pwd           # specify present working directory
echo "..."    # display content in quotes on the standard output
history       # display previous "historical" commands
cat <file>    # display all contents of a file on the standard output
less <file>   # open a buffer with the contents of a file
head <file>   # display the first 10 lines of a file
tail <file>   # display the last 10 lines of a file
cp <..> <..>  # copy files or directories
mdkir         # make a new directory/folder
mv <..> <..>  # move or rename files or directories
rm <file>     # remove a file or a folder (-r)

## Other
~             # home directory
.             # current directory
..            # parent directory
*             # wildcard
ctrl + c      # cancel current command
ctrl + a      # start of line
ctrl + e      # end of line
```

## Expand your knowledge of shell!

shell cheat sheets:

* [http://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/](http://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/)
* [https://github.com/swcarpentry/boot-camps/blob/master/shell/shell_cheatsheet.md](https://github.com/swcarpentry/boot-camps/blob/master/shell/shell_cheatsheet.md)

Explain shell - a web site where you can see what the different components of
a shell command are doing. 

* [http://explainshell.com](http://explainshell.com)
* [http://www.commandlinefu.com](http://www.commandlinefu.com)

Software Carpentry shell tutorial: [The Unix shell](http://software-carpentry.org/v4/shell/index.html)

General help:

- http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html
- man bash
- Google - if you don't know how to do something, try Googling it. Other people
have probably had the same question.
- Learn by doing. There's no real other way to learn this than by trying it
out.  

---

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
