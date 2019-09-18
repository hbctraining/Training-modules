---
title: "Intro to RNA-seq"
author: "Mary Piper, Meeta Mistry, Radhika Khetani"
date: "September 18, 2019"
---

Approximate time: 15 minutes

## Learning Objectives:

* Describe the theory of RNA-seq and methods utilizing RNA-seq data

## Introduction to RNA-seq

RNA-seq is an exciting experimental technique that is utilized to explore and/or quantify gene expression within or between conditions. 


As we know, genes provide instructions to make proteins, which perform some function within the cell. Although **all cells contain the same DNA sequence**, muscle cells are different from nerve cells and other types of cells because of the **different genes that are turned on in these cells and the different RNAs and proteins produced**. 

<p align="center">
<img src="../img/gene_expression_cells.png" width="600"/>
</p>


Different biological processes, as well as mutations, can affect which genes are turned on and which are turned off, in addition to, *how much* specific genes are turned on/off.

To make proteins, the DNA is transcribed into messenger RNA, or mRNA, which is translated by the ribosome into protein. However, some genes encode RNA that does not get translated into protein; these RNAs are called non-coding RNAs, or ncRNAs. Often these RNAs have a function in and of themselves and include rRNAs, tRNAs, and siRNAs, among others. All RNAs transcribed from genes are called transcripts.

<p align="center">
<img src="../img/Gene_products.png" width="400"/>
</p>

To be translated into proteins, the RNA must undergo processing to generate the mRNA. In the figure below, the top strand in the image represents a gene in the DNA, comprised of the untranslated regions (UTRs) and the open read frame. Genes are transcribed into pre-mRNA, which still contains the intronic sequences.  After post-transciptional processing, the introns are spliced out and a polyA tail and 5' cap are added to yield mature mRNA transcripts, which can be translated into proteins.

<p align="center">
<img src="../img/Gene_structure.png" width="600"/>
</p>

**While mRNA transcripts have a polyA tail, many of the non-coding RNA transcripts do not as the post-transcriptional processing is different for these transcripts.**

### Transcriptomics

The transcriptome is defined as a collection of all the transcript readouts present in a cell. RNA-seq data can be used to explore and/or quantify the transcriptome of an organism, which can be utilized for the following types of experiments:

- **Differential Gene Expression**: *quantitative* evaluation and comparison of transcript levels
- **Transcriptome assembly**: building the profile of transcribed regions of the genome, a *qualitative* evaluation. 
- Can be used to **help build better gene models**, and verify them using the assembly
- **Metatranscriptomics** or community transcriptome analysis

