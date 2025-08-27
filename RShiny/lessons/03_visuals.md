---
title: "Visualization and Interactive Visuals in RShiny"
author: "Will Gammerdinger"
---

## Learning Objectives

In this lesson, you will:
- Create a data table output
- Create a plot output
- Create an interactive plot

## Creating a data table output

Shiny has some native data table functions, however using the `DT` package is recommended as it supports additional data table features. When you load `DT` it will mask the base Shiny functions `dataTableOutput()` with `DTOutput()` and `renderDataTable()` with `renderDT()`. In order to use the `DT` package, we will need to load it with:

```
library(DT)
```

To render a data table on the UI side you would use:

```
# Do Not Run
DTOutput("outputID")
```

On the server side you would use:
```
# Do Not Run
output$<outputID> <- renderDT({
    <insert_dataframe>
  })
```

Let's use the built-in dataset `mtcars` to visualize an example of a data table within a Shiny app. 

```
# User interface
ui <- fluidPage(
    # Checkbox group to select which columns we would like to see in the data table
    checkboxGroupInput(inputId = "column_input", label = "Select columns", choices = colnames(mtcars), inline = TRUE),
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

On the UI side:
* We are using the input function described earlier `checkboxGroupInput()`, which will allow users to select which columns to display in the table.
* We are using the `DTOutput()` funtion with "table" as the ID to correspond with the output object in the server side code

On the server side:
* We use `renderDT()` and providing the mtcars dataframe, while using square brackets to subset the columns selected.

This will visualize in the app as:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Datatable_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>



## Creating a plot 

Creating plots is an essential skill for being able to create apps in Shiny, and it is exciting because there are so many ways in which you can enhance the visualization. Let's begin with first demonstrating static plots using the `mtcars` dataset again. We will be using `ggplot2`, which is part of the `tidyverse` package, so we will need to load `tidyverse`:

```
library(tidyverse)
```

The syntax for implementing plots is:

On the UI side:

```
# Do Not Run
plotOutput("<outputID>")
```

On the server side:

```
# Do Not Run
output$<outputID> <- renderPlot({
    <insert_plot_creation>
})
```

In the example below we are using the `selectInput()` function to allow users to select which columns to display on the x-axis and y-axis. The choices given are the column names of the dataframe.

On the server side, we place ggplot2 code inside the `renderPlot()` function, specifying what type of plot we want to draw. The `aes_string()` function allows us to provide information stored in the input object as the x and y values.

```
# User Interface
ui <- fluidPage(
    # Dropdown menu to select which column will be used for the x-axis
    selectInput(inputId = "x_axis_input", label = "Select x-axis", choices = colnames(mtcars)),
    # Dropdown menu to select which column will be used for the y-axis
    selectInput(inputId = "y_axis_input", label = "Select y-axis", choices = colnames(mtcars), selected = "disp"),
    # The output plot
    plotOutput("plot")
)

