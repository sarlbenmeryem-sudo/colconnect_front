#!/bin/bash
set -e

CSS="assets/css/arbitrage.css"

if [ ! -f "$CSS" ]; then
  CSS="assets/css/main.css"
fi

if [ ! -f "$CSS" ]; then
  CSS="main.css"
fi

echo "Ajout hover premium dans $CSS"

cp "$CSS" "$CSS.bak.hover.$(date +%H%M%S)"

cat >> "$CSS" <<'CSS'

/* ===== Hover Premium Bouton Arbitrage ===== */

#arbOpenModule{
  transition: all .25s ease;
}

#arbOpenModule:hover{
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.35);
  background: linear-gradient(135deg,#e3b341,#f5d06f);
  color: #0b1623;
}

#arbOpenModule:active{
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
CSS

echo "✅ Hover premium activé"
