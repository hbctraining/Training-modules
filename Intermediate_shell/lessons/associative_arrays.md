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




