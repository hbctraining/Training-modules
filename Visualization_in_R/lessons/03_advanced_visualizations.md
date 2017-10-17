---
title: "Advanced visualizations"
author: "Meeta Mistry, Mary Piper"
date: "June 14, 2017"
---

Approximate time: 75 minutes

## Learning Objectives 

* Exploring expression data using data visualization
* Using volcano plots to evaluate relationships between DEG statistics
* Plotting expression of significant genes using heatmaps

## Visualizing the results

When we are working with large amounts of data it can be useful to display that information graphically to gain more insight. Visualization deserves an entire course of its own, but during this lesson we will get you started with some basic and more advanced plots commonly used when exploring differential gene expression data.

Let's start by loading a few libraries (if not already loaded):

```r
# load libraries
library(reshape)
library(ggplot2)
library(ggrepel)
library(DEGreport)
library(RColorBrewer)
library(DESeq2)
library(pheatmap)
```

### Plotting signicant DE genes

One way to visualize results would be to simply plot the expression data for a handful of genes. We could do that by picking out specific genes of interest or selecting a range of genes:

#### Using `ggplot2` to plot one or more genes (e.g. top 20)

Often it is helpful to check the expression of multiple genes of interest at the same time. This often first requires some data wrangling.

We are going to plot the normalized count values for the **top 20 differentially expressed genes (by padj values)**. 

To do this, we first need to determine the gene names of our top 20 genes by ordering our results and extracting the top 20 genes (by padj values):

```r
## Order results by padj values
res_tableOE_ordered <- res_tableOE[order(res_tableOE$padj), ]
top20_sigOE_genes <- rownames(res_tableOE_ordered[1:20, ])
```

Then, we can extract the normalized count values for these top 20 genes:

```r
## normalized counts for top 20 significant genes
top20_sigOE_norm <- data.frame(normalized_counts[top20_sigOE_genes, ])

## Create a column with the gene names (from row names)
top20_sigOE_norm$gene <- rownames(top20_sigOE_norm)
```

Now that we have the normalized counts for each of the top 20 genes for all 8 samples, to plot using `ggplot()`, we need to gather the counts for all samples into a single column to allow us to give ggplot the one column with the values we want it to plot.

The `melt()` function in the **reshape** R package will perform this operation and will output the normalized counts for all genes for *Mov10_oe_1* listed in the first 20 rows, followed by the normalized counts for *Mov10_oe_2* in the next 20 rows, so on and so forth.

<img src="../img/melt_wide_to_long_format.png" width="800">

```r
## use melt to modify the format of the data frame
melted_top20_sigOE <- melt(top20_sigOE_norm)

## check the column header in the "melted" data frame
View(melted_top20_sigOE)

## add column names that make sense
colnames(melted_top20_sigOE) <- c("gene", "samplename", "normalized_counts")
```

Now, if we want our counts colored by sample group, then we need to combine the metadata information with the melted normalized counts data into the same data frame for input to `ggplot()`:

```r
## add metadata to "melted" dataframe
mov10_meta$samplename <- rownames(mov10_meta)

melted_top20_sigOE <- merge(melted_top20_sigOE, mov10_meta)
```

The `merge()` will merge 2 data frames with respect to the "samplename" column, i.e. a column with the same colname in both data frames.

Now that we have a data frame in a format that can be utilised by ggplot easily, let's plot! 

```r
## plot using ggplot2
ggplot(melted_top20_sigOE) +
        geom_point(aes(x = gene, y = normalized_counts, color = sampletype), position=position_jitter(w=0.1,h=0)) +
        scale_y_log10() +
        xlab("Genes") +
        ylab("Normalized Counts") +
        ggtitle("Top 20 Significant DE Genes") +
        theme_bw() +
	theme(axis.text.x = element_text(angle = 45, hjust = 1)) +
	theme(plot.title=element_text(hjust=0.5))
```

<img src="../img/sig_genes_melt.png" width="600">

If we only wanted to look at a single gene, we could extract that gene for plotting with ggplot. **Within `ggplot()` we can use the `geom_text_repel()` from the 'ggrepel' R package to label our individual points on the plot.**

```r
## plot using ggplot2 for a single gene
mov10 <- subset(melted_top20_sigOE, gene == "MOV10")

ggplot(mov10, aes(x = sampletype, y=normalized_counts,  color = sampletype)) +
        geom_point(position=position_jitter(w=0.1,h=0)) +
	geom_text_repel(aes(label = samplename)) +
        scale_y_log10() +
        xlab("Samples") +
        ylab("Normalized Counts") +
        ggtitle("MOV10") +
        theme_bw() +
        theme(plot.title=element_text(hjust=0.5))
```

<img src="../img/plotCounts_ggrepel.png" width="600">

### Volcano plot

The above plot would be great to look at the expression levels of a good number of genes, but for more of a global view there are other plots we can draw. A commonly used one is a volcano plot; in which you have the log transformed adjusted p-values plotted on the y-axis and log2 fold change values on the x-axis. 

To generate a volcano plot, we first need to have a column in our results data indicating whether or not the gene is considered differentially expressed based on p-adjusted values.

```r

threshold_OE <- res_tableOE$padj < 0.05 
```

We now have a logical vector of values that has a length which is equal to the total number of genes in the dataset. The elements that have a `TRUE` value correspond to genes that meet the criteria (and `FALSE` means it fails). It should countain the same number of TRUEs as the number of genes in our `sigOE` data frame.

```r
length(which(threshold_OE))
```
	
To add this vector to our results table we can use the `$` notation to create the column on the left hand side of the assignment operator, and then assign the vector to it instead of using `cbind()`:

