---
title: "Using Shinylive to host Shiny app on GitHub Pages"
author: "Will Gammerdinger"
---

# Learning Objectives

In this lesson, you will:
- Upload an app to GitHub Pages using Shinylive 

# Why use Shinylive?

Oftentimes when you are distributing an app, you will need to upload it to a server like Posit Connect or Shinyapp.io. However, recently there has become an avenue for distributing Shiny apps without a server using a package called `shinylive`. This can work because places like GitHub run what is called "static webpages". Static webpages don't respond to user input. However, what `shinylive` does is it compiles your app in such a way that it is static from the server's point of view and the computation for an app is done locally on a user's browser rather than on a server. One disadvantage of this model is that your apps can only use the computationally power of the user's computer, but for apps with a low memory need, this can be a viable option.

# Pre-requisites

In order to do the following steps you will need a GitHub account. If you do not have a GitHub account, instructions to doingin so can be found [here](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github). You will also need two packages, `shinylive` and `httpuv`. You can install these with the following commands in your console:

```
install.packages("shinylive")
install.packages("httpuv")
```

You will need to load the libraries with:

```
library(shinylive)
library(httpuv)
```

If you have done all of this, then you are ready to upload your app to GitHub Pages using Shinylive!

# Creating your app

## Create an RStudio Project

The first step in the process is to create an RStudio project. In order to do this:

1. Go to your RStudio toolbar and select "**File**" and then select "**New Project**"
2. A pop-up window should appear where you can select "**New Directory**" and the window should progress to a allow you to choose "**Shiny Application**". One benefit of selecting **Shiny Application** here is that it will automatically create an R script called "app.R".
3. Enter the name of your RStudio project, in this case we are going to call ours "mtcars_demo"
4. (Optional) You can select where you would like this project to be saved to by clicking the "**Browse...**". However, we are happy saving it to our **Desktop**.
5. Click "**Create Project**"

These steps are shown in the GIF below:

<p align="center">
<img src="../img/Create_project_demo.gif" width="700">
</p>

## Make app

The next step in this process is likely the longest step because you now need to make your app! However, we are going to take a shortcut here and use an app that we have already created.

1. Highlight and delete the default app that came along with create you Shiny application RStudio project
2. Copy the RShiny App below by highlighting it and right-clicking selecting "**Copy**"

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

3. Right-click the script editor panel in your RStudio project and select "**Paste**"
4. Save your app by left-clicking on the Save icon in RStudio

<p align="center">
<img src="../img/Make_app.gif" width="700">
</p>

3. Create docs and export
<p align="center">
<img src="../img/Exporting_app.gif" width="700">
</p>

4. View with httpuv

<p align="center">
<img src="../img/Run_static_server.gif" width="700">
</p>

5. make github page

<p align="center">
<img src="../img/Make_GitHub_page.gif" width="700">
</p>

6. settings
   
<p align="center">
<img src="../img/Change_GitHub_Pages_settings.gif" width="700">
</p>

7. clone github
    
<p align="center">
<img src="../img/GitHub_clone.gif" width="700">
</p>

8. copy files over

<p align="center">
<img src="../img/Copying_app_pushing_repo.gif" width="700">
</p>


9. View

<p align="center">
<img src="../img/Moving_to_shinylive_app.gif" width="700">
</p>
