#!/usr/bin/env bash
# Vercel へデプロイする（macOS / Linux / Git Bash）
# 使い方:
#   ./scripts/deploy.sh           → Preview
#   ./scripts/deploy.sh prod      → Production

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm が見つかりません。Node.js を入れてから再実行してください。" >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "npm install..."
  npm install
fi

MODE="${1:-preview}"
if [[ "$MODE" == "prod" ]]; then
  echo "Deploying to Production..."
  npx --yes vercel --prod --yes
else
  echo "Deploying to Preview..."
  npx --yes vercel --yes
fi
