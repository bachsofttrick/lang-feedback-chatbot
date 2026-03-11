#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── 1. Build frontend ────────────────────────────────────────────────────────
echo "Building frontend..."
cd "$SCRIPT_DIR/frontend"
npm run build

# ── 2. Start backend (serves the built frontend) ────────────────────────────
echo "Starting server at http://localhost:8000"
cd "$SCRIPT_DIR/backend"
exec uvicorn main:app --host 0.0.0.0 --port 8000
