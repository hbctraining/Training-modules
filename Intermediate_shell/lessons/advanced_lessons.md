# Advanced Shell Outline

The following files will use a sample text file (animals.txt) to demonstrate their impact

## sed

The ***s***tream ***ed***itor, `sed`, is a common tool used for text manipulation. `sed` takes input from either a file or piped from a previous command and applies a transformation to it before outputting it to standard out.

### substitution

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

#### Addresses

##### Single lines

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

##### Intervals

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

#### -n option

In `sed` the `-n` option will create no standard output. However, you can pair with with the occurance flag `p` and this will print out only lines that were were edited.

```
sed -n 's/an/replacement/p' animals.txt
```

The `-n` option has another useful purpose, you can use it to find the line number of a matched pattern by using `=` after the pattern you are searching for:

```
sed -n '/jungle/ =' animals.txt
```

### Deletion

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

### Appending

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

#### Appending a file

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

### Replacing Lines

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

### Translation

`sed` has a feature that allows you to translate characters similiarly to the `tr` function in `bash`. If you wanted to translate all of the lowercase a, b and c characters to their uppercase equivalents you could do that with the `y` command:

```
sed 'y/abc/ABC/' animals.txt
```

In this case the first letter 'a' is replaced with 'A', 'b' with 'B' and 'c' with 'C'.

### Multiple expressions

#### `-e` option

If you would like to carry out multiple `sed` expressions in the same command you can use the `-e` option and after each `-e` option you can provide the expression you would like `sed` to evaluate. For example, one could change 'jungle' to 'rainforest' and 'grasslands' to 'Serengeti':

```
sed -e 's/jungle/rainforest/g' -e 's/grasslands/Serengeti/g' animals.txt
```

One can also combine different type of expressions. For instance, one could change 'jungle' to 'rainforest' using a substitution expression and then use a deletion expression to remove the header line:

```
sed -e 's/jungle/rainforest/g' -e '1d' animals.txt
```

#### `-f` option

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



https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#sed

https://www.grymoire.com/Unix/Sed.html#uh-8

## Regular Expressions

Regular expressions (sometimes referred to as regex) are a string of characters that can be used as a pattern to match against. This can be very helpful when searching through a file, particularly in conjunction with `sed`, `grep` or `awk`.

### `[]`

Square brackets can be used to notate a range of acceptable characters in a position.

`[BPL]ATCH` could match 'BATCH', 'PATCH' or 'LATCH'

You can also use `-` to denote a range of characters:

`[A-Z]ATCH` would match 'AATCH', 'BATCH'...'ZATCH'

You can also merge different ranges together by putting them right after each other or separating them by a `|`

`[A-Za-z]ATCH` or `[A-Z|a-z]ATCH` would match 'AATCH', 'BATCH'...'ZATCH' and 'aATCH', 'bATCH'...'zATCH'

