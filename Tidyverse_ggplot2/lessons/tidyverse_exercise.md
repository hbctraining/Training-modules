# Exercise: explore mtcars dataset with Tidyverse

`mtcars` is a built-in dataset in R. It comprises 11 features of 32 automobiles from the 1974 *Motor Trend* US magazine. We will use it for this data wrangling exercise.

First, let's check what the data looks like, and the class of this data. You may check more details about `mtcars` with the help function.
```r
# data exploration
View(mtcars)
class(mtcars)
?mtcars
```

Since it is a data frame with row name, we will turn the row name to column name, and then convert the data frame to tibble. Let's use `car` as the new column name, and name the resulting tibble as `mtcars_tb`.
```r
# turn row name to column name, and convert to tibble
mtcars_tb <- rownames_to_column(mtcars, var = "car") %>% 
  as_tibble()
```

**Exercise**

Perform the following data wrangling steps. You may concatenate several steps with `%>%` pipe, or do each step one by one. Name the final variable as `mtcars_final`.
1. One of the columns is `am`. It indicates transmission status, where 0 refers to automatic, and 1 refers to manual. **Extract cars with manual transmission status.**
2. We are only interested in these five columns: car, mpg, cyl, wt, am. **Select only these five columns for further analysis.**
3. Some column names are not intuitive. **Rename the `cyl` to `cyclinder`, `wt` to `weight`, and `am` to `transmission`.**
4. We want to order our data. **Arrange the data first by cyclinder in ascending order, and then by mpg in descending order.**

Check your result: if you finish the data wrangling successfully, the `mtcars_final` should have 13 entries with 5 features. The first entry should be `Toyota Corolla`, and the last entry should be `Maserati Bora`.

[Answer key]()
