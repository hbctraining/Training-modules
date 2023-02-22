
# If-Then-Else


Sometimes we need to make decisions in bash.  For example let's say that our program writes a file and we give our desired file name as a [positional parameter](positional_params.md) with our script:

```
sh myscript.sh FILE_NAME
```

However, if FILE_NAME already exists we do not want to overwrite this. In fact we want to warn the user that the file already exists. Within myscript.sh we can include the following code:

```
FILE=${1}

if [[ -e ${FILE} ]]; 
then
	echo "${FILE} already exists!"; 
	exit 1
fi
```

Let's go through this line by line. 

* `FILE=${1}` names positional parameter 1 FILE. `if [[ -e ${FILE} ]];` asks if `${FILE}` exists. Note that there are spaces between `-e ${FILE}` and the square brackets. **NOTE: bash is VERY finicky about how whitespace is set up in conditional statements and these spaces are crucial for the code to run correctly. Incorrect spacing is one of the most common script errors for conditional statements**. The `;` separates synchronous commands in bash. 
* `then` tells bash what follows is what it should do if it evulaute the previous clause as true. We could write something like `if [[ 1 -eq 1 ]];` (if one equals one) for a statement that is ALWAYS true or `if [[ 1 -eq 2 ]];` (1 equals 2) for a statment that is always FALSE.
* Next we tell bash what to do: `echo "${FILE} already exists!";`. In this case we want it to echo (print back onto the command line) the phrase "${FILE} already exists!" to alert the user.
* As the file exists we want our script to stop instead of proceeding `exit 1` tells bash to exit the script under an error condition. 
* Finally `fi` ends if clause. If the original if statement is true bash will execute all commands until it reaches `fi`.

Below we will go through what might be in your if statement. Then we will explore having multiple if/else if statements.

## Crafting an if statement in bash

### File Conditions
Almost all if statements that you will use will have to do with file state (present, absent, is it a directory) or properties of files.

The main file conditions are:

* -e Does the file exist?
* -d Is it a directory?
* -f Is it a regular file?
* -r Does the file exist and is it readable?
* -x Does the file exist and is its size greater than zero (i.e., not an empty file)?

Each of these can be combined with `!` to indicate not. For example: `if [[ -e ${FILE} ]];` evaluates if ${FILE} exists and `if [[ ! -e ${FILE} ]];` evaluates if ${FILE} does NOT exist.

### Multiple Conditions

Sometimes you will want to evaluate multiple conditions at once. For example maybe you need to check that 2 files exist before proceeding or you need to make sure the files are a certain length. If commands can be modified for including multiple conditions.

```
FILE=${1}
FILE2=${2}

if [[ -e ${FILE} ]] && [[ -e ${FILE2} ]]; 
then
	echo "${FILE} and ${FILE2} already exist!"; 
	exit 1
fi
```

Here I am checking that both `${FILE}` and `${FILE2}` exist before proceeding. The `&&` indicates that bash should evaluate if both conditions are true. There may also be times where I only need one of the two files to exist:


```
FILE=${1}
FILE2=${2}

if [[ -e ${FILE} ]] || [[ -e ${FILE2} ]]; 
then
	echo "Either ${FILE} or ${FILE2} already exists!"; 
	exit 1
fi
```

Here bash will proceed if EITHER `||` file exists. Only one of them will need to exist for bash to proceed. If they both exist the condition is still evaluated as true.

### Else if

We can also ask bash multiple questions. Let's pretend that you are at a grocery store and ask if they have cheezits, if they say no you might ask for goldfish, no again and you may ask for saltines (but not the unsalted kind, never the unsalted kind). You can do the same thing with bash!

For a bioinformatic example let's say we have a pipeline. We start with sample.sam then make sample.bam then sample_sorted.bam then index that file to make sample_sorted.bai. We want to check that our pipeline has completed. For maximum flexbibility we write our script to take the name of the sample as positional parameter 1.

```
sample=${1}


if [[ -e ${sample}_sorted.bai ]] ; 
then
	echo "Pipeline finished!";
else	
	echo "Pipeline failed :( ";
fi
```

Here the `else` tells bash what to do if it evaluates the condition as false. If that file does not exist bash will give the second message.
However, it is not super helpful to just know the pipeline failed. We want to know where it failed! Just like with the grocery store if there are no cheezits we want to check for the next best thing. We can modify our script using `elif` which stands for "else if". If the first condition is true then bash will see if this second condition might be true. We can go on and on and on with elif until we arrive at our last possible choice (unsalted saltines, yuck!).

```
if [[ -e ${sample}_sorted.bai ]] ; 
then
	echo "Pipeline finished!";
elif 	[[ -e ${sample}_sorted.bam ]] ; 
then
	echo "Indexing Failed";
elif 	[[ -e ${sample}.bam ]] ; 
then
	echo "Sorting Failed";
elif 	[[ -e ${sample}.sam ]] ; 
then
	echo "Sam to bam failed";
elif 	[[ -e ${sample}.sam ]] ; 
then
	echo "Sam file is missing!";
else
	echo "Something is wrong but I don't know what it is!";
fi
```

This script is much more handy as we can determine where in our pipeline we had an issue.

