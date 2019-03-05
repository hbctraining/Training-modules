---
title: "Genomic annotations"
author: "Mary Piper"
date: "Monday, March 4th, 2019"
---

Approximate time: 30 minutes

Learning Objectives:
-------------------

* Utilize genomic annotation databases to perform functional analysis on gene lists
* Understand the types of information stored in different databases 
* Explore the pros and cons of several popular R packages for retrieval of genomic annotations

# Genomic annotations

The analysis of next-generation sequencing results often requires associating genes, transcripts, proteins, etc. with functional or regulatory information. To perform RNA-seq functional analysis, we need to link our genes with the associated biological processes or pathways, among other information.

To access the processes, pathways, etc. for which a gene is involved, requires extracting the information from the necessary database where the information is stored. 

## Databases

Depending on the information desired for annotations, determines the database that is queried. Examples of databases that are often queried, include:

**General databases** 

Offer comprehensive information on genes and gene products

- **Ensembl** (use Ensembl gene IDs)
- **NCBI** (use Entrez gene IDs)
- **UCSC** 
- **EMBL-EBI**

**Annotation-specific databases**

- **Gene Ontology (GO):** database of gene ontology biological processes, cellular components and molecular functions - based on Ensembl or Entrez gene IDs or official gene symbols
- **KEGG:** database of biological pathways - based on Entrez gene IDs
- **MSigDB:** database of gene sets
- **Reactome:** database of biological pathways
- **Human Phenotype Ontology:** database of genes associated with human disease
- **CORUM:** database of protein complexes for human, mouse, rat
- **...**

However, there are many other databases that are also queried depending on the information desired. 

## Genome builds

The annotation information is for specific builds of the genome. Therefore, we need to make sure that our annotations are relevant for the genes in our gene list. You should know which **build of the genome** was used to generate your gene list and use the same build for the annotations during functional analysis. 

For example, if we used the GRCh38 build of the genome to quantify gene expression used for differential expression analysis, then we should use the **same GRCh38 build** of the genome to convert between gene IDs and to identify annotations for each of the genes.

## Tools

When performing functional analysis there are tools that extract information from these databases. Within R, there are many popular packages used for this purpose:

**Interface tools:** for accessing/querying annotations from multiple different annotation tools

- **AnnotationHub:** queries large collection of whole genome resources, including ENSEMBL, UCSC, ENCODE, Broad Institute, KEGG, NIH Pathway Interaction Database, etc.
- **AnnotationDbi:** queries the *OrgDb*, *TxDb*, *Go.db*, and *BioMart* annotations.  

**Annotation tools:** for accessing/querying annotations from different databases

- **org.*Gs*.eg.db:** these *OrgDb* annotation tools query gene feature information for the organism of interest, including gene IDs and associated GO and KEGG IDs - but unable to get previous gene build information easily
- **annotables:** easy-to-use package making gene-level feature information immediately available for the current and most recent genome builds for human/mouse
- **biomaRt:** wealth of information available by querying Ensembl's database using their [BioMart online tool](http://www.ensembl.org/biomart/martview/70dbbbe3f1c5389418b5ea1e02d89af3) - all previous genome builds and gene feature, structure, homology, variant, and sequence information available and connects to external databases; however, currently being deprecated
- **TxDb.*Gspecies*.UCSC.hg19.knownGene:** UCSC database for transcript and gene-level information or can create own *TxDb* from an SQLite database file using the *GenomicFeatures* package.
- **EnsDb.*Gspecies*.v86:** Ensembl database for transcript and gene-level information directly fetched from Ensembl API (similar to TxDb, but with filtering ability and versioned by Ensembl release not genome build) or can create using the *ensembldb* package

| Tool | Pros | Cons | Materials |
|:---:|:---|:---|:---:|
|**[biomaRt](https://bioconductor.org/packages/release/bioc/vignettes/biomaRt/inst/doc/biomaRt.html)** | all Ensembl database information available, all organisms on Ensembl, website & R interface | being deprecated | [link to material](https://github.com/hbctraining/Training-modules/blob/master/Ensembl-Biomart_R-based/lessons/biological_databases_Ensembl.md#ensembl-biomart) |
|**[annotables](https://github.com/stephenturner/annotables)** | super quick and easy gene ID conversion, biotype and coordinate information | only human & mouse, not updated regularly | no material available |
|**[org.Xx.eg.db](https://bioconductor.org/packages/release/bioc/vignettes/AnnotationDbi/inst/doc/IntroToAnnotationPackages.pdf)** | gene ID conversion, biotype and coordinate information | only latest genome build available | see below |
|**[TxDb.Xx.UCSC.hgxx.knownGene](https://bioconductor.org/packages/release/bioc/vignettes/GenomicFeatures/inst/doc/GenomicFeatures.pdf)** | feature information, easy functions to extract features | only available current and recent genome builds, but can create your own |
|**[EnsDb.Xx.v86](http://bioconductor.org/packages/devel/bioc/vignettes/ensembldb/inst/doc/ensembldb.html)**| most up-to-date annotations, easy functions to extract features, direct filtering | | |



## AnnotationDbi

AnnotationDbi is an R package that provides an interface for connecting and querying various annotation databases using SQLite data storage. The AnnotationDbi packages can query the *OrgDb*, *TxDb*, Go.db, and BioMart annotations.  

## org.Xx.eg.db

There are a plethora of organism-specific *orgDb* packages, such as `org.Hs.eg.db` for human and `org.Mm.eg.db` for mouse, and a list of organism databases can be found [here](../img/orgdb_annotation_databases.png). These databases are best for converting gene IDs or obtaining GO information, but not for positional information or build-specific information since it can be difficult to access this information for older genome builds. These packages provide the current builds corresponding to the release date of the package, and update every 6 months. 

## 