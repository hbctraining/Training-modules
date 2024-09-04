---
title: "Uploading and dowloading data in RShiny"
author: "Will Gammerdinger"
---

## Learning Objectives

In this lesson, you will:
- Learn how to incorporate data into your Shiny app
- Add functionality to download table data from Shiny app
- Download plot created in Shiny app

# Uploads and Downloads

Transferring files to and from the user is a common feature of Shiny apps. You can use it to upload data for analysis, or download the results as a dataset or as a figure you generated. In this lesson we introduce you to functions that help with file handling in addition to some other advanced topics which ties in nicely (and are helpful when running these functions).

## Uploading data
Often apps are created such that one can explore their own data in some way. To allows users to upload their own data into the app we use the `fileInput()` function on the UI side:

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

_\* Uploading multiple files can be a bit tricky and is outside of the scope of this workshop, but it can be done._

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

The first part of this code is **creating the reactive object `uploaded_file()`**. We require that the file exist with `req(input$<input_fileID>)`, otherwise Shiny will return an error until we upload a file. Then we read in the file with a function from the `read.table()` family of functions. 

**What is a reactive object?**

So far we have seen the case of input being used to directly create outputs. However, there is third tool in the Shiny toolkit and it is called reactive expressions. Reactive expressions are useful because they **take inputs and produce outputs and they cache, or store, their output**. This can be very useful for three reasons:

1. When a step is repeated multiple times in your code, and this step that is either computationally intensive or requires interacting with outside databases, Shiny will only need to carry out the task once.
2. It makes your code cleaner because you only need to maintain the code for a repetitive step in a single place.
3. They are needed to use action buttons (described in detail below).


Notice our use of a reactive object here. While a reactive object isn't necessary in this very basic example, it is a **good practice to get into when uploading data** in order to save on computation if you are rendering multiple objects from a single file.

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

## Downloading Analysis
In the course of doing your analysis, it is likely that you will get to a point where you want to download data stored in a data frame or a plot that you've created. Shiny also provides functionality to do this. When you are interested in downloading data or plots, you are going to want to use the `downloadButton()` (UI side) and `downloadHandler()` (server) functions.

### Action buttons

### Downloading data frame

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

### Downloading a plot

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



