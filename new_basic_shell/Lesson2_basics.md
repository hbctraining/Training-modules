---
title: "The Shell Basics"
author: "Sheldon  McKay, Mary Piper, Radhika Khetani"
---

## Learning Objectives
- How do you use the shell?
  - Getting around the Unix file system
  - looking at files
  - manipulating files

### Exploring the data directory

Now we have each created our own copy of the example data folder into our home directory, **`unix_lesson`**. Let's go into the data folder and explore the data using the shell.

```bash
$ cd unix_lesson
```

> 'cd' stands for 'change directory'

Let's see what is in here. Type:

```bash
$ ls
```

You will see:

```
genomics_data  other  raw_fastq  README.txt  reference_data
```

There are five items listed. What types of files are they? We can use a "modifier" with `ls` to get more information; this modifier is called an argument (more below).

```bash
$ ls -F

genomics_data/  other/  raw_fastq/  README.txt  reference_data/
```

Anything with a forward slash `/` after it is a directory. Things with an asterik `*` after them are programs.  If there are no decorations after the name, it's a file.

> All commands are essentially programs that are able to perform specific, commonly-used tasks.

You can also use the command:

```bash
$ ls -l
```

to see whether items in a directory are files or directories. `ls -l` gives a lot more information too.
```
total 124
drwxrwsr-x 2 mp298 mp298  78 Sep 30 10:47 genomics_data
drwxrwsr-x 6 mp298 mp298 107 Sep 30 10:47 other
drwxrwsr-x 2 mp298 mp298 228 Sep 30 10:47 raw_fastq
-rw-rw-r-- 1 mp298 mp298 377 Sep 30 10:47 README.txt
drwxrwsr-x 2 mp298 mp298 238 Sep 30 10:47 reference_data
```

Let's go into the `raw_fastq` directory and see what is in there.

```bash
$ cd raw_fastq/

$ ls -F

Irrel_kd_1.subset.fq  Irrel_kd_3.subset.fq  Mov10_oe_2.subset.fq
Irrel_kd_2.subset.fq  Mov10_oe_1.subset.fq  Mov10_oe_3.subset.fq
```

All six items in this directory have no trailing slashes, so they are all files, not folders or programs.


#### Arguments

Most commands take additional arguments that control their exact behavior. For example, `-F` and `-l` are arguments to `ls`.  The `ls` command, like many commands, take a lot of arguments. Another useful one is `-a`, which shows everything, including hidden files.  How do we know what the available arguments that go with a particular command are?

Most commonly used shell commands a help page accessible by typing the command and then `--help` (sometimes also `-h`). Try entering:

```bash
$ ls --help
```

> If you are still having problems use your web searching powers to get it! In addition to the arguments, you can also find good examples online; Google is your friend.


## The Unix directory file structure (a.k.a. where am I?)

#### Moving around the file system

Let's practice moving around a bit.

We're going to work in that `unix_lesson` directory.

First we did something like go to the folder of our username. Then we opened `unix_lesson` then `raw_fastq`

Like on any computer you have used before the file structure within unix is hierarchical, like an upside down tree with root (`/`) as the starting point of the tree-like structure:

![Unix](img/Slide1.jpg)

That root (`/`) is often also called the 'top' level.

When you log in to a remote computer you are on one of the branches of that tree, your home directory (e.g. /home/username)

> On mac OS, which is a UNIX-based OS, the root level is also "/". On a windows OS, it is drive specific; generally "C:\" is considered root, but it changes to "D:/", if you are on that drive.

Now let's go do that same navigation at the command line.

Type:

```bash
$ cd
```

> This puts you in your home directory. No matter where you are in the directory system, `cd` will always bring you back to your home directory.


Now using `cd` and `ls`, go in to the `unix_lesson` directory and list its contents. Now go into the `raw_fastq` directory, and list its contents.

Let's also check to see where we are. Sometimes when we're wandering around in the file system, it's easy to lose track of where we are. The command that tells you this is:

```bash
$ pwd
```

> This stands for 'print working directory'. i.e. the directory you're currently working in.

What if we want to move back up and out of the `raw_fastq` directory? Can we just type `cd unix_lesson`? Try it and see what happens.

To go 'back up a level' we can use `..`

Type:

```bash
$ cd ..
```

> `..` denotes parent directory, and you can use it anywhere in the system to go back to the parent directory. Can you think of an example when this won't work?


#### Examining the contents of other directories

By default, the `ls` commands lists the contents of the working directory (i.e. the directory you are in). You can always find the directory you are in using the `pwd` command. However, you can also give `ls` the names of other directories to view. Navigate to the home directory if you are not already there.

