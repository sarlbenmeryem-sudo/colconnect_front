/* ColConnect - patches.js | v1.1 | CC_PATCH_FIX_SCROLL_FREEZE_V2 | Dépendances: aucune */
/* CC_PATCH_FIX_SCROLL_FREEZE_V2 (enrichi V1 - Corrigé) */
(function(){
  /**
   * Débloque le scroll CSS si bloqué par overflow:hidden ou position:fixed
   * Optimisé: une seule vérification par propriété/élément
   */
  function unlockCSSScroll(){
    try {
      const html = document.documentElement;
      const body = document.body;
      if (!body) return;

      // Vérification unique via getComputedStyle (inclut les styles inline et CSS)
      if (getComputedStyle(html).overflowY === 'hidden') {
        html.style.overflowY = 'auto';
      }

      if (getComputedStyle(body).overflowY === 'hidden') {
        body.style.overflowY = 'auto';
      }

      if (getComputedStyle(body).position === 'fixed') {
        body.style.position = 'static';
      }
    } catch(e) {
      console.warn('[CC] unlockCSSScroll error', e);
    }
  }

  /**
   * Vérifie si la cible est dans une zone autorisée à bloquer le scroll
   * (cartes Leaflet, éléments avec data-allow-prevent-default)
   */
  function inAllowedNoScrollZone(target){
    if (!target || !(target instanceof Element)) return false;
    return !!target.closest(
      '.leaflet-container, #project-map, #global-map, #map, [data-allow-prevent-default="1"]'
    );
  }

  /**
   * Patch global de Event.prototype.preventDefault
   * ATTENTION: Modification globale - peut affecter d'autres scripts
   * Empêche le blocage du scroll sauf dans les zones autorisées
   */
  (function patchPreventDefault(){
    try {
      // Évite la double application du patch
      if (window.__cc_pd_patched_v2) return;
      window.__cc_pd_patched_v2 = true;

      const orig = Event.prototype.preventDefault;
      Event.prototype.preventDefault = function(){
        // Autorise le scroll natif sauf dans les zones map/spéciales
        if ((this.type === 'wheel' || this.type === 'touchmove') && !inAllowedNoScrollZone(this.target)){
          return;
        }
        return orig.call(this);
      };
    } catch(e) {
      console.warn('[CC] patchPreventDefault error', e);
    }
  })();

  // Exécution au chargement du DOM
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', unlockCSSScroll);
  } else {
    unlockCSSScroll();
  }

  // Watchdog: vérifie périodiquement le déblocage du scroll
  if (!window.__cc_scroll_perf_v24b) { 
  /*__CC_EXPORT_SCROLL_SYMBOLS_V1__*/
  try {
    window.__cc_unlockCSSScroll = unlockCSSScroll;
    window.__cc_OVERLAY_SELECTORS = (typeof OVERLAY_SELECTORS !== "undefined") ? OVERLAY_SELECTORS : "";
  } catch(e) {}
setInterval(window.__cc_unlockCSSScroll, 600); }
})();

/* =========================================================
   SIM_BOOT_V1 - ColConnect SIM Executive bootstrap
   - Remplit le bandeau ISM/IRM + risques + projection
   - Non destructif, tolérant si API indisponible
   ========================================================= */
(function SIM_BOOT_V1(){
  const $ = (id) => document.getElementById(id);

  /**
   * Met à jour le texte d'un élément par son ID
   * Affiche "--" si la valeur est vide/null/undefined
   */
  const setText = (id, value) => {
    const el = $(id);
    if (!el) return;
    el.textContent = (value === undefined || value === null || value === "") ? "--" : String(value);
  };

  /**
   * Met à jour la liste des 3 risques principaux
   */
  const setRiskList = (risks) => {
    const safe = Array.isArray(risks) ? risks : [];
    setText("risk-top-1", safe[0] || "--");
    setText("risk-top-2", safe[1] || "--");
    setText("risk-top-3", safe[2] || "--");
  };

  /**
   * Affiche les données exécutives dans l'interface
   * Structure attendue:
   * - data.ism.score, data.ism.trend, data.ism.confidence
   * - data.irm.score
   * - data.projection.status
   * - data.risks.top (array)
   */
  const render = (data) => {
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

  /**
   * Affiche l'état hors ligne / API indisponible
   */
  const renderOffline = () => {
    setText("ism-score", "--");
    setText("ism-trend", "Non connecté");
    setText("ism-confidence", "Confiance : --");
    setText("irm-score", "--");
    setText("projection-status", "Non connecté");
    setRiskList(["--", "--", "--"]);
  };

  /**
   * Récupère les données exécutives depuis l'API
   */
  const fetchExecutive = async () => {
    const endpoint = __cc_url("/api/v1/sim/executive");

    try {
      const res = await fetch(endpoint, { credentials: "omit" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      render(data);
    } catch (e) {
      // Tolérance : si API pas prête, on ne casse pas l'UI
      renderOffline();
      // Log activé pour faciliter le débogage
      console.warn("[SIM] executive endpoint unavailable:", e?.message || e);
    }
  };

  // Boot quand DOM prêt
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchExecutive);
  } else {
    fetchExecutive();
  }
})();




/*__CC_SCROLL_PERF_UPGRADE_V24b__*/
/*__CC_FORCE_WD_TIMER_V1__*/
(function(){
  try {
    if (window.__CC_DISABLE_SCROLL_WATCHDOG__) return;
    if (typeof window.__cc_unlockCSSScroll !== "function") return;
    if (!window.__cc_scroll_wd_timer) {
      window.__cc_scroll_wd_timer = setInterval(window.__cc_unlockCSSScroll, 1200);
      if (window.__CC_DEBUG__) console.debug("[CC] forced __cc_scroll_wd_timer created");
    }
  } catch(e) {}
})();

(function(){
  try {
    // Visible flag to verify in console
    window.__cc_scroll_perf_v24b = true;

    // Optional debug logs
    if (window.__CC_DEBUG__) console.debug("[CC] scroll perf upgrade v24b loaded");

    // If user disabled watchdog, do nothing
    if (window.__CC_DISABLE_SCROLL_WATCHDOG__) return;

    // Prefer not to scan DOM on interval; use MutationObserver to track overlays
    var __cc_overlay_active = false;
    function __cc_overlay_compute(){
      try { __cc_overlay_active = !!document.querySelector(window.__cc_OVERLAY_SELECTORS); } catch(e){ __cc_overlay_active = false; }
    }

    try {
      var mo = new MutationObserver(function(){
        var prev = __cc_overlay_active;
        __cc_overlay_compute();
        if (prev && !__cc_overlay_active) {
          try { unlockCSSScroll(); } catch(_) {}
        }
      });

      function startObs(){
        __cc_overlay_compute();
        if (document.body) {
          mo.observe(document.body, { attributes:true, attributeFilter:["class"], subtree:true, childList:true });
        }
      }

      if (document.body) startObs();
      else document.addEventListener("DOMContentLoaded", startObs);
    } catch(e) {
      if (window.__CC_DEBUG__) console.warn("[CC] MutationObserver unavailable", e);
    }

    // Adaptive watchdog: slow down when stable
    var wdMs = 1200;
    var stable = 0;

    // Wrap unlockCSSScroll to detect whether a "fix" was applied
    var __cc_unlock_orig = window.__cc_unlockCSSScroll;
    window.__cc_unlockCSSScroll = function(){
      if (__cc_overlay_active) return;

      var before = null;
      try {
        var html = document.documentElement, body = document.body;
        if (body) {
          var hc = getComputedStyle(html), bc = getComputedStyle(body);
          before = { h: hc.overflowY, b: bc.overflowY, p: bc.position };
        }
      } catch(e) {}

      __cc_unlock_orig();

      var changed = false;
      try {
        var html2 = document.documentElement, body2 = document.body;
        if (body2 && before) {
          var hc2 = getComputedStyle(html2), bc2 = getComputedStyle(body2);
          changed = (before.h === "hidden" && hc2.overflowY !== "hidden") ||
                    (before.b === "hidden" && bc2.overflowY !== "hidden") ||
                    (before.p === "fixed"  && bc2.position !== "fixed");
        }
      } catch(e) {}

      if (changed) {
        stable = 0;
        if (wdMs !== 1200) {
          wdMs = 1200;
          if (window.__cc_scroll_wd_timer) clearInterval(window.__cc_scroll_wd_timer);
          window.__cc_scroll_wd_timer = setInterval(window.__cc_unlockCSSScroll, wdMs);
        }
      } else {
        stable++;
        if (stable >= 10 && wdMs !== 8000) {
          wdMs = 8000;
          if (window.__cc_scroll_wd_timer) clearInterval(window.__cc_scroll_wd_timer);
          window.__cc_scroll_wd_timer = setInterval(window.__cc_unlockCSSScroll, wdMs);
        }
      }
    };

    // Replace existing interval with managed one
    if (window.__cc_scroll_wd_timer) clearInterval(window.__cc_scroll_wd_timer);
    window.__cc_scroll_wd_timer = setInterval(window.__cc_unlockCSSScroll, 1200);

  } catch(e) {
    if (window.__CC_DEBUG__) console.warn("[CC] scroll perf upgrade failed", e);
  }
})();
