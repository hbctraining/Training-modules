# Answer Key to Exercises

**NOTE:** For many of these exercises there are multiple ways to solve them. What is in the answer key is just one way.

## String Manipulation

**1)** Strip the file extension from this variable.

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  echo ${filepath%.sam}</pre>
</details>

**2)** Strip the file extension from this variable and assign a new extension of `.bam`

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  echo ${filepath%.sam}.bam</pre>
</details>

**3)** Strip the file extension from this variable, assign a new extension of `.bam` and assign it to a new variable called `bam_filename`. Then print this new `bash` variable 

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  bam_filename=`echo ${filepath%.sam}.bam`
  echo ${bam_filename}</pre>
</details>

## Regular Expressions in grep

**1)** Use `grep` to find all matches in `catch.txt` that start with "B" and have a "T" anywhere in the string after the "B".

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  grep -E &quot;^B.*T.*&quot; catch.txt</pre>
</details>

**2)** Use `grep` to find all matches in `catch.txt` that don't start with "C" and don't end with "H"

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  grep -E &quot;^[^C].*[^H]$&quot; catch.txt</pre>
</details>

**3)** Use `grep` to find all matches in `catch.txt` that have atleast two "A"s in them

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  grep -E &quot;A.*A.*&quot; catch.txt</pre>
</details>

## sed

**1)** Create a new file in `vim` called `fastq_to_fasta.txt` to put our `sed` commands within 

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  vim fastq_to_fasta.txt</pre>
</details>

**2)** Make the first `sed` command within this file be the one that implements a `>` at the *start* of the first line of each entry. *Hint: A regex tool could be helpful for this task*

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  1~4 s/^/&gt;/</pre>
</details>

**3)** Make the next two `sed` commands within this file delete the third and fourth lines of each entry

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  3~4 d
  4~4 d</pre>
</details>

**4)** Run this file of `sed` commands on our FASTQ file and redirect the output to a new file called `Mov10_oe_1.subset.fa`

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  sed -f fastq_to_fasta.txt Mov10_oe_1.subset.fq &gt; Mov10_oe_1.subset.fa</pre>
</details>

## awk

**1)** How could we exclude the 5th through 9th columns of `raw_counts_mouseKO.csv` and pipe the output into a `less` buffer?

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  awk -F &#39;,&#39; &#39;{print $1,$2,$3,$4}&#39; raw_counts_mouseKO.csv | less</pre>
</details>

**2)** How could we have `awk` return the column number for the field named "WT2"?

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  awk -F &#39;,&#39; &#39;NR=1 {for (i=1; i<=NF; i=i+1) {if ($i == &quot;WT2&quot;)  print i}}&#39; raw_counts_mouseKO.csv</pre>
</details>

**3)** How could measure the average counts from the sample in the 7th column?

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  awk -F &#39;,&#39; &#39;NR&gt;1 {sum=$7+sum} END {records=NR-1; print sum/records}&#39; raw_counts_mouseKO.csv</pre>
</details>

**4)** How could we calculate the average counts for the first twenty genes from samples WT1, WT2, WT3 and WT4, then print the gene name, then the count for each sample for that gene and then the average across the four samples?

<details>
  <summary><b>Click here to see the answer</b></summary>
  <pre>
  awk -F &#39;,&#39; &#39;NR&gt;1 &amp;&amp; NR &lt;= 21 {sum=$6+$7+$8+$9; print $1,$6,$7,$8,$9,sum/4}&#39; raw_counts_mouseKO.csv</pre>
</details>

***
  
[Back to Schedule](../README.md)
