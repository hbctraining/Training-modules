---
title: Creating reports in R
subtitle: knitr and RMarkdown
author: Michael J. Steinbaugh, Meeta Mistry, Radhika Khetani
---

## Learning Objectives

* What is RMarkdown?
* What are the uses of RMarkdown 
* Creating html reports using knitr

# Reproducible research using RMarkdown - report generation
 
For any experimental analysis, it is critical to keep detailed notes for the future reproduction of the experiment and for the interpretation of results. For laboratory work, lab notebooks allow us to organize our methods, results, and conclusions to allow for future retrieval and reproduction. Computational analysis requires the same diligence, but it is often easy to forget to completely document the analysis and/or interpret the results in a transparent fashion. 
 
For analyses within R, RStudio helps facilitate reproducible research with the use of R scripts, which can be used to save all code used to perform a particular analysis. However, we often don't save the version of the tools we use in a script, nor do we include or interpret the results of the analyses within the script.

Wouldn't it be nice to be able to save/share the code with collaborators along with tables, figures, and text describing the interpretation in a single, cleaned up report file? 

The [knitr](https://yihui.name/knitr/) package, developed by [Yihui Xie](https://yihui.name), is designed to generate reports within RStudio. It enables dynamic generation of multiple file formats from an [RMarkdown](http://rmarkdown.rstudio.com/) file, including HTML and PDF documents. Knit report generation is now integrated into RStudio, and can be accessed using the GUI or console.

In this workshop we will become familiar with both `knitr` and the RMarkdown language. We will then use them to generate a short HTML report that can be viewed in a web browser. 

Before we start, let's take a look at a "knitted" HTML report and the RMarkdown file used to generate it. 
* [Final report of differential expression analysis](https://www.dropbox.com/s/m5e1z3anecwmami/workshop-example.html?dl=0) 
* [RMarkdown file that was used to create the above report](https://www.dropbox.com/s/oiuekbu91xbjlqp/workshop-example.Rmd?dl=0)

## RMarkdown basics

The [Markdown language](https://en.wikipedia.org/wiki/Markdown) for formatting plain text format has been adopted by many different coding groups, and some have added their own "flavours". RStudio implements something called **"R-flavoured markdown" or "RMarkdown"** which has really nice features for text and code formatting as described below.

As RMarkdown grows as an acceptable [reproducible manuscript](https://elifesciences.org/labs/cad57bcf/composing-reproducible-manuscripts-using-r-markdown) format, using `knitr` to generate a report summary is becoming common practice. 

### Text

The syntax to format the text portion of the report is relatively easy. You can easily get text that is **bolded**, *italicized*, ***bolded & italicized***. You can create "headers" and "sub-headers" by placing an "#" or "##" and so on in front of a line of text, generate numbered and bulleted lists, add hyperlinks to words or phrases, and so on.

Let's take a look at the syntax of how to do this in RMarkdown before we move on to formatting and adding code chunks:

<img src="img/rmd-syntax.png" width="650">

You can also get more information about text formatting [here](http://rmarkdown.rstudio.com/lesson-1.html) and [here](http://rmarkdown.rstudio.com/authoring_basics.html).

### Code chunks

The basic idea is that you can write your analysis workflow in plain text and intersperse chunks of R code delimited with a special marker (\`\`\`). Backticks (\`) commonly indicate code and are also used for formatting on [GitHub](https://github.com). 

Each individual code chunk should be given a **unique** name. [knitr](https://yihui.name/knitr/) isn't very picky how you name the code chunks, but we recommend using `snake_case` for the names whenever possible. 

<img src="img/r-chunk.png">

Additionally, you can write inline [R](https://www.r-project.org/) code enclosed by single backticks (\`) containing a lowercase `r` (like \`\`\` code chunks). This allows for variable returns outside of code chunks, and is extremely useful for making report text more dynamic. For example, you can print the current date inline within the report with this syntax: `` `r Sys.Date()` `` (no spaces).

### Options for code chunks

The knitr package provides a lot of customization options for code chunks, which are written in the form of `tag=value`.

<img src="img/r-chunkoptions.png">

There is a [comprehensive list](https://yihui.name/knitr/options/#code-chunk) of all the options available, however when starting out this can be overwhelming. Here, we provide a short list of some options commonly use in chunks:

* `echo = TRUE`: whether to include R source code in the output file
* `eval = TRUE`: whether to evaluate/execute the code 
* `include = TRUE`: whether to include the chunk output in the final output document; if include=FALSE, nothing will be written into the output document, but the code is still evaluated and plot files are generated if there are any plots in the chunk, so you can manually insert figures
* `warning = TRUE`: whether to preserve warnings in the output like we run R code in a terminal (if FALSE, all warnings will be printed in the console instead of the output document)
* `message = TRUE`: whether to preserve messages emitted by message() (similar to warning)
* `results = "asis"`: output as-is, i.e., write raw results from R into the output document

### The setup chunk

The `setup` chunk is a special knitr chunk that should be placed at the start of the document. We recommend storing all `library()` loads required for the script and other `load()` requests for external files here. In our RMarkdown templates, such as the bcbioRnaseq [differential expression template](https://github.com/hbc/bcbioRnaseq/blob/master/inst/rmarkdown/templates/differential_expression/skeleton/skeleton.Rmd), we store all the user-defined parameters in the `setup` chunk that are required for successful knitting.

<img src="img/r-setup.png">

### Global options

knitr allows for global options to be set on all chunks in an [RMarkdown](http://rmarkdown.rstudio.com/) file. These are options that should be placed inside your `setup` chunk at the top of your RMarkdown document.

```r
opts_chunk$set(
    autodep = TRUE,
    cache = TRUE,
    cache.lazy = TRUE,
    dev = c("png", "pdf", "svg"),
    error = TRUE,
    fig.height = 6,
    fig.retina = 2,
    fig.width = 6,
    highlight = TRUE,
    message = FALSE,
    prompt = TRUE,
    tidy = TRUE,
    warning = FALSE)
```

An additional cool trick is that you can save `opts_chunk$set` settings in `~/.Rprofile` and these knitr options will apply to all of your RMarkdown documents.

### Figures

A neat feature of knitr is how much simpler it makes generating figures. You can simply return a plot in a chunk, and knitr will automatically write the files to disk, in an organized subfolder. By specifying options in the `setup` chunk, you can have R automatically save your plots in multiple file formats at once, including PNG, PDF, and SVG. A single chunk can support multiple plots, and they will be arranged in squares below the chunk in RStudio.

There are also a few options commonly used for plots to easily resize the figures in the final report. You can specify the height and width of the figure when setting up the code chunk.

<img src="img/r-figure.png">

### Tables

knitr includes a simple but powerful function for generating stylish tables in a knit report named `kable()`. Here's an example using R's built-in `mtcars` dataset:

```r
help("kable", "knitr")
mtcars %>%
    head %>%
    kable
```

|                   |   mpg|  cyl|  disp|   hp|  drat|     wt|   qsec|   vs|   am|  gear|  carb|
|-------------------|-----:|----:|-----:|----:|-----:|------:|------:|----:|----:|-----:|-----:|
| Mazda RX4         |  21.0|    6|   160|  110|  3.90|  2.620|  16.46|    0|    1|     4|     4|
| Mazda RX4 Wag     |  21.0|    6|   160|  110|  3.90|  2.875|  17.02|    0|    1|     4|     4|
| Datsun 710        |  22.8|    4|   108|   93|  3.85|  2.320|  18.61|    1|    1|     4|     1|
| Hornet 4 Drive    |  21.4|    6|   258|  110|  3.08|  3.215|  19.44|    1|    0|     3|     1|
| Hornet Sportabout |  18.7|    8|   360|  175|  3.15|  3.440|  17.02|    0|    0|     3|     2|
| Valiant           |  18.1|    6|   225|  105|  2.76|  3.460|  20.22|    1|    0|     3|     1|

There are some other functions that allow for more powerful customization of tables, including `pander::pander()` and `xtable::xtable()`, but the simplicity and cross-platform reliability of `knitr::kable()` makes it an easy pick.


### Generating the report

As the final chunk in the analysis, it is recommended to run the `sessionInfo()` function. This function will output the R version and the versions of all libraries loaded in the R environment. The versions of the tools used is important information for reproduction of your analysis in the future.

Once we've finished creating an [RMarkdown](http://rmarkdown.rstudio.com/) file containing code chunks, we finally need to knit the report. You can knit it by using the `knit()` function, or by just clicking on knit in the panel above the script.

When executing `knit()` on a document, by default this will generate an HTML report. If you would prefer a different document format, this can be specified in the YAML header with the `output:` parameter. You can also click on the button in the panel above the script and click on "Knit" to get the various options as shown below:

<img src="img/r-knit-button.png">

> **Note**: *PDF rendering is sometimes problematic, especially when running [R](https://www.r-project.org/) remotely, like on the cluster (Odyssey or O2). If you run into problems, it's likely an issue related to [pandoc](http://pandoc.org).*

## Generating an RMarkdown knit report!

* **Create a new project** in a new directory called `rmd_workshop`
* **Download [this RMarkdown file](https://www.dropbox.com/s/irwv6v9dd5fywrz/workshop-example.Rmd?dl=0)** to it
* **Download and uncompress [this data folder](data/data.zip?raw=true)** within your project directory
* Install the `ggplot2` package if you don't have it. `install.pacakges("ggplot2")`
**knit the markdown** 

* Only the first 2 code chunks have names; go through and **add names to the remaining code chunks**.
* Choose a code chunk that you do not want displayed in the report, and modify it's options within the `{}`
* Without removing the last code chunk (for box plot) from the Rmd file, add options such that it does not appear in your html report
* **knit the markdown**

* **Add a new code chunk** at the end with `sessionInfo()`
* **Modify the `Author`** parameter at the top of the script to your name
* **Modify the script header**
* **knit the markdown**

***

> **Note1: output formats**
> 
> RStudio supports a [number of formats](http://rmarkdown.rstudio.com/formats.html), each with their own customization options. Consult their website for more details.
> 
> The `knit()` command works great if you only need to generate a single document format. [RMarkdown](http://rmarkdown.rstudio.com/) also supports a more advanced function named `rmarkdown::render()`, allows for output of multiple document formats. To accomplish this, we recommend saving a special file named `_output.yaml` in your project root. Here's an [example](https://github.com/hbc/bcbioRnaseq/blob/master/docs/downloads/_output.yaml) from our [bcbioRnaseq](https://github.com/hbc/bcbioRnaseq) package:
>
> ```r
> rmarkdown::html_document:
>         code_folding: hide
>         df_print: kable
>         highlight: pygments
>         number_sections: false
>         toc: true
> rmarkdown::pdf_document:
>         number_sections: false
>         toc: true
>         toc_depth: 1
> ```

***

> **Note2: working directory behavior**
> 
> knitr redefines the working directory of an RMarkdown file in a manner that can be confusing. If you're working in RStudio with an RMarkdown file that is not at the same location as the current R working directory (`getwd()`), you can run into problems with broken file paths. Make sure that any paths to files specified in the RMarkdown document is relative to its location, and not your current working directory.
> 
> A simple way to make sure that the paths are not an issue is by creating an R project for the analysis, and saving all RMarkdown files at the top level and referring to the data and output files within the project directory. This will prevent unexpected problems related to this behavior.

***

**Additional resources**
================

-   [knitr in a knutshell](http://kbroman.org/knitr_knutshell/)
-   [knitr book](https://www.amazon.com/gp/product/1498716962)
-   [knitr examples](https://yihui.name/knitr/demos)
-   [knitr vignettes](https://github.com/yihui/knitr/tree/master/vignettes)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
