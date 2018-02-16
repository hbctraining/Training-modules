## Starting with the shell

**With Macs**

Macs have a utility application called "**Terminal**" for performing tasks on the command line (shell). We can open this utility to access the shell.

**With Windows**

By default, there is no terminal for the bash shell available in the Windows OS, so you have to use a downloaded program, "**Git BASH**". Git BASH is part of the [Git for Windows](https://git-for-windows.github.io/) download, and is a shell (bash) emulator.

#### Command prompt

Once you have opened the shell, you should see the command prompt ending with `$`. It will have some characters before the `$`, something like `[MacBook-Pro-5:~]`, this is telling you what the name of the computer you are working on is. 

```bash
[MacBook-Pro-5:~]$ 
```


### Downloading data

We will be exploring the capabilities of the shell by working with some RNA-Seq data. We need to **download the data to our current folder** using the link below. To know what folder we are currently inside, we can use the 'print working directory' command:

```bash
$ pwd
```

On a **Mac** your current folder should be something starting with `/Users/`, like `/Users/marypiper/`.

On a **Windows** machine your current folder should be something starting with `/c/Users/marypiper`. To find this in your File explorer try clicking on PC and navigating to that path.

Once you know to which folder you are downloading your data, right click on the link below:

**Download RNA-Seq data to your working directory:** right-click [here](https://github.com/hbctraining/Training-modules/blob/master/Intro_shell/data/unix_lesson.zip?raw=true) and choose **Save link as**.

If you have downloaded the file to the correct location, type the 'list' command:

```bash
$ ls -l
```

You should see `unix_lesson.zip` as part of the output to the screen.

Finally, to decompress the folder, we can use the `unzip` command:

```bash
$ unzip unix_lesson.zip 
```

You should see output stating the contents of the folder are being decompressed or inflated; this is good. Now when you run the `ls` command again you should see a folder called `unix_lesson`.

```bash
$ ls -l
```

### Exploring the data directory

Now we have each created our own copy of the example data folder into our home directory, **`unix_lesson`**. Let's go into the data folder and explore the data using the shell.

```bash
$ cd unix_lesson

$ ls -l
```
