---
title: "Sed"
author: "Will Gammerdinger, Meeta Mistry, Emma Berdan"
---

## Learning Objectives

In this lesson, we will:

- Substitute characters using `sed`
- Utilize addresses in our `sed` commands
- Delete lines from output using `sed`

# sed

The ***s***tream ***ed***itor, `sed`, is a common tool used for text manipulation. `sed` takes input from either a file or piped from a previous command and applies a transformation to it before outputting it to standard output.

## Quick Note on Quotation Marks

Many of the same arguments that were made for using single vs. double quotation marks in `grep` also apply to `sed`. However, the `$` has some non-variable functionality in `sed` that we will discuss, particularly with reference to addresses. For this reason, it's more common to see `sed` commands wrapped in single-quotes rather than double-quotes. Of course, if you want to use a `bash` variable in `sed` you are going to need to wrap it in double-quotes, but if you do then you need be cautious of any non-variable usage of `$` and be sure to escape it (`\`).

## Quick Note on BSD and GNU `sed`

There are several versions of `sed`, but the most two common versions are BSD (default on Macs) and GNU (found most other places). Generally speaking, the two versions of `sed` are mostly similiar, but there are some instances where their behavior (particularly, BSD's `sed`) differs. Where they instance come up, we will point it out. 

## substitution

Before we get started let's take a brief look at the main dataset that will be using for this lesson, the `ecosystems.txt` file:

```
less ecosystems.txt
```

In bioinformatics the most common usage for `sed` is to replace `pattern` with `replacement`. The syntax for doing this is:

```
# DON'T RUN
sed 's/pattern/replacement/flag' file.txt 
```

A few things to note here:

1) The `s` in `'s/pattern/replacement/flag'` is directing `sed` to do a ***s***ubstitution.

2) The `flag` in `'s/pattern/replacement/flag'` is directing `sed` that you want this action to be carried out in a specific manner. It is very common to use the flag `g` here, which will carry out the action ***g***lobally, or each time it matches the `pattern` in a line. If `g`, is not included it will just replace the `pattern` the first time it is observed per line. If you would like to replace a particular occurrence like the third time it is observed in a line, then you would use `3`.

Let's test this out on our `ecosystems.txt` sample file and see that output. First, we are interested in replacing `jungle` with `rainforest` throughout the file:

```
sed 's/jungle/rainforest/g' ecosystems.txt
```

Notice how all instances of `jungle` have been replaced with `rainforest`. However, if we don't include the global flag:

```
sed 's/jungle/rainforest/' ecosystems.txt
```

We will only recover the first instance of `jungle` was replaced with `rainforest`. If we want to replace only the second occurance of `jungle` with `rainforest` on a line, modify the occurrence flag to be `2`:

```
sed 's/jungle/rainforest/2' ecosystems.txt
```

**It is important to note that the pattern-matching in `sed` is case-sensitive.** To make your pattern searches case-insensitive, you will need to add at the `I` flag:

```
sed 's/jungle/rainforest/Ig' ecosystems.txt
```

This will now replace all instances of `Jungle`/`jungle`/`JuNgLe`/`jUngle`/etc. with `rainforest`.

You can also replace all instances of a match starting at *n*-th match and continuing for the rest of the line. For instance if we want the second match and all subsequent matches  of `jungle` to be replaced with `rainforest`, then we could use:

```
sed 's/jungle/rainforest/2g' ecosystems.txt
```

> NOTE: Depending on your implementation of `sed`, this command may give the error that too many flags have been provided.

### Bioinformatic Examples

1. In annotation files (e.g., gtf, gff3) chromosomes are generally written as CHR1 *or* chr1. Some programs will want one or the other and `sed` can switch between the two easily. Use `sed` to alter the `chr` to `CHR` in the `hg38_subset.gff` file and sace the output as `hg38_subset.uppercase.gff`:

<details>
        <summary>Click here to see the answer</summary>
        <code>sed 's/chr/CHR/g' hg38_subset.gff > hg38_subset.uppercase.gff</code>
