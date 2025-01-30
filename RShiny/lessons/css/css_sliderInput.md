---
title: "sliderInput"
author: "Will Gammerdinger"
---

# sliderInput

Below is a key for the many of the elements that can be altered within the `sliderInput()`. 

<p align="center"><img src="../../img/sliderInput_CSS_key.png" width="1000"></p>

Jump to the following sections:

- [Slider Label](#slider-label)
- [Slider Handle](#slider-handle)
- [Slider Minimum](#slider-minimum)
- [Slider Maximum](#slider-maximum)
- [Slider Minimum and Maximum](#slider-minimum-and-maximum)
- [Value of Slider Handle](#value-of-slider-handle)

## Slider Label

An example CSS entry for the slider label is below:

```
/* Slider Label */
#<inputID>-label{
  background-color: red;
  color: orange;
  font-family: Monospace;
  font-size: 20px;
  font-style: italic;
  font-weight: 100;
  border-color: green;
  border-radius: 10px;
  border-style: dashed;
  border-width: 5px;
  padding: 1px 2px 3px 4px
  opacity: 50%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  text-shadow: -3px -3px 2px tomato;
}
```

> **Note**: Replace `<inputID>` with what the inputID for the slider

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text space ([reference](css_input_option_reference.md#background-color)) |
| `color` | The color of the text ([reference](css_input_option_reference.md#color)) |
| `font-family` | The font used |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-style` | Whether the font is `normal` or `italic` |
| `font-weight` | How thick or bold the font is ([reference](css_input_option_reference.md#font-weight)) |
| `border-color` | Color of the border ([reference](css_input_option_reference.md#border-color)) |
| `border-radius` | How curved the radius of the corners are ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-width` | Width of the border |
| `padding` | How much space to leave around the text([reference](css_input_option_reference.md#padding)) |
| `opacity` | Opacity of the label ([reference](css_input_option_reference.md#opacity)) |
| `box-shadow` | The shadow of the box outlining the text space ([reference](css_input_option_reference.md#box-shadow)) |
| `text-shadow` | The shadow of the text within the text space ([reference](css_input_option_reference.md#text-shadow)) |

## Slider Handle

An example CSS entry for the slider handle is below:

```
/* Slider Handle */
.irs--shiny .irs-handle{
  height: 22px; 
  width: 22px;
  background-color: pink;
  border-width: 2px;
  border-radius: 10px;
  border-style: solid;
  border-color: green;
  opacity: 70%
  cursor: pointer;
  box-shadow: 4px 4px 8px purple;
}
```

| Argument | Note |
|----------|------|
| `height` | Height of the slider handle |
| `width` | Width of the slider handle |
| `background-color` | Color of the inner circle of the slider handle ([reference](css_input_option_reference.md#background-color))|
| `border-width` | Width of the border ([reference](css_input_option_reference.md#border-width)) |
| `border-radius` | How curved the radius of the slider handle is ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-color` | Color of the corder ([reference](css_input_option_reference.md#border-color)) |
| `opacity` | Opacity of the slider handle ([reference](css_input_option_reference.md#opacity)) |
| `cursor` | Image of cursor ([reference](css_input_option_reference.md#cursor)) |
| `box-shadow` | The shadow of the slider handle ([reference](css_input_option_reference.md#box-shadow)) |


### Hover pseudo-class

The default sliderInput changes slight shades as you hover over it. If you would like to edit this behavior you will need to use the `:hover` pseudo-class:

```
/* While hovering over the slider handle*/
.irs--shiny .irs-handle:hover{
  cursor: grab;
}
```

The options availible to the hover pseudo-class are the same as for the normal slider handle.

### Active pseudo-class

You can also alter the the slider handle while you are dragging it by using the `:active` pseudoclass:

```
/* While grabbing a hold to the slider handle */
.irs--shiny .irs-handle:active{
  cursor: grabbing;
}
```

The options availible to the active pseudo-class are the same as for the normal slider handle.


## Slider Minimum

An example CSS entry for the slider minimum label is below:

```
/* Slider Minimum Value */
.irs--shiny .irs-min{
  background-color: blue;
  color: white;
  font-family: sans-serif;
  font-size: 10px;
  font-style: italic;
  font-weight: 100;
  border-color: green;
  border-radius: 10px;
  border-style: dashed;
  border-width: 5px;
  padding: 1px 2px 3px 4px
  opacity: 70%
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  text-shadow: -3px -3px 2px tomato;
}
```

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text ([reference](css_input_option_reference.md#background-color)) |
| `color` | The color of the text ([reference](css_input_option_reference.md#color)) |
| `font-family` | The font used |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-style` | Whether the font is `normal` or `italic` |
| `font-weight` | How thick or bold the font is ([reference](css_input_option_reference.md#font-weight)) |
| `border-color` | Color of the border ([reference](css_input_option_reference.md#border-color)) |
| `border-radius` | How curved the radius of the corners of box are ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-width` | Width of the border |
| `padding` | How much space to leave around the text([reference](css_input_option_reference.md#padding)) |
| `opacity` | The opacity of the slider minimum box |
| `box-shadow` | The shadow of the slider minimum ([reference](css_input_option_reference.md#box-shadow)) |
| `text-shadow` | The shadow of the text within the slider minimum ([reference](css_input_option_reference.md#text-shadow)) |

## Slider Maximum

An example CSS entry for the slider maximum label is below:

```
/* Slider Maximum Value */
.irs--shiny .irs-max{
  background-color: yellow;
  color: green;
  font-family: sans-serif;
  font-size: 10px;
  font-style: italic;
  font-weight: 100;
  border-color: green;
  border-radius: 10px;
  border-style: dashed;
  border-width: 5px;
  padding: 1px 2px 3px 4px;
  opacity: 60%;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  text-shadow: -3px -3px 2px tomato;
}
```
| Argument | Note |
|----------|------|
| `background-color` | The background color for the text ([reference](css_input_option_reference.md#background-color)) |
| `color` | The color of the text ([reference](css_input_option_reference.md#color)) |
| `font-family` | The font used |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-style` | Whether the font is `normal` or `italic` |
| `font-weight` | How thick or bold the font is ([reference](css_input_option_reference.md#font-weight)) |
| `border-color` | Color of the border ([reference](css_input_option_reference.md#border-color)) |
| `border-radius` | How curved the radius of the corners of box are ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-width` | Width of the border |
| `padding` | How much space to leave around the text ([reference](css_input_option_reference.md#padding)) |
| `opacity` |  Opacity of the slider maximum ([reference](css_input_option_reference.md#opacity)) |
| `box-shadow` | The shadow of the slider maximum ([reference](css_input_option_reference.md#box-shadow)) |
| `text-shadow` | The shadow of the text within the slider maximum ([reference](css_input_option_reference.md#text-shadow)) |

## Slider Minimum and Maximum

Likely, we want want the slider's minimum and maximum to be identical and this can be accomplished by separating `.irs--shiny .irs-min` and `.irs--shiny .irs-max` with a comma.

```
/* Slider Minimum and Maximum Value */
.irs--shiny .irs-min, .irs--shiny .irs-max{
  background-color: yellow;
  color: green;
  font-family: sans-serif;
  font-size: 10px;
  font-style: italic;
  font-weight: 100;
  border-color: green;
  border-radius: 10px;
  border-style: dashed;
  border-width: 5px;
  padding: 1px 2px 3px 4px;
  opacity: 30%;
  box-shadow: 2px -2px 10px green;
  text-shadow: -3px -3px 2px rgba(0, 0, 0, 0.8);
}
```

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text ([reference](css_input_option_reference.md#background-color)) |
| `color` | The color of the text ([reference](css_input_option_reference.md#color)) |
| `font-family` | The font used |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-style` | Whether the font is `normal` or `italic` |
| `font-weight` | How thick or bold the font is ([reference](css_input_option_reference.md#font-weight)) |
| `border-color` | Color of the border ([reference](css_input_option_reference.md#border-color)) |
| `border-radius` | How curved the radius of the corners of box are ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-width` | Width of the border |
| `padding` | How much space to leave around the text ([reference](css_input_option_reference.md#padding)) |
| `opacity` |  Opacity of the slider minimum and maximum ([reference](css_input_option_reference.md#opacity)) |
| `box-shadow` | The shadow of the slider minimum and maximum ([reference](css_input_option_reference.md#box-shadow)) |
| `text-shadow` | The shadow of the text within the slider minimum and maximum ([reference](css_input_option_reference.md#text-shadow)) |

## Value of Slider Handle

An example CSS entry for the value of the slider handle is below:

```
.irs--shiny .irs-single{
  background-color: orange;
  color: rgb(0, 0, 0);
  font-family: sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 200;
  border-color: #E3E3E3;
  border-radius: 2px;
  border-style: dotted;
  border-width: 3px;
  padding: 4px 3px 2px 1px;
  opacity: 90%;
  box-shadow: -4px -4px 6px rgba(255,0, 255, 0.8);
  text-shadow: -3px -3px 2px black;
}
```

| Argument | Note |
|----------|------|
| `background-color` | The background color for the text ([reference](css_input_option_reference.md#background-color)) |
| `color` | The color of the text ([reference](css_input_option_reference.md#color)) |
| `font-family` | The font used |
| `font-size` | The size of the font (as measured in pixels(px)) |
| `font-style` | Whether the font is `normal` or `italic` |
| `font-weight` | How thick or bold the font is ([reference](css_input_option_reference.md#font-weight)) |
| `border-color` | Color of the border ([reference](css_input_option_reference.md#border-color)) |
| `border-radius` | How curved the radius of the corners of box are ([reference](css_input_option_reference.md#border-radius)) |
| `border-style` | Style of the border ([reference](css_input_option_reference.md#border-style)) |
| `border-width` | Width of the border |
| `padding` | How much space to leave around the text ([reference](css_input_option_reference.md#padding)) |
| `opacity` |  Opacity of the value box ([reference](css_input_option_reference.md#opacity)) |
| `box-shadow` | The shadow of the value box ([reference](css_input_option_reference.md#box-shadow)) |
| `text-shadow` | The shadow of the text within the value box ([reference](css_input_option_reference.md#text-shadow)) |

---

[Back to Table of Contents](table_of_contents.md)

