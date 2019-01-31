# Plot term name relative to p-value

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term))

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, color = p.value))

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, color = p.value))

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, , color = p.value), 
             size = 2)

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, , color = p.value), 
             size = 5)

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, , color = p.value), 
             size = 2, 
             shape = "square")

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, , color = p.value), 
             size = 2) +
  theme_bw()

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, color = p.value), 
             size = 2) +
  theme_bw() +
  theme(axis.text = element_text(size=rel(0.65)),
        axis.title = element_text(size=rel(0.65)))

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, color = p.value), 
             size = 2) +
  theme_bw() +
  theme(axis.text = element_text(size=rel(0.65)),
        axis.title = element_text(size=rel(0.85))) +
  xlab("Gene ratios \n (# DE genes assoc. with term / total # DE genes)") +
  ylab("Top 30 significant GO terms")

library(RColorBrewer)
mypalette<-brewer.pal(3,"YlOrRd")

ggplot(bp_oe[1:30, ]) +
  geom_point(aes(x = gene_ratio, y = go_term, color = -log10(p.value)), 
             size = 2) +
  theme_bw() +
  theme(axis.text = element_text(size=rel(0.65)),
        axis.title = element_text(size=rel(0.85), 
                                  face = "bold")) +
  xlab("Gene ratios \n (# DE genes assoc. with term / total # DE genes)") +
  ylab("GO terms") +
  ggtitle("Dotplot \n Top 30 significant GO terms") +
  theme(plot.title=element_text(hjust=0.5, 
                                face = "bold")) +
  scale_colour_gradientn(name = "Significance \n(-log10(padj))", 
                         colors = mypalette) +
  theme(legend.title = element_text(size=10, 
                                    face="bold"))

# Exercise - make a dotplot with termPercent
bp_oe_term_percent <- bp_oe %>%
  arrange(termPercent)

bp_oe_term_percent$term.name <- factor(bp_oe_term_percent$term.name, levels = bp_oe_term_percent$term.name)


ggplot(tail(bp_oe_term_percent, n = 50)) +
  geom_point(aes(x = termPercent, y = term.name, color = -log10(p.value)), 
             size = 2) +
  theme_bw() +
  theme(axis.text = element_text(size=rel(0.65)),
        axis.title = element_text(size=rel(0.85), 
                                  face = "bold")) +
  xlab("Gene ratios \n (# DE genes assoc. with term / total # DE genes)") +
  ylab("GO terms") +
  ggtitle("Dotplot \n Top 50 significant GO terms") +
  theme(plot.title=element_text(hjust=0.5, 
                                face = "bold")) +
  scale_colour_gradientn(name = "Significance \n(-log10(padj))", 
                         colors = mypalette) +
  theme(legend.title = element_text(size=10, 
                                    face="bold"))

# Number of genes per category
ggplot(bp_oe[1:30, ]) +
  geom_bar(aes(x = go_term, y = overlap.size), 
           stat = "identity",
           fill = "royalblue",
           color = "black") +
  labs(title = "DE genes per GO process", x = NULL, y =  "# DE genes") +
  theme_classic() +
  theme(plot.title=element_text(hjust=0.5, 
                                size = 14, 
                                face = "bold"))

ggplot(bp_oe[1:30, ]) +
  geom_bar(aes(x = go_term, y = overlap.size), 
           stat = "identity",
           fill = "royalblue",
           color = "black") +
  labs(title = "DE genes per GO process", x = NULL, y =  "# DE genes") +
  theme_classic() +
  theme(plot.title=element_text(hjust=0.5, 
                                size = 14, 
                                face = "bold")) +
  theme(axis.text = element_text(size=rel(0.65)),
        axis.text.x = element_text(angle = 45, hjust = 1)) +
  theme(plot.margin = unit(c(1,1,1,2), "cm"))


# Distribution of term sizes - probably won't add this, but here if I decide I want to
ggplot(bp_oe) +
  geom_histogram(aes(x = term.size, y = ..density..)) +
  theme_light()

ggplot(bp_oe) +
  geom_density(aes(x = term.size), fill = "royalblue") +
  theme_light()

ggplot(bp_oe[1:30, ]) +
  geom_density(aes(x = term.size), fill = "royalblue") +
  theme_light()
