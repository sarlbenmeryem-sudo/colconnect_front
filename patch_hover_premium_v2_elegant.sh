#!/bin/bash
set -euo pipefail

TS="$(date +%Y%m%d_%H%M%S)"

# choisir CSS
CSS=""
for f in "assets/css/arbitrage.css" "assets/css/main.css" "main.css"; do
  if [ -f "$f" ]; then CSS="$f"; break; fi
done
[ -n "$CSS" ] || { echo "❌ Aucun CSS trouvé (arbitrage.css/main.css)."; exit 1; }

cp -a "$CSS" "$CSS.bak.hover_v2_elegant.${TS}"
echo "✅ Backup CSS: $CSS.bak.hover_v2_elegant.${TS}"

python3 - <<'PY'
import pathlib, re

# locate css
css_path = None
for cand in ["assets/css/arbitrage.css","assets/css/main.css","main.css"]:
    p = pathlib.Path(cand)
    if p.exists():
        css_path = p
        break

css = css_path.read_text(encoding="utf-8", errors="ignore")

# 1) supprimer l'ancien bloc v1 si présent
css = re.sub(r"\n/\*\s*=====\s*Hover Premium Bouton Arbitrage\s*=====\s*\*/[\s\S]*?(?=\n/\*|\Z)", "\n", css, flags=re.M)

# 2) supprimer un éventuel ancien bloc v2
css = re.sub(r"\n/\*\s*=====\s*CC_ARB_HOVER_PREMIUM_V2[\s\S]*?\*/[\s\S]*?(?=\n/\*|\Z)", "\n", css, flags=re.M)

# 3) injecter la version élégante
block = r"""
/* ===== CC_ARB_HOVER_PREMIUM_V2 : hover élégant (ColConnect) ===== */
#arbOpenModule{
  position: absolute; /* garde ton layout actuel */
  transform: translateY(-50%);
  transition:
    transform 220ms cubic-bezier(.2,.8,.2,1),
    box-shadow 220ms cubic-bezier(.2,.8,.2,1),
    filter 220ms cubic-bezier(.2,.8,.2,1),
    background-color 220ms cubic-bezier(.2,.8,.2,1),
    border-color 220ms cubic-bezier(.2,.8,.2,1);
  will-change: transform, box-shadow, filter;
}

/* micro glow discret + élévation très légère */
#arbOpenModule:hover{
  transform: translateY(-50%) translateY(-1.5px);
  box-shadow: 0 10px 26px rgba(0,0,0,0.34);
  filter: brightness(1.05);
}

/* animation premium du pictogramme ↗ (subtile) */
#arbOpenModule:hover::before{
  transform: translateX(2px);
  opacity: .95;
}

#arbOpenModule::before{
  content: "↗";
  display: inline-block;
  margin-right: 8px;
  transition: transform 220ms cubic-bezier(.2,.8,.2,1), opacity 220ms cubic-bezier(.2,.8,.2,1);
  opacity: .85;
}

/* état actif (clic) */
#arbOpenModule:active{
  transform: translateY(-50%) translateY(0px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.22);
  filter: brightness(1.0);
}

/* accessibilité clavier */
#arbOpenModule:focus-visible{
  outline: none;
  box-shadow:
    0 10px 26px rgba(0,0,0,0.34),
    0 0 0 3px rgba(227,179,65,0.28);
}
"""
css = css.rstrip() + "\n" + block + "\n"
css_path.write_text(css, encoding="utf-8")
print("✅ Hover premium v2 injecté:", css_path)
PY

echo "✅ Patch terminé. Fais Ctrl+F5."
