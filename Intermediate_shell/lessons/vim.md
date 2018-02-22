
## Learning Objectives

* Learn basic operations using the Vim text editor

## Creating text files


### GUI text editors

You can easily create text files on your computer by opening up a text editor program such as [TextWrangler](http://www.barebones.com/products/textwrangler/), [Sublime](http://www.sublimetext.com/), and [Notepad++](http://notepad-plus-plus.org/), and start typing. These text editors often have features to easily search text, extract text, and highlight syntax from multiple programming languages. We refer to these as **GUI text editors** since they have a **G**raphical **U**ser **I**nterface that has buttons and menus that you can click on to issue commands to the computer and you can move about the interface just by pointing and clicking.  

> **NOTE:** When we say, "text editor," we really do mean "text": these editors can only work with plain character data, not tables, images, or any other media and it explicitly excludes *Microsoft Word* or *TextEdit*. 


### Command-line text editors

But what if we need **a text editor that functions from the command line interface**? If we are working on remote computer (i.e. high-performance compute environments) we don't have access to a GUI and so we need to use **Command-line editors** to create, modify and save files. When using these types of editors, you cannot 'point-and-click', you must navigate the interface using only the keyboard.

Some popular command-line editors include [nano](http://www.nano-editor.org/), [Emacs](http://www.gnu.org/software/emacs/) or [Vim](http://www.vim.org/). These editors are available by default on any shell environment, including on high-performance compute environments (local or cloud).

### Introduction to Vim 

Today, we are going to introduce the text editor 'vim'. It is a powerful text editor with extensive text editing options; however, in this introduction we are going to focus on exploring some of the more basic functions. We hope that after this introduction you will become more comfortable using it and will explore the advanced functionality as needed. 

To help you remember some of the keyboard shortcuts that are introduced below and to allow you to explore additional functionality on your own, we have compiled [a cheatsheet](https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/resources/VI_CommandReference.pdf).

#### Vim Interface

You can create a document by calling a text editor and providing the name of the document you wish to create. Change directories to the `unix_lesson/other` folder and create a document using `vim` entitled `draft.txt`:

```bash
$ cd unix_lesson/other
	
$ vim draft.txt
```

Notice the `"draft.txt" [New File]` typed at the bottom left-hand section of the screen. This tells you that you just created a new file in vim. 


#### Vim Modes

Vim has **_two basic modes_** that will allow you to create documents and edit your text:   

- **_command mode (default mode):_** will allow you to save and quit the program (and execute other more advanced commands).  

- **_insert (or edit) mode:_** will allow you to write and edit text


Upon creation of a file, `vim` is automatically in command mode. Let's _change to insert mode_ by typing <kbd>i</kbd>. Notice the `--INSERT--` at the bottom left hand of the screen. 

Now let's type in a few lines of text:
```
While vim offers great functionality, it takes time to get used to get familiar and learn the shortcuts.
```

After you have finished typing, press <kbd>esc</kbd> to enter command mode. Notice the `--INSERT--` disappeared from the bottom of the screen.

### Vim Saving and Quitting
To **write to file (save)**, type <kbd>:w</kbd>. You can see the commands you type in the bottom left-hand corner of the screen. 

After you have saved the file, the total number of lines and characters in the file will print out at the bottom left-hand section of the screen.

Alternatively, we can **write to file (save) and quit** all at once. Let's do that by typing <kbd>:wq</kbd>. Now, you should have exited `vim` and returned back to the command prompt.

To edit your `draft.txt` document, open up the file again using the same command you used to create the file: `vim draft.txt`. 

Change into the insert mode and type a few more lines (you can move around the lines of text using the arrows on the keyboard). This time we decide to **quit without saving** by typing <kbd>:q!</kbd>

### Vim Editing
Create the document `spider.txt` in vim. Enter the text as follows: 

![image](../img/vim_spider.png)

To make it easier to refer to distinct lines, we can add line numbers by typing <kbd>:set number</kbd>. Note that you have to do this in the *command mode*.

![image](../img/vim_spider_number.png)

**Save the document.** If you choose to remove the line numbers later you can type <kbd>:set nonumber</kbd>. 

While we cannot point and click to navigate the document, we can use the arrow keys to move around. Navigating with arrow keys can be very slow, so `vim` has shortcuts (which are completely unituitive, but very useful as you get used to them over time). Check to see what mode you are currently in. While in command mode, try moving around the screen and familarizing yourself with some of these shortcuts:    

| key              | action                 |
| ---------------- | ---------------------- |
| <button>gg</button>     | to move to top of file |
| <button>G</button>     | to move to bottom of file     |
| <button>$</button>     | to move to end of line |
| <button>0</button>     | to move to beginning of line     |

In addition to shortcuts for navigation, vim also offers editing shortcuts such as:

| key              | action                 |
| ---------------- | ---------------------- |
| <button>dd</button>     | to delete line     |
| <button>u</button>     | to undo |
| <button>Ctrl + r</button>     | to redo     |

*** 

**Exercise**

We have covered some basic commands in `vim`, but practice is key for getting comfortable with the program. Let's
practice what we just learned in a brief challenge.

1. Open `spider.txt`, and delete line #2.
2. Quit without saving.
3. Open `spider.txt` again, go to the last line and delete it. 
4. Undo your previous deletion.
5. Redo your previous deletion.
6. Save the file and see whether your results match your neighbors.

***

### Overview of vim commands

**Vim modes:**

| key              | action                 |
| ---------------- | ---------------------- |
| <button>i</button>     | insert mode - to write and edit text |
| <button>esc</button>     | command mode - to issue commands / shortcuts  |


**Saving and quitting:**

| key              | action                 |
| ---------------- | ---------------------- |
| <button>:w</button>     | to write to file (save) |
| <button>:wq</button>     | to write to file and quit     |
| <button>:q!</button>     | to quit without saving |
| <button>:set number</button>     | to display line numbers |
| <button>:set nonumber</button>     | to not display line numbers |

***

[Next Lesson](https://hbctraining.github.io/Training-modules/Intermediate_shell/lessons/loops_and_scripts.html)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
