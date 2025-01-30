---
title: "css Input Option Reference"
author: "Will Gammerdinger"
---

# css Input Option Reference

This document gives a more detailed guide to the different options that one can use for each of the css inputs.

## background-color

Similar options availible to [color](#color).

## border-radius

| Number of arguments |  Example | Explanation |
|:---:|---|:---|
| 1 | `border-radius: 1px;` | All corners have the same radius of curve (1px) |
| 2 | `border-radius: 1px 2px;` | The top-left and bottom-right corners use the radius of the first value (1px)<br>The top-right and bottom-left coners use the radius of the second value (2px) |
| 3 | `border-radius: 1px 2px 3px;` | The top-left corner uses the radius of the first value (1px)<br>The top-right and bottom-left use the radius of the second value (2px)<br>The bottom-right uses the radius of the third value (3px) |
| 4 | `border-radius: 1px 2px 3px 4px;` | The top-left corner uses the radius of the first value (1px)<br>The top-right corner uses the radius of the second value (2px)<br>The bottom-right corner uses the radius of the third value (3px)<br>The bottom-left corner uses the radius of the fourth value (4px) |

## border-style

## border-width

## border-color

Similar options availible to [color](#color).

## box-shadow

If you's like to create shadow gradient for an object it can either be an outset shadow (behind the object) or an inset shadow (on top of the object):

### outset

```
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2),
```

### inset

```
  box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
```

### outset and inset

It is a little bit trickier to back an object to have both an inset and outset shadow. You can define the outset shadow, then add a comma and then add the inset shadow argument after. However it will not work in the reverse order.

```
  box-shadow: 
    4px 4px 8px rgba(0, 0, 0, 0.2),    /* Outset shadow */
    inset 0 0 10px rgba(0, 0, 0, 0.5);  /* Inset shadow */
```

## color

There are a few ways to define color in CSS:

- Use their HTML standard color name (if available)
- Define them using rgb()
- Call them by their hexidecimal code

Here is a [helpful resource](https://www.rapidtables.com/web/color/html-color-codes.html) that connects the 140 HTML Standard colors with their RGB and hexidecimal equivalents. It also has a tool that you can use to select a color and it will provide you with the RBG and hexidecimal code for that color.

An example of each method of defining a color is given below:

### HTML Standard Color Name

There are 140 recognized colors in HTML that have names associated with them. You can use the HTML color name (if available):

```
color: cornflowerblue
```

### RGB

Alternatively, you can use the RGB code for the color:

```
color: rgb(100, 149, 237)
```

You can also include the opacity, or alpha, value in when using `rbg()` but using `rgba()`, where the last value is the transparency (alpha) value and it needs to be between 0 (completely transparent) to 1 (completely opaque):

```
color: rgba(100, 149, 237, 0.2),
```

Alternatively, to `rgba()`, you can also just use `rgb()` for `color` and set your opacity, or alpha, with `opacity`. See [opacity](#opacity). 

### Hexidecimal

This RGB code can also be converted into its hexidecimal code:

```
color: #6495ED
```

## cursor

Below is a cheatsheet for the different cursor options:

<p align="center"><img src="../../img/CSS_Cursors.png" width="1000"></p>

## opacity

This controls the the opacity, or alpha, for an object. Opacity can be given values:

- On a scale from 0-1, where 0 is completely transparent and 1 is completely opaque
- On a scale from 0-100%, where 0% is completely transparent and 100% is completely opaque

## padding

| Number of arguments |  Example | Explanation |
|:---:|---|:---|
| 1 | `padding: 1px;` | All sides have the same amount of space around the text (1px) |
| 2 | `padding: 1px 2px;` | The top and bottom have the same amount of space around the text using the first value (1px)<br>The left and right have the same amount of space around the text using the second value (2px)|
| 3 | `padding: 1px 2px 3px;` | The top has amount of space around the text using the first value (1px)<br>The left and right have the same amount of space around the text using the second value (2px)<br>The bottom has amount of space around the text using the third value (3px) |
| 4 | `padding: 1px 2px 3px 4px;` | The top has amount of space around the text using the first value (1px)<br>The right has amount of space around the text using the second value (2px)<br>The bottom has amount of space around the text using the third value (3px)<br>The left has amount of space around the text using the fourth value (4px) |

[Back to Table of Contents](table_of_contents.md)
