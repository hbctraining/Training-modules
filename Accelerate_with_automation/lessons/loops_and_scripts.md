---
title: "The Shell: Loops & Scripts"
author: "Bob Freeman, Mary Piper, Radhika Khetani"
---

Approximate time: 60 minutes

## Learning Objectives

* Capture multiple commands into a script to re-run as one single command
* Understanding variables and storing information in variables
* Learn how to use variables to operate on multiple files

## Bash variables

A *variable* is a common concept shared by many programming languages. Variables are essentially a symbolic/temporary name for, or a reference to, some information. Variables are analogous to "buckets", where information can be stored, maintained and modified without too much hassle. 

Extending the bucket analogy: the bucket has a name associated with it, i.e. the name of the variable, and when referring to the information in the bucket, we use the name of the bucket, and do not directly refer to the actual data stored in it.

#### Assign value to a variable

Let's start with a creating simple variable that has a single number stored in it. First we need a name for our variable, and we need to assign some value to it. Assigning value is done using the equals operator:

```bash
$ num=25
```
It is critical that there is no space in our assignment statements, num = $25 would not work.

>**Other ways to assign a value to a variable**
>
>The syntax for varable assignment depending on whether you want to assign a number, a string with/without spaces, another variable, or a command. For example:
>
>variable=number for a number or a character string without spaces.
>>example: `variable=12` will assign the number 12 to `$variable`
>
>variable=‘a string’ or ”a string” for a character string with spaces.
>>example: `variable="My variable"`.
>
>variable2=$variable1 to assign the value of another variable (this will be demonstrated in more detail in the next lesson)
>>example: `variable=$1`
>
>variable=$(command) or variable=\`command\` for output of a command.
>>example: `variable=$(wc -l file.txt)` will assign the number of lines in the file file.text to `$variable`
>
>>example: `` variable=`wc -l file.txt` `` will assign the number of lines in the file file.text to `$variable`
>
> Later in this module we will touch on some of these other ways to create variables. For now, let's stay focused on the `num` variable

#### Retrieve value stored in a variable

*How do we know that we actually created the bash variable?* We can use the `echo` command to print to terminal:

```bash
$ echo num
```

What do you see in the terminal? The `echo` utility takes what arguments you provide and prints to terminal. In this case it interpreted `num` as a a character string and simply printed it back to us. This is because **when trying to retrieve the value stored in the variable, we explicitly use a `$` in front of it**:

```bash
$ echo $num
```

Now you should see the number 25 returned to you. Did you notice that when we assigned value we just typed in the variable name? This is standard shell notation (syntax) for defining and using variables. When defining the variable (i.e. setting the value) you can just type it as is, but when **retrieving the value of a variable don't forget the `$`!** 

Variables can also store a string of character values. In the example below, we define a variable or a 'bucket' called `file`. We will put a filename `Mov10_oe_1.subset.fq` as the value inside the bucket.

```bash
$ file=Mov10_oe_1.subset.fq
$ echo $file
```

Let's try another command using the variable that we have created. We can count the number of lines in `Mov10_oe_1.subset.fq` by referencing the `file` variable using the word count command, `wc`:

```bash
$ wc -l $file
```

Why didn't that work, when `echo` did work? Commands like `echo` will print out the value of the stored variable, which in our case is a string (which happens to be a file name, but `echo` doesn't care about that). Commands like `wc` execute on files, so shell looked for a file in our current directory whose name matched the string stored in our `$file` variable. It couldn't find it, so it let us know. In order to execute `wc` on the actual file whose name is stored in `$file`, we need to navigate to the folder which actually contains that file.

Let's try `wc` again after we move into the `raw_fastq` directory:

```bash
$ cd ~/unix_lesson/raw_fastq
$ wc -l $file
```

> *NOTE:* The variables we create in a session are system-wide, and independent of where you are in the filesystem. This is why we can reference it from any directory. However, it is only available for your current session. If you exit the close your Terminal and come back again at a later time, the variables you have created will no longer exist.

***

**Exercise**

* Reuse the `$file` variable to store a different file name, and rerun the commands we ran above (`wc -l`, `echo`)

***

Ok, so we know variables are like buckets, and so far we have seen that bucket filled with a single value. **Variables can store more than just a single value.** They can store multiple values and in this way can be useful to carry out many things at once.

Let's create a new variable called `filenames` and this time we will store *all of the filenames* in the `raw_fastq` directory as values. 

To list all the filenames in the directory that have a `.fq` extension, we know the command is:

```bash
$ ls *.fq
```

Now we want to *assign* the output of `ls` to the variable. To do so, we can do this in one of two ways as we described above:

1. ``variable=`command` ``
2. `variable=$(command)`

We'll do so with backticks:

```bash
$ filenames=`ls *.fq`
```

>We could have also used:
> 
>```bash
>$ filenames=$(ls *.fq)
>```

Check and see what's stored inside our newly created variable using `echo`:
	
```bash
$ echo $filenames
```

Let's try the `wc -l` command again, but this time using our new variable `filenames` as the argument:

```bash
$ wc -l $filenames
```

What just happened? Because our variable contains multiple values, the shell runs the command on each value stored in `filenames` and prints the results to screen. 

***

**Exercise**

* Use some of the other commands you are familiar with (i.e. `head`, `tail`) on the `filenames` variable. 

***

## Loops

Another powerful concept in the Unix shell and useful when writing scripts is the concept of "Loops". We have just shown you that you can run a single command on multiple files by creating a variable whose values are the filenames that you wish to work on. But what if you want to **run a sequence of multiple commands, on multiple files**? This is where loops come in handy!

Looping is a concept shared by several programming languages, and its implementation in *bash* is very similar to other languages. 

The structure or the syntax of (*for*) loops in bash is as follows:

```bash
for (variable_name) in (list)
do
(command1 $variable_name)
.
.
done
```

where the ***variable_name*** defines (or initializes) a variable that takes the value of every member of the specified ***list*** one at a time. At each iteration, the loop retrieves the value stored in the variable (which is a member of the input list) and runs through the commands indicated between the `do` and `done` one at a time. *This syntax/structure is virtually set in stone.* 


#### What does this loop do? 

```bash
for x in *.fq
 do
   echo $x
   wc -l $x
 done
