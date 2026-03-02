#!/bin/bash
set -e

CSS="assets/css/arbitrage.css"

if [ ! -f "$CSS" ]; then
  CSS="assets/css/main.css"
fi

if [ ! -f "$CSS" ]; then
  CSS="main.css"
fi

echo "Patch premium spacing sur $CSS"

cp "$CSS" "$CSS.bak.premium_spacing.$(date +%H%M%S)"

python3 - <<'PY'
import pathlib, re

# localiser css
for path in ["assets/css/arbitrage.css","assets/css/main.css","main.css"]:
    p = pathlib.Path(path)
    if p.exists():
        css_path = p
        break

css = css_path.read_text()

# remplace left si présent
css = re.sub(r'left:\s*\d+px;', 'left: 28px;', css)

# sinon ajoute règle propre
if "#arbOpenModule" not in css:
    css += """

/* Premium spacing */
#arbOpenModule{
  left: 28px;
}
"""

css_path.write_text(css)
print("OK")
PY

echo "✅ Espacement premium appliqué"
