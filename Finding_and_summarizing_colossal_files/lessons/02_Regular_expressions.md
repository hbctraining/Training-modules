---
title: "Regular Expressions"
author: "Will Gammerdinger, Meeta Mistry"
---

# Regular Expressions

Regular expressions (sometimes referred to as regex) are a string of characters that can be used as a pattern to match against. This can be very helpful when searching through a file, particularly in conjunction with `sed`, `grep` or `awk`. Since we have an understanding of `grep` from previous workshops we are going to use `grep` and the `catch.txt` file that we downloaded to demonstrate the principles of regular expressions. As we said though, many of these principles are also useful in `sed` and `awk`. 

## Learning Objectives

In this lesson, we will:
- Differentiate between single and double quotes in `bash`
- Implement regular expressions to within `grep`

## Getting Started

## Comment-Upen: Even we mentioned that we introuduced grep in the previous workshops. I think participants will find it useful to get a brief introduction of grep before we go in depth. and then introduce our toy file `catch.txt` to use.

Before we get started, let's take a briefly look at the `catch.txt` file in a `less` buffer in order to get an idea of what the file looks like:

```
less catch.txt
```

In here, you can see that we have a variety of case differences and misspellings. These differences are not exhaustive, but they will be helpful in exploring how regular expressions are implemented in `grep`.


## Comment-Upen: Before introducing cautions and extended regular expression, which we say we won't be using too many. I think, If I am a participant and in beginner level, I would be more interested to just try grep on the catch.txt file to start with with simple examples. And explain the difference between no quotation, single quotataion, and double quotation with dummy errors we can produce down below. may be we can demonstrate few simple flags we can use with grep like -c for counting, -n for printing line number, using -v to print negative results and others. We can use double quotations in all the examples and ask participants what will happen if we don't use quotation marks or use single quotation. Ask them to do it to practice grep with differnt flags. and introduce the importance of quotations and cases where those will be useful. Just a thought!

## A bit more depth on grep

There are two principles that we should discuss more, the `-E` option and the use of quotation marks.

### The `-E` option

There is a `-E` option when using `grep` that allows the user to use what is considered "extended regular expressons". We won't use too many of these types of regular expressions and we will point them out when we need them. If you want to make it a habit to always use the `-E` option when using regular expressions in `grep` it is a bit more safe.

## Comment-Upen: I would explain what we meant by safe.

### Quotations

When using grep it is usually not required to put your search term in quotes. However, if you would like to use `grep` to do certain types of searches, it is better or *safer* to wrap your search term in quotations, and likely double quotations. Let's briefly discuss the differences:

#### No quotation

If you are using `grep` to search and have whitespace (space or tabs) in your search, `grep` will treat the expression before the whitespace as the search term and the expression after the whitespace(s) as a file(s). As a result, if your search term doesn't have whitespace it doesn't matter if you put quotations, but if it does, then it won't behave the way you'd like it to behave.

#### Single quotations

So `grep` doesn't ever "see" quotation marks, but rather quotation marks are interpreted by `bash` first and then the result is passed to `grep`. The big advantage of using quotation marks, single or double, when using `grep` is that it allows you to use search expressions with whitespace in them. However, within bash, single-quotation marks (`'`) are intepreted *literally*, meaning that the expression within the quotation marks will be interpreted by `bash` *EXACTLY* the way it is written. Notably, `bash` variables within single-quotations are **NOT** expanded. What we mean by this is that if you were to have a variable named `at` that holds `AT`:

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

Double quotations are typically the most useful because they allow the user to search for whitespace **AND** allows for `bash` to expand variables, so that now:

```
grep "C${at}CH" catch.txt
```

Returns:

```
CATCH
```

Additionally, if you would like to be able to literally search something that looked like a `bash` variable, you can do this just by adding a `\` before the `${variable}` to "escape" it from `bash` expansion. For example:

```
grep "C\${at}CH" catch.txt
```

Will return:

```
C${at}CH
```
## Comment-Upen: Maybe this take home message can go to the bottom of the page and bullet point 1.
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

You can also merge different ranges together by putting them right after each other or separating them by a `|` (in this case `|` stands for "or" and is **not a pipe**):

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

However, it is important to also note that the ASCII alphabet has a few characters between numbers and uppercase letters such as `:` and `>`, so you would also match `:ATCH` and `>ATCH` (if it was in the file), repectively. There are also a few symbols between upper and lowercase letters such as `^` and `]`, which match `^ATCH` and `]ATCH` (if it was in the file), respectively. 

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

You can also note that since these characters follow the ASCII character encoding order, `[Z-A]` will give you an error telling you that it is an invalid range because `Z` comes after `A`, thus you can't search from `Z` forward to `A`.

```
# THIS WILL PRODUCE AN ERROR
grep -E "[Z-A]ATCH" catch.txt
```

Another trick with ranges is the use of `^` ***within*** `[]` functions as a "not" function. For example:


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

This will match anything ending in `ATCH` ***except*** a string containing `CATCH`.

***IMPORTANT NOTE: `^` has a different function when used outside of the `[]` that is discussed below in anchoring.***


## Special Characters

### Period (.)

The `.` matches any character except new line. Notably, it also ***does not*** match no character. This is similar to the behavior of the wildcard `?` in `bash`. For example:

```
grep -E ".ATCH" catch.txt
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

