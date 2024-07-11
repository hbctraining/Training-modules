---
title: "Input functions in RShiny"
author: "Will Gammerdinger"
---

# Learning Objectives

In this lesson, you will:

- Create apps that accept a diverse array of inputs
- Differentiate between Observe and Reactive family of functions 
- Implement an action buttons within an app


# Input options

In the previous lesson, we introduced using the `textInput()`.  We will explor each of these different input options below.

## textAreaInput()

Similar to `textInput()`, `textAreaInput()` functions in many of the same ways, but instead of have a single line where you can enter text into, you will get a text box that allows for multi-line input. An example of the code you would use to do that is below:

```
library(shiny)

ui <- fluidPage(
  textAreaInput("input_text", "My input text"),
  textOutput("output_text")
)

server <- function(input, output) {
  output$output_text <- renderText({ 
    input$input_text 
    })
}

shinyApp(ui = ui, server = server)
```

This will render an app that looks like:

<iframe src="https://hcbc.connect.hms.harvard.edu/Input_text_area_demo/?showcase=0" width="100%" height="625px" data-external="1"> </iframe>


> Note: If you want to maintain new line character you could use `verbatimTextOutput()` rather than `textOutput()`. `verbatimTextOutput()` will treat the text output exactly like it is entered without any formatting.

If you would like to have there be default text in your app's text area input, you can change:

```
textAreaInput("input_text", "My input text")
```

To:

```
textAreaInput("input_text", "My input text", "My Default text")
```

Adding this third parameter `"My Default text"` creates that default text and also works with `textInput()` in the same way.

## sliderInput

Sliders inputs are a great way to provide an interactive range for the user to select a value from. Below we will have the example code that one can use to create a slider:

```
library(shiny)

ui <- fluidPage(
  sliderInput("input_slider", "My input slider", min = 0, max = 10, value = 6),
  textOutput("output_text")
)

server <- function(input, output) {
  output$output_text <- renderText({ 
    input$input_slider
    })
}

shinyApp(ui = ui, server = server)
```

This app would visualize like:

<iframe src="https://hcbc.connect.hms.harvard.edu/Input_slider_demo/?showcase=0" width="100%" height="625px" data-external="1"> </iframe>

Note that the only line we changed was the `textAreaInput()` line to `sliderInput()`. We can see that the `renderText()` function has no issues handling integer or character data types. Above we have provided the minimum number of input arguments for `sliderInput()`. However, there are some interesting arguments that you can also add to your slider in the table below:

| Argument | Description |  Example  |
|----------|-------------|-----------|
| step | This can define the step size of the slider rather than using the default step size | `step = 2` |
| pre | Allows you to add text _prior_ the value in the slider | `pre = "Sample_"` |
| post | Allows you to add text _after_ the value in the slider | `post = "kg"` |
| ticks | Allows you toggle tick marks on/off | `ticks = FALSE` |
| dragRange | Allows you to create a range with your slider. You will likely want to change `value` to be a vector containing the default start and stop of this range like `value = c(2,6)` | `dragRange = TRUE` |


## selectInput

Oftentimes when you are working with input data, you would like to select some of your data from a list of options. One way of doing this is to have a dropdown list of options and `selectInput()` is the function you would use to accomplish this. 

```
library(shiny)

ui <- fluidPage(
  selectInput("input_select", "My favorite game", choices = c("Pick a game" = "", "Catan", "Carcassonne", "Caverna", "Twillight Imperium")),
  textOutput("output_text")
)

server <- function(input, output) {
  output$output_text <- renderText({ 
    input$input_select
    })
}

shinyApp(ui = ui, server = server)
```
<iframe src="https://hcbc.connect.hms.harvard.edu/Input_select_demo/?showcase=0" width="100%" height="625px" data-external="1"> </iframe>


> Within the choices argument, you can see that we made a placeholder value in the first position, `"Pick a game" = ""`, and this visualizes as the default placeholder. Otherwise, the placeholder will default to the first element in the choice vector.

| Argument | Description |  Example  |
|----------|-------------|-----------|
| multiple | Allows you to select multiple option from the selection dropdown menu | `multiple = TRUE` |
| selected | Allows you to define the default selection, otherwise the default selection will be the first item in the list, unless the `multiple` arugment is `TRUE`, then it will default to no selection | `selected = "Twillight Imperium"` |

> Note that you can alternatively use `selectizeInput()` instead of `selectInput()` to have more control over the dropdown. While this is outside of the scope of this lesson, the documentation foir this can be found [here](https://selectize.dev/docs/usage).


## Radio buttons

If you would like your user to be able to toggle between various options, then radio buttons might an an option that you are interested in. Below we have an example code for radio buttons:

```
library(shiny)

ui <- fluidPage(
  radioButtons("radio_button_input", "My favorite ice cream", choices = c("Vanilla", "Chocolate", "Strawberry", "Mint Chocolate Chip")),
  textOutput("output_text")
)

server <- function(input, output) {
  output$output_text <- renderText({ 
    input$radio_button_input
  })
}

shinyApp(ui = ui, server = server)
```

This would visualize like:

<iframe src="https://hcbc.connect.hms.harvard.edu/Input_radio_button_demo/?showcase=0" width="100%" height="300px" data-external="1"> </iframe>


## Checkboxes

## Date

## Exercise

In this exercise, you will attempt to recrete the following app. It will take the input from a select dropdown, radio button and slider and return the product of the values. Feel free to play with the app below to help model the way your app should look.

## Action buttons


Checkboxes
Slider
RadioButtons
Date
Observe vs. Reactive
Action Buttons
Req
Isolate?
