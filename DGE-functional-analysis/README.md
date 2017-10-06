---
Audience: Biologists
Computational Skills: Beginner/Intermediate R
Prerequisites: Introductin to R
Duration: 3 hour workshop (~3 hours of trainer-led time)
---

## DGE Functional Analysis

### Description

This repository has teaching materials for a **3 hour**, hands-on **Functional Analysis** workshop led at a relaxed pace. Functional analysis methods help us to gain insight about the biology underlying a list of genes. These genes could be output from a differential expression analysis, a GWAS analysis, proteomics analysis, etc. Regardless of the source of the gene list, functional analysis can explore whether particular pathways or processes are enriched among a list of genes. 

In this workshop, we will use over-representation analysis (ORA) and functional class scoring (FCS) methods to identify potential pathways that are associated with our list of genes. We will be using the clusterProfiler R package to determine whether there is enrichment of any gene ontology (GO) processes in a list of genes and generate plots from the results. We will also give a brief introduction to using clusterProfiler to perform FCS with gene set enrichment analysis (GSEA) followed by the Pathview R package for visualization.

### Learning Objectives
*  **Using GO terms to explore enriched processes:** Determining how functions are attributed to genes using Gene Ontology terms
*  **Interpreting the results of enrichment tests:** Understanding the theory of how functional enrichment tools yield statistically enriched functions or interactions
*  **Descibing the different classes of functional analysis tools:** Discussing functional analysis using over-representation analysis, functional class scoring, and pathway topology methods
*  **Utilizing complementary approaches to generate hypotheses regarding eniched processes/pathwayys: Explore a variety of functional analysis tools

> These materials are developed for a trainer-led workshop, but also amenable to self-guided learning.


### Contents

| Lessons            | Estimated Duration |
|:------------------------|:----------|
|[Setting up for plotting](lessons/01_setting_up.md) | 15 min |
|[Basic plotting with ggplot2](lessons/02_basics_ggplot2.md) | 75 min |
|[Advanced visualizations](lessons/03_advanced_visualization.md) | 90 min |

### Installation Requirements

Download the most recent versions of R and RStudio for your laptop:

 - [R](http://lib.stat.cmu.edu/R/CRAN/) 
 - [RStudio](https://www.rstudio.com/products/rstudio/download/#download)
 
Install the required R packages by running the following code in RStudio:

```r
install.packages(c("clusterProfiler"))
```

Load the libraries to make sure the packages installed properly:

```r
library(ggplot2)
```


*These materials have been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
