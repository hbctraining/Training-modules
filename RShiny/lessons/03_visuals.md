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

You may find that you would like to make an app that allows users to upload their own data into the app. To demonstrat this, we first must have some data to upload. We have provided a simple [CSV file](https://raw.githubusercontent.com/hbctraining/Training-modules/master/RShiny/data/animals.csv) that we can use for this task. First you will need to download this file but right-clicking on the link and selecting "Save Link As.." or "Download Linked File As..." depending on your browser. You can save this anywhere on your computer where you will be able to easily locate it. 

Next, let's talk about how you incorporate file uploads into your R Shiny App. The syntax would look like:

On the UI side:

```
fileInput("<input_fileID>", "<Text_above_file_upload>")
```

There are some additional options that you might want to consider when using the `fileInput()` function. 

| Argument | Description |  Example  |
|----------|-------------|-----------|
| multiple | Allows the user to upload multiple files\* | `multiple = TRUE` |
| accept | Limit the file extensions that can be selected by the user | `accept = ".csv"` |
| placeholder | Text to be entered as a placeholder instead of the "No file selected" default | `placeholder = "Waiting for file selection"` |
| buttonLabel | Text to be entered onto the upload button instead of "Browse..." default | `buttonLabel = "Select File..."` |

\* Uploading multiple files can be a bit tricky and is outside of the scope of this workshop, but it can be done.

On the server side it would look like:

```
  uploaded_file <- reactive({
    req(input$<input_fileID>)
    read.table(input$<input_fileID>$datapath)
  })
  output$table <- renderDT(
    uploaded_file()
  )
```

The first part is creating the reactive object `uploaded_file()`. We require that the file exist with `req(input$<input_fileID>)`, otherwise Shiny will return an error until we upload a file. Then we read in the file with a function from the `read.table()` family of functions. Notice our use of a reactive object here. While a reactive object isn't necessary in this very basic example, it is a good practice to get into when uploading data in order to save on computation if you are render multiple objects from a single file.

Within our `renderDT()` function, we are calling out reactive object that we made in the lines above.

The example app for this would look like:

```
library(shiny)
library(ggplot2)
library(DT)

ui <- fluidPage(
  fileInput("input_file", "Upload your file"),
  DTOutput("table")
)

server <- function(input, output) {
  uploaded_file <- reactive({
    req(input$input_file)
    read.csv(input$input_file$datapath, header = TRUE, row.names = 1)
  })
  output$table <- renderDT(
    uploaded_file()
  )
}

shinyApp(ui = ui, server = server)
```

This app would look like:

<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/File_upload_demo/?showcase=0" width="800" height="600px" data-external="1"></iframe></p>

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


