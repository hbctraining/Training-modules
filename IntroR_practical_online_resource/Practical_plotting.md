# Plotting Practical


1. Change the `animals` data frame to a tibble called `animals_tb`. Save the row names to a column called `animal_names` before turning it into a tibble.

	<p align="center">
  	<img src="https://hbctraining.github.io/Intro-to-R-flipped/img/animals_tb_unordered.png" width="400"/>
	</p>

2. Use ggplot2 to plot the animal names (x-axis) versus the speed of the animal (y-axis) in `animals_tb` using a scatterplot. Customize the plot to display as shown below.

	<p align="center">
  	<img src="https://hbctraining.github.io/Intro-to-R-flipped/img/animals_unordered_ggplot2.png" width="425"/>
	</p>

3. We decide that our plot would look better with the animal names ordered from slowest to fastest. Using the `animals_tb` data frame, reorder the animals on the x-axis to start with the slowest animal on the left-hand side of the plot to the fastest animal on the right-hand side of the plot by completing the following steps:

	**a.** Use the `arrange()` function to order the rows by speed from slowest to fastest. Then use the `pull()` function to extract the `animal_names` column as a vector of character values. Save the new variable as `names_ordered_by_speed`.

	**b.** Turn the `animal_names` column of `animals_tb` into a factor and specify the levels as `names_ordered_by_speed` from slowest to fastest (output in part a). Note: this step is crucial, because ggplot2 uses `factor` as plotting order, instead of the order we observe in data frame.
	
	**c.** Re-plot the scatterplot with the animal names in order from slowest to fastest.
	
	<p align="center">
  	<img src="https://hbctraining.github.io/Intro-to-R-flipped/img/animals_ordered_ggplot2.png" width="425"/>
	</p>
	
> Note: If you are interested in exploring other ways to reorder a variable in ggplot2, refer to this [post](https://www.r-graph-gallery.com/267-reorder-a-variable-in-ggplot2.html).
	
4. Save the plot as a PDF called `animals_by_speed_scatterplot.pdf ` to the `results` folder.

5. Use the functions from the `dplyr` package to perform the following tasks:

	**a.** Extract the rows of `animals_tb` tibble with color of gray or tan, order the rows based from slowest to fastest speed, and save to a variable called `animals_gray_tan`.
	
	<p align="center">
  	<img src="https://hbctraining.github.io/Intro-to-R-flipped/img/animals_tb_ordered.png" width="300"/>
	</p>	
	
	**b.** Save `animals_gray_tan` as a comma-separated value file called `animals_tb_ordered.csv` to the `results` folder.	
