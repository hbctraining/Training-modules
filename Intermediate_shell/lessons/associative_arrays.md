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
<img src="../img/associative_array.png" width="800">
</p>



