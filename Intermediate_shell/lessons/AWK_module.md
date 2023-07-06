**NOTE: This module assumes that you are familiar with grep and sed**

## What is AWK?

If you have ever looked up how to do a particular string manipulation in [stackoverflow](https://stackoverflow.com/) or [biostars](https://www.biostars.org/) then you have probably seen someone give an `AWK` command as a potential solution. 

`AWK` is an interpreted programming language designed for text processing and typically used as a data extraction and reporting tool and was especially designed to support one-liner programs. You will often see the phrase "AWK one-liner". `AWK` was created at Bell Labs in the 1970s and `AWK` comes from from the surnames of its authors: Alfred **A**ho, Peter **W**einberger, and **B**rian Kernighan. `awk` shares a common history with `sed` and even `grep` dating back to `ed`. As a result, some of the syntax and functionality can be a bit familiar at times. 

## I already know grep and sed, why should I learn AWK?

`AWK` can be seen as an intermediate between `grep` and `sed` and more sophisticated approaches. 

```
The Enlightened Ones say that...

You should never use C if you can do it with a script;
You should never use a script if you can do it with awk;
Never use awk if you can do it with sed;
Never use sed if you can do it with grep.
```
[source](http://awk.info/?whygawk)

This is best understood if we start with `grep` and work our way up. We will use these tools on a complex file we have been given, `animal_observations.txt`. This file came to be when a park ranger named Parker asked rangers at other parks to make monthly observations of the animals they saw that day. All of the other rangers sent comma separated lists and Parker collated them into the following file:

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

We see the date of observation and then the animals observed at each of the 5 parks. Each column is separated by a tab. Everyone can copy and paste the above into a command line document called animal_observations.txt.

So let's say that we want to know how many dates a couger was observed at any of the parks. We can easily use grep for that:

```bash
grep "cougar" animal_observations.txt
```
When we do that 4 lines pop up, so 4 dates. We could also pipe to wc to get a number:

```bash
grep "cougar" animal_observations.txt | wc -l
```

There seemed to be more instances of cougar though, 4 seems low compared to what I saw when glancing at the document. If we look at the document again, we can see that the park ranger from Glacier National Park cannot spell and put "couger" instead of "cougar". Replacing those will be a bit hard with `grep` but we can use `sed` instead!

```bash
sed 's/couger/cougar/g'  animal_observations.txt > animal_observations_edited.txt
```
we are telling `sed` to replace all versions of couger with cougar and output the results to a new file called animal_observations_edited.txt. If we rerun our `grep` command we can see that we now have 9 line (dates) instead of 4. 

Let's now say that we want to know how many times a coyote was observed at Yosemite Park (ignoring all other parks) without editing our file. While this is *possible* with `grep` it is actually easier to do with `AWK`!


## Ok you convinced me (I mean I signed up for this module...) how do I start with AWK?

Before we dive too deeply into `awk` we need to define two terms that `awk` will use a lot:

- ***Field*** - This is a column of data
- ***Record*** - This is a row of data 

You have probably also noticed that sometimes I write `AWK` and othertimes `awk`. The actual command we will use is `awk` but it is sometimes written as `AWK` in manuals as it comes from people's last names.

For our first `AWK` command let's mimic what we just did with `grep`. To pull all instances of cougar from animal_observations_edited.txt using `AWK` we would do:

```bash
awk '/cougar/' animal_observations_edited.txt
```
here '/cougar/' is the pattern we want to match and since we have not told `AWK` anything else it performs it's default behavior which is to print the matched lines.

but we only care about coyotes from Yosemite Park! How do we do that?

```bash
awk '$3 ~ /coyote/' animal_observations_edited.txt
```

First all `awk` commands are always encased in `` so whatever you are telling `awk` to do needs to be inbetween those.  Then I have noted that I want to look at column 3 (the Yosemite observations) in particular. The columns are separated (defined) by white space (one or more consecutive blanks) or tabulator and denoted by the $ sign. So `$1` is the value of the first column, `$2` - second etc. $0 contains the original line including the separators. So the Yosemite column is `$3` and we are asking for lines where the string "coyote" is present. We recognize the '/string/' part from our previous command. 

As we run this command we see that the output is super messy because Parker's original file is a bit of a mess. This is because the default behavior of `awk` is to print all matching lines. It is hard to even check if the command did the right thing. However, we can ask `AWK` to only print the Yosemite column and the date (columns 1 and 3):


```bash
awk '$3 ~ /coyote/ {print $1,$3}' animal_observations_edited.txt
```
This shows a great feature of `AWK`, chaining commands. The print command within the {} will ONLY be executed when the first criteria is met. 

We now know basic `awk` syntax:

```
awk ' /pattern/ {action} ' file1 file2 ... fileN
```

A few things to note before you try it yourself!

> The action is performed on every line that matches the pattern.  
> If a pattern is not provided, the action is performed on every line of the file.  
> If an action is not provided, then all lines matching the pattern are printed (we already knew this one!)  
> Since both patterns and actions are optional, actions must be enclosed in curley brackets to distinguish them from patterns.  

****

**Exercise**

Can you print all of the times a seal was observed in Acadia Park? Did you print it the messy or neat way?

Were seals ever observed in any of the other parks (hint: There are multiple ways to answer this question!)?

****

Before we move on, it is sometimes helpful to know that regular text can be added to `AWK` print commands. For example we can modify our earlier command to be:

```bash
awk '$3 ~ /coyote/ {print "On this date coyotes were observed in Yosemite Park", $1}' animal_observations_edited.txt
```

Did you notice what was modified besides the addition of the string "On this date coyotes were observed in Yosemite Park"?

## AWK predefined variables

Before we continue our `AWK` journey we want to introduce you to some of the `AWK` predefined variables. Although there are more than just these, these are the most helpful to start. More can be found [here](https://www.gnu.org/software/gawk/manual/html_node/Built_002din-Variables.html)

* NR - The number of records processed (i.e., rows)
* FNR - The number of record processed in the current file. This is only needed if you give `awk` multiple files.  For the first file FNR==NR, but for the second FNR will restart from 1 while NR will continue to increment.
* NF - Number of fields in current record (i.e. columns in the row)
* FILENAME - name of current input file
* FS - Field separator which is space or TAB by default

NR is particularly useful for skipping records (i.e., rows). For example, if we only care about coyotes observed in 2002 and not 2001 we can skip the records 1-13 of `animal_observations_edited.txt`.

```bash
awk 'NR>=14 && $3 ~ /coyote/ {print $1,$3}' animal_observations_edited.txt
```
Because we have given two patterns to match (record greater or equal to 14 and column 3 containing the string coyote) we need to put '&&' in between them to note that we need both fulfilled.

You have probably already noticed that Parker's file contains both comma separated fields and tab separated fields. This is no problem for `AWK` if we denote the FS variable. Let's use both FS and NF to print the total number of kinds animals observed in all the parks. Note that we will not delete duplicates (i.e., if coyotes are observed in both Yosemite and Acadia we will consider it to be 2 instead of 1).

```bash
awk -F '[[:blank:],]' '{print NF}' animal_observations_edited.txt
```

This is more complex than anything else we have done so let's break it down. First, you might be curious why we are using -F instead of -FS. FS represents the field separator and to CHANGE it we use -F. We can think of it as -F 'FS'. Here we have to do a bit of regex magic where we accept any white space or commas. Although understanding this regex is beyond this module, we include it here as many NGS formats include multiple kinds of field separators (e.g., VCF files). 

We then skip denoting any pattern and ask `awk` to simply print the number of fields. After you run this command you might notice that there two issues. First because we give the date NF is always 1 count higher than the number of animals. `awk` does math too and we can modify this command!

```bash
awk -F '[[:blank:],]' '{print NF-1}' animal_observations_edited.txt
```

Easy peasy!

****

**Exercise**

The second issue is that we don't want to include the first record (row) as this is our header and not representative of any animals. How would you modify the command to skip the first record?

****


## BEGIN and END

Additionally we have `BEGIN` and `END`. The `BEGIN` command will execute an `awk` expression once at the beginning of a command. This can be particularly useful it you want to give an output a header that doesn't previously have one. Related to `BEGIN` is the `END` command that that tells `awk` to do a command once at the end of the file. It is ***very*** useful when summing up columns (below).






