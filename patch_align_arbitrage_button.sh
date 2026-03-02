#!/bin/bash
set -e

FILE="index.html"
TS=$(date +%Y%m%d_%H%M%S)

echo "Backup..."
cp "$FILE" "$FILE.bak.$TS"

echo "Déplacement du bouton dans le header..."

# Déplacer le bouton dans le header
sed -i '/arb-exec-header/,/arb-exec-grid/ {
  /arbOpenModule/d
}' "$FILE"

sed -i 's#</div>\s*</div>\s*</div>#</div>\n  <button id="arbOpenModule" class="arb-exec-open-btn" title="Ouvrir le module Arbitrage complet">↗ Ouvrir le module</button>\n</div>#' "$FILE"

echo "Ajout CSS d’alignement..."

CSS="assets/css/arbitrage.css"

if ! grep -q "ARB HEADER ALIGN FIX" "$CSS"; then
cat >> "$CSS" << 'CSSFIX'

/* ===== ARB HEADER ALIGN FIX ===== */
.arb-exec-header {
  display: flex;
  align-items: center;
}

.arb-exec-open-btn {
  margin-left: 10px;
  white-space: nowrap;
}
CSSFIX
fi

echo "Patch terminé."
