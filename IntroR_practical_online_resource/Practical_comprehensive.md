# Introduction to R practice

## Creating vectors/factors and data frames

1. We are performing RNA-Seq on cancer samples being treated with three different types of treatment (A, B, and P). You have 12 samples total, with 4 replicates per treatment. Write the R code you would use to construct your metadata table as described below.  
     - Create the vectors/factors for each column (Hint: you can type out each vector/factor, or if you want the process go faster try exploring the `rep()` function).
     - Put them together into a dataframe called `meta`.
     - Use the `rownames()` function to assign row names to the dataframe (Hint: you can type out the row names as a vector, or if you want the process go faster try exploring the `paste()` function).

     Your finished metadata table should have information for the variables `sex`, `stage`, `treatment`, and `myc` levels: 

     | |sex	| stage	| treatment	| myc |
     |:--:|:--: | :--:	| :------:	| :--: |
     |sample1|	M	|I	|A	|2343|
     |sample2|	F	|II	|A	|457|
     |sample3	|M	|II	|A	|4593|
     |sample4	|F	|I	|A	|9035|
     |sample5|	M	|II	|B	|3450|
     |sample6|	F|	II|	B|	3524|
     |sample7|	M|	I|	B|	958|
     |sample8|	F|	II|	B|	1053|
     |sample9|	M|	II|	P|	8674|
     |sample10	|F|	I	|P	|3424|
     |sample11|	M	|II	|P	|463|
     |sample12|	F|	II|	P|	5105|

 
## Subsetting vectors/factors and dataframes

2. Using the `meta` data frame from question #1, write out the R code you would use to perform the following operations (questions **DO NOT** build upon each other):

     - return only the `treatment` and `sex` columns using `[]`:
     - return the `treatment` values for samples 5, 7, 9, and 10 using `[]`:
     - remove the `treatment` column from the dataset using `[]`:
     - remove samples 7, 8 and 9 from the dataset using `[]`:
     - keep only samples 1-6 using `[]`:
     - output a data frame with a column called `pre_treatment` as the first column with the values T, F, F, F, T, T, F, T, F, F, T, T (Hint: use `data.frame` or `cbind()`): 
     - change the names of the columns to: "A", "B", "C", "D":
 
## Extracting components from lists
3. Create a new list, `list_three` with three components, the `pre_treatment` vector, the dataframe `meta`, and vector `stage`. Use this list to answer the questions below . `list_three` has the following structure (NOTE: the components of this list are not currently named):

          [[1]]
           [1]  TRUE FALSE FALSE FALSE  TRUE  TRUE FALSE  TRUE FALSE FALSE  TRUE
          [12]  TRUE

          [[2]]
                   A  B C    D
          sample1  M  I A 2343
          sample2  F II A  457
          sample3  M II A 4593
          sample4  F  I A 9035
          sample5  M II B 3450
          sample6  F II B 3524
          sample7  M  I B  958
          sample8  F II B 1053
          sample9  M II P 8674
          sample10 F  I P 3424
          sample11 M II P  463
          sample12 F II P 5105

          [[3]]
           [1] "I"  "II" "II" "I"  "II" "II" "I"  "II" "II" "I"  "II" "II"

Write out the R code you would use to perform the following operations (questions **DO NOT** build upon each other):
 - return the second component of the list:
 - return `2343` from the second component of the list:
 - return all "I" values from the third component: 
 - give the components of the list the following names: "pre_treatment", "meta", "stage":
   
## Creating figures with ggplot2

![plot_image](https://hbctraining.github.io/Intro-to-R-flipped/homework/plotcounts.png)

4. Create the same plot as above using ggplot2 using the provided metadata and counts datasets. The [metadata table](https://github.com/hbc/Intro-to-R-2-day/raw/master/data/Mov10_full_meta.txt) describes an experiment that you have setup for RNA-seq analysis, while the [associated count matrix](https://github.com/hbc/Intro-to-R-2-day/raw/master/data/normalized_counts.txt) gives the normalized counts for each sample for every gene. Download the count matrix and metadata using the links provided.

     Follow the instructions below to build your plot. Write the code you used and provide the final image.

     - Read in the metadata file ("Mov10_full_meta.txt") to a variable called `counts_meta` using the `read.delim()` function. Be sure to specify the row names are in column 1 and the delimiter/column separator is a tab ("/t").

     - Read in the count matrix file ("normalized_counts.txt") to a variable called `data` using the `read.delim()` function and specifying there are row names in column 1 and the tab delimiter.

     - Create a variable called `expression` that contains the normalized count values from the row in normalized_counts that corresponds to the MOV10 gene.  

     - Check the class of `expression`. Convert it to a numeric vector using `as.numeric(expression)`

     - Bind that vector to your metadata data frame (`counts_meta`) and call the new data frame `df`. 

     - Create a ggplot by constructing the plot line by line:
     
          - Initialize a  ggplot with your `df` as input.

          - Add the `geom_jitter()` geometric object with the required aesthetics which are x and y.

          - Color the points based on `sampletype`

          - Add the `theme_bw()` layer 

          - Add the title "Expression of MOV10" to the plot

          - Change the x-axis label to be blank

          - Change the y-axis label to "Normalized counts"

          - Using `theme()` change the following properties of the plot:

               - Remove the legend (Hint: use ?theme help and scroll down to legend.position)

               - Change the plot title size to 1.5x the default and center align

               - Change the axis title to 1.5x the default size

               - Change the size of the axis text only on the y-axis to 1.25x the default size
               
               - Rotate the x-axis text to 45 degrees using `axis.text.x=element_text(angle=45, hjust=1)`

5. Save the plot as a PDF to the figures directory.

## Packages and installations

6. Install the `tidyverse` R package from the CRAN repository and load the library. 

7. Install the `biomaRt` R package from the Bioconductor repository and load the library.

## Building on the basics

The **Tidyverse suite of integrated packages** are R packages designed to work together to make common data science operations more user friendly. The packages have functions for data wrangling, tidying, reading/writing, parsing, and visualizing, among others. 

8. Using [this tutorial](https://hbctraining.github.io/Training-modules/Tidyverse_ggplot2/lessons/intro_tidyverse.html), explore some of the functionality for reading in and wrangling data with the `readr` and `dplyr` packages, which were installed when you installed the tidyverse suite in the previous section.

9. Turn the `meta` data frame from question #1 of the "Creating vectors/factors and data frames" section above into a tibble called `meta_tb`. (_**Hint:** Be sure to turn the rownames into a column before changing it into a tibble._)

10. Using `meta_tb`, write out the R code you would use to rename the columns back to `sex`, `stage`, `treatment`, and `myc` using `rename()`. Save back (overwrite) to the `meta_tb` variable.

11. Using `meta_tb`, write out the R code you would use to perform the following operations (questions **DO NOT** build upon each other):

     - use `filter()` to return all data for those samples receiving treatment `P`.
     - use `filter()`/`select()` to return only the `stage` and `treatment` columns for those samples with `myc` > 5000.
     - use `arrange()` to arrange the rows by `myc` in *descending* order.
     
11. Write `meta_tb` to a comma separated value file using the `write_delim()` function.
