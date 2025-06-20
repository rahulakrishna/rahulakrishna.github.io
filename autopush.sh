#!/bin/bash

# Navigate to your repo
cd . || exit 1

# Check for any changes (staged, unstaged, or untracked)
if [[ -n $(git status --porcelain) ]]; then
  hugo --minify --gc --cleanDestinationDir
  echo "[$(date)] Changes detected, committing and pushing to remote repository."
  git add .
  git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin master
else
  echo "[$(date)] No changes to commit."
fi