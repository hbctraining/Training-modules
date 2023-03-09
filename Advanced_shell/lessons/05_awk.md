# awk

`awk` is a very powerful programming language in its own right and it can do a lot more than is outlined here. `awk` shares a common history with `sed` and even `grep` dating back to `ed`. As a result, some of the syntax and functionality can be a bit familiar at times. However, it is particularly useful when working with datatables in plain text format (tab-delimited files and comma-separated files). Before we dive too deeply into `awk` we need to define two terms that `awk` will use a lot:

- ***Field*** - This is a column of data
- ***Record*** - This is a row of data 

### Printing columns

Let's first look at one of it's most basic and useful functions, printing columns. For this example we are going to use the tab-delimited file `ecosystems.txt` that we used in the `sed` examples. 

Let's first try to just print the first column:

```
awk '{print $1}' ecosystems.txt
```

Here the `print` function in `awk` is telling `awk` that it it should output the first column of each line. We can also choose to print out multiple columns in any order.

```
awk '{print $3,$1,$5}' ecosystems.txt
```

The default output is to have the column separated by a space. However, built-in variables can be modified using the `-v` option. Once you have called the `-v` option you need to tell `awk` which built-in variable you are interested in modfying. In this case, it is the ***O***utput ***F***ield ***S***eparator, or `OFS`, and you need to set it to what you would like it to be equal to; a `'\t'` for tab, a `,` for a comma or even an `f` for a lowercase `f`.

```
awk -v OFS='\t' '{print $3,$1,$5}' ecosystems.txt
```

#### $0

There is a special variable `$0` that corresponds to the whole record. This is very useful when appending a new field to the front or end of a record, such as.

```
awk '{print $1,$0}' ecosystems.txt
```

#### RS and ORS

As an aside, similarly to `OFS`, records are assumed to be read in and written out with a newline character as default. However, this behavior can be altered with `RS` and `ORS` variables. 

`RS` can be used to alter the input ***r***ecord ***s***eparator
`ORS` can be used to alter the ***o***utput ***r***ecord ***s***eparator

If we wanted to change the `ORS` to be a `;` we could do so with:

```
awk -v OFS='\t' -v ORS=';' '{print $3,$1,$5}' ecosystems.txt
```

#### -F

The default behavior of `awk` is to split the data into columns based on whitespace (tabs or spaces). However, if you have a comma-separated file, then your fields are separated by commas and not whitespace. If we run a comma-separated file and call for the first column with the default field separator, then it will print the entire line:

```
awk '{print $1}' ecosystems.csv
```

However, once we denote that the field separator is a comma, it will extract only the first column:

```
awk -F ',' '{print $1}' ecosystems.csv
```

Alternatively to using `-F`, `FS` is a built-in variable for ***f***ield ***s***eparator and can be altered with the `-v` argument as well like:

```
awk -v FS=',' '{print $1}' ecosystems.csv
```

### Skipping Records

Similarly, to `sed` you can also exclude records from your analysis in `awk`. `NR` is a variable equal to the ***N***umber of ***R***ecords (Rows) in your file. `NF` also exists and is a variable equal to the ***N***umber of ***F***ields (Columns) in your file. You can define the range that you want your print command to work over by specifiying the `NR` prior to your `{}`. For example, if we wanted to remove the header, then we could do something like:

```
awk 'NR>1 {print $3,$1,$5}' ecosystems.txt
```

You can also set a range for records you'd like `awk` to print out by separating your range requirements with a `&&`, meaning "and":

```
awk 'NR>1 && NR<=3 {print $3,$1,$5}' ecosystems.txt
```

This command will print the third, first and fifth fields of `ecosystems.txt` for records greater than record one and less than or equal to record three.

### BEGIN

The `BEGIN` command will execute an `awk` expression once at the beginning of a command. This can be particularly useful it you want to give an output a header that doesn't previously have one.

```
awk 'BEGIN {print "new_header"} NR>1 {print $1}' ecosystems.txt
```

In this case we have told `awk` that we want to have "new_header" printed before anything, then `NR>1` is telling `awk` to skip the old header and finally we are printing the first column of `ecosystems.txt` with `{print $1}`.

### END

Related to the `BEGIN` command, the `END` command that tells `awk` to do a command once at the end of the file. It is ***very*** useful when summing up columns (below), but we will first demonstrate how it works by adding a new record:

```
awk '{print $1} END {print "new_record"}' ecosystems.txt
```

As you can see, this has simply added a new record to the end of a file. Furthermore, you can chain multiple `END` commands together to continously add to columns if you wished like:

```
awk '{print $1} END {print "new_record"} END {print "newer_record"}' ecosystems.txt
```

This is equivalent to separating your `print` commands with a `;`:

```
awk '{print $1} END {print "new_record"; print "newer_record"}' ecosystems.txt
```

### Variables

You can also use variables in `awk`. Let's play like we wanted to add 5cm to each organism's height:

```
awk 'BEGIN {print "old_height","new_height"} NR>1 {new_height=$5+5; print $5,new_height}' ecosystems.txt
```

There's a lot going on in this command, so let's break it down a bit:

- `BEGIN {print "old_height","new_height"}` is giving us a new header

