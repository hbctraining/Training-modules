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
| `border-radius` | How curved the radius of the box is. This can have one to four values to define (see [reference](css_input_option_reference.md#border-radius)) |
| `padding` | How much space to leave around the text. This can have one to four values to define (see [reference](css_input_option_reference.md#padding)) |

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

[Back to Table of Contents](table_of_contents.md)

### Radio buttons
https://stackoverflow.com/questions/23167637/is-it-possible-to-change-the-color-of-selected-radio-buttons-center-circle
