# Regular Expressions

Regular expressions (sometimes referred to as regex) are a string of characters that can be used as a pattern to match against. This can be very helpful when searching through a file, particularly in conjunction with `sed`, `grep` or `awk`. Since we have an understanding of `grep` from previous workshops we are going to use `grep` and the `catch.txt` file that we downloaded to demonstrate the principles of regular expressions. As we said though, many of these principles are also useful in `sed` and `awk`. Before we get started, let's take a briefly look at the `catch.txt` file in a `less` buffer in order to get an idea of what the file looks like:

```
less catch.txt
```

In here, you can see that we have a variety of case differences and misspellings. These differences are not exhaustive, but they will be helpful in exploring how regular expressions are implemented in `grep`.

## A bit more depth on grep

There are two principles that we should discuss more, the `-E` option and the use of quotation marks.

### The `-E` option

There is a `-E` option when using `grep` that allows the user to use what is considered "extended regular expressons". We won't use too many of these types of regular expressions and we will point them out when we need them. If you want to make it a habit to always use the `-E` option when using regular expressions in `grep` it is probably a bit more safe.

### Quotations

When using grep it is usually not required to put your search term in quotes. However, if you would like to use `grep` to do certain types of searches, then you are most likely more safe to wrap your search term in quotations, and likely double quotations. Let's briefly discuss the difference:

#### No quotation

If you are using `grep` to search and have whitespace (space or tabs) in your search, `grep` will treat the expression before the whitespace as the search term and the expression after the whitespace(s) as a file(s). As a result, if your search term doesn't have whitespace it doesn't matter if you put quotations, but if it does, then it won't behave the way you'd like it to behave.

#### Single quotations

