# Accessing public data

## Finding and accessing data on GEO

### Searching GEO

To search GEO for particular types of data is relatively straight forward. Once on the [GEO website](https://www.ncbi.nlm.nih.gov/geo/) there are multiple different options for searching datasets. 

<img src="../img/geo_web.png" width="500">

The most straight-forward method can be found by clicking on 'Datasets' under the 'Browse Content' column. 

<img src="../img/geo_dataset.png" width="500">

The 'Datasets' link will open the GEO Dataset Browser; click on 'Advanced Search'.

<img src="../img/geo_browser.png" width="500">

All results will appear in a new window with clickable filters on the left-hand side. You can choose the filters, such as 'Organism' (human, mouse), 'Study type' (Expression profiling by high throughput sequencing), 'publication dates' (1 year) to filter the data for the desired attributes.

<img src="../img/geo_search.png" width="500">

### Finding GEO data for a particular publication

To find data from a published paper on GEO, the paper will often provide the GEO accession number. For example, let's find the data associated with the paper, *MOV10 and FRMP regulate AGO2 association with microRNA recognition elements*. First, we can navigate to the [article](http://tinyurl.com/mov10-paper).

<img src="../img/mov10_accession.png" width="500">

Then, we can search for the term **"GEO"**; different papers have different requirements for where this information is located. In this article, it is available in a separate section entitled "Accession Numbers".

<img src="../img/mov10_accession.png" width="500">

By clicking on the GEO accession number for the experiment of interest, the GEO page for this experiment will open.

<img src="../img/mov10_geo.png" width="500">



## Using the command line to download from GEO

Once you have found the data of interest, there are various methods available for downloading the data. Often it is most useful to download large data files to directory on a high performance computing cluster (such as Odyssey or O2).

### Downloading on a cluster

Navigate the [GEO website](https://www.ncbi.nlm.nih.gov/geo/) and find the FTP site. Click on the FTP link to access all GEO data. To download the data associated with the paper, "MOV10 and FMRP Regulate AGO2 Association with MicroRNA Recognition Elements", use the GEO ID given in the paper, GSE50499.

First we navigate the FTP site to the `series/` folder, then find the `GSE50nnn/` directory and enter the `GSE50499/` folder. The data files available are in the `suppl/` directory. If we choose to download all data, we can download the entire directory

```bash
wget --recursive --no-parent ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE50nnn/GSE50499/suppl/
```

If you would prefer not to download the automatically generated `index.html` file, then another useful flag would be `-R`/`--reject`.

```bash
wget -r -np -R "index.html*" ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE50nnn/GSE50499/suppl/
```

***

**Exercises**

1. What command would we use to download all data for the [study](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE111889): 

	<img src="../img/study_exercise_head.png" width="500">
	

	>_**NOTE:** If you wanted to unpack the `.tar` file and decompress the `.gz` files, you could use the following commands:_
>
>```bash
>tar -xvf GSE111889_RAW.tar 
>
>for all in *.gz; do gunzip $all; done
>```


2. How would you download the associated metadata?


***

### Downloading on a local computer

On a Mac or using GitBash on Windows, the following will work to download individual files:

```bash
curl -O ftp://ftp.ncbi.nlm.nih.gov/geo/series/GSE50nnn/GSE50499/suppl/GSE50499_GEO_Ceman_counts.txt.gz
```

Unfortunately, we cannot download folders with `curl`, and `wget` is not automatically available to use on these operating systems. However, for MacOS, the [Homebrew package manager](https://brew.sh/) is a wonderful way to install programs/commands that may not be installed on your operating system, such as `wget`.
