# Setting up

## Disclaimers

**Disclaimer 1:** Before we start this Current Topics module, it is important to highlight that because we will be doing more advanced commands and options for those commands, some commands or their options might not work for you. We have tried our best to pick commands and options for those commands that are widely used, but since we are all on our own computers, each of us has a different implementation of certain commands and there may be options that your specific implementation doesn't have. We have run this code on the [O2 cluster](https://it.hms.harvard.edu/our-services/research-computing/services/high-performance-computing) and each of these commands works there.

**Disclaimer 2:** The contents of this module contain many examples. Some of these examples will have use-cases that you may frequently use and others you may rarely, if ever, use. We will try to highlight commands and use-cases that we frequently use where applicable, but it is important to note that few people, if any, have memorized all of the contents of this module. Some of the examples are here to just to provide familiarity that a concept simply exists. Try not to get hung up on memorizing the syntax except for perhaps the most frequently used commands. This is a resource that we anticipate you will look back to when you come across a problem that you know can be solved with these materials, but you don't remember the specific syntax. 

## Starting with the shell
Depending on your operating system, there are different ways to access the shell:

> **With Macs**
>
> Macs have a utility application called "**Terminal**" for performing tasks on the command line (shell). We can open this utility to access the shell. This is generally found in `/Applications/Utilities/Terminal`
>
> **With Windows**
>
> By default, there is no terminal for the bash shell available in the Windows OS, so you have to use a downloaded program. We recommend "**Git BASH**" a shell (bash) emulator that is a part of the [Git for Windows](https://git-for-windows.github.io/) download.

### Downloading data

We will be exploring the capabilities of the shell by working with some RNA-Seq data. We need to **download the data to our current folder** using the link below. To do so, follow the step-by-step instructions below.

**1. Go to our downloads folder**.

on a mac you will do:

```bash
$ cd Downloads
```

on a PC you will do:

```bash
$ cd /c/Users/your_name/Downloads
```

**2. Click on the link below then go to file > download to download the data"**. This will automatically download the folder to your downloads folder. If you downloaded the data previously as a part of the Basic Shell workshop, you do not need to download it again unless you have deleted it.

* Download data by [going to this link](https://www.dropbox.com/scl/fi/tpjha600uz8uacf166utg/advanced_shell.zip?rlkey=cgql6kx09b7825pgppnme9e08&dl=0).

**3.** Once you have downloaded the file to the correct location, go back to your **terminal window and type the 'list' command**:

```bash
$ ls
```

> `ls` stands for 'list' and it lists the contents of a directory.

_You should see `advanced_shell.zip` as part of the output to the screen._

**4.** Finally, to **decompress the folder**:

* Double click on advanced_shell.zip on a mac. This will automatically inflate the folder.
* If you are on windows, press and hold (or right-click) the folder, select Extract All..., and then follow the instructions.


**5.** Now when you **run the `ls` command** again you should see a folder called `advanced_shell`, which means you are all set with the data download!

```bash
$ ls
```

**6.** Go into the folder for the lesson

on mac type: 
```bash
$ cd advanced_shell
```

on windows type:

```bash
$ cd advanced_shell/advanced_shell
```

***

Now that we have downloaded our toy datasets, we are ready to dive into that haystack!

[Next Lesson >>](02_Regular_expressions.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