So `grep` doesn't ever "see" quotation marks, but rather quotation marks are interpretted by `bash` first and then the result is passed to `grep`. The big advantage of using quotation marks, single or double, when using `grep` is that it allows you to use search expressions with whitespace in them. However, within bash, single-quotation marks (`'`) are intepretted *literally*, meaning that the expression within the quotation marks will be interpretted by `bash` *EXACTLY* the way it is written. Notably, `bash` variables within single-quotations are NOT expanded. What we mean by this is that if you were to have a variable named `at` that holds `AT`:

```
at=AT
```

If you used grep while using single quotes like:

```
grep 'C${at}CH' catch.txt
```

It would only return:

```
C${at}CH
```

This is because it searches for the term without expanding (replacing the `bash` variable with what it stands for) the `${at}` variable.

#### Double Quotations

Double quotations are typically the most useful because they allow the user to search for whitespace AND allows for bash to expand `bash` variables, so that now:

```
grep "C${at}CH" catch.txt
```

Returns:

```
CATCH
```

Additionally, if you would like to be able to literally search something that looked like a `bash` variable, you can do this just by adding a `\` before the `${variable}` to "escape" it from bash expansion. For example:

```
grep "C\${at}CH" catch.txt
```

Will return:

```
C${at}CH
```

### grep Depth Take-Home 

In conclusion, while these are all mostly edge cases, we believe that it is generally a good habit to wrap the expressions that you use for `grep` in double quotations and also use the `-E` option. This practice will not matter for the overwhelming number of cases, but it is sometimes difficult to remember these edge cases and thus it is mofe safe to just build them into a habit. Of course, your preferences may vary.

## Ranges

Now that we have gotten some background information out of the way, let's start implementing some regular expressions into our `grep` commands. 

A **range** of acceptable characters can be given to `grep` with `[]`. Square brackets can be used to notate a range of acceptable characters in a position. For example:

```
grep -E "[BPL]ATCH" catch.txt
```

Will return:

```
PATCH
BATCH
```

It would have also returned `LATCH` had it been in the file, but it wasn't.

You can also use `-` to denote a range of characters like:

```
grep -E "[A-Z]ATCH" catch.txt
```

Which will return every match that has an uppercase A through Z in it followed by "ATCH":

```
PATCH
BATCH
CATCH
CAATCH
CAAATCH
CAAAATCH
```

You can also merge different ranges together by putting them right after each other or separating them by a `|` (in this case `|` stands for "or" and is not a pipe):

```
grep -E "[A-Za-z]ATCH" catch.txt
# OR
grep -E "[A-Z|a-z]ATCH" catch.txt
```

This will return:

```
PATCH
BATCH
CATCH
pATCH
bATCH
cATCH
CAATCH
CAAATCH
CAAAATCH
```

In fact, regular expression ranges generally follow the [ASCII alphabet](https://en.wikipedia.org/wiki/ASCII), (but your local character encoding may vary) so:

```
grep -E "[0-z]ATCH" catch.txt
```

Will return:

```
PATCH
BATCH
CATCH
pATCH
bATCH
cATCH
2ATCH
:ATCH
^ATCH
CAATCH
CAAATCH
CAAAATCH
```

However, it is important to also note that the ASCII alphabet has a few characters between numbers and uppercase letters such as ':' and '>', so you would also match ':ATCH' and '>ATCH' (if it was in the file), repectively. There are also a few symbols between upper and lowercase letters such as '^' and ']', which match '^ATCH' and ']ATCH' (if it was in the file). 

Thus, if you would only want to search for numbers, uppercase letters and lowercase letters, but NOT these characters in between, you would need to modify the range:

```
grep -E "[0-9A-Za-z]ATCH" catch.txt
```

Which will return:

```
PATCH
BATCH
CATCH
pATCH
bATCH
cATCH
2ATCH
CAATCH
CAAATCH
CAAAATCH
```

You can also note that since these characters follow the ASCII character encoding order, `[Z-A]` will give you an error telling you that it is an invalid range because 'Z' comes after 'A', thus you can't search from 'Z' forward to 'A'.

```
# THIS WILL PRODUCE AN ERROR
grep -E "[Z-A]ATCH" catch.txt
```

Another trick with ranges is the use of `^` ***within*** `[]` functions as a 'not' function. For example:


```
grep -E "[^C]ATCH" catch.txt
```

Will return:

```
PATCH
BATCH
pATCH
bATCH
cATCH
2ATCH
:ATCH
^ATCH
CAATCH
CAAATCH
CAAAATCH
```

This will match anything ending in 'ATCH' ***except*** a string containing 'CATCH'.

***IMPORTANT NOTE: `^` has a different function when used outside of the `[]` that is discussed below in anchoring.***


## Special Characters

### `.`

The `.` matches any character except new line. Notably, it ***does not*** match no character. This is similar to the behavior of the wildcard `?` in Unix.

[Back to the top](regular_expressions.md#regular_expressions)

## Quantifiers

### `*`

The `*` matches the preceeding character any number of times ***including*** zero.

`CA*TCH` would match `CTCH`, `CATCH`, `CAATCH` ... `CAAAAAAATCH` ...

### `?`

The `?` denotes that the previous character is optional, in the following example:

`C?ATCH` would match 'CATCH', but also 'BATCH', '2ATCH' '^ATCH' and even 'ATCH'

`.ATCH` would match 'CATCH', BATCH', '2ATCH' '^ATCH', but ***not*** 'ATCH'

## `{}`

The `{INTEGER}` match the preceeding character the number of times equal to INTEGER.

`CA{3}TCH` would match 'CAAATCH', but ***not*** 'CATCH', 'CAATCH' or 'CAAAATCH'.

## `+`

The `+` matches one or more occurrances of the preceeding character.

`CA+TCH` would match 'CATCH', 'CAATCH' ... 'CAAAAAAAATCH' ...

[Back to the top](regular_expressions.md#regular_expressions)

## Anchors

### `^`

The `^` character anchors the search criteria to the begining of the line. For example:

`^CAT` would match lines that started with 'CAT', 'CATCH', but ***not** 'BOBCAT'

***NOTE: `^` within `[]` behaves differently. Remember it functions as 'not'!***

### `$`

The `$` character anchors the search criteria to the end of the line. For example:

`CAT$` would match lines ending in 'CAT' or 'BOBCAT', but not 'CATCH'


## Literal matches

One problem you will likely run into with these above special characters is that you may want to match one. For example, you may want to match '.' or '?' and this is what the escape, `\`, is for. 

`C\?TCH` would match 'C?TCH', but not 'CATCH' or 'CCTCH' like `C?TCH` would do.


## Whitespace and new lines

You can search from tabs with '\t', space with '\s' and newline with '\n'. 

`CA\tTCH` would match 'CA TCH'

## Examples of Combining Special Characters

Lots of the power from regular expression comes from how you can combine them to match the pattern you want.

If you want to find any line that starts with uppercase letters 'A-G', then you could do:

`^[A-G]`

Perhaps you want to see find all lines ending with 'CA' followed by any character except 'T', then you could do:

`CA[^T]$`

Another thing you may be interersted in is finding lines that start with 'C' and end with 'CH' with anything, including nothing, in between.

`^C.*CH$`

## Additional Resources

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#regular-expressions-regex-in-bash-

***

[Next Lesson >>>](04_sed.md)

[Back to Schedule](../README.md)
