# Associative Arrays in bash

## Learning Objectives

In this lesson we will:

- Describe the structure and function of associative arrays in programming
- Implement an associative array in bash
- Use a loop to read a file into an associative array

## What is an Associative Array?

Associative arrays are a data structure in computing that stores "key-value" pairs. A "key-value" pair refers to a "key" term that allows you to look up its associated "value". An analogy for associative arrays is to think of them like a dictionary, where the "key" is the word you would like to define and the "value" is the definition. These data structures are oftentimes quite memory efficient and allows for a rapid look-up feature. However, the computer science behind how they achieve this is beyond the scope of this module. Importantly, all *keys* **MUST BE UNIQUE**, while *values* **DO NOT NEED TO BE UNIQUE**. 

> NOTE: While associative arrays are the general term for this type of data structure and what they are called in bash, in other languages they have different names, such as maps, dictionaries, symbol table or hashes.

Let's consider a toy example for an associative array called `noises`:

<p align="center">
<img src="../img/associative_array.png" width="400">
</p>

In this toy example, the *key* "dog" is associated with the *value* "woof", "goose is associated with "honk" and so on. As you can see, each *key* is unique, but both "goose" and "horn" have the same *value*.

## Implementing an Associative Array in bash

Using an associative array occurs in 3 steps:

1) Declaring the associative array
2) Populating the associative array
3) Querying the associative array

### Declaring the Associative Array

In `bash`, it is necessary to `declare` an associative array before you begin using it. To do so, you will need to use the `declare` function in `bash`. The two main cases where you will most likely use the `declare` function is when you are either declaring an associative array (`-A` option) or an array (sometimes just called an indexed array; `-a` option). We will talk more about arrays/indexed array in a different lesson.

> NOTE: If you're on a Mac, then you are likely running Bash version 3.2. In which case, associative arrays **do not exist** in bash version 3.2. Fortunately, the O2 cluster runs on bash version 4+.

Let's begin by declaring our `noises` array:

```
declare -A noises
```

### Populating the Associative Array

Now that we have declared our associative array, we can populate it with *key-value* pairs. The syntax for this is:

```
# Example Syntax
associative_array_name["key"]="value"
```

If we wanted to populate our *noises* associatiave array with the above noises, then it would look like:

```
noises["dog"]="woof"
noises["goose"]="honk"
noises["cat"]="meow"
noises["horn"]="honk"
```
Now your *noises* associative array is populated and ready to be queried.

### Querying your Associative Array

In order to retrieve the *value* associated with a *key*, we will need to query it with the following syntax:

```
# Example Syntax
echo ${associative_array_name["key"]}
```

For example if we wanted the value associated with "cat", then we would use:

```
echo ${noises["cat"]}
```

And it should return:

```
meow
```

### Exercise

1. When might you use an associative array in your own data analysis?

## Reading a file into an Associative Array

Rarely, will you ever manually enter the the keys and values in for an associative array like we have done above. Oftentimes, your key-value lists will be quite long and to enter each of those manually would be tedious and error-prone. Below we will discuss how to read in a file to populate an associative array. This is a pretty common implementation of associative arrays. The other popular implementation is that you have a program running and you are feeding output from one part of it into an associative array to be queried later. 


It is fairly common when one receives data to have an accompanying files that included the `md5sum` values for the files. We have included this file for the contents of the `data/` directory and called it `md5sum.txt`. We can take a brief look at this file:

```
cat md5sum.txt
```

We can see that it is two columns with the filenames on the right and their associated md5sum of the left. It should look like:

```
acff4581ddc671047f04eb1ed2f56b64  catch.txt
8c706987a93564cfde876540e76d52f1  ecosystems.csv
81c0b67ea957b70535f52c4b26871266  ecosystems.txt
b195297072d59ef8f08d53b3b857ca89  more_ecosystems.txt
fd27045abe101d2a5b39dc166a93c7d7  next_file.txt
3ef799ee455daf0eb1e3b6e593ce7423  sed_expressions.txt
```

Now let's write a sample script to read this in and allow us to look-up the md5sum of any file using a positional parameter. First let's open up a new file:

```
vim md5sum_lookup.sh
```

Within this file, we can insert this commented code:

```bash
#!/bin/bash
# Written by [Insert name] on [Insert date]

# Declare an associative array to hold the md5sums
declare -A md5sum_associative_array

# Open a while loop to read each line and assign the first column to the variable "provided_md5sum" and the second column to the variable "filename"
while read -r provided_md5sum filename; do
    # Populate the associative array with each filename (key) and it's associated md5sum (value)
    md5sum_associative_array[$filename]=$provided_md5sum
# End loop and the input file is provided
done < /home/${USER}/advanced_shell/md5sum.txt

# Query the associative array using a positional parameter
echo ${md5sum_associative_array[$1]}
```

Now, we can run this code to query the provided md5sum of any file in the provided list by using:

```
# Example syntax
sh md5sum_lookup.sh file.txt
```

So if we wanted to see that the provided md5sum for `ecosystems.txt` was, then we could:

```
sh md5sum_lookup.sh ecosystems.txt
```

This script on it's own might not be the most useful, but we will build on it using conditional statements in further lessons to allow us to check the provided md5sum value with those we produce ourselves.

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
