#!/bin/bash
set -euo pipefail
TS="$(date +%Y%m%d_%H%M%S)"

# --- locate files (robuste) ---
CSS=""
for f in "assets/css/arbitrage.css" "assets/css/main.css" "main.css"; do
  if [ -f "$f" ]; then CSS="$f"; break; fi
done
[ -n "$CSS" ] || { echo "❌ Aucun CSS trouvé (assets/css/arbitrage.css / assets/css/main.css / main.css)."; exit 1; }

JS="$(find assets -type f -name "arbitrage-module.js" 2>/dev/null | head -n 1 || true)"
[ -n "${JS:-}" ] || { echo "❌ assets/**/arbitrage-module.js introuvable."; exit 2; }

echo "== Cibles =="
echo "CSS: $CSS"
echo "JS : $JS"

# --- backups ---
cp -a "$CSS" "$CSS.bak.cc_badges_v1.$TS"
cp -a "$JS"  "$JS.bak.cc_badges_v1.$TS"
echo "✅ Backups créés."

# --- CSS patch: dynamic levels on Impact/Urgence/Horizon pills ---
python3 - <<'PY'
import re
from pathlib import Path

css_path = None
for cand in ["assets/css/arbitrage.css","assets/css/main.css","main.css"]:
    p = Path(cand)
    if p.exists():
        css_path = p
        break
assert css_path, "CSS introuvable"

css = css_path.read_text(encoding="utf-8", errors="ignore")

# remove old block if exists
css = re.sub(r"\n/\*\s*=====\s*CC_ARB_BADGE_DYNAMIC_V1[\s\S]*?\*/[\s\S]*?(?=\n/\*|\Z)", "\n", css, flags=re.M)

block = r"""
/* ===== CC_ARB_BADGE_DYNAMIC_V1 : couleurs dynamiques Impact/Urgence/Horizon ===== */
.arb-exec-badge{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  border: 1px solid rgba(255,255,255,.14);
  background: rgba(255,255,255,.06);
  color: rgba(255,255,255,.90);
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 700;
  font-size: 12px;
  transition: transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms cubic-bezier(.2,.8,.2,1), filter 180ms cubic-bezier(.2,.8,.2,1);
}

/* petit dot */
.arb-exec-badge::before{
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.35);
  box-shadow: 0 0 0 2px rgba(0,0,0,.12);
}

/* état N/A (aucun projet arbitré) */
.arb-exec-badge[data-level="na"]{
  opacity: .78;
}

/* palettes ColConnect (sobres) */
.arb-exec-badge[data-level="low"]{
  border-color: rgba(160,170,190,.35);
}
.arb-exec-badge[data-level="low"]::before{
  background: rgba(160,170,190,.95);
}

.arb-exec-badge[data-level="mid"]{
  border-color: rgba(80,150,255,.45);
}
.arb-exec-badge[data-level="mid"]::before{
  background: rgba(80,150,255,.98);
}

.arb-exec-badge[data-level="high"]{
  border-color: rgba(227,179,65,.55);
}
.arb-exec-badge[data-level="high"]::before{
  background: rgba(227,179,65,.98);
}

.arb-exec-badge[data-level="crit"]{
  border-color: rgba(255,80,80,.55);
}
.arb-exec-badge[data-level="crit"]::before{
  background: rgba(255,80,80,.98);
}

/* micro-hover premium (très discret) */
.arb-exec-badge:hover{
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(0,0,0,.22);
  filter: brightness(1.04);
}
"""
css = css.rstrip() + "\n" + block + "\n"
css_path.write_text(css, encoding="utf-8")
print(f"✅ CSS injecté: {css_path}")
PY

# --- JS patch: compute data-level + labels from API status ---
python3 - <<'PY'
import re
from pathlib import Path

js_path = Path("assets")  # base
# locate arbitrage-module.js
cands = list(Path(".").glob("assets/**/arbitrage-module.js"))
if not cands:
    raise SystemExit("arbitrage-module.js introuvable sous assets/")
p = cands[0]
s = p.read_text(encoding="utf-8", errors="ignore")

# Remove old block if exists
s = re.sub(r"\n//\s*=====\s*CC_ARB_BADGE_JS_V1[\s\S]*?//\s*=====\s*END_CC_ARB_BADGE_JS_V1\s*\n", "\n", s, flags=re.M)

