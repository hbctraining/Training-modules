---
title: "Structure and Syntax in RShiny - Answer Key"
author:
  - Will Gammerdinger
date: "2025-11-05"
license: "CC-BY-4.0"
editor_options: 
  markdown: 
    wrap: 72
---

# Exercise 1

After browsing the [gallery of Shiny Apps that have been made by others](https://shiny.posit.co/r/gallery/), what apps do you think you could develop to analyze your own data?

This is a very open-ended question, but some potential ideas could be:

- Running QC analyses on a dataset where you are determining thresholds
- Reading in standardized data to create a report
- Creating a toy example for how a statistical approach works

# Exercise 2

1. Name the three parts of an RShiny app and give a brief explanation of each part.

2. In the basic app that we created in this lesson:

```
# Load libraries
library(shiny)

# User Interface
ui <- fluidPage(
    # The input text box
    textInput(inputId = "input_text", 
              label = "My input text"),
    # The output text
    textOutput(outputId = "output_text")
)

# Server
server <- function(input, output){
    # Render the text
    output$output_text <- renderText({
        input$input_text
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

Describe what information `input$input_text` and `output$output_text` holds.

`input$input_text` is a character string that holds the text entered by the user in the textbox of the RShiny app and `output$output_text` holds the text that will be returned to the UI as output, after it is rendered by the server.
