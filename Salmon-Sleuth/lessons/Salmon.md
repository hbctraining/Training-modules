---
title: "Quantitation of transcript abundance using Salmon"
author: "Mary Piper and Meeta Mistry"
date: "Thursday, January 19th, 2017"
---

Contributors: Mary Piper

Approximate time: 1.25 hours

## Learning Objectives

* Explore using lightweight algorithms to quantify reads to pseudocounts
* Understand how Salmon performs quasi-mapping and transcript abundance estimation
* Learn how to perform differential gene expression on pseudocounts

## Alignment-free quantification of gene expression

In the standard RNA-seq pipeline that we have presented so far in this course, we have taken our reads post-QC and aligned them to the genome using our transcriptome (GTF) as guidance. The goal is to identify the genomic location where these reads originated from. Another strategy for quantification which has more recently been introduced involves **transcriptome mapping**. Tools that fall in this category include [Kallisto](https://pachterlab.github.io/kallisto/about), [Sailfish](http://www.nature.com/nbt/journal/v32/n5/full/nbt.2862.html) and [Salmon](https://combine-lab.github.io/salmon/); each working slightly different from one another. (For this course we will explore Sailfish in more detail.) Common to all of these tools is that we **avoid base-to-base alignment of the reads**, which is a time-consuming step, and these tools **provide quantification estimates much faster than do standard approaches** (typically 20 times faster) with improvements in accuracy. These estimates, often referred to as 'pseudocounts' are then converted for use with DEG tools like DESeq2. 

<img src="../img/alignmentfree_workflow.png" width="500">

### What is Salmon?

[Salmon](http://salmon.readthedocs.io/en/latest/salmon.html#using-salmon) is based on the philosophy of lightweight algorithms. These algorithms use the sequence of genes or transcripts as input (in FASTA format), and do not align the whole read. However, existing methods for transcriptome-wide abundance estimation, including both traditional, alignment-based approaches and the recently-introduced ultra-fast methods, lack sample-specific bias models rich enough to capture many of the important effects, like fragment
GC content bias, that are observed in experimental data and that can lead to, for example,unacceptable false positive rates in differential expression studies" [[1](http://salmon.readthedocs.io/en/latest/salmon.html#quasi-mapping-based-mode-including-lightweight-alignment)].
Salmon uses a quasi-mapping approach that is extremely fast at "mapping" reads to the transcriptome and often more accurate, since it is more robust to sequencing errors and natural variation [[2](http://salmon.readthedocs.io/en/latest/salmon.html#quasi-mapping-based-mode-including-lightweight-alignment)]. This quasi-mapping approach is described in more detail for the Rapmap tool [[3,4]](https://academic.oup.com/bioinformatics/article/32/12/i192/2288985/RapMap-a-rapid-sensitive-and-accurate-tool-for). Salmon  for biases commonly encountered in RNA-Seq data, such as GC bias, positional coverage biases, sequence biases at 5' and 3' ends of the fragments, fragment length distribution, and strand-specific methods. The algorithm learns the sample-specific biases and accounts for them in the transcript abundance estimates.


Similar to standard, base-to-base alignment, the quasi-mapping approach utilized by Salmon requires a reference index to determine the position and orientation information for where the fragments best "map" [[1](https://academic.oup.com/bioinformatics/article/32/12/i192/2288985/RapMap-a-rapid-sensitive-and-accurate-tool-for)].

**Step 1: Indexing:** This step involves creating an index to evaluate the sequences for all possible unique sequences of length k (kmer) in the **transcriptome** (genes/transcripts) to create an index.

**The index helps creates a signature for each transcript in our reference transcriptome.** The Salmon index has two components:

1. a suffix array (SA) of the reference transcriptome
2. a hash table to map each transcript in the reference transcriptome to it's location in the SA (is not required, but improves the speed of "mapping" drastically)

**Step 2: Quantification:** The quasi-mapping approach estimates for numbers of reads mapping to each transcript, then generates the final transcript abundance estimates after modeling sample-specific parameters and biases. 

1. Determine best mapping for each read/fragment
2. Estimate number of reads/fragments mapping to each transcript.
3. Adjust abundance estimates based on RNA-Seq biases and sample-specific parameters.

> *NOTE:* that if there are k-mers in the reads that are not in the index they are not counted. As such, trimming is not required when using this method.

As detailed in the figure below, the quasi-alignment procedure performs the following steps [[1](https://academic.oup.com/bioinformatics/article/32/12/i192/2288985/RapMap-a-rapid-sensitive-and-accurate-tool-for)]:

1. The read is scanned from left to right until a k-mer that appears in the hash table is discovered.
2. The k-mer is looked up in the hash table and the SA intervals are retrieved, giving all suffixes containing that k-mer
3. The maximal matching prefix (MMP) is identified by finding the longest read sequence that exactly matches the reference suffixes.
4. We could search for the next MMP at the position following the MMP, but often natural variation or a sequencing error in the read is the cause to the mismatch from the reference, so the beginning the search at this position would likely return the same set of transcripts. Therefore, Salmon identifies the next informative position (NIP), which is the next position in the read where the SA search is likely to return a different set of transcripts than those returned for the previous MMP.
5. This process is repeated until the end of the read.
6. The final mappings are generated by determining the set of transcripts appearing in all MMPs for the read. The transcripts, orientation and transcript location are output for each read.

<img src="../img/salmon_quasialignment.png", width=750>

>RapMap: a rapid, sensitive and accurate tool for mapping RNA-seq reads to transcriptomes. A. Srivastava, H. Sarkar, N. Gupta, R. Patro. Bioinformatics (2016) 32 (12): i192-i200.

Using the estimates of transcript abundance generated during the quasi-mapping procedure, a dual inference method is used to account for sample-specific biases and parameters. The biases are learned by one phase of the algorithm, which models the fragment-transcript assignment scores based on the following [[5](http://biorxiv.org/content/biorxiv/early/2016/08/30/021592.full.pdf)]:

- chance of observing a fragment length given a particular transcript (derived from fragment length distribution)
- chance fragment starts at particular position on transcript
- concordance of fragment orientation based on specific protocol (stranded, paired-end)
- chance fragment came from transcript based on score obtained from BAM (if BAMs were used instead of FASTQ)
- positional, sequence-specific, and GC content based on computed mappings

The model continuously learns and updates the transcript abundance estimates, and the the second phase of the algorithm refines the estimates by using the expectation maximization (EM) or variational Bayes optimization (VBEM)  [[5](http://biorxiv.org/content/biorxiv/early/2016/08/30/021592.full.pdf)]. The maximum likelihood estimates output from the EM or VBEM factorized likelihood function represent the estimated number of fragments derived from each transcript.

# Transcript-level differential expression




