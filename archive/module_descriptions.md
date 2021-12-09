**R modules**

_**Introduction to R:**_  In this brief introduction to the R programming environment, we will cover the basics of R and RStudio. We will explore basic R syntax and data structures, functions and packages, and the basics of data wrangling with R.

*All of the following workshops have a prerequisite: working knowledge of beginner R or having taken the 'Introduction to R' workshop.*

_**Visualizations in R with ggplot2:**_ For this workshop, we will be using the ggplot2 R package for the generation of publication-worthy figures. We will also explore a variety of advanced plotting methods using several R packages (ggplot2, ggrepel, pheatmap, etc.) to learn how to change from a wide data format to a long data format for plotting purposes, how to label and/or repel individual data points on a scatter plot, and how to create heatmaps and volcano plots.

_**Functional Analysis of Gene Lists:**_ Functional analysis methods help us to gain insight into the biology underlying a list of genes. These genes could be output from a differential expression analysis, a GWAS analysis, proteomics analysis, etc. Regardless of the source of the gene list, functional analysis can explore whether particular pathways or processes are enriched among a list of genes.

In this workshop, we will use over-representation analysis (ORA) and functional class scoring (FCS) methods to identify potential pathways that are associated with our list of genes. We will be using the clusterProfiler R package to determine whether there is enrichment of any gene ontology (GO) processes in a list of genes and generate plots from the results. We will also give a brief introduction to using clusterProfiler to perform FCS with gene set enrichment analysis (GSEA) followed by the Pathview R package for visualization.

_**Reproducible research using R (RMarkdown: report generation):**_ Reproducible research is just as important for computational analysis as it is for research at the bench. Integrating your R data analyses into a report format allows for easy retrieval of the packages/versions and code used to generate your results and figures and helps for efficient communication of your results with your collaborators. The 'knitr' R package can be used for the easy generation of professional reports for any R analysis, while allowing for customization and easy revision. In this 3 hour workshop, we will cover the simple RMarkdown syntax and explore options for customizing your reports. 


**Unix modules**

_**Introduction to the command-line interface (bash):**_  Many data analysis tools and computational resources require users to have a basic working knowledge of the command line interface (also referred to as UNIX, Linux, bash, shell). In this workshop participants will learn basic commands for navigating the file system, exploring file contents, and performing basic operations, such as moving, copying, and renaming files/folders.  

*All of the following workshops have a prerequisite: working knowledge of beginner bash or having taken the 'Introduction to the command-line interface' workshop.*

_**Intermediate bash:**_ This workshop will build on the basic skills taught in the Introduction to the command-line interface workshop to allow for greater automation. This workshop will include lessons on using the command-line text editor, Vim, to create and edit files, utilizing for-loops for automation, using variables to store information, and writing scripts to perform a series of commands in a sequential order. 

_**Version control using Git and Github:**_ Git and Github provide an easy way to track changes in documents over time, while facilitating collaboration with other team members. Git allows for saving changes and creating new versions of documents, while Github allows for public access to the different versions, as well as, collaboration among individuals on a team. Together, Git and Github, allow for project development between multiple individuals while being able to retrieve all previous versions of the tracked documents.

While initially designed for saving and developing code collaboratively, there are many advantages for using version control with Git and/or Github for other text files and substantial works such as articles, books, and dissertations. Also, since Github hosts the documents online, you never need to worry about losing your priceless work due to computer issues. Join us in the workshop to learn the simple commands (bash) needed to save versions of files on your local computer, as well as, how to make them accessible online on Github.

_**Accessing public genomic data:**_  reference & experimental sequencing: Many types of sequencing analyses require access to public data stored in various databases and repositories. This workshop will discuss types of genomic reference data available through public databases such as Ensembl, NCBI, and UCSC, and step through how to find and download this data. The workshop will also explore how to find and download publicly available experimental data, such as data from published papers (FASTQ files and count matrices), using GEO and the SRA repositories. While most of the workshop will access data using a web browser, downloading data from the SRA requires beginner knowledge of the command-line interface. 

_**Exploring genomic variants using the GEMINI framework:**_ Exome-seq and WGS experiments result in large VCF (Variant Call Format) files with information about variants (SNPs, indels, etc.) present in the dataset. GEMINI (GEnome MINIng) is a framework that helps turn VCF files with millions of rows and thousands of columns into simple and easily accessible databases. Within the database, GEMINI annotates variants with publicly available information, including ENCODE, OMIM, dbSNP, plus internal annotations like regions of interest, candidate genes, etc. The resulting framework/database supports an interactive exploration of variants in the dataset in the context of known information as well as sample information to rapidly get to the biology at play.

 

 
