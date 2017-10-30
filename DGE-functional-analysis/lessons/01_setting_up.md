---
title: Setting up for functional analysis
author: Mary Piper, Meeta Mistry, Radhika Khetani
date: "Friday, October 6th, 2017"
---

Approximate time: 15 minutes

## Set-up

Prior to performing the functional analysis of our gene lists, we need to first open RStudio, create a project called `Functional_analysis`, and organize our project directory.

### Creating a new project directory in RStudio

Let's create a new project directory for our "Functional Analysis" lesson: 

1. Open RStudio
2. Go to the `File` menu and select `New Project`.
3. In the `New Project` window, choose `New Directory`. Then, choose `Empty Project`. Name your new directory `Functional_analysis` and then "Create the project as subdirectory of:" the Desktop (or location of your choice).
4. Click on `Create Project`.
5. After your project is completed, if the project does not automatically open in RStudio, then go to the `File` menu, select `Open Project`, and choose `Functional_analysis.Rproj`.
6. When RStudio opens, you will see three panels in the window.
7. Go to the `File` menu and select `New File`, and select `R Script`. The RStudio interface should now look like the screenshot below (except in the file directory, `workshop_name.Rproj` will be `Functional_analysis.Rproj`). You may or may not have a `.gitignore` file, which is fine.

<img src="../img/generic_rstudio_interface.png" width="600">

### Structuring your working directory
To organize your working directory for a particular analysis, you should separate the original data (raw data) from intermediate datasets. For instance, you may want to create a `data/` directory within your working directory that stores the raw data, and have a `results/` directory for intermediate datasets and a `figures/` directory for the plots you will generate.

Let's create these three directories within your working directory by clicking on `New Folder` within the `Files` tab. 

<img src="../img/generic_wd_setup.png" width="600">


When finished, your working directory should look like:

<img src="../img/generic_complete_wd_setup.png" width="300">

### Adding file to your working directory

We have the differential expression results output from our DE analysis using DESeq2 that we will be working with in the lessons.

Download the files to the `data` folder by **right-clicking** the links below:
 
 - **Differential expression results:** right-click [here](https://github.com/hbctraining/Training-modules/raw/master/Visualization_in_R/data/Mov10oe_DE_results.csv)
 
Choose to `Save Link As` or `Download Linked File As` and navigate to your `Functional_analysis/data` folder. You should now see the files appear in the `data` folder in the RStudio file directory.

### Reading in the data files

Let's read in the differential expression results file we have downloaded:

```r
## Read in differential expression results

res_tableOE <- read.csv("data/Mov10oe_DE_results.csv", row.names = 1)
```

### R package installation

To perform plotting, we need to install the R packages we will using from the Bioconductor repository (if not already installed): 

```r
source("http://bioconductor.org/biocLite.R") 

biocLite(c("clusterProfiler", "DOSE", "org.Hs.eg.db", "pathview", "gProfileR", "treemap"))
```

_**Note that these package names are case sensitive!**_


To check that a package installed successfully, you should be able to load the library (without any error messages) using `library()`:

```r
## Load libraries
library(clusterProfiler)
library(DOSE)
library(org.Hs.eg.db)
library(pathview)
library(gProfileR)
library(treemap)
```


