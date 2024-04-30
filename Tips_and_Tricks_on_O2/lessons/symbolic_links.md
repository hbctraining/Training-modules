## Symbolic Links

Symbolic links, or "sym links", are an important shortcut on the command line that can save you lots of space. A symbolic link points to a location and can be very useful when software wants to have a file in a particular location. Of course, you can simply copy a file and have it stored in two locations, but it could be a large file and now it is taking up space in two locations. To avoid doing this, you can set-up a symbolic link using the following syntax:

```
ln -s <file_to_be_linked_to> <link_name>
```

Let's assume we have a file named `reads.fasta` inside the directory `raw_reads`, but we want a symbolic link named `link_to_reads.fasta` to link to the reads in the directory that we are currently in, which is in the parent directory of `raw_reads`. This command would look like:

```
ln -s raw_reads/reads.fasta link_to_reads.fasta
```

When you now view this directory with `ls -l`, it will display the link like:

```
link_to_reads.fasta -> raw_reads/reads.fasta
```

If you want to keep the current name you can use `.` for `<link name>`.

***Importantly, if the original file is deleted or moved, the symbolic link will become broken.*** It is common on many distributions for symbolic links to blink if they becomes broken.

The `-s` option is necessacary for creating a symbolic link. Without the `-s` option, a ***hard link*** is created and modifications to the linked file will be carried over to the original. Generally, speaking hard links are typically not very common.



https://github.com/hbctraining/In-depth-NGS-Data-Analysis-Course/blob/master/sessionVI/lessons/more_bash.md#symlink
