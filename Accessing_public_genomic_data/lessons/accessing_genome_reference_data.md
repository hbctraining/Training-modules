# Reference Data

During an NGS experiment, the sequences in the raw FASTQ files, or sequence reads, need to be mapped or aligned to the reference genome to determine from where these sequences originated. Therefore, we need a reference genome (in FASTA format) in which to align our sequences. In addition, many NGS methods require knowing where known genes or exons are located on the genome in order to quantify the number of reads aligning to different genome features, such as exons, introns, transcription start sites, etc. These analyses require reference data containing specific information about genomic coordinates of various
genomic “features”, such as gene annotation files (in GTF, GFF, etc. formats). 

To download reference data, there are a few different sources available:

- **General biological databases:** Ensembl, NCBI, UCSC, EMBL-EBI, DDBJ, etc.
- **Organism-specific biological databases:** Flybase, Wormbase, etc. (often updated more frequently, so may be more comprehensive)
- **Reference data collections:** Illumina's iGenomes
- **Local access:** shared databases on FAS Odyssey cluster or HMS O2 cluster

## General biological databases: Ensembl

#### Overview
[*Ensembl*](http://useast.ensembl.org/index.html) provides a website that acts as a **single point of access to annotated genomes** for vertebrate species. 

![ensembl_homepage](../img/ensembl_interface.png)

- **Searching Ensembl**:  Look for a gene, location, variant and more using the search box on the homepage or the box that is provided in the top right corner of any Ensembl page.

	- a gene name (for example, BRCA2) - best to use the official gene symbols ([HGNC](http://www.genenames.org))
	- a UniProt accession number (for example, P51587)
	- a disease name (for example, coronary heart disease)
	- a variation (for example, rs1223)
	- a location - a genomic region (for example, rat X:100000..200000)
	- a PDB ID or a Gene Ontology (GO) term

	Most search results will take you to the appropriate Ensembl view through a results page. If you search using a location you will be directed straight to the location tab (this tab provides a view of a region of a genome). These pages will allow you to **download information/sequences for specific genes/transcripts/exons/variants**.

- **Browse a Genome**: Choose your species of interest in this section. The drop down menu under 'All genomes' allows you to select from the full list. The *Ensembl Pre!* site contains new genomes (either new species to Ensembl, or updates in the reference assembly) that do not yet have an Ensembl gene set.  BLAST/BLAT is available for organisms in all Ensembl sites, including Pre!

- **Help**: There is a wealth of help and documentation in Ensembl if you are new to the browser. Video tutorials are provided and printable pdfs with exercises. Custom data may be uploaded to Ensembl or displayed directly by attaching a file by URL. 

- **News**: To find out what genome build and release you are working with, have a look at the news section of the homepage. If the current release is not the one you need, access archive sites to access previous versions, or releases, of Ensembl using the link on the lower right side.
 
While we are not going to explore the Ensembl database in this workshop, we have [materials available](https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/sessionIII/lessons/10_Ensembl_biomart.html) if you wish to explore on your own.

When using Ensembl, note that it uses the following format for naming biological components:
	
- **ENSG###########:**	Ensembl Gene ID
- **ENST###########:**	Ensembl Transcript ID
- **ENSP###########:**	Ensembl Peptide ID
- **ENSE###########:**	Ensembl Exon ID
	
For non-human species a suffix is added:

- **ENSMUSG###:** MUS (Mus musculus) for mouse 
- **ENSDARG###:** DAR (Danio rerio) for zebrafish: 
	
## Finding and accessing reference data on Ensembl

# iGenomes

## Finding and accessing reference data on iGenomes
- shared_databases

# Flybase

## Finding and accessing reference data on Flybase
