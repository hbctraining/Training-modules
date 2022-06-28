# Advanced Shell Outline

## sed

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#sed

## Regular Expressions
https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#regular-expressions-regex-in-bash-

## grep with Regular Expressions

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#reintroducing-grep-gnu-regex-parser-

## awk

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#awk

* Printing columns

* Column math like sum and average

* for loops

## Creating shortcuts or alias

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/more_bash.md#alias

## .bashrc profile

## Copying files using to and from a cluster

Oftentimes, you'll find yourself wanted to copy a file between computing cluster and your local computer and this is where `scp` and `rsync` can be used.

### scp

The general syntax of `scp` is similar to that of `cp`:

```
scp <origin> <destination>
```

However, since either `<origin>` and/or `<destination>` is on a computing cluser, you will need to provide host information followed by a `:` then the full path to the file/directory. If we wanted to copy a file from O2 to our local machine, we could use:

```
scp username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2 /path/to/directory/local_machine
```

Alternatively, if you wanted to copy a file from your local machine to O2 you would rearrange the command:

```
scp /path/to/directory/local_machine username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2
```

You can also recursively copy an entire directory with the `-r` option.

```
scp -r /path/to/directory username@transfer.rc.hms.harvard.edu:/path/to/new_directory_on_O2
```

### rsync

`rsync` is a popular alternative to `scp`. One major reason it is popular is if the data transfer is interrupted, `scp` will need to begin again, while `rsync` can resume from where it left off.

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/more_bash.md#copying-files-to-and-from-the-cluster-

## Symbolic Links

Symbolic links, or "sym links", are an important shortcut on the command line that can save you lots of space. A symbolic link points to a location and can be very useful when software wants to have a file in a particular location. Of course, you can simply copy a file and have it stored in two locations, but it could be a large file and now it is taking up space in two locations. To avoid doing this, you can set-up a symbolic link using the following syntax:

```
ln -s <file_to_be_linked_to> <link_name>
```

Let's assume we have a file named `reads.fasta` inside the directory `raw_reads`, but we want a symbolic link named `link_to_reads.fasta` to link to the reads in the directory that we are currently in, which is in the parent directory of `raw_reads`. This command would look like:

```
ln -s raw_reads/reads.fasta link_to_reads.fasta
```

When you now view this directory with `ls -l`, it will display the link like:

```
link_to_reads.fasta -> raw_reads/reads.fasta
```

If you want to keep the current name you can use `.` for `<link name>`.

***Importantly, if the original file is deleted or moved, the symbolic link will become broken.*** It is common on many distributions for symbolic links to blink if they becomes broken.

The `-s` option is necessacary for creating a symbolic link. Without the `-s` option, a ***hard link*** is created and modifications to the linked file will be carried over to the original. Generally, speaking hard links are typically not very common.



https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/more_bash.md#symlink

## Math

There are two common ways of carrying out math on the command-line interface. One way uses a language called `bc` and the other utilizes `awk`. So let's look at these two methods

### bc

`bc` stands for *basic/bench calculator* and is actually it's own standalone language. In order for math to be carried out by `bc`, it needs to first be piped into `bc`. In this case, we are going to pipe in the equation we want it to calculate with a preceeding `echo` command.

```
echo '6 + 2' | bc
```

*NOTE: The whitespace in the above inside `'2+1'` is arbitarty and does not impact calculations.*

It should return `8`. In fact you can do many basic math operations with integers like this.

```
# Subtraction
echo "6 - 2" | bc

# Multiplication
echo "6 * 2" | bc

# Division
echo "6 / 2" | bc

# Exponent
echo "6 ^ 2" | bc

# Square Root
echo "sqrt(4)" | bc
```

You can also do more complex math that involves parentheses:

```
echo "(3 + 1) * 4" | bc
```

*NOTE: You can use single or double quotes when carrying out math with `bc`, but if you want to use `bash` variables you will want to use double quotes. For this reason, it is best practice just to always use double quotes.

We can also feed `bc` variables, such as:

```
variable_1=4
variable_2=3

# Will return an error
echo '$variable_1 + $variable_2' | bc

# Will return the answer
echo "$variable_1 + $variable_2" | bc
```

This should return the correct answer of `7`.

While thie seems great there are some limitations that `bc` has. The biggest issue with `bc` it does not handle decimals well, particularly with division. Let's look at the following case:

```
echo '1 / 3' | bc
```

It should return `0`, which is clearly erroreouns. This is because base `bc` defaults to just the integer position.  There are two ways to fix this behavior:

### `scale` parameter

Before the equation you would like `bc` to calculate you can put a `scale` parameter, which will tell `bc` how many decimal places to calculate to.

```
echo 'scale=3; 1 / 3' | bc
```

Now we can see that `bc` returns the appropriate answer of `.333`.

### -l option

Adding the `-l` option for `bc` will have utilize the a broader range of math and this automatically sets the scale paramter to 20 by default.

```
echo '1 / 3' | bc -l
```

This should return `.33333333333333333333`. You can overwrite this default scale parameter by just adding `scale=` as you had in the previous example. In general, because `-l` option helps with 

```
echo 'scale=3; 1 / 3' | bc -l
```

The -l option does also open up a few more functions including:

```
# Natural log
echo 'l(1)' | bc -l

# Exponential function
echo 'e(1)' | bc -l
```

It does also provide access to sine, cosine and arctangent, but those are outside of the scope of this course. 

## Negative Numbers

`bc` can also handle negtaive numbers as input and output 

```
echo "-1 + 2" | bc -l

echo "1 - 2" | bc -l

echo "2 ^ -3 | bc -l"
```

### awk


***
***

## `if` statements

## while read loops

## Associative Arrays in bash

## Arrays in bash

## Positional Parameters

## Searching history

## O2 Job Dependencies

## O2 Brew

## O2 Conda

## vim macros

## watch

Sometimes one may want to see the ouptut of a command that continuously changes. The `watch` command is particularly useful for this. Add `watch` before your command and your command line will take you to an output page that will continually up your command. Common uses for `watch` could be:

1) Viewing as files get created

```
watch ls -lh <directory>
```

2) Monitoring jobs on the cluster

```
watch squeue -u <username>
```

The default interval for update is two seconds, but that can be altered with the `-n` option. Importantly, the options used with `watch` command need to be placed ***before*** the command that you are watching or else the interpreter will evaluate the option as part of the watched command's options. An example of this is below:

Update every 4 seconds
```
watch -n 4 squeue -u <username>
```


## time

Sometimes you are interested to know how long a task takes to complete. Similarly, to the `watch` command you can place `time` infront of a command and it will tell you how long the command takes to run. This can be particularly useful if you have downsampled a dataset and you are trying to estimate long long the full set will take to run. An example can be found below:

```
time ls -lh
```

The output will have three lines:

```
real	0m0.013s
user	0m0.002s
sys	0m0.007s
```

**real** is most likely the time you are interested in since it displays the time it takes to run a given command. **user** and **sys** represent CPU time used for various aspects of the computing and can be impacted by multithreading. 

## bg

## md5sum

Sometimes you are copying files between two locations and you want to ensure the copying went smoothly or are interested to see if two files are the same. Checksums can be thought of as an alphanumeric fingerprint for a file and they are used to ensure that two files are the same. `md5sum` is one common checksum. ***Importantly, it is theorectically possible that two different files have the same md5sum, but it is practically nearly impossible.*** The syntax for checking the md5sum of a file is:

```
md5sum <file>
```
