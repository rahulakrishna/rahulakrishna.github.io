#!/bin/bash

# Navigate to your repo
cd "$(dirname "$0")" || exit 1

# Check for any changes (staged, unstaged, or untracked)
if [[ -n $(git status --porcelain) ]]; then
  ./scripts/build.sh
  echo "[$(date)] Changes detected, committing and pushing to remote repository."
  git add .
  git commit -m "Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
  git push origin master
else
  echo "[$(date)] No changes to commit."
fi