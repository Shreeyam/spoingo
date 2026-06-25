#!/usr/bin/env bash
# One-command deploy to the droplet. Run from your laptop:
#   npm run deploy
# Override defaults with env vars if anything moves:
#   SPOINGO_HOST=root@165.227.89.12   SSH target
#   SPOINGO_DIR=/var/www/shreey.am    remote app dir
#   SPOINGO_USER=www                  user that owns the app dir + runs pm2
#   SPOINGO_PM2=shreey.am             pm2 process name

set -euo pipefail

HOST="${SPOINGO_HOST:-root@165.227.89.12}"
DIR="${SPOINGO_DIR:-/var/www/shreey.am}"
USER="${SPOINGO_USER:-www}"
PM2_NAME="${SPOINGO_PM2:-shreey.am}"

echo "→ deploying to $HOST:$DIR (app user=$USER, pm2=$PM2_NAME)"

ssh -T "$HOST" bash <<REMOTE
set -euo pipefail
cd "$DIR"

echo "→ git pull"
sudo -u "$USER" -H git pull --ff-only

echo "→ npm ci"
sudo -u "$USER" -H npm ci

echo "→ npm run build"
sudo -u "$USER" -H npm run build

echo "→ pm2 reload $PM2_NAME"
sudo -u "$USER" -H pm2 reload "$PM2_NAME" --update-env
REMOTE

echo "✓ done"
