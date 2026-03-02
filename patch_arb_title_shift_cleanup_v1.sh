#!/bin/bash
set -euo pipefail

HTML="index.html"
TS="$(date +%Y%m%d_%H%M%S)"

[ -f "$HTML" ] || { echo "❌ $HTML introuvable"; exit 1; }

# 1) Backup HTML
cp -a "$HTML" "$HTML.bak.cleanup_title_shift.${TS}"
echo "✅ Backup: $HTML.bak.cleanup_title_shift.${TS}"

# 2) Trouver un CSS existant
CSS=""
for f in "assets/css/arbitrage.css" "assets/css/main.css" "main.css"; do
  if [ -f "$f" ]; then CSS="$f"; break; fi
done
[ -n "$CSS" ] || { echo "❌ Aucun CSS trouvé (assets/css/arbitrage.css / assets/css/main.css / main.css)."; exit 2; }

# Backup CSS
cp -a "$CSS" "$CSS.bak.cleanup_title_shift.${TS}"
echo "✅ Backup: $CSS.bak.cleanup_title_shift.${TS}"

# 3) Nettoyage: supprimer les blocs CSS ajoutés par les anciens patchs + ajouter nouveau décalage du title-group
python3 - <<'PY'
import re, pathlib, sys

css_path = None
for cand in ["assets/css/arbitrage.css", "assets/css/main.css", "main.css"]:
    p = pathlib.Path(cand)
    if p.exists():
        css_path = p
        break

if not css_path:
    print("❌ CSS introuvable pour patch (candidats connus).")
    sys.exit(2)

css = css_path.read_text(encoding="utf-8", errors="ignore")

# --- Supprimer anciens blocs (1) ARB HEADER ALIGN FIX ---
css = re.sub(
    r"\n/\*\s*=====\s*ARB HEADER ALIGN FIX\s*=====\s*\*/[\s\S]*?(?=\n/\*|\Z)",
    "\n",
    css,
    flags=re.M
)

# --- Supprimer anciens blocs (2) CC_ARB_BTN_V2 ---
css = re.sub(
    r"\n/\*\s*=====\s*CC_ARB_BTN_V2[\s\S]*?\*/[\s\S]*?(?=\n/\*|\Z)",
    "\n",
    css,
    flags=re.M
)

# --- Supprimer ancien bloc (3) CC_ARB_TITLE_SHIFT_V1 si déjà présent ---
css = re.sub(
    r"\n/\*\s*=====\s*CC_ARB_TITLE_SHIFT_V1[\s\S]*?\*/[\s\S]*?(?=\n/\*|\Z)",
    "\n",
    css,
    flags=re.M
)

# --- Ajouter le nouveau décalage du title-group (quelques cm à droite) ---
# 2cm ~ 75px (approx). Ajuste la valeur si besoin.
patch = r"""

/* ===== CC_ARB_TITLE_SHIFT_V1 : décale le titre à droite ===== */
.arb-exec-title-group{
  transform: translateX(75px);
}
"""

css = css.rstrip() + "\n" + patch + "\n"
css_path.write_text(css, encoding="utf-8")
print(f"✅ CSS nettoyé + décalage title-group ajouté dans: {css_path}")
PY

echo "✅ Patch terminé. Fais Ctrl+F5 pour forcer le refresh."
echo "ℹ️ Ajuste le décalage: translateX(75px) -> 50px / 90px si nécessaire."