# Server
server <- function(input, output) {
    # Render the scatter plot
    output$plot <- renderPlot({
        # Scatter plot creation
        # Importantly, we need to use aes_string() instead of aes() when the information is stored in an input object
        ggplot(mtcars) +
            geom_point(aes_string(x = input$x_axis_input, y = input$y_axis_input))
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

> Note: In this lesson, we are using the package `ggplot2` to create our visualizations, but plots used in Shiny can also be made using the base R graphics or any other packages.

This sample code would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>


## Interacting with plots

While the above plot was interesting for being able to select various metrics to plot, it lacked an ability to interact with the actual data points on the graph. For example, if we saw an outlier, how could we try to identify the specific data point. In the section below we will discuss methods that we can use to actually **interact with the data points on our plots**.

### Clicking

The first way that we can interact with a plot is by clicking a point on the plot. The syntax for this is a bit interesting because it has an `input` buried within an `Output` function. 

On the UI side:

```
# Do Not Run
plotOutput("plot", click = "<plot_clickID>")
```

The `click = "<plot_clickID>"` argument allows for an input from the click action. 

> Note: Instead of `click = "<plot_clickID>"`, we could use `click = clickOpts("<plot_clickID>")` and this will allow us more options on our clicking. 


On the server side, we have a few new functions as well:

```
# Do Not Run
  output$table <- renderDT({
    nearPoints(<dataframe_used_in_plotting>, input$<plot_clickID>)
  })
```

The `nearPoints()` function creates a data frame of points near where the cursor clicked on the plot. You can adjust how close (in pixels) you'd like the `threshold` to be such that when a click is made on the plot which nearby points would register as the selected data point. An example app of this is provided below:

```
# User Interface
ui <- fluidPage(
    # Plot the output with an interactive clicking argument
    plotOutput("plot", click = "plot_click"),
    # The output table
    DTOutput("table")
)

# Server
server <- function(input, output) {
    # Render a plot from the built-in mtcars dataset
    output$plot <- renderPlot(
        ggplot(mtcars) +
            geom_point(aes(x = mpg, y = disp))
    )
    # Render a table from points near to where the click on the plot came from
    output$table <- renderDT({
        nearPoints(mtcars, input$plot_click)
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_click_demo/?showcase=0" width="800" height="625px" data-external="1"></iframe></p>

### Hover

Instead of clicking on points in your plot, you can instead hover over them and identify more information. In order to do this, we need to tweak the UI side of the app.

On the UI side:
```
# Do Not Run
plotOutput("plot", hover = hoverOpts("<plot_hoverID>", delay = 25))
```

In this case, the `hover` argument is replacing the `click` argument that we used in the previous example. However, now we are actually utilizing an option (`delay = 25`) within the `[click/hover/brush]Opt()`family of functions to reduce the delay in milliseconds before a hover is registered by Shiny. The default is 300ms, which feels a bit unresponsive, so we have reduced it for a more "live" feeling.

An example of this code is below:

```
# User Interface
ui <- fluidPage(
    # Plot the output with an interactive clicking argument
    plotOutput("plot", hover = hoverOpts("plot_hover", delay = 25)),
    # The output table
    DTOutput("table")
)

# Server
server <- function(input, output) {
     # Render a plot from the built-in mtcars dataset
    output$plot <- renderPlot(
        ggplot(mtcars) +
            geom_point(aes(x = mpg, y = disp))
    )
    # Render a table from points near to where the mouse is hovering on the plot 
    output$table <- renderDT({
        nearPoints(mtcars, input$plot_hover)
    })
}

# Run the app
shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_hover_demo/?showcase=0" width="800" height="650px" data-external="1"></iframe></p>


### Brush

The last way that you can make your plots interactive is with brushing. Perhaps you notice a cluster of points in one part of your scatter plot that you'd like to investigate further. Brushing allows you to **use a rectangle to select the points that you would like to interact with**. We need a make a few changes to our UI to accommodate brushing:

On the UI side:

```
# Do Not Run
plotOutput("plot", brush = "<plot_brushID>")
```

We can change `brush = "<plot_brushID>"` to `brush = brushOpt("<plot_brushID>")`, which will give us access to a few more arguments in the table below:

| Argument | Description |  Example  |
|----------|-------------|-----------|
| stroke | Changes the color of the outline of the rectangle | `stroke = "orange"` |
| fill | Changes the color of the fill of the rectangle | `fill = "pink"` |
| opacity | Changes the opacity of the rectangle (Scale from 0 to 1) | `opacity = 0.8` |
| resetOnNew | Removes the current brushed area when a new plot is created (Default is `FALSE`) | `resetOnNew = TRUE` |

On the server side we need to use:

```
# Do Not Run
  output$table <- renderDT({
    brushedPoints(<dataframe_used_in_plotting>, input$<plot_brushID>)
  })
```

The `brushedPoints()` function works similarly to the `nearPoints()` function. It gathers the points within the rectangle and outputs their information to a data frame.

An example code using brushing looks like:

```
# User Interface
ui <- fluidPage(
    #  Plot the output with an interactive brushing argument
    plotOutput("plot", brush = "plot_brush"),
    # The output table
    DTOutput("table")
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

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_brush_demo/?showcase=0" width="800" height="725px" data-external="1"></iframe></p>

Now you have learned how to make your plots interactive!

***

[Next Lesson >>](04_uploading_downloading_data.md)

[Back to Schedule](..)

*** 

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
