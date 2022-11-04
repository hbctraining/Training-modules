---
title: "Introdcution to Positional Parameters and Variables"
author: "Emma Berdan"
---

## Learning Objectives:

* Understand what variables and positional parameters are in Bash scripting
* Understand basic syntax rules for implementation
* Begin to explore ways in which these can be used in bioinformatics

## What is a variable?

“A variable is a character string to which we assign a value. The value assigned could be a number, text, filename, device, or any other type of data.

A variable is nothing more than a pointer to the actual data. The shell enables you to create, assign, and delete variables.” ([Source](https://www.tutorialspoint.com/unix/unix-using-variables.htm)

It is easy to identify a variable in any bash script as they will always have the $ in front of them. Here is my very cleverly named variable: $Variable

## Positional parameters are a special kind of variable

“A positional parameter is an argument specified on the command line, used to launch the current process in a shell. Positional parameter values are stored in a special set of variables maintained by the shell.” [Source](https://www.computerhope.com/jargon/p/positional-parameter.htm)

So rather than something that is identified inside the bash script a positional parameter is given when you run your script. This makes it more flexible as it can be changed without modifying the script itself.  

<p align="center">
<img src="../img/positional-parameter.jpg" width="600">
</p>


