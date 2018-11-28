## Visualization in R

| Audience | Computational skills required | Duration |
:----------|:----------|:----------|
| Biologists | [Beginner R](https://hbctraining.github.io/Training-modules/IntroR_ggplot2/) | 3 hour workshop (~3 hours of trainer-led time)|

### Description
This repository has teaching materials for a **3 hour**, hands-on **Visualization in R** workshop led at a relaxed pace. The workshop will give participants an overview of the basics of the R package, ggplot2, for the generation of publication-worthy figures. Participants will also use several R packages (ggrepel, pheatmap, etc.) for more advanced plotting methods, such as learning how to change from a wide data format to a long data format for plotting purposes, how to label and/or repel individual data points on a scatter plot, and how to create heatmaps and volcano plots. 

### Learning Objectives

* **Creating basic plots**: Exploring and customizing basic plots (scatter plots, histograms, boxplots, etc.) using the ggplot2 package.
* **Exporting graphics**: Saving plots for use outside of the R environment.
* **Wrangling data for visualization**: Changing data formats for visualization purposes
* **Data assessment with volcano plots and heatmaps**: Learning how to create volcano plots and label interesting data points and how to create heatmaps with the pheatmap R package and interpret the output

> These materials are developed for a trainer-led workshop, but also amenable to self-guided learning.


### Contents

| Lessons            | Estimated Duration |
|:------------------------|:----------|
|[Setting up for plotting](https://hbctraining.github.io/Training-modules/Visualization_in_R/lessons/01_setting_up.html) | 15 min |
|[Basic plotting with ggplot2](https://hbctraining.github.io/Training-modules/Visualization_in_R/lessons/02_basics_ggplot2.html) | 75 min |
|[Advanced visualizations](https://hbctraining.github.io/Training-modules/Visualization_in_R/lessons/03_advanced_visualizations.html) | 90 min |

### Dataset

All the files used for the above lessons are linked within, but can also be [accessed here](https://github.com/hbctraining/Intro-to-R-with-DGE/tree/master/data).

### Installation Requirements

Download the most recent versions of R and RStudio for your laptop:

 - [R](http://lib.stat.cmu.edu/R/CRAN/) 
 - [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
 
Install the required R packages by running the following code in RStudio:

```r
install.packages(c("ggplot2", "RColorBrewer", "pheatmap", "ggrepel", "reshape"))
```

Load the libraries to make sure the packages installed properly:

```r
library(ggplot2)
library(RColorBrewer)
library(pheatmap)
library(ggrepel)
library(reshape)
```


*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
