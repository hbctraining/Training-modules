# Plotting answer keys

#1
animals$animal_names <- row.names(animals)

#2
ggplot(animals) +
  geom_point(aes(x = animal_names, y = speed), color = "purple") +
  xlab("Animal") +
  ylab("Speed (km/h)") +
  ggtitle("Speed Comparisons Between Animals") +
  theme(plot.title=element_text(hjust=0.5))

#3a
animals$animal_names <- with(animals, reorder(animal_names, speed))

#3b
ggplot(animals) +
  geom_point(aes(x = animal_names, y = speed), color = "purple") +
  xlab("Animal") +
  ylab("Speed (km/h)") +
  ggtitle("Speed Comparisons Between Animals")
  
#4
pdf("results/animals_by_speed_scatterplot.pdf")
ggplot(animals) +
  geom_point(aes(x = animal_names, y = speed), color = "purple") +
  xlab("Animal") +
  ylab("Speed (km/h)") +
  ggtitle("Speed Comparisons Between Animals")
dev.off()
