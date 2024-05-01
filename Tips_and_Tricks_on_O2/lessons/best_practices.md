# Learning Objectives
-
-
-

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

> Due to the limited storage space on `/home`, we are going to take advantage of `scratch` to hold some of our intermediate files for this workshop. This is a very common use of the scratch space as many analyses will have large intermediate files, which would otherwise fill up our home directories.

While on the login node, we will create our space on `/n/scratch3`. In order to do so, we will need to run a script provided by the HMS Research Computing team:

```
$ sh /n/cluster/bin/scratch_create_directory.sh 
```

> Note: You *MUST* be on a login node in order to create a space on `/n/scratch3`.

It will prompt you with the following:

```
Do you want to create a scratch3 directory under /n/scratch3/users? [y/N]> 
```

To this you will respond <kbd>y</kbd>, then hit <kbd>Enter/Return</kbd>.


Next, it will prompt you with:

```
By typing 'YES' I will comply with HMS RC guidelines for using Scratch3.
I also confirm that I understand that files in my scratch directory WILL NOT BE BACKED UP IN ANY WAY.
I also understand that THIRTY DAYS after I last access a given file or directory in my scratch directory,
it will be DELETED with NO POSSIBILITY of retrieval.

I understand HMS RC guidelines for using Scratch3: 
```

Type <kbd>YES</kbd>, then hit <kbd>Enter/Return</kbd>.

It should return:

```
Your scratch3 directory was created at /n/scratch/users/<users_first_letter>/<username>.
This has a limit of 25TiB of storage and 2.5 million files.
You can check your scratch quota using the quota-v2 command.
```

Now that we have created our `scratch` space, you will need to start an interactive session. A login node's primary function is to enable users to log in to a cluster, it is not meant to be used for any actual work/computing. Since we will be doing some work, let's get on to a compute node:

```
$ srun --pty -p interactive -t 0-3:00 --mem 1G  /bin/bash
````

Make sure that your command prompt is now preceded by a character string that contains the word `compute`.

# Checking Quotas

## quota?

## du -sh

# Writing to Scratch
