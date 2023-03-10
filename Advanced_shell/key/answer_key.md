# Answer Key to Exercises

**NOTE:** For many of these exercises there are multiple ways to solve them. What is in the answer key is just one way.

## String Manipulation

**1)** Strip the file extension from this variable.

```
echo ${filepath%.sam}
```

**2)** Strip the file extension from this variable and assign a new extension of `.bam`

```
echo ${filepath%.sam}.bam
```

**3)** Strip the file extension from this variable, assign a new extension of `.bam` and assign it to a new variable called `bam_filename`. Then print this new `bash` variable 

```
bam_filename=`echo ${filepath%.sam}.bam`
echo ${bam_filename}
```

## Regular Expressions in grep

**1)** Use `grep` to find all matches in `catch.txt` that start with "B" and have a "T" anywhere in the string after the "B".

```
grep -E "^B.*T.*" catch.txt 
```

**2)** Use `grep` to find all matches in `catch.txt` that don't start with "C" and don't end with "H"

```
grep -E "^[^C].*[^H]$" catch.txt 
```

**3)** Use `grep` to find all matches in `catch.txt` that have atleast two "A"s in them

```
grep -E "A.*A.*" catch.txt 
```

## sed

**1)** Create a new file in `vim` called `fastq_to_fasta.txt` to put our `sed` commands within 

```
vim fastq_to_fasta.txt
```

**2)** Make our first `sed` command within this file be the one that implments a `>` at the *start* of the first line of each entry. *Hint: A regex tool could be helpful for this task*

```
1~4 s/^/>/
```

**3)** Add a pair of lines that delete the third and fourth lines of each entry

```
3~4 d
4~4 d
```

**4)** Run this file of `sed` commands on our FASTQ file and redirect the output to a new file called `Mov10_oe_1.subset.fa`

```
sed -f fastq_to_fasta.txt Mov10_oe_1.subset.fq > Mov10_oe_1.subset.fa
```

## awk

**1)** How could we exclude the 5th through 9th columns of `raw_counts_mouseKO.csv` and pipe the output into a `less` buffer?

```
awk -F ',' '{print $1,$2,$3,$4}' raw_counts_mouseKO.csv | less
```

**2)** How could we have `awk` return the column number for the field named "WT2"?

```
awk -F ',' 'NR=1 {for (i=1; i<=NF; i=i+1) {if ($i == "WT2")  print i}}' raw_counts_mouseKO.csv
```

**3)** How could measure the average counts from the sample in the 7th column?

```
awk -F ',' 'NR>1 {sum=$7+sum} END {records=NR-1; print sum/records}' raw_counts_mouseKO.csv
```

**4)** How could we calculate the average counts for the first twenty genes from samples WT1, WT2, WT3 and WT4, then print the gene name, then the count for each sample for that gene and then the average across the four samples?

```
awk -F ',' 'NR>1 && NR <= 21 {sum=$6+$7+$8+$9; print $1,$6,$7,$8,$9,sum/4}' raw_counts_mouseKO.csv
```

