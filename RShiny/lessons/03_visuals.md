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

# Uploading a file

[Animals](https://raw.githubusercontent.com/hbctraining/Training-modules/RShiny/master/data/animals.csv)

# Creating a plot 

Oftentimes when you are using a Shiny App it is oftentimes because you want to have interactive visuals that respond to user inputs, so creating plots is an essential skill for being able to create apps in Shiny. The syntax for implementing plots is:

On the UI side:
```
plotOutput("<outputID>")
```

On the Server side:
```
output$<outputID> <- renderPlot({
    <insert_plot_creation>
})
```

This syntax can be seen in the example below:

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

> Note: In this lesson we are using the package `ggplot2` to make our visualizations, but plots used in Shiny can also be made in base R graphics.

This sample code would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>


# Interacting with plots

While the above plot was interesting for being able to select various metrics to plot, it lacked an ability to interact with the actual data points on the graph. If we saw an outlier, how could we try to identify that outlier point. In the seciton below we will discuss methods that we can use to actually interact with the data points on our plots.

## Clicking

The first way that we can interact will a plot is by clicking a point on the plot. The syntax for this is a bit interesting because it has a `input` buried within an `Output` function. Let's take a look:

On the UI side:

```
plotOutput("plot", click = "<plot_clickID>")
```

This looks like our normal `plotOutput()` function from before, but now we have added this `click = "<plot_clickID>"` argument to it. And the click argument allows for an input, so the inputID from the click action in this case would be `input$<plot_clickID>`. 

> Note: Instead of `click = "<plot_clickID>"`, we could use `click = clickOpts("<plot_clickID>")` and this will allow us more options on our clicking. However the extra options for clicking are outside of the scope of this workshop, but since we will be using `hoverOpts()` and `brushOpts()` in the next upcoming sections, so we introduced the idea and syntax here. 

On the server side, we have a few new functions as well:

```
  output$table <- renderDT({
    nearPoints(<dataframe_used_in_plotting>, input$<plot_clickID>)
  })
```

The `nearPoints()` function creates a data frame of points near where the cursor clicked on the plot. There are ways around using the `nearPoints()` function, but it is a user-friendly way of managing this task. You can adjust how close (in pixels) you'd like the threshold to be when click a point to register nearby points by changing the `threshold` argument. An example app of this is below:

```
library(shiny)
library(ggplot2)
library(DT)

ui <- fluidPage(
  plotOutput("plot", click = "plot_click"),
  DTOutput("table")
)

server <- function(input, output) {
  output$plot <- renderPlot(
    ggplot(mtcars) +
      geom_point(aes(x = mpg, y = disp))
  )
  output$table <- renderDT({
    nearPoints(mtcars, input$plot_click)
  })
}

shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_click_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

## Hover

Instead of clicking on points in your plot, you can instead simply hover over them. In order to do this, we need to tweak the UI side of the app.

On the UI side:
```
plotOutput("plot", hover = hoverOpts("<plot_hoverID>", delay = 25))
```

In this case, the `hover` argument is replacing the `click` argument that we used in the previous example. However, now we are actually utilizing an option (`delay = 25`) within the `[click/hover/brush]Opt()`family of functions to reduce the delay in milliseconds before a hover is registered by Shiny. The default is 300ms, which feels a bit unresponsive, so we have reduced it for a more "live" feeling.

An example of this code is below:

```
library(shiny)
library(ggplot2)
library(DT)

ui <- fluidPage(
  plotOutput("plot", hover = hoverOpts("plot_hover", delay = 25)),
  DTOutput("table")
)

server <- function(input, output) {
  output$plot <- renderPlot(
    ggplot(mtcars) +
      geom_point(aes(x = mpg, y = disp))
  )
  output$table <- renderDT({
    nearPoints(mtcars, input$plot_hover)
  })
}

shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_hover_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>


## Brush

The last way that you can make your plots interactive is with brushing. Perhaps you notice a cluster on points in one part of your scatter plot that you'd like to invrestigate further. Brushing allows you to use a rectangle to select the points that you would like to interact with. We need a make a few changes to our UI to accommodate brushing:

On the UI side:

```
plotOutput("plot", brush = "<plot_brushID>")
```

We can change `brush = "<plot_brushID>"` to `brush = brushOpt("<plot_brushID>")`, which will give us access to a few more arguments in the table below:

| Argument | Description |  Example  |
|----------|-------------|-----------|
| stroke | Changes the color of the outline of the rectangle | `stroke = "orange"` |
| fill | Changes the color of the fill of the rectangle | `fill = "pink"` |
| opacity | Changes the color of the opacity of the rectangle (Scale from 0 to 1) | `opacity = 0.8` |
| resetOnNew | Removes the current brushed area when a new plot is created (Default is `FALSE` | `resetOnNew = TRUE` |

On the server side we need to use:

```
  output$table <- renderDT({
    brushedPoints(mtcars, input$<plot_brushID>)
  })
```

The `brushedPoints()` function works similarly to the `nearPoints()` function. It gathers the points within the rectangle and output their information to a data frame.

An example code using brushing looks like:

```
library(shiny)
library(ggplot2)
library(DT)

ui <- fluidPage(
  plotOutput("plot", brush = "plot_brush"),
  DTOutput("table")
)

server <- function(input, output) {
  output$plot <- renderPlot(
    ggplot(mtcars) +
      geom_point(aes(x = mpg, y = disp))
  )
  output$table <- renderDT({
    brushedPoints(mtcars, input$plot_brush)
  })
}

shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_brush_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

# Exercise


