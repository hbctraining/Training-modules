# Job Dependencies

## Learning Objectives

In this lesson we will:
- Discuss the advantages of utilizing job dependencies
- Implement a job dependency

## What is a job dependency and why would I use it?

Most, if not all, high performance computer clusters (HPCCs) utilize a job scheduler. As we have previously discussed, O2 uses one of the most popular ones, SLURM. These job schedulers aim to allow for fair use of limited computational resources in a shared network. In order to most limit one's use of limited resources, it is oftentimes best practice to place programs that require different computational resources in different job submissions. For example, perhaps program A needs 12 CPUs, 36GB of memory and 6 hours, but the output of program A is used in program B and it requires 1 CPU, 4GB of memory and 8 hours. In this case one *could* request 12 CPUs, 36 GB and 14 hours of compute time, but when program B is running you would be wasting 11 CPUs and 32GB of memory. As a result this type of behavior is *strongly discouraged*.

Now you might be wondering, "Okay, so I need to make two separate jobs, but what if Job 1 running program A finishing at 2am, do I need to log onto the cluster to submit Job 2 running program B?". The good news is that you don't need to and this is the exact goal of job dependencies! Job dependencies allow you to queue jobs to be dependent on other jobs.

Job dependencies are very useful:
- When you have consecutive jobs you want to run
- When you don't want to/have to time manage the submission of consecutive jobs

> NOTE: Job dependencies are not unique to SLURM, many other job schedulers, like PBS, also have a feature similar to this!

## Job dependencies on SLURM

The syntax for using job dependencies in SLURM can be done in two ways:
1) It can be part of a SBATCH directive in your job submission script
2) It can be an option in your `sbatch` command

We will be doing the latter, but either way will use the `--dependency` option. This option has several arguments that it can accept, but the most useful one for the overwhleming number of circumstances is `afterok`. Using `afterok` means that after the following job ends without an error, then it will remove the hold on the dependent job. After the `afterok` part you can separate one or more jobs with colons to signify which jobs are dependent.

The syntax for a dependent job submission could look like:

```bash
# Not a real job submission
sbatch Job_1.sh
Submitted batch job 351
sbatch --dependency=afterok:351 Job_2.sbatch
```

We can visualize a sample workflow below:

<p align="center">
<img src="../img/Job_dependencies.png" width="400">
</p>

Multiple jobs can be dependent on a single job. COnversely, we can have a single job dependent on multiple jobs. If this is the case, then we just separate each job ID with colons like:

```bash
sbatch --dependency=afterok:353:354 Job_5.sbatch
```

> NOTE: While the behavior can change between implementations of SLURM, on O2, when a job exits with an error, it removes all `afterok` dependent jobs from the queue. Some other implementations of SLURM will not remove these jobs from the queue, but the provided reason when you check will be `DependencyNeverSatified`. In this case, you will need to manually cancel these jobs.

## Implementing a job dependency

Let's utilize a toy example so that we can see this in action:

```
vim sleep_step_1.sbatch 
```

Inside of this script it is going to be a simple script that runs two echo commands and does a pauses for 30 seconds in between them.

```bash
#!/bin/bash
# Toy example for understanding how job dependencies work
#SBATCH -t 0-00:01
#SBATCH -p priority
#SBATCH -c 1
#SBATCH --mem 1M
#SBATCH -o run_sleep_step_1_%j.out
#SBATCH -e run_sleep_step_2_%j.err

echo "I am going to take a nap." > sleep.out
sleep 30
echo "I have woken up." >> sleep.out
```

Now before we submit this, let's create the second script that will be dependent on the first script running:

```
vim sleep_step_2.sbatch 
```

Within the script we can insert:

```bash
#!/bin/bash
#SBATCH -t 0-00:01
#SBATCH -p priority
#SBATCH -c 1
#SBATCH --mem 1M
#SBATCH -o run_sleep_step_2_%j.out
#SBATCH -e run_sleep_step_2_%j.err

echo "I am going to take a another nap." >> sleep.out
sleep 30
echo "I have woken up again." >> sleep.out
```

Once we have written these two scripts we can go ahead and submit the first one:

```bash
sbatch sleep_step_1.sbatch 
```

It should return some text that says:

```
Submitted batch job [Job_ID]
```

Now we can submit the second job, while making it dependent on the above Job ID. In the below script replace `Job_ID` with the Job ID from above.

```bash
sbatch --dependency=afterok:Job_ID sleep_step_2.sbatch 
```

You can view your jobs, by using:

```bash
squeue -u $USER
```

And hopefully, if you were quick enough, you should be able to see that one of the jobs is not running and the `Reason` is `(Dependency)`. This let's you know that it is not running because it is waiting on a dependency.

Once both jobs finish, you can inspect the `sleep.out` file and it should look like:

```
I am going to take a nap.
I have woken up.
I am going to take a another nap.
I have woken up again.
```

While this is just an example, it allows us to highlight how you can create workflows and also allows you to optimize your job submissions to accomate being away from the cluster.

***

*This lesson has been developed by members of the teaching team at the [Harvard Chan Bioinformatics Core (HBC)](http://bioinformatics.sph.harvard.edu/). These are open access materials distributed under the terms of the [Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/) (CC BY 4.0), which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.*