</details>

2. Your colleague has prepared a FASTA file for you. Take a look by typing `cat mygenes.fasta`. They named the genes (lines that start with `>`) with sequences! Rename the genes GAA and GAA_2 replacing GAA with gene1 with a **single command that does not alter any of the sequences**.

<details>
        <summary><i>Click here for the answer</i></summary>
        <code>sed 's/>GAA/>gene1/g' mygenes.fasta</code>       
</details>

## Addresses

### Single lines

One can also direct which line, the ***address***, `sed` should make an edit on by adding the line number in front of `s`. This is most common when one wants to make a substituion for a pattern in a header line and we are concerned that the pattern might be elsewhere in the file. For example, we can compare the following commands:

```
sed 's/an/replacement/g' ecosystems.txt
sed '1 s/an/replacement/g' ecosystems.txt
```

* In the **first command**, `sed 's/an/replacement/g' animals.txt` we have replaced all instances of `an` with `replacement`. 
    * `animal` changed to `replacementimal`
    * `toucan` also changed to `toucreplacement`
    * `anaconda` changed to `replacementaconda`
* In the **second command**, `sed '1 s/an/replacement/g' ecosystems.txt`, we have only replaced instances on line 1.

If you only want to replace an occurence in the final line of a file you can use `$` like:

```
sed '$ s/jag/replacement/g' ecosystems.txt
```

### Intervals

If we only want to have this substitution carried out on the first five lines, then we would need to do include this interval (`1,5`, this is giving an address interval, from line 1 to line 5):

```
sed '1,5 s/an/replacement/g' ecosystems.txt
```

You can also replace the second address with a `$` to indicate until end of the file like:

```
sed '5,$ s/an/replacement/g' ecosystems.txt
```

This will carry out the substitution from the fifth line until the end of the file.

You can also use regular expressions in the address field. For example, if you only wanted the substitution happening between your first occurence of `camel` and your first occurrance of `cichlid`, you could do:

```
sed '/camel/,/cichlid/ s/an/replacement/g' ecosystems.txt
```

Additionally, if you want a replacement every occurance except a given line, such as all of you data fields but not on the header line, then one could use `!` which tells sed "not", like:

```
sed '1! s/an/replacement/g' ecosystems.txt
```

You can even couple `!` with the regular expression intervals to do the substitution everywhere outside the interval:

```
sed '/camel/,/cichlid/! s/an/replacement/g' ecosystems.txt
```

Lastly, you can use `N~n` in the address to indicate that you want to apply the substitution every *n*-th line starting on line *N*. In the below example, starting on the first line and every 2nd line, the substitution will occur. Unfortunately, this functionality will not work on BSD (Macs) `sed`.

```
# Won't work on Macs using BSD sed
sed '1~2 s/an/replacement/g' ecosystems.txt
```

## Bioinformatics Example

Let's extract only the quality scores from the `Mov10_oe_1.subset.fq` file and write them to a file called `quality_scores.txt`. If you are on a Mac, you may have trouble testing this, so just write your answer out instead. Below is a reminder of the FASTQ format:

|Line|Description|
|----|-----------|
|1|Always begins with '@', followed by information about the read|
|2|The actual DNA sequence|
|3|Always begins with a '+', and sometimes the same info as in line 1|
|4|Has a string of characters representing the quality scores; must have same number of characters as line 2|

<details>
        <summary>Click here to see the answer</summary>
        <code>sed -n '4~4p' Mov10_oe_1.subset.fq > quality_scores.txt</code>
</details>


## Deletion

You can delete entire lines in `sed`. To delete lines we will need to provide the address followed by `d`. To delete the first line from a file:

```
sed '1d' ecosystems.txt
```

Like substitutions, you can provide an interval and this will delete line 1 to line 3:

```
sed '1,3d' ecosystems.txt
```

Also, like substitution, you can use `!` to specify lines not to delete like:

```
sed '1,3!d' ecosystems.txt
```

