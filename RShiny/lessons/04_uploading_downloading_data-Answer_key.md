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

```{r}
#| label: load_libraries_data
#| echo: false
# Load libraries
library(shiny)
library(ggplot2)
```

# Exercise 1

Create an app in R Shiny that lets users upload the `iris` dataset that can be found [here](https://www.dropbox.com/scl/fi/tvjyczwcn7flfn5b5t5wq/iris.csv?rlkey=oclp1f8f4scuqh2k43xv5p57p&st=yzjbe11s&dl=1). Then create a scatterplot where the user selects x-axis and y-axis from separate `selectInput()` menus, containing the values `Sepal.Length`, `Sepal.Width`, `Petal.Length` and `Petal.Width`. Lastly, allow the user to be able to download the scatterplot to a `.png`.

The app will look like:
<p align="center"><iframe src="https://hcbc.connect.hms.harvard.edu/Plot_upload_download_exercise/?showcase=0" width="800" height="700px" data-external="1"></iframe></p>

1. Write the UI with the appropriate `fileInput()`, `selectInput()`, `plotOutput` and `downloadButton()` functions

```{r}
#| label: UI_set_up
#| eval: false
# Load libraries
library(shiny)
library(ggplot2)

# User Interface
ui <- fluidPage(
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
              choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
  # The output plot
  plotOutput(outputId = "plot"),
  # The download plot button
  downloadButton(outputId = "download_button",
                 label = "Download the data .png")
)
```

2. Write the server side with, a `reactive()` function for reading in the CSV file

```{r}
#| label: reading_CSV
#| eval: false
# Server
server <- function(input, output) {
  # Reactive expression to hold the uploaded data 
  iris_data <- reactive({
    req(input$input_file)
    read.csv(input$input_file$datapath)
  })
}
```

3. Add a `reactive()` function to create the ggplot figure to the server side

```{r}
#| label: ggplot_reactive
#| eval: false
# Server
server <- function(input, output) {
  ...
  # Reactive expression to create a scatterplot from the uploaded data and user selected axes
  iris_plot <- reactive ({
  ggplot(iris_data()) +
    geom_point(aes(x = .data[[input$x_axis_input]],
                   y = .data[[input$y_axis_input]]))
  })
}
```

4. Add a `renderPlot()` function to render the ggplot figure from the reactive expression  to the server side

```{r}
#| label: ggplot_render
#| eval: false
# Server
server <- function(input, output) {
  ...
    # Render the plot from the iris_plot() reactive expression
  output$plot <- renderPlot({
    iris_plot()
  })
}
```

5. Add a `downloadHandler()` function for downloading the image  to the server side

```{r}
#| label: downloadHandler
#| eval: false
# Server
server <- function(input, output) {
  ...
  # Download the data
  output$download_button <- downloadHandler(
    # The placeholder name for the file will be called iris_plot.png
    filename = function() {
      "iris_plot.png"
    },
    # The content of the file will be the contents of the iris_plot() reactive expression
    content = function(file) {
      png(file)
      print(iris_plot())
      dev.off()
    }
  )
}
```

All together the code should look like:

```{r}
#| label: full_answer
#| eval: false
# Load libraries
library(shiny)
library(ggplot2)

# User Interface
ui <- fluidPage(
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
              choices = c("Sepal.Length", "Sepal.Width", "Petal.Length", "Petal.Width")),
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
      png(file)
      print(iris_plot())
      dev.off()
    }
  )
}

# Run the app
shinyApp(ui = ui, server = server)
```

