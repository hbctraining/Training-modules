# Regular Expressions

Regular expressions (sometimes referred to as regex) are a string of characters that can be used as a pattern to match against. This can be very helpful when searching through a file, particularly in conjunction with `sed`, `grep` or `awk`. The topics covered will be:

[Ranges](regular_expressions.md#ranges)

[Special Characters](regular_expressions.md#special-characters)

[Quantifers](regular_expressions.md#quantifiers)

[Anchors](regular_expressions.md#anchors)

[Literal Matches](regular_expressions.md#literal-matches)

[Whitespace and new lines](regular_expressions.md#whitespace-and-new-lines)

[Examples of Combining Special Characters](regular_expressions.md#examples-of-combining-special-characters)

[Additional Resources](regular_expressions.md#additional-resources)

---

[Return to Table of Contents](toc.md)

## Ranges

A range of acceptable characters can be given with `[]`. Square brackets can be used to notate a range of acceptable characters in a position.

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

[Back to the top](regular_expressions.md#regular-expressions)

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

[Back to the top](regular_expressions.md#regular_expressions)

## Literal matches

One problem you will likely run into with these above special characters is that you may want to match one. For example, you may want to match '.' or '?' and this is what the escape, `\`, is for. 

`C\?TCH` would match 'C?TCH', but not 'CATCH' or 'CCTCH' like `C?TCH` would do.

[Back to the top](regular_expressions.md#regular_expressions)

## Whitespace and new lines

You can search from tabs with '\t', space with '\s' and newline with '\n'. 

`CA\tTCH` would match 'CA TCH'

[Back to the top](regular_expressions.md#regular_expressions)

## Examples of Combining Special Characters

Lots of the power from regular expression comes from how you can combine them to match the pattern you want.

If you want to find any line that starts with uppercase letters 'A-G', then you could do:

`^[A-G]`

Perhaps you want to see find all lines ending with 'CA' followed by any character except 'T', then you could do:

`CA[^T]$`

Another thing you may be interersted in is finding lines that start with 'C' and end with 'CH' with anything, including nothing, in between.

`^C.*CH$`

[Back to the top](regular_expressions.md#regular_expressions)

## Additional Resources

https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/extra_bash_tools.md#regular-expressions-regex-in-bash-

[Back to the top](regular_expressions.md#regular_expressions)
