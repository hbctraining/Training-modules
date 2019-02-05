---
title: Plotting and data visualization in R
author: Mary Piper, Meeta Mistry, Radhika Khetani
date: "Monday, February 4th, 2019"
---

Approximate time: 90 minutes

## Learning Objectives 

* Explain the grammar of graphics syntax used by ggplot2
* Determine how to plot different types of graphs with ggplot2 depending on the number and type of variables
* Export plots for use outside of the R environment.

## Data Visualization with `ggplot2`

When we are working with large sets of numbers it can be useful to display that information graphically to gain more insight. Visualization deserves an entire course of its own (there is that much to know!). If you are interested in learning about plotting with base R functions, we have a short lesson [available here](basic_plots_in_r.md). In this lesson we will be plotting with the popular Bioconductor package [`ggplot2`](http://docs.ggplot2.org/).

More recently, R users have moved away from base graphic options towards `ggplot2` since it offers a lot more functionality as compared to the base R plotting functions. The `ggplot2` syntax takes some getting used to, but once you get it, you will find it's extremely powerful and flexible. We will start with drawing a simple x-y scatterplot of `gene_ratio` versus `GO_term` from the `bp_oe` data frame. `ggplot2` assumes that the input is in a data frame.

The `ggplot()` function is used to **initialize the basic graph structure**, then we add to it. The basic idea is that you specify different parts of the plot, and add them together using the `+` operator. These parts are often referred to as layers.

Let's start. First subset the `bp_oe` dataframe to only contain the top 30 most significant GO terms: 

```r
# Subset data frame
bp_plot <- bp_oe[1:30, ]

ggplot(bp_plot) # what happens? 
```

You get a blank plot, because you need to **specify layers** using the `+` operator.

One type of layer is **geometric objects**. These are the actual marks we put on a plot. Examples include:

* points (`geom_point`, `geom_jitter` for scatter plots, dot plots, etc)
* lines (`geom_line`, for time series, trend lines, etc)
* boxplot (`geom_boxplot`, for, well, boxplots!)

For a more exhaustive list on all possible geometric objects and when to use them check out [Hadley Wickham's RPubs](http://rpubs.com/hadley/ggplot2-layers) or the [RStudio cheatsheet](https://www.rstudio.com/wp-content/uploads/2016/11/ggplot2-cheatsheet-2.1.pdf). 

A plot **must have at least one `geom`**; there is no upper limit. You can add a `geom` to a plot using the `+` operator

```r
ggplot(bp_plot) +
  geom_point() # note what happens here
```

You will find that even though we have added a layer by specifying `geom_point`, we get an error. This is because each type of geom usually has a **required set of aesthetics** to be set. Aesthetic mappings are set with the `aes()` function and can be set inside `geom_point()` to be specifically applied to that layer. If we supplied aesthetics within `ggplot()`, they will be used as defaults for every layer. Examples of aesthetics include:

* position (i.e., on the x and y axes)
* color ("outside" color)
* fill ("inside" color) 
* shape (of points)
* linetype
* size

To start, we will add position for the x- and y-axis since `geom_point` requires the most basic information about a scatterplot, i.e. what you want to plot on the x and y axes. All of the others mentioned above are optional.

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term))
```

 ![ggscatter1](../img/) 


Now that we have the required aesthetics, let's add some extras like color to the plot. We can **`color` the points on the plot based on p-values**, by specifying the column header. You will notice that there are a default set of colors that will be used so we do not have to specify. Also, the **legend has been conveniently plotted for us!**


```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, color = p.value))
```

 ![ggscatter1.1](../img/) 

Alternatively, we could color number of DE gene associated with each term (`overlap.size`). 

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, color = overlap.size))
```

 ![ggscatter3](../img/) 


The **size of the data points** are quite small. We can adjust that within the `geom_point()` layer, but does **not** need to be **included in `aes()`** since we are specifying how large we want the data points, rather than mapping it to a variable. Add in the `size` argument by specifying a number for the size of the data point:

```
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, , color = p.value), 
             size = 1)
```

The size of the points is personal preference, and you may need to play around with the parameter to decide which size is best.

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, , color = p.value), 
             size = 5)
```

That seems a bit too big, so we can return the points to a smaller size. There are other attributes that we can play with as well, such as the shape of the points. Different shapes are available, as detailed in the [RStudio ggplot2 cheatsheet](https://www.rstudio.com/wp-content/uploads/2015/03/ggplot2-cheatsheet.pdf). Let's explore this parameter by changing all of the points to squares:

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, , color = p.value), 
             size = 2, 
             shape = "square")
```

Note that we can change all shapes to square by adding this argument to be outside the `aes()` function; if we put the argument inside the `aes()` function we could change the shape according to some variable in our data frame.

