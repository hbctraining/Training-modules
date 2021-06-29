# Functions Practical - Answer Key

1. Let's first create a function fahrenheit_to_celsius, which converts temperature from Fahrenheit to Celsius. The formula is as follows: Temp_Celsius = 
(Temp_Fahrenheit - 32) * 5 / 9. Test your function - fahrenheit_to_celsius(32) should give output of 0.

```r
fahrenheit_to_celsius <- function(temp_F) {
  temp_C <- (temp_F - 32) * 5 / 9
  return (temp_C)
}
fahrenheit_to_celsius(32)
```

2. Then let's create another function celsius_to_kelvin, which converts temperature from Celsius to Kelvin. The formula is as follows: Temp_Kelvin = Temp_Celsius + 273.15. Test your function - celsius_to_kelvin(0) should give output of 273.15.

```r
celsius_to_kelvin <- function(temp_C) {
  temp_K <- temp_C + 273.15
  return (temp_K)
}
celsius_to_kelvin(0)
```

3. Using the two functions above, write one line code that converts temperature of 32 in Fahrenheit to corresponding temperature in Kelvin. Hint: think about "nesting" one function inside another one.

```r
celsius_to_kelvin(fahrenheit_to_celsius(32))
```