```

Most simply, it writes to the terminal (`echo`) the name of the file and the number of lines (`wc -l`) for each files that end in `.fq` in the current directory. The output is almost identical to what we had before.

In this case the list of files is specified using the asterisk wildcard: `*.fq`, i.e. all files that end in `.fq`. 

Then, we execute 2 commands between the `do` and `done`. With a loop, we execute these commands for each file at a time. Once the commands are executed for one file, the loop then executes the same commands on the next file in the list. 

Essentially, **the number of items in the list (variable name) == number of times the code will loop through**. 

In our case that is 6 times since we have 6 files in `~/unix_lesson/raw_fastq` that end in `.fq`, and these filenames are stored in the `filename` variable.

It doesn't matter what variable name we use in a loop structure, but it is advisable to make it something intuitive. In the long run, it's best to use a name that will help point out a variable's functionality, so your future self will understand what you are thinking now.

### Another way to write loops

Above we have used `for filename in *.fq` to tell bash how many times we want the loop to run (how many .fq files there are in that directory). But there are many times that you have a specific number of times you want a loop to run. For instance if you are running the same analysis multiple times or are performing simulations. Here is a simple loop written in this manner:

```bash
#!/bin/bash 

for ((i=1; i<=10; i=i+1))
do 
  echo $i is a number!
done
```

Before we run this, let's go through it line by line.

`for ((i=1; i<=10; i=i+1))`
>This tells bash how our loop is working. We want to start at 1 (`i=1`) and end at 10 (`i<=10`) and each time we complete our loop the value i should increase by 1 (`i=i+1`). That means the loop will run 10 times. But we could make it run 100 times by changing `i<=10` to `i<=100`. `i` is our counter variable to track how many loops we have run. You will often see this called `i` or `j` but you can actually call it whatever you want. `i` and `j` are used because they are shorter to write.

`do`
>This is the same as our previous loop and means that whatever follows is what we want bash to do for each value of `i` (here 1,2,3,4,5,6,7,8,9,and 10).

`  echo $i is a number!`
>Here we echo the value of `$i` and the string `' is a number!'`.

`done`
>This closes the `for` loop. This tells bash that this is the end of the commands that we need it to do for each value of `i`.

Let's use `nano` to write this as `numbers.sh` run our script. Is the output what you thought?

***

**Exercise**
* How would you change the script so that it prints out the numbers from 27-32?
***

## The `basename` command

Before we get started on creating more complex scripts, we want to introduce you to a command that will be useful for future shell scripting. The `basename` command is used for extracting the base name of a file, which is accomplished using **string splitting to strip the directory and any suffix from filenames**. Let's try an example, by first moving back to your home directory:

```bash
$ cd
```

Then we will run the `basename` command on one of the FASTQ files. Be sure to specify the path to the file:

```bash
$ basename ~/unix_lesson/raw_fastq/Mov10_oe_1.subset.fq
```

What is returned to you? The filename was split into the path `unix_lesson/raw_fastq/` and the filename `Mov10_oe_1.subset.fq`. The command returns only the filename. Now, suppose we wanted to also trim off the file extension (i.e. remove `.fq` leaving only the file *base name*). We can do this by adding a parameter to the command to specify what string of characters we want trimmed.

```bash
$ basename ~/unix_lesson/raw_fastq/Mov10_oe_1.subset.fq .fq
```

You should now see that only `Mov10_oe_1.subset` is returned. 

***

**Exercise**

* How would you modify the above `basename` command to only return `Mov10_oe_1`?

***

## Automating with Scripts
	
Now that you've learned how to use loops and variables, let's put this processing power to work. Imagine, if you will, a script that will run a series of commands that would do the following for us each time we get a new data set:

- Use the `for` loop to iterate over each FASTQ file
- Generate a prefix to use for naming our output files
- Dump out bad reads into a new file
- Get the count of the number of bad reads and generate a summary for each file

You might not realize it, but this is something that you now know how to do. Let's get started...

Rather than doing all of this in the terminal we are going to create a script file with all relevant commands. Move back into `unix_lesson` and use `nano` to create our new script file. If you have never used nano before you can find the basics [HERE](https://github.com/hbctraining/Training-modules/blob/heather_edits/Basic_shell/03_creating_files.md):

```bash
$ cd ~/unix_lesson

