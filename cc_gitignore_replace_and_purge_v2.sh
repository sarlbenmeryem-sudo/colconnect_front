#!/bin/bash
set -euo pipefail

git rev-parse --show-toplevel >/dev/null 2>&1 || { echo "❌ Pas un repo git ici"; exit 1; }

TS="$(date +%Y%m%d_%H%M%S)"
echo "✅ Safety tag: backup_before_gitignore_v2_${TS}"
git tag "backup_before_gitignore_v2_${TS}" || true

echo "== Replacing .gitignore (optimized ColConnect front) =="
cat > .gitignore <<'GITIGNORE'
# =========================
# ColConnect Front - .gitignore (optimized)
# =========================

# --- Generated backups & patch scripts ---
*.bak
*.bak.*
*.backup
*~
*.tmp
*.log
patch_*.sh
*_patch_*.sh

# --- OS / editor ---
.DS_Store
Thumbs.db
.idea/
.vscode/
*.swp
*.swo

# --- Python (if any tooling) ---
.venv/
__pycache__/
*.pyc

# --- Node (if any) ---
node_modules/
dist/
build/

# --- Local env files ---
.env
.env.*
GITIGNORE

echo "== Purging already tracked generated files (keeps files on disk) =="

# Remove tracked backups anywhere
git rm -r --cached --ignore-unmatch \
  '*.bak' '*.bak.*' '*.backup' '*~' '*.tmp' '*.log' || true

# Remove tracked patch scripts at repo root (and similar)
git rm --cached --ignore-unmatch patch_*.sh *_patch_*.sh || true

# Common patterns you already had
git rm --cached --ignore-unmatch index.html.bak* || true
git rm --cached --ignore-unmatch assets/css/*.bak* assets/js/*.bak* || true

echo "== Commit =="
git add .gitignore
if git diff --cached --quiet; then
  echo "ℹ️ Nothing staged (unexpected)."
else
  git commit -m "chore: replace .gitignore and purge generated files"
fi

echo "== Push =="
git push

echo "✅ Done."
echo "Rollback (one step): git reset --hard HEAD~1"
echo "Safety rollback (tag): git reset --hard backup_before_gitignore_v2_${TS}"
