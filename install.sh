#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Python dependencies ───────────────────────────────────────────────────────
echo "Installing Python dependencies..."
pip install -r "$SCRIPT_DIR/backend/requirements.txt"

# ── Node dependencies ─────────────────────────────────────────────────────────
echo "Installing Node dependencies..."
cd "$SCRIPT_DIR/frontend"
npm install

echo ""
echo "Done. Run the app with:"
echo "  ANTHROPIC_API_KEY=your_key_here ./run.sh"
