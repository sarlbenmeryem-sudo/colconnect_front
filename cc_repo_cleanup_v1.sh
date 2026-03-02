#!/bin/bash
set -euo pipefail

echo "== Repo =="
git rev-parse --show-toplevel >/dev/null 2>&1 || { echo "❌ Pas un repo git ici"; exit 1; }
git status -sb

TS="$(date +%Y%m%d_%H%M%S)"
echo "== Safety tag =="
git tag "backup_before_cleanup_${TS}" || true

echo "== Create/append .gitignore rules =="
cat >> .gitignore <<'GITIGNORE'

# ===== ColConnect: generated backups & patch scripts =====
*.bak
*.bak.*
*.backup
*~ 
*.tmp
*.log

# Patch scripts (generated)
patch_*.sh
*_patch_*.sh

# OS / Editor
.DS_Store
Thumbs.db
.idea/
.vscode/
*.swp
*.swo

# Python venv / cache (if any)
.venv/
__pycache__/
*.pyc

# Node (if any)
node_modules/
dist/
build/

GITIGNORE

# deduplicate .gitignore lines (keep order-ish)
python3 - <<'PY'
from pathlib import Path
p=Path(".gitignore")
lines=p.read_text(encoding="utf-8", errors="ignore").splitlines()
seen=set()
out=[]
for ln in lines:
    key=ln.strip()
    if not key:
        out.append(ln); continue
    if key.startswith("#"):
        out.append(ln); continue
    if key in seen:
        continue
    seen.add(key)
    out.append(ln)
p.write_text("\n".join(out).rstrip()+"\n", encoding="utf-8")
print("✅ .gitignore optimized")
PY

echo "== Remove unwanted tracked files from git index (keeps files on disk) =="

# Remove tracked backups everywhere
git rm -r --cached --ignore-unmatch \
  '*.bak' '*.bak.*' '*.backup' '*~' '*.tmp' '*.log' || true

# Remove tracked patch scripts in repo root
git rm --cached --ignore-unmatch patch_*.sh *_patch_*.sh || true

# Common ones seen in your commit
git rm --cached --ignore-unmatch index.html.bak* || true
git rm --cached --ignore-unmatch assets/css/*.bak* assets/js/*.bak* || true

echo "== Ensure patches.css removal is intentional =="
if git ls-files | grep -q '^assets/css/patches\.css$'; then
  echo "ℹ️ assets/css/patches.css still tracked (kept)."
else
  echo "⚠️ assets/css/patches.css is NOT tracked. If your site depends on it, restore it from your history."
fi

echo "== Commit cleanup =="
git add .gitignore
if git diff --cached --quiet; then
  echo "ℹ️ Nothing to commit."
else
  git commit -m "chore: ignore backups and remove tracked generated files"
fi

echo "== Push =="
git push

echo "✅ Cleanup done."
echo "Tip: you can rollback with: git reset --hard backup_before_cleanup_${TS}"
