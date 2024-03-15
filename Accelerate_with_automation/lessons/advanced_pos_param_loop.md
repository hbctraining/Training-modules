---
title: "Positional Parameters, continued"
author: "Heather Wick"
---

## Positional Parameters, continued

This lesson is a continuation of **Tying everything together: Using positional parameters in a loop** from the [Positional Parameters Lesson](https://github.com/hbctraining/Training-modules/blob/master/Accelerate_with_automation/lessons/positional_params.md)

### Advanced use: using positional parameters with and without loops in the same script

What if we still wanted to run this on multiple files AND also provide a different sequence besides "NNNNNNNNNN?" We can do that, but would need to modify the above script a little bit. Because we are using a for loop which will iterate over all positional parameters, we can't simply add our sequence to our command like this: `sh generate_bad_reads_summary_param_loop.sh *fq CTGCTAGA`, because bash will treat our new sequence, "CTGCTAGA" exactly as if it were another file in the list. However, using the long form of the `for` loop mentioned above, we can specify where in the list we would like to start iterating through the loop, while capturing the other positional parameters in their own variables.

Below is the `generate_bad_reads_summary_param_loop.sh` script, but we have modified it so that we can capture the first positional parameter outside of the `for` loop to use it as a user-provided sequence. Like the `generate_bad_reads_summary_param.sh` we modified in the positional parameters exercise, it will search for whatever sequence we provide and incorporate the sequence string into the output filenames. Here are the modification we have made, enumerated:
1. Capture the first positional parameter in a variable named `$sequence` and echo it for the user to see
3. Change the `for` loop to go through the positional parameters starting with the second positional parameter by using the longform `for filename in "${@:2}"`. Specifically, the `:2` in this statement indicates to start the loop with the second positional parameter instead of the first. Any number could be used here, depending on the needs of your specific script 
4. Replace `param` with `${sequence}` to add sequence to the output filenames and differentiate it from output files from the previous scripts
5. Update the USAGE and EXAMPLE to reflect the changes we have made

```bash
#!/bin/bash 

## USAGE: User provides sequence to be searched for in user-provided list of files
##  Script will output files in the same directory
## EXAMPLE: generate_bad_reads_summary_param_loop2.sh sequence *.fq

sequence=$1

# tell us what sequence we're looking for
echo $sequence

# count bad reads for each FASTQ file in the provided list of files
for filename in "${@:2}"
do 
  # create a prefix for all output files
  base=$(basename $filename .subset.fq)

  # tell us what file we're working on	
  echo $filename

  # grab all the bad read records
  grep -B1 -A2 $sequence $filename > ${base}.${sequence}.loop.fastq

  # grab the number of bad reads and write it to a summary file
  grep -cH $sequence $filename > ${base}.${sequence}.loop.count.summary
done
```
Open nano and copy/paste the above code and save it as a new script, `generate_bad_reads_summary_param_loop2.sh`

Try running the script with the following command:

```bash
sh generate_bad_reads_summary_param_loop2.sh GATTACA *fq
```

Check your outupt:
```bash
ls -lt
```
If it worked, you should now have yet another set of output files with `GATTACA.loop` in the file names.
