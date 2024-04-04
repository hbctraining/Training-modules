---
title: "awk"
author: "Emma Berdan, Will Gammerdinger"
---


## What is awk?

If you have ever looked up how to do a particular string manipulation using bash in [stackoverflow](https://stackoverflow.com/) or [biostars](https://www.biostars.org/) then you have probably seen someone give an `awk` command as a potential solution. 

`awk` is an interpreted programming language designed for text processing and typically used as a data extraction and reporting tool and was especially designed to support one-liner programs. You will often see the phrase "awk one-liner". `awk` was created at Bell Labs in the 1970s and `awk` comes from from the surnames of its authors: Alfred **A**ho, Peter **W**einberger, and Brian **K**ernighan. Because the name comes from initials you will often see it written as `AWK`. `awk` shares a common history with `sed` and even `grep` dating back to `ed`. As a result, some of the syntax and functionality can be a bit familiar at times. 

## I already know grep and sed, why should I learn awk?

`awk` can be seen as an intermediate between `grep` and `sed` and more sophisticated approaches. 

```
The Enlightened Ones say that...

You should never use C if you can do it with a script;
You should never use a script if you can do it with awk;
Never use awk if you can do it with sed;
Never use sed if you can do it with grep.
```
[Text source]([http://awk.info/?whygawk](https://web.archive.org/web/20160324050308/http://awk.info/?whygawk))

This is best understood if we start with `grep` and work our way up. We will use these tools on a complex file we have been given, `animal_observations.txt`. 

This file came to be when a park ranger named Parker asked rangers at other parks to make monthly observations of the animals they saw that day. All of the other rangers sent Parker comma separated lists and he collated them into the following file:

```
Date	Yellowstone	Yosemite	Acadia	Glacier
1/15/01	bison,elk,coyote	mountainlion,coyote	seal,beaver,bobcat	couger,grizzlybear,elk
2/15/01	pronghorn	blackbear,deer	moose,hare	otter,deer,mountainlion
3/15/01	cougar,grizzlybear	fox,coyote,deer	deer,skunk	beaver,elk,lynx
4/15/01	moose,bison	bobcat,coyote	blackbear,deer	mink,wolf
5/15/01	coyote,deer	blackbear,marmot	otter,fox	deer,blackbear
6/15/01	pronghorn	coyote,deer	mink,deer	bighornsheep,deer,otter
7/15/01	cougar,grizzlybear	fox,coyote,deer	seal,porpoise,deer	beaver,otter
8/15/01	moose,bison	bobcat,coyote	hare,fox	lynx,coyote
9/15/01	blackbear,lynx,coyote	coyote,deer	seal,porpoise,deer	elk,deer
10/15/01	beaver,bison,wolf	marmot,coyote	coyote,seal,skunk	mink,wolf
11/15/01	bison,elk,coyote	marmot,fox	deer,skunk	moose,blackbear
12/15/01	crane,beaver,blackbear	mountainlion,coyote	mink,deer	bighornsheep,beaver
1/15/02	moose,bison	coyote,deer	coyote,seal,skunk	couger,grizzlybear,elk
2/15/02	cougar,grizzlybear	marmot,fox	otter,fox	mountaingoat,deer,elk
3/15/02	beaver,bison,wolf	blackbear,deer	moose,hare	mountainlion,bighornsheep
4/15/02	pronghorn	fox,coyote,deer	deer,skunk	couger,grizzlybear,elk
5/15/02	coyote,deer	blackbear,marmot	hare,fox	mink,wolf
6/15/02	crane,beaver,blackbear	bobcat,coyote	seal,porpoise,deer	elk,deer
7/15/02	bison,elk,coyote	marmot,fox	coyote,seal,skunk	couger,grizzlybear,elk
8/15/02	cougar,grizzlybear	blackbear,marmot	blackbear,deer	mountaingoat,deer,elk
9/15/02	moose,bison	coyote,deer	hare,fox	elk,deer
10/15/02	beaver,bison,wolf	mountainlion,coyote	deer,skunk	bighornsheep,beaver
11/15/02	moose,bison	blackbear,marmot	mink,deer	couger,grizzlybear,elk
12/15/02	coyote,deer	fox,coyote,deer	moose,hare	moose,blackbear
```

We see the date of observation and then the animals observed at each of the 5 parks. Each column is separated by a tab. 

* You can find Parker's file in your `advanced_shell` directory, it is called animal_observations.txt.

So let's say that we want to know how many dates a cougar was observed at any of the parks. We can easily use `grep` for that:

```bash
grep "cougar" animal_observations.txt
```
When we do that 4 lines pop up, so 4 dates. We could also pipe to wc to get a number:

```bash
grep "cougar" animal_observations.txt | wc -l
```

There seemed to be more instances of cougar though. Four seems low compared to what we saw when glancing at the document. If we look at the document again, we can see that the park ranger from Glacier National Park cannot spell and put "couger" instead of "cougar". 

Replacing those will be a bit hard with `grep` but we can use `sed` instead!

```bash
sed 's/couger/cougar/g'  animal_observations.txt > animal_observations_edited.txt
```

We are telling `sed` to replace all versions of couger with cougar and output the results to a new file called animal_observations_edited.txt. If we rerun our `grep` command we can see that we now have 9 line (dates) instead of 4. 

So far so good. But let's now say that we want to know how many times a coyote was observed at Yosemite Park (ignoring all other parks) without editing our file...

While this is *possible* with `grep` it is actually easier to do with `awk`!


## Basics of `awk`

Before we dive too deeply into `awk` we need to define two terms that `awk` will use a lot:

- ***Field*** - This is a column of data
- ***Record*** - This is a row of data 

For our first `awk` command let's mimic what we just did with `grep`. To pull all instances of coyote from animal_observations_edited.txt using `awk`:

```bash
awk '/coyote/' animal_observations_edited.txt
```

here '/coyote/' is the pattern we want to match and **since we have not told `awk` anything else it performs it's default behavior which is to print the matched lines**.

but we only care about coyotes from Yosemite Park! How do we do that?

```bash
awk '$3 ~ /coyote/' animal_observations_edited.txt
```

Let's break this down!

* First all `awk` commands are always encased in `` so whatever you are telling `awk` to do needs to be inbetween those.

* We want to look at column 3 (the Yosemite observations) in particular. The columns are separated (defined) by white space (one or more consecutive blanks) or tabulator and denoted by the $ sign. So `$1` is the value of the first column, `$2` - second etc. $0 contains the original line including the separators.

* The tilde is..???

* In column 3 (the Yosemite observations) we are asking for lines where the string "coyote" is present. We recognize the '/string/' part from our previous command. 

As we run this command we see that the output is super messy because Parker's original file is a bit of a mess. This is because the default behavior of `awk` is to print all matching lines. It is hard to even check if the command did the right thing. However, we can ask `awk` to only print the Yosemite column and the date (columns 1 and 3):


```bash
awk '$3 ~ /coyote/ {print $1,$3}' animal_observations_edited.txt
```

This shows a great feature of `awk`, chaining commands. The print command within the {} will ONLY be executed when the first criteria is met. 

We now know basic `awk` syntax:

```
awk ' /pattern/ {action} ' file1 file2 ... fileN
```

A few things to note before you try it yourself!

> * The full awk command is encased in single quotes ''
> * The action is performed on every line that matches the pattern.  
> * If a pattern is not provided, the action is performed on every line of the file.  
> * If an action is not provided, then all lines matching the pattern are printed (we already knew this one!)  
> * Since both patterns and actions are optional, actions must be enclosed in curly brackets to distinguish them from patterns.  

****

**Exercise**

Can you print all of the times a seal was observed in Acadia Park? Did you print it the messy or neat way?

<details>
        <summary><i>Click here for the answer</i></summary>

        messy way: awk '$4 ~ /seal/' animal_observations_edited.txt
        neat way: awk '$4 ~ /seal/ {print $1,$4}' animal_observations_edited.txt
        
</details>

Were seals ever observed in any of the other parks, note that `||` is or in awk (hint: There are multiple ways to answer this question!)? Get creative!


<details>
        <summary><i>Click here for the answer</i></summary>
        Some options:

        
        awk '{print $1,$2,$3,$5}' animal_observations_edited.txt | grep "seal"
        awk '$2 ~ /seal/ || $3 ~ /seal/|| $5 ~ /seal/' animal_observations_edited.txt
        Seals are only ever observerd in Arcadia.
        
</details>

## Comment-Upen: Both options above doesnot print anything on my laptop.

****

Before we move on, it is sometimes helpful to know that regular text can be added to `awk` print commands. For example we can modify our earlier command to be:

```bash
awk '$3 ~ /coyote/ {print "On this date coyotes were observed in Yosemite Park", $1}' animal_observations_edited.txt
```

Did you notice what was modified from the previous command besides the addition of the string "On this date coyotes were observed in Yosemite Park"?

## `awk` predefined variables

Before we continue our `awk` journey we want to introduce you to some of the `awk` predefined variables. Although there are more than just the ones we cover, these are the most helpful to start. More can be found [here](https://www.gnu.org/software/gawk/manual/html_node/Built_002din-Variables.html)

* NR - The number of records processed (i.e., rows)
* FNR - The number of record processed in the current file. This is only needed if you give `awk` multiple files.  For the first file FNR==NR, but for the second FNR will restart from 1 while NR will continue to increment.
* NF - Number of fields in current record (i.e. columns in the row)
* FILENAME - name of current input file
* FS - Field separator which is space or TAB by default

NR is particularly useful for skipping records (i.e., rows). For example, if we only care about coyotes observed in 2002 and not 2001 we can skip the records 1-13 of `animal_observations_edited.txt`.

```bash
awk 'NR>13 && $3 ~ /coyote/ {print $1,$3}' animal_observations_edited.txt
```
Because we have given two patterns to match (record greater than 13 and column 3 containing the string coyote) we need to put '&&' in between them to note that we need both fulfilled.

You have probably already noticed that Parker's file contains both comma separated fields and tab separated fields. This is no problem for `awk` if we denote the FS variable. Let's use both FS and NF to print the total number of kinds animals observed in all the parks. Note that we will not delete duplicates (i.e., if coyotes are observed in both Yosemite and Acadia we will consider it to be 2 instead of 1).

```bash
awk -F '[[:blank:],]' '{print NF}' animal_observations_edited.txt
```

This is more complex than anything else we have done so let's break it down:

* First, you might be curious why we are using -F instead of -FS. FS represents the field separator and to CHANGE it we use -F. We can think of it as -F 'FS'. Here we have to do a bit of regex magic where we accept any white space or commas. Although understanding this regex is beyond this module, we include it here as many NGS formats include multiple kinds of field separators (e.g., VCF files). 

* We then skip denoting any pattern and ask `awk` to simply print the number of fields. After you run this command you might notice that there two issues. First because we give the date NF is always 1 count higher than the number of animals. `awk` does math too and we can modify this command!

```bash
awk -F '[[:blank:],]' '{print NF-1}' animal_observations_edited.txt
```

Easy peasy!

****

**Exercise**

The second issue is that we don't want to include the first record (row) as this is our header and not representative of any animals. How would you modify the command to skip the first record?

<details>
        <summary><i>Click here for the answer</i></summary>

     awk -F '[[:blank:],]' 'NR>1 {print NF-1}' animal_observations_edited.txt

        
</details>


****


## Piping different separators

We can do more advanced commands with our separators by piping `awk`. For example, we can pull lines where coyote is the **SECOND** animal listed for Yosemite park. 

Before we do that let's take a step back. You may be wondering why on earth we need this kind of command. While something like this may not be particularly useful for Parker's data, this kind of command is key for looking at some complex NGS files!

For example take a look at this gff file

```
chr3	ENSEMBL	five_prime_UTR	50252100	50252137	.	+	.	ID=UTR5:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=2;exon_id=ENSE00003567505.1;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	ENSEMBL	three_prime_UTR	50257691	50257714	.	+	.	ID=UTR3:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=8;exon_id=ENSE00003524043.1;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	ENSEMBL	three_prime_UTR	50258368	50259339	.	+	.	ID=UTR3:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=9;exon_id=ENSE00001349779.3;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	ENSEMBL	gene	50227436	50227490	.	+	.	ID=ENSG00000275334.1;gene_id=ENSG00000275334.1;gene_type=miRNA;gene_name=MIR5787;level=3;hgnc_id=HGNC:49930
chr3	ENSEMBL	gene	52560570	52560707	.	+	.	ID=ENSG00000221518.1;gene_id=ENSG00000221518.1;gene_type=snRNA;gene_name=RNU6ATAC16P;level=3;hgnc_id=HGNC:46915
chr3	ENSEMBL	transcript	52560570	52560707	.	+	.	ID=ENST00000408591.1;Parent=ENSG00000221518.1;gene_id=ENSG00000221518.1;transcript_id=ENST00000408591.1;gene_type=snRNA;gene_name=RNU6ATAC16P;transcript_type=snRNA;transcript_name=RNU6ATAC16P-201;level=3;transcript_support_level=NA;hgnc_id=HGNC:46915;tag=basic,Ensembl_canonical
```

We can see that all colums are tab separated but column 9 has a bunch of ; separated items. This type of command would be useful for something like pulling out all lines where gene_type is snRNA. In fact all of the commands we are teaching today are useful on one or another NGS-related document (VCF, gff, gtf, bed, etc). We are using Parker's data instead because we can use **ALL** of these types of commands on his dataset.

Returning to our original task, pulling lines where coyote is the **SECOND** animal listed for Yosemite park. We can do it like this:

```bash
awk '{ print $3 }' animal_observations_edited.txt | awk -F "," '$2 ~ "coyote"' 
```

We use the first part:

```bash
awk '{ print $3 }' animal_observations_edited.txt 
```

To simply extract the Yosemite data (column 3). We use the second part:

```bash
awk -F "," '$2 ~ "coyote"'
```
## Comment-Upen: may be add the file name animal_observations_edited.txt at the end in above script. if someone enters this, terminal will just hung up.

to separate the comma separated fields of column 3 and ask which lines have the string coyote in field 2. We want to print the entire comma separated list (i.e., column 3) to test our code which is the default behavior of `awk` in this case.

* You might have noticed that here we used "coyote" instead of /coyote/ This is because we want the entire field to be solely coyote ("coyote") rather than containing the string coyote (/coyote/).

****

**Exercise**

What command would you give to print all of the observation dates that took place in May?

<details>
        <summary><i>Click here for the answer</i></summary>

awk '{ print $1 }' animal_observations_edited.txt | awk -F "/" '$1 ~ "5"' 
        
</details>

****

## Counting

One of the best features of `awk` is that it can count up how many times a string occurs in a column. Let's use this to see how many times set of animal observations occurs in Yellowstone park.

```bash
awk ' { counter[$2] += 1 } END { for (animalgroup in counter){ print animalgroup, counter[animalgroup] } }' animal_observations_edited.txt
```

This command is complex and contains new syntax so lets go through it bit by bit: 

* First we set up a variable that we called counter `{ counter[$2] += 1 }`. This variable is special because it is followed by brackets [ ], which makes it an associative array, a fancypants name for a variable that stores key-value pairs. 

* Here our keys will be our animal groups (i.e., the different values of column 2) and the values will be the counter for each of these. When we set up the counter the values are initialized to 0. For every line in the input, we add a 1 to the value in the array whose key is equal to $2. 

* Note that we use the addition operator `+=`, as a shortcut for `counter[$2] = counter[$2] + 1`.

* We want this counter to run through every line of text before we look at the output. To do this we use the special variable `END` which can be used for a command you want `awk` to do at the end of a file (we won't cover it here, but its counterpoint is `BEGIN`). 

* After we tell  `awk` to wait until the end of the file we tell it what we want it to do when it gets there. { for (animalgroup in counter){ print animalgroup, counter[animalgroup] }}
  
* Here we have given a for loop. For each key in counter (animalgroup in counter) we want `awk` to print that key (print animalgroup`) and its corresponding value (counter[animalgroup]).  I have named this animalgroup because that is what we are counting but this can be named whatever you want.

Now that we understand our command, let's run it!

It works! We can see that "moose,bison" is the most commonly observed group of animals at Yellowstone! How Thrilling!

**Exercise**

1. What was the most commonly observed group of animals at Glacier National Park?

<details>
        <summary><i>Click here for the answer</i></summary>

        awk ' { counter[$5] += 1 } END { for (animalgroup in counter){ print animalgroup, counter[animalgroup] } }' animal_observations_edited.txt


        couger,grizzlybear,elk is the most commonly observed group!
        
</details>

2. Our code also counts the number of times our header text (Yosemite or Glacier) is repeated. How can you modify the code so that this is ignored?

 <details>
        <summary><i>Click here for the answer</i></summary>

   awk 'NR>1 { counter[$2] += 1 } END { for (animalgroup in counter){ print animalgroup, counter[animalgroup] } }' animal_observations_edited.txt

      awk 'NR>1 { counter[$5] += 1 } END { for (animalgroup in counter){ print animalgroup, counter[animalgroup] } }' animal_observations_edited.txt
        
</details>


****

### Bioinformatic Application

Counting can be a great way to summarize different annotation files (gff, gff3, gtf etc). This is especially true when working with new files that have been generated by other people. Here is the gff we showed above but slightly edited

```
chr3	entrez	five_prime_UTR	50252100	50252137	.	+	.	ID=UTR5:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=2;exon_id=ENSE00003567505.1;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	ENSEMBL	three_prime_UTR	50257691	50257714	.	+	.	ID=UTR3:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=8;exon_id=ENSE00003524043.1;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	entrez	three_prime_UTR	50258368	50259339	.	+	.	ID=UTR3:ENST00000266027.9;Parent=ENST00000266027.9;gene_id=ENSG00000114353.17;transcript_id=ENST00000266027.9;gene_type=protein_coding;gene_name=GNAI2;transcript_type=protein_coding;transcript_name=GNAI2-201;exon_number=9;exon_id=ENSE00001349779.3;level=3;protein_id=ENSP00000266027.6;transcript_support_level=2;hgnc_id=HGNC:4385;tag=basic,CCDS;ccdsid=CCDS63644.1;havana_gene=OTTHUMG00000156940.2
chr3	ENSEMBL	gene	50227436	50227490	.	+	.	ID=ENSG00000275334.1;gene_id=ENSG00000275334.1;gene_type=miRNA;gene_name=MIR5787;level=3;hgnc_id=HGNC:49930
chr3	entrez	gene	52560570	52560707	.	+	.	ID=ENSG00000221518.1;gene_id=ENSG00000221518.1;gene_type=snRNA;gene_name=RNU6ATAC16P;level=3;hgnc_id=HGNC:46915
chr3	ENSEMBL	transcript	52560570	52560707	.	+	.	ID=ENST00000408591.1;Parent=ENSG00000221518.1;gene_id=ENSG00000221518.1;transcript_id=ENST00000408591.1;gene_type=snRNA;gene_name=RNU6ATAC16P;transcript_type=snRNA;transcript_name=RNU6ATAC16P-201;level=3;transcript_support_level=NA;hgnc_id=HGNC:46915;tag=basic,Ensembl_canonical
```

The second column tells us where the annotation comes from and the third column tells us what kind of feature it is. Both of these columns can be useful to summarize when you are starting to work with a new gtf file.

```bash
awk ' { counter[$2] += 1 } END { for (source in counter){ print source, counter[source] } }' my_gtf.gtf
```


```bash
awk ' { counter[$3] += 1 } END { for (feature in counter){ print feature, counter[feature] } }' my_gtf.gtf
```

## A helpful use case of `awk`

We will end by taking a look at an `awk` one liner that is super helpful when you are working through your own bioinformatics analyses.

```bash
for ((i=1; i<=10; i+=1))
    do
sam=$(awk -v awkvar="${i}" 'NR==awkvar' samples.txt)
samtools view -S -b ${sam}.sam > ${sam}.bam

done
```

## Comment-Upen: We are not running this workshop in cluster right? running above chunk with samtools might be a problem?

This actually combines a number of basic and intermediate shell topics such as [positional parameters]([positional_params.md](https://hbctraining.github.io/Training-modules/Accelerate_with_automation/lessons/positional_params.html)), [for loops](https://hbctraining.github.io/Training-modules/Accelerate_with_automation/lessons/loops_and_scripts.html), and `awk`!

* We start with a for loop that counts from 1 to 10

* Then for each value of `i` the awk command `awk -v awkvar="${i}" 'NR==awkvar' samples.txt` is run and the output is assigned to the positional parameter `${sam}`.

* Then using the positional parameter `${sam}` a samtools command is run to convert a file from .sam to .bam

With our new `awk` expertise let's take a look at that `awk` command alone!


```bash
awk -v awkvar="${i}" 'NR==awkvar' samples.txt
```
## Comment-Upen: No samples.txt in workshop material folder??


We have not encountered -v yet. The correct syntax is `-v var=val` which assign  the  value  val to the variable var, before execution of the program begins. So what we are doing is creating our own variable within our `awk` program, calling it `awkvar` and assigning it the value of `${i}` which will be a number between 1 and 10 (see for loop above). `${i}` and thus `awkvar` will be different for each loop.

Then we are simply saying that the predetermined variable `NR` will be equal to `awkvar` which will be equal to ${i}.

Here is what samples.txt looks like

```
my_sample1_rep1
my_sample1_rep2
my_sample2_rep1
my_sample2_rep2
...
my_sample5_rep2
```

When `${i}` is equal to 3 what will our `awk` command spit out? Why?
Why do you think that this is MFC?


### With our new expertise, we can not only write our own `awk` commands but we can understand commands that others have written. Go forth and `awk`!


# Additional cool `awk` commands

For these commands we will return to ecosystems.txt

### BEGIN

The `BEGIN` command will execute an `awk` expression once at the beginning of a command. This can be particularly useful it you want to give an output a header that doesn't previously have one.

```
awk 'BEGIN {print "new_header"} NR>1 {print $1}' ecosystems.txt
```

In this case we have told `awk` that we want to have "new_header" printed before anything, then `NR>1` is telling `awk` to skip the old header and finally we are printing the first column of `ecosystems.txt` with `{print $1}`.

### END

We already had some experience with `END` above. Related to the `BEGIN` command, the `END` command that tells `awk` to do a command once at the end of the file. We will first demonstrate how it works by adding a new record:

```
awk '{print $1} END {print "new_record"}' ecosystems.txt
```

As you can see, this has simply added a new record to the end of a file. Furthermore, you can chain multiple `END` commands together to continously add to columns if you wished like:

```
awk '{print $1} END {print "new_record"} END {print "newer_record"}' ecosystems.txt
```

This is equivalent to separating your `print` commands with a `;`:

```
awk '{print $1} END {print "new_record"; print "newer_record"}' ecosystems.txt
```

### `if` statements

Since `awk` is it's own fully-fledged programming language, it also has conditional statements. A common time you might want to use an `if` statement in `awk` is when you have a file with tens or even hundreds of fields and you want to figure out which field has the column header of interest or a case where you are trying to write a script for broad use when the order of the input columns may not always be the same, but you want to figure out which column has a certain column header. To do that:  

```
awk 'NR=1 {for (i=1; i<=NF; i=i+1) {if ($i == "height(cm)")  print i}}' ecosystems.txt
```

We can break this code down a bit:

- `NR=1` only looks at the header line

- `for (i=1; i<=NF; i=i+1)` this begins a `for` loop starting at field one and continuing as longer as the `i` is less than or equal to number of fields and the increment is one for each interation of the `for` loop

- `if ($i == "height(cm)")` is checking is `$i`, which is in our case is $1, $2, ... $6, to see if they are equal to `height(cm)`. If this condition is met then:

- `print i` print out `i`


## Additional Resources

* A [guide](https://reasoniamhere.com/2013/09/16/awk-gtf-how-to-analyze-a-transcriptome-like-a-pro-part-1/) to editing gtf files using awk

* [To awk or not](https://pmitev.github.io/to-awk-or-not/) a course from Pavlin Mitev at Uppsala University.

  
***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*


