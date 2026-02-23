---
title: "Input functions in RShiny - Answer Key"
author:
  - Will Gammerdinger
date: "2025-11-05"
license: "CC-BY-4.0"
editor_options: 
  markdown: 
    wrap: 72
---

# Exercise 1

Use the input widgets presented above and the associate code to create your own RShiny app! It will take numeric input from a select dropdown menu, radio button and slider and then multiply the values together and return the product. Let's break this down into a few parts:

1. Create the user interface for the app that allows the user to select the values 1-3 from a `selectInput()` function, the values 4-6 from a `radioButtons()` function and the values 7-9 from a `sliderInput()`.

```
# Load libraries
library(shiny)

# User Interface
ui <- fluidPage(
  # Select a number between 1 and 3 from a select dropdown menu
  selectInput(inputId = "selected_number",
              label = "Pick a number",
              choices = c(1, 2, 3)),
  # Select a number between 4 and 6 from radio buttons
  radioButtons(inputId = "radio_number",
               label = "Pick a number",
               choices = c(4, 5, 6)),
  # Select a number between 7 and 9 from a slider
  sliderInput(inputId = "slider_number",
              label = "Pick a number",
              min = 7,
              max = 9,
              value = 8)
)
```

2. In the user interface create a place for the output text for the product of these values to appear.

```
ui <- fluidPage(
  ...
  # The output text
  textOutput(outputId = "output_text")
)
```

3. Create a server for the app that multiples the three input values together and renders their product as text. _Hint: You will need to wrap each input in a `as.numeric()` function._

```
# Server
server <- function(input, output) {
  # Render the product of the input values tas text
  output$output_text <- renderText({ 
    as.numeric(input$selected_number) * as.numeric(input$radio_number) * as.numeric(input$slider_number)
  })
}
```

4. Put the parts together and run the app.

```
# Load libraries
library(shiny)

# User Interface
ui <- fluidPage(
  # Select a number between 1 and 3 from a select dropdown menu
  selectInput(inputId = "selected_number",
              label = "Pick a number",
              choices = c(1, 2, 3)),
  # Select a number between 4 and 6 from radio buttons
  radioButtons(inputId = "radio_number",
               label = "Pick a number",
               choices = c(4, 5, 6)),
  # Select a number between 7 and 9 from a slider
  sliderInput(inputId = "slider_number",
              label = "Pick a number",
              min = 7,
              max = 9,
              value = 8),
  # The output text
  textOutput(outputId = "output_text")
)

# Server
server <- function(input, output) {
  # Render the product of the input values tas text
  output$output_text <- renderText({ 
    as.numeric(input$selected_number) * as.numeric(input$radio_number) * as.numeric(input$slider_number)
  })
}

# Run the app
shinyApp(ui = ui, server = server)
```
