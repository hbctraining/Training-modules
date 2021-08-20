# Publication Perfect

| Audience | Computational skills required | Duration |
:----------|:-------------|:----------|
| General - researchers | Intermediate R | 1-session in-person or online workshop (~ 6 hours of trainer-led time)|

## Description

One of the biggest challenges in disseminating your research is visualizing the results in a way that is meaningful, easy to interpret and aesthetically pleasing. Oftentimes, the extensive time dedicated to generating experimental results can rival the creation and optimization of their figures. With a point and click environment, you can spend hours or even days tweaking the settings to get the perfect figure - only to realize that you now have to repeat this process for the remaining data. This process can be especially challenging when needing to perform customizations or when pivoting your figures to adhere to guidelines from conferences, journals or other publishing platforms.

In this tutorial, we introduce an efficient and reproducible workflow in R for creating publication-ready figures. We will introduce ggplot2 syntax to create custom plots, and we will explore how to determine the type of plots most appropriate for your data. We will explore how to ensure consistency between figures using custom theme and color selections, with an emphasis on colorblind-friendly palettes from the RColorBrewer and viridis packages. We will also examine methods for enhancing our plots with functions from the ggpubr and cowplot packages, especially regarding layout and labeling of figures. Finally, we will conclude with an activity to use what we have learned to reproduce a published figure.

This is a hands-on tutorial in which the data and code will be distributed to participants who wish to follow along. All tutorial lessons and materials will be hosted on GitHub pages. Participants will be required to have R and RStudio downloaded and installed on their personal computers, in addition to any required R packages. This tutorial assumes an intermediate level of R knowledge.

## Learning Objectives

* Determine the plot types best for visualizing a given dataset
* Define the syntax for creating a plot using ggplot2
* Generate plots for various data types using ggplot2
* Explain how to create multiple plots using the same themes, styles, and colors
* Discuss how to quickly alter figures to meet a different set of requirements (different journal or conference)

## Schedule

### Part I

| Time | Topic | Instructor |
:-----------------------|:-------------|:----------|
| 13:00 - 13:10	| [Workshop Introduction](https://github.com/hbctraining/Training-modules/raw/master/Intro_current_topics_online_2021.pdf) | Mary |
| 13:10 - 13:30	| [Introduction to dataset and considerations for choosing appropriate plotting methods](https://hbctraining.github.io/publication_perfect/lessons/01_intro_to_dataset.html) | Radhika |
| 13:30 - 14:15 | [Visualization package ggplot2 basic syntax and plot types](https://hbctraining.github.io/publication_perfect/lessons/02_ggplot2_syntax.html) | Radhika |
| 14:15 - 14:20	| Break | |
| 14:20 - 14:45	| [Consistent plots with custom themes](https://hbctraining.github.io/publication_perfect/lessons/03_custom_themes.html) | Mary |
| 14:45 - 15:15	| [Application of plotting basics](https://hbctraining.github.io/publication_perfect/lessons/04_boxplot_application_of_basic_plotting.html) | Radhika |

### Part II

| Time | Topic | Instructor |
:-----------------------|:-------------|:----------|
| 13:00 - 13:10	| Workshop overview
| 13:10 - 13:35	| [Customization of scales and color palettes](https://hbctraining.github.io/publication_perfect/lessons/05_custom_plot_scales_colors.html) 
| 13:35 - 14:20	| Aligning and labeling plots with cowplot
| 14:20 - 14:25	| Break
| 14:25 - 15:10	| Adding statistical comparisons and ordering of plots with ggpubr
| 15:10 - 15:50	| Adapting code to adhere to transition to figure requirements for journal
| 15:50 - 16:00	| Wrap-up and exit survey 

### Dataset

Download the R project and data for this workshop [here](https://www.dropbox.com/s/hu5i8ueziuhmwg6/publication_perfect.zip?dl=1). Decompress and move the folder to the location on your computer where you would like to perform the analysis.

### Installation Requirements

Download the most recent versions of R and RStudio for your laptop:

 - [R](http://lib.stat.cmu.edu/R/CRAN/) (Version 3.4 or higher)
 - [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
 
Install the required R packages by running the following code in RStudio:

```r
# Install CRAN packages
install.packages("tidyverse")
install.packages("cowplot")
install.packages("ggpubr")
install.packages("RColorBrewer")
install.packages("viridis")
install.packages("scales")
install.packages("VennDiagram")
install.packages("pheatmap")
install.packages("png")
install.packages("ggrepel")
install.packages("ggplotify")
```

Load the libraries to make sure the packages installed properly:

```r
# Load R libraries
library(cowplot)
library(ggpubr)
library(RColorBrewer)
library(viridis)
library(scales)
library(tidyverse)
library(VennDiagram)
library(pheatmap)
library(png)
library(ggrepel)
library(ggplotify)

```

*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