$ nano generate_bad_reads_summary.sh
```

We always want to start our scripts with a shebang line: 

```bash
#!/bin/bash
```

This line is the absolute path to the Bash interpreter on almost all computers. The shebang line ensures that the bash shell interprets the script even if it is executed using a different shell. 

> Your script will still work without the shebang line if you run it with the `sh` or `bash` commands, but it is best practice to have it in your shell script.

After the shebang line, we enter the commands we want to execute. First, we want to move into our `raw_fastq` directory:

```bash
# enter directory with raw FASTQs
cd ~/unix_lesson/raw_fastq
```

And now we loop over all the FASTQs:

```bash
# count bad reads for each FASTQ file in our directory
for filename in *.fq
```

For each file that we process we can use `basename` to create a variable that will uniquely identify our output file based on where it originated from:

```bash
do
  # create a prefix for all output files
  base=`basename $filename .subset.fq`
```

and then we execute the following commands for each file:

```bash
  # tell us what file we're working on
  echo $filename
  
  # grab all the bad read records into new file
  grep -B1 -A2 NNNNNNNNNN $filename > ${base}-badreads.fastq
``` 
> #### About the grep command and redirection operator (>)
> `grep`, short for **G**lobal **R**egular **E**xpression **P**rint, is a Unix command used to search files for the occurrence of a string of characters that matches a specified pattern. In this case, we are using grep to search for strings of N in our reads and retrieve the two lines above and one line below those reads using the `B` and `A` flags. Then, we are writing this output to a new file using the redirection operator, `>`. To learn more about `grep` and its usage, you can type `man grep` or `grep --help` into the terminal. We'll also be covering more `grep` in a later module.

> #### Why are we using curly brackets with the variable name?
When we append a variable with free text, we need shell to know where our variable name ends. By encapsulating the variable name in curly brackets we are letting shell know that everything inside it is the variable name. This way when we reference it, shell knows to print the variable `$base` and not to look for a variable called `$base_badreads.fq`.

>Note that $base is actually a short form of ${base}. We can only ditch the curly brackets and rely on the short form when the variable name is **not** followed by a letter, digit, or an underscore. As you write your own code it is good practice to be safe to use `${variable}` and understand that errors may result from not using curly brackets when needed, even if it is convnient. As you navigate scripts written by other people you will see both forms.

We'll also add an additional `grep` statement which uses the `c` flag to count the reads it finds, and also uses the `H` flag to include the file name in the output, which will be redirected to a count summary file via `>`:

```bash
  # grab the number of bad reads and write it to a summary file
  grep -cH NNNNNNNNNN $filename > ${base}-badreads.count.summary
done
```

Save and exit `nano`, and voila! You now have a script you can use to assess the quality of all your new datasets. Your finished script, complete with comments, should look like the following:

```bash
#!/bin/bash 

# enter directory with raw FASTQs
cd ~/unix_lesson/raw_fastq

# count bad reads for each FASTQ file in our directory
for filename in *.fq 
do 

  # create a prefix for all output files
  base=`basename $filename .subset.fq`

  # tell us what file we're working on	
  echo $filename

  # grab all the bad read records
  grep -B1 -A2 NNNNNNNNNN $filename > ${base}-badreads.fastq

  # grab the number of bad reads and write it to a summary file
  grep -cH NNNNNNNNNN $filename > ${base}-badreads.count.summary
done

```

To run this script, we simply enter the following command:

```bash
$ sh generate_bad_reads_summary.sh
```

How do we know if the script worked? Take a look inside the `raw_fastq` directory, we should see that for every one of the original FASTQ files we have two associated bad read files.

```bash
$ ls -l ~/unix_lesson/raw_fastq 
```

To keep our data organized, let's move all of the bad read files out of the `raw_fastq` directory into a new directory called `other`, and the script to a new directory called `scripts`.

```bash
$ mv raw_fastq/*bad* other/

$ mkdir scripts
$ mv *.sh scripts/
```

## Ways to assign variables covered

```
variable=number			#assign a numeric value ie 0, 12, etc
variable=string			#assign a character string with no spaces
variable="a string with spaces"	#assign a character string with spaces
variable=$another_variable	#assign a different variable
variable=$(command)		#assign a command
   or
variable=`command`		#assign a command (alternative method)
```

[Next Lesson](https://hbctraining.github.io/Training-modules/Accelerate_with_automation/lessons/positional_params.html)

---
*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

* *The materials used in this lesson were derived from work that is Copyright © Data Carpentry (http://datacarpentry.org/). 
All Data Carpentry instructional material is made available under the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0).*
* *Adapted from the lesson by Tracy Teal. Original contributors: Paul Wilson, Milad Fatenejad, Sasha Wood and Radhika Khetani for Software Carpentry (http://software-carpentry.org/)*


