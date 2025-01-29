---
title: "CSS in RShiny"
author: "Will Gammerdinger"
---

# What is CSS?

CSS, also known as Cascading Style Sheet, is a style sheet language. When we use a CSS file in confunction with our Shiny app, it gives up much more control over the styling of each aspect of the elements in our UI in the same way that you can have fine control over your plots when creating them in R. To this end, it should be noted that this resource is not intended to be exhaustive as there are virtually endless combinations of things you can tweak and way to tweak them. We will try over time, to compile common items and things you might want to edits within parts of your UI.

# Setting your workspace up for CSS

First, you will need to make a directory within your Shiny app's directory called `www`. Whenever you run a Shiny app, it will check for this folder. However, we need to make a `style.css` file in a text editor and place it within this `www` directory. Then, you need to add to your UI:

```
ui <- fluidPage(
  includeCSS("www/style.css")
  <rest_of_your_UI>
)
```

Now, let's open up the `style.css` file in RStudio next to our app and get to work!

## Table of Contents

[sliderInput](css_sliderInput.md)


[css Input Option Reference](css_input_option_reference.md)
