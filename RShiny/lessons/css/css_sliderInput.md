---
title: "sliderInput"
author: "Will Gammerdinger"
---

# sliderInput

Below is a key for the many of the elements that can be altered within the `sliderInput()`. 

<p align="center"><img src="../../img/sliderInput_CSS_key.png" width="1000"></p>

### Slider Label

An example CSS entry for the slider label is below:

```
#<inputID>-label{
  background-color: red;
  color: orange;
  font-size: 20px;
  font-weight: 100;
  font-family: Monospace;
  font-style: italic;
}
```

> **Note**: Replace `<inputID>` with what the inputID for the slider

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text |
| `color` | The color of the text |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-weight` | How thick the font is (values from 100 to 900 by 100) |
| `font-family` | The font used |
| `font-style` | Whether the font is `normal` or `italic` |

### Minimum value

An example CSS entry for the slider minimum label is below:

```
.irs--shiny .irs-min{
  background-color: blue;
  color: white;
  font-size: 10px;
  font-family: sans-serif;
  font-style: italic;
  border-radius: 3px;
  padding: 1px 2px 3px 4px
}
```

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text |
| `color` | The color of the text |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-family` | The font used |
| `font-style` | Whether the font is `normal` or `italic` |
| `border-radius` | How curved the radius of the box is. This can have one to four values to define (see note on `border-radius` below) |
| `padding` | How much space to leave around the text. This can have one to four values to define (see note on `padding` below) |

> `border-radius` Note Reference
>
>| Number of arguments |  Example | Explanation |
>|:---:|---|:---|
>| 1 | `border-radius: 1px;` | All corners have the same radius of curve (1px) |
>| 2 | `border-radius: 1px 2px;` | The top-left and bottom-right corners use the radius of the first value (1px)<br>The top-right and bottom-left coners use the radius of the second value (2px) |
>| 3 | `border-radius: 1px 2px 3px;` | The top-left corner uses the radius of the first value (1px)<br>The top-right and bottom-left use the radius of the second value (2px)<br>The bottom-right uses the radius of the third value (3px) |
>| 4 | `border-radius: 1px 2px 3px 4px;` | The top-left corner uses the radius of the first value (1px)<br>The top-right corner uses the radius of the second value (2px)<br>The bottom-right corner uses the radius of the third value (3px)<br>The bottom-left corner uses the radius of the fourth value (4px) |

>`padding` Note Reference
>
>| Number of arguments |  Example | Explanation |
>|:---:|---|:---|
>| 1 | `padding: 1px;` | All sides have the same amount of space around the text (1px) |
>| 2 | `padding: 1px 2px;` | The top and bottom have the same amount of space around the text using the first value (1px)<br>The left and right have the same amount of space around the text using the second value (2px)|
>| 3 | `padding: 1px 2px 3px;` | The top has amount of space around the text using the first value (1px)<br>The left and right have the same amount of space around the text using the second value (2px)<br>The bottom has amount of space around the text using the third value (3px) |
>| 4 | `padding: 1px 2px 3px 4px;` | The top has amount of space around the text using the first value (1px)<br>The right has amount of space around the text using the second value (2px)<br>The bottom has amount of space around the text using the third value (3px)<br>The left has amount of space around the text using the fourth value (4px) |


```
.irs--shiny .irs-max{
  background-color: yellow;
  color: green;
  font-size: 10px;
  border-radius: 10px;
  font-family: sans-serif;
  font-style: italic;
}
```

```
.irs--shiny .irs-min, .irs--shiny .irs-max{
  background-color: yellow;
  color: green;
  font-size: 10px;
  border-radius: 10px;
  font-family: sans-serif;
  font-style: italic;
}
```

### Radio buttons
https://stackoverflow.com/questions/23167637/is-it-possible-to-change-the-color-of-selected-radio-buttons-center-circle
