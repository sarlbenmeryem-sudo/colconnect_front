#!/bin/bash
set -euo pipefail

HTML="index.html"
TS="$(date +%Y%m%d_%H%M%S)"
BAK="${HTML}.bak.move_btn_v2.${TS}"

[ -f "$HTML" ] || { echo "❌ $HTML introuvable"; exit 1; }

cp -a "$HTML" "$BAK"
echo "✅ Backup: $BAK"

python3 - <<'PY'
import re, pathlib, sys

p = pathlib.Path("index.html")
s = p.read_text(encoding="utf-8", errors="ignore")

# 1) supprimer l'ancien bouton (où qu'il soit)
s2 = re.sub(r'\s*<button\b[^>]*\bid=["\']arbOpenModule["\'][\s\S]*?</button>\s*', "\n", s, count=1)

if s2 == s:
    print("⚠️ Bouton arbOpenModule non trouvé (aucune suppression).")
s = s2

# 2) réinsérer juste après la fin de .arb-exec-title-group
# On cherche le bloc title-group et on insère après son </div> de fermeture.
m = re.search(r'(<div\s+class="arb-exec-title-group"[^>]*>[\s\S]*?</div>)', s)
if not m:
    print("❌ Bloc .arb-exec-title-group introuvable. Patch annulé.")
    sys.exit(2)

btn = '\n    <button id="arbOpenModule" class="arb-exec-open-btn" title="Ouvrir le module Arbitrage complet">↗ Ouvrir le module</button>\n'
insert_pos = m.end()
s = s[:insert_pos] + btn + s[insert_pos:]

p.write_text(s, encoding="utf-8")
print("✅ Bouton réinséré juste après .arb-exec-title-group")
PY

# 3) CSS : aligner proprement dans le header
CSS_CANDIDATES=("assets/css/arbitrage.css" "assets/css/main.css" "main.css")
CSS=""
for f in "${CSS_CANDIDATES[@]}"; do
  if [ -f "$f" ]; then CSS="$f"; break; fi
done
[ -n "$CSS" ] || { echo "❌ Aucun fichier CSS trouvé (arbitrage.css/main.css)."; exit 3; }

if ! grep -q "CC_ARB_BTN_V2" "$CSS"; then
cat >> "$CSS" <<'CSS'

/* ===== CC_ARB_BTN_V2 : bouton à droite du titre ===== */
.arb-exec-header{
  display:flex;
  align-items:center;
}
.arb-exec-title-group{
  display:flex;
  align-items:center;
  gap:10px;
}
/* garde les badges à droite si présents */
.arb-exec-badges{
  margin-left:auto;
}
/* micro-décalage à droite du titre */
#arbOpenModule.arb-exec-open-btn{
  margin-left:12px;
  white-space:nowrap;
}
CSS
  echo "✅ CSS ajouté dans: $CSS"
else
  echo "ℹ️ CSS déjà présent (CC_ARB_BTN_V2) dans: $CSS"
fi

echo "✅ Patch terminé. Fais Ctrl+F5 pour forcer le refresh."
