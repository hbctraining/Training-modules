---
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
7. Go to the `File` menu and select `New File`, and select `R Script`. The RStudio interface should now look like the screenshot below (except in the file directory, `workshop_name.Rproj` will be `Visualizations-in-R.Rproj`). You may or may not have a `.gitignore` file, which is fine.

<img src="../img/generic_rstudio_interface.png" width="600">

### Structuring your working directory
To organize your working directory for a particular analysis, you should separate the original data (raw data) from intermediate datasets. For instance, you may want to create a `data/` directory within your working directory that stores the raw data, and have a `results/` directory for intermediate datasets and a `figures/` directory for the plots you will generate.

Let's create these three directories within your working directory by clicking on `New Folder` within the `Files` tab. 

<img src="../img/generic_wd_setup.png" width="600">


When finished, your working directory should look like:

<img src="../img/generic_complete_wd_setup.png" width="300">

### Adding files to your working directory

We have four files that we will be working with in the lessons: 

1. A practice metadata file to explore basic plotting with ggplot2
2. A normalized counts file (gene expression counts normalized for library size)
3. A metadata file corresponding to the samples in our normalized counts dataset
4. The differential expression results output from our DE analysis using DESeq2

Download the files to the `data` folder by **right-clicking** the links below:
 
  - **Practice metadata file:** right-click [here](https://github.com/hbctraining/Training-modules/raw/master/Visualization_in_R/data/new_metadata.csv)
  - **Experimental metadata file:** right-click [here](https://github.com/hbctraining/Training-modules/raw/master/Visualization_in_R/data/Mov10_meta.txt)
  - **Normalized counts file:** right-click [here](https://github.com/hbctraining/Training-modules/raw/master/Visualization_in_R/data/normalized_counts.txt)
 - **Differential expression results:** right-click [here](https://github.com/hbctraining/Training-modules/raw/master/Visualization_in_R/data/Mov10oe_DE_results.csv)
 
Choose to `Save Link As` or `Download Linked File As` and navigate to your `Visualizations-in-R/data` folder. You should now see the files appear in the `data` folder in the RStudio file directory.

### Reading in the data files

Let's read in all of the files we have downloaded:

**For basic plotting with *ggplot2*:**
```r
new_metadata <- read.csv(file="data/new_metadata.csv", row.names = 1)
```

**For advanced visualizations:**

```r
mov10_meta <- read.table(file = "data/Mov10_meta.txt")

normalized_counts <- read.table(file = "data/normalized_counts.txt")

res_tableOE <- read.csv(file = "data/Mov10oe_DE_results.csv", row.names = 1)
```

### R package installation

To perform plotting, we need to install the R packages we will using from the CRAN repository (if not already installed): 

```r
install.packages(c("ggplot2", "RColorBrewer", "pheatmap", "ggrepel", "reshape"))

source("https://bioconductor.org/biocLite.R")
biocLite("DESeq2")
```

_**Note that these package names are case sensitive!**_


To check that the packages installed successfully, you should be able to load the library (without any error messages) using `library()`:

```r
library(ggplot2)
library(RColorBrewer)
library(pheatmap)
library(ggrepel)
library(reshape)
library(DESeq2)
```

