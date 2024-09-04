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

Shiny has some native datatable functions, however using the `DT` package is recommended as it supports additional datatable features. When you load `DT` it will mask the base Shiny functions `dataTableOutput()` with `DTOutput()` and `renderDataTable()` with `renderDT()`. 

To render a table on the UI side you would use:

```
DTOutput("inputID")
```

On the server side you would use:
```
output$<outputID> <- renderDT({
    <insert_dataframe>
  })
```

Let's use the built-in dataset `mtcars` to visualize an example of a data table within a Shiny app. 

On the UI side:
* We are using the input function described earlier `checkboxGroupInput()`, which will allow users to select which columns to display from the table.
* We use the `DTOutput()` with "table" value to correspond with the output object in the server side code

On the server side:
* We use `renderDT()` and provide the mtcars dataframe, using square brackets to subset the columns selected.

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



## Creating a plot 

Creating plots is an essential skill for being able to create apps in Shiny, and is exciting because there are so many ways in which you can enhance the visualization. Let's begin with first demonstrating static plot using the `mtcars` dataset again. The syntax for implementing plots is:

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

In the example below we are using the `selectInput()` function to allow users to select from which column to display on the x-axis and y-axis. The choices given are the column names of the dataframe.

On the server side, we place ggplot2 code inside the `renderPlot()` function, specifying what type of plot we want to draw. The `aes_string()` function allows us to provide information stored in the input object as the x and y values.

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

> Note: In this lesson we are using the package `ggplot2` to create our visualizations, but plots used in Shiny can also be made using the base R graphics or any other packages.

This sample code would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>


## Interacting with plots

While the above plot was interesting for being able to select various metrics to plot, it lacked an ability to interact with the actual data points on the graph. For example, if we saw an outlier, how could we try to identify the specific data point. In the section below we will discuss methods that we can use to actually **interact with the data points on our plots**.

### Clicking

The first way that we can interact will a plot is by clicking a point on the plot. The syntax for this is a bit interesting because it has an `input` buried within an `Output` function. 


On the UI side:

```
plotOutput("plot", click = "<plot_clickID>")
```

The `click = "<plot_clickID>"` argument allows for an inputfrom the click action. 

> Note: Instead of `click = "<plot_clickID>"`, we could use `click = clickOpts("<plot_clickID>")` and this will allow us more options on our clicking. 


On the server side, we have a few new functions as well:

```
  output$table <- renderDT({
    nearPoints(<dataframe_used_in_plotting>, input$<plot_clickID>)
  })
```

The `nearPoints()` function creates a data frame of points near where the cursor clicked on the plot. You can adjust how close (in pixels) you'd like the `threshold` such that when a click is made on the plot which nearby points would register as the selected data point. An example app of this is provided below:

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

### Hover

Instead of clicking on points in your plot, you can instead simply hover over them and identify more information. In order to do this, we need to tweak the UI side of the app.

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


### Brush

The last way that you can make your plots interactive is with brushing. Perhaps you notice a cluster on points in one part of your scatter plot that you'd like to investigate further. Brushing allows you to **use a rectangle to select the points that you would like to interact with**. We need a make a few changes to our UI to accommodate brushing:

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

# Downloading Analysis

In the course of doing your analysis, it is likely that you will get to a point where you want to download data stored in a data frame or a plot that you've created. Shiny also provides functionality to do this. When you are interested in downloading data or plots, you are going to want to use the `downloadButton()` (UI side) and `downloadHandler()` (server) functions.

## Downloading data frame

If you have a data frame that you want to download then the important pieces of syntax are:

On the UI side:
```
downloadButton("<download_buttonID>", "Download the data .csv")
```

The download button is very simialr to the `actionButton()` function that we've already explored (../02_inputs.md). In fact it also accepts the `class` arugment(s) similar to the `actionButton()` function. 

On the server side:

```
  output$<download_buttonID> <- downloadHandler(
    filename = function() {
      "<your_placeholder_filename>.csv"
    },
    content = function(file) {
      write.csv(<your_data_frame>, file, quote = FALSE)
    }
)
```

On the server side, we need to use the `downloadHandler()` function. The `downloadHandler()` function has two main arguments:

- `filename` - This is the default filename that will pop-up when you try to save the file.
- `content` - This is the argument where you write your data frame to a file. In this case, we are writing to a `.csv`, so we use `write.csv()`. We are writing it to a temporary object called `file` that `downloadHandler()` recognizes as the output from `content`.

An example app using this is simialr to the bursh points example we used previously:

```
library(shiny)
library(ggplot2)
library(DT)

ui <- fluidPage(
  plotOutput("plot", brush = "plot_brush"),
  DTOutput("table"),
  downloadButton("download_button", "Download the data .csv")
)

server <- function(input, output) {
  output$plot <- renderPlot(
    ggplot(mtcars) +
      geom_point(aes(x = mpg, y = disp))
  )
  brushed_points <- reactive(
    brushedPoints(mtcars, input$plot_brush)
  )
  output$table <- renderDT({
    brushed_points()
  })
  output$download_button <- downloadHandler(
    filename = function() {
      "mtcars_subset.csv"
    },
    content = function(file) {
      write.csv(brushed_points(), file, quote = FALSE)
    }
  )
}

shinyApp(ui = ui, server = server)
```

