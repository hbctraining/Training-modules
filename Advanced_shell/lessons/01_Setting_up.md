# Setting up

## Disclaimer

Before we start this Current Topics module, it is important to highlight that becasue we be doing more advanced commands and options for those commands, some commands or their options might not work for you. We have tried our best to pick commands and options for those commands that are widely used, but since we are all on our own computers, each of us has a different implementation of certain commands and there may be options that your specific implementation doesn't have. We have run this code on the [O2 cluster](https://it.hms.harvard.edu/our-services/research-computing/services/high-performance-computing) and each of these commands works there.

## Getting the dataset

Before starting the course we asked that Windows users had successfully, installed [GitBash](https://git-scm.com/download/win). Amc users can just use the built-in Terminal application. Go ahead and launch either GitBash or Terminal.

In order for this Current Topics module to be successful, we need to make sure that we are working from the same datasets. We have developed a handful of datasets for us to use as toy examples during this workshop. In previous workshops, we have used the point-and-click interface for download datasets. However, since this is the advanced workshop, we are going to do it a bit different because if you are working on a high-performance computing (HPC) cluster, the point-and-click option won't be availible to you. Let's go ahead and move to out home directory:

```
cd ~
```

Now the dataset that we are going to use today can be found [here](). If you want, you *could* use the method we have previously taught where you can right-click on the link and select "Download Linked File As..."(Mac) or "Save Linked File As..."(Windows). However, imagine we are on a HPC and we don't have the folder to save it to on our computer, how would we do this? 

## curl

There are several similar tools for doing the task of downloading linked files. Two common tools for this are `curl` and `wget`. For this application and most applications they will provide the same functionality. There are minor differences between `curl` and `wget` that are beyond the scope of this course and, in reality, most uses. We will be using `curl` here, but we will give an example of `wget` in a dropdown menu at the end of this section along with an additonal dropdown providing a brief overview the differences between `curl` and `wget` for those that wish to dig a bit deeper. Okay, so let's start by downloading the file. We can right-click the hyperlink above or [here]() and select "Copy Link". Next: we will go to our command line and type:

```
curl -O -L [paste your link here]
```

> **NOTE:** The `-O` above is a capital letter O and ***NOT*** a zero!

It should look like:

```
curl -O -L http://wdfgnsjkdgnwkg
```

Let's briefly talk about the options of this command:

- `-O` This tells curl to keep the same name for the file as it appears on the host server. In this case, advanced_shell.zip. 

> **NOTE:** If for some reason you wanted to change the name to something different as you were downloading the file you would use the `-o` option instead of `-O` and provide the name you'd prefer to use instead. This is sometimes useful if the URL you are downloading from the internet has a parameter (has an ending of `?` followed by some text, something like `?raw=true` is particularly common when downloading files from GitHub. Of course, you can always just use the `mv` after you download the file aswell)

- `-L http://wdfgnsjkdgnwkg` This is the linked file that you would like to download from the host server.

Now if we look inside our directory, we should see a `advanced_shell.zip` file. Let's unpack this zip file and move inside of it, by using:

```
unzip advanced_shell.zip
cd advanced_shell
```

Now you should be able to see the toy text files that we will be using in this exercise by using:

```
ls -l
```

<details>
  <summary><b>Click here for an example of doing this in <code>wget</code></b></summary>
  The command below is an example <code>wget</code> command that you can use to accomplish the same task as we did in <code>curl</code>:
  <pre>
  wget  http://wdfgnsjkdgnwkg</pre>
  This code should be pretty self-explanatory. You are calling the <code>wget</code> command and providing it with the link that you would like to download.
  <hr />
</details>

<details>
  <summary><b>Click here for a bit more depth into the difference between <code>curl</code>and <code>wget</code></b></summary>
  One advantage that <code>curl</code> has is that you can provide it with multiple files to download by providing multiple <code>-O</code> options like:
  <pre>
  curl -L -O [http://www.example.com/data_file_1.txt] -O [http://www.example.com/data_file_2.txt]</pre>
  But you can also just accomplish this task by running curl on each linked file. <code>wget</code> sort of has the ability to do this as well, but it requires that you make a text file with the linked files and use the <code>-i</code> option. Overall, this benefit feels pretty minor.<br><br>
  <code>wget</code> has the nice perk of being able to recursively download a directory. What that means is that if a directory that you're downloading has subdirectories, it will downloading those subdirectories contents as well. For this you would use:
  <pre>
  wget -r http://www.example.com/data_directory/</pre>
  The <code>-r</code>, or <code>--recursive</code> is telling <code>wget</code> to recursivley download the directory. At first glance, this would appear to be <b><i>REALLY</i></b> useful, however most of the time one downloads a directory from a link, it is almost always compressed into a <code>.zip</code> file or other compression file. In that case you don't need to recrusively download because it is a file and not a directory.<br><br>
  In summary, either of these commands will do what you need them to do in the overwhelming majority of cases, so it is mostly personal preference as to which one you use.
  <hr />
</details>

Now that we have downloaded our toy datasets, we are ready to dive into learning more advanced bash!

[Next Lesson >>>]()

[Back to Schedule](../README.md)