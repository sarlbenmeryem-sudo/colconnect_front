/* ColConnect - patches.js | v1.0 | CC_PATCH_FIX_SCROLL_FREEZE_V2 | Dépendances: aucune */
/* CC_PATCH_FIX_SCROLL_FREEZE_V2 (enrichi V1) */
(function(){
  function unlockCSSScroll(){
    try{
      const html = document.documentElement;
      const body = document.body;
      if (!body) return;

      if (getComputedStyle(html).overflowY === 'hidden') html.style.overflowY = 'auto';
      if (getComputedStyle(body).overflowY === 'hidden') body.style.overflowY = 'auto';

      if (getComputedStyle(body).position === 'fixed') body.style.position = 'static';

      if (html.style.overflowY === 'hidden') html.style.overflowY = 'auto';
      if (body.style.overflowY === 'hidden') body.style.overflowY = 'auto';
    }catch(e){
      console.warn('[CC] unlockCSSScroll error', e);
    }
  }

  function inAllowedNoScrollZone(target){
    if (!target || !(target instanceof Element)) return false;
    return !!target.closest(
      '.leaflet-container, #project-map, #global-map, #map, [data-allow-prevent-default="1"]'
    );
  }

  (function patchPreventDefault(){
    try{
      if (window.__cc_pd_patched_v2) return;
      window.__cc_pd_patched_v2 = true;

      const orig = Event.prototype.preventDefault;
      Event.prototype.preventDefault = function(){
        if ((this.type === 'wheel' || this.type === 'touchmove') && !inAllowedNoScrollZone(this.target)){
          return;
        }
        return orig.call(this);
      };
    }catch(e){
      console.warn('[CC] patchPreventDefault error', e);
    }
  })();

  /* V1: lancer au chargement (DOMContentLoaded si besoin) + watchdog */
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', unlockCSSScroll);
  } else {
    unlockCSSScroll();
  }
  setInterval(unlockCSSScroll, 600);
})();

/* =========================================================
   SIM_BOOT_V1 - ColConnect SIM Executive bootstrap
   - Remplit le bandeau ISM/IRM + risques + projection
   - Non destructif, tolérant si API indisponible
   ========================================================= */
(function SIM_BOOT_V1(){
  const $ = (id) => document.getElementById(id);

  const setText = (id, value) => {
    const el = $(id);
    if (!el) return;
    el.textContent = (value === undefined || value === null || value === "") ? "--" : String(value);
  };

  const setRiskList = (risks) => {
    const safe = Array.isArray(risks) ? risks : [];
    setText("risk-top-1", safe[0] || "--");
    setText("risk-top-2", safe[1] || "--");
    setText("risk-top-3", safe[2] || "--");
  };

  const render = (data) => {
    // Attendus (souples) :
    // data.ism.score, data.ism.trend, data.ism.confidence
    // data.irm.score
    // data.projection.status
    // data.risks.top (array)
    const ism = data?.ism || {};
    const irm = data?.irm || {};
    const projection = data?.projection || {};
    const risks = data?.risks || {};

    setText("ism-score", ism.score);
    setText("ism-trend", ism.trend);
    setText("ism-confidence", ism.confidence ? `Confiance : ${ism.confidence}` : "Confiance : --");

    setText("irm-score", irm.score);
    setText("projection-status", projection.status);

    setRiskList(risks.top);
  };

  const renderOffline = () => {
    setText("ism-score", "--");
    setText("ism-trend", "Non connecté");
    setText("ism-confidence", "Confiance : --");
    setText("irm-score", "--");
    setText("projection-status", "Non connecté");
    setRiskList(["--","--","--"]);
  };

  const fetchExecutive = async () => {
    // Endpoint par défaut (à aligner avec FastAPI)
    const endpoint = "/api/v1/sim/executive";

    try {
      const res = await fetch(endpoint, { credentials: "same-origin" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      render(data);
    } catch (e) {
      // Tolérance : si API pas prête, on ne casse pas l'UI
      renderOffline();
      // Optionnel: log discret
      // console.warn("[SIM] executive endpoint unavailable:", e?.message || e);
    }
  };

  // Boot quand DOM prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchExecutive);
  } else {
    fetchExecutive();
  }
})();

document.addEventListener("DOMContentLoaded", function () {


document.addEventListener("DOMContentLoaded", function () {


document.addEventListener("DOMContentLoaded", function () {


document.addEventListener("DOMContentLoaded", function () {

