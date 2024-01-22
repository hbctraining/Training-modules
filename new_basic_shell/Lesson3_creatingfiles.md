
## Learning Objectives

* Learn basic operations using the nano text editor

## Creating text files


### GUI text editors

You can easily create text files on your computer by opening up a text editor program such as [TextWrangler](http://www.barebones.com/products/textwrangler/), [Sublime](http://www.sublimetext.com/), and [Notepad++](http://notepad-plus-plus.org/), and start typing. These text editors often have features to easily search text, extract text, and highlight syntax from multiple programming languages. We refer to these as **GUI text editors** since they have a **G**raphical **U**ser **I**nterface that has buttons and menus that you can click on to issue commands to the computer and you can move about the interface just by pointing and clicking.  

> **NOTE:** When we say, "text editor," we really do mean "text": these editors can only work with plain character data, not tables, images, or any other media and it explicitly excludes *Microsoft Word* or *TextEdit*. 


### Command-line text editors

But what if we need **a text editor that functions from the command line interface**? If we are working on remote computer (i.e. high-performance compute environments) we don't have access to a GUI and so we need to use **Command-line editors** to create, modify and save files. When using these types of editors, you cannot 'point-and-click', you must navigate the interface using only the keyboard.

Some popular command-line editors include [nano](http://www.nano-editor.org/), [Emacs](http://www.gnu.org/software/emacs/) or [Vim](http://www.vim.org/). These editors are available by default on any shell environment, including on high-performance compute environments (local or cloud).

### Introduction to Nano 

Today, we are going to introduce the text editor 'nano'. `nano` often gets a bad rep from hardcore coders but it is simple to use and the most intuitive of the editors.

#### Nano Interface

You can create a document by calling a text editor and providing the name of the document you wish to create. Change directories to the `unix_lesson/other` folder and create a document using `nano` entitled `draft.txt`:

```bash
$ cd ~/unix_lesson/other
	
$ nano draft.txt
```

Now press enter.

#### Nano interface

You should see this:

![image](img/nano.png)

This should look quite similar to using a GUI plain text editor. We can see that our file is called draft.txt and our cursor is ready to add text! Let's add some text, copy and paste the following:

```
This is my first document.
This is a draft.
When I save this file it will be in my "other" folder.
```

The bottom of the screen tells you common commands that you may need. To **write to file (save)**, type <kbd>ctrl</kbd> <kbd>x</kbd>. The program will ask if you are sure and you can type <kbd>y</kbd> then press <kbd>enter</kbd>.

Open up the file again using the same command you used to create the file: `nano draft.txt` **Do not modify the file** close it again with <kbd>ctrl</kbd> <kbd>x</kbd>. How is this different from the first time?

> If you don't change a file nano will not ask if you are sure to save it.


### Nano Editing
Create the document `spider.txt` in nano. Copy and paste the text as follows: 

```
The itsy bitsy spider
Went up the water spout
Down came the rain
And washed the spider out.
```

To make it easier to refer to distinct lines, we can add line numbers by typing reopening the document with 

```
nano -c spider.txt
```

While we cannot point and click to navigate the document, we can use the arrow keys to move around. Navigating with arrow keys can be very slow, so `nano` has shortcuts. You can find some [here](https://www.nano-editor.org/dist/latest/cheatsheet.html) Several of the more common ones are already at the bottom of your document



| key              | action                 |
| ---------------- | ---------------------- |
| <button>Ctrl+K</button>     | to cut the current line    |
| <button>Ctrl+U</button>     | to paste|
| <button>Alt+U</button>     | to undo the last action    |
| <button>Alt+E</button>     | to redo the last action|
*** 

**Exercise**

We have covered some basic commands in `nano`, but practice is key for getting comfortable with the program. Let's
practice what we just learned in a brief challenge.

1. Open `spider.txt`, and delete line #2.
2. Quit without saving.
3. Open `spider.txt` again, go to the last line and delete it. 
4. Undo your previous deletion.
5. Redo your previous deletion.
6. Save the file and see whether your results below.






*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*



## Examining Files

We now know how to move around the file system and look at the
contents of directories, but how do we look at the contents of files?

The easiest way to examine a file is to just print out all of the
contents using the command `cat`. Print the contents of `unix_lesson/other/sequences.fa` by entering the following command:

```bash
$ cat ~/unix_lesson/other/sequences.fa
```

This prints out the all the contents of `sequences.fa` to the screen.

> `cat` stands for catenate; it has many uses and printing the contents of a files onto the terminal is one of them.

What does this file contain?

`cat` is a terrific command, but when the file is really big, it can be annoying to use. The command, `less`, is useful for this case. Let's take a look at the raw_fastq files. These files are quite large, so we probably do not want to use the `cat` command to look at them. Instead, we can use the `less` command. 

Move back to our `raw_fastq` directory and enter the following command:

```bash
less Mov10_oe_1.subset.fq
```

We will explore FASTQ files in more detail later, but notice that FASTQ files have four lines of data associated with every sequence read. Not only is there a header line and the nucleotide sequence, similar to a FASTA file, but FASTQ files also contain quality information for each nucleotide in the sequence. 

The `less` command opens the file, and lets you navigate through it. The keys used to move around the file are identical to the `man` command.

<span class="caption">Shortcuts for `less`</span>

| key              | action                 |
| ---------------- | ---------------------- |
| <kbd>SPACE</kbd> | to go forward          |
| <kbd>b</kbd>     | to go backwards        |
| <kbd>g</kbd>     | to go to the beginning |
| <kbd>G</kbd>     | to go to the end       |
| <kbd>q</kbd>     | to quit                |

`less` also gives you a way of searching through files. Just hit the <kbd>/</kbd> key to begin a search. Enter the name of the string of characters you would like to search for and hit enter. It will jump to the next location where that string is found. If you hit <kbd>/</kbd> then <kbd>ENTER</kbd>, `less` will just repeat the previous search. `less` searches from the current location and works its way forward. If you are at the end of the file and search for the word "cat", `less` will not find it. You need to go to the beginning of the file and search.

For instance, let's search for the sequence `GAGACCC` in our file. You can see that we go right to that sequence and can see what it looks like. To exit hit <kbd>q</kbd>.

The `man` command (program) actually uses `less` internally and therefore uses the same keys and methods, so you can search manuals using `/` as well!

There's another way that we can look at files, and in this case, just
look at part of them. This can be particularly useful if we just want
to see the beginning or end of the file, or see how it's formatted.

The commands are `head` and `tail` and they just let you look at
the beginning and end of a file respectively.

```bash
$ head Mov10_oe_1.subset.fq
```
