library(tidyverse)

# Check mtcars dataset
View(mtcars)
class(mtcars)
?mtcars

# Convert to tibble
mtcars_tb <- rownames_to_column(mtcars, var = "car") %>% 
  as_tibble()

# Data wrangling
mtcars_final <- mtcars_tb %>% 
  filter(am == 1) %>% 
  select(car, mpg, cyl, wt, am) %>% 
  rename(cyclinder = cyl, 
         weight = wt,
         transmission = am) %>% 
  arrange(cyclinder, desc(mpg))
