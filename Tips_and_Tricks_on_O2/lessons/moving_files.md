# Moving files on and off the cluster

At some point you will need to [move files to and from a cluster](moving_files.md#copying-files-to-and-from-the-cluster), [get files from a website](moving_files.md#dowloading-external-data), [create a symbolic link](moving_files.md#symbolic-links-or-sym-links-), or [check that your transfers have worked](moving_files.md#md5sum)


## GLOBUS

## Copying files to and from the cluster

You can use a program like filezilla to copy over files, but there are other way to do so using the command line interface. When you obtain your data from the sequencing facility, it will likely be stored on some remote computer and they will give you login credentials which will allow you to access it. There are various commands that can be used to help you copy those files from the remote computer over to 1) your local computer, 2) O2, or 3) whatever cluster environment you plan to work on. We present a few options here.

### `scp`

Similar to the `cp` command to copy there is a command that allows you to **securely copy files between computers**. The command is called `scp` and allows files to be copied to, from, or between different hosts. It uses ssh for data transfer and provides the same authentication and same level of security as ssh. 

In the example below, the first argument is the **location on the remote server** and the second argument is the **destination on your local machine**. 

> *You can also do this in the opposite direction by swapping the arguments.*

```bash
$ scp username@transfer.rc.hms.harvard.edu:/path/to/file_on_O2 Path/to/directory/local_machine
```

Let's try copying over the README file from your `unix_lesson` folder. **First open up a new terminal window.**  Look and see where you currently are:

```bash
$ pwd
```

Then type in:

```bash
$ scp rc_trainingXX@transfer.rc.hms.harvard.edu:~/unix_lesson/other/draft.txt  .
```

Now see that the file has transferred over:

```bash
$ less draft.txt
```

> **NOTE:** Windows users may encounter a permissions error when using `scp` to copy over locally. We are not sure how to troubleshoot this, but will update materials as we obtain more information.

### `rsync` 

`rsync` is used to copy or synchronize data between directories. It has many advantages over `cp`, `scp` etc. It works in a specific direction, i.e. from the first directory **to** the second directory, similar to `cp`.

**Salient Features of `rsync`**

* If the command (or transfer) is interrupted, you can start it again and *it will restart from where it was interrupted*.
* Once a folder has been synced between 2 locations, the next time you run `rsync` it will *only update and not copy everything over again*. 
* It runs a check to ensure that every file it is "syncing" over is the exact same in both locations. This check is run using a version of ["checksum"](https://en.wikipedia.org/wiki/Checksum) which ensures the data integrity during the data transfer process. 

> You can run the checksum function yourself when transferring large datasets without `rsync` using one of the following commands (or similar): `md5`, `md5sum`.


### Between directories on the same machine

```bash
#DO NOT RUN
$ rsync -av ~/large_dataset/. /n/groups/dir/groupdata/
```

### Between different machines

When copying over large datasets to or from a remote machine, `rsync` works similarly to `scp`.

```bash
#DO NOT RUN
$ rsync -av -e ssh testfile username@transfer.rc.hms.harvard.edu:~/large_files/
```

* `a` is for archive - means it preserves permissions (owners, groups), times, symbolic links, and devices.
* `v` is for verbosity - means that it prints on the screen what is being copied
* `-e ssh` is for encryption - means that we want to use the ssh protocol for encryption of the file transfer

*More helpful information and examples using rsync can be found [at this link](https://www.comentum.com/rsync.html)*

> Please do not use O2’s login nodes for transferring large datasets (like fastq files) between your computer and O2 with `rsync` or `scp`. Instead, use the transfer nodes `ssh eCommons@transfer.rc.hms.harvard.edu`.



## Downloading external data

### `curl`

Oftentimes, you will find yourself wanting to download data from a website. There are two comparable commands that you can use to accomplish this task. The first one is `curl` and the most common syntax for using it is:

```
curl -L -O [http://www.example.com/data]
```

The `-O` option will use the filename given on the website as its filename to write to. Alternatively, if you wanted to name it something different, you can use the `-o` option and then follow it with the preferred name like:

```
curl -L -o preferred_name  [http://www.example.com/data]
```

The `-L` option tells curl to follow any redirections the HTML address gives to the data. ***I think this is right, but I am really don't understand thins. I just know that I am supposed to do it.***

Lastly, if you connection gets lost midway through a transfer, you can use the `-C` option followed by `-` to resume the download where it left off. For example:

```
curl -C - -L -O [http://www.example.com/data]
```

### `wget`


A common alternative to `curl` is `wget` and many purposes they are extremely similiar and which you decide to use is a matter of personal preference. The general syntax is a bit more friendly on `wget`:

```
wget [http://www.example.com/data]
```

If you lose your connection during the download process and would like to resume it midway through, the `-c` will ***c***ontinue the download where it left off:

```
wget -c [http://www.example.com/data]
```

### `curl` versus `wget`

For many purposes `curl` and `wget` are similar, but there are some small differences:

1) In `curl` you can use the `-O` option multiple times to carry out multiple downloads simulatenously. 

```
curl -L -O [http://www.example.com/data_file_1] -O [http://www.example.com/data_file_2]
```

2) In `wget` you can recursively download a directory (meaning that you also download all subdirectories) with the `-r`. Typically this isn't super useful because the source will typically pack this up all into a compressed package, but nonetheless it is something that `wget` can do that `curl` cannot do.

In general, `curl` has a bit more options and flexibility than `wget` but the vast majority, if not all, of those options are ***far*** beyond the scope of this course and for this course comes down to a personal preference. 

## md5sum

Sometimes you are copying files between two locations and you want to ensure the copying went smoothly or are interested to see if two files are the same. Checksums can be thought of as an alphanumeric fingerprint for a file and they are used to ensure that two files are the same. It is common for people/insitutions to provide an list of md5sums for files that are availible to download. `md5sum` is one common checksum. ***Importantly, it is theorectically possible that two different files have the same md5sum, but it is practically nearly impossible.*** The syntax for checking the md5sum of a file is:

```
md5sum <file>
