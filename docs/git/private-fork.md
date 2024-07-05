---
title: Creating and Managing a Private Fork from a Public Repository
sidebar_position: 1
---

# Creating and Managing a Private Fork from a Public Repository
Creating a private fork of a public repository allows you to work on a project privately while still being able to sync with the original public source. This guide outlines the process of setting up a private fork, making changes, syncing with the public repo, and contributing back to the original project. Follow these steps to maintain your own private version of a public repository while staying up-to-date with upstream changes.

## Step 1: Create a private fork:
1. Create a new private repository on [GitHub](https://github.com/new).
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

## Miscellaneous
### Download from Private Repository
Download the latest release binary from a private GitHub repo. (i.e. a .tar.gz that you have manually uploaded in a GitHub release). Update OAUTH_TOKEN, OWNER, REPO, FILE_NAME with your custom values.
```bash
#!/usr/bin/env bash

# Authorize to GitHub to get the latest release tar.gz
# Requires: oauth token, https://help.github.com/articles/creating-an-access-token-for-command-line-use/
# Requires: jq package to parse json

# Your oauth token goes here, see link above
OAUTH_TOKEN="34k234lk234lk2j3lk4j2l3k4j2kj3lk"
# Repo owner (user id)
OWNER="your-user-name"
# Repo name
REPO="the-repo-clean-name"
# The file name expected to download. This is deleted before curl pulls down a new one
FILE_NAME="file-you-are-downloading.tar.gz"

# Concatenate the values together for a 
API_URL="https://$OAUTH_TOKEN:@api.github.com/repos/$OWNER/$REPO"

# Gets info on latest release, gets first uploaded asset id of a release,
# More info on jq being used to parse json: https://stedolan.github.io/jq/tutorial/
ASSET_ID=$(curl $API_URL/releases/latest | jq -r '.assets[0].id')
echo "Asset ID: $ASSET_ID"

# curl does not allow overwriting file from -O, nuke
rm -f $FILE_NAME

# curl:
# -O: Use name provided from endpoint
# -J: "Content Disposition" header, in this case "attachment"
# -L: Follow links, we actually get forwarded in this request
# -H "Accept: application/octet-stream": Tells api we want to dl the full binary
curl -O -J -L -H "Accept: application/octet-stream" "$API_URL/releases/assets/$ASSET_ID"
```

## Reference
- [Duplicating a repository](https://help.github.com/articles/duplicating-a-repository/)
- [GitHub: How to make a fork of public repository private?](https://stackoverflow.com/questions/10065526/github-how-to-make-a-fork-of-public-repository-private)
- [private-github-release-download.sh](https://gist.github.com/illepic/32b8ad914f1dc80446c7e81c3be4e286)
