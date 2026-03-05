/* =========================
   ColConnect - Arbitrage Exécutif Bandeau
   Connecté à l'API backend
   ========================= */

(function () {
  "use strict";

  // Configuration API - utilise l'URL backend de ColConnect
  const API_BASE = window._CC_API_BASE_ || '';

  // État du bandeau
  let bannerStatus = {
    status: 'warning',
    decision: 'Chargement...',
    pourquoi: 'Connexion à l\'API en cours...',
    actions: [],
    impact: '-',
    urgence: '-',
    horizon: '7 jours'
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Mise à jour du bandeau
  function updateBannerDisplay(data) {
    const banner = $('arbitrageExecBanner');
    if (!banner) return;

    // Indicateur de statut
    const indicator = banner.querySelector('.arb-exec-indicator');
    if (indicator) {
      indicator.className = 'arb-exec-indicator';
      if (data.status === 'ok') indicator.classList.add('status-ok');
      else if (data.status === 'error') indicator.classList.add('status-error');
      else indicator.classList.add('status-warning');
    }

    banner.setAttribute('data-status', data.status || 'warning');

    // Badges
    const impactBadge = $('arb-impact');
    const urgenceBadge = $('arb-urgence');
    const horizonBadge = $('arb-horizon');

    if (impactBadge) impactBadge.textContent = 'Impact : ' + (data.impact || '-');
    if (urgenceBadge) urgenceBadge.textContent = 'Urgence : ' + (data.urgence || '-');
    if (horizonBadge) horizonBadge.textContent = 'Horizon : ' + (data.horizon || '7 jours');

    // Contenu des cartes
    const decisionEl = $('arb-decision');
    if (decisionEl) decisionEl.textContent = data.decision || '-';

    const pourquoiEl = $('arb-pourquoi');
    if (pourquoiEl) pourquoiEl.textContent = data.pourquoi || '-';

    const actionsEl = $('arb-actions');
    if (actionsEl && Array.isArray(data.actions)) {
      actionsEl.innerHTML = data.actions.map(action => 
        `<li>${escapeHtml(action)}</li>`
      ).join('');
    }
  }

  // Fetch status from API using XMLHttpRequest to bypass MockAPI
  async function fetchStatus() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${API_BASE}/api/arbitrage/status`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            bannerStatus = data;
            updateBannerDisplay(data);
            resolve(data);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error('API non disponible'));
        }
      };
      
      xhr.onerror = function() {
        console.log('[Arbitrage Banner] Erreur réseau');
        reject(new Error('Erreur réseau'));
      };
      
      xhr.send();
    }).catch(error => {
      console.log('[Arbitrage Banner] API non joignable:', error.message);
      // Mode dégradé
      bannerStatus = {
        status: 'warning',
        decision: 'Arbitrage indisponible (API non joignable).',
        pourquoi: 'Vérifie _CC_API_BASE_ / le port 8001 / CORS. (UI stable)',
        actions: ['Relancer l\'API', 'Vérifier la collectivité active', 'Contrôler la console (debug=1)'],
        impact: '-',
        urgence: '-',
        horizon: '7 jours'
      };
      updateBannerDisplay(bannerStatus);
      return null;
    });
  }

  // Add button to open module
  function addOpenModuleButton() {
    const banner = $('arbitrageExecBanner');
    if (!banner) return;

    // Check if button already exists
    if ($('arbOpenModule')) return;

    // Make banner position relative for button positioning
    banner.style.position = 'relative';

    const btn = document.createElement('button');
    btn.id = 'arbOpenModule';
    btn.className = 'arb-exec-open-btn';
    btn.innerHTML = '↗ Ouvrir le module';
    btn.title = 'Ouvrir le module Arbitrage complet';
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('[Arbitrage] Opening module...');
      
      // Check if ArbitrageModule exists
      if (window.ArbitrageModule) {
        console.log('[Arbitrage] ArbitrageModule found, opening...');
        window.ArbitrageModule.open();
      } else {
        console.warn('[Arbitrage] ArbitrageModule not found, trying direct DOM manipulation...');
        // Fallback: try to show the modal directly
        const overlay = document.getElementById('arbModuleOverlay');
        if (overlay) {
          overlay.classList.add('active');
        } else {
          alert('Module Arbitrage non disponible. Veuillez recharger la page.');
        }
      }
    };

    banner.appendChild(btn);
    console.log('[Arbitrage Banner] Open button added');
  }

  // Initialization
  function init() {
    console.log('[Arbitrage Banner] Initializing...');
    
    // Initial fetch
    fetchStatus();
    
    // Add open module button
    setTimeout(addOpenModuleButton, 200);

    // Refresh every 30 seconds
    setInterval(fetchStatus, 30000);

    console.log('[Arbitrage Banner] Initialized');
  }

  // Expose globally
  window.ArbitrageBanner = {
    init,
    refresh: fetchStatus,
    getStatus: () => ({ ...bannerStatus })
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

})();
