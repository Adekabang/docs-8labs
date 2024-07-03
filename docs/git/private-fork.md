---
title: Creating and Managing a Private Fork from a Public Repository
sidebar_position: 1
---

# Creating and Managing a Private Fork from a Public Repository
Creating a private fork of a public repository allows you to work on a project privately while still being able to sync with the original public source. This guide outlines the process of setting up a private fork, making changes, syncing with the public repo, and contributing back to the original project. Follow these steps to maintain your own private version of a public repository while staying up-to-date with upstream changes.

## Step 1: Create a private fork:
1. Create a new private repository on GitHub.
2. Open terminal and run:
```bash
git clone --bare https://github.com/original-owner/public-repo.git
cd public-repo.git
git push --mirror https://github.com/your-username/private-repo.git
cd ..
rm -rf public-repo.git
```

## Step 2: Work on your private fork:
1. Clone your private repo:
```bash
git clone https://github.com/your-username/private-repo.git
cd private-repo
```
2. Make changes, commit, and push:
```bash
git commit -am "Your changes"
git push origin main
```

## Step 3: Sync with the public repo:
1. Add the public repo as a remote:
```bash
git remote add public https://github.com/original-owner/public-repo.git
```
2. Pull changes from the public repo:
```bash
git pull public main
```
3. Push updated code to your private repo:
```bash
git push origin main
```

## Step 4: Create a pull request to the public repo:
1. Fork the public repo on GitHub.
2. Clone your public fork:
```bash
git clone https://github.com/your-username/public-repo-fork.git
cd public-repo-fork
```
3. Add your private repo as a remote:
```bash
git remote add private https://github.com/your-username/private-repo.git
```
4. Create a new branch for the pull request:
```bash
git checkout -b pr-branch
git pull private main
git push origin pr-branch
```
5. Create a pull request on GitHub from your public fork's pr-branch to the original public repo.

Remember to repeat steps [3](/docs/git/private-fork#step-3-sync-with-the-public-repo) and [4](/docs/git/private-fork#step-4-create-a-pull-request-to-the-public-repo) as needed to keep your repos in sync and contribute changes back to the public repo.

## Reference
- [Duplicating a repository](https://help.github.com/articles/duplicating-a-repository/)
- [GitHub: How to make a fork of public repository private?](https://stackoverflow.com/questions/10065526/github-how-to-make-a-fork-of-public-repository-private)
