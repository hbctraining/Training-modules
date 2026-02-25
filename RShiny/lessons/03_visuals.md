---
title: "Visualization and Interactive Visuals in RShiny"
author:
  - Will Gammerdinger
  - Meeta Mistry
date: "2025-10-29"
categories: 
  - R
  - Shiny
  - Data Visualization
  - Interactive Plots
  - Tables
keywords:
  - Shiny
  - R
  - plotOutput
  - renderPlot
  - DTOutput
  - renderDT
  - data tables
  - interactive plots
  - nearPoints
  - brushedPoints
  - plot interactivity
  - click
  - hover
  - brush
license: "CC-BY-4.0"
---

# Learning Objectives

In this lesson, you will:

- Implement a data table output into an app
- Create an app with a plot output
- Design an app with an interactive plot

# Providing a data table as output

Shiny has some native data table functions, however using the `DT` package is recommended as it supports additional data table features. When you load `DT` it will mask the base Shiny functions `dataTableOutput()` with `DTOutput()` and `renderDataTable()` with `renderDT()`. In order to use the `DT` package, we will need to load it with:

```
# Load libraries
library(DT)
```

To display a data table on the UI side you would use:

```
# DO NOT RUN
DTOutput(outputId = "outputID")
```

On the server side you would use:

```
# DO NOT RUN
output$<outputID> <- renderDT({
    <insert_dataframe>
  })
```

Let's use the built-in dataset `mtcars` to visualize an example of a data table within a Shiny app. 

```
# Load libraries
library(shiny)
library(DT)

# User interface
ui <- fluidPage(
    # Checkbox group to select which columns we would like to see in the data table
    checkboxGroupInput(inputId = "column_input", 
                       label = "Select columns", 
                       choices = colnames(mtcars), 
                       inline = TRUE),
    # The output table
    DTOutput(outputId = "table")
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

On the UI side:

- We are using the input function described earlier `checkboxGroupInput()`, which will allow users to select which columns to display in the table.
- We are using the `DTOutput()` function with "table" as the ID to correspond with the output object in the server side code

On the server side:

- We use `renderDT()` and providing the `mtcars` dataframe, while using square brackets to subset the columns selected.

This will visualize in the app as:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Datatable_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

---

## [**Exercise 1**](03_visuals-Answer_key.md#exercise-1)

Modify the app we just made which prints our output to a table to use `selectInput()` menu instead of `checkboxGroupInput()` in order to choose which column(s) we would like to see in our output table.

---

# Creating a plot 

Creating plots is an essential skill for being able to create apps in Shiny, and it is exciting because there are so many ways in which you can enhance the visualization. Let's begin with first demonstrating static plots using the `mtcars` dataset again. We will be using `ggplot2`, so we will need to load it:

```
# Load libraries
library(ggplot2)
```

The syntax for implementing plots is:

On the UI side:

```
# DO NOT RUN
plotOutput(outputId = "<outputID>")
```

On the server side:

```
# DO NOT RUN
output$<outputID> <- renderPlot({
    <insert_plot_creation>
})
```

In the example below we are using the `selectInput()` function to allow users to select which columns to display on the x-axis and y-axis. The choices given are the column names of the dataframe.

On the server side, we place `ggplot2` code inside the `renderPlot()` function, specifying what type of plot we want to draw. For the most part, your `ggplot2` code should stay relatively familiar except that now the `x` and `y` variables will now need to be placed within `.data[[input$var]]` structure. This structure is more explicit and tells `ggplot2` to treat the Shiny input, which is a string, as the name of a column in the data.

```
# Load libraries
library(shiny)
library(ggplot2)