Now we can start updating the plot to suit our preferences for how we want the data displayed. The labels on the x- and y-axis are also quite small and not very descriptive. To change their size and content, we need to add an additional **theme layer**. The ggplot2 `theme` system handles non-data plot elements such as:

* Axis label aesthetics
* Plot background
* Facet label backround
* Legend appearance

There are built-in themes we can use (i.e. `theme_bw()`) that mostly change the background/foreground colours, by adding it as additional layer. Or we can adjust specific elements of the current default theme by adding the `theme()` layer and passing in arguments for the things we wish to change. Or we can use both.

Let's add a layer `theme_bw()`. Do the axis labels or the tick labels get any larger by changing themes?

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, , color = p.value), 
             size = 2) +
  theme_bw()
```

Not in this case. But we can add arguments using `theme()` to change it ourselves. Since we are adding this layer on top (i.e later in sequence), any features we change will override what is set in the `theme_bw()`. Here we'll **increase the size of the axes labels to be 1.15 times the default size and the x-axis tick labels to be 1.15 times the default.** When modifying the size of text we often use the `rel()` function. In this way the size we specify is relative to the default. We can also provide the number value as we did with the data point size, but it can be cumbersome if you don't know what the default font size is to begin with. 

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = GO_term, color = p.value), 
             size = 2) +
  theme_bw() +
  theme(axis.text.x = element_text(size=rel(1.15)),
        axis.title = element_text(size=rel(1.15)),
        legend.title = element_text(size=rel(1.15), 
                                    face="bold"))
```

 ![ggscatter5](../img/)
 

> *NOTE:* You can use the `example("geom_point")` function here to explore a multitude of different aesthetics and layers that can be added to your plot. As you scroll through the different plots, take note of how the code is modified. You can use this with any of the different geometric object layers available in ggplot2 to learn how you can easily modify your plots! 
> 

> *NOTE:* RStudio provide this very [useful cheatsheet](https://www.rstudio.com/wp-content/uploads/2016/11/ggplot2-cheatsheet-2.1.pdf) for plotting using `ggplot2`. Different example plots are provided and the associated code (i.e which `geom` or `theme` to use in the appropriate situation.)
> 

***

**Exercises**

1. The current axis label text defaults to what we gave as input to `geom_point` (i.e the column headers). We can change this by **adding additional layers** called `xlab()` and `ylab()` for the x- and y-axis, respectively. Add these layers to the current plot such that:
	- **x-axis label:** "Gene ratios"
	- **y-axis label:** "Top 30 significant GO terms"
	- **legend title:** "Adjusted p-value"
2. Use the `ggtitle` layer to add a title to your plot. *NOTE: Useful code to center your title over your plot can be done using `theme(plot.title=element_text(hjust=0.5, 
                                face = "bold"))`.*

***

### Consistent formatting using custom functions

When publishing, it is helpful to ensure all plots have similar formatting. To do this we can create a custom function with our preferences for the theme. Remember the structure of a function is:

```r
name_of_function <- function(arguments) {
    statements or code that does something
}
```

Now, let's suppose we always wanted our theme to include the following:

```r
theme_bw() +
    theme(axis.text.x = element_text(size=rel(1.15)),
        axis.title = element_text(size=rel(1.15)),
        legend.title = element_text(size=10, 
                                    face="bold"),
          plot.title=element_text(hjust=0.5, 
                                face = "bold"))
```

If there is nothing that we want to change when we run this, then we do not need to specify any arguments. Creating the function is simple; we can just put the code inside the `{}`:

```r
personal_theme <- function(){
  theme_bw() +
    theme(axis.text.x = element_text(size=rel(1.15)),
        axis.title = element_text(size=rel(1.15)),
        legend.title = element_text(size=10, 
                                    face="bold"),
          plot.title=element_text(hjust=0.5, 
                                face = "bold"))
}
```

Now to run our personal theme with any plot, we can use this function in place of the `theme()` code:

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = go_term, color = p.value), 
             size = 2) +
  personal_theme() +
  xlab("Gene ratios") +
  ylab("Top 30 significant GO terms") +
  ggtitle("Dotplot of top 30 significant GO terms")
```

The plot is looking better, but it is hard to distinguish differences in significance based on the colors used. There are cheatsheets available for specifying the base R colors by [name](http://www.r-graph-gallery.com/42-colors-names/) or [hexidecimal](http://www.r-graph-gallery.com/41-value-of-the-col-function/) code. We could specify other colors available or use pre-created color palettes from an external R package. 

To make additional color palettes available for plotting, we can load the RColorBrewer library, which contains color palettes designed specifically for the different types of data being compared.

```r
# Load the RColorBrewer library
library(RColorBrewer)

