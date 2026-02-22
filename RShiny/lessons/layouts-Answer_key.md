---
title: "Uploading and dowloading data in RShiny - Answer Key"
author:
  - Will Gammerdinger
date: "2025-11-10"
license: "CC-BY-4.0"
editor_options: 
  markdown: 
    wrap: 72
---

# Exercise 1

Lets add a layout to the R Shiny app from the exercise in the previous lesson. That app should look like:

```
# Load libraries
library(shiny)
library(DT)
library(tidyverse)

# User Interface
ui <- fluidPage(
  # Upload the file
  fileInput(inputId = "input_file",
            label = "Upload file"),
  # Select from the dropdown menu the column you want on the x-axis
  selectInput(inputId = "x_axis_input",
              label = "Select x-axis",
              choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")
  ),
  # Select from the dropdown menu the column you want on the y-axis
  selectInput(inputId = "y_axis_input",
              label = Select y-axis",
              choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")
  ),
  # The output plot
  plotOutput(outputId = "plot"),
  # The download plot button
  downloadButton(outputId = "download_button",
                 label = "Download the data .png")
)

# Server
server <- function(input, output) {
  # Reactive expression to hold the uploaded data 
  iris_data <- reactive({
    req(input$input_file)
    read.csv(input$input_file$datapath)
  })
  # Reactive expression to create a scatterplot from the uploaded data and user selected axes
  iris_plot <- reactive ({
  ggplot(iris_data()) +
    geom_point(aes(x = .data[[input$x_axis_input]],
                   y = .data[[input$y_axis_input]]))
  })
  # Render the plot from the iris_plot() reactive expression
  output$plot <- renderPlot({
    iris_plot()
  })
  # Download the data
  output$download_button <- downloadHandler(
    # The placeholder name for the file will be called iris_plot.png
    filename = function() {
      "iris_plot.png"
    },
    # The content of the file will be the contents of the iris_plot() reactive expression
    content = function(file) {
      ggsave(
        filename = file,
        plot = iris_plot()
      )
    }
  )
}

# Run the app
shinyApp(ui = ui, server = server)
```

We are going to try to create an app that looks like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/layout_exercise_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

1. Place the `fileInput()` and `selectInput()`s within a sidebar with the plot in the `mainPanel()`. Underneath the `sidepanelLayout()`, place a themetic break and underneath that place a right-aligned `downloadButton()`.

```
# Load libraries
library(shiny)
library(tidyverse)

ui <- fluidPage(
  sidebarLayout(
    sidebarPanel(
      # Upload the file
      fileInput(inputId = "input_file",
                label = "Upload file"),
      # Select from the dropdown menu the column you want on the x-axis
      selectInput(inputId = "x_axis_input",
                  label = "Select x-axis",
                  choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
      # Select from the dropdown menu the column you want on the y-axis
      selectInput(inputId = "y_axis_input",
                  label = "Select y-axis",
                  choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width"))
    ),
    mainPanel(
      # The output plot
      plotOutput(outputId = "plot")
    )
  ),
  hr(),
  fluidRow(
    column(12,
           align = "right",
           # The download plot button
           downloadButton(outputId = "download_button",
                          label = "Download the data .png")
    )
  )
)

# Server
server <- function(input, output) {
  # Reactive expression to hold the uploaded data 
  iris_data <- reactive({
    req(input$input_file)
    read.csv(input$input_file$datapath)
  })
  # Reactive expression to create a scatterplot from the uploaded data and user selected axes
  iris_plot <- reactive ({
    ggplot(iris_data()) +
      geom_point(aes(x = .data[[input$x_axis_input]],
                     y = .data[[input$y_axis_input]]))
  })
  # Render the plot from the iris_plot() reactive expression
  output$plot <- renderPlot({
    iris_plot()
  })
  # Download the data
  output$download_button <- downloadHandler(
    # The placeholder name for the file will be called iris_plot.png
    filename = function() {
      "iris_plot.png"
    },
    # The content of the file will be the contents of the iris_plot() reactive expression
    content = function(file) {
      ggsave(
        filename = file,
        plot = iris_plot()
      )
    }
  )
}

# Run the app
shinyApp(ui = ui, server = server)
```

2. Add the `"superhero"` theme from `shinythemes` to the app.

*Hint: Be sure to add `library(shinythemes)` and make sure it is loaded.*

```
# Load libraries
library(shiny)
library(ggplot2)
library(shinythemes)

ui <- fluidPage(
  theme = shinytheme("superhero"),
  ...
)
```

The final app should look like:

```
# Load libraries
library(shiny)
library(ggplot2)
library(shinythemes)

ui <- fluidPage(
  theme = shinytheme("superhero"),
  sidebarLayout(
    sidebarPanel(
      # Upload the file
      fileInput(inputId = "input_file",
                label = "Upload file"),
      # Select from the dropdown menu the column you want on the x-axis
      selectInput(inputId = "x_axis_input",
                  label = "Select x-axis",
                  choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
      # Select from the dropdown menu the column you want on the y-axis
      selectInput(inputId = "y_axis_input",
                  label = "Select y-axis",
                  choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width"))
    ),
    mainPanel(
      # The output plot
      plotOutput(outputId = "plot")
    )
  ),
  hr(),
  fluidRow(
    column(12,
           align = "right",
           # The download plot button
           downloadButton(outputId = "download_button",
                          label = "Download the data .png")
    )
  )
)

# Server
server <- function(input, output) {
  # Reactive expression to hold the uploaded data 
  iris_data <- reactive({
    req(input$input_file)
    read.csv(input$input_file$datapath)
  })
  # Reactive expression to create a scatterplot from the uploaded data and user selected axes
  iris_plot <- reactive ({
    ggplot(iris_data()) +
      geom_point(aes(x = .data[[input$x_axis_input]],
                     y = .data[[input$y_axis_input]]))
  })
  # Render the plot from the iris_plot() reactive expression
  output$plot <- renderPlot({
    iris_plot()
  })
  # Download the data
  output$download_button <- downloadHandler(
    # The placeholder name for the file will be called iris_plot.png
    filename = function() {
      "iris_plot.png"
    },
    # The content of the file will be the contents of the iris_plot() reactive expression
    content = function(file) {
      ggsave(
        filename = file,
        plot = iris_plot()
      )
    }
  )
}
```