In the above script, we tweaked our script to allow us to download the table containing the brushed points. First, we added a download button to out UI with `downloadButton("download_button", "Download the data .csv")`. Next, we moved our `brushedPoints()` function out of `renderDT()` and placed it within a `reactive()` function since we will be calling it twice, once in the `renderDT()` function and again when we write our data in the `downloadHandler()` function. Within the `downloadHandler()` function we provided a filename to use as a placeholder (`"mtcars_subset.csv"`) as well as defining the content of our `.csv` file (`write.csv(brushed_points(), file, quote = FALSE)`). 

This app looks like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Data_frame_download_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

## Downloading a plot

Downloading a plot is similiar to downloading a table. It also uses the `downloadButton()` and `downloadHandler()` functions and the arguments are largely similiar. The syntax looks like:

On the UI side:
```
downloadButton("<download_buttonID>", "Download the data .png")
```

On the server side:
```
  output$<download_buttonID> <- downloadHandler(
    filename = function() {
      "<your_placeholder_filename>.png"
    },
    content = function(file) {
      png(file)
      print(<your_plot>)
      dev.off()
    }
  )
```

We modified our first plot app to allow us to download the plot:

```
library(shiny)
library(ggplot2)

ui <- fluidPage(
  selectInput("x_axis_input", "Select x-axis", choices = colnames(mtcars)),
  selectInput("y_axis_input", "Select y-axis", choices = colnames(mtcars), selected = "disp"),
  plotOutput("plot"),
  downloadButton("download_button", "Download the data .png")
)

server <- function(input, output) {
  mtcars_plot <- reactive({
    ggplot(mtcars) +
      geom_point(aes_string(x = input$x_axis_input, y = input$y_axis_input))
  })
  output$plot <- renderPlot({
    mtcars_plot()
  })
  output$download_button <- downloadHandler(
    filename = function() {
      "mtcars_plot.png"
    },
    content = function(file) {
      png(file)
      print(mtcars_plot())
      dev.off()
    }
  )
}

shinyApp(ui = ui, server = server)
```

Similiarly to when we downloaded the data frame, we have moved our plot function to be within a `reactive()` function (called `mtcars_plot`). Next, our `renderPlot()` function called the `mtcars_plot()` reactive object. Lastly, we call our `downloadHandler()` function and provide it a default file name of `"mtcars_plot.png"` and for `content`, we call it mostly the same way as we would write a plot out in R; calling the `png()` function, plotting our plot, then closing the device with the `dev.off()` function. The only thing of note here is that we go need to wrap the `mtcars_plot()` reactive object within a `print()` function.

This app looks like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_download_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

# Exercise

Create an app in R Shiny that lets users upload the iris dataset that can be found [here](https://raw.githubusercontent.com/hbctraining/Training-modules/master/RShiny/data/iris.csv). Then create a scatterplot where the user selects x-axis and y-axis from separate `selectInput()` menus, containing the values `Sepal.Length`, `Sepal.Width`, `Petal.Length` and `Petal.Width`. Lastly, allow the user to be able to download the boxplot to a `.png`.

Step 1. Write the UI with the appriopriate `fileInput()`, `selectInput()`, `plotOutput` and `downloadButton()` functions

Step 2. Write the server side with:
    a. A `reactive()` function for reading in the CSV file
    b. A `reactive()` function to create the ggplot figure
    c. A `renderPlot()` function to render the ggplot figure from the reactive object
    d. A `downloadHandler()` function for downloading the image

The app will look like:
<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_upload_download_exercise/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

<details>
  <summary><b>Click here to see the solution</b></summary> 
<pre>
library(shiny)
library(ggplot2)<br/>

ui <- fluidPage(
&#9;fileInput("input_file", "Upload file"),
&#9;selectInput("x_axis_input", "Select x-axis", choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
&#9;selectInput("y_axis_input", "Select y-axis", choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
&#9;plotOutput("plot"),
&#9;downloadButton("download_button", "Download the data .png")
)

server <- function(input, output) {
&#9;iris_data <- reactive({
&#9;&#9;req(input$input_file)
&#9;&#9;read.csv(input$input_file$datapath)
&#9;})
&#9;iris_plot <- reactive ({
&#9;ggplot(iris_data()) +
&#9;&#9;geom_point(aes_string(x = input$x_axis_input, y = input$y_axis_input))
&#9;})
&#9;output$plot <- renderPlot({
&#9;&#9;iris_plot()
&#9;})
&#9;output$download_button <- downloadHandler(
&#9;&#9;filename = function() {
&#9;&#9;&#9;"iris_plot.png"
&#9;&#9;},
&#9;&#9;content = function(file) {
&#9;&#9;&#9;png(file)
&#9;&#9;&#9;print(iris_plot())
&#9;&#9;&#9;dev.off()
&#9;&#9;}
&#9;)
}

shinyApp(ui = ui, server = server)
</pre>
</details>


