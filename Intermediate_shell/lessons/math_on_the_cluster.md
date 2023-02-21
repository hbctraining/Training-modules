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

You can also go basic arithmetic in `awk`. In order to do arithmetic in `awk` in the command line, you will need to use the `BEGIN` command which allows you to run an `awk` command without a file, then simply have it print your calculation:

```
awk 'BEGIN {print (2/3)^2}'
```