Additionally, you can also use regular expressions to provide the addresses to define an interval to delete from. In this case, we are interested in deleting from the first instance of `cichlid` until the end of the file:

```
sed '/cichlid/,$d' ecosystems.txt
```

The `N~n` syntax also works in deletion and like the previous usage of the `~`, it will not work on Macs running BSD `sed`. If we want to delete every third line starting on line 2, we can do:

```
# Won't work on Macs using BSD sed
sed '2~3d' ecosystems.txt
```

Deletion also works with pattern matching. If we want to delete all lines that contain the word `jungle` we can do:

```
sed '/jungle/d' ecosystems.txt
```

## Exercise

The [Variant Call Format (VCF)](https://samtools.github.io/hts-specs/VCFv4.2.pdf) is a standardized, text-file format for describing variants identifed from a sequencing experiment. This allows for downstream processes to be streamlined and also allows for researchers to easily collaborate and manipulate a shared set of variant calls. A VCF file is composed of three main parts:
- Meta-information Lines
- Header Line
- Data Lines

A sample VCF can be found below:

```
##fileformat=VCFv4.2
##FILTER=<ID=FAIL,Description="Fail the site if all alleles fail but for different reasons.">
##FILTER=<ID=PASS,Description="Site contains at least one allele that passes filters">
##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Approximate read depth (reads with MQ=255 or with bad mates are filtered)">
##GATKCommandLine=<ID=FilterMutectCalls,CommandLine="FilterMutectCalls --output /n/scratch3/users/w/wig051/variant_calling/vcf_files/mutect2_syn3_normal_syn3_tumor_GRCh38.p7-filt.vcf --variant /n/scratch3/users/w/wig051/variant_calling/vcf_files/mutect2_syn3_normal_syn3_tumor_GRCh38.p7-raw.vcf --reference /n/groups/hbctraining/variant_calling/reference/GRCh38.p7.fa ... Version="4.1.9.0",Date="February 15, 2023 10:32:47 PM EST">
##INFO=<ID=AS_UNIQ_ALT_READ_COUNT,Number=A,Type=Integer,Description="Number of reads with unique start and mate end positions for each alt at a variant site">
##source=Mutect2
##tumor_sample=syn3_tumor
#CHROM  POS     ID      REF     ALT     QUAL    FILTER  INFO    FORMAT  syn3_normal     syn3_tumor
1       137221  .       T       G       .       normal_artifact;strand_bias;weak_evidence       AS_FilterStatus=weak_evidence,strand_bias;AS_SB_TABLE=44,40|0,6;ClippingRankSum=1.739;DP=91;ECNT=1;FS=15.787;GERMQ=93;MBQ=32,32;MFRL=334,339;MMQ=22,35;MPOS=26;MQ=30.08;MQ0=0;MQRankSum=1.446;NALOD=-4.708e+00;NLOD=2.44;POPAF=6.00;ReadPosRankSum=-0.866;TLOD=4.45     GT:AD:AF:DP:F1R2:F2R1:SB        0/0:40,3:0.089:43:21,2:18,1:22,18,0,3   0/1:44,3:0.081:47:25,1:18,2:22,22,0,3
1       186370  .       C       T       .       map_qual;normal_artifact;weak_evidence  AS_FilterStatus=weak_evidence,map_qual;AS_SB_TABLE=111,70|10,3;ClippingRankSum=1.928;DP=207;ECNT=1;FS=4.234;GERMQ=93;MBQ=33,31;MFRL=341,342;MMQ=25,25;MPOS=14;MQ=25.66;MQ0=0;MQRankSum=-0.158;NALOD=-7.956e+00;NLOD=10.68;POPAF=6.00;ReadPosRankSum=-1.732;TLOD=5.07    GT:AD:AF:DP:F1R2:F2R1:SB        0/0:96,7:0.075:103:45,4:50,3:56,40,6,1  0/1:85,6:0.067:91:42,1:43,4:55,30,4,2
1       187019  .       G       A       .       map_qual;normal_artifact;weak_evidence  AS_FilterStatus=weak_evidence,map_qual;AS_SB_TABLE=56,76|6,3;ClippingRankSum=-4.266;DP=149;ECNT=1;FS=7.413;GERMQ=93;MBQ=34,33;MFRL=344,351;MMQ=50,20;MPOS=1;MQ=42.64;MQ0=0;MQRankSum=-4.743;NALOD=-1.314e+00;NLOD=10.65;POPAF=6.00;ReadPosRankSum=-4.367;TLOD=4.26      GT:AD:AF:DP:F1R2:F2R1:SB        0/0:60,3:0.061:63:27,3:30,0:25,35,3,0   0/1:72,6:0.085:78:31,4:39,2:31,41,3,3
```
The meat of the file (i.e., the variants) is found after all of the header lines, which **start with** `##`.
You have the vcf file `test.vcf` in your `advanced_shell` directory. Use `sed` to remove all header lines (those starting with a double #) and make a new file called `vcf_noheader.vcf`. Note you will have to use regex here! How would the command be different if you wanted to delete any line containing the pattern `##`?

<details>
        <summary><i>Click here for the answer</i></summary>
        To remove lines that START with ##: <code>sed '/^##/d' test.vcf > vcf_noheader.vcf</code>
        to remove any lines that contain ##:  <code>sed '/##/d' test.vcf > vcf_nodoublehash.vcf</code>
</details>



### Changing Lines

You can also ***c***hange entire lines in `sed` using the `c` command. This change function will not work on Macs running BSD `sed`. We could replace the first line with the word 'header' by:

```
# Won't work on Macs using BSD sed
sed '1 c header' ecosystems.txt
```

This can also be utilized in conjunction with the `A,B` interval syntax, but we should be aware that it will replace ALL lines in that interval with a SINGLE line.

```
# Won't work on Macs using BSD sed
sed '1,3 c header' ecosystems.txt
```

You can also replace every *n*-th line starting at *N*-th line using the `N~n` address syntax:

```
# Won't work on Macs using BSD sed
sed '1~3 c header' ecosystems.txt
```

Lastly, you can also replace lines matching a pattern:

```
# Won't work on Macs using BSD sed
sed '/jaguar/ c header' ecosystems.txt
```

## Multiple expressions

### `-e` option

If you would like to carry out multiple `sed` expressions in the same command you can use the `-e` option and after each `-e` option you can provide the expression you would like `sed` to evaluate. For example, one could change `jungle` to `rainforest` and `lake` to `freshwater`:

```
sed -e 's/jungle/rainforest/g' -e 's/lake/freshwater/g' ecosystems.txt
```

One can also combine different type of expressions. For instance, one could change `jungle` to `rainforest` using a substitution expression and then use a deletion expression to remove the header line:

```
sed -e 's/jungle/rainforest/g' -e '1d' ecosystems.txt
```

If you want to use different flags to mark the occurence of a substitution, you will need to use the `-e` option:

```
sed -e 's/jungle/rainforest/3' -e 's/jungle/rainforest/1' ecosystems.txt
```

> **NOTE:** The occurences flag needs to go in decreasing order from the end of the line to the beginning of the line. Notice how `-e 's/jungle/rainforest/3'` comes before `-e 's/jungle/rainforest/1'`.

### `-f` option

If you have a large number of `sed` expressions you can also place them in a text file, like the `sed_expressions.txt` file, where each expression is on a separate line:

```
s/jungle/rainforest/g
s/lake/freshwater/g
1d
```

Then we can use the `-f` option to provide this file of `sed` expressions by using:

```
sed -f sed_expressions.txt ecosystems.txt
```

This can be one strategy that you can employ to increase reproducibility in your workflows as well.

## Additional Resources

- <a href="https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/sessionVI/lessons/extra_bash_tools.html##sed">https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/sessionVI/lessons/extra_bash_tools.html##sed</a>

- <a href="https://www.grymoire.com/Unix/Sed.html">https://www.grymoire.com/Unix/Sed.html</a>

***

[Next Lesson >>](AWK_module.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*

