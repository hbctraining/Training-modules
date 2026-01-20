## Foundations in Quarto

| Audience | Computational Skills | Prerequisites | Duration |
:----------|:----------|:----------|:----------|
| Anyone | Beginner/Intermediate R | Working knowledge of R/RStudio | 3 hour workshop|

### Description

This repository has teaching materials for a **3 hour**, hands-on **Foundations in Quarto** workshop led at a relaxed pace. 

Reproducible research is as important for computational analysis as it is at the bench. Integrating your R data analyses into a report format allows for easy retrieval of the packages/versions and code used to generate your results and figures. It allows for efficient communication of your results with your collaborators. Quarto allows for the easy generation of professional reports for any R analysis, while allowing for customization and easy revision. In this 3-hour workshop, we will cover the Quarto syntax and explore options for customizing your reports.

### Learning Objectives

-  **Implement Quarto syntax and available features:** Exploring the syntax of the Quarto language and different available features.
-  **Utilize Quarto for report generation:** Practice rendering reports and using different code chunk options for customizing reports.

> These materials are developed for a trainer-led workshop, but also amenable to self-guided learning.


### Contents

| Lessons            |  Estimated Duration  | 
|:------------------------:|:------------------------------------------------:|
| [Introduction to Reproducibility](Reproducibility.pdf) | 10 min |
| [Quarto Basics](https://hbctraining.github.io/Tools-for-reproducible-research/lessons/01_Quarto_basics.html) | 45 min |
| [Quarto Intermediate](https://hbctraining.github.io/Tools-for-reproducible-research/lessons/02_Quarto_intermediate.html) | 45 min | 
| [Practice with Quarto](https://hbctraining.github.io/Tools-for-reproducible-research/activities/Quarto_exercise4.html) | 30 min | 


### Setup and Installation Requirements

Download the most recent versions of R and RStudio for your laptop:

 - [R](http://lib.stat.cmu.edu/R/CRAN/) 
 - [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
 
Install the required R package by running the following code in RStudio:

```
install.packages("tidyverse")
install.packages("BiocManager")
BiocManager::install("pheatmap")
```

Load the libraries to make sure the packages installed properly:

```
library(tidyverse)
library(pheatmap)
```

***

*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
