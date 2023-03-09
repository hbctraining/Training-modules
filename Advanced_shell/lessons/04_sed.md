# sed

The ***s***tream ***ed***itor, `sed`, is a common tool used for text manipulation. `sed` takes input from either a file or piped from a previous command and applies a transformation to it before outputting it to standard out.

## Quick note on quotations

Many of the same arguments that were made for using single vs. double quotation marks in `grep` also apply to `sed`. However, the `$` has some non-variable functionality in `sed` that we will discuss, particularly with reference to addresses. For this reason, it's more common to see `sed` commands wrapped in single-quotes rather than double-quotes. Of course, if you want to use a `bash` variable in `sed` you are going to need to wrap it in double-quotes, but when you do be cautious of any non-variable usage of `$` and be sure to escape it (`\`).

## substitution

One common usage for `sed` is to replace `pattern` with `replacement`. The syntax for doing this is:

```
sed 's/pattern/replacement/flag' file.txt 
```

A few things to note here:

1) The `s` in `'s/pattern/replacement/flag'` is directing `sed` to do a ***s***ubstitution.
2) The `flag` in `'s/pattern/replacement/flag'` is directing `sed` that you want this action to be carried out in a specific manner. It is very common to use the flag `g` here which will carry out the action ***g***lobally, or each time it matches the `pattern`. If `g`, is not included it wil just replace the `pattern` the first time it is observed per line. If you would like to replace a particular occurance like the third time it is observed in a line, you would use `3`.

Let's test this out on our sample file and see that output. First, we are interested in replacing 'jungle' with 'rainforest' throughout the file:

```
sed 's/jungle/rainforest/g' ecosystems.txt
```

Notice how all instances of 'jungle' have been replaced with 'rainforest'. However, if we don't include the global option:

```
sed 's/jungle/rainforest/' ecosystems.txt
```

We will only recover the first instance of 'jungle' was replaced with 'rainforest'. If we want to replace only the second occurance of 'jungle' with 'rainforest' on a line, modify the occurance to be `2`:

```
sed 's/jungle/rainforest/2' ecosystems.txt
```

**It is important to note that the pattern-matching in `sed` is case-sensitive.** To make your pattern searches case-insensitive, you will need to add at the `I` flag:

```
sed 's/jungle/rainforest/Ig' ecosystems.txt
```

This will now replace all instances of Jungle/jungle/JuNgLe/jUngle/etc. with 'rainforest'.

You can also replace all instances of a match starting at *n*-th match and continuing for the rest of the line. For instance if we want the second match and all subsequent matches  of jungle to be replaced with rainforest, then we could use:

```
sed 's/jungle/rainforest/2g' ecosystems.txt
```

### -n option

In `sed` the `-n` option will create no standard output. However, you can pair it with the occurance flag `p` and this will print out only lines that were were edited. For example:

```
sed -n 's/desert/Sahara/pg' ecosystems.txt
```

The `-n` option has another useful purpose, you can use it to find the line number of a matched pattern by using `=` after the pattern you are searching for:

```
sed -n '/jungle/ =' ecosystems.txt
```

## Addresses

### Single lines

One can also direct which line, the ***address***, `sed` should make an edit on by adding the line number in front of `s`. This is most common when one wants to make a substituion for a pattern in a header line and is worried that the pattern might be elsewhere in the file. It is best practice to wrap your substitution argument in curly brackets (`{}`) when using address. To demonstrate this we can compare to commands:

```
sed 's/an/replacement/g' ecosystems.txt
sed '1{s/an/replacement/g}' ecosystems.txt
```

In the first command, `sed 's/an/replacement/g' animals.txt` we have replaced all instances of 'an' with 'replacement'. 'animal' changed to 'replacementimal', but 'toucan' changed to 'toucreplacement' and 'anaconda' changed to 'replacementaconda'.

However, in the second command, `sed '1{s/an/replacement/g}' ecosystems.txt`, we have only replaced instances on line 1.

While wrapping the substitution in curly brackets isn't required when using a single line, it is necessary when defining an interval. As you can see:

```
sed '1s/an/replacement/g' ecosystems.txt
```

Produces the same output as above. 

If you only want to replace the final occurance in a file you can use `$` like:

```
sed '${s/an/replacement/g}' ecosystems.txt
```

### Intervals

If you only want to have this substitution carried out on the first three lines (`1,5`, this is giving an address interval, from line 1 to line 5) we would need to do include the curly brackets:

```
sed '1,5{s/an/replacement/g}' ecosystems.txt
```

You can also replace the second address with a `$` to indicate until end of the file like:

```
sed '5,${s/an/replacement/g}' ecosystems.txt
```

This will carry out the substitution from the fifth line until the end of the file.

You can also use regular expressions in the address field. For example, if you only wanted the substitution happening between your first occurence of 'camel' and your first occurrance of 'cichlid', you could do:

```
sed '/camel/,/cichlid/{s/an/replacement/g}' ecosystems.txt
```

Additionally, if you want a replacement every occurance except a given line, such as all of you data fields but not on the header line, then one could use `!` which tells sed 'not', like:

```
sed '1!{s/an/replacement/g}' ecosystems.txt
```

You can even couple `!` with the regular expression intervals to do the substitution everywhere outside the interval:

```
sed '/camel/,/cichlid/!{s/an/replacement/g}' ecosystems.txt
```

