AnnotationHub is a wonderful resource for accessing genomic data or querying large collection of whole genome resources, including ENSEMBL, UCSC, ENCODE, Broad Institute, KEGG, NIH Pathway Interaction Database, etc. All of this information is stored and easily accessible by directly connecting to the database.

To get started with AnnotationHub, we can load the library and connect:

```r
# Load libraries
library(AnnotationHub)
library(ensembldb)

# Connect to AnnotationHub
ah <- AnnotationHub()
```

To see the types of information stored inside, we can just type the name of the object:

```r
# Explore the AnnotationHub object
ah
```

Using the output, you can get an idea of the information that you can query within the AnnotationHub object:

```
AnnotationHub with 47474 records
# snapshotDate(): 2018-10-24 
# $dataprovider: BroadInstitute, Ensembl, UCSC, ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/, Haemcode, Inparanoid8, FungiDB, ...
# $species: Homo sapiens, Mus musculus, Drosophila melanogaster, Bos taurus, Pan troglodytes, Rattus norvegicus, Danio ...
# $rdataclass: GRanges, BigWigFile, FaFile, TwoBitFile, OrgDb, Rle, ChainFile, EnsDb, Inparanoid8Db, TxDb
# additional mcols(): taxonomyid, genome, description, coordinate_1_based, maintainer, rdatadateadded,
#   preparerclass, tags, rdatapath, sourceurl, sourcetype 
# retrieve records with, e.g., 'object[["AH2"]]' 

            title                                               
  AH2     | Ailuropoda_melanoleuca.ailMel1.69.dna.toplevel.fa   
  AH3     | Ailuropoda_melanoleuca.ailMel1.69.dna_rm.toplevel.fa
  AH4     | Ailuropoda_melanoleuca.ailMel1.69.dna_sm.toplevel.fa
  AH5     | Ailuropoda_melanoleuca.ailMel1.69.ncrna.fa          
  AH6     | Ailuropoda_melanoleuca.ailMel1.69.pep.all.fa        
  ...       ...                                                 
  AH67895 | org.Vibrio_vulnificus.eg.sqlite                     
  AH67896 | org.Achromobacter_group_B.eg.sqlite                 
  AH67897 | org.Achromobacter_group_E.eg.sqlite                 
  AH67898 | org.Pannonibacter_phragmitetus.eg.sqlite            
  AH67899 | org.Salinispora_arenicola_CNS-205.eg.sqlite
  ```
  
Notice the note on retrieving records with `object[[AH2]]` - this will be how we can extract a single record from the AnnotationHub object.
  
If you would like to see more information about any of the classes of data you can extract that information as well. For example, if you wanted to determine all species information available, you could subset the AnnotationHub object:
  
```r
# Explore all species information available
unique(ah$species)
```
  
Now that we know the types of information available from AnnotationHub we can query it for the information we want using the `query()` function. Let's say we would like to return the Ensembl `EnsDb` information for the mouse. To return the records available, we need to use the terms as they are output from the `ah` object to extract the desired data.
  
```r
# Query AnnotationHub
mouse_ens <- query(ah, c("Mus musculus", "EnsDb"))
```

The output for the `EnsDb` objects only goes back in time to Ensembl release 87, corresponding to 2016, after the prior mouse genome build. If you need a build of a genome that was output prior to 2016, you might need to load the `EnsDb` package if available for that release, or you might need to build your own with `ensembldb`.

Often we are looking for the latest Ensembl release so that the annotations are the most up-to-date. To extract this information from AnnotationHub, we can use the AnnotationHub ID to subset the object:

```r
# Extract annotations of interest
mouse_ens <- mouse_ens[["AH64944"]]
```

Now we can use `ensembldb` functions to extract the information at the gene, transcript, or exon levels. We are interested in the gene-level annotations, so we can extract that information as follows:

```r
# Extract gene-level information
annotations <- genes(mouse_ens, return.type = "data.frame")
```
But note that it is just as easy to get the transcript- or exon-level information:

```r
# Extract transcript-level information
transcripts(mouse_ens)

# Extract exon-level information
exons(mouse_ens)
```
