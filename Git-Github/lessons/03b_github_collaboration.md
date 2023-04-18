---
title: Version Control with Git
subtitle: Collaborations in GitHub
duration: 30
---

## Learning Objectives
* Collaborate pushing to a common repository

## Collaborating with Git and Github

For this next step, let's get into pairs, and give each other access to our `planets` repos. In all cases, you will be "Owner" for your own repo, and a "Collaborator" on your partner's repo.

The Owner needs to give the Collaborator access. On GitHub, click the settings button on the right, then select Collaborators, and enter your partner's Github username.

![Adding collaborators on GitHub](../img/github-add-collaborators.png)

Once the Collaborator has been added, he/she will get an email with the invitation. Go to the link in the invitation email and you should be able to see the Owner's repo on Github. 

The Collaborator can work on this project online or locally. To work on it locally, click on the green "Clone or download" button and copy the `SSH` address. Now on your computer (in Terminal), `cd` to another directory since you cannot have 2 folders called `planets` in the same folder. Next, make a copy of the Owner's repository locally using `git clone`:

~~~ {.bash}
$ git clone <paste copied URL>
~~~

![After Creating Clone of Repository](https://cdn.rawgit.com/hbc/NGS_Data_Analysis_Course/master/sessionVI/img/github-collaboration.svg)

The Collaborator can now make a change in his or her copy of the Owner's repository:

~~~ {.bash}
$ cd planets
$ nano pluto.txt
~~~
~~~ {.output}
It is so a planet!
~~~
~~~ {.bash}
$ git add pluto.txt
$ git commit -m "Some notes about Pluto"
~~~
~~~ {.output}
 1 file changed, 1 insertion(+)
 create mode 100644 pluto.txt
~~~

Then push the change to GitHub:

~~~ {.bash}
$ git push origin master
~~~
~~~ {.output}
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 306 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/vlad/planets.git
   9272da5..29aba7c  master -> master
~~~

Note that we didn't have to create a remote called `origin`:
Git does this automatically using that name when we clone a repository.

Please check your own `planets` repo online, you should have an additional file called `pluto.txt` created by your partner. To update your local repo with these changes, `cd` into the original planets directory/repo locally and `pull` the changes.

~~~ {.bash}
$ cd ~/planets      #### Modify this to the path of your original repo.
$ git pull origin master
~~~

Now we have 2 repos that you are collaborating with your partner on, one as an Owner and one as a Collaborator, and they are both available online on github.com as well as locally.

## Resolving conflicts

Collaborations are great but they make it very likely that someone's going to step on someone
else's toes, figuratively speaking. Essentially, this means that if 2 people are working on the same section of a document at the same time. This can even happen with a single person: if we are working on a document both locally and remotely. 

Version control helps us manage these [conflicts](../reference.html#conflicts) by giving us tools to [resolve](../reference.html#resolve) overlapping changes.

To see how we can resolve conflicts, we must first create one. In this case we will create a conflict by creating an "unsynced" document that we make changes to locally and on github.

### Make a change locally to mars.txt

Locally (in your Terminal) do the following to get synced up.

~~~ {.bash}
$ git pull
~~~

Now, let's make a change to the `mars.txt` document.

~~~ {.bash}
$ nano mars.txt
~~~
~~~ {.output}
Cold and dry, but everything is my favorite color
The two moons may be a problem for Wolfman
But the Mummy will appreciate the lack of humidity
This line added to local copy
~~~

Let's add and commit this change.

~~~ {.bash}
$ git add mars.txt
$ git commit -m "creating a conflict, step 1"
~~~


### Make a change on github to mars.txt

Now, without pushing the change to github, let's make a different change to `mars.txt` on GitHub:

~~~ {.output}
Cold and dry, but everything is my favorite color
The two moons may be a problem for Wolfman
But the Mummy will appreciate the lack of humidity
We added a different line in the github copy
~~~

Save the change on github!

### Push the local changes to github

Let's create the conflict (i.e. let's get git to complain)

~~~ {.bash}
$ git push origin master
~~~
~~~ {.output}
To https://github.com/vlad/planets.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'github.com:vlad/planets.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
~~~

![The conflicting changes](https://cdn.rawgit.com/hbc/NGS_Data_Analysis_Course/master/sessionVI/img/conflict.svg)

Git detects that the changes made in one copy overlap with those made in the other and stops us from trampling on our previous work.
What you have to do is pull the changes from GitHub, and [merge](../reference.html#merge) them into the copy they're currently working in, then push the modified file to Github.

~~~ {.bash}
$ git pull origin master
~~~
~~~ {.output}
remote: Counting objects: 5, done.        
remote: Compressing objects: 100% (2/2), done.        
remote: Total 3 (delta 1), reused 3 (delta 1)        
Unpacking objects: 100% (3/3), done.
From https://github.com/vlad/planets
 * branch            master     -> FETCH_HEAD
Auto-merging mars.txt
CONFLICT (content): Merge conflict in mars.txt
Automatic merge failed; fix conflicts and then commit the result.
~~~

`git pull` tells us there's a conflict, and marks that conflict in the affected file:

~~~ {.bash}
$ cat mars.txt
~~~
~~~ {.output}
Cold and dry, but everything is my favorite color
The two moons may be a problem for Wolfman
But the Mummy will appreciate the lack of humidity
<<<<<<< HEAD
We added a different line in the other copy
=======
This line added to Wolfman's copy
>>>>>>> dabb4c8c450e8475aee9b14b4383acc99f42af1d
~~~

Our change&mdash;the one in `HEAD`&mdash;is preceded by `<<<<<<<`.
Git has then inserted `=======` as a separator between the conflicting changes
and marked the end of the content downloaded from GitHub with `>>>>>>>`.
(The string of letters and digits after that marker
identifies the commit we've just downloaded.)

It is now up to us to edit this file to remove these markers and reconcile the changes.
We can do anything we want: keep the change made in the local repository, keep the change made in the remote repository, write something new to replace both, or get rid of the change entirely. Let's replace both so that the file looks like this:

~~~ {.bash}
$ nano mars.txt
~~~
~~~ {.output}
Cold and dry, but everything is my favorite color
The two moons may be a problem for Wolfman
But the Mummy will appreciate the lack of humidity
We removed the conflict on this line
~~~

To finish merging, we add `mars.txt` to the changes being made by the merge
and then commit:

~~~ {.bash}
$ git add mars.txt
$ git status
~~~
~~~ {.output}
# On branch master
# All conflicts fixed but you are still merging.
#   (use "git commit" to conclude merge)
#
# Changes to be committed:
#
#	modified:   mars.txt
#
~~~
~~~ {.bash}
$ git commit -m "Merging changes from GitHub"
~~~
~~~ {.output}
[master 2abf2b1] Merging changes from GitHub
~~~

Now we can push our changes to GitHub:

~~~ {.bash}
$ git push origin master
~~~
~~~ {.output}
Counting objects: 10, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 697 bytes, done.
Total 6 (delta 2), reused 0 (delta 0)
To https://github.com/vlad/planets.git
   dabb4c8..2abf2b1  master -> master
~~~

Git keeps track of what we've merged with what, so we don't have to fix things by hand again. 


If this was a scenario with a collaborator, you would chat with them and decide which one of you is going to resolve the conflict, and once it is resolved and the changes have been pushed the other person can pull in the merged file.

Version control's ability to merge conflicting changes is another reason users tend to divide their programs and papers into multiple files instead of storing everything in one large file. There's another benefit too: whenever there are repeated conflicts in a particular file, the version control system is essentially trying to tell its users that they ought to clarify who's responsible for which section in the document, or find a way to divide the work up differently.

***

*These materials were adapted from [Software Carpentry](https://swcarpentry.github.io/git-novice/), the Licensing information can be [found here](LICENSE_SWC_git_materials.md).*

***