# We will inject helper functions just after the $(id) helper definition (safe anchor)
anchor = re.search(r"function\s+\$\s*\(\s*id\s*\)\s*\{[\s\S]*?\}\s*", s)
if not anchor:
    raise SystemExit("Anchor function $(id) introuvable dans arbitrage-module.js")

helpers = r"""
// ===== CC_ARB_BADGE_JS_V1 : mapping niveaux + labels =====
function ccNum(val) {
  if (val === null || val === undefined) return null;
  const str = String(val);
  const m = str.match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}

function ccLevelImpact(v){
  if (v === null || Number.isNaN(v)) return ['na','N/A'];
  if (v < 40) return ['low','Faible'];
  if (v < 60) return ['mid','Utile'];
  if (v < 80) return ['high','Fort'];
  return ['high','Transformation'];
}

function ccLevelUrgence(v){
  if (v === null || Number.isNaN(v)) return ['na','N/A'];
  if (v < 40) return ['low','Faible'];
  if (v < 60) return ['mid','À planifier'];
  if (v < 80) return ['high','Prioritaire'];
  return ['crit','Critique'];
}

function ccLevelHorizonDays(days){
  if (days === null || Number.isNaN(days)) return ['na','N/A'];
  if (days <= 7) return ['crit', `${days}j`];
  if (days <= 30) return ['high', `${days}j`];
  if (days <= 90) return ['mid', `${days}j`];
  return ['low', `${days}j`];
}

function ccParseDays(h){
  if (h === null || h === undefined) return null;
  const str = String(h).toLowerCase();
  const m = str.match(/(\d+)\s*(j|jour|jours|d)/);
  if (m) return Number(m[1]);
  // si format "7 days"
  const m2 = str.match(/(\d+)\s*day/);
  if (m2) return Number(m2[1]);
  return null;
}

function ccApplyBadge(el, level, title){
  if (!el) return;
  el.setAttribute('data-level', level);
  el.setAttribute('title', title);
}
// ===== END_CC_ARB_BADGE_JS_V1
"""

insert_pos = anchor.end()
s = s[:insert_pos] + helpers + s[insert_pos:]

# Now patch inside updateStatus(status) function where badges are updated.
# We'll search the exact lines and inject after setting textContent.
pattern = r"""
\s*if\s*\(impactBadge\)\s*impactBadge\.textContent\s*=\s*`Impact\s*:\s*\$\{status\.impact\s*\|\|\s*'-'\}`;\s*
\s*if\s*\(urgenceBadge\)\s*urgenceBadge\.textContent\s*=\s*`Urgence\s*:\s*\$\{status\.urgence\s*\|\|\s*'-'\}`;\s*
\s*if\s*\(horizonBadge\)\s*horizonBadge\.textContent\s*=\s*`Horizon\s*:\s*\$\{status\.horizon\s*\|\|\s*'7\s*jours'\}`;\s*
""".strip()

m = re.search(pattern, s, flags=re.M)
if not m:
    raise SystemExit("Bloc badges (Impact/Urgence/Horizon) non trouvé pour injection. Le fichier a peut-être changé.")

inject = r"""
    // --- CC dynamic badge levels ---
    const impactNum = ccNum(status.impact);
    const urgNum = ccNum(status.urgence);
    const hDays = ccParseDays(status.horizon || '7 jours');

    const [li, ltxt] = ccLevelImpact(impactNum);
    const [lu, utxt] = ccLevelUrgence(urgNum);
    const [lh, htxt] = ccLevelHorizonDays(hDays);

    ccApplyBadge(impactBadge, li, (impactNum === null ? "Impact : N/A (aucun projet arbitré)" : `Impact : ${impactNum} (${ltxt})`));
    ccApplyBadge(urgenceBadge, lu, (urgNum === null ? "Urgence : N/A (aucun projet arbitré)" : `Urgence : ${urgNum} (${utxt})`));
    ccApplyBadge(horizonBadge, lh, (hDays === null ? "Horizon : N/A" : `Horizon : ${htxt}`));
"""

s = s[:m.end()] + inject + s[m.end():]

p.write_text(s, encoding="utf-8")
print(f"✅ JS patché: {p}")
PY

echo "✅ Patch terminé."
echo "➡️ Fais Ctrl+F5 puis regarde: Impact/Urgence/Horizon (couleurs) + tooltip."
