#!/bin/bash
set -e

CSS="assets/css/arbitrage.css"

if [ ! -f "$CSS" ]; then
  CSS="assets/css/main.css"
fi

if [ ! -f "$CSS" ]; then
  CSS="main.css"
fi

echo "Patch sur $CSS"

# sauvegarde
cp "$CSS" "$CSS.bak.shift_more.$(date +%H%M%S)"

# remplace la valeur existante
sed -i 's/translateX([^)]*)/translateX(95px)/' "$CSS"

echo "✅ Décalage ajusté"
