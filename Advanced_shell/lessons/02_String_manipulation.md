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

### Subsetting strings

The first lesson in manipulating strings is simply subsetting a string. Here, we are trying to take our sting and only extract a portion of that string. First let's set a string equal to a variable:

```
name=Will
```

we can 
