# Learning Objectives
- Create a `scratch` space on O2
- Utilizing aliases to reduce the need to rememeber long or tedious commands
- Editing `.bashrc` file to modify your default environment
- Evaluate how much space you are using on O2

## Logging into O2

For this workshop we will be using our own accounts to log into O2. These have been created for us by the [HMS Research Computing (HMS-RC) team](https://it.hms.harvard.edu/our-services/research-computing) and they are the folks that manage the O2 cluster. .

> If you do not already have one and are interested in getting your own personal account on O2, please follow the instructions provided [here](https://harvardmed.atlassian.net/wiki/spaces/O2/pages/1918304257/How+to+request+or+retain+an+O2+account) after this module.

Let's get started with the hands-on component by typing in the following command to log into our command-line:

<p align="center">
<img src="../img/O2_login.gif" width="600">
</p>

```
ssh username@o2.hms.harvard.edu
```

You will receive a prompt for your password, and you should type in your associated password. 

***Note: that the cursor will not move as you type in your password***.

A warning might pop up the first time you try to connect to a remote machine, type <kbd>Yes</kbd> or <kbd>Y</kbd>, then hit <kbd>Enter/Return</kbd>.

You will be given the option for how you would like to two-factor authenticate:

```
Duo two-factor login for <username>

Enter a passcode or select one of the following options:

 1. Duo Push to XXX-XXX-XXXX
 2. Phone call to XXX-XXX-XXXX
 3. SMS passcodes to XXX-XXX-XXXX

Passcode or option (1-3): 
```

Select either <kbd>1</kbd>, <kbd>2</kbd> or <kbd>3</kbd> depending on your preferred method to authenticate and hit <kbd>Enter/Return</kbd>.

Once logged in, you should see the O2 icon, some news, and the command prompt, e.g. [username@login01 ~]$.

> Note 1: ssh stands for secure shell. All of the information (like your password) going between your computer and the O2 login computer is encrypted when using ssh.


### Creating a scratch space

In the course of your analyses, you might find that you you create many large intermediate files, such as SAM files. Oftentimes, these files are purely intermediary, but can take up lots of space on the cluster (>100Gb each). These intermediate can quickly fill your allotted space on the cluster and therefore it is recommended that you utilize "scratch" space on the cluster. `scratch` space on the cluster is much like scratch paper that you may use on the exam. It is a space when you can do your "scratch" work. The files on `scratch` **are not backed up** and **will be deleted in 30 days**. However, you can be allocated ~25TB of space which is great for intermediate large files. We will be using the `scratch` space extensively today, but we will not be using it for large files for the sake of not needlessly consuming space on the cluster.

While on the login node, we will create our space on `/n/scratch/`. In order to do so, we will need to run a script provided by the HMS Research Computing team:

```
$ sh /n/cluster/bin/scratch_create_directory.sh 
```

> Note: You *MUST* be on a login node in order to create a space on `/n/scratch3`.

It will prompt you with the following:

```
Do you want to create a scratch directory under /n/scratch3/users? [y/N]> 
```

To this you will respond <kbd>y</kbd>, then hit <kbd>Enter/Return</kbd>.


Next, it will prompt you with:

```
By typing 'YES' I will comply with HMS RC guidelines for using Scratch3.
I also confirm that I understand that files in my scratch directory WILL NOT BE BACKED UP IN ANY WAY.
I also understand that THIRTY DAYS after I last access a given file or directory in my scratch directory,
it will be DELETED with NO POSSIBILITY of retrieval.

I understand HMS RC guidelines for using Scratch: 
```

Type <kbd>YES</kbd>, then hit <kbd>Enter/Return</kbd>.

It should return:

```
Your scratch3 directory was created at /n/scratch/users/<users_first_letter>/<username>.
This has a limit of 25TiB of storage and 2.5 million files.
You can check your scratch quota using the quota-v2 command.
```
> Note: You might notice that your storage limit is 25TiB and might be confused by this unit. Generally speaking, you can think of a KiB =~ kB, MiB =~ MB, GiB =~ GB and TiB =~ TB. This nonmenclature comes from the difference that computers measure space in binary (base 2), while the prefixes are derived from a metric (base 10) system. So, a KiB is actually 1024 bytes worth of space, while a KB is 1000 bytes worth of space. The table below can help further demonstrate these differences.
> | Unit | Size in Bytes | Unit | Size in Bytes |
> |------|---------------|------|---------------|
> | Kilobyte (kB) |1,000<sup>1</sup> = 1,000 | Kibibyte (KiB) | 1,024<sup>1</sup> = 1,024 |
> | Megabyte (MB) |1,000<sup>2</sup> = 1,000,000 | Mebibyte (MiB) | 1,024<sup>2</sup> = 1,048,576 |
> | Gigabyte (GB) |1,000<sup>3</sup> = 1,000,000,000 | Gibibyte (GiB) | 1,024<sup>3</sup> = 1,073,741,824 |
> | Terabyte (TB) |1,000<sup>4</sup> = 1,000,000,000,000 | Tebibyte (TiB) | 1,024<sup>4</sup> = 1,099,511,627,776 |
> | Petabyte (PB) |1,000<sup>5</sup> = 1,000,000,000,000,000 | Pebibyte (TiB) | 1,024<sup>5</sup> = 1,125,899,906,842,620 |

We can anvigate to our newly created scratch space using this command:

```bash
cd /n/scratch/users/${USER:0:1}/${USER}/
```

Now that we have created our `scratch` space, you will need to start an interactive session. A login node's primary function is to enable users to log in to a cluster, it is not meant to be used for any actual work/computing. Since we will be doing some work, let's get on to a compute node:

```
$ srun --pty -p interactive -t 0-3:00 --mem 1G  /bin/bash
````

Make sure that your command prompt is now preceded by a character string that contains the word `compute`.

# Aliases and .bashrc profile

Now that we have created a space on scratch, you might be interested in having a shortcut to getting there just like you have a shortcut to get to your home directory by using:

```bash
cd ~
```

where the `~` is a shorthand for your home directory.

This is where aliases can be very helpful. Aliases are shortcuts that you might employ to make common, long commands easier to use. Let's go ahead and make an alias to help us change directories to our scratch directory. 

```bash
alias cd_scratch='cd /n/scratch/users/${USER:0:1}/${USER}/'
```

The `alias` command let's us make an alias, then we name our alias `cd_scratch` and then set the alias for what we want it to be shorthand for, `cd /n/scratch/users/${USER:0:1}/${USER}/`. Currently, we should be in our home directory, and we can confirm that with:

```bash
pwd
```

The return should look like `/home/your_username`.Now we can use our newly created alias to change directories to our scratch space:

```bash
cd_scratch
```
Now we should be able to see that we are within our scratch space by using:

```bash
pwd
```
And now it should say that we are within `/n/scratch/users/<first_letter_of_username>/<username>/`

This is great, but this alias is not saved anywhere but the currently computing node that you are using. If we exit the computing node with:

```bash
exit
```

And now we try our alias again:

```bash
cd_scratch
```

It will return:

```bash
-bash: cd_scratch: command not found
```

Ideally, we would like to find a way to save our aliases and that is one way we can use our `.bashrc` profile!

## .bashrc profile

Much like one might have a routine when coming home, like taking their shoes and jacket off, when you log onto your computer or log into any computing cluster, the computer will look for a file with a set of preferences that you have, called the `.bashrc`. This file is located in your home directory and is preceded by a `.`. This period means that it is a "hidden file". You can you the `-a` option with `ls` in order to see **all** files:

```bash
cd ~
ls -a
```

You can see that there are a number of these hidden files that are responsiable for various things. However, you will see one called `.bashrc` and this is the one that we will be adding some preferences too. 

**MEETA CHECK THIS NOTE AND REPHRASE IT AS NEEDED. I THINK `.bashrc` IS SOURCED ON LOGIN AS WELL.**
> ### `.bashrc` versus `.bash_profile`
> You might notice a file also called `.bash_profile`. `.bash_profile` is executed for login shells, while `.bashrc` is executed for interactive non-login shells. When you login (type username and password) to O2 the `.bash_profile` is executed. So if you want the alias available **only** when you login, you will want to put it in your `.bash_profile`. 

So let's open up our `.bashrc` using `vim`:

```bash
vim .bashrc
```

Enter insert mode by typing <kbd>i</kbd>, then we can add our alias anywhere in our `.bashrc`:

```bash
# Alias for navigating to our scratch space
alias cd_scratch='cd /n/scratch/users/${USER:0:1}/${USER}/'
```

Now, we can exit `vim` by pressing <kbd>ESC</kbd> and the typing <kbd>:</kbd> + <kbd>w</kbd> + <kbd>q</kbd> + <kbd>Enter/return</kbd>. Next, we need to do one of two things in order for our alias to work:

1) We could log out and log back into O2 and since we are "walking into our house", O2 would automatically *source* this file, or
2) If we would like to stay logged in, we can run the `source` command:

```bash
source .bashrc
```

Now if we type:

```bash
cd_scratch
```

We can see that it take us to our scratch space, which we can confirm with:

```bash
pwd
```

Now you can create lots of aliases. For example, one that can be useful is:

```bash
# Requests an interactive node on O2 for 12 hours and 4GB of memory
alias o2i='srun --pty -p interactive -t 0-12:00 --mem 4G /bin/bash'
```

This alias allows the user to request an interactive job on O2 for 12 hours and allocate 4GB of memory. This way you don't need to remember all of the option that you need for an interactive job.

### What else do people put in their .bashrc profile?

Placing aliases within a `.bashrc` file is quite common, but it isn't the only thing that people often place within a `.bashrc` file. For example, some people will specifiy the location of their R libraries if they use R on the O2 cluster:

```bash
# DO NOT RUN
# Example of how people might specify the location of their R packages on O2 
echo 'R_LIBS_USER="~/R-4.1.2/library"' >  $HOME/.Renviron
export R_LIBS_USER="~/R-VersionSelected/library"
```  

Sometimes people will want to always have some software that they installed in their home directory availible to them, so they will add the path to that software's `bin` directory to their `$PATH` variable:

```bash
# DO NOT RUN
# Example of how to add a path to your $PATH variable
PATH=${PATH}:/home/${USER}/my_software_package/bin/
export PATH
```

These are just a few examples of items that one might commonly see in other people's `.bashrc` profiles.

# Writing to Scratch

Just like any other storage area on O2, we can copy data to `scratch`. For example, let's copy some scripts over that we will be using in some later exercises:

```bash
cd /n/scratch/users/${USER:0:1}/${USER}/
cp -r /n/groups/hbctraining/sleep_scripts . 
```

> Note: `${USER}` is just a environment variable in bash that hold your username and `${USER:0:1}` just some shorthand to get the first letter of your username.

# Checking Quotas

Now that we have created our `scratch` space on O2 let's discuss how we can know how much space we are using in our various directories. 

## quota-v2

The first helpful command is unique to O2, but it does an excellent job summarizing a user's disk usage on the cluster. This command is `quota-v2` and it will outline your disk usage in your home directory, scratch directory and any groups that you belong to. Let's try it out:

```bash
quota-v2
```

An example output might look like:

```
                   Active Compute usage for <USER> (As of 2024-05-06 09:00:00)                    
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓
┃ path                     ┃ type  ┃ username ┃ usage      ┃ storage limit ┃ last update         ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━┩
│ /home                    │ user  │ <USER>   │ 90.96 GiB  │ 100.00 GiB    │ 2024-05-06 09:10:03 │
├──────────────────────────┼───────┼──────────┼────────────┼───────────────┼─────────────────────┤
│ /n/app                   │ user  │ <USER>   │ 122.70 KiB │               │ 2024-05-06 09:10:02 │
├──────────────────────────┼───────┼──────────┼────────────┼───────────────┼─────────────────────┤
│ /n/data1/cores/bcbio     │ user  │ <USER>   │ 7.94 TiB   │ 140.00 TiB    │ 2024-05-06 09:00:00 │
│                          │ group │          │ 120.32 TiB │               │                     │
├──────────────────────────┼───────┼──────────┼────────────┼───────────────┼─────────────────────┤
│ /n/data1/cores/bpf-bcbio │ group │          │ 30.24 GiB  │ 1.00 TiB      │ 2024-05-06 09:00:00 │
├──────────────────────────┼───────┼──────────┼────────────┼───────────────┼─────────────────────┤
│ /n/groups/bcbio          │ group │          │ 1.94 TiB   │ 5.00 TiB      │ 2024-05-06 09:00:00 │
├──────────────────────────┼───────┼──────────┼────────────┼───────────────┼─────────────────────┤
│ /n/groups/hbctraining    │ user  │ <USER>   │ 61.62 GiB  │ 1.00 TiB      │ 2024-05-06 09:00:00 │
│                          │ group │          │ 962.09 GiB │               │                     │
└──────────────────────────┴───────┴──────────┴────────────┴───────────────┴─────────────────────┘
                            Scratch usage for <USER> (As of 2024-05-06 09:00:00)                             
┏━━━━━━━━━━━━┳━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━┓
┃ path       ┃ type ┃ username ┃ usage    ┃ used inodes ┃ storage limit ┃ inode limit ┃ last update         ┃
┡━━━━━━━━━━━━╇━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━┩
│ /n/scratch │ user │ <USER>   │ 2.11 TiB │ 131         │ 25.00 TiB     │ 2500000     │ 2024-05-06 09:08:48 │
└────────────┴──────┴──────────┴──────────┴─────────────┴───────────────┴─────────────┴─────────────────────┘
```

 In this example, we can see that this user is using 90.98GiB of their allotted 100GiB within the home directory and 2.11TiB of their allotted 25TiB in their scratch space. 

> Note: If you have trouble with `quota-v2` and getting an error message like:
> `bash: quota-v2: command not found`
> You need to make sure that `/n/cluster/bin/` is within your $PATH variable. You can check your $PATH variable by:
> ```
> # ONLY RUN IF YOUR quota-v2 IS NOT WORKING
>echo $PATH
> ```
> If it does not have `/n/cluster/bin/`, then you can add it with:
> ```
> # ONLY RUN IF YOUR quota-v2 IS NOT WORKING
> PATH=${PATH}:/n/cluster/bin/
> export PATH
> ```
> However, you will need to do this each time you log onto the cluster. The easier way will be to put the above commands into your `.bashrc` profile.

## du

The `quota-v2` command is a very useful summary of your storage usage and your storage limits. However, it comes with two caveats:

1) It is O2-specific. This command is something that the folks at HMS-RC have written to help us. If you are on other clusters, they may have a similar command or they may not, however it will almost certainly look different than this. If you plan on working on other computing clusters, then this command will not likely be very exportable.
2) It only gives the user a broad overview of how their disk usage allocation is being used. If you want to dig further into which directories/files within a given directory are taking up the most space then we will need to use a different command.

The `du` command stands for "disk usage" and it will traverse the directories and subdirectories of the directory that you are currently using located in and tell you the files sizes of the files. This command on it's own has two drawbacks:

1) If you are within a directory that has large file system underneath it, it maybe take a while to run and it will be telling you the size (in bytes) of thousands of files, which will be difficult to sort through.
2) It is telling you the size in bytes, which is not always the most intuitative way to visualize data sizes

Fortunately, there are a few options within the `du` command that are extremely useful:

- `-h` This option makes the file sizes "human-readable". In others word, it will tell you the sizes of the files in kB, Mb, GB, TB, etc.
- Limiting the scope of your `du` output
 - `--max-depth=1` This option will look within each file and directory of the given directory and summarize the total space for those files and/or directories (and its subdirectories). You can increase the integer to `--max-depth=2` or `--max-depth=3` if you would like the summary to traverse subdirectories deeper.
 - `-s` This option will summarize the size of the given directory

Let's go ahead and try this a bit and look at the size usage of our current scratch directory:

```bash
du -h --max-depth=1 .
```


This should give you a good idea of what directories within your scratch directory are consuming the most space. Now let's consider if we wanted to see how much space our scratch directory was using:

```bash
du -sh .
```

We can change the directory that we would like to run `du` on but providing it a path to the directory instead of using `.`. For example, we can summarize the of our home directory with:

```bash
du -sh /home/${USER}
```

## `.snapshot`

When we discussed `.bashrc` profiles, we discussed hidden files. In addition to hidden files, O2 has a hidden directory, which you can't even see with `ls -a`, that contains back-ups of your file system. These back-ups occur in only the `/home/`, `/n/data1/`, `/n/data2/` and `/n/groups/` file systems and these back-ups will occur everyday for the past 14 days and every week for the past 60 days. Importantly, these back-ups **DO NOT** occur in `/n/scratch/`. 

In order to see what is in `.snapshot`, let's go to our `home` directory and type:

```bash
ls .snapshot/
```

This should return 20 directories that look like:

```bash
o2_home_<date>_<time>
```

If we looking inside of one of these directories:

```
# Edit the data and time appropriate for your files
ls -lh .snapshot/o2_home_<date>_<time>/
```

This should look like what your `home` directory looked like at the data and time you selected.

If you have a file you'd like to recover, you can simply copy it to the present like:

```bash
# EXAMPLE CODE: DO NOT RUN
cp .snapshot/old_copy_of_file filename_to_be_brought_to_present
```

It can be noted that each directory within the file systems that have snapshot back-ups, so you can either travel, for example, from your `home` directory to the file that you are looking for in 3 subdirectories down within `.snapshot` or you can travel those three subdirectories down and then use `.snapshot` within that directory to retrieve a file.

***

[Next Lesson >>](moving_files.md)

[Back to Schedule](../README.md)

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
