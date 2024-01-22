---
title: "Shell scripts"
author: "Meeta Mistry, Bob Freeman, Mary Piper, Radhika Khetani, Jihe Liu, Will Gammerdinger, Emma Berdan"
---

Approximate time: 20 minutes

## Learning Objectives

- Capture previous commands into a shell script
- Implement variables in a shell script


## Shell scripts

By this point in the module you have been introduced to a number of commands to explore your data. To demonstrate the function of each command we have run them one at a time at the command prompt. The command prompt is useful for testing out commands and also performing simple tasks like exploring and organizing the file system. When we are running analyses which require a series of tasks to be run, there is a more efficent way to do this using shell scripts. 

Shell scripts are **text files that contain commands we want to run**. Here we will introduce you to shell scripts by providing a simple example. 


### A simple script

We are finally ready to see what makes the shell such a powerful programming environment. To create our first script, we are going to take some of the commands we have run previously and save them into a file so that we can **re-run all those operations** again later, by typing just **one single command**. For historical reasons, a bunch of commands saved in a file is referred to as shell script, but make no mistake, this is actually a small program! 

Interestingly, when working with Shell or on the command line you can give files any (or no) extension (.txt, .tsv, .csv, etc.). Similarly, for a shell script you don't need a specific extension. However, it is best practice to give shell scripts the extension `.sh`. This is helpful to your future self and your collaborators to identify that a given file is a shell script.

Move over to the `other` directory and create a new file using `vim`. We will call our script `listing.sh`:

```bash
$ cd ~/unix_lesson/other
$ nano listing.sh
```

This shell script will do two things:

1. Tell us our current working directory
2. List the contents of the directory 

We start with a shebang! line which tells the computer to use the bash interpreter to run this script.


```bash
#!/bin/bash
```


We already know the commands for doing both of these things so let's add the 2 commands into our script below the shebang line:

```bash
#!/bin/bash

pwd
ls -l 
```

Now, we could save and quit and this shell script would run perfectly fine. But, we will add some verbosity to our script by using the `echo` command (verbosity is a good thing here!). The `echo` command is used to display a line of text that is passed in as an argument. This is a bash command that is mostly used in shell scripts to output status to the screen or to a file. 

Place the following `echo` statements on the lines before each of the commands:

```bash
#!/bin/bash

echo "Your current working directory is:"
pwd

echo "These are the contents of this directory:"
ls -l 
```

Now we are all set! Check and see that the new script file you created is in this directory:

```bash
$ ls -l
```

>We want to take a step back here and think about what we might do from here to actually use our script. 
>We know our script is a bash script because we wrote our "shebang" line '#!/bin/bash' but the computer 
>doesn't automatically know this. One option is to run this script via the bash interpreter: sh. Doing this 
>actually makes our "shebang" line obsolete! The same script without the "shebang" line will still run!! Try it!
>
>`sh listing.sh`
>
>Here we are telling the computer to use bash to execute the commands in our script which is why we don't 
>need the "shebang" line. It is **NOT** best practice to write scripts without "shebang" lines as removing this
>will leave the next person scratching their head figuring out which language the script is in. 
>**ALWAYS ALWAYS ALWAYS use a "shebang" line**. With that line in place, we can run this script without 
>calling bash from the command line. But first we have to make the script executable. This tells the 
>computer that this is a script and not just a text file. We do that by adding file permission.
>Typing chmod u+x will make the file executable for the user (you!), once this is done the script 
>can be run this way
>
>`./listing.sh`
>
>When a file is executable the computer will use the "shebang" line to figure out which interpreter to use. 
>Different programs (perl, python, etc) will have different "shebang" lines.
To run the shell script you can use the `bash` or `sh` command, followed by the name of your script:


> **Were the `echo` commands helpful in letting you know what came next?**

This is a very simple shell script, just to introduce you to the concept. As you move forward you will write much more complex scripts.

***

*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

*A lot of time and effort went into the preparation of these materials. Citations help us understand the needs of the community, gain recognition for our work, and attract further funding to support our teaching activities. Thank you for citing the corresponding course (as suggested in its "Read Me" section) if it helped you in your data analysis.*

