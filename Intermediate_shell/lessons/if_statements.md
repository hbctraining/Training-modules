
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

* `FILE=${1}` names positional parameter 1 FILE. `if [[ -e ${FILE} ]];` asks if `${FILE}` exists. Note that there are spaces between `-e ${FILE}` and the square brackets. **These spaces are crucial for the code to run correctly**. The `;` separates synchronous commands in bash. 
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

if [[ -e $FILE ]] ; 
then
	echo "$FILE already exists!"; 
	exit 1
fi
```
