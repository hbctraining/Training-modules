---
title: "Structure and Syntax in RShiny"
author: "Will Gammerdinger"
---

## Learning Objectives

In this lesson, you will:

- Describe RShiny
- Describe the structure of a RShiny App
- Define the syntax needed to create an RShiny App

## What is Shiny?

[Shiny](https://shiny.posit.co/) is a package available for both R and Python that allows the user to create a wide variety of interactive web applications (also known as apps). This workshop will focus on using Shiny within R. However, many of the principles from this workshop are applicable to Shiny on Python, but the syntax conforms to Python's syntax rules rather than R's. 

<p align="center">
<img src="../img/Shiny_logo.png" width="200">
</p>

Before we dig too far into the syntax or structure of an app, let's first look at one that we recently made for the Bioinformatics Core to help us carry out quality control on single-cell RNA-seq data. The link to this app can be found [here](). **MISSING LINK**

As you can see, we can toggle the thresholds that we would like to use for... 

## RShiny App Structure

Each Shiny App has 3 main components:

1. **User Interface (UI)** - This section outlines how the app will look and where items are placed. This is referred to as the _front-end_ of the app.
2. **Server** - This section provides the instructions for how input data will be processed and returned by the app. This is referred to as the _back-end_ of the app
3. **shinyApp** - This is the line that ties the UI and the server together and launches the app

## Setup
**Add some text here on opening RStudio and setting up an R project? Include a script?**

## Your first app

Let's go ahead and create an app to help demonstrate these components and how they tie together. Copy and paste this code into your Rscript, highlight all of the code then send the code to the console using <kbd>Ctrl</kbd> + <kbd>Enter/Return</kbd>:

```
library(shiny)

ui <- fluidPage(
    textInput("input_text", "My input text"),
    textOutput("output_text")
)

server <- function(input, output){
    output$output_text <- renderText({
        input$input_text
    })
}

shinyApp(ui = ui, server = server)
```

The app that returns should look like the one below:

<iframe src="https://hcbc.connect.hms.harvard.edu/input_text_demo/?showcase=0" width="100%" height="200px" data-external="1"> </iframe>

You can see that while your app is running it will look something similar to:

```
Listening on http://127.0.0.1:4108
```

When you are running an app your console will be unavailable. In order **to get your console back** you need to either **close the app or press the red stop sign** in the top right of the console. If you relaunch the app (by re-running the `shinyApp` function), you can view the app in a web browser by:

1. Clicking "Open in Browser" at the top of the the app window
2. Copy and paste the URL in your console after "Listening on" into the URL of your preferred browser

### User Interface

Let's go line-by line and breakdown the code for the UI:

```
ui <- fluidPage(
  ...
)
```

The `fluidPage()` function is a common wrapper used to develop UI's in Shiny and it is being assigned to the object `ui`.

```
textInput("input_text", "My input text")
```

There are many types of input and output types in RShiny, we will discuss these types at length in the [next lesson](). In this example, we are **creating a text input** using the `textInput()` function. There are two arguments:

1. The first argument is the variable name for the user input to be stored to.
2. The second argument is a character string representing the text which will be placed above the input text box.

Because this is the first line of code for the app, this input text box will appear at the top of the app.

```
textOutput("output_text")
```

The `textOuput()` function is telling the UI where to put the output text after it has been rendered by the server. We haven't seen where the variable `output_text` is created yet, but we will see it in the server section below. 

Importantly, each line at the same scope in the UI is separated by a comma.

### Server

Now let's investigate the server side of the app:

```
server <- function(input, output){
  ...
  })
```

The server function is created with the variables `input` and `output` to hold the input and output of the app. Inside the function we place the following code:

```
    output$output_text <- renderText({
        input$input_text
    })
```

Here, we are using the `renderText()` function to take the object from `textInput()` render it as output. We then take that rendering and assign it to `output$output_text` which ties back to the  `textOutput()` function we had in the UI section of code. 

> **NOTE:** The `render[Type]()` family of functions are specific to the type of `[type]Output()`. We will talk about this more in the next lesson.

## Putting it all together 

Now that we've gone through each line, let's talk about what happens when we run the `shinyApp()` function to tie it all together. 

1. The input text is entered into the box created by `textInput()` and saved as `input$input_text`
2. This `input$input_text` object is sent to the server which sees that `input$input_text` is used to create the rendered text for `output$output_text`.
3. This `output$output_text` output is then sent back to the UI where it is displayed in the `textOutput()` fucntion

The diagram below illustrates how this works.

<p align="center">
<img src="../img/Shiny_process.png" width="800">
</p>

Now that we have a created our first Shiny app in R, we will explore various input and output options in the next lesson.

***

[Next Lesson >>](02_inputs.md)

[Back to Schedule](..)

*** 

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
