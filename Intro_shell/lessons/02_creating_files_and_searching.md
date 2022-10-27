***

[Previous Lesson](01_the_filesystem.md)

***

## Learning Objectives

* Learn basic operations using the Vim text editor
* Create a file with some text
* Searching files using the `grep` command

## Creating text files

We've been able to do a lot of work with files that already exist, but what if we want to create our own files? To do this we will introduce you to a text editor available on the command-line environment.

### Command-line text editors

You can easily create text files on your computer by opening up a text editor program such as [TextWrangler](http://www.barebones.com/products/textwrangler/), [Sublime](http://www.sublimetext.com/), and [Notepad++](http://notepad-plus-plus.org/), and start typing. These text editors have a **G**raphical **U**ser **I**nterface that has buttons and menus that you can click on to issue commands to the computer and you can move about the interface just by pointing and clicking.  

If we are working on remote computer (i.e. high-performance compute environments) we don't have access to a GUI and so we need to use **Command-line editors** to create, modify and save files. When using these types of editors, you cannot 'point-and-click', you must **navigate the interface using only the keyboard**.


> **NOTE:** When we say, "text editor," we really do mean "text": these editors can only work with plain character data, not tables, images, or any other media and it explicitly excludes *Microsoft Word* or *TextEdit*. 


### Introduction to Vim 

Some popular command-line editors include [nano](http://www.nano-editor.org/), [Emacs](http://www.gnu.org/software/emacs/) or [Vim](http://www.vim.org/). These editors are available by default on any shell environment, including on high-performance compute environments (local or cloud).

To write and edit files, we're going to use a text editor called 'Vim'. Vim is a very powerful text editor, and it offers extensive text editing options. However, in this introduction we are going to focus on a few basic functions. There is a lot of functionality that we are not going to cover during this session, but encourage you to delve further outside of this class. 


### Vim Interface

You can create a document by providing the name of text editor and providing the name of the document you wish to create. Change directories to the `unix_lesson/other` folder and create a document using `vim` entitled `spider.txt`:

```bash
$ cd ~/unix_lesson/other
	
$ vim spider.txt
```

Notice the `"spider.txt" [New File]` typed at the bottom left-hand section of the screen. This tells you that you just created a new file in vim. 


### Vim Modes
Vim has **_two basic modes_** that will allow you to create documents and edit your text:   

- **_command mode (default mode):_** will allow you to save and quit the program (and execute other more advanced commands).  

- **_insert (or edit) mode:_** will allow you to write and edit text


Upon creation of a file, vim is automatically in command mode. Let's _change to insert mode_ by typing <kbd>i</kbd>. Notice the `--INSERT--` at the bottom left hand of the screen. Now type in a few lines of text:

<img src="../img/vim-insert-mode.png">

After you have finished typing, press <kbd>esc</kbd> to enter command mode. Notice the `--INSERT--` disappeared from the bottom of the screen.

### Vim Saving and Quitting
To **write to file (save)**, type <kbd>:w</kbd>. You can see the commands you type in the bottom left-hand corner of the screen. 

<img src="../img/vim-save.png">

After you have saved the file, the total number of lines and characters in the file will print out at the bottom left-hand section of the screen.

<img src="../img/vim-postsave.png">

Alternatively, we can **write to file (save) and quit**. Let's do that by typing <kbd>:wq</kbd>. Now, you should have exited vim and returned back to your terminal window.

### Vim Quit Without Saving
To edit your `spider.txt` document, open up the file again by calling vim and entering the file name: `vim spider.txt`. Change to insert mode and type a few more lines (you can move around the lines using the arrows on the keyboard). This time we decide to **quit without saving** by typing <kbd>:q!</kbd>

<img src="../img/vim-nosave.png">

 
### Vim Resources

We have barely scratched the surface of Vim's functionality. There are many more commands and helpful shortcuts that really highlight why Vim is our editor of choice. If you decide to continue with Vim, we have below some helpful resources:

* [A full lesson on working with Vim](https://hbctraining.github.io/Intro-to-Shell/lessons/03_vim.html) (HBC materials)
* [Cheatsheet with various commands and shortcuts](https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/resources/VI_CommandReference.pdf).


## Searching files

We went over how to search within a file using `less`. We can also search within files without even opening them, using `grep`. Grep is a command-line utility for searching plain-text data sets for lines matching a pattern or regular expression (regex).

Let's give it a try!

We are going to practice searching with `grep` using the `spider.txt` file that we just created. Suppose we want to see which lines contain the word spider, we would use that as our pattern input: 

```bash
$ grep spider spider.txt
```

It might be helpful to know which line numbers contain these pattern matches:

```bash
$ grep --line-number spider spider.txt
```

Alternatively, if we wanted a count of the number of lines that match we could add the `-c` argument:

```bash
$ grep -c spider spider.txt
```

These are just a few examples of using `grep`, if you are interested in learning more we encourage you to look through [our materials on Searching and Redirection](https://hbctraining.github.io/Intro-to-Shell/lessons/02_searching_files.html). This lesson goes through examples that utilize the data you have already downloaded.


***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
