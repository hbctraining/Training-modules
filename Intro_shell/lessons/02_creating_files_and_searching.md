
## Learning Objectives

* Learn basic operations using the Vim text editor

## Creating text files


### GUI text editors

You can easily create text files on your computer by opening up a text editor program such as [TextWrangler](http://www.barebones.com/products/textwrangler/), [Sublime](http://www.sublimetext.com/), and [Notepad++](http://notepad-plus-plus.org/), and start typing. These text editors often have features to easily search text, extract text, and highlight syntax from multiple programming languages. We refer to these as **GUI text editors** since they have a **G**raphical **U**ser **I**nterface that has buttons and menus that you can click on to issue commands to the computer and you can move about the interface just by pointing and clicking.  

> **NOTE:** When we say, "text editor," we really do mean "text": these editors can only work with plain character data, not tables, images, or any other media and it explicitly excludes *Microsoft Word* or *TextEdit*. 


### Command-line text editors

But what if we need **a text editor that functions from the command line interface**? If we are working on remote computer (i.e. high-performance compute environments) we don't have access to a GUI and so we need to use **Command-line editors** to create, modify and save files. When using these types of editors, you cannot 'point-and-click', you must navigate the interface using only the keyboard.

Some popular command-line editors include [nano](http://www.nano-editor.org/), [Emacs](http://www.gnu.org/software/emacs/) or [Vim](http://www.vim.org/). These editors are available by default on any shell environment, including on high-performance compute environments (local or cloud).

### Introduction to `nano`

Today, we are going to introduce the text editor 'nano'. It is a powerful text editor with text editing options; however, in this introduction we are going to focus on exploring some of the more basic functions. 

To help you remember some of the keyboard shortcuts look at the bottom of the buffer [a resource]().

#### `nano` Interface

You can create a document by calling a text editor and providing the name of the document you wish to create. Change directories to the `unix_lesson/other` folder and create a document using `vim` entitled `draft.txt`:

```bash
$ cd ~/unix_lesson/other
	
$ nano draft.txt
```

Notice the `"draft.txt" [New File]` typed at the bottom left-hand section of the screen. This tells you that you just created a new file in vim. 


Now let's type in a few lines of text:
```
While vim offers great functionality, it takes time to get used to get familiar and learn the shortcuts.
```

After you have finished typing, press ... to save and quit.



## Searching within files

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
