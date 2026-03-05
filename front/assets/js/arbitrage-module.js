/* =================================================
   ColConnect - Module Arbitrage Complet
   Connecté à l'API backend
   ================================================= */

console.log('[Arbitrage Module] File loaded!');

(function() {
  console.log('[Arbitrage Module] IIFE starting...');
  
  try {
    console.log('[Arbitrage Module] Starting script execution...');

  // Configuration API
  const API_BASE = window._CC_API_BASE_ || '';
  
  // État local
  let state = {
    params: {
      budgetTotal: 30,
      capMax: 8,
      riskMax: 75,
      wImpact: 45,
      wUrgence: 35,
      wRisque: 20
    },
    projects: [],
    status: null,
    loading: false,
    editingId: null,
    filterDecision: 'all',
    searchQuery: '',
    charts: {
      budget: null,
      decision: null
    }
  };

  // Éléments DOM
  const el = {};

  // ===============================
  // UTILITAIRES
  // ===============================
  
  function $(id) {
    return document.getElementById(id);
  }

  
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
function escapeHtml(s) {
    return String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatME(x) {
    return (Math.round(x * 10) / 10).toFixed(1);
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  // ===============================
  // API CALLS (using XMLHttpRequest to bypass MockAPI)
  // ===============================

  function apiCall(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const method = options.method || 'GET';
      const url = `${API_BASE}/api${endpoint}`;
      
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            resolve({});
          }
        } else {
          reject(new Error(`HTTP ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Erreur réseau'));
      };
      
      if (options.body) {
        xhr.send(options.body);
      } else {
        xhr.send();
      }
    });
  }

  async function fetchStatus() {
    return apiCall('/arbitrage/status');
  }

  async function fetchProjects() {
    return apiCall('/arbitrage/projects');
  }

  async function fetchParams() {
    return apiCall('/arbitrage/params');
  }

  async function fetchFullState() {
    return apiCall('/arbitrage/full');
  }

  async function updateParams(params) {
    return apiCall('/arbitrage/params', {
      method: 'PUT',
      body: JSON.stringify(params)
    });
  }

  async function createProject(project) {
    return apiCall('/arbitrage/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }

  async function updateProject(id, data) {
    return apiCall(`/arbitrage/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async function deleteProject(id) {
    return apiCall(`/arbitrage/projects/${id}`, {
      method: 'DELETE'
    });
  }

  async function runAutoArbitrage() {
    return apiCall('/arbitrage/auto', { method: 'POST' });
  }

  async function resetArbitrage() {
    return apiCall('/arbitrage/reset', { method: 'POST' });
  }

  // ===============================
  // RENDER FUNCTIONS
  // ===============================

  function renderTable() {
    const tbody = el.tbody;
    if (!tbody) return;

    const q = state.searchQuery.toLowerCase();
    const filter = state.filterDecision;

    const filtered = state.projects.filter(p => {
      const hitQ = !q || p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q);
      const hitD = filter === 'all' || p.decision === filter;
      return hitQ && hitD;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding:30px; color:var(--arb-muted);">
            Aucun projet trouvé
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(p => {
      const pillClass = p.decision === 'KEEP' ? 'keep' : p.decision === 'DROP' ? 'drop' : 'defer';
      const pillText = p.decision === 'KEEP' ? 'Garder' : p.decision === 'DROP' ? 'Retirer' : 'Reporter';
      
      return `
        <tr data-id="${p.id}">
          <td class="arb-cell-name">
            <div class="arb-name">${escapeHtml(p.name)}</div>
            <div class="arb-tag">${escapeHtml(p.tag)}${!p.eligible ? ' • <span class="arb-badge" style="font-size:10px;">non éligible</span>' : ''}</div>
          </td>
          <td><span class="arb-badge">${formatME(p.costME)}</span></td>
          <td><span class="arb-badge">${p.impact}</span></td>
          <td><span class="arb-badge">${p.urgence}</span></td>
          <td><span class="arb-badge">${p.risk}</span></td>
          <td><span class="arb-badge">${p.cap}</span></td>
          <td><span class="arb-badge">${p.score.toFixed(1)}</span></td>
          <td>
            <span class="arb-pill ${pillClass}" data-action="cycle">${pillText}</span>
          </td>
          <td style="text-align:right; white-space:nowrap;">
            <button class="arb-icon-btn" data-action="edit" title="Éditer">✎</button>
            <button class="arb-icon-btn" data-action="delete" title="Supprimer">🗑</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderKPIs() {
    const keep = state.projects.filter(p => p.decision === 'KEEP');
    const spent = keep.reduce((a, p) => a + p.costME, 0);
    const capUsed = keep.reduce((a, p) => a + p.cap, 0);
    const avgScore = keep.length ? keep.reduce((a, p) => a + p.score, 0) / keep.length : 0;
    const avgRisk = keep.length ? keep.reduce((a, p) => a + p.risk, 0) / keep.length : 0;

    if (el.kpiBudget) el.kpiBudget.textContent = `Budget: ${formatME(spent)} / ${formatME(state.params.budgetTotal)} M€`;
    if (el.kpiCap) el.kpiCap.textContent = `Capacité: ${capUsed} / ${state.params.capMax}`;
    if (el.kpiRisk) el.kpiRisk.textContent = `Risque max: ≤ ${state.params.riskMax}`;

    if (el.mSpent) el.mSpent.textContent = `${formatME(spent)} M€`;
    if (el.mSpentSub) el.mSpentSub.textContent = `Sur ${formatME(state.params.budgetTotal)} M€`;
    if (el.mKeep) el.mKeep.textContent = String(keep.length);
    if (el.mKeepSub) el.mKeepSub.textContent = `Sur ${state.projects.length} projets`;
    if (el.mAvg) el.mAvg.textContent = keep.length ? avgScore.toFixed(1) : '—';
    if (el.mAvgSub) el.mAvgSub.textContent = keep.length ? 'Score moyen' : 'Aucun projet gardé';
    if (el.mRiskAvg) el.mRiskAvg.textContent = keep.length ? avgRisk.toFixed(0) : '—';
    if (el.mRiskAvgSub) el.mRiskAvgSub.textContent = keep.length ? 'Risque moyen' : 'Aucun projet gardé';

    if (el.jsonView) {
      el.jsonView.textContent = JSON.stringify({
        params: state.params,
        projects: state.projects
      }, null, 2);
    }
  }

  function renderParams() {
    if (el.budgetTotal) el.budgetTotal.value = state.params.budgetTotal;
    if (el.capMax) el.capMax.value = state.params.capMax;
    if (el.riskMax) el.riskMax.value = state.params.riskMax;
    if (el.wImpact) el.wImpact.value = state.params.wImpact;
    if (el.wUrgence) el.wUrgence.value = state.params.wUrgence;
    if (el.wRisque) el.wRisque.value = state.params.wRisque;
  }

  // ===============================
  // CHARTS RENDERING
  // ===============================

  function renderCharts() {
    if (typeof Chart === 'undefined') {
      console.log('[Arbitrage] Chart.js not loaded');
      return;
    }

    const keep = state.projects.filter(p => p.decision === 'KEEP');
    const defer = state.projects.filter(p => p.decision === 'DEFER');
    const drop = state.projects.filter(p => p.decision === 'DROP');

    const budgetKeep = keep.reduce((a, p) => a + p.costME, 0);
    const budgetDefer = defer.reduce((a, p) => a + p.costME, 0);
    const budgetDrop = drop.reduce((a, p) => a + p.costME, 0);
    const budgetRemaining = Math.max(0, state.params.budgetTotal - budgetKeep);

    // Chart colors
    const colors = {
      keep: '#22c55e',
      defer: '#fbbf24',
      drop: '#ef4444',
      remaining: 'rgba(255,255,255,0.15)'
    };

    // Budget Doughnut Chart
    const budgetCtx = $('arbChartBudget');
    if (budgetCtx) {
      if (state.charts.budget) {
        state.charts.budget.destroy();
      }

      state.charts.budget = new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
          labels: ['Gardés', 'Reportés', 'Retirés', 'Disponible'],
          datasets: [{
            data: [budgetKeep, budgetDefer, budgetDrop, budgetRemaining],
            backgroundColor: [colors.keep, colors.defer, colors.drop, colors.remaining],
            borderColor: 'rgba(11,19,32,0.8)',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                  return `${context.label}: ${value.toFixed(1)} M€ (${pct}%)`;
                }
              }
            }
          },
          cutout: '60%'
        }
      });
    }

    // Decision Bar Chart
    const decisionCtx = $('arbChartDecision');
    if (decisionCtx) {
      if (state.charts.decision) {
        state.charts.decision.destroy();
      }

      state.charts.decision = new Chart(decisionCtx, {
        type: 'bar',
        data: {
          labels: ['Gardés', 'Reportés', 'Retirés'],
          datasets: [{
            label: 'Nombre de projets',
            data: [keep.length, defer.length, drop.length],
            backgroundColor: [colors.keep, colors.defer, colors.drop],
            borderRadius: 6,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  const total = state.projects.length;
                  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                  return `${value} projet(s) (${pct}%)`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                color: 'rgba(255,255,255,0.6)'
              },
              grid: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            x: {
              ticks: {
                color: 'rgba(255,255,255,0.8)'
              },
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }

  function render() {
    renderParams();
    renderTable();
    renderKPIs();
    renderCharts();
  }

  // ===============================
  // BANDEAU STATUS UPDATE
  // ===============================

  function updateBannerStatus(status) {
    const banner = $('arbitrageExecBanner');
    if (!banner || !status) return;

    // Indicateur
    const indicator = banner.querySelector('.arb-exec-indicator');
    if (indicator) {
      indicator.className = 'arb-exec-indicator';
      indicator.classList.add(`status-${status.status || 'warning'}`);
    }

    banner.setAttribute('data-status', status.status || 'warning');

    // Badges
    const impactBadge = $('arb-impact');
    const urgenceBadge = $('arb-urgence');
    const horizonBadge = $('arb-horizon');

    if (impactBadge) impactBadge.textContent = `Impact : ${status.impact || '-'}`;
    if (urgenceBadge) urgenceBadge.textContent = `Urgence : ${status.urgence || '-'}`;
    if (horizonBadge) horizonBadge.textContent = `Horizon : ${status.horizon || '7 jours'}`;

    
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
// Contenu des cartes
    if ($('arb-decision')) $('arb-decision').textContent = status.decision || '-';
    if ($('arb-pourquoi')) $('arb-pourquoi').textContent = status.pourquoi || '-';
    
    const actionsEl = $('arb-actions');
    if (actionsEl && Array.isArray(status.actions)) {
      actionsEl.innerHTML = status.actions.map(a => `<li>${escapeHtml(a)}</li>`).join('');
    }
  }

  // ===============================
  // ACTIONS
  // ===============================

  async function loadData() {
    state.loading = true;
    try {
      const data = await fetchFullState();
      state.params = data.params;
      state.projects = data.projects;
      state.status = data.status;
      updateBannerStatus(data.status);
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur chargement données:', error);
    } finally {
      state.loading = false;
    }
  }

  async function handleAutoArbitrage() {
    state.loading = true;
    try {
      const result = await runAutoArbitrage();
      state.projects = result.projects;
      state.status = result.status;
      updateBannerStatus(result.status);
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur arbitrage auto:', error);
      alert('Erreur lors de l\'arbitrage automatique');
    } finally {
      state.loading = false;
    }
  }

  async function handleReset() {
    if (!confirm('Réinitialiser tous les projets de démonstration ?')) return;
    
    state.loading = true;
    try {
      await resetArbitrage();
      await loadData();
    } catch (error) {
      console.error('[Arbitrage] Erreur réinitialisation:', error);
      alert('Erreur lors de la réinitialisation');
    } finally {
      state.loading = false;
    }
  }

  async function handleParamsChange() {
    const newParams = {
      budgetTotal: parseFloat(el.budgetTotal?.value || 30),
      capMax: parseInt(el.capMax?.value || 8),
      riskMax: parseInt(el.riskMax?.value || 75),
      wImpact: parseInt(el.wImpact?.value || 45),
      wUrgence: parseInt(el.wUrgence?.value || 35),
      wRisque: parseInt(el.wRisque?.value || 20)
    };

    try {
      state.params = await updateParams(newParams);
      // Refresh projects pour recalculer les scores
      state.projects = await fetchProjects();
      state.status = await fetchStatus();
      updateBannerStatus(state.status);
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur mise à jour params:', error);
    }
  }

  function normalizeWeights() {
    let wi = clamp(parseInt(el.wImpact?.value || 45), 0, 100);
    let wu = clamp(parseInt(el.wUrgence?.value || 35), 0, 100);
    let wr = clamp(parseInt(el.wRisque?.value || 20), 0, 100);
    const s = wi + wu + wr;
    
    if (s <= 0) {
      wi = 45; wu = 35; wr = 20;
    } else {
      wi = Math.round((wi / s) * 100);
      wu = Math.round((wu / s) * 100);
      wr = Math.round((wr / s) * 100);
    }
    
    if (el.wImpact) el.wImpact.value = wi;
    if (el.wUrgence) el.wUrgence.value = wu;
    if (el.wRisque) el.wRisque.value = wr;
    
    handleParamsChange();
  }

  async function cycleDecision(projectId) {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return;

    const order = ['KEEP', 'DEFER', 'DROP'];
    const idx = order.indexOf(project.decision);
    const newDecision = order[(idx + 1) % order.length];

    try {
      const updated = await updateProject(projectId, { decision: newDecision });
      const index = state.projects.findIndex(p => p.id === projectId);
      if (index >= 0) state.projects[index] = updated;
      
      state.status = await fetchStatus();
      updateBannerStatus(state.status);
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur changement décision:', error);
    }
  }

  async function handleDeleteProject(projectId) {
    if (!confirm('Supprimer ce projet ?')) return;

    try {
      await deleteProject(projectId);
      state.projects = state.projects.filter(p => p.id !== projectId);
      state.status = await fetchStatus();
      updateBannerStatus(state.status);
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur suppression:', error);
      alert('Erreur lors de la suppression');
    }
  }

  // ===============================
  // EDIT MODAL
  // ===============================

  function openEditModal(projectId = null) {
    state.editingId = projectId;
    const modal = $('arbEditModal');
    if (!modal) return;

    const titleEl = $('arbEditTitle');
    
    if (projectId) {
      const project = state.projects.find(p => p.id === projectId);
      if (!project) return;
      
      if (titleEl) titleEl.textContent = 'Éditer le projet';
      if ($('arbFName')) $('arbFName').value = project.name;
      if ($('arbFTag')) $('arbFTag').value = project.tag;
      if ($('arbFCost')) $('arbFCost').value = project.costME;
      if ($('arbFCap')) $('arbFCap').value = project.cap;
      if ($('arbFEligible')) $('arbFEligible').value = String(project.eligible);
      if ($('arbFImpact')) $('arbFImpact').value = project.impact;
      if ($('arbFUrgence')) $('arbFUrgence').value = project.urgence;
      if ($('arbFRisk')) $('arbFRisk').value = project.risk;
    } else {
      if (titleEl) titleEl.textContent = 'Ajouter un projet';
      if ($('arbFName')) $('arbFName').value = '';
      if ($('arbFTag')) $('arbFTag').value = '';
      if ($('arbFCost')) $('arbFCost').value = '2.5';
      if ($('arbFCap')) $('arbFCap').value = '2';
      if ($('arbFEligible')) $('arbFEligible').value = 'true';
      if ($('arbFImpact')) $('arbFImpact').value = '70';
      if ($('arbFUrgence')) $('arbFUrgence').value = '55';
      if ($('arbFRisk')) $('arbFRisk').value = '35';
    }

    modal.classList.add('active');
  }

  function closeEditModal() {
    const modal = $('arbEditModal');
    if (modal) modal.classList.remove('active');
    state.editingId = null;
  }

  async function saveProject() {
    const name = ($('arbFName')?.value || '').trim();
    if (!name) {
      alert('Nom requis');
      return;
    }

    const projectData = {
      name,
      tag: ($('arbFTag')?.value || '').trim(),
      costME: parseFloat($('arbFCost')?.value || 0),
      cap: parseInt($('arbFCap')?.value || 2),
      eligible: $('arbFEligible')?.value === 'true',
      impact: clamp(parseInt($('arbFImpact')?.value || 50), 0, 100),
      urgence: clamp(parseInt($('arbFUrgence')?.value || 50), 0, 100),
      risk: clamp(parseInt($('arbFRisk')?.value || 30), 0, 100)
    };

    try {
      if (state.editingId) {
        const updated = await updateProject(state.editingId, projectData);
        const index = state.projects.findIndex(p => p.id === state.editingId);
        if (index >= 0) state.projects[index] = updated;
      } else {
        const newProject = await createProject(projectData);
        state.projects.push(newProject);
      }

      state.status = await fetchStatus();
      updateBannerStatus(state.status);
      closeEditModal();
      render();
    } catch (error) {
      console.error('[Arbitrage] Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  }

  // ===============================
  // EXPORT FUNCTIONS
  // ===============================

  function exportJSON() {
    const data = {
      params: state.params,
      projects: state.projects
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, `arbitrage_${dateStamp()}.json`);
  }

  function exportCSV() {
    const rows = [
      ['id', 'name', 'tag', 'costME', 'impact', 'urgence', 'risk', 'cap', 'eligible', 'decision', 'score'],
      ...state.projects.map(p => [
        p.id, p.name, p.tag, String(p.costME), String(p.impact), String(p.urgence),
        String(p.risk), String(p.cap), String(p.eligible), p.decision, String(p.score)
      ])
    ];
    const csv = rows.map(r => r.map(csvEscape).join(';')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    downloadBlob(blob, `arbitrage_${dateStamp()}.csv`);
  }

  function csvEscape(v) {
    const s = String(v ?? '');
    if (/[;"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  }

  function downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  function dateStamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  // ===============================
  // IMPORT FUNCTION
  // ===============================

  function handleImport(file) {
    const fr = new FileReader();
    fr.onload = async () => {
      try {
        const obj = JSON.parse(String(fr.result || '{}'));
        if (!obj || !Array.isArray(obj.projects)) {
          throw new Error('Format JSON invalide');
        }

        // Reset and recreate projects
        await resetArbitrage();
        
        for (const p of obj.projects) {
          await createProject({
            name: p.name || 'Sans nom',
            tag: p.tag || '',
            costME: p.costME || 0,
            impact: p.impact || 50,
            urgence: p.urgence || 50,
            risk: p.risk || 30,
            cap: p.cap || 2,
            eligible: p.eligible !== false
          });
        }

        if (obj.params) {
          await updateParams(obj.params);
        }

        await loadData();
        alert('Import réussi !');
      } catch (e) {
        alert('Import impossible: ' + e.message);
      }
    };
    fr.readAsText(file);
  }

  // ===============================
  // MODAL MANAGEMENT
  // ===============================

  function openModule() {
    const overlay = $('arbModuleOverlay');
    if (overlay) {
      overlay.classList.add('active');
      loadData();
    }
  }

  function closeModule() {
    const overlay = $('arbModuleOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  // ===============================
  // EVENT WIRING
  // ===============================

  function wireEvents() {
    // Cache elements
    el.budgetTotal = $('arbBudgetTotal');
    el.capMax = $('arbCapMax');
    el.riskMax = $('arbRiskMax');
    el.wImpact = $('arbWImpact');
    el.wUrgence = $('arbWUrgence');
    el.wRisque = $('arbWRisque');
    el.tbody = $('arbTbody');
    el.kpiBudget = $('arbKpiBudget');
    el.kpiCap = $('arbKpiCap');
    el.kpiRisk = $('arbKpiRisk');
    el.mSpent = $('arbMSpent');
    el.mSpentSub = $('arbMSpentSub');
    el.mKeep = $('arbMKeep');
    el.mKeepSub = $('arbMKeepSub');
    el.mAvg = $('arbMAvg');
    el.mAvgSub = $('arbMAvgSub');
    el.mRiskAvg = $('arbMRiskAvg');
    el.mRiskAvgSub = $('arbMRiskAvgSub');
    el.jsonView = $('arbJsonView');

    // Bouton ouvrir module
    const openBtn = $('arbOpenModule');
    if (openBtn) openBtn.addEventListener('click', openModule);

    // Bouton fermer module
    const closeBtn = $('arbCloseModule');
    if (closeBtn) closeBtn.addEventListener('click', closeModule);

    // Overlay click to close
    const overlay = $('arbModuleOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModule();
      });
    }

    // Actions buttons
    const btnAuto = $('arbBtnAuto');
    if (btnAuto) btnAuto.addEventListener('click', handleAutoArbitrage);

    const btnNormalize = $('arbBtnNormalize');
    if (btnNormalize) btnNormalize.addEventListener('click', normalizeWeights);

    const btnReset = $('arbBtnReset');
    if (btnReset) btnReset.addEventListener('click', handleReset);

    const btnExportJson = $('arbBtnExportJson');
    if (btnExportJson) btnExportJson.addEventListener('click', exportJSON);

    const btnExportCsv = $('arbBtnExportCsv');
    if (btnExportCsv) btnExportCsv.addEventListener('click', exportCSV);

    const btnImport = $('arbBtnImport');
    const fileImport = $('arbFileImport');
    if (btnImport && fileImport) {
      btnImport.addEventListener('click', () => fileImport.click());
      fileImport.addEventListener('change', (e) => {
        const f = e.target.files?.[0];
        if (f) handleImport(f);
        fileImport.value = '';
      });
    }

    const btnAdd = $('arbBtnAdd');
    if (btnAdd) btnAdd.addEventListener('click', () => openEditModal(null));

    // Params change
    ['arbBudgetTotal', 'arbCapMax', 'arbRiskMax', 'arbWImpact', 'arbWUrgence', 'arbWRisque'].forEach(id => {
      const input = $(id);
      if (input) {
        input.addEventListener('change', handleParamsChange);
      }
    });

    // Search and filter
    const searchInput = $('arbSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderTable();
      });
    }

    const filterSelect = $('arbFilterDecision');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        state.filterDecision = e.target.value;
        renderTable();
      });
    }

    // Table clicks
    const tbody = $('arbTbody');
    if (tbody) {
      tbody.addEventListener('click', (e) => {
        const tr = e.target.closest('tr[data-id]');
        if (!tr) return;
        const id = tr.getAttribute('data-id');

        if (e.target.closest('[data-action="edit"]')) {
          openEditModal(id);
        } else if (e.target.closest('[data-action="delete"]')) {
          handleDeleteProject(id);
        } else if (e.target.closest('[data-action="cycle"]')) {
          cycleDecision(id);
        }
      });
    }

    // Edit modal
    const editModal = $('arbEditModal');
    if (editModal) {
      editModal.addEventListener('click', (e) => {
        if (e.target.closest('[data-close]')) closeEditModal();
        if (e.target.classList.contains('arb-edit-overlay')) closeEditModal();
      });
    }

    const btnSave = $('arbBtnSave');
    if (btnSave) btnSave.addEventListener('click', saveProject);

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeEditModal();
        closeModule();
      }
    });
  }

  // ===============================
  // INITIALIZATION
  // ===============================

  function init() {
    console.log('[Arbitrage Module] Starting init...');
    
    // Inject module HTML if not present
    if (!$('arbModuleOverlay')) {
      console.log('[Arbitrage Module] Injecting HTML...');
      injectModuleHTML();
    }

    wireEvents();
    console.log('[Arbitrage Module] Events wired');

    // Load initial status for banner
    fetchStatus().then(status => {
      updateBannerStatus(status);
    }).catch(err => {
      console.log('[Arbitrage] API not available:', err);
    });

    console.log('[Arbitrage Module] Initialized successfully');
  }

  function injectModuleHTML() {
    const html = `
      <!-- MODULE ARBITRAGE OVERLAY -->
      <div class="arb-modal-overlay" id="arbModuleOverlay">
        <div class="arb-modal">
          <header class="arb-modal-header">
            <div class="arb-modal-brand">
              <div class="arb-modal-logo">CC</div>
              <div>
                <div class="arb-modal-title">Arbitrage</div>
                <div class="arb-modal-subtitle">Décider : garder, reporter, retirer — sous contrainte</div>
              </div>
            </div>
            <div class="arb-modal-actions">
              <button class="arb-btn" id="arbBtnReset">Réinitialiser</button>
              <button class="arb-btn" id="arbBtnImport">Importer JSON</button>
              <button class="arb-btn" id="arbBtnExportJson">Exporter JSON</button>
              <button class="arb-btn arb-btn-primary" id="arbBtnExportCsv">Exporter CSV</button>
              <button class="arb-btn-close" id="arbCloseModule" title="Fermer">×</button>
            </div>
          </header>

          <main class="arb-modal-content">
            <!-- Paramètres -->
            <section class="arb-card">
              <div class="arb-card-head">
                <h2>Paramètres</h2>
                <p>Définis tes contraintes, puis arbitre automatiquement ou manuellement.</p>
              </div>

              <div class="arb-grid-3">
                <label class="arb-field">
                  <span>Budget total (M€)</span>
                  <input id="arbBudgetTotal" type="number" step="0.1" min="0" value="30" />
                </label>
                <label class="arb-field">
                  <span>Capacité chantier (nb max)</span>
                  <input id="arbCapMax" type="number" step="1" min="1" value="8" />
                </label>
                <label class="arb-field">
                  <span>Seuil risque max (0–100)</span>
                  <input id="arbRiskMax" type="number" step="1" min="0" max="100" value="75" />
                </label>
              </div>

              <div class="arb-grid-3">
                <label class="arb-field">
                  <span>Pondération Impact (0–100)</span>
                  <input id="arbWImpact" type="number" step="1" min="0" max="100" value="45" />
                </label>
                <label class="arb-field">
                  <span>Pondération Urgence (0–100)</span>
                  <input id="arbWUrgence" type="number" step="1" min="0" max="100" value="35" />
                </label>
                <label class="arb-field">
                  <span>Pondération Risque (0–100)</span>
                  <input id="arbWRisque" type="number" step="1" min="0" max="100" value="20" />
                </label>
              </div>

              <div class="arb-row">
                <button class="arb-btn arb-btn-primary" id="arbBtnAuto">Arbitrage automatique</button>
                <button class="arb-btn" id="arbBtnNormalize">Normaliser pondérations</button>
                <div class="arb-spacer"></div>
                <div class="arb-chip" id="arbKpiBudget">Budget: —</div>
                <div class="arb-chip" id="arbKpiCap">Capacité: —</div>
                <div class="arb-chip" id="arbKpiRisk">Risque: —</div>
              </div>
            </section>

            <!-- Projets -->
            <section class="arb-card">
              <div class="arb-card-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <div>
                  <h2>Projets</h2>
                  <p>Ajoute, édite, puis arbitre. Le score guide, mais tu peux forcer une décision.</p>
                </div>
                <div class="arb-row" style="padding:0;">
                  <input class="arb-search" id="arbSearch" placeholder="Rechercher (nom, tag...)" />
                  <select class="arb-select" id="arbFilterDecision">
                    <option value="all">Toutes décisions</option>
                    <option value="KEEP">Garder</option>
                    <option value="DEFER">Reporter</option>
                    <option value="DROP">Retirer</option>
                  </select>
                  <button class="arb-btn" id="arbBtnAdd">+ Ajouter</button>
                </div>
              </div>

              <div class="arb-table-wrap">
                <table class="arb-table">
                  <thead>
                    <tr>
                      <th>Projet</th>
                      <th>Coût (M€)</th>
                      <th>Impact</th>
                      <th>Urgence</th>
                      <th>Risque</th>
                      <th>Capacité</th>
                      <th>Score</th>
                      <th>Décision</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="arbTbody"></tbody>
                </table>
              </div>

              <div class="arb-note">
                Astuce : "Risque" pénalise le score. Si un projet dépasse <b>Seuil risque max</b>, l'auto-arbitrage le met par défaut en <b>Reporter</b>.
              </div>
            </section>

            <!-- Résultats -->
            <section class="arb-card">
              <div class="arb-card-head">
                <h2>Résultats</h2>
                <p>Vision synthèse : budget engagé, projets gardés, qualité de portefeuille.</p>
              </div>

              <div class="arb-grid-4">
                <div class="arb-metric">
                  <div class="arb-metric-k">Budget engagé</div>
                  <div class="arb-metric-v" id="arbMSpent">—</div>
                  <div class="arb-metric-s" id="arbMSpentSub">—</div>
                </div>
                <div class="arb-metric">
                  <div class="arb-metric-k">Projets gardés</div>
                  <div class="arb-metric-v" id="arbMKeep">—</div>
                  <div class="arb-metric-s" id="arbMKeepSub">—</div>
                </div>
                <div class="arb-metric">
                  <div class="arb-metric-k">Score moyen (garder)</div>
                  <div class="arb-metric-v" id="arbMAvg">—</div>
                  <div class="arb-metric-s" id="arbMAvgSub">—</div>
                </div>
                <div class="arb-metric">
                  <div class="arb-metric-k">Risque moyen (garder)</div>
                  <div class="arb-metric-v" id="arbMRiskAvg">—</div>
                  <div class="arb-metric-s" id="arbMRiskAvgSub">—</div>
                </div>
              </div>

              <!-- Section Graphiques -->
              <div class="arb-card-head" style="border-top: 1px solid var(--arb-line); margin-top: 16px;">
                <h2>Visualisation</h2>
                <p>Répartition du budget et des décisions</p>
              </div>
              
              <div class="arb-charts-grid">
                <div class="arb-chart-container">
                  <div class="arb-chart-title">Répartition du Budget (M€)</div>
                  <canvas id="arbChartBudget" class="arb-chart-canvas"></canvas>
                  <div class="arb-chart-legend">
                    <div class="arb-legend-item"><span class="arb-legend-dot keep"></span> Gardés</div>
                    <div class="arb-legend-item"><span class="arb-legend-dot defer"></span> Reportés</div>
                    <div class="arb-legend-item"><span class="arb-legend-dot drop"></span> Retirés</div>
                  </div>
                </div>
                
                <div class="arb-chart-container">
                  <div class="arb-chart-title">Nombre de Projets par Décision</div>
                  <canvas id="arbChartDecision" class="arb-chart-canvas"></canvas>
                </div>
              </div>

              <details class="arb-details">
                <summary>Voir le portefeuille (JSON)</summary>
                <pre class="arb-pre" id="arbJsonView">{}</pre>
              </details>
            </section>
          </main>
        </div>
      </div>

      <!-- Modal édition -->
      <div class="arb-edit-modal" id="arbEditModal">
        <div class="arb-edit-overlay" data-close="1"></div>
        <div class="arb-edit-panel">
          <div class="arb-edit-head">
            <div>
              <div class="arb-edit-title" id="arbEditTitle">Ajouter un projet</div>
              <div class="arb-modal-subtitle">Impact/Urgence/Risque sur 0–100</div>
            </div>
            <button class="arb-btn" data-close="1">Fermer</button>
          </div>

          <div class="arb-grid-2">
            <label class="arb-field">
              <span>Nom</span>
              <input id="arbFName" type="text" placeholder="Ex: Rénovation école Jaurès" />
            </label>
            <label class="arb-field">
              <span>Service/Tag</span>
              <input id="arbFTag" type="text" placeholder="Ex: Éducation / Voirie / Eau" />
            </label>
          </div>

          <div class="arb-grid-3">
            <label class="arb-field">
              <span>Coût (M€)</span>
              <input id="arbFCost" type="number" step="0.1" min="0" value="2.5" />
            </label>
            <label class="arb-field">
              <span>Capacité (1–5)</span>
              <input id="arbFCap" type="number" step="1" min="1" max="5" value="2" />
            </label>
            <label class="arb-field">
              <span>Éligible</span>
              <select id="arbFEligible" class="arb-select">
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </label>
          </div>

          <div class="arb-grid-3">
            <label class="arb-field"><span>Impact</span><input id="arbFImpact" type="number" min="0" max="100" value="70" /></label>
            <label class="arb-field"><span>Urgence</span><input id="arbFUrgence" type="number" min="0" max="100" value="55" /></label>
            <label class="arb-field"><span>Risque</span><input id="arbFRisk" type="number" min="0" max="100" value="35" /></label>
          </div>

          <div class="arb-row">
            <button class="arb-btn arb-btn-primary" id="arbBtnSave">Enregistrer</button>
            <button class="arb-btn" data-close="1">Annuler</button>
          </div>
        </div>
      </div>

      <!-- Import file input -->
      <input type="file" id="arbFileImport" accept="application/json" hidden />
    `;

    document.body.insertAdjacentHTML('beforeend', html);
    console.log('[Arbitrage Module] HTML injected');
  }

  // Expose globally BEFORE init
  window.ArbitrageModule = {
    init,
    open: openModule,
    close: closeModule,
    refresh: loadData
  };
  
  console.log('[Arbitrage Module] Script loaded, exposing ArbitrageModule globally');

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }
  
  } catch (e) {
    console.error('[Arbitrage Module] Fatal error:', e);
  }

})();
