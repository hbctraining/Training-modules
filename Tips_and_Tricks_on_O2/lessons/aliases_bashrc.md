## Setting up some `alias`es <a name="alias"></a>

In your terminal, do the following:

```bash
$ cd

$ ls -l

$ ll
```

`ll` should have output the same thing as `ls -l`. Why does it work this way? This is because the HMS-RC folks have internally setup what is called an **alias**. 

A **shell alias is a shortcut to reference a command**. It can be used to avoid typing long commands. For common patterns it can reduce keystrokes and improve efficiency. A simple example is setting default options on commands to avoid having to type them each time a command is run.

For example suppose that because you are just starting out on the cluster, and you prefer to confirm deleting a file before using the `rm` command. Remember that the `rm` command supports this with the `-i` option. To avoid forgetting to use the `-i` option each time, an alias can be created so that each time `rm` is run it will use the `-i` option and prompt the user to confirm.


```bash
$ alias rm='rm -i'
```

However, this alias is only going to be available to you while that Terminal window is open. If you wanted to **use that alias all the time, what would you do?** 

You would add it to `~/.bashrc`! Let's open `~/.bashrc` and add a few commands to it. At the bottom of the file you should see a header titled "User specific aliases". Under that header go ahead and add the alias.

```bash
$ vim ~/.bashrc
```

Add in a line at the end of your `.bashrc` file:

```
alias rm='rm -i'
```


Now, we can source the `.bashrc` file for the alias to take effect and we can try it out. You should see the question `
remove draft.txt?` and here you can answer `n` for No.

```bash
$ source ~/.bashrc

$ rm  ~/unix_lesson/other/draft.txt 
```

As we mentioned, aliases are super helpful for long commands that we are repeatedly having to tyoe out. A good example of this is the `srun` command for starting and interactive session. **First exit the interactive session and get on a login node, if you are not there already.**

```bash
$ alias o2i='srun --pty -p interactive -t 0-12:00 --mem 2G --reservation=HBC /bin/bash'
```

Now you can test it out!

```bash
$ o2i
```

Similar to what we did above, you can put this (or a similar) command in the `.bash_profile` file so it is available when you log on next time.

> ### `.bashrc` versus `.bash_profile`
> `.bash_profile` is executed for login shells, while `.bashrc` is executed for interactive non-login shells. When you login (type username and password) to O2 the `.bash_profile` is executed. So if you want the alias available **only** when you login, you will want to put it in your `.bash_profile`. 