```r
threshold_OE <- res_tableOE$padj < 0.05
length(which(threshold_OE))
res_tableOE$threshold <- threshold_OE 

```

Now we can start plotting. The `geom_point` object is most applicable, as this is essentially a scatter plot:

```r
# Volcano plot
ggplot(res_tableOE) +
        geom_point(aes(x=log2FoldChange, y=-log10(padj), colour=threshold)) +
        ggtitle("Mov10 overexpression") +
        xlab("log2 fold change") + 
        ylab("-log10 adjusted p-value") +
        #scale_y_continuous(limits = c(0,50)) +
        theme(legend.position = "none",
              plot.title = element_text(size = rel(1.5), hjust = 0.5),
              axis.title = element_text(size = rel(1.25)))  
```

<img src="../img/volcanoplot-1.png" width=500> 

This is a great way to get an overall picture of what is going on, but what if we also wanted to know where the top 10 genes (lowest padj) in our DE list are located on this plot? We could label those dots with the gene name on the Volcano plot using `geom_text_repel()`.

To make this work we have to take the following 3 steps:
(Step 1) Create a new data frame sorted or ordered by padj
(Step 2) Indicate in the data frame which genes we want to label by adding a logical vector to it, wherein "TRUE" = genes we want to label.
 
```r
res_tableOE_ordered <- res_tableOE[order(res_tableOE$padj), ] 

res_tableOE_ordered$genelabels <- rownames(res_tableOE_ordered) %in% rownames(res_tableOE_ordered[1:10,])

View(res_tableOE_ordered)
```

(Step 3) Finally, we need to add the `geom_text_repel()` layer to the ggplot code we used before, and let it know which genes we want labelled. 

```r
ggplot(res_tableOE_ordered) +
  geom_point(aes(x = log2FoldChange, y = -log10(padj), colour = threshold)) +
  geom_text_repel(aes(x = log2FoldChange, y = -log10(padj), label = ifelse(genelabels == T, rownames(res_tableOE_ordered),""))) +
  ggtitle("Mov10 overexpression") +
  xlab("log2 fold change") + 
  ylab("-log10 adjusted p-value") +
  theme(legend.position = "none",
        plot.title = element_text(size = rel(1.5), hjust = 0.5),
        axis.title = element_text(size = rel(1.25))) 
```

<img src="../img/volcanoplot-2.png" width=500> 

The `ifelse()` function is a simple function that outputs a vector if a certain condition is T. In the above example, it checks if the value in the `res_tableOE_ordered$genelevel` column is TRUE, in which case it will output the row name for that row (`rownames(res_tableOE_ordered)`). If the value in the genelevel column is FALSE it will output nothing (`""`). This is good way to inform `geom_point()` about genes we want labeled.

### Heatmap

Alternatively, we could extract only the genes that are identified as significant and the plot the expression of those genes using a heatmap:

```r
## Extract significant genes
sigOE <- subset(res_tableOE_ordered, padj < 0.05)

### Extract normalized expression for significant genes
norm_OEsig <- normalized_counts[rownames(sigOE),]
```

Now let's draw the heatmap using `pheatmap`:

```r
### Annotate our heatmap (optional)
annotation <- data.frame(sampletype=mov10_meta[,'sampletype'], 
                     row.names=rownames(mov10_meta))

### Set a color palette
heat_colors <- brewer.pal(6, "YlOrRd")

### Run pheatmap
pheatmap(norm_OEsig, color = heat_colors, cluster_rows = T, show_rownames=F,
annotation= annotation, border_color=NA, fontsize = 10, scale="row",
     fontsize_row = 10, height=20)
```
         
![sigOE_heatmap](../img/sigOE_heatmap.png)       

> *NOTE:* There are several additional arguments we have included in the function for aesthetics. One important one is `scale="row"`, in which Z-scores are plotted, rather than the actual normalized count value. Z-scores are computed on a gene-by-gene basis by subtracting the mean and then dividing by the standard deviation. The Z-scores are computed **after the clustering**, so that it only affects the graphical aesthetics and the color visualization is improved.

### MA Plot

Another plot often useful to exploring our results is the MA plot. The MA plot shows the mean of the normalized counts versus the log2 foldchanges for all genes tested. The genes that are significantly DE are colored to be easily identified. The DESeq2 package also offers a simple function to generate this plot:

```r
ma <- res_tableOE[, c("baseMean", "log2FoldChange", "threshold")]

plotMA(ma, ylim=c(-2,2))
```
<img src="../img/MA_plot.png" width="600">

We would expect to see significant genes across the range of expression levels.

***

***NOTE:** If using the DESeq2 tool for differential expression analysis, the package 'DEGreport' can use the DESeq2 results output to make the top20 genes and the volcano plots generated above by writing a few lines of simple code. While you can customize the plots above, you may be interested in using the easier code. Below are examples of the code to create these plots:*

>```r
>DEGreport::degPlot(dds = dds, res = res, n=20, xs="type", group = "condition") # dds object is output from DESeq2
>
>DEGreport::degVolcano(
>    as.data.frame(res[,c("log2FoldChange","padj")]), # table - 2 columns
>    plot_text=as.data.frame(res[1:10,c("log2FoldChange","padj","id")])) # table to add names
>    
># Available in the newer version for R 3.4
>DEGreport::degPlotWide(dds = dds, genes = row.names(res)[1:5], group = "condition")
>```
***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

* *Materials and hands-on activities were adapted from [RNA-seq workflow](http://www.bioconductor.org/help/workflows/rnaseqGene/#de) on the Bioconductor website*