# User Interface
ui <- fluidPage(
    # Dropdown menu to select which column will be used for the x-axis
    selectInput(inputId = "x_axis_input",
                label = "Select x-axis",
                choices = colnames(mtcars)),
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
        # Importantly, we need use the .data[[input$var]] format for our variables
        ggplot(mtcars) +
            geom_point(aes(x = .data[[input$x_axis_input]],
                           y = .data[[input$y_axis_input]]))
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

> In this lesson, we are using the package `ggplot2` to create our visualizations, but plots used in Shiny can also be made using the base R graphics or any other packages.

>You may come across code that uses the `aes_string()` function rather than `aes()` particularly within R Shiny apps. They will look like:
>
>```
># DO NOT RUN
>ggplot(mtcars) +
>            geom_point(aes_string(x = input$x_axis_input, 
>                                  y = input$y_axis_input))
>```
>
>Because Shiny inputs are strings, older code often used `aes_string()` to convert those strings into aesthetics. However, `aes_string()` is now a deprecated function and the [recommended practice](https://ggplot2.tidyverse.org/reference/aes_.html) is to use `aes()` and refer to your `x` and `y` data within a `.data[[input$var]]` structure if your `x` or `y` variable is coming from an `input` selection .

This sample code would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

---

## [**Exercise 2**](03_visuals-Answer_key.md#exercise-2)

Modify the above app to creates a boxplot with the number of cylinders (`cyl` in the `mtcars` dataset) fixed on the x-axis and then allows the user to select the metric to visualize on the y-axis from a `selectInput()` menu.

*Hint: You will need to set `x = factor(cyl)`. We will discuss why we don't wrap this in `.data[[ ]]` later.*

---

## Interacting with plots

While the above plot was interesting for being able to select various metrics to plot, it lacked an ability to interact with the actual data points on the graph. For example, if we saw an outlier, how could we try to identify the specific data point. In the section below we will discuss methods that we can use to actually **interact with the data points on our plots**.

## Clicking

The first way that we can interact with a plot is by clicking a point on the plot. The syntax for this is a bit interesting because it has an `input` buried within an `Output` function. 

On the UI side:

```
# DO NOT RUN
plotOutput(outputId = "plot", 
           click = "<plot_clickID>")
```

The `click = "<plot_clickID>"` argument allows for an input from the click action. 

>Instead of `click = "<plot_clickID>"`, we could use `click = clickOpts("<plot_clickID>")` and this will allow us more options on our clicking.

On the server side, we have a few new functions as well:

```
# DO NOT RUN
output$table <- renderDT({
  nearPoints(df = <dataframe_used_in_plotting>,
             coordinfo = input$<plot_clickID>,
             xvar = <xvar_string>,
             yvar = <yvar_string>)
})
```

The `nearPoints()` function creates a dataframe of points near where the cursor clicked on the plot. You can adjust how close (in pixels) you'd like the `threshold` to be such that when a click is made on the plot which nearby points would register as the selected data point. 

>When using the `nearPoints()` function in the app below and the axes are static, it is not required that you provide `xvar` and `yvar`, but we would encourage the practice, because when they are dynamic it will be required, so it is best to get in the habit of doing it.
> 
Importantly, `xvar` and `yvar` are expecting *strings*, so in the case of static input like in the app below, you will need to place the columns of data used in the plot in double quotes like `"mpg"` and `"disp"`. However, in the case where the input dynamic, we can recall that `input` variables are strings, so we just need to set `xvar` and `yvar` equal to the input variable like:
> 
>```
># DO NOT RUN
>output$table <- renderDT({
>  nearPoints(df = mtcars,
>             coordinfo = input$plot_click,
>             xvar = input$x_axis_input,
>             yvar = input$y_axis_input)
>})
>```

An example app of this is provided below:

```
# Load libraries
library(shiny)
library(ggplot2)
library(DT)

# User Interface
ui <- fluidPage(
    # Plot the output with an interactive clicking argument
    plotOutput(outputId = "plot", 
               click = "plot_click"),
    # The output table
    DTOutput(outputId = "table")
)

# Server
server <- function(input, output) {
    # Render a plot from the built-in mtcars dataset
    output$plot <- renderPlot(
        ggplot(mtcars) +
            geom_point(aes(x = mpg,
                           y = disp))
    )
    # Render a table from points near to where the click on the plot came from
    output$table <- renderDT({
        nearPoints(df = mtcars,
                   coordinfo = input$plot_click,
                   xvar = "mpg",
                   yvar = "disp")
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_click_demo/?showcase=0" width="800" height="625px" data-external="1"></iframe></p>

>You will notice that in this app, we don't use the `.data[[ ]]`around our `x` and `y` variables:
>
>```
># DO NOT RUN
>ggplot(mtcars) +
>  geom_point(aes(x = mpg,
>                 y = disp))
>```
>
>This works because `mpg` and `disp` are fixed column names written directly in the code and they are not coming from Shiny input variables, which are **strings**, like `input$x_axis_input`. So the rule is:
>
> - *If the `x` or `y` variable is coming from an `input` variable, which is a string, then it needs to have the `.data[[input$var]]` format*
> - *If the `x` or `y` variable are fixed column names in the app, then you can use the normal `ggplot2` syntax*.

## Hover

Instead of clicking on points in your plot, you can instead hover over them and identify more information. In order to do this, we need to tweak the UI side of the app.

On the UI side:

```
# DO NOT RUN
plotOutput(outputId = "plot", 
           hover = hoverOpts(id = "<plot_hoverID>", 
                             delay = 25))
```

In this case, the `hover` argument is replacing the `click` argument that we used in the previous example. However, now we are actually utilizing an option (`delay = 25`) within the `[click/hover/brush]Opt()`family of functions to reduce the delay in milliseconds before a hover is registered by Shiny. The default is 300ms, which feels a bit unresponsive, so we have reduced it for a more "live" feeling.

An example of this code is below:

```
# Load libraries
library(shiny)
library(ggplot2)
library(DT)

# User Interface
ui <- fluidPage(
    # Plot the output with an interactive clicking argument
    plotOutput(outputId = "plot",
               hover = hoverOpts(id = "plot_hover",
                                 delay = 25)),
    # The output table
    DTOutput(outputId = "table")
)

# Server
server <- function(input, output) {
  # Render a plot from the built-in mtcars dataset
  output$plot <- renderPlot(
    ggplot(mtcars) +
      geom_point(aes(x = mpg,
                     y = disp))
  )
  # Render a table from points near to where the mouse is hovering on the plot 
  output$table <- renderDT({
    nearPoints(df = mtcars,
               coordinfo = input$plot_hover,
               xvar = "mpg",
               yvar = "disp")
  })
}

# Run the app
shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_hover_demo/?showcase=0" width="800" height="650px" data-external="1"></iframe></p>


## Brush

The last way that you can make your plots interactive is with brushing. Perhaps you notice a cluster of points in one part of your scatterplot that you'd like to investigate further. Brushing allows you to **use a rectangle to select the points that you would like to interact with**. We need a make a few changes to our UI to accommodate brushing:

On the UI side:

```
# DO NOT RUN
plotOutput(outputId = "plot", 
           brush = "<plot_brushID>")
```

We can change `brush = "<plot_brushID>"` to `brush = brushOpts(id = "<plot_brushID>")`, which will give us access to a few more arguments in the table below:

| Argument | Description |  Example  |
|----------|-------------|-----------|
| stroke | Changes the color of the outline of the rectangle | `stroke = "orange"` |
| fill | Changes the color of the fill of the rectangle | `fill = "pink"` |
| opacity | Changes the opacity of the rectangle (Scale from 0 to 1) | `opacity = 0.8` |
| resetOnNew | Removes the current brushed area when a new plot is created (Default is `FALSE`) | `resetOnNew = TRUE` |

On the server side we need to use:

```
# DO NOT RUN
output$table <- renderDT({
  brushedPoints(df = <dataframe_used_in_plotting>,
                brush = input$<plot_brushID>,
                xvar = <xvar_string>,
                yvar = <yvar_string>)
})
```

The `brushedPoints()` function works similarly to the `nearPoints()` function. It gathers the points within the rectangle and outputs their information to a data frame.

An example code using brushing looks like:

```
# Load libraries
library(shiny)
library(ggplot2)
library(DT)

# User Interface
ui <- fluidPage(
    #  Plot the output with an interactive brushing argument
    plotOutput(outputId = "plot",
               brush = "plot_brush"),
    # The output table
    DTOutput(outputId = "table")
)

# Server
server <- function(input, output) {
    # Render a plot from the built-in mtcars dataset
    output$plot <- renderPlot(
        ggplot(mtcars) +
            geom_point(aes(x = mpg,
                           y = disp))
    )
    # Render a table from points within the rectangle created by clicking and dragging over the plot
    output$table <- renderDT({
        brushedPoints(df = mtcars,
                      brush = input$plot_brush,
                      xvar = "mpg",
                      yvar = "disp")
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_brush_demo/?showcase=0" width="800" height="725px" data-external="1"></iframe></p>

---

## [**Exercise 3**](03_visuals-Answer_key.md#exercise-3)

Edit the above app using `brushOpts()` so that the fill of the brushed area is crimson (#A51C30), the border of the brushed area is blue (#3E6F7D) and set the opacity of the brushed area is 0.7.

---

Now you have learned how to make your plots interactive!

***

[Next Lesson >>](04_uploading_downloading_data.md)

[Back to Schedule](../README.md)
