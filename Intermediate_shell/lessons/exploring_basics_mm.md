---
title: "The Shell"
author: "Sheldon  McKay, Mary Piper, Radhika Khetani"
---

## Learning Objectives
- Review basic commands in shell

## The basics

The following lesson briefly describes commands that will be used in this module. We assume that as an intermediate user of *bash* you are already familiar with these commands.

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

```

> An asterisk/star is only one of the many wildcards in UNIX, but this is the most powerful one.

**Tab completion**

```bash
$ ls raw_fastq/Mov10_oe_<tab><tab>
```

When you hit the first tab, nothing happens. The reason is that there are multiple files that start with `Mov10_oe_`. Thus, the shell does not know which one to fill in. When you hit tab again, the shell will list the possible choices.

> **Tab completion is your friend!** It helps prevent spelling mistakes, and speeds up the process of typing in the full command.

**Examining Files**

The command `cat` is to catenate and print the contents of the file to screen.

```bash
$ cat other/sequences.fa
```

The command, `less` allows you to open up the file in a new buffer and scroll through it.

```bash
less raw_fastq/Mov10_oe_1.subset.fq
```

<span class="caption">Shortcuts for `less`</span>

| key              | action                 |
| ---------------- | ---------------------- |
| <kbd>SPACE</kbd> | to go forward          |
| <kbd>b</kbd>     | to go backwards        |
| <kbd>g</kbd>     | to go to the beginning |
| <kbd>G</kbd>     | to go to the end       |
| <kbd>q</kbd>     | to quit                |


The commands  `head` and `tail` allow you to look at the beginning or end of the file.

```bash
$ head raw_fastq/Mov10_oe_1.subset.fq

$ tail -n 8 raw_fastq/Mov10_oe_1.subset.fq

```
> The `-n` option to either of these commands can be used to specify the number `n` lines of a file. 

To count how many lines are in a file you can use the `wc` command:

```bash
wc -l raw_fastq/Mov10_oe_1.subset.fq
```

**Searching within files**

The command `grep` allows us to search for a pattern within a file.

```bash
$ cd ~/unix_lesson/raw_fastq

$ grep NNNNNNNNNN Mov10_oe_1.subset.fq
```

We can add *modifiers* to the command to alter the way the command works. For example, `-B` and `-A` arguments for `grep` to return the matched line plus one before (`-B1`) and two lines after (`-A2`).

```bash
$ grep -B 1 -A 2 NNNNNNNNNN Mov10_oe_1.subset.fq
```

**Redirection**

To re-direct output to a file rather than the screen you can use `>`:

```bash
$ grep -B 1 -A 2 NNNNNNNNNN Mov10_oe_1.subset.fq > bad_reads.txt
```

If we use `>>`, it will append to rather than overwrite a file.  This can be useful for saving more than one search, for example.
    
```bash
$ grep -B 1 -A 2 NNNNNNNNNN Irrel_kd_1.subset.fq >> bad_reads.txt
```


## Basic commands, shortcuts, and keystrokes of note
Below is a key of the basic commands you should be familiar with in order to be able to follow this module.

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

***

[Next Lesson](https://hbctraining.github.io/Training-modules/Intermediate_shell/lessons/vim.html)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