- `NR>1` is skipping the old header

- `new_height=$5+5;` creates a new variable called "new_height" and sets it equal to the height in the fifth field plus five. Note that separate commands within the same `{}` need to be separated by a `;`.

- `print $5,new_height` prints the old height with the new height.

Lastly, you can also bring `bash` variables into `awk` using the `-v` option:

```
var=first_field
awk -v variable=$var '{print variable,$0}' ecosystems.txt
```

### Caclulations using columns

`awk` is also very good about handling calculations with respect to columns. 

#### Column sum

Now we understand how variables and `END` work, we can take the sum of a column, in this case the fifth column of our `ecosystems.txt`:

```
awk 'NR>1 {sum=$5+sum} END {print sum}' ecosystems.txt
```

- `NR>1` skips our header line. While not necessary because our header is not a number, it is considered best practice to excluded a header if you have one. If your file didn't have a header then you would omit this.

- `{sum=$5+sum}` is creating a variable named `sum` and updating it as it goes through each record by adding the fifth field to it.

> **NOTE:** This `{sum=$5+sum}` syntax can be, and often is, abbreviated to `{sum+=$5}`. They are equvilant syntaxes but for the context of learning we think `{sum=$5+sum}` is a bit more clear.

- `END {print sum}` Once we get to the end of the file we can call `END` to print out our variable `sum`.

#### Column Average

Now that we understand how to take a column sum and retrieve the number of records, we could quite easily calculate the average for a column like:

```
awk 'NR>1 {sum=$5+sum} END {records=NR-1; print sum/records}' ecosystems.txt
```

- `records=NR-1` is needed because `NR` contains the number of records which includes our header line. As a result, we need to make a new variable called `records` to hold the number of records in the file without the header line. 

If you didn't have a header line you could get the average of a column with a command like:

```
awk '{sum=$5+sum} END {print sum/NR}' ecosystems.txt
```

#### Calculations between columns

If you wanted to divide the sixth field of `ecosystems.txt` by the fifth field, you could do:

```
awk 'NR>1 {print $6/$5}' ecosystems.txt
```

> **NOTE:** Here is is it particularly important to skip the header line, because otherwise you will try to divide the string `weight(g)` by the string `height(cm)` and `awk` will give you an error.

You can, of course, add columns around the this calculation as well, such as:

```
awk 'NR>1 {print $1,$6/$5,$2}' ecosystems.txt
```

Lastly, you can also set the output of a calculation equal to a new variable and print that variable:

```
awk 'NR>1 {$7=$6/$5; print $1,$7,$2}' ecosystems.txt
```

`$7=$6/$5` is making a seventh field with the sixth field divided by the fifth field. We then need to separate this from the `print` command with a `;`, but now we can call this new variable we've created. 

***NOTE:*** If you create a new variable such as `$7=$6/$5`, `$7` is now part of `$0` and will overwrite the values (if any) previously in `$7`. For example:

```
awk 'NR>1 {$7=$6/$5; print $0,$7}' ecosystems.txt
```

You will get two `$7` fields at the end of the output because `$7` is now a part of `$0` and then you've also indicated that you want to then print `$7` again.

However, if you have:

```
awk 'NR>1 {$6=$6/$5; print $0}' ecosystems.txt
```

`$6=$6/$5` will overrwrite the values previously held in `$6` after the calculation is made. Thus, the output no longer shows the original `$6`.


### `for` loops

Like many other programming languages, `awk` can also do loops. One type of loop is the basic `for` loop. The basic syntax for a `for` loop in `awk` is:

```
awk '{for (initialize counter variable; end condition; increment) command}' file.txt
```

If you want to duplicate every record in your file you can do so like:

```
awk '{ for (i = 1; i <= 2; i=i+1) print $0}' ecosystems.txt
```

`for (i = 1; i <= 2; i=i+1)` is starting a `for` loop that:
- `i = 1` starts a counter variable at 1 
- `i <= 2` runs as long as the value of `i` is less than or equal to 2
- `i=i+1` after each iteration, increase the counter variable by one. `++i` and `i++` are equivalent syntaxes to `i=i+1`.

Then we print the whole line with `print $0`.

While not discussed here, `awk` does support `while` and `do-while` loops.

### `if` statements

Since `awk` is it's own fully-fledged programming language, it also has conditional statements. A common time you might want to use an `if` statement in `awk` is when you have a file with tens or even hundreds of fields and you want to figure out which field has the column header of interest or a case where you are trying to write a script for broad use when the order of the input columns may not always be the same, but you want to figure out which column has a certain column header. To do that:  

```
awk 'NR=1 {for (i=1; i<=NF; i=i+1) {if ($i == "height(cm)")  print i}}' ecosystems.txt
```

We can break this code down a bit:

- `NR=1` only looks at the header line

- `for (i=1; i<=NF; i=i+1)` this begins a `for` loop starting at field one and continuing as longer as the `i` is less than or equal to number of fields and the increment is one for each interation of the `for` loop

- `if ($i == "height(cm)")` is checking is `$i`, which is in our case is $1, $2, ... $6, to see if they are equal to `height(cm)`. If this condition is met then:

- `print i` print out `i`

## Exercises



***

[Back to Schedule](../README.md)
