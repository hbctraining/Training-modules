---
title: "Visualization and Interactive Visuals in RShiny - Answer Key"
author:
  - Will Gammerdinger
date: "2025-11-05"
license: "CC-BY-4.0"
editor_options: 
  markdown: 
    wrap: 72
---

```{r}
#| label: load_libraries_data
#| echo: false
# Load libraries and data
library(shiny)
library(DT)
library(ggplot2)
```

# Exercise 1

Modify the app we just created that prints our output to a table to use a `selectInput()` menu to choose which column(s) we would like to see in our output table. 

```{r}
#| label: DT_mtcars_exercise
#| eval: false
# Load libraries
library(shiny)
library(DT)

# User interface
ui <- fluidPage(
    # Use selectInput() to select which columns we would like to see in the data table
    selectInput(inputId = "column_input", 
                       label = "Select columns", 
                       choices = colnames(mtcars), 
                       multiple = TRUE),
    # The output table
    DTOutput("table")
)

# Server
server <- function(input, output) {
    # Render the selected columns from mtcars as a data table
    output$table <- renderDT({
        mtcars[,input$column_input, drop = FALSE]
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

# Exercise 2

Modify the above app to creates a boxplot with the number of cylinders on the x-axis and then allows the user to select the metric to visualize on the y-axas from a `selectInput()` menu.

_Hint: You will need to set `x = "factor(cyl)"` in order for the `aes_string()` function to treat `cyl` as a column coming from the `mtcars` dataset rather than looking for a variable in your R environment called `cyl`._

```{r}
#| label: boxplot_mtcars_exercise
#| eval: false
# Load libraries
library(shiny)
library(ggplot2)

# User Interface
ui <- fluidPage(
  # Dropdown menu to select which column will be used for the y-axis
  selectInput(inputId = "y_axis_input",
              label = "Select y-axis",
              choices = colnames(mtcars),
              selected = "disp"),
  # The output plot
  plotOutput(outputId = "plot")
)

# Server
server <- function(input, output) {
  # Render the scatter plot
  output$plot <- renderPlot({
    # Scatter plot creation
    ggplot(mtcars) +
      geom_boxplot(aes(x = factor(cyl),
                       y = .data[[input$y_axis_input]])) + +
      xlab("Cylinders")
  })
}

# Run the app
shinyApp(ui = ui, server = server)
```

# Exercise 3

Edit the above app so that the fill of the brushed area is crimson (#A51C30) and the border is a nice blue (#3E6F7D).

```{r}
#| label: brush_plot_example
#| eval: false
# Load libraries
library(shiny)
library(ggplot2)
library(DT)

# User Interface
ui <- fluidPage(
    #  Plot the output with an interactive brushing argument
    plotOutput(outputId = "plot",
               brush = brushOpts(id = "plot_brush",
                                fill = "#A51C30",
                                stroke = "#3E6F7D",
                                opacity = 0.7)
    ),
    # The output table
    DTOutput(outputId = "table")
)

# Server
server <- function(input, output) {
    # Render a plot from the built-in mtcars dataset
    output$plot <- renderPlot(
        ggplot(mtcars) +
            geom_point(aes(x = mpg, y = disp))
    )
    # Render a table from points within the rectangle created by clicking and dragging over the plot
    output$table <- renderDT({
        brushedPoints(mtcars, input$plot_brush)
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```
