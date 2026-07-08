#!/usr/bin/env bash
# One-command deploy to the droplet. Run from your laptop:
#   npm run deploy            # deploys the default tenant (shreeyam)
#   npm run deploy maya       # deploys a named tenant
#
# Add new tenants by registering them in the manifest below AND in
# src/config/siteConfig.js. Each tenant lives in its own clone on the
# droplet with its own .env (TENANT, DB_FILE, PORT, AUTH_SECRET) and its
# own pm2 process.

set -euo pipefail

TENANT="${1:-shreeyam}"

case "$TENANT" in
    shreeyam)
        HOST="${SPOINGO_HOST:-root@165.227.89.12}"
        DIR="${SPOINGO_DIR:-/var/www/shreey.am}"
        USER="${SPOINGO_USER:-www}"
        PM2_NAME="${SPOINGO_PM2:-shreey.am}"
        ;;
    marie)
        HOST="${SPOINGO_HOST:-root@165.227.89.12}"
        DIR="${SPOINGO_DIR:-/var/www/typicalatom.com}"
        USER="${SPOINGO_USER:-www}"
        PM2_NAME="${SPOINGO_PM2:-typicalatom.com}"
        ;;
    *)
        echo "Unknown tenant: $TENANT" >&2
        echo "Register it in scripts/deploy.sh and src/config/siteConfig.js." >&2
        exit 1
        ;;
esac

echo "→ deploying tenant '$TENANT' to $HOST:$DIR (app user=$USER, pm2=$PM2_NAME)"

ssh -T "$HOST" bash <<REMOTE
set -euo pipefail
cd "$DIR"

echo "→ syncing to origin/main (discarding any local drift)"
sudo -u "$USER" -H git fetch origin main
sudo -u "$USER" -H git reset --hard origin/main

echo "→ npm ci"
sudo -u "$USER" -H npm ci

echo "→ npm run build"
sudo -u "$USER" -H npm run build

echo "→ pm2 reload $PM2_NAME"
sudo -u "$USER" -H pm2 reload "$PM2_NAME" --update-env
REMOTE

echo "✓ done — tenant '$TENANT' updated"
