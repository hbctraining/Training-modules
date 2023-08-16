# Wrangling Practical 

## Reading in and inspecting data

1. Read the `.csv` file into your environment and assign it to a variable called `animals`. **Be sure to check that your row names are the different animals.**
2. Check to make sure that `animals` is a dataframe.
3. How many rows are in the `animals` dataframe? How many columns?


## Data wrangling

1. Extract the `speed` value of 40 km/h from the `animals` dataframe.
2. Return the rows with animals that are the `color` Tan.
3. Return the rows with animals that have `speed` greater than 50 km/h and output only the `color` column. Keep the output as a data frame.  
4. Change the color of "Grey" to "Gray". 
5. Create a list called `animals_list` in which the first element contains the speed column of the `animals` dataframe and the second element contains the color column of the `animals` dataframe. 
6. Give each element of your list the appropriate name (i.e speed and color).

## The %in% operator, reordering and matching

1. Read in the project summary file ("project-summary.txt") to a variable called `proj_summary`; this file contains quality metric information for an RNA-seq dataset. Be sure to specify the row names are in column 1 and the separator is a tab.

2. We have obtained batch information for the control samples in this dataset. **Copy and paste the code below to create a dataframe of control samples with the associated batch information**:
    ```
    ctrl_samples <- data.frame(row.names = c("sample3", "sample10", "sample8", "sample4", "sample15"), date = c("01/13/2018", "03/15/2018", "01/13/2018", "09/20/2018","03/15/2018"))
    ```
3. How many of the `ctrl_samples` are also in the `proj_summary` dataframe? Use the %in% operator to compare sample names.
4. Keep only the rows in `proj_summary` which correspond to those in `ctrl_samples`. Do this with the %in% operator. Save it to a variable called `proj_summary_ctrl`.
5. We would like to add in the batch information for the samples in `proj_summary_ctrl`. Find the rows that match in `ctrl_samples`.
6. Use `cbind()` to add a column called `batch` to the `proj_summary_ctrl` dataframe. Assign this new dataframe back to `proj_summary_ctrl`.

## BONUS: Using `map_lgl()`

1. Subset `proj_summary` to keep only the "high" and "low" samples based on the treament column. Save the new dataframe to a variable called `proj_summary_noctl`.
2. Further, subset the dataframe to remove the non-numeric columns "Quality_format", and "treatment". Try to do this using the `map_lgl()` function in addition to `is.numeric()`. Save the new dataframe back to `proj_summary_noctl`.