Type:

```bash
$ cd
```

Then enter the command:

```bash
$ ls unix_lesson/
```

This will list the contents of the `unix_lesson` directory without you having to navigate there.

The `cd` command works in a similar way.

```bash
$ cd unix_lesson/raw_fastq/
$ pwd
```

You should now be in `raw_fastq` and you got there without having to go through the intermediate directory. 

> If you are aware of the directory structure, you can string together as long a list as you like.


****

**Exercise**

List the `Mov10_oe_1.subset.fq` file from your home directory without changing directories.

****

## Full vs. Relative Paths

The `cd` command takes an argument which is the directory name. Directories can be specified using either a *relative path* or a *full path*. As we know, the directories on the computer are arranged into a hierarchy. The full path tells you where a directory is in that hierarchy. Navigate to the home directory (`cd`). Now, enter the `pwd` command and you should see something like:

```bash
$ pwd
```

```
/Users/marypiper/
```

which is the full path for your home directory. This tells you that you are in a directory called `marypiper`, which sits inside a directory called `Users` which sits inside the very top directory in the hierarchy, the *root directory*. So, to summarize: `marypiper` is a directory in `Users` which is a directory in `/`.

Now enter the following command **but replacing `/Users/marypiper/` with your own full path information**:

```bash
$ cd /Users/marypiper/unix_lesson/raw_fastq/
```

This jumps to `raw_fastq`. Now go back to the home directory (`cd`). We saw
earlier that the command:

```bash
$ cd unix_lesson/raw_fastq/
```

had the same effect - it took us to the `raw_fastq` directory. But, instead of specifying the full path (`/Users/marypiper/unix_lesson/raw_fastq`), we specified a *relative path*. In other words, we specified the path **relative to our current working directory**. 

**A full path always starts with a `/`, a relative path does not.**

A relative path is like getting directions from someone on the street. They tell you to "go right at the Stop sign, and then turn left on Main Street". That works great if you're standing there together, but not so well if you're trying to tell someone how to get there from another country. A full path is like GPS coordinates. It tells you exactly where something is no matter where you are right now.

You can usually use either a full path or a relative path depending on what is most convenient. If we are in the home directory, it is more convenient to just enter the relative path since it involves less typing.

Over time, it will become easier for you to keep a mental note of the structure of the directories that you are using and how to quickly navigate among them.

***

**Exercise**

Change directories to `~/unix_lesson/raw_fastq/`, and list the contents of `unix_lesson/other` without changing directories again.

***

### Saving time with tab completion, wildcards and other shortcuts 

#### Tab completion

Navigate to the home directory. Typing out directory names can waste a lot of time. When you start typing out the name of a directory, then hit the tab key, the shell will try to fill in the rest of the directory name. For example, type `cd` to get back to your home directly, then enter:

```bash
$ cd uni<tab>
```

The shell will fill in the rest of the directory name for `unix_lesson`. Now go to `unix_lesson/raw_fastq` and 

```bash
$ ls Mov10_oe_<tab><tab>
```

When you hit the first tab, nothing happens. The reason is that there are multiple directories in the home directory which start with `Mov10_oe_`. Thus, the shell does not know which one to fill in. When you hit tab again, the shell will list the possible choices.

> **Tab completion is your friend!** It helps prevent spelling mistakes, and speeds up the process of typing in the full command.

#### Wild cards

Navigate to the `raw_fastq` directory, which is inside the `unix_lesson` directory. This directory contains FASTQ files from a next-generation sequencing dataset. 

The '*' character is a shortcut for "zero or more characters". Thus, if you enter `ls *`, you will see all of the contents of a given directory. Now try this command:

```bash
$ ls *fq
```

This lists every file that begins with zero or any number of characters followed by a `fq`. This command:

```bash
$ ls /bin/*sh
```

Lists every file in `/bin` that ends in the characters `sh`.

```bash
$ ls Mov10*fq
```

lists only the files that begin with 'Mov10' and end with 'fq'

So how does this actually work? The shell (bash) considers an asterisk "*" to be a wildcard character that can be used to substitute for: no characters, any other single character or a string of characters. An asterisk/star is only one of the many wildcards in UNIX, but this is the most powerful one and we will be using this one the most for our exercises.

> _**NOTE: The wildcard asterik used in shell is different than how it is used in regular expressions.**_ For example in regular expressions, you have to use the period character followed by the asterik .* to mean "zero or more characters". 

****

**Exercise**

