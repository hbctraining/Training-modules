---
layout: topic
title: Setting up for data visualization in R
author: Mary Piper, Meeta Mistry, Radhika Khetani
date: "Wednesday, October 4th, 2017"
---

Approximate time: 15 minutes

## Set-up

To explore the plotting methods in these lessons, we need to first open RStudio, create a project called `Visualizations-in-R`, and organize our project directory.

### Creating a new project directory in RStudio

Let's create a new project directory for our "Visualizations in R" lesson: 

1. Open RStudio
2. Go to the `File` menu and select `New Project`.
3. In the `New Project` window, choose `New Directory`. Then, choose `Empty Project`. Name your new directory `Visualizations-in-R` and then "Create the project as subdirectory of:" the Desktop (or location of your choice).
4. Click on `Create Project`.
5. After your project is completed, if the project does not automatically open in RStudio, then go to the `File` menu, select `Open Project`, and choose `Visualizations-in-R.Rproj`.
6. When RStudio opens, you will see three panels in the window.
7. Go to the `File` menu and select `New File`, and select `R Script`. The RStudio interface should now look like the screenshot below (except in the file directory, `Intro-to-R.Rproj` will be `Visualizations-in-R.Rproj`).

![RStudio interface](../img/Rstudio_interface.png)

### Structuring your working directory
To organize your working directory for a particular analysis, you should separate the original data (raw data) from intermediate datasets. For instance, you may want to create a `data/` directory within your working directory that stores the raw data, and have a `results/` directory for intermediate datasets and a `figures/` directory for the plots you will generate.

Let's create these three directories within your working directory by clicking on `New Folder` within the `Files` tab. 

![Structuring your working directory](../img/wd_setup.png)


When finished, your working directory should look like:

![Your organized working directory](../img/complete_wd_setup.png)

### Adding files to your working directory

We have two files that we will be working with in the lessons: 

1. A normalized counts file (gene expression counts normalized for library size)
2. A metadata file corresponding to the samples in our normalized counts dataset

Download the files to the `data` folder by **right-clicking** the links below:
 
 - **Normalized counts file:** right-click [here](../data/normalized_counts.txt)
 - **Metadata file:** right-click [here](../data/new_metadata.csv)
 
Choose to `Save link as` and navigate to your `Visualizations-in-R/data` folder. You should now see the files appear in the `data` folder in the RStudio file directory.

### R package installation

To perform plotting, we need to install the R packages we will using from the CRAN repository (if not already installed): 

```r
install.packages(c("ggplot2", "RColorBrewer", "pheatmap", "ggrepel", "reshape"))
```

_**Note that these package names are case sensitive!**_


To check that a package installed successfully, you should be able to load the library (without any error messages) using `library()`:

 ```r
 library(ggplot2)
 ```

