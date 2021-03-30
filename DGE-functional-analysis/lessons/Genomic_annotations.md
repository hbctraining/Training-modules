---
title: "Genomic annotations"
author: "Mary Piper, Meeta Mistry, Radhika Khetani, Jihe Liu"
date: "March 29th, 2021"
---

Approximate time: 30 minutes

Learning Objectives:
-------------------

* Utilize genomic annotation databases to perform functional analysis on gene lists
* Understand the types of information stored in different databases 
* Explore the pros and cons of several popular R packages for retrieval of genomic annotations

# Genomic annotations

The analysis of next-generation sequencing results requires associating genes, transcripts, proteins, etc. with functional or regulatory information. To perform functional analysis on gene lists, we often need to obtain gene identifiers that are compatible with the tools we wish to use and this is not always trivial. Here, we discuss **ways in which you can obtain gene annotation information and some of the advantages and disadvantages of each method**.

## Databases

We retrieve information on the processes, pathways, etc. (for which a gene is involved in) from the necessary database where the information is stored. The database you choose will be dependent on what type of information you are trying to obtain. Examples of databases that are often queried, include:

**General databases** 

Offer comprehensive information on genome features, feature coordinates, homology, variant information, phenotypes, protein domain/family information, associated biological processes/pathways, associated microRNAs, etc.:

- **Ensembl** (use Ensembl gene IDs)
- **NCBI** (use Entrez gene IDs)
- **UCSC** 
- **EMBL-EBI**

**Annotation-specific databases**

Provide annotations related to a specific topic:

- **Gene Ontology (GO):** database of gene ontology biological processes, cellular components and molecular functions - based on Ensembl or Entrez gene IDs or official gene symbols
- **KEGG:** database of biological pathways - based on Entrez gene IDs
- **MSigDB:** database of gene sets
- **Reactome:** database of biological pathways
- **Human Phenotype Ontology:** database of genes associated with human disease
- **CORUM:** database of protein complexes for human, mouse, rat
- **...**

This is by no means an exhaustive list, there are many other databases available that are not listed here.

## Genome builds

Before you begin your search through any of these databases, you should know which **build of the genome** was used to generate your gene list and make sure you use the **same build for the annotations** during functional analysis. When a new genome build is acquired, the names and/or coordinate location of genomic features (gene, transcript, exon, etc.) may change. Therefore, the annotations regarding genome features (gene, transcript, exon, etc.) is genome-build specific  and we need to make sure that our annotations are obtained from the appropriate resource. 

For example, if we used the GRCh38 build of the human genome to quantify gene expression used for differential expression analysis, then we should use the **same GRCh38 build** of the genome to convert between gene IDs and to identify annotations for each of the genes. 


## Tools for accessing databases

Within R, there are many popular packages used for gene/transcript-level annotation. These packages provide tools that take the list of genes you provide and retrieve information for each gene using one or more of the databases listed above.

### Annotation tools: for accessing/querying annotations from a specific databases


