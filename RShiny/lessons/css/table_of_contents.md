---
title: "CSS in RShiny"
author: "Will Gammerdinger"
---

# What is CSS?

CSS, also known as Cascading Style Sheet, is a style sheet language. When we use a CSS file in confunction with our Shiny app, it gives us much more control over the styling of each aspect of the elements in our UI in the same way that you can have fine control over your plots when creating them in R. To this end, it should be noted that this resource is not intended to be exhaustive as there are virtually endless combinations of things you can tweak and ways to tweak them. We will try over time, to compile common items and things you might want to edits within parts of your UI.

# Setting your workspace up for CSS

First, you will need to make a directory within your Shiny app's directory called `www`. Whenever you run a Shiny app, it will check for this folder. However, we need to make a `style.css` file in a text editor and place it within this `www` directory. Then, you need to add to your UI:

```
ui <- fluidPage(
  includeCSS("www/style.css")
  <rest_of_your_UI>
)
```

Now, let's open up the `style.css` file in RStudio next to our app and get to work!

## Example CSS file

Your CSS file might look like:

```
/* Sample CSS Entry */
Put a simple sample CSS here
```

## Commenting your CSS

Commenting your code is a great practice in order to make your code more readable to other. While in many languages you comment your code with a `#`, in CSS you open a comment with `/*` and close a comment with `*/`. In the example code above you can see that we had a comment in front of each CSS Option(?).

## Structure of an CSS entry

Write about how a CSS entry is formatted here.

## Targeting specific elements

If you would like an alteration of the CSS file to target only one of your input sliders but not the rest of them...

## Table of Contents

[radioButtons](css_radioButtons.md)

[sliderInput](css_sliderInput.md)


[css Input Option Reference](css_input_option_reference.md)