Do each of the following using a single `ls` command without
navigating to a different directory.

1.  List all of the files in `/bin` that start with the letter 'c'
2.  List all of the files in `/bin` that contain the letter 'a'
3.  List all of the files in `/bin` that end with the letter 'o'

BONUS: List all of the files in `/bin` that contain the letter 'a' or 'c'.

****


#### Command History

You can easily access previous commands.  Hit the up arrow. Hit it again.  You can step backwards through your command history. The down arrow takes your forwards in the command history.

'Ctrl-r' will do a reverse-search through your command history.  This
is very useful.

You can also review your recent commands with the `history` command.  Just enter:

```bash
$ history
```

to see a numbered list of recent commands, including this just issues
`history` command. 

> Only a certain number of commands are stored and displayed with `history`, there is a way to modify this to store a different number.


## Creating, moving, copying, and removing

Now we can move around in the file structure. But what if we want to do normal things like copy files or move them around or get rid of them. Sure we could do most of these things without the command line, but what fun would that be?! Besides it's often faster to do it at the command line, or you'll be on a remote server like Amazon where you won't have another option.

Our raw data in this case is fastq files. We don't want to change the original files, so let's make a copy to work with.

Lets copy the file using the copy `cp` command. Navigate to the `raw_fastq` directory and enter:

```bash
$ cp Mov10_oe_1.subset.fq Mov10_oe_1.subset-copy.fq

$ ls -l
```

Now ``Mov10_oe_1.subset-copy.fq`` has been created as a copy of `Mov10_oe_1.subset.fq`

Let's make a 'backup' directory where we can put this file.

The `mkdir` command is used to make a directory. Just enter `mkdir`
followed by a space, then the directory name.

```bash
$ mkdir backup
```

> File/directory/program names with spaces in them do not work in unix, use characters like hyphens or underscores instead.

We can now move our backed up file in to this directory. We can move files around using the command `mv`. Enter this command:

```bash
$ mv *copy.fq backup
```

```bash
$ ls -l backup

-rw-rw-r-- 1 mp298 mp298 75706556 Sep 30 13:56 Mov10_oe_1.subset-copy.fq
```

The `mv` command is also how you rename files. Since this file is so
important, let's rename it:

```bash
$ cd backup

$ mv Mov10_oe_1.subset-copy.fq Mov10_oe_1.subset-backup.fq

$ ls

Mov10_oe_1.subset-backup.fq
```

Finally, we decided this was silly and want to start over.

```bash
$ cd ..

$ rm backup/Mov10_oe_1.subset-backup.fq
```

> The `rm` file permanently removes the file. Be careful with this command. The shell doesn't
just nicely put the files in the Trash. They're really gone.
>
> Same with moving and renaming files. It will **not** ask you if you are sure that you want to "replace existing file".
> 
> You can use `-i` modifier with both `rm` and `mv`. This will write a prompt to standard error before moving a file that would overwrite an existing file or ask before deleting the file(s).

We really don't need these backup directories, so, let's delete both. By default, `rm`, will NOT delete directories, but you use the `-r` flag if you are sure that you want to delete the directories and everything within them. To be safe, let's use it with the `-i` flag.

```bash
$ rm -ri backup_ref_data/ backup_fastq/ 
```

- `-r`: recursive, commonly used as an option when working with directories, e.g. with `cp`. 
- `-i`: prompt before every removal.

## Commands, options, and keystrokes covered

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
mkdir         # make a new directory/folder
mv <..> <..>  # move or rename files or directories
rm <file>     # remove a file or a folder (-r)

## Other
~             # home directory
.             # current directory
..            # parent directory
*             # wildcard
ctrl + c      # cancel current command
```

#### Information on the shell

shell cheat sheets:<br>
* [http://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/](http://fosswire.com/post/2007/08/unixlinux-command-cheat-sheet/)
* [https://github.com/swcarpentry/boot-camps/blob/master/shell/shell_cheatsheet.md](https://github.com/swcarpentry/boot-camps/blob/master/shell/shell_cheatsheet.md)

Explain shell - a web site where you can see what the different components of
a shell command are doing.  
* [http://explainshell.com](http://explainshell.com)
* [http://www.commandlinefu.com](http://www.commandlinefu.com)

Software Carpentry tutorial: [The Unix shell](https://swcarpentry.github.io/shell-novice/)

General help:
- http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html
- man bash
- Google - if you don't know how to do something, try Googling it. Other people
have probably had the same question.
- Learn by doing. There's no real other way to learn this than by trying it
out.  

***

*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
---
