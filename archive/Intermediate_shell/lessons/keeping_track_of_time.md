# Keeping Track of Time

We don't always just submit a command and come back later. There are times when you want to keep track of what is going on, see how long a task takes for future use, or run a command in the background while you continue to use the command line.

**Topics discussed here are:**

[Watch](keeping_track_of_time.md#watch)

[Time](keeping_track_of_time.md#time)

[bg](keeping_track_of_time.md#bg)


***************

## Watch

Sometimes one may want to see the ouptut of a command that continuously changes. The `watch` command is particularly useful for this. Add `watch` before your command and your command line will take you to an output page that will continually up your command. Common uses for `watch` could be:

1) Viewing as files get created

```
watch ls -lh <directory>
```

2) Monitoring jobs on the cluster

```
watch squeue -u <username>
```

The default interval for update is two seconds, but that can be altered with the `-n` option. Importantly, the options used with `watch` command need to be placed ***before*** the command that you are watching or else the interpreter will evaluate the option as part of the watched command's options. An example of this is below:

Update every 4 seconds
```
watch -n 4 squeue -u <username>
```


## Time

Sometimes you are interested to know how long a task takes to complete. Similarly, to the `watch` command you can place `time` infront of a command and it will tell you how long the command takes to run. This can be particularly useful if you have downsampled a dataset and you are trying to estimate long long the full set will take to run. An example can be found below:

```
time ls -lh
```

The output will have three lines:

```
real	0m0.013s
user	0m0.002s
sys	0m0.007s
```

**real** is most likely the time you are interested in since it displays the time it takes to run a given command. **user** and **sys** represent CPU time used for various aspects of the computing and can be impacted by multithreading. 

## bg

Sometimes you may start a command that will take a few minutes and you want to have your command prompt back to do other tasks while you wait for the initial command to finish. To do this, you will need to do two things:

1) Pause the command with `Ctrl` + `Z`. 
2) Send the command to the ***b***ack***g***round with the command `bg`. When you do this the command will continue from where it was paused.
3) If you want to bring the task back to the ***f***ore***g***round, you can use the command `fg`.

In order to test this, we will briefly re-introduce the `sleep` command. `sleep` just has the command line do nothing for a period of time denoted in seconds by the integer following the `sleep` command. This is sometimes useful if you want a brief pause within a loop, such as between submitting a bunch of jobs to the cluster (as we did in [insert lesson here]). The syntax is:

```
sleep [integer for time in seconds]
```

So if you wanted there to be a five second pause, you could use:

```
sleep 5
```

Now that we have re-introduced the `sleep` command let's go ahead and pause the command like for 180 seconds to simulate a task that is running that might take a few minutes to run.

```
sleep 180
```

Now type `Ctrl` + `Z` and this will pause that command. Followed by the command to move that task to running in the background with:

```
bg
```

The `sleep` command is now running in the background and you have re-claimed your command-line prompt to use while the `sleep` command runs. If you want to bring the `sleep` command back to the foreground, type:

```
fg
```

And if it is still running it will be brought to the foreground.

The place that this can be really useful is whenever you are running commands/scripts that take a few minutes to run that don't have large procesing requirements. Examples could be:

- Indexing a fasta/bam file
- Executing a long command with many pipes
- You are running something in the command line and need to check something

Oftentimes, it is best just to submit these types of jobs to the cluster, but sometimes you don't mind running the task on your requested compute node, but is taking a bit longer than you anticipated or something came up. 
