

As you write, edit, and reuse scripts you will often find that the more flexible a script is, the more useful. A snipped of code that only works one one file is not the most useful but a snippet of code that works on many files is great!

This is all well and good, but often our different files or different rows need slightly different commands. This is where if/else/else if statements shine!


Let's start with a simple example. We have a single variable, x. Depending on the value of x we want to do different things. First let's say that if x is a positive number we will multiply it by 2 to get y

```{r}
x = 1
if (x > 0){
  y = x*2
}
y
```

as expected y is now 2. Let's reset y to zero and try this again but with x as -1


```{r}
y = 0
x = -1
if (x > 0){
  y = x*2
}
y
```

y is still zero. **This is because our condition (x>0) was not met.** 

The syntax for an if statement is:

```{r}
if (condition){
  action
}
```

Only when the condition is met is the action performed.

Now let's say that if x is a negative number we want y to be 10+x. There are two ways to do this actually!

First 

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

But what if x is 0? We said that we only want it to be multiplied by -10 if x itself is negative. Let's see

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

Y is now 10 but we didn't want this. To fix this we can use **else if** instead. else if says that if the first condition is not true to check if this second condition is true.

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

This fixed it and y now remains zero. Neither condition is met so nothing happens. 

