---
title: "Visualization and Interactive Visuals in RShiny"
author: "Will Gammerdinger"
---

# Learning Objectives

In this lesson, you will:
- Create a data table output
- Create a plot output
- Create an interactive plot

# Creating a data table output

Within your Shiny app you might like to have a datatable. Shiny has some native datatable functions (`dataTableOutput()` for the UI side and `renderDataTable()` for the server side). However, these function are depreciated and in their documentation, they recommend using the `DT` package for handling datatables. When you load `DT` it will mask the base Shiny functions `dataTableOutput()` with `DTOutput()` and `renderDataTable()` with `renderDT()`. To render a table:

On the UI side:

```
DTOutput("inputID")
```

On the server side:
```
output$<outputID> <- renderDT({
    <insert_dataframe>
  })
```

We can visualize an example of a data table within a Shiny app using the code below and the built-in dataset `mtcars`:

```
library(shiny)
library(DT)

ui <- fluidPage(
  checkboxGroupInput("column_input", "Select columns", choices = colnames(mtcars), inline = TRUE),
  DTOutput("table")
)

server <- function(input, output) {
  output$table <- renderDT({
    mtcars[,input$column_input, drop = FALSE]
  })
}

shinyApp(ui = ui, server = server)
```

This will visualize in the app as:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Datatable_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>



# Creating a plot 

```
library(shiny)
library(ggplot2)

ui <- fluidPage(
  selectInput("x_axis_input", "Select x-axis", choices = colnames(mtcars)),
  selectInput("y_axis_input", "Select y-axis", choices = colnames(mtcars), selected = "disp"),
  plotOutput("plot")
)

server <- function(input, output) {
  output$plot <- renderPlot({
    ggplot(mtcars) +
      geom_point(aes_string(x = input$x_axis_input, y = input$y_axis_input))
  })
}

shinyApp(ui = ui, server = server)
```