Lastly, you can use `N~n` in the address to indicate that you want to apply the substitution every *n*th line starting on line *N*. In the below example, starting on the first line and every 2nd line, the substitution will occur

```
sed '1~2{s/an/replacement/g}' ecosystems.txt
```

## Deletion

You can delete entire lines in `sed`. To delete lines proved the address followed by `d`. To delete the first line from a file:

```
sed '1d' ecosystems.txt
```

Like substitutions, you can provide an interval and this will delete line 1 to line 3:

```
sed '1,3d' ecosystems.txt
```

Also like substitution, you can use `!` to specify lines not to delete like:

```
sed '1,3!d' ecosystems.txt
```

Additionally, you can also use regular expressions to provide the addresses to define an interval to delete from. In this case we are interested in deleting from the first instance of 'cichlid' until the end of the file:

```
sed '/cichlid/,$d' ecosystems.txt
```

The `N~n` syntax also works in deletion. If we want to delete every thrid line starting on line 2, we can do:

```
sed '2~3d' ecosystems.txt
```

## Appending

### Appending text

You can append a new line with the word 'starfish' after the 2nd line using the `a` command in `sed`:

```
sed '2 a starfish' ecosystems.txt
```

If you want the appended text to come before the address, you need to use the `i` command:

```
sed '2 i starfish' ecosystems.txt
```

You can also do this over an interval, like from the 2nd to 4th line:

```
sed '2,4 a starfish' ecosystems.txt
```

Additionally, you can append the text every 3rd line begining with the second line:

```
sed '2~3 a starfish' ecosystems.txt
```

Lastly, you can also append after a matched pattern:

```
sed '/monkey/ a starfish' ecosystems.txt
```

### Appending a file

You could in interested in inserting the contents of **file B** inside at a certain point of **file A**. For example, if you wanted to insert the contents `more_ecosystems.txt` after line `4` in `ecosystems.txt`, you could do:

```
sed '4 r more_ecosystems.txt' ecosystems.txt
```

The `r` argument is telling `sed` to ***r***ead in `file_B.txt`.

Instead of line `4`, you can append the file between every line in the interval from line 2 to line 4 with:

```
sed '2,4 r more_ecosystems.txt' ecosystems.txt
```

You could also append the line after each line by using `1~1` syntax:

```
sed '1~1 r more_ecosystems.txt' ecosystems.txt
```

Instead of inserting on a line specific line, you can also insert on a pattern:

```
sed '/camel/ r more_ecosystems.txt' ecosystems.txt
```

Lastly, you could also insert a file to the end using `$`:

```
sed '$ r more_ecosystems.txt' ecosystems.txt
```

But this is the same result as simply concatenating two files together like:

```
cat ecosystems.txt more_ecosystems.txt
```

## Replacing Lines

You can also replace entire lines in `sed` using the `c` command. We could replace the first line with the word 'header' by:

```
sed '1 c header' ecosystems.txt
```

This can also be utilized in conjustion with the `A,B` interval syntax, but we aware that it will replace ALL lines in that interval with a SINGLE line.

```
sed '1,3 c header' ecosystems.txt
```

You can also replace every *n*th line starting at *N*th line using the `N~n` address syntax:

```
sed '1~3 c header' ecosystems.txt
```

Lastly, you can also replace lines match a pattern:

```
sed '/jaguar/ c header' ecosystems.txt
```

## Transform

`sed` has a feature that allows you to transform characters similiarly to the `tr` function in `bash`. If you wanted to transform all of the lowercase a, b and c characters to their uppercase equivalents you could do that with the `y` command:

```
sed 'y/abc/ABC/' ecosystems.txt
```

In this case the first letter 'a' is replaced with 'A', 'b' with 'B' and 'c' with 'C'.

## Multiple expressions

### `-e` option

If you would like to carry out multiple `sed` expressions in the same command you can use the `-e` option and after each `-e` option you can provide the expression you would like `sed` to evaluate. For example, one could change 'jungle' to 'rainforest' and 'lake' to 'freshwater':

```
sed -e 's/jungle/rainforest/g' -e 's/lake/freshwater/g' ecosystems.txt
```

One can also combine different type of expressions. For instance, one could change 'jungle' to 'rainforest' using a substitution expression and then use a deletion expression to remove the header line:

```
sed -e 's/jungle/rainforest/g' -e '1d' ecosystems.txt
```

If you want to use different flags to mark the occurance of a substitution, you will need to use the `-e` option:

```
sed -e 's/jungle/rainforest/3' -e 's/jungle/rainforest/1' ecosystems.txt
```

> **NOTE:** The flag occurences need to go in decreasing order from the end of the line to the beginning of the line. Notice how `-e 's/jungle/rainforest/3'` comes before `-e 's/jungle/rainforest/1'`.

### `-f` option

If you have a large number of `sed` expressions you can also place them in a text file, like the `sed_expressions.txt` file we have with each expression on a separate line:

```
s/jungle/rainforest/g
s/lake/freshwater/g
1d
```

Then we can use the `-f` option to provide this file of sed expressions like:

```
sed -f sed_expressions.txt ecosystems.txt
```

## Additional Resources

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#sed

https://www.grymoire.com/Unix/Sed.html#uh-8

***

[Next Lesson >>>](05_awk.md)

[Back to Schedule](../README.md)
