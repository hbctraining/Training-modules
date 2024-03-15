---
title: "Setting Up and Accessing the Shell"
author: "Sheldon McKay, Mary Piper, Radhika Khetani, Emma Berdan"
---

## Learning Objectives
- Install and locate the software/tools necessary for accessing the command line

## Starting with the shell
Depending on your operating system, there are different ways to access the shell:

> **With Macs**
>
> Macs have a utility application called "**Terminal**" for performing tasks on the command line (shell). We can open this utility to access the shell. This is generally found in `/Applications/Utilities/Terminal`
>
> **With Windows**
>
> By default, there is no terminal for the bash shell available in the Windows OS, so you have to use a downloaded program. We recommend "**Git BASH**" a shell (bash) emulator that is a part of the [Git for Windows](https://git-for-windows.github.io/) download.

### Command prompt

Once you have opened the shell, you should see the command prompt ending with `$` OR `%`. It will have some characters before the `$` or `%`, something like `[MacBook-Pro-5:~]`, this is telling you what the name of the computer you are working on is. 

```bash
[MacBook-Pro-5:~]$ 
```

### Downloading data

We will be exploring the capabilities of the shell by working with some RNA-Seq data. We need to **download the data to our current folder** using the link below. To do so, follow the step-by-step instructions below.

> *NOTE: If you attended the [Intro to shell](https://hbctraining.github.io/Training-modules/Basic_shell/) workshop with us last month, you should have already downloaded this data.*

**1. Find out what folder we are currently inside**. To do this, we can use the 'print working directory' command:

```bash
$ pwd
```

> On a **Mac** your current folder should be something starting with `/Users/`, like `/Users/marypiper/`.
> 
> On a **Windows** machine your current folder should be something starting with `/c/Users/marypiper`. To find this in your File explorer try clicking on PC and navigating to that path.

_Once you have identified which folder you are in, this is where we will be downloading your data._

**2. Click on the link below then go to file > download to download the data"**. This will automatically download the folder to your downloads folder. If you downloaded the data previously as a part of the Basic Shell workshop, you do not need to download it again unless you have deleted it.

* Download data by [clicking here](https://www.dropbox.com/s/x66jksdd4jklpdw/unix_lesson.zip?dl=0).

**3.** Once you have downloaded the file to the correct location, go back to your **terminal window and type the 'list' command**:

```bash
$ ls
```

> `ls` stands for 'list' and it lists the contents of a directory.

_You should see `unix_lesson.zip` as part of the output to the screen._

**4.** Finally, to **decompress the folder**:

* Double click on unix_lesson.zip on a mac. This will automatically inflate the folder.
* If you are on windows, press and hold (or right-click) the folder, select Extract All..., and then follow the instructions.


**5.** Now when you **run the `ls` command** again you should see a folder called `unix_lesson`, which means you are all set with the data download!

```bash
$ ls
```

**6.** Go into the folder for the lesson

on mac type: 
```bash
$ cd unix_lesson
```

on windows type:

```bash
$ cd unix_lesson/unix_lesson
```

***

[Next Lesson](loops_and_scripts.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

* *The materials used in this lesson were derived from work that is Copyright © Data Carpentry (http://datacarpentry.org/). 
All Data Carpentry instructional material is made available under the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).*
* *Adapted from the lesson by Tracy Teal. Original contributors: Paul Wilson, Milad Fatenejad, Sasha Wood and Radhika Khetani for Software Carpentry (http://software-carpentry.org/)*
