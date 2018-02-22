
## Learning Objectives

* Learn basic operations using the Vim text editor

## Writing files

You can do a lot of work with files that already exist, using command like `less`, `head`, `tail`, `cat`, `wc`, and so on, but what if you wanted to write or create your own files on the command line? Obviously, you're not going to type in loads of information like a FASTA file, but there are a lot of reasons you might want to to write/create a small file or edit an existing file.

To create or edit files you will need to use a **text editor**. When we say, "text editor," we really do mean "text": these editors can only work with plain character data, not tables, images, or any other media and it explicitly excludes *Microsoft Word* or *TextEdit*. These tools can generally be grouped into **graphical user interface (GUI) text editors** and **command-line editors**.

**GUI text editors:** A GUI is an interface that has buttons and menus that you can click on to issue commands to the computer and you can move about the interface just by pointing and clicking. You might be familar with GUI text editors, such as [TextWrangler](http://www.barebones.com/products/textwrangler/), [Sublime](http://www.sublimetext.com/), and [Notepad++](http://notepad-plus-plus.org/), which allow you to write and edit plain text documents. These editors often have features to easily search text, extract text, and highlight syntax from multiple programming languages. They are great tools, but since they are 'point-and-click', we cannot use them from the command line/shell.

**Command-line editors:** For our purpose, we need a text editor that functions from the command line interface. When using these editors, you cannot 'point-and-click', you must navigate the interface using the the keyboard. Some popular command-line editors include [nano](http://www.nano-editor.org/), [Emacs](http://www.gnu.org/software/emacs/) or [Vim](http://www.vim.org/). These editors are available by default on any shell environment, including on high-performance compute environments (local or cloud).

### Introduction to Vim 

Today, we are going to use a text editor called 'Vim'. Vim is a very powerful text editor with extensive text editing options. However, in this introduction we are going to focus on exploring some of the more basic functions. We hope that after this introduction you will become more comfortable using it and explore the advanced functionality as needed. 

To help you remember some of the keyboard shortcuts that are introduced below and to allow you to explore additional functionality on your own, we have compiled [a cheatsheet](https://hbctraining.github.io/In-depth-NGS-Data-Analysis-Course/resources/VI_CommandReference.pdf).


### Vim Interface

You can create a document by calling a text editor and providing the name of the document you wish to create. Change directories to the `unix_lesson/other` folder and create a document using `vim` entitled `draft.txt`:

```bash
$ cd unix_lesson/other
	
$ vim draft.txt
```

Notice the `"draft.txt" [New File]` typed at the bottom left-hand section of the screen. This tells you that you just created a new file in vim. 


### Vim Modes

Vim has **_two basic modes_** that will allow you to create documents and edit your text:   

- **_command mode (default mode):_** will allow you to save and quit the program (and execute other more advanced commands).  

- **_insert (or edit) mode:_** will allow you to write and edit text


Upon creation of a file, vim is automatically in command mode. Let's _change to insert mode_ by typing <kbd>i</kbd>. Notice the `--INSERT--` at the bottom left hand of the screen. Now type in a few lines of text:

![vim-insert-mode](../img/vim_insert.png)

After you have finished typing, press <kbd>esc</kbd> to enter command mode. Notice the `--INSERT--` disappeared from the bottom of the screen.

### Vim Saving and Quitting
To **write to file (save)**, type <kbd>:w</kbd>. You can see the commands you type in the bottom left-hand corner of the screen. 

![vim-save](../img/vim_save.png)

After you have saved the file, the total number of lines and characters in the file will print out at the bottom left-hand section of the screen.

![vim-postsave](../img/vim_postsave.png)

Alternatively, we can **write to file (save) and quit** all at once. Let's do that by typing <kbd>:wq</kbd>. Now, you should have exited vim and returned back to the command prompt.

To edit your `draft.txt` document, open up the file again by calling vim and entering the file name: `vim draft.txt`. Change to insert mode and type a few more lines (you can move around the lines using the arrows on the keyboard). This time we decide to **quit without saving** by typing <kbd>:q!</kbd>
 
![vim-quit](../img/vim_quit.png)

### Vim Editing
Create the document `spider.txt` in vim. Enter the text as follows: 

![image](../img/vim_spider.png)

To make it easier to refer to distinct lines, we can add line numbers by typing <kbd>:set number</kbd>. **Save the document.** Later, if you choose to remove the line numbers you can type <kbd>:set nonumber</kbd>.

![image](../img/vim_spider_number.png)

While we cannot point and click to navigate the document, we can use the arrow keys to move around. Navigating with arrow keys can be very slow, so Vim has shortcuts (which are completely unituitive, but very useful as you get used to them over time). Check to see what mode you are currently in. While in command mode, try moving around the screen and familarizing yourself with some of these shortcuts:    

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

We have covered some basic commands in vim, but practice is key for getting comfortable with the program. Let's
practice what we just learned in a brief challenge.

1. Open `spider.txt`, and delete line #2.
2. Quit without saving.
3. Open `spider.txt` again, and delete the last line. 
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


**Saving and quiting:**

| key              | action                 |
| ---------------- | ---------------------- |
| <button>:w</button>     | to write to file (save) |
| <button>:wq</button>     | to write to file and quit     |
| <button>:q!</button>     | to quit without saving |

***

[Next Lesson](https://hbctraining.github.io/Training-modules/Intermediate_shell/lessons/loops_and_scripts.html)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*