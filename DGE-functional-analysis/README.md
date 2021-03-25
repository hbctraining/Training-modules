## Functional Analysis of Gene Lists

| Audience | Computational skills required | Duration |
:----------|:----------|:----------|
| Biologists | [Beginner/Intermediate R](https://hbctraining.github.io/Intro-to-R/) | 3-hour workshop (~3 hours of trainer-led time) |


### Description

This repository has teaching materials for a **3 hour**, hands-on **Functional Analysis** workshop led at a relaxed pace. Functional analysis methods help us to gain insight about the biology underlying a list of genes. These genes could be output from a differential expression analysis, a GWAS analysis, proteomics analysis, etc. Regardless of the source of the gene list, functional analysis can explore whether particular pathways or processes are enriched among a list of genes. 

In this workshop, we will use over-representation analysis (ORA) and functional class scoring (FCS) methods to identify potential pathways that are associated with our list of genes. We will be using the clusterProfiler R package to determine whether there is enrichment of any gene ontology (GO) processes in a list of genes and generate plots from the results. We will also give a brief introduction to using clusterProfiler to perform FCS with gene set enrichment analysis (GSEA) followed by the Pathview R package for visualization.

### Learning Objectives
*  **Using GO terms to explore enriched processes:** Determining how functions are attributed to genes using Gene Ontology terms
*  **Interpreting the results of enrichment tests:** Understanding the theory of how functional enrichment tools yield statistically enriched functions or interactions
*  **Descibing the different classes of functional analysis tools:** Discussing functional analysis using over-representation analysis, functional class scoring, and pathway topology methods
*  **Utilizing functional analysis tools to generate hypotheses regarding enriched processes/pathways:** Explore a variety of functional analysis tools

> These materials are developed for a trainer-led workshop, but also amenable to self-guided learning.


### Contents

| Lessons            | Estimated Duration |
|:------------------------|:----------|
|[Setting up](https://hbctraining.github.io/Training-modules/DGE-functional-analysis/lessons/01_setting_up.html) | 15 min |
|[Gene annotations](https://hbctraining.github.io/Training-modules/DGE-functional-analysis/lessons/Genomic_annotations.html) | 30 min |
|[Functional analysis methods](https://hbctraining.github.io/DGE_workshop_salmon/lessons/functional_analysis_2019.html) | 120 min |

### Dataset

The project directory containing all data can be [downloaded here](https://github.com/hbctraining/Training-modules/blob/master/data/Functional_analysis.zip?raw=true).

### Installation Requirements

Download the most recent versions of R and RStudio for your laptop:

 - [R](http://lib.stat.cmu.edu/R/CRAN/) 
 - [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
 
Install the required R packages by running the following code in RStudio:

```r
# Install CRAN packages
install.packages(c("BiocManager", "devtools", "tidyverse"))

# Install Bioconductor packages
BiocManager::install(c("clusterProfiler", "DOSE", "org.Hs.eg.db", "pathview", "AnnotationDbi", "EnsDb.Hsapiens.v75"))
```

Load the libraries to make sure the packages installed properly:

```r
library(clusterProfiler)
library(DOSE)
library(org.Hs.eg.db) 
library(pathview)
library(tidyverse)
library(AnnotationDbi)
library(EnsDb.Hsapiens.v75)
```

> **NOTE:** The library used for the annotations associated with genes (here we are using `org.Hs.eg.db`) will change based on organism (e.g. if studying mouse, would need to install and load `org.Mm.eg.db`). The list of different organism packages are given [here](https://github.com/hbctraining/Training-modules/raw/master/DGE-functional-analysis/img/available_annotations.png).


*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