| Tool | Description | Pros | Cons |
|:---:|:---|:---|:---:|
|**[org.Xx.eg.db](https://bioconductor.org/packages/release/bioc/vignettes/AnnotationDbi/inst/doc/IntroToAnnotationPackages.pdf)** | Query gene feature information for the organism of interest | gene ID conversion, biotype and coordinate information | only latest genome build available |
|**[EnsDb.Xx.vxx](http://bioconductor.org/packages/devel/bioc/vignettes/ensembldb/inst/doc/ensembldb.html)**| Transcript and gene-level information directly fetched from Ensembl API (similar to TxDb, but with filtering ability and versioned by Ensembl release) | easy functions to extract features, direct filtering | Not the most up-to-date annotations, more difficult to use than some packages |
|**[TxDb.Xx.UCSC.hgxx.knownGene](https://bioconductor.org/packages/release/bioc/vignettes/GenomicFeatures/inst/doc/GenomicFeatures.pdf)** | UCSC database for transcript and gene-level information or can create own *TxDb* from an SQLite database file using the *GenomicFeatures* package | feature information, easy functions to extract features | only available current and recent genome builds - can create your own, less up-to-date with annotations than Ensembl |
|**[annotables](https://github.com/stephenturner/annotables)** | Gene-level feature information immediately available for the human and model organisms | super quick and easy gene ID conversion, biotype and coordinate information | static resource, not updated regularly | 
|**[biomaRt](https://bioconductor.org/packages/release/bioc/vignettes/biomaRt/inst/doc/biomaRt.html)** | An R package version of the Ensembl [BioMart online tool](http://www.ensembl.org/biomart/martview/70dbbbe3f1c5389418b5ea1e02d89af3)  | all Ensembl database information available, all organisms on Ensembl, wealth of information |  |


### Interface tools: for accessing/querying annotations from multiple different annotation sources

- **AnnotationHub:** queries large collection of whole genome resources, including ENSEMBL, UCSC, ENCODE, Broad Institute, KEGG, NIH Pathway Interaction Database, etc.
- **AnnotationDbi:** queries the *OrgDb*, *TxDb*, *Go.db*, *EnsDb*, and *BioMart* annotations.  


## AnnotationHub

The AnnotationHub package provides a client interface to resources stored at the AnnotationHub web service. It allows you to query most of the large databases we noted above, directly within your RStudio window. While we won't be talking about it in this lesson, we have [materials linked here](AnnotationHub.md) if you are interested in exploring it on your own.

## AnnotationDbi

AnnotationDbi is an R package that provides an interface for connecting and querying various annotation databases using SQLite data storage. The AnnotationDbi package provides an interface to query the annotation resources that are available as Bioconductor packages (i.e. *OrgDb*, *TxDb*, *EnsDb*, *Go.db*, and *BioMart*) In this lesson, we will be going through examples of two different databases. For extracting data from any of the other databases not covered here we encourage you to peruse this [helpful documentation](https://bioconductor.org/packages/release/bioc/vignettes/AnnotationDbi/inst/doc/IntroToAnnotationPackages.pdf).

### org.Hs.eg.db

There are a plethora of organism-specific *orgDb* packages, such as `org.Hs.eg.db` for human and `org.Mm.eg.db` for mouse, and a list of organism databases can be found [here](https://www.bioconductor.org/packages/release/BiocViews.html#___OrgDb). These databases are best for converting gene IDs or obtaining GO information for **current genome builds**, but not for older genome builds. These packages provide the current builds corresponding to the release date of the package, and update every 6 months. If a package is not available for your organism of interest, you can create your own using *AnnotationHub*.

```r
# Load libraries
library(org.Hs.eg.db)
library(AnnotationDbi)

# Check object metadata
org.Hs.eg.db
```

We can see the metadata for the database by just typing the name of the database, including the species, last updates for the different source information, and the source urls. Note the KEGG data from this database was last updated in 2011, so may not be the best site for that information.

```r
OrgDb object:
| DBSCHEMAVERSION: 2.1
| Db type: OrgDb
| Supporting package: AnnotationDbi
| DBSCHEMA: HUMAN_DB
| ORGANISM: Homo sapiens
| SPECIES: Human
| EGSOURCEDATE: 2019-Jul10
| EGSOURCENAME: Entrez Gene
| EGSOURCEURL: ftp://ftp.ncbi.nlm.nih.gov/gene/DATA
| CENTRALID: EG
| TAXID: 9606
| GOSOURCENAME: Gene Ontology
| GOSOURCEURL: http://current.geneontology.org/ontology/go-basic.obo
| GOSOURCEDATE: 2020-05-02
| GOEGSOURCEDATE: 2019-Jul10
| GOEGSOURCENAME: Entrez Gene
| GOEGSOURCEURL: ftp://ftp.ncbi.nlm.nih.gov/gene/DATA
| KEGGSOURCENAME: KEGG GENOME
| KEGGSOURCEURL: ftp://ftp.genome.jp/pub/kegg/genomes
| KEGGSOURCEDATE: 2011-Mar15
| GPSOURCENAME: UCSC Genome Bioinformatics (Homo sapiens)
| GPSOURCEURL: 
| GPSOURCEDATE: 2020-Jan28
| ENSOURCEDATE: 2019-Dec11
| ENSOURCENAME: Ensembl
| ENSOURCEURL: ftp://ftp.ensembl.org/pub/current_fasta
| UPSOURCENAME: Uniprot
| UPSOURCEURL: http://www.UniProt.org/
| UPSOURCEDATE: Wed May  6 17:35:54 2020

```

We can easily extract information from this database using *AnnotationDbi* with the methods: `columns`, `keys`, `keytypes`, and `select`. For example, we will use our `org.Hs.eg.db` database to acquire information, but know that the same methods work for the *TxDb*, *Go.db*, *EnsDb*, and *BioMart* annotations.

```r
# Return the Ensembl IDs for a set of genes
annotations_orgDb <- AnnotationDbi::select(org.Hs.eg.db, # database
                                     keys = res_tableOE_tb$gene,  # data to use for retrieval
                                     columns = c("ENSEMBL", "ENTREZID","GENENAME"), # information to retreive for given data
                                     keytype = "SYMBOL") # type of data given in 'keys' argument
```

This easily returned to us the information that we desired, but note the *warning* returned: *'select()' returned 1:many mapping between keys and columns*. We can check our data to see how many duplicate gene entries were returned to us.

```r
which(duplicated(annotations_orgDb$SYMBOL))  %>%
  length()
```
**Why are there so many duplicates?** 

Well, let's take a look at an example. If you search for the gene symbol AATF in `annotations_orgDb`, you will see an example of a duplicated gene. You can see that all fields of information are identical for both, except for the Ensembl ID. One gene maps to [ENSG00000275700](http://useast.ensembl.org/Homo_sapiens/Gene/Summary?db=core;g=ENSG00000275700;r=17:36948925-37056871) and ther maps to [ENSG00000276072](https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000276072;r=CHR_HSCHR17_7_CTG4:36950708-37058704). The difference is that the first one is a mapping to the primary assembly, whereas the second is a mapping that is a result of a novel patch sequence providing alternate alleles. There are also fix patches and pseduogenes that can contribute to the duplicates. 

We don't have time to go through each one individually, and so for these duplicates we will just keep the first mapping. 

```r
# Determine the indices for the non-duplicated genes
non_duplicates_idx <- which(duplicated(annotations_orgDb$SYMBOL) == FALSE)

# Return only the non-duplicated genes using indices
annotations_orgDb <- annotations_orgDb[non_duplicates_idx, ]
```

Note that there also some genes that have NA values in each of the columns. These are genes that were not annotated. 

```r
# Check number of NAs returned
is.na(annotations_orgDb$ENSEMBL) %>%
  which() %>%
  length()
```

**Wait, why would there be genes that have a gene symbol but no ID associated with it?**

It's because we are not using a genome build that matches the build used as our reference during the analysis! Our dataset was created based on the GRCh37/hg19 build of the human genome, and orgDb only uses the most current build GRCh38. It is possible that some of the genes have changed names, so are not present in this version of the database. **It is so important to be consistent with your genome build throughout the entire analysis.** To obtain the correct set of annotations we will use the EnsDb database.

### EnsDb.Hsapiens.v75

To generate the Ensembl annotations for a specifc build, the *EnsDb* database can also be easily queried using AnnotationDbi. You will need to decide the release of Ensembl you would like to query and have that package installed. All Ensembl releases are listed [here](http://useast.ensembl.org/info/website/archives/index.html). We know that our data is for GRCh37, which corresponds to release 75, so we can install this release of the *EnsDb* database.

After loading the library we can take a look at the database as we had done previously:

```r
# Load the library
library(EnsDb.Hsapiens.v75)

# Check object metadata
EnsDb.Hsapiens.v75

# Explore the fields that can be used as keys
keytypes(EnsDb.Hsapiens.v75)
```

Using *AnnotationDbi* to query the database, we can use the same `select` function to return all gene IDs for our gene list. Note that the column names differ slightly to match what is stored in the database.

```r
# Return the Ensembl IDs for a set of genes
annotations_edb <- AnnotationDbi::select(EnsDb.Hsapiens.v75,
                                           keys = res_tableOE_tb$gene,
                                           columns = c("GENEID", "ENTREZID","GENEBIOTYPE"),
                                           keytype = "SYMBOL")
```

Now, if we check for duplicates, we see that there are still many instances of one-to-many mappings.

```r

# Check number of duplicates returned
which(duplicated(annotations_edb$SYMBOL))  %>%
  length()
```

We can remove these entries, keeping only one of the duplicates:

```r
# Determine the indices for the non-duplicated genes
non_duplicates_idx <- which(duplicated(annotations_edb$SYMBOL) == FALSE)

# Return only the non-duplicated genes using indices
annotations_edb <- annotations_edb[non_duplicates_idx, ]
```

There are fewer genes in this dataframe than the one returned using OrgDb. Do we still have gene symbols with no annotations?

```r
# Check number of NAs returned
is.na(annotations_edb$GENEID) %>%
  which() %>%
  length()
```

You should notice that we no longer have those NA entries. By using the correct build for annotation we ensure that genes get properly mapped to the identifiers.

Many of the annotation packages have much more information than what we need for functional analysis, and we will be using the information extracted mainly just for gene ID conversion for the different tools that we use. However, it's good to know the capabilities of the tools we use, and we encourage greater exploration of these packages as you become more familiar with them.

---
*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
