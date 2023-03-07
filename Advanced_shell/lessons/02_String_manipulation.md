# String Manipulation

While the syntax differs, one feature that is common is most programming languages is the process of string manipulation. Before we can introduce string manipulation, we first need to introduce strings!

## Strings

A string is a term for any sequence of characters. Some examples of strings are:

```
Happy_birthday
this_module_is_a_blast.txt
/path/to/my/favorite/photo.jeg
```

Strings has whitespace (spaces or tabs) separating them from anything else. 

> **NOTE:** While generally discouraged, strings can also have spaces in them along with other special characters. Special characters are characters that have special meaning in a language. For example, `>` is a character used for redirection or `$` is a character used with variables. You can use them if you must by "escaping" them. Escaping a special character requires putting a `\` infront of the special character, which tell bash to interpret this next character literally, not as a special character. Naturally, `\` is also a special character. Because different software tools interpret special characters differently, it is generally advised just to stay away from them in strings unless it is necessary (which sometimes it is). Many of these special characters are symbols, so general, just be leary of using non-alphanumerical characters in your strings.

## String manipulation

### Indexing

Before we can explore string manipulation, we need to have some background on indexing.There are two major forms of indexing:

- 0-based indexing counts in between the characters and starts at 0 before the first character 
- 1-based indexing counts each character and start at 1 at the first character

<p align="center">
<img src="../img/Indexing_strings.png" width="500">
</p>

One advantage of 0-based indexing is that you can figuring out distances a bit easier. If you want to know the distance from R to N, you just need to do to 5 - 2 and you get the length of that string is 3. In 1-based indexing, you need to add 1 after you do the substraction. So in the case of R to N, it would be 5 - 3 + 1 = 3. All of the built-in bash commands use 0-based indexing, but other programs not in this module may run on 1-based indexing, so you should be aware of how strings are indexed when analyzing them.

### Subsetting strings

The first lesson in manipulating strings is simply subsetting a string. Here, we are trying to take our sting and only extract a portion of that string. First let's set a string, like our name, equal to a variable, in this case `name`:

```
name=Will
```

As we've seen before, we could print this `name` variable like:

```
echo $name
# OR
echo ${name}
```

> **NOTE:** Generally speaking, it's not a bad idea to always start putting your bash variables in `{}`. It's not necessary in some cases, like if the bash variable is followed by a space or other specific characters like `.` or `/`. However, it can save you a headache when debugging and using if you use them when they aren't necessary, bash will still interpretted just fine. 

Now, if we want to subset the string saved to a variable. We need to need to use the following syntax:

```
${variable_name:start:length}
```

In this case, our variable name is `name`, we are you start at the `start` position (0-based) and continue a given `length`. 

<p align="center">
<img src="../img/Substring_length.png" width="500">
</p>

If we want the second and third letter of the variable `$name` it would look like:

```
echo ${name:1:2}
```

### Application

The O2 cluster at Harvard has a special space reserved for each person's "scratch" work that is deleted after 30 days of not being used. The path to this space is:

```
/n/scratch3/users/[users_first_letter]/[username]/
```

You should also be aware that O2 like many clusters has a special built in variable called `$USER` that holds a username (which we will assume is `will`). So I could change directories to this scratch space using:

```
cd /n/scratch3/users/w/will/
```

However, if I was developing code or materials for other people in my group or lab to use, then they would have to manually change each instance of it. However, you can use substrings and variables to help you here. Instead of writing out your user information you could instead write:

```
cd /n/scratch3/users/${USER:0:1}/${USER}/
```

Now this would universally apply to anyone using your code on O2!

## Substring from a position to the end of the string

There is a special case of the above example where you might want to trim a certain amount characters from the beginning of a string. The syntax for this would be:

```
${variable_name:start}
```

<p align="center">
<img src="../img/Substring_length_to_end.png" width="500">
</p>

If we want to trim the first two letters off of out `$name` variable then it would look like:

```
echo ${name:2}
```

## Substring counting from the end of a string

You may have a situation where you want to remove the last chaacaters from a string, the syntax for this would look similiar:

```
${variable:start:-length_from_the_end}
```

<p align="center">
<img src="../img/Substring_length_negative_length.png" width="500">
</p>

If you wanted to trim the last two letters off of the `$name` variable:

```
${name:0:-2}
```

This would still start at zero and keep everything but the last two positions.

You could trim the first and last letter like:

```
echo ${name:1:-1}
```

Here, you are telling bash to start in the first position and also take everything except the last position.

## String Addition

You can also add character to strings. The syntax for this is pretty straightforward:

```
string_to_add_to_beginning${variable_name}string_to_add_to_end
```

`${variable_name}` is the string assigned to `${variable_name}` and `string_to_add_to_beginning` and `string_to_add_to_end` are strings you want to add to the beginning and/or end, respecitively.

<p align="center">
<img src="../img/String_addition.png" width="800">
</p>

For example, we can add onto the end of the `$name` variable we designated to make it into a legal name:

```
real_name=${name}iam
echo ${real_name}
```

### Bioinformatics Application

You could see this is if you had a path saved to a variable and you wanted to use that to create paths to files within that directory. For example,

```
alignment_directory=/my/alignment/files/are/here/
SAM_alignment=${alignment_directory}file.sam
BAM_alignment=${alignment_directory}file.bam
```

So now if you look at `$SAM_alignment`:

```
echo ${SAM_alignment}
```

It will return:

```
/my/alignment/files/are/here/file.sam
```

Or the `$BAM_alignment`:

```
echo ${BAM_alignment}
```

It will return:

```
/my/alignment/files/are/here/file.bam
```

If you have a script where you use a path multiple times, this can be really helpful for minimizing typos and make it easier to repurpose the script for different uses.

## Substring Removal

You may want to remove the 

Let's imagine a case we we wanted to move some part of a string and let's start by defining a string named `sandwich`:

```
sandwich=A_sandwich_that_I_love_is_a_BLT_sandwich_because_I_live_bacon
```

Let's imagine not that we wanted to remove everything before


