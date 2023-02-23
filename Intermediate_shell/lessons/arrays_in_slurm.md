
# Arrays in Slurm

When I am working on large data sets my mind often drifts back to an old Simpsons episode. Bart is in France and being taught to pick grapes. They show him a detailed technique and he does it successfully. Then they say:


<p align="center">
<img src="../img/simpsons.png" width="400">
</p>
<p align = "center">
We've all been here
</p>

A pipeline or process may seem easy or fast when you have 1-3 samples but totally daunting when you have 50. When scaling up you need to consider file overwriting, computational resources, and time.

One easy way to scale up is to use the array feature in slurm.

## What is a job array?

Atlassian says this about job arrays on O2: "Job arrays can be leveraged to quickly submit a number of similar jobs. For example, you can use job arrays to start multiple instances of the same program on different input files, or with different input parameters. A job array is technically one job, but with multiple tasks." [link](https://harvardmed.atlassian.net/wiki/spaces/O2/pages/1586793632/Using+Slurm+Basic#Job-Arrays).

Of course we don't want to run the same job on the same input files over and over, that would be pointless. This where ${SLURM_ARRAY_TASK_ID} comes in!


## What is ${SLURM_ARRAY_TASK_ID}?