In fact, regular expression ranges generally follow the [ASCII alphabet](https://en.wikipedia.org/wiki/ASCII), (but your local character encoding may vary) so:

`[0-z]ATCH` would match '0ACTH', '1ACTH', '2ACTH'...'AACTH'..'zACTH'. However, it is important to also note that the ASCII alphabet has a few characters between numbers and uppercase letters such as ':' and '>', so you would also match ':ATCH' and '>ATCH', repectively. There are also a fews between upper and lowercase letters such as '^' and ']'. If you would want to search for numbers, uppercase letters and lowercase letters, but NOT these characters in between, you would need to modify the range:

`[0-9A-Za-z]ATCH`

You can also note that since these characters follow the ASCII character encoding order, so `[Z-A]` will give you an error telling you that it is an invalid range because 'Z' comes after 'A'.

The `^` ***within*** `[]` functions as a 'not' function. For example:

`[^C]ATCH` will match anything ending in 'ATCH' ***except*** 'CATCH'.

***IMPORTANT NOTE: `^` has a different function when used outside of the `[]` that is discussed below in anchoring.***

### `*`

The `*` matches the preceeding character any number of times ***including*** zero.

`CA*TCH` would match `CTCH`, `CATCH`, `CAATCH` ... `CAAAAAAATCH` ...

### `?`

The `?` denotes that the previous character is optional, in the following example:

`C?ATCH` would match 'CATCH', but also 'BATCH', '2ATCH' '^ATCH' and even 'ATCH'

### `.`

The `.` matches any character except new line. Notably, it ***does not*** match no character. This is similar to the behavior of the wildcard `?` in Unix.

`.ATCH` would match 'CATCH', BATCH', '2ATCH' '^ATCH', but ***not*** 'ATCH'

### `{}`

The `{INTEGER}` match the preceeding character the number of times equal to INTEGER.

`CA{3}TCH` would match 'CAAATCH', but ***not*** 'CATCH', 'CAATCH' or 'CAAAATCH'.

### `+`

The `+` matches one or more occurrances of the preceeding character.

`CA+TCH` would match 'CATCH', 'CAATCH' ... 'CAAAAAAAATCH' ...

### Anchors

#### `^`

The `^` character anchors the search criteria to the begining of the line. For example:

`^CAT` would match lines that started with 'CAT', 'CATCH', but ***not** 'BOBCAT'

***NOTE: `^` within `[]` behaves differently. Remember it functions as 'not'!***

#### `$`

The `$` character anchors the search criteria to the end of the line. For example:

`CAT$` would match lines ending in 'CAT' or 'BOBCAT', but not 'CATCH'

### `\` for literal matches

One problem you will likely run into with these above special characters is that you may want to match one. For example, you may want to match '.' or '?' and this is what the escape, `\`, is for. 

`C\?TCH` would match 'C?TCH', but not 'CATCH' or 'CCTCH' like `C?TCH` would do.

### Whitespace and new lines

You can search from tabs with '\t', space with '\s' and newline with '\n'. 

`CA\tTCH` would match 'CA TCH'

### Examples of Combining Special Characters

Lots of the power from regular expression comes from how you can combine them to match the pattern you want.

If you want to find any line that starts with uppercase letters 'A-G', then you could do:

`^[A-G]`

Perhaps you want to see find all lines ending with 'CA' followed by any character except 'T', then you could do:

`CA[^T]$`

Another thing you may be interersted in is finding lines that start with 'C' and end with 'CH' with anything, including nothing, in between.

`^C.*CH$`

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#regular-expressions-regex-in-bash-

## grep with Regular Expressions

Alternatively, to using these ranges, there are preloaded class such as:

`[[:alpha:]]ATCH` which is equivalent to `[A-Za-z]ATCH`

`[[:alnum:]]ATCH` which is equivalent to `[0-9A-Za-z]ATCH`

`[[:digit:]]ATCH` which is equivalent to `[0-9]ATCH`

`[[:punct:]]ATCH` which is as set of punctuation marks.

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#reintroducing-grep-gnu-regex-parser-

## awk

`awk` is a very powerful programming language in its own right and it can do a lot more than is outlined here. `awk` shares a common history with `sed` and even `grep` dating back to `ed`. As a result, some of the syntax and functionality can be a bit familiar at times. However, it is particularly useful when working with datatables in plain text format (tab-delimited files and comma-separated files). Before we dive too deeply into `awk` we need to define two terms that `awk` will use a lot:

- ***Field*** - This is a column of data
- ***Record*** - This is a row of data 

### Printing columns

Let's first look at one of it's most basic and useful functions, printing columns. For this example we are going to use the tab-delimited file animals.txt that we used in the `sed` examples. 

Let's first try to just print the first column:

```
awk '{print $1}' animals.txt
```

Here the `print` function in `awk` is telling `awk` that it it should output the first column of each line. We can also choose to print out multiple columns in any order.

```
awk '{print $3,$1,$5}' animals.txt
```

The default output is to have the column separated by a space. However, this built-in variable can be modified using the `-v` option. Once you have called the `-v` option you need to tell it which built-in variable you are interested in modfying. In this case it is the ***O***utput ***F***ield ***S***eparator, or `OFS`, and you need to set it to what you would like it to be equal to; a `'\t'` for tab, a `,` for a comma or even an `f` for a a lowercase 'f'.

```
awk -v OFS='\t' '{print $3,$1,$5}' animals.txt
```

#### `-F`

The default behavior of `awk` is to split the data into column based on whitespace (tabs or spaces). However, if you have a comma-separated file, then your fields are separateed by commas and not whitespace. If we run a `sed` command to swap all of the tabs to commas and then pipe this output into awk it will think there is only one field:

```
sed 's/\t/,/g' animals.txt | awk '{print $1}'
```

However, once we denote that the field separator is a comma, it will extract only the first column:

```
sed 's/\t/,/g' animals.txt | awk -F ',' '{print $1}'
```

### Skipping Records

Similarly, to `sed` you can also exclude records from your analysis in `awk`. `NR` is a variable equal to the ***N***umber of ***R***ecords (Rows) in your file. As an aside `NF` also exists and is a variable equal to the ***N***umber of ***F***ields (Columns) in your file. You can define the range that you want your print command to work over by specifiying the `NR` prior to your `{}`:

```
awk 'NR>1 {print $3,$1,$5}' animals.txt
```

This line for example is useful for removing the header. You can also set a range for records you'd like `awk` to print out by separating your range requirements with a `&&`, meaning 'and':

```
awk 'NR>1 && NR<=3 {print $3,$1,$5}' animals.txt
```

This command will print the third, first and fifth fields of animal.txt for records greater than 1 and less than or equal to three.

### `BEGIN`

The `BEGIN` command will execute an `awk` expression once at the beginning of a command. This can be particularly useful it you want to give an output a header that doesn't previously have one.

```
awk 'BEGIN {print "new_header"} NR>1 {print $1}' animals.txt
```

In this case we have told `awk` that we want to have "new_header" printed before anything, then `NR>1` is telling `awk` to skip the old header and finally we are printing the first column of `animals.txt` with `{print $1}`.

### `END`

Related to `BEGIN` is the `END` command that that tells `awk` to do a command once at the end of the file. It is ***very*** useful when summing up columns (below), but we will first demonstrate how it works by adding a new record:

```
awk '{print $1} END {print "new_record"}' animals.txt
```

As you can see, this has simply added a new record to the end of a file. Furthermore, you can chain multiple `END` command together to continously add to columns if you wished like:

```
awk '{print $1} END {print "new_record"} END {print "newer_record"}' animals.txt
```

This is equivalent to separating your `print` commands with a `;`:

```
awk '{print $1} END {print "new_record"; print "newer_record"}' animals.txt
```

### Variables

You can also use variables in awk. Let's play like we wanted to add 5cm to every organisms height:

```
awk 'BEGIN {print "old_height","new_height"} NR>1 {new_height=$5+5; print $5,new_height}' animals.txt
```

`BEGIN {print "old_height","new_height"}` is giving us a new header

`NR>1` is skipping the old header

`new_height=$5+5;` creates a new variable called "new_height" and sets it equal to the height in the fifth field plus five. Note that separate commands within the same `{}` need to be separated by a `;`.

`print $5,new_height` prints the old height with the new height.


### Caclualtions using columns

`awk` is also very good about handling calculations with respect to columns. ***Remember if your file has a header you will need to remove it because you obviously can't divide one word by another.*** 

#### Column sum

Now we understand how variables and `END` work, we can take the sum of a column, in this case the fourth column of our `animals.txt`:

```
awk 'NR>1 {sum=$4+sum} END {print sum}' animals.txt
```

`NR>1` skips out header line. While not necessary because our header is not a number, it is considered best practice to excluded a header if you had one. If your file didn't have a header then you would omit this.

`{sum=$4+sum}` is creating a variable named `sum` and updating it as it goes through each record by adding the fourth field to it.
***NOTE:*** This `{sum=$4+sum}` syntax can be, and often is, abbreviated to `{sum+=$4}`. They are equivlant syntaxes but for the context of learning I think `{sum=$4+sum}` is a bit more clear.

`END {print sum}` Once we get to the end of the file we can call `END` to print out our variable `sum`.

#### Column Average

Now that we understand how to take a column sum and retrieve the number of records, we could quite easily calculate the average for a column like:

```
awk 'NR>1 {sum=$4+sum} END {records=NR-1; print sum/records}' animals.txt
```

`records=NR-1` is needed because `NR` includes our header line, so we need to make a new variable called `records` to hold the number of records in the file without the header line.

If you didn't have a header line you could get the average of a column with a command like:

```
awk '{sum=$4+sum} END {print sum/NR}' file.txt
```

#### Calculations between columns

If you wanted to divde the fifth field of animals.txt by the fourth field, you do it like this:

```
awk 'NR>1 {print $5/$4}' animals.txt
```

You can, of course, add columns around the this calculation as well, such as:

```
awk 'NR>1 {print $1,$5/$4,$2}' animals.txt
```

Lastly, you can also set the output of a calculation equal to a new variable and print that variable:

```
awk 'NR>1 {$6=$5/$4; print $1,$6,$2}' animals.txt
```

`$6=$5/$4` is making a sixth field with the fifth field divided by the fourth field. We then need to separate this from the `print` command with a `;`, but now we can call this new variable we've created. 

#### `$0`

There is a special variable `$0` that corresponds to the whole record. This is very useful when appending a new field to the front or end of a record, such as.

```
awk 'NR>1 {print $0,$5/$4}' animals.txt
```

***NOTE:*** If you create a new variable such as `$6=$5/$4`, `$6` is now part of `$0` and will overwrite the values (if any) previously in `$6`. For example:

```
awk 'NR>1 {$6=$5/$4; print $0,$6}' animals.txt
```

You will get two `$6` fields at the end of the output because `$6` is now a part of `$0` and then you've also indicated that you want to then print `$6` again.

Furthmore,

```
awk 'NR>1 {$5=$5/$4; print $0}' animals.txt
```

`$5=$5/$4` will overrwrite the values previously held in `$5` after the calculation is made. Thus, the output no long shows the original `$5`.




### for loops

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#awk

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

Sometimes you may start a command that will take a few minutes and you want to have your command prompt back to do other tasks while you wait for the initial command to finish. To do this, you will need to do two things:

1) Pause the command with `Ctrl` + `Z`. 
2) Send the command to the ***b***ack***g***round with the command `bg`. When you do this the command will continue from where it was paused.
3) If you want to bring the task back to the ***f***ore***g***round, you can use the command `fg`.

In order to test this, we will briefly re-introduce the `sleep` command. `sleep` just has the command line do nothing for a period of time denoted in seconds by the integer following the `sleep` command. This is sometimes useful if you want a brief pause within a loop, such as between submitting a bunch of jobs to the cluster (as we did in [insert lesson here]). The syntax is:

```
sleep [integer for time in seconds]
```

So if you wanted there to be a five second pause, you could use:

```
sleep 5
```

Now that we have re-introduced the `sleep` command let's go ahead and pause the command like for 180 seconds to simulate a task that is running that might take a few minutes to run.

```
sleep 180
```

Now type `Ctrl` + `Z` and this will pause that command. Followed by the command to move that task to running in the background with:

```
bg
```

The `sleep` command is now running in the background and you have re-claimed your command-line prompt to use while the `sleep` command runs. If you want to bring the `sleep` command back to the foreground, type:

```
fg
```

And if it is still running it will be brought to the foreground.

The place that this can be really useful is whenever you are running commands/scripts that take a few minutes to run that don't have large procesing requirements. Examples could be:

- Indexing a fasta/bam file
- Executing a long command with many pipes
- You are running something in the command line and need to check something

Oftentimes, it is best just to submit these types of jobs to the cluster, but sometimes you don't mind running the task on your requested compute node, but is taking a bit longer than you anticipated or something came up. 


## md5sum

Sometimes you are copying files between two locations and you want to ensure the copying went smoothly or are interested to see if two files are the same. Checksums can be thought of as an alphanumeric fingerprint for a file and they are used to ensure that two files are the same. It is common for people/insitutions to provide an list of md5sums for files that are availible to download. `md5sum` is one common checksum. ***Importantly, it is theorectically possible that two different files have the same md5sum, but it is practically nearly impossible.*** The syntax for checking the md5sum of a file is:

```
md5sum <file>
```

## Downloading external data

### `curl`

Oftentimes, you will find yourself wanting to download data from a website. There are two comparable commands that you can use to accomplish this task. The first one is `curl` and the most common syntax for using it is:

```
curl -L -O [http://www.example.com/data]
```

The `-O` option will use the filename given on the website as its filename to write to. Alternatively, if you wanted to name it something different, you can use the `-o` option and then follow it with the preferred name like:

```
curl -L -o preferred_name  [http://www.example.com/data]
```

The `-L` option tells curl to follow any redirections the HTML address gives to the data. ***I think this is right, but I am really don't understand thins. I just know that I am supposed to do it.***

Lastly, if you connection gets lost midway through a transfer, you can use the `-C` option followed by `-` to resume the download where it left off. For example:

```
curl -C - -L -O [http://www.example.com/data]
```

### `wget`


A common alternative to `curl` is `wget` and many purposes they are extremely similiar and which you decide to use is a matter of personal preference. The general syntax is a bit more friendly on `wget`:

```
wget [http://www.example.com/data]
```

If you lose your connection during the download process and would like to resume it midway through, the `-c` will ***c***ontinue the download where it left off:

```
wget -c [http://www.example.com/data]
```

### `curl` versus `wget`

For many purposes `curl` and `wget` are similar, but there are some small differences:

1) In `curl` you can use the `-O` option multiple times to carry out multiple downloads simulatenously. 

```
curl -L -O [http://www.example.com/data_file_1] -O [http://www.example.com/data_file_2]
```

2) In `wget` you can recursively download a directory (meaning that you also download all subdirectories) with the `-r`. Typically this isn't super useful because the source will typically pack this up all into a compressed package, but nonetheless it is something that `wget` can do that `curl` cannot do.

In general, `curl` has a bit more options and flexibility than `wget` but the vast majority, if not all, of those options are ***far*** beyond the scope of this course and for this course comes down to a personal preference. 

## Rscript
