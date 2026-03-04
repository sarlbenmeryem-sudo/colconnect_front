#!/bin/bash
TARGET_FILE="./index.html"

echo "🔧 ColConnect - Patch Index.html"

if [ ! -f "$TARGET_FILE" ]; then
    echo "❌ Fichier non trouvé"
    exit 1
fi

cp "$TARGET_FILE" "$TARGET_FILE.backup"
echo "💾 Sauvegarde créée"

python3 << 'PY'
import re

with open("./index.html", "r", encoding="utf-8") as f:
    content = f.read()

pattern = r'<script>\s*/\*\s*SIM Executive loader.*?loadSimExecutive\(["\'].*?["\']\);\s*\}\);\s*</script>'

if re.search(pattern, content, re.DOTALL):
    new_content = re.sub(pattern, "<!-- SIM Executive loader removed -->", content, flags=re.DOTALL)
    with open("./index.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("🟢 Patch appliqué")
else:
    print("ℹ️  Bloc SIM Executive déjà supprimé")
PY

echo "✅ Patch terminé!"
