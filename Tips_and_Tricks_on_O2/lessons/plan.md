# Plan

1. Login
2. Create Scratch
3. Move to scratch
4. Wget/curl some small object or objects to their scratch space (scripts we will use later for job dependencies)
5. Check their quota
6. scp the data from scratch to local machine
7. scp the data to home directory
8. rsync data to home directory
9. Make a symbolic link
10. Create alias to `cd scratch`
11. Submit job + job with dependency
12. Introduce watch with squeue -u $USER
13. Discuss SLURM job arrays
14. Discuss snapshot
