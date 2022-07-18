# sed

The ***s***tream ***ed***itor, `sed`, is a common tool used for text manipulation. `sed` takes input from either a file or piped from a previous command and applies a transformation to it before outputting it to standard out.

**Topics discussed here are:**

[Substitution](sed.md#substitution)

[Addresses](sed.md#addresses)

[Deletion](sed.md#deletion)

[Appending](sed.md#appending)

[Replacing Lines](sed.md#replacing-lines)

[Translation](sed.md#translation)

[Multiple Expressions](sed.md#multiple-expressions)

[Additonal Resources](sed.md#additional-resources)

---

[Return to Table of Contents](toc.md)

## substitution

One common usage for `sed` is to replace one word with another. The syntax for doing this is:

```
sed 's/pattern/replacement/flag' file.txt 
```

A few things to note here:

1) The `s` in `'s/pattern/replacement/flag'` is directing `sed` to do a ***s***ubstitution.
2) The `flag` in `'s/pattern/replacement/flag'` is directing `sed` that you want this action to be carried out in a specific manner. It is very common to use the flag `g` here which will carry out the action ***g***lobally, or each time it matches the `pattern`. If `g`, is not included it wil just replace the `pattern` the first time it is observed per line. If you would like to replace a particular occurance like the third time it is observed in a line, you would use `3`.

Let's test this out on our sample file and see that output. First, we are interested in replacing 'jungle' with 'rainforest' throughout the file:

```
sed 's/jungle/rainforest/g' animals.txt
```

Notice how all instances of 'jungle' have been replaced with 'rainforest'. However, if we don't include the global option:

```
sed 's/jungle/rainforest/' animals.txt
```

We will only recover the first instance of 'jungle' was replaced with 'rainforest'. If we want to replace only the second occurance of 'jungle' with 'rainforest' on a line, modify the occurance to be `2`:

```
sed 's/jungle/rainforest/2' animals.txt
```

It is important to note that the pattern-matching in `sed` is case-sensitive. To make your pattern searches case-insensitive, you will need to add at the `I` flag:

```
sed 's/Jungle/rainforest/Ig' animals.txt
```

This will now replace all instances of Jungle/jungle/JuNgLe/jUngle/etc. with 'rainforest'.

***I don't know if you can do multiple occurances, like 2nd and 4th***

***Haven't discussed 2g syntax that will replace the the 2nd occurance and all subsequent occurances***

### -n option

In `sed` the `-n` option will create no standard output. However, you can pair with with the occurance flag `p` and this will print out only lines that were were edited.

```
sed -n 's/an/replacement/p' animals.txt
```

The `-n` option has another useful purpose, you can use it to find the line number of a matched pattern by using `=` after the pattern you are searching for:

```
sed -n '/jungle/ =' animals.txt
```

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Addresses

### Single lines

One can also direct which line, the ***address***, `sed` should make an edit on by adding the line number in front of `s`. This is most common when one wants to make a substituion for a pattern in a header line and is worried that the pattern might be elsewhere in the file. It is best practice to wrap your substitution argument in curly brackets (`{}`) when using address. To demonstrate this we can compare to commands:

```
sed 's/an/replacement/g' animals.txt
sed '1{s/an/replacement/g}' animals.txt
```

In the first command, `sed 's/an/replacement/g' animals.txt` we have replaced all instances of 'an' with 'replacement'. However, in the second command, `sed '1s/an/replacement/g' animals.txt`, we have only replaced instances on line 1.

While wrapping the substitution in curly brackets isn't required when using a single line, it is necessacary when defining an interval. As you can see:

```
sed '1s/an/replacement/g' animals.txt
```

Produces the same output as above. 

### Intervals

If you only want to have this substitution carried out on the first three lines (`1,3`, this is giving an address interval, from line 1 to line 3) we would need to do include the curly brackets:

```
sed '1,3{s/an/replacement/g}' animals.txt
```

You can also replace the second address with a `$` to indicate until end of the file like:

```
sed '5,${s/an/replacement/g}' animals.txt
```

This will carry out the substitution from the fifth line until the end of the file.

You can also use regular expressions in the address field. For example, if you only wanted the substitution happening between your first occurence of 'monkey' and your first occurrance of 'alligator', you could do:

```
sed '/monkey/,/alligator/{s/an/replacement/g}' animals.txt
```

Alternatively, if you want a replacement to happen every except a given line, such as all of you data fields but not on the header line, then one could use `!` which tells sed 'not'.

```
sed '1!{s/an/replacement/g}' animals.txt
```

You can even couple `!` with the regular expression intervals to do the substitution everywhere outside the interval:

```
sed '/monkey/,/alligator/!{s/an/replacement/g}' animals.txt
```

Lastly, you can use `N~n` in the address to indicator that you want to apply the substitution every *n*th line starting on line *N*. In the below example, starting on the first line and every 2nd line, the substitution will occur

sed '1~2{s/an/replacement/g}' animals.txt

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Deletion

You can delete entire lines in `sed`. To delete lines proved the address followed by `d`. To delete the first line from a file:

```
sed '1d' animals.txt
```

Like substitutions, you can provide an interval and this will delete line 1 to line 3:

```
sed '1,3d' animals.txt
```

Also like substitution, you can use `!` to specify lines not to delete like:

```
sed '1,3!d' animals.txt
```

Additionally, you can also use regular expressions to provide the addresses to define an interval to delete from. In this case we are interested in deleting from the first instance of 'alligator' until the end of the file:

```
sed '/alligator/,$d' animals.txt
```

The `N~n` syntax also works in deletion. If we want to delete every thrid line starting on line 2, we can do:

```
sed '2~3d' animals.txt
```

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Appending

### Appending text

You can append a new line with the word 'ape' after the 2nd line using the `a` command in `sed`:

```
sed '2 a ape' animals.txt
```

If you want the appended text to come before the address, you need to use the `i` command:

```
sed '2 i ape' animals.txt
```

You can also do this over an interval, like from the 2nd to 4th line:

```
sed '2,4 a ape' animals.txt
```

Additionally, you can append the text every 3rd line begining with the second line:

```
sed '2~3 a ape' animals.txt
```

Lastly, you can also append after a matched pattern:

```
sed '/monkey/ a ape' animals.txt
```

### Appending a file

You could in interested in inserting the contents of **file B** inside at a certain point of **file A**. For example, if you wanted to insert the contents `file_B.txt` after line `4` in `file_A.txt`, you could do:

```
sed '4 r file_B.txt' file_A.txt
```

Instead of line `4`, you can append the file between every line in the interval from line 2 to line 4 with:

```
sed '2,4 r file_B.txt' file_A.txt
```

You could also append the line after each line by using `1~1` syntak:

```
sed '1~1 r file_B.txt' file_A.txt
```

The `r` argument is telling `sed` to ***r***ead in `file_B.txt`.

Instead of inserting on a line specific line, you can also insert on a pattern:

```
sed '/pattern/ r file_B.txt' file_A.txt
```

Lastly, you could also insert a file to the end using `$`:

```
sed '$ r file_B.txt' file_A.txt
```

But this is the same result as simply concatenating two files together like:

```
cat file_A.txt file_B.txt
```

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Replacing Lines

You can also replace entire lines in `sed` using the `c` command. We could replace the first line with the word 'header' by:

```
sed '1 c header' animals.txt
```

This can also be utilized in conjustion with the `A,B` interval syntax, but we aware that it will replace ALL lines in that interval with a SINGLE line.

```
sed '1,3 c header' animals.txt
```

You can also replace every *n*th line starting at *N*th line using the `N~n` address syntax:

```
sed '1~3 c header' animals.text
```

Lastly, you can also replace lines match a pattern:

```
sed '/animal/ c header' animals.txt
```

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Translation

`sed` has a feature that allows you to translate characters similiarly to the `tr` function in `bash`. If you wanted to translate all of the lowercase a, b and c characters to their uppercase equivalents you could do that with the `y` command:

```
sed 'y/abc/ABC/' animals.txt
```

In this case the first letter 'a' is replaced with 'A', 'b' with 'B' and 'c' with 'C'.

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Multiple expressions

### `-e` option

If you would like to carry out multiple `sed` expressions in the same command you can use the `-e` option and after each `-e` option you can provide the expression you would like `sed` to evaluate. For example, one could change 'jungle' to 'rainforest' and 'grasslands' to 'Serengeti':

```
sed -e 's/jungle/rainforest/g' -e 's/grasslands/Serengeti/g' animals.txt
```

One can also combine different type of expressions. For instance, one could change 'jungle' to 'rainforest' using a substitution expression and then use a deletion expression to remove the header line:

```
sed -e 's/jungle/rainforest/g' -e '1d' animals.txt
```

### `-f` option

If you have a large number of `sed` expressions you can also place them in a text file with each expression on a separate line:

```
s/jungle/rainforest/g
s/grasslands/Serengeti/g
1d
```

If this file was named 'sed_expressions.txt', our command could look like:

```
sed -f sed_expressions.txt animals.txt
```

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)

## Additional Resources

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#sed

https://www.grymoire.com/Unix/Sed.html#uh-8

[Back to the top](https://github.com/hbctraining/Training-modules/blob/master/Intermediate_shell/lessons/sed.md#sed)
