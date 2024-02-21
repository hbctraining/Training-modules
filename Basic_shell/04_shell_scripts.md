---
title: "Shell scripts"
author: "Meeta Mistry, Bob Freeman, Mary Piper, Radhika Khetani, Jihe Liu, Will Gammerdinger, Emma Berdan"
---

Approximate time: 20 minutes

## Learning Objectives

- Contrast shell scripts with direct commands


## Shell scripts

By this point in the module you have been introduced to a number of commands to explore your data. To demonstrate the function of each command we have run them one at a time at the command prompt. The command prompt is useful for testing out commands and also performing simple tasks like exploring and organizing the file system. When we are **running analyses which require a series of tasks to be run**, there is a more efficent way to do this using **shell scripts**. 

Shell scripts are **text files that contain commands we want to run**. Here we will introduce you to shell scripts by providing a simple example. 


### A simple script

We are finally ready to see what makes the shell such a powerful programming environment. To create our first script, we are going to take some of the commands we have run previously and save them into a file so that we can **re-run all those operations** again later, by typing just **one single command**. For historical reasons, a bunch of commands saved in a file is referred to as shell script, but make no mistake, this is actually a small program! 

#### File extension for shell scripts
Interestingly, when working with Shell or on the command line you can give files any (or no) extension (.txt, .tsv, .csv, etc.). Similarly, for a shell script you *don't need a specific extension*. However, it is **best practice to give shell scripts the extension `.sh`**. This is helpful to your future self and your collaborators to identify that a given file is a shell script.

Move over to the `other` directory and create a new file using `nano`. We will call our script `listing.sh`:

```bash
$ cd ~/unix_lesson/other
$ nano listing.sh
```

#### Adding commands to our script

This shell script will do two things:

1. Tell us our current working directory
2. List the contents of the directory 

We already know the commands for doing both of these things so let's add the 2 commands into our script, with a comment for each:

```bash
# Print working directory
pwd

# List contents of the directory
ls -l 
```

Now, let's save and quit this shell script. This should bring you back to the command prompt. Check and see that the new script file you created is in this directory:

```bash
$ ls -l
```

#### Running our script

The `bash` command invokes the default shell. However, if you provide it an argument, it treats that argument as the name of a script file to be run. To run the shell script you can use the `bash` command, or a short form of it, the `sh` command, followed by the name of your script:

```bash
$ sh listing.sh
```

_Did it work as you expected? Do you see the output printed to your console?_

### Best practices for shell scripts

This is a very simple shell script, just to introduce you to the concept. Before we jump into more scripts which better demonstrate their utility, we will take a moment to cover a few adjustments we would make to our script which we consider best practice when writing shell scripts.

#### Shebang!

Open up the script with `nano`. At the beginning of our script we are going to add what is called a **shebang line**.

```bash
 #!/bin/bash
```

This line is the **absolute path to the Bash interpreter**. The shebang line ensures that the bash shell interprets the script even if it is executed using a different shell.

**Why do I need a shebang line? My scripts ran perfectly well before without it.**

Having a shebang line is best practice. Your script runs fine without it, because we call our script with the command `sh listing.sh`, the sh part tells the computer to use the default shell (bash) to interpret the script. However, we will not always use sh to call our scripts and different programs (perl, python, etc) will have different shebang lines. To avoid any issues, it is best practice to add a shebang line to tell the bash shell which interpreter to use.

#### Adding verbosity

Our example script is quite short, and therefore is quick to run. In practice your scripts will be longer, and probably more computationall intensive. In these situations it would be great to have some report of what your script is doing as it works through the commands. This is also super useful when troubleshooting.

An easy way to add verbosity is to **use the `echo` command**. The `echo` command is used to display a line of text that is passed in as an argument. This is a bash command that is mostly used in shell scripts to output status to the screen or to a file. 

We can include an `echo` statement for each command that we are running in our script:

```bash
#!/bin/bash

echo "Your current working directory is:"
pwd

echo "These are the contents of this directory:"
ls -l 

```

Save your script and quit `nano`. Try running this script and see how our edits impact the output!

_Were the `echo` commands helpful in letting you know what came next?_


***

**Exercise**

1. Open up the script `listing.sh` using nano. Add the command which prints to screen the contents of the file `Mov10_rnaseq_metadata.txt`.
2. Add an echo statement for the command, which tells the user "This is information about the files in our dataset:"
3. Run the new script. Report the contents of the new script and the output you got after running it.

	<details>
		<summary><b><i>Answers</i></b></summary>
		<p><i>Question 1</i><br>
		Add this command to <code>listing.sh</code> using nano:<br>
		<code>cat Mov10_rnaseq_metadata.txt</code></p>
		<p><i>Question 2</i><br>
		Add this command to <code>listing.sh</code> using nano:<br>
		<code>echo "This is information about the files in our dataset:"</code></p>
		<p><i>Question 3</i><br>
		<code>sh listing.sh</code></p>
		<p><pre> Your current working directory is:
	/home/mm573/unix_lesson/other
	These are the contents of this directory:
	total 240
	-rw-rw-r-- 1 mm573 mm573  346 Sep 30 12:47 directory_info.sh
	-rw-rw-r-- 1 mm573 mm573  193 Oct  5 14:53 listing.sh
	-rw-rw-r-- 1 mm573 mm573   93 Sep 30 10:40 Mov10_rnaseq_metadata.txt
	-rw-r--r-- 1 mm573 mm573 1057 Sep 30 10:40 sequences.fa
	-rw-rw-r-- 1 mm573 mm573   48 Oct  5 14:49 spider.txt
	This is information about the files in our dataset:
	sample	celltype
	OE.1	Mov10_oe
	OE.2	Mov10_oe
	OE.3	Mov10_oe
	IR.1	normal
	IR.2	normal
	IR.3	normal</pre>
	</details>



***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

* *The materials used in this lesson were derived from work that is Copyright © Data Carpentry (http://datacarpentry.org/). 
All Data Carpentry instructional material is made available under the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).*
* *Adapted from the lesson by Tracy Teal. Original contributors: Paul Wilson, Milad Fatenejad, Sasha Wood and Radhika Khetani for Software Carpentry (http://software-carpentry.org/)*
