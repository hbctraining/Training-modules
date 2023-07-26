
# Intermediate R - part B

## if/else statements

As you write, edit, and reuse scripts you will often find that the more flexible a script is, the more useful. A snipped of code that only works one one file is not the most useful but a snippet of code that works on many files is great!

This is all well and good, but often our different files or different rows need slightly different commands. This is where if/else/else if statements shine!


Let's start with a simple example. We have a single variable, `x`. Depending on the value of `x` we want to do different things. First let's say that if `x` is a positive number we will multiply it by 2 to get `y`

```{r}
x = 1
if (x > 0){
  y = x*2
}
y
```

as expected `y` is now 2. Let's reset `y` to zero and try this again but with `x` as -1


```{r}
y = 0
x = -1
if (x > 0){
  y = x*2
}
y
```

`y` is still zero. **This is because our condition (x>0) was not met.** 

The syntax for an `if` statement is:

```{r}
if (condition){
  action
}
```

Only when the condition is met is the action performed.

Now let's say that if `x` is a negative number we want `y` to be 10+x. There are two ways to do this actually!

First:

```{r}
y = 0
x = -1
if (x > 0){
  y = x*2
} else {
y = x+10
}
y
```

Here else indicates that the if() condition is not met. So any value of x that is not >0 will trigger the else action. 

But what if `x` is 0? We said that we only want it to be multiplied by -10 if `x` itself is negative. Let's see

```{r}
y = 0
x = 0
if (x > 0){
  y = x*2
} else {
y = x+10
}
y
```

`y` is now 10 but we didn't want this. To fix this we can use **else if** instead. `else if` says that if the first condition is not true to check if this second condition is true.

```{r}
y = 0
x = 0
if (x > 0){
  y = x*2
} else if (x < 0) {
y = x+10
}
y
```

This fixed it and `y` now remains zero. Neither condition is met so nothing happens. 

### A few critical notes: 

> Syntax is critical. If you are doing more than one statement the closing bracket and new conditional statement MUST be on the same line. 
> Best practice is conditional statement (`if`, `else`, or `else if`) and opening curly brackets on one line. Closing curly brackets on a new line.
> Your conditional statements and actions can be as complex as you like. You can even run entire programs depending on a condition.
> Conditional statements can be nested. Within an `if` statement you can have another if statement and an else statement.


****

**Exercise**

Can you modify the code so that if x = 0, y = x+20?

**** 


### A few extra tweaks: multiple conditions and nesting statements

So far we have only used one condition in each statement. But we can further specify if we want. For example, we can say that `x` has to be greater than 0 but less than 20 for our condition

```{r}
y = 0
x = 10
if (x > 0 && x < 20){
  y = x*2
}
y
```

If we need two or more things to be true we can string them together with `&&` if we want to use an or statement we can use `|`
For example we can specify that `x` must be greater than 20 or less than 10:


```{r}
y = 0
x = 5
if (x > 20 | x < 10){
  y = x*2
}
y
```

We may also need to have options depending on multiple variables. In this case let's set both `x` and `y` then determine the value of a new variable `z`. 

Let's say that if `x` < 0 then `z` is automatically 5 but if `x` > 0 then the value of `z` depends on `y`


```{r}
y = -1
x = 5
if (x < 0){
  z = 5
} else if (x > 0){
if (y>0) {
z = 10
} else if (y<0) {
z = 1
}
}
z
```

Play around with a few values of x and y


****

**Exercise**

Above I chose to nest my `if` statements but it was not necessary. Can you rewrite this without nesting (HINT: you need 3 conditional statements)
**** 

## For loops

One of the best uses of conditional statements is in a `for loop`. A `for loop` is used to apply the same set of operations on each item in a collection of objects, such as a vector, a list, a matrix, or a dataframe.