But this result **will not** include `ATCH`.

### Quantifiers

#### Asterisk (*)

The `*` matches the preceeding character any number of times ***including*** zero times. For example:

```
grep -E "CA*TCH" catch.txt
```

Will return:

```
CATCH
CTCH
CAATCH
CAAATCH
CAAAATCH
```

#### Question Mark (?)

The `?` denotes that the previous character is optional, in the following example:

```
grep -E "CA?TCH" catch.txt
```

Will return:

```
CATCH
CTCH
```

Since the "A" is optional, it will only match `CATCH` or `CTCH`, but not anything else, including `COTCH` which was also in our file.

#### Curly Brackets ({})

The `{INTEGER}` matches the preceeding character the number of times equal to INTEGER. For example:

```
grep -E "CA{3}TCH" catch.txt
```

Will return only:

```
CAAATCH
```

> NOTE: This is one of the cases that needs the `-E` option, otherwise it won't return anything. Alternatively, you can also escape the curly brackets and then you don't need the `-E` option.
> ```
> grep "CA\{3\}TCH" catch.txt
> ```

#### Plus (+)

The `+` matches one or more occurrances of the preceeding character. For example:

```
grep -E "CA+TCH" catch.txt
```

Will return:

```
CATCH
CAATCH
CAAATCH
CAAAATCH
```

### Anchors

Anchors are really useful tools in regular expressions because they specify if a pattern has to be found at the beginning or end of a line.

#### Carrot (^)

The `^` character anchors the search criteria to the beginning of the line. For example:

```
grep -E "^CAT" catch.txt
```

Will return:

```
CATCH
CAT
```

Importantly, it won't return `BOBCAT`, which is also in the file, because that line doesn't start with `CAT`.

***REMINDER: `^` within `[]` functions acts as "not"!***

#### Dollar Sign ($)

The `$` character anchors the search criteria to the end of the line. For example:

```
grep -E "CAT$" catch.txt
```

Will return:

```
CAT
BOBCAT
```

This won't match `CATCH` because the line doesn't end with `CAT`.


## Literal matches

One problem you will likely run into with these above special characters is that you may want to match one. For example, you may want to match `.` or `?` and this is what the escape, `\`, is for. For example:

```
grep -E "C\?TCH" catch.txt
```

Will return:

```
C?TCH
```

It will not return `CATCH` or `COTCH` or others like `C?TCH` would do.


## Whitespace and new lines

You can search for a tab with `\t`, a space with `\s` and a newline with `\n`. For example:

```
grep -E "CA\tTCH" catch.txt
```

Will return:

```
CA  TCH
```

## Examples of Combining Special Characters

Much of the power from regular expression comes from how you can combine them to match the pattern you want. Below are a few examples of such:

**1)** If you want to find any line that starts with uppercase letters `A-G`, then you could do:

```
grep -E "^[A-G]" catch.txt
```

Which will return:

```
BATCH
CATCH
CTCH
CAATCH
CAAATCH
CAAAATCH
ATCH
CAT
BOBCAT
C?TCH
CA	TCH
C${at}CH
COTCH
```

**2)** Perhaps you want to see find all lines ending with `CA` followed by any character except `T`, then you could do:

```
grep -E "CA[^T]$" catch.txt
```

This will return:

```
TAXICAB
TINCAN
```

**3)** We could be interersted in finding lines that start with `C` and end with `CH` with anything, including nothing, in between.

```
grep -E "^C.*CH$" catch.txt
```

This will return:

```
CATCH
CTCH
CAATCH
CAAATCH
CAAAATCH
C?TCH
CA	TCH
C${at}CH
COTCH
```

## Comment-Upen: Having a multi-fasta file in our demo data and using that to count number of sequences with grep -c "^>" my.fasta, may be finding the starting codon "ATG" or stop codon "TAA" or extracting "cds" between ATG and TAA. using grep with -A 1 and -B 1 to get the header and sequence information of the sequence using a small part of the sequence. may be using using primerpairs to locate the pcr amplicon region, would give participants some basic realworld example of grep application. I mean a few of these examples but not too many. and I think this will align well with bioinformatic examples in other lesson in this workshop, just a thought.

***

## Exercises

**1)** Use `grep` to find all matches in `catch.txt` that start with "B" and have a "T" anywhere in the string after the "B".


**2)** Use `grep` to find all matches in `catch.txt` that don't start with "C" and don't end with "H"


**3)** Use `grep` to find all matches in `catch.txt` that have atleast two "A"s in them


## Additional Resources

- <a href="https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/sessionVI/lessons/extra_bash_tools.html#regular-expressions-regex-in-bash-">https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/sessionVI/lessons/extra_bash_tools.html#regular-expressions-regex-in-bash-</a>

## Take Home Message

Regex for bioinformatic applications is generally used in combination with `grep`, `sed`, or `awk` to pull specific information out of large files. You **DO NOT** need to memorize all of the syntax here. Instead merely bookmark it and use it as a resource for writing commands moving forward. You can also check out our bonus lesson on [string manupulation](extra_material_String_manipulation.md)!! As you write more shell commands you will become familiar with more common regex ([], ^, *).  

***

[Next Lesson >>](03_sed.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

