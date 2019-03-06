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

The analysis of next-generation sequencing results often requires associating genes, transcripts, proteins, etc. with functional or regulatory information. To perform functional analysis on gene lists, we often need to link our genes with the associated biological processes or pathways, among other information.

## Genome builds

The annotations regarding genome features (gene, transcript, exon, etc.) is for specific builds of the genome, since the names and/or coordinate location of those features may change as the genome is updated or new information is acquired. Therefore, we need to make sure that our annotations are relevant for the genes in our gene list. You should know which **build of the genome** was used to generate your gene list and use the **same build for the annotations** during functional analysis. 

For example, if we used the GRCh38 build of the human genome to quantify gene expression used for differential expression analysis, then we should use the **same GRCh38 build** of the genome to convert between gene IDs and to identify annotations for each of the genes. 

## Databases

To access the processes, pathways, etc. for which a gene is involved, requires extracting the information from the necessary database where the information is stored. Depending on the information desired for annotations, determines the database that is queried. Examples of databases that are often queried, include:

**General databases** 

Offer comprehensive information on genome features, feature coordinates, homology, variant information, phenotypes, protein domain/family information, associated biological processes/pathways, associated microRNAs, etc.:

- **Ensembl** (use Ensembl gene IDs)
- **NCBI** (use Entrez gene IDs)
- **UCSC** 
- **EMBL-EBI**

**Annotation-specific databases**

Provide annoations related to a specific topic:

- **Gene Ontology (GO):** database of gene ontology biological processes, cellular components and molecular functions - based on Ensembl or Entrez gene IDs or official gene symbols
- **KEGG:** database of biological pathways - based on Entrez gene IDs
- **MSigDB:** database of gene sets
- **Reactome:** database of biological pathways
- **Human Phenotype Ontology:** database of genes associated with human disease
- **CORUM:** database of protein complexes for human, mouse, rat
- **...**

However, there are many other databases that are also queried depending on the information desired. 


## Tools

When performing functional analysis there are tools that extract information from these databases. Within R, there are many popular packages used for this purpose:

**Interface tools:** for accessing/querying annotations from multiple different annotation databases

- **AnnotationDbi:** queries the *OrgDb*, *TxDb*, *Go.db*, *EnsDb*, and *BioMart* annotations.  
- **AnnotationHub:** queries large collection of whole genome resources, including ENSEMBL, UCSC, ENCODE, Broad Institute, KEGG, NIH Pathway Interaction Database, etc.

**Annotation tools:** for accessing/querying annotations from different databases

- **org.*Gs*.eg.db:** these *OrgDb* annotation tools query gene feature information for the organism of interest, including gene IDs and associated GO and KEGG IDs - but unable to get previous gene build information easily
- **EnsDb.*Gspecies*.v86:** Ensembl database for transcript and gene-level information directly fetched from Ensembl API (similar to TxDb, but with filtering ability and versioned by Ensembl release) or can create using the *ensembldb* package
- **TxDb.*Gspecies*.UCSC.hg19.knownGene:** UCSC database for transcript and gene-level information or can create own *TxDb* from an SQLite database file using the *GenomicFeatures* package.
- **annotables:** easy-to-use package making gene-level feature information immediately available for the current and most recent genome builds for human/mouse
- **biomaRt:** wealth of information available by querying Ensembl's database using their [BioMart online tool](http://www.ensembl.org/biomart/martview/70dbbbe3f1c5389418b5ea1e02d89af3) - all previous genome builds and gene feature, structure, homology, variant, and sequence information available and connects to external databases; however, currently being deprecated


