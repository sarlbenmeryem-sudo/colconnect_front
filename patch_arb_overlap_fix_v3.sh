#!/bin/bash
set -euo pipefail

TS="$(date +%Y%m%d_%H%M%S)"

# choisir CSS
CSS=""
for f in "assets/css/arbitrage.css" "assets/css/main.css" "main.css"; do
  if [ -f "$f" ]; then CSS="$f"; break; fi
done
[ -n "$CSS" ] || { echo "❌ Aucun CSS trouvé (arbitrage.css/main.css)."; exit 1; }

cp -a "$CSS" "$CSS.bak.overlap_fix_v3.${TS}"
echo "✅ Backup CSS: $CSS.bak.overlap_fix_v3.${TS}"

python3 - <<'PY'
import pathlib, re, sys

# locate css
css_path = None
for cand in ["assets/css/arbitrage.css","assets/css/main.css","main.css"]:
    p = pathlib.Path(cand)
    if p.exists():
        css_path = p
        break
if not css_path:
    print("❌ CSS introuvable"); sys.exit(1)

css = css_path.read_text(encoding="utf-8", errors="ignore")

# remove old block if exists
css = re.sub(r"\n/\*\s*=====\s*CC_ARB_OVERLAP_FIX_V3[\s\S]*?\*/[\s\S]*?(?=\n/\*|\Z)", "\n", css, flags=re.M)

block = r"""
/* ===== CC_ARB_OVERLAP_FIX_V3 : éviter chevauchement bouton/titre ===== */
.arb-exec-header{
  position: relative;
  padding-left: 120px; /* réserve de la place pour le bouton à gauche */
}

#arbOpenModule.arb-exec-open-btn{
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  z-index: 3;
}

/* si tu as trop décalé le titre : réduit légèrement */
.arb-exec-title-group{
  transform: translateX(85px);
}
"""
css = css.rstrip() + "\n" + block + "\n"
css_path.write_text(css, encoding="utf-8")
print(f"✅ Patch appliqué dans {css_path}")
PY

echo "✅ OK. Fais Ctrl+F5."