# Check the available color palettes
display.brewer.all()
```

![rcolorbrewer_palettes](../img/Rcolorbrewer_palettes.png)

The output is separated into three sections based on the suggested palettes for sequential, qualitative, and diverging data. 

- **Sequential palettes (top):** For sequential data, with lighter colors for low values and darker colors for high values.
- **Qualitative palettes (bottom):** For categorical data, where the color does not denote differences in magnitude or value.
- **Diverging palettes (middle):** For data with emphasis on mid-range values and extremes.

Since our adjusted p-values are sequential, we will choose from these palettes. Let's go with the "Yellow, orange, red" palette. We can choose how many colors from the palette to include, which may take some trial and error. We can test the colors included in a palette by using the `display.brewer.pal()` function, and changing if desired:

```r
# Testing the palette with six colors
display.brewer.pal(6, "YlOrRd")
```

The yellow might be a bit to light, and we might not need so many different colors. Let's test with three different colors:

```r
# Testing the palette with three colors
display.brewer.pal(3, "YlOrRd")
```

That's not too bad, so let's test it in our plot. We can add a color scale layer, and most often one of the following two scales will work:

- **`scale_color_manual()`:** for categorical data or quantiles
- **`scale_color_gradient()` family:** for continuous data. 

By default, `scale_color_gradient()` creates a two color gradient from low to high. Since we plan to use more colors, we will use the more flexible `scale_color_gradientn()` function.

```r
ggplot(bp_plot) +
  geom_point(aes(x = gene_ratio, y = go_term, color = -log10(p.value)), 
             size = 2) +
  personal_theme() +
  xlab("Gene ratios") +
  ylab("Top 30 significant GO terms") +
  ggtitle("Dotplot of top 30 significant GO terms") +
  scale_color_gradientn(name = "Significance \n(-log10(padj))", 
                         colors = mypalette)
```

***
**Exercises**

1. Arrange `bp_oe` by `termPercent`.
2. Create a dotplot with the top 30 GO terms with highest `termPercent`, with `termPercent` as x-axis and `GO_term` as the y-axis.
3. Color the plot using the palette of your choice.

***

So far we have explored many layers that can be added to any plot with the ggplot2 package. However, we haven't explored the different geoms available. The type of data you are plotting will determine the type of geom needed, but a nice summary of the main geoms is available on the [RStudio ggplot2 cheatsheet](https://www.rstudio.com/wp-content/uploads/2016/11/ggplot2-cheatsheet-2.1.pdf).

Let's explore different geoms by creating a couple of different plots. We'll start with a bar plot of the number of genes per category. We can start with the most basic plot by specifying the dataframe, geom, and aesthetics. 

```r
ggplot(bp_plot) +
  geom_col(aes(x = go_term, y = overlap.size)
```

This is a good base to start from. Now let's start to customize. To add color to the bars, we can use the `fill` argument, and if we would like to add an outline color to the bars, we can use the `color` argument.

```r
ggplot(bp_plot) +
  geom_col(aes(x = go_term, y = overlap.size),
           fill = "royalblue",
           color = "black")
```

Then we can provide our theme preferences. Let's add our personal theme and name our axes:

```r
ggplot(bp_plot) +
  geom_col(aes(x = go_term, y = overlap.size),
           fill = "royalblue",
           color = "black") +
  personal_theme() +
  labs(title = "DE genes per GO process", x = NULL, y =  "# DE genes")
```

Note that instead of using the functions `xlab()`, `ylab()`, and `ggtitle()`, we can provide all as arguments to the `labs()` function.

Now we might be fairly happy with our plot, except for all of our categories overlapping on the x-axis. Within the `theme()` layer, we change the orientiation of the x-axis labels with the `angle` argument and align the labels to the x-axis with the `hjust` argument.

```r
ggplot(bp_plot) +
  geom_col(aes(x = go_term, y = overlap.size),
           fill = "royalblue",
           color = "black") +
  personal_theme() +
  labs(title = "DE genes per GO process", x = NULL, y =  "# DE genes") +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
```

This is almost what we were looking for, but the labels are getting cut-off because the plotting area is too small. The `plot.margin` argument of the theme's `element_text()` function can be used to alter the plotting dimensions to make room for our labels.

```r
ggplot(bp_plot) +
  geom_col(aes(x = go_term, y = overlap.size),
           fill = "royalblue",
           color = "black") +
  personal_theme() +
  labs(title = "DE genes per GO process", x = NULL, y =  "# DE genes") +
  theme(axis.text.x = element_text(angle = 45, 
                                   hjust = 1), 
        plot.margin = unit(c(1,1,1,3), "cm"))
```

>**NOTE:** If we wanted to remove the space between the x-axis and the labels, we could add an additional layer for `scale_y_continuous(expand = c(0, 0))`, which would not expand the y-axis past the plotting limits.
        

***
**Exercise**
Create the following boxplot:

***

