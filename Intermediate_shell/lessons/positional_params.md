---
title: "Introduction to Positional Parameters and Variables"
author: "Emma Berdan"
---


## Learning Objectives:

* Distinguish between variables and positional parameters
* Recognize variables and positional parameters in code written by someone else
* Implement positional parameters and variables in a bash script
* Integrate for loops and variables

## What is a variable?

"A **variable** is a character string to which we assign a value. The value assigned could be a number, text, filename, device, or any other type of data.
A variable is nothing more than a pointer to the actual data. The shell enables you to create, assign, and delete variables.” ([Source](https://www.tutorialspoint.com/unix/unix-using-variables.htm))

It is easy to identify a variable in any bash script as they will always have the $ in front of them. Here is my very cleverly named variable: `$Variable`

## Positional parameters are a special kind of variable

“A **positional parameter** is an argument specified on the command line, used to launch the current process in a shell. Positional parameter values are stored in a special set of variables maintained by the shell.” ([Source](https://www.computerhope.com/jargon/p/positional-parameter.htm))

So rather than a variable that is identified inside the bash script, a positional parameter is given when you run your script. This makes it more flexible as it can be changed without modifying the script itself.  

<p align="center">
<img src="../img/positional-parameter.jpg" width="400">
</p>

Here we can see that our command is the first positional parameter (`$0`) and that each of the strings afterwards are additional positional parameters (here `$1` and `$2`). Generally when we refer to positional parameters we ignore `$0` and start with `$1`.

It is crucial to note that different positional parameters are separated by whitespace and can be strings of any length. This means that:

```bash
$ ./myscript.sh OneTwoThree
```
has only given one positional parameter `$1=OneTwoThree`

and

```bash
$ ./myscript.sh O N E
```
has given three positional parameters `$1=O` `$2=N` `$3=E`

You can code your script to take as many positional parameters as you like but for any parameters greater than 9 you need to use curly brackets. So positional parameter 9 is `$9` but positional parameter 10 is `${10}`. We will come back to curly brackets later.

Finally, the variable `$@` contains the value of all positional parameters except `$0`.

## A simple example

Let's make a script ourselves to see positional parameters in action.

from your command line type `vim compliment.sh` then type `i` to go to insert mode. If you have never used vim before you can find the basics [HERE](https://github.com/hbctraining/Intro-to-shell-flipped/blob/047946559cbffc9cc24ccb10a4d630aa18fab558/lessons/03_working_with_files.md).

now copy and paste the following into your file

```bash
#!/bin/bash

echo  $1 'is amazing at' $2
```
then type <kbd>esc</kbd> to exit insert mode. Type and enter `:wq` to write and quit.


>**Note**
>We want to take a step back here and think about what we might do from here to actually use our script. 
>We know our script is a bash script because we wrote our "shebang" line '#!/bin/bash' but the computer 
>doesn't know this. One option is to run this script via the bash interpreter: sh. Doing this actually 
>makes our "shebang" line obsolete! The same script without the "shebang" line will still run!! Try it!
>
>sh compliment.sh
>
>Here we are telling the computer to use bash to execute the commands in our script which is why we don't 
>need the "shebang" line. It is NOT best practice to write scripts without "shebang" lines as removing this
>will leave the next person scratching there head figuring out which language the script is in. 
>ALWAYS ALWAYS ALWAYS use a "shebang" line. With that line in place we can run this script without 
>calling bash from the command line. But first we have to make the script executable. This tells the 
>computer that this is a script and not just a text file. We do that by adding file permission.
>Typing chmod u+x will make the file executable for the user (you!) once this is done the script 
>can be run this way
>
>./compliment.sh
>
>When a file is executable the computer will use the "shebang" line to figure out which interpreter to use. 
>Different programs (perl, python, etc) will have different "shebang" lines.


For this lesson we will make all of our scripts exectuable. Now that you are back on the command line type `chmod u+x compliment.sh` to make the file executable for yourself. More on file permissions [HERE](https://github.com/hbctraining/Intro-to-shell-flipped/blob/master/lessons/07_permissions_and_environment_variables.md).

You may have already guessed that our script takes two different positional parameters. The first one is your first name and the second is something you are good at. Here is an example:

```bash
./compliment.sh OliviaC acting
```

This will print 

```bash
OliviaC is amazing at acting
```
You may have already guessed that I am talking about award winning actress [Olivia Coleman](https://en.wikipedia.org/wiki/Olivia_Colman) here. But if I typed

```bash
./compliment.sh Olivia Coleman acting
```
I would get

```bash
Olivia is amazing at Coleman
```
Technically I have just given three positional parameters `$1=Olivia` `$2=Colman` `$3=acting`
However, since our script does not contain `$3` this is ignored. 

In order to give Olivia her full due I would need to type

```bash
./compliment.sh "Olivia Coleman" acting
```

The quotes tell bash that "Olivia Coleman" is a single string, `$1`. Both double quotes (") and single quotes (') will work. Olivia has enough accolades though, so go ahead and run the script with your name (just first or both first and last) and something you are good at!


## Naming variables

My previous script was so short that it was easy to remember that `$1` represents a name and `$2` represents a skill. However, most scripts are much longer and may contain more positional parameters. To make it easier on yourself it is often a good idea to name your positional parameters. Here is the same script we just used but with named variables.

```bash
#!/bin/bash

name=$1
skill=$2

echo  $name 'is amazing at' $skill
```

It is critical that there is no space in our assignment statements, `name = $1` would not work. We can also assign new variables in this manner whether or not they are coming from positional parameters. Here is the same script with the variables defined within it.

```bash
#!/bin/bash

name="Olivia Coleman"
skill="acting"

echo  $name 'is amazing at' $skill
```
We will talk more about naming variables later, but note that defining variables within the script can make the script **less** flexible. If I want to change my sentence, I now need to edit my script directly rather than launching the same script but with different positional parameters.


## A useful example

Now that we understand the basics of variables and positional parameters how can we make them work for us? One of the best ways to do this is when writing a shell script. A shell script is a "shell script that embeds a system command or utility, that saves a set of parameters passed to to that command."

As an example lets say that I want to add read groups to a series of bam files. Each bam file is one sample that I have sequenced and I need to add read groups to them all. Here is an example of my command for sample M1.

```bash
java -jar picard.jar AddOrReplaceReadGroups  I=M1.dedupped.bam \
O=M1.final.bam RGID=M1  RGLB=M1 RGPL=illumina   RGPU=unit1  RGSM=M1
```

The string 'M1' occurs 5 times in this command. However, M1 is not my only sample, to make this code run for a different sample I would need to replace M1 5 times. I don't want to manually edit this line of code every time I run the command. Instead, using positional parameters I can make a shell script for this command.


```bash
#!/bin/bash

java -jar picard.jar AddOrReplaceReadGroups I=$1.dedupped.bam \
O=$1.final.bam RGID=$1 RGLB=$1 RGPL=illumina RGPU=unit1 RGSM=$1
```

Here `$1` is my only positional parameter and is my sample name. **However**, this script is not written with best practices. It should actually look like this.

```bash
#!/bin/bash

java  -jar  picard.jar AddOrReplaceReadGroups  I=${1}.dedupped.bam \
O=${1}.final.bam RGID=${1} RGLB=${1} RGPL=illumina RGPU=unit1 RGSM=${1}
```

`$1`, which we have been using is actually a short form of `${1}`

We can only use `$1` when it is **not** followed by a letter, digit or an underscore but we can always use `${1}`

if wrote a script that said `echo $1_is_awesome` I wouldn't actually get any output when I ran this with a positional parameter, even our beloved [Olivia Coleman](https://en.wikipedia.org/wiki/Olivia_Colman)! Instead this script would need to be written as `echo ${1}_is_awesome`

As you write your own code it is good to remember that it is always safe to use `${VAR}` and that errors may result from using `$VAR` instead, even if it is convienent. As you navigate scripts written by other people you will see both forms.


Let's test out this script this ourselves without actually running picard by using `echo`. From your command line type `vim picard.sh` then type `i` to go to insert mode. 

now copy and paste the following into your file

```bash
#!/bin/bash

echo java -jar picard.jar AddOrReplaceReadGroups I=${1}.dedupped.bam \
O=${1}.final.bam RGID=${1}  RGLB=${1} RGPL=illumina RGPU=unit1 RGSM=${1}
```
then type <kbd>esc</kbd> to exit insert mode. Type and enter `:wq` to write and quit.

Now that you are back on the command line type `chmod u+x picard.sh` to make the file executable for yourself. 

You can try out the code yourself by using any sample name you want. Here I am running it for sample T23


```bash
./picard.sh T23
```

We have now significantly decrased our own workload. By using this script we can easily run this command for any sample we have. However, sometimes we have so many samples that even running this command manually for all of these will be time consuming. In this case we can turn to one of the most powerful ways to use positional parameters and other variables, by combining them with **for loops**. More on for loops [HERE](https://github.com/hbctraining/Intro-to-shell-flipped/blob/master/lessons/06_loops_and_automation.md).

## Variables in for loops

We are going to continue with our picard example. Let's say that I need to run my picard command for 10 different samples. I have all of my sample names in a text file. First let's put my sample name list on the cluster so we can access it with our script.

From your command line type `vim samples.txt` then type `i` to go to insert mode. Copy and paste the following

```bash
M1
M2
M3
O1
O2
O3
O4
S1
S2
S3
```

then type <kbd>esc</kbd> to exit insert mode. Type and enter `:wq` to write and quit. Each line is a single sample name.

Now let's write our new script. Again we will use `echo` to avoid actually calling picard. We will write this with vim then go through it line by line. 

From your command line type `vim picard_loop.sh` then type `i` to go to insert mode. Copy and paste the following

```bash
#!/bin/bash

for ((i=1; i<=10; i+=1))
        do 

sample=$(awk -v  awkvar="${i}" 'NR==awkvar' samples.txt)

echo java  -jar picard.jar AddOrReplaceReadGroups  \
I=${sample}.dedupped.bam  O=${sample}.final.bam RGID=${sample}  \
RGLB=${sample} RGPL=illumina   RGPU=unit1  RGSM=${sample}

done
```

then type <kbd>esc</kbd> to exit insert mode. Type and enter `:wq` to write and quit. Now that you are back on the command line type `chmod u+x picard_loop.sh` to make the file executable for yourself. 

Before we run this, let's go through it line by line.


`for ((i=1; i<=10; i=i+1))`

This tells bash how our loop is working. We want to start at 1 (`i=1`) and end at 10 (`i<=10`) and each time we complete our loop the value `i` should increase by 1 (`i=i+1`).  Simple math tells us that means the loop will run 10 times. But we could make it run 100 times by changing `i<=10` to `i<=100`. `i` is our counter variable to track how many loops we have run. You will often see this called `i` or `j` but you can actually call it whatever you want. For example, here we are using it to track which line of samples.txt we are reading so it may be more intuitive to write it like this `for ((line=1; line<=10; line=line+1))`. `i` and `j` are used because they are shorter to write.

`do` 

This means that whatever follows is what we want bash to do for each value of `i` (here 1,2,3,4,5,6,7,8,9,and 10).

`sample=$(awk -v  awkvar="${i}" 'NR==awkvar' samples.txt)`

This line creates a variable called `$sample` and assigns its value to line `i` of samples.txt. We won't go into the details of how this awk command is working but you can learn more about using awk [HERE](https://github.com/hbctraining/Training-modules/blob/f168114cce7ab9d35eddbf888b94f5a2fda0318a/Intermediate_shell/lessons/advanced_lessons.md). You may also notice that we have assigned the value of `$sample` differently here using parentheses () instead of single ' or double " quotes. The syntax for assigning variables changes depending on what you are assigning. See **Syntax for assigning variables** below.

If we look at samples.txt we can see that when `i=1` then `$sample` will be M1. What will `$sample` be when `i=5`?


The next line should look familiar

```bash
echo java  -jar picard.jar AddOrReplaceReadGroups  \
I=${sample}.dedupped.bam  O=${sample}.final.bam RGID=${sample} \
RGLB=${sample} RGPL=illumina   RGPU=unit1  RGSM=${sample}
```

This is exactly the same as what we used above except `$1` is now `$sample`. We are assigning the value of `$sample` within our script instead of giving it externally as a positional parameter.

finally we end our script with 

```bash
done
```

Here we are simply telling bash that this is the end of the commands that we need it to do for each value of `i`.

Now let's run our script


```bash
./picard_loop.sh
```

Is the output what you expected?

## Syntax for assigning variables

Depending on what you are assigning as a variable, the syntax for doing so differs.

`variable=$(command)` for output of a command. 

        example: `variable=$(wc -l file.txt)` will assign the number of lines in the file file.text to `$variable`

`variable=‘a string’` or `”a string”` for a string with spaces.

        example `variable="Olivia Coleman"` as seen above.

`variable=number` for a number or a string without spaces.

        example: `variable=12` will assign the number 12 to `$variable`

`variable=$1` for positional parameter 1.

        example: `variable=$9` will assign positional parameter 9 to `$variable` and `variable=${10}` will assign positional parameter 10 to `$variable` 