| Tool | Pros | Cons | Materials |
|:---:|:---|:---|:---:|
|**[org.Xx.eg.db](https://bioconductor.org/packages/release/bioc/vignettes/AnnotationDbi/inst/doc/IntroToAnnotationPackages.pdf)** | gene ID conversion, biotype and coordinate information | only latest genome build available | see below |
|**[EnsDb.Xx.vxx](http://bioconductor.org/packages/devel/bioc/vignettes/ensembldb/inst/doc/ensembldb.html)**| most up-to-date annotations, easy functions to extract features, direct filtering | more difficult to use than some packages | see below |
|**[TxDb.Xx.UCSC.hgxx.knownGene](https://bioconductor.org/packages/release/bioc/vignettes/GenomicFeatures/inst/doc/GenomicFeatures.pdf)** | feature information, easy functions to extract features | only available current and recent genome builds - can create your own, less up-to-date with annotations than Ensembl |
|**[annotables](https://github.com/stephenturner/annotables)** | super quick and easy gene ID conversion, biotype and coordinate information | only human & mouse, not updated regularly | no material available |
|**[biomaRt](https://bioconductor.org/packages/release/bioc/vignettes/biomaRt/inst/doc/biomaRt.html)** | all Ensembl database information available, all organisms on Ensembl, website & R interface | being deprecated | [link to material](https://github.com/hbctraining/Training-modules/blob/master/Ensembl-Biomart_R-based/lessons/biological_databases_Ensembl.md#ensembl-biomart) |

## AnnotationDbi

AnnotationDbi is an R package that provides an interface for connecting and querying various annotation databases using SQLite data storage. The AnnotationDbi packages can query the *OrgDb*, *TxDb*, *EnsDb*, *Go.db*, and *BioMart* annotations. There is helpful [documentation](https://bioconductor.org/packages/release/bioc/vignettes/AnnotationDbi/inst/doc/IntroToAnnotationPackages.pdf) available to reference when extracting data from any of these databases.

### org.Hs.eg.db

There are a plethora of organism-specific *orgDb* packages, such as `org.Hs.eg.db` for human and `org.Mm.eg.db` for mouse, and a list of organism databases can be found [here](../img/orgdb_annotation_databases.png). These databases are best for converting gene IDs or obtaining GO information for current genome builds, but not for older genome builds. These packages provide the current builds corresponding to the release date of the package, and update every 6 months. If a package is not available for your organism of interest, you can create your own using *AnnotationHub*.

```r
# Load libraries
library(tidyverse)
library(org.Hs.eg.db)
library(AnnotationDbi)

# Check object metadata
org.Hs.eg.db
```

We can see the metadata for the database by just typing the name of the database, including the species, last updates for the different source information, and the source urls. Note the KEGG data from this database was last updated in 2011, so may not be the best site for that information.

We can easily extract information from this database using *AnnotationDbi* with the methods: `columns`, `keys`, `keytypes`, and `select`. For example, we will use our `org.Hs.eg.db` database to acquire information, but know that the same methods work for the *TxDb*, *Go.db*, *EnsDb*, and *BioMart* annotations.

```r
# Return the Ensembl IDs for a set of genes
annotations_orgDb <- AnnotationDbi::select(org.Hs.eg.db, # database
                                     keys = sig$symbol,  # data to use for retrieval
                                     columns = c("ENSEMBL", "ENTREZID","GENENAME"), # information to retreive for given data
                                     keytype = "SYMBOL") # type of data given in 'keys' argument
```

This easily returned to us the information that we desired, but note the *warning* returned: *'select()' returned 1:many mapping between keys and columns*. This is always going to happen with converting between different gene IDs. Unless we would like to keep multiple mappings for a single gene, then we probably want to deduplicate our data before using it.

```r
# Determine the indices for the non-duplicated genes
non_duplicates_idx <- which(duplicated(annotations_orgDb$SYMBOL) == FALSE)

# Return only the non-duplicated genes using indices
annotations_orgDb <- annotations_orgDb[non_duplicates_idx, ]
```

Note that some genes were not annotated. Our dataset was created based on the GRCh37/hg19 build of the human genome, and we are annotating with the most recent build. It is possible that some of the genes have changed names, so are not present in this version of the database. We can check the number of NAs returned:

```r
# Check number of NAs returned
is.na(annotations_orgDb$ENSEMBL) %>%
  which() %>%
  length()
```

Although there will always be some attrition, using a different genome build will increase the number of genes not found. We could download the version of `org.Hs.eg.db` that corresponds to the last genome build, but that is a pain, especially when there are other annotation packages that make this process much easier.

### EnsDb.Hsapiens.v75

To generate the Ensembl annotations, the *EnsDb* database can also be easily queried using AnnotationDbi. You will need to decide the release of Ensembl you would like to query. All Ensembl releases are listed [here](http://useast.ensembl.org/index.html). We know that our data is for GRCh37, which corresponds to release 75, so we can install this release of the *EnsDb* database.

Since we are using *AnnotationDbi* to query the database, we can use the same functions that we used previously:

```r
# Load the library
library(EnsDb.Hsapiens.v75)

# Check object metadata
EnsDb.Hsapiens.v75

# Explore the fields that can be used as keys
keytypes(EnsDb.Hsapiens.v75)
```

Now we can return all gene IDs for our gene list:

```r
# Return the Ensembl IDs for a set of genes
annotations_edb <- AnnotationDbi::select(EnsDb.Hsapiens.v75,
                                           keys = sig$symbol,
                                           columns = c("GENEID", "ENTREZID","GENEBIOTYPE"),
                                           keytype = "SYMBOL")
```

Then we can again deduplicate and check for NA values:

```r
# Determine the indices for the non-duplicated genes
non_duplicates_idx <- which(duplicated(annotations_edb$SYMBOL) == FALSE)

# Return only the non-duplicated genes using indices
annotations_edb <- annotations_edb[non_duplicates_idx, ]

# Check number of NAs returned
is.na(annotations_edb$GENEID) %>%
  which() %>%
  length()
```

While we were using *AnnotationDbi* to query the Ensembl database, `AnnotationHub` and/or `ensembldb` package can also be quite helpful for extracting or filtering content from the database. Nice documentation for using [`AnnotationHub`](https://github.com/hbctraining/Training-modules/blob/master/DGE-functional-analysis/lessons/AnnotationHub.md) and [`ensembldb`](https://bioconductor.org/packages/release/bioc/vignettes/ensembldb/inst/doc/ensembldb.html) is available for more complex queries.

> **NOTE:** If using the previous genome build for human (GRCh37/hg19), the *annotables* package is a super easy annotation package to use. It is not updated frequently, so it's not great for getting the most up-to-date information for the current builds and does not have information for other organisms than human and mouse. However, it's super easy to use:
>
>```r
># Load library
>library(annotables)
>
># Access previous build of annotations
>grch37
>```

Many of the annotation packages have much more information than what we need for functional analysis, and we will be the information extracted mainly just for gene ID conversion for the different tools that we use. However, it's good to know the capabilities of the tools we use, and we encourage greater exploration of these packages as you become more familiar with them.

---
*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
