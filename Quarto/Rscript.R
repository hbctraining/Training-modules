# Set-up libraries and data

## Load libraries
library(tidyverse)
library(pheatmap)

## Load data
load("data/Rmarkdown_data.Rdata")

# Top 20 significant genes

## Get names of top 20 genes
top20_sigOE_genes <- res_tableOE_tb %>% 
  arrange(padj) %>% 	#Arrange rows by padj values
  pull(gene) %>% 		#Extract character vector of ordered genes
  head(n=20)	

## normalized counts for top 20 significant genes
top20_sigOE_norm <- normalized_counts %>%
  filter(gene %in% top20_sigOE_genes)

## Gathering the columns to have normalized counts to a single column
gathered_top20_sigOE <- top20_sigOE_norm %>%
  gather(colnames(top20_sigOE_norm)[2:9], key = "samplename", value = "normalized_counts")
gathered_top20_sigOE <- inner_join(mov10_meta, gathered_top20_sigOE)

## plot using ggplot2
ggplot(gathered_top20_sigOE) +
  geom_point(aes(x = gene, y = normalized_counts, color = sampletype)) +
  scale_y_log10() +
  xlab("Genes") +
  ylab("log10 Normalized Counts") +
  ggtitle("Top 20 Significant DE Genes") +
  theme_bw() +
  theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
  theme(plot.title = element_text(hjust = 0.5))

# Create a heatmap of the differentially expressed genes

## Extract normalized expression for significant genes from the OE and control samples (2:4 and 7:9)
res_tableOE_tb_sig <- res_tableOE_tb %>%
  filter(padj < 0.05)

## Return the normalized counts for the significant DE genes
norm_OEsig <- normalized_counts %>% 
  filter(gene %in% res_tableOE_tb_sig$gene) 

meta <- mov10_meta %>%
column_to_rownames("samplename") %>%
data.frame()

## Run pheatmap using the metadata data frame for the annotation
pheatmap(norm_OEsig[2:9], 
         cluster_rows = T, 
         show_rownames = F,
         annotation = meta, 
         border_color = NA, 
         fontsize = 10, 
         scale = "row", 
         fontsize_row = 10, 
         height = 20)
