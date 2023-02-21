## awk

`awk` is a very powerful programming language in its own right and it can do a lot more than is outlined here. `awk` shares a common history with `sed` and even `grep` dating back to `ed`. As a result, some of the syntax and functionality can be a bit familiar at times. However, it is particularly useful when working with datatables in plain text format (tab-delimited files and comma-separated files). Before we dive too deeply into `awk` we need to define two terms that `awk` will use a lot:

- ***Field*** - This is a column of data
- ***Record*** - This is a row of data 

**Topics discussed here are:**

[Printing Columns](awk.md#printing-columns)

[RS and ORS](awk.md#rs-and-ors)

[Field Separators](sed.md#-f)

[Skipping Records](awk.md#skipping-records)

[BEGIN](awk.md#begin)

[END](awk.md#end)

[Variables](awk.md#variables)

[Calculations Using Columns](awk.md#calculations-using-columns)

[The $0 variable](awk.md#0)

[For Loops](awk.md#for-loops)



---
[Return to Table of Contents](toc.md)

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

#### `RS` and `ORS`

As an aside, similarly to `OFS`, records are assumed to be read in and written out with a newline character as default. However, this behavior can be altereed with `RS` and `ORS` variables. 

`RS` can be used to alter the input ***r***ecord ***s***eparator
`ORS` can be used to alter the ***o***utput ***r***ecord ***s***eparator

If we wanted to change the `ORS` to be a ';' we could do so with like:

```
awk -v OFS='\t' -v ORS=';' '{print $3,$1,$5}' animals.txt
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

Alternatively to using `-F`, `FS` is a variable for ***f***ield ***s***eparator and can be altered with the `-v` argument as well like:

```
sed 's/\t/,/g' animals.txt | awk -v FS=',' '{print $1}'
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

Lastly, you can also bring `bash` variables into `awk` using the `-v` option:

```
var=bash_variable
awk -v variable=$var '{print variable,$0}' animals.txt
```


### Caclulations using columns

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


### `for` loops

Like many other programming languages, `awk` can also do loops. One type of loop if the basic `for` loop. 

The basic syntax for a `for` loop in `awk` is:

```
awk '{for (initialize counter variable; end condition; increment) command}' file.txt
```

If you want to duplicate every entry in your file you do do so like:

```
awk '{ for (i = 1; i <= 2; i=i+1) print $0}' animals.txt
```

`for (i = 1; i <= 2; i=i+1)` is starting a `for` loop that:
- `i = 1;` starts at 1 
- `i <= 2;` runs as long as the value of i is less than or equal to 2
- `i=i+1` after each iteration increase the counter variable by one. `++i` and `i++` are equivalent syntaxes to `i=i+1`.

Then we print the whole line with `print $0`.

While not discussed here, `awk` does support `while` and `do-while` loops.
