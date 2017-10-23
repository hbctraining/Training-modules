---
title: "Tidyverse data wrangling"
author: "Michael Steinbaugh, Mary Piper"
date: "Friday, October 20th, 2017"
---

Approximate time: 75 minutes

# Data Wrangling with Tidyverse

The [Tidyverse suite of integrated packages](https://www.tidyverse.org/packages/) are designed to work together to make common data science operations more user friendly. The packages have functions for data wrangling, tidying, reading/writing, parsing, and visualizing, among others. There is a freely available book, [R for Data Science](http://r4ds.had.co.nz/index.html), with detailed descriptions and practical examples of the tools available and how they work together. We will explore the basic syntax for working with these packages, as well as, specific functions for data wrangling with the 'dplyr' package, data tidying with the 'tidyr' package, and data visualization with the 'ggplot2' package.

![](../img/tidyverse_website.png)

All of these packages use the same style of code, which is `snake_case` formatting for all function names and arguments. When using these functions, we recommend that you follow the [tidy style guide](http://style.tidyverse.org/).
## Tidyverse basics

As it is difficult to change how fundamental base R structures/functions work, the Tidyverse suite of packages create and use data structures, functions and operators to make working with data more intuitive. The two most basic changes are in the use of **pipes** and **tibbles**.

### Pipes

Stringing together commands in R can be quite daunting. Also, trying to understand code that has many nested functions can be confusing. 

To make R code more human readable, the Tidyverse tools use the pipe, `%>%`, which was acquired from the 'magrittr' package and comes installed automatically with Tidyverse. **The pipe allows the output of a previous command to be used as input to another command instead of using nested functions.**

>**NOTE:** Shortcut to write the pipe is <kbd>shift</kbd> + <kbd>command</kbd> + <kbd>M</kbd>

An example of using the pipe to run multiple commands:

```r

## A single command
sqrt(83)

## Base R method of running more than one command
round(sqrt(83), digit = 2)

## Running more than one command with piping
sqrt(83) %>% round(digit = 2)
```

The pipe represents a much easier way of writing and deciphering R code, and we will be taking advantage of it for all future activities.

***
**Exercise**

To perfrom the following exercise, first extract the `replicate` column from the `metadata` data frame (use the `$` notation) and save the values to a vector named `rep_number`. Then, use the pipe (`%>%`) to perform two steps in a single line:
	
1. Turn `rep_number` into a factor.
2. Use the `head()` function to return the first six values of the `rep_number` factor.

***

### Tibbles

A core component of the [tidyverse](http://tidyverse.org/) is the [tibble](http://tibble.tidyverse.org/). Tibbles are a modern rework of the standard data.frame, with some internal improvements to make code more reliable.  They are data frames, but do not follow all of the same rules. For example, tibbles can have column names that are not normally allowed, such as numbers/symbols. 

*Important*: [tidyverse](http://tidyverse.org/) is very opininated about row names. These packages insist that all column data (e.g. `data.frame`) be treated equally, and that special designation of a column as `rownames` should be deprecated. [Tibble](http://tibble.tidyverse.org/) provides simple utility functions to handle rownames: `rownames_to_column()` and `column_to_rownames()`. More help for dealing with row names in tibbles can be found:

```r
help("rownames", "tibble")
```

Tibbles can be created directly using the `tibble()` function or data frames can be converted into tibbles using `as_tibble(name_of_df)`. 

>**NOTE:** The function `as_tibble()` will ignore row names, so if a column representing the row names is needed, then the function `rownames_to_column(name_of_df)` should be run prior to turning the data.frame into a tibble. Also note, `as_tibble()` will not coerce character vectors to factors by default.

***
**Exercises**

1. Create a tibble called `df_tibble` using the `tibble()` function to combine the vectors `species` and `glengths` into a tibble.

2. Change the `metadata` data frame to a tibble called `meta_tibble` (***Hint:** You will need to use the `rownames_to_column()` function*).

***

### Differences between tibbles and data.frames

The main differences between tibbles and data.frames relate to *printing* and *subsetting*. 

#### Printing
A nice feature of a tibble is that when printing a variable to screen, it will show only the first 10 rows and the columns that fit to the screen by default. This is nice since you don't have to specify head to take a quick look at your dataset. If it is desirable to view more of the dataset, the `print()` function can change the number of rows or columns displayed.

```r
# Default printing of data.frame
normalized_counts

# Default printing of tibble
normalized_counts %>% 
  rownames_to_column() %>% 
  as_tibble()

# Printing of tibble with print() to change defaults
normalized_counts %>% 
  rownames_to_column() %>% 
  as_tibble() %>% 
  print(n = 20, width = Inf)
```

#### Subsetting

When subsetting base R data.frames the default behavior is to simplify the output to the simplest data structure. Therefore, if subsetting a single column from a data.frame, R will output a vector (unless `drop=FALSE` is specified). In contrast, subsetting a single column of a tibble will by default return another tibble, not a vector.

Due to this behavior, some older functions do not work with tibbles, so if you need to convert a tibble to a data.frame, the function `as.data.frame(name_of_tibble)` will easily convert it.

Also note that if you use piping to subset a data frame, then the notation is slightly different, requiring a placeholder `.` prior to the `[ ]` or `$`. 

```r
## Normal subsetting
mov10_meta$sampletype

mov10_meta[ , "sampletype"]

## Subsetting the output from a pipe
mov10_meta %>% .$sampletype

mov10_meta %>% .[ , "sampletype"]
```

## Tidyverse tools

While all of the tools in the Tidyverse suite are deserving of being explored in more depth, we are going to investigate only the tools we will be using most for data wrangling and tidying.

## Dplyr

The most useful tool in the [tidyverse](http://tidyverse.org/) is [dplyr](http://dplyr.tidyverse.org/). It's a swiss-army knife for data wrangling. [dplyr](http://dplyr.tidyverse.org/) has many handy functions that we recommend incorporating into your analysis:

-   `select()` extracts columns and returns a tibble.
-   `arrange()` changes the ordering of the rows.
-   `filter()` picks cases based on their values.
-   `mutate()` adds new variables that are functions of existing variables.
-   `rename()` easily changes the name of a column(s)
-   `summarise()` reduces multiple values down to a single summary.
-   `pull()` extracts a single column as a vector.
-   `_join()` group of functions that merge two data frames together, includes (`inner_join()`, `left_join()`, `right_join()`, and `full_join()`).

**Note:** [dplyr](http://dplyr.tidyverse.org/) underwent a massive revision this year, switching versions from 0.5 to 0.7. If you consult other [dplyr](http://dplyr.tidyverse.org/) tutorials online, note that many materials developed prior to 2017 are no longer correct. In particular, this applies to writing functions with [dplyr](http://dplyr.tidyverse.org/) (see Notes section below).


`select()`
----------

To extract columns from a tibble we can use the `select()`.

``` r
sub_res <- res_tableOE %>%
    select(gene, baseMean, log2FoldChange, padj)
```

Conversely, you can remove columns you don't want with negative selection.

``` r
res_tableOE %>%
    select(-c(lfcSE, stat, pvalue))
```

    ## # A tibble: 23,368 x 4
    ##         gene    baseMean log2FoldChange         padj
    ##          <chr>       <dbl>          <dbl>        <dbl>
    ##  1 1/2-SBSRNA4  45.6520399    0.266586547 2.708964e-01
    ##  2        A1BG  61.0931017    0.208057615 3.638671e-01
    ##  3    A1BG-AS1 175.6658069   -0.051825739 7.837586e-01
    ##  4        A1CF   0.2376919    0.012557390           NA
    ##  5       A2LD1  89.6179845    0.343006364 7.652553e-02
    ##  6         A2M   5.8600841   -0.270449534 2.318666e-01
    ##  7       A2ML1   2.4240553    0.236041349           NA
    ##  8       A2MP1   1.3203237    0.079525469           NA
    ##  9      A4GALT  64.5409534    0.795049160 2.875565e-05
    ## 10       A4GNT   0.1912781    0.009458374           NA
    ## # ... with 23,358 more rows

`arrange()`
-----------

Note that the rows are sorted by the gene symbol. Let's fix that and sort them by adjusted P value instead with `arrange()`.

``` r
sub_res <- arrange(sub_res, padj)
sub_res
```

    ## # A tibble: 23,368 x 4
    ##      gene   baseMean log2FoldChange          padj
    ##       <chr>      <dbl>          <dbl>         <dbl>
    ##  1    MOV10 21681.7998      4.7695983  0.000000e+00
    ##  2     H1F0  7881.0811      1.5250811 2.007733e-162
    ##  3    HSPA6   168.2522      4.4993734 1.969313e-134
    ##  4 HIST1H1C  1741.3830      1.4868361 5.116720e-101
    ##  5    TXNIP  5133.7486      1.3868320  4.882246e-90
    ##  6    NEAT1 21973.7061      0.9087853  2.269464e-83
    ##  7    KLF10  1694.2109      1.2093969  9.257431e-78
    ##  8   INSIG1 11872.5106      1.2260848  8.853278e-70
    ##  9    NR1D1   969.9119      1.5236259  1.376753e-64
    ## 10    WDFY1  1422.7361      1.0629160  1.298076e-61
    ## # ... with 23,358 more rows

`filter()`
----------

Let's keep only genes that are expressed (`baseMean` above 0) with an adjusted P value below 0.01. You can perform multiple `filter()` operations together in a single command.

``` r
sub_res <- sub_res %>%
    filter(baseMean > 0,
           padj < 0.01)
```

`mutate()`
----------

`mutate()` enables you to create a new column from an existing column. Let's generate log10 calculations of our baseMeans for each gene.

``` r
sub_res %>%
    mutate(log10BaseMean = log10(baseMean)) %>%
    select(gene, baseMean, log10BaseMean)
```

    ## # A tibble: 4,909 x 3
    ##      gene   baseMean log10BaseMean
    ##       <chr>      <dbl>         <dbl>
    ##  1    MOV10 21681.7998      4.336095
    ##  2     H1F0  7881.0811      3.896586
    ##  3    HSPA6   168.2522      2.225961
    ##  4 HIST1H1C  1741.3830      3.240894
    ##  5    TXNIP  5133.7486      3.710435
    ##  6    NEAT1 21973.7061      4.341903
    ##  7    KLF10  1694.2109      3.228967
    ##  8   INSIG1 11872.5106      4.074543
    ##  9    NR1D1   969.9119      2.986732
    ## 10    WDFY1  1422.7361      3.153124
    ## # ... with 4,899 more rows

`rename()`
----------

You can quickly rename an existing column with `rename()`. The syntax is `new_name` = `old_name`.

``` r
sub_res %>%
    rename(symbol = gene)
```

    ## # A tibble: 4,909 x 4
    ##        gene   baseMean log2FoldChange          padj
    ##       <chr>      <dbl>          <dbl>         <dbl>
    ##  1    MOV10 21681.7998      4.7695983  0.000000e+00
    ##  2     H1F0  7881.0811      1.5250811 2.007733e-162
    ##  3    HSPA6   168.2522      4.4993734 1.969313e-134
    ##  4 HIST1H1C  1741.3830      1.4868361 5.116720e-101
    ##  5    TXNIP  5133.7486      1.3868320  4.882246e-90
    ##  6    NEAT1 21973.7061      0.9087853  2.269464e-83
    ##  7    KLF10  1694.2109      1.2093969  9.257431e-78
    ##  8   INSIG1 11872.5106      1.2260848  8.853278e-70
    ##  9    NR1D1   969.9119      1.5236259  1.376753e-64
    ## 10    WDFY1  1422.7361      1.0629160  1.298076e-61
    ## # ... with 4,899 more rows

`summarise()`
-------------

You can perform column summarization operations with `summarise()`.

``` r
sub_res %>%
    summarise(avgBaseMean = mean(baseMean))
```

    ## # A tibble: 1 x 1
    ##   avgBaseMean
    ##         <dbl>
    ## 1      1911.6

*Advanced:* `summarise()` is particularly powerful in combination with the `group_by()` function, which allows you to group related rows together.

*Note*: `summarize()` also works if you prefer to use American English. This applies across the board to any tidy functions, including in [ggplot2](http://ggplot2.tidyverse.org/) (e.g. `color` in place of `colour`).

`pull()`
--------

In the recent [dplyr](http://dplyr.tidyverse.org/) 0.7 update, `pull()` was added as a quick way to access column data as a vector. This is very handy in chain operations with the pipe operator.

``` r
# Extract first 10 values from the gene column
pull(sub_res, gene) %>% .[1:10]
```

`_join()`
--------
Dplyr has a powerful group of join operations, which join together a pair of data frames based on a variable or set of variables present in both data frames that uniquely identify all observations. These variables are called **keys**.

- `inner_join`: Only the rows with keys present in both datasets will be joined together.

- `left_join`: Keeps all the rows from the first dataset, regardless of whether in second dataset, and joins the rows of the second that have keys in the first.

- `right_join`: Keeps all the rows from the second dataset, regardless of whether in first dataset, and joins the rows of the first that have keys in the second.

- `full_join`: Keeps all rows in both datasets. Rows without matching keys will have NA values for those variables from the other dataset.

To practice with the join functions, we can use a couple of built-in R datasets.

	```r
	# Bring in datasets
	data(band_instruments)
	head(band_instruments)

	data(band_members)
	head(band_members)

	# Inner join
	inner_join(band_instruments, band_members, artist = name)

	# Left join
	left_join(band_instruments, band_members, artist = name)

	# Right join
	right_join(band_instruments, band_members, artist = name)

	# Full join
	full_join(band_instruments, band_members, artist = name)
	```

## Tidyr

The purpose of Tidyr is to have well-organized or tidy data, which Tidyverse defines as having:

1. Each variable in a column
2. Each observation in a row
3. Each value as a cell

There are two main functions in Tidyr, `gather()` and `spread()`. These functions allow for conversion between long data format and wide data format. The downstream use of the data will determine which format is required.

`gather()`
--------

The `gather()` function changes a wide data format into a long data format. This function is particularly helpful when using 'ggplot2' to get all of the values to plot into a single column. 

To use this function, you need to give the columns in the data frame you would like to gather together as a single column. Then, provide a name to give the column where all of the column names will be present using the `key` argument, and the name to give the column where all of the values will be present using the `value` argument.

```r
gathered <- normalized_counts %>%
        	  gather(colnames(normalized_counts)[2:9],
               	  key =  "samplename",
               	  value = "normalized_counts")
```               
        

`spread()`
--------

The `spread()` function is the reverse of the `gather()` function. The categories of the `key` column will become separate columns, and the values in the `value` column split across the associated `key` columns.

```r
gathered %>% 
        spread(key = samplename, 
               value = normalized_counts)
```               

-----------------


Programming notes
-----------

Underneath the hood, [tidyverse](http://tidyverse.org/) packages build upon the base [R](https://www.r-project.org/) language using [rlang](https://github.com/tidyverse/rlang/), which is a **complete rework** of how functions handle variable names and evaluate arguments. This is achieved through the `tidyeval` framework, which interprates command operations using `tidy evaluation`. This is outside of the scope of the course, but explained in detail in the [Programming with dplyr](http://dplyr.tidyverse.org/articles/programming.html) vignette, in case you'd like to understand how these new tools behave differently from base [R](https://www.r-project.org/).

Additional resources
====================

-   [R for Data Science](http://r4ds.had.co.nz)
-   [teach the tidyverse](http://varianceexplained.org/r/teach-tidyverse/)
-   [tidy style guide](http://style.tidyverse.org/)
