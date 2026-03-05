// ColConnect - modals.js | v1.0 | Extrait de v8.html script 3 | Dépendances: main.js
(function(){
  function qs(id){ return document.getElementById(id); }
  function openOverlay(){
    var ov = qs('financeurWorkspaceOverlay');
    if(!ov) return;
    ov.classList.add('active');
    ov.setAttribute('aria-hidden','false');
    // If main init exists, call it safely
    try{
      if(typeof window.__ccFinanceurInit === 'function'){ window.__ccFinanceurInit(); }
    }catch(e){
      // show a minimal error banner inside list panel if present
      try{
        var lp = qs('fwListPanel');
        var dp = qs('fwDashboardPanel');
        if(dp) dp.style.display='none';
        if(lp){
          lp.style.display='grid';
          lp.innerHTML = '<div class="fw-card" style="grid-column:1/-1;">'
            + '<div class="fw-card-title">Espace Financeur – erreur JS</div>'
            + '<div class="fw-card-meta">Ouvre la console pour voir le détail. Le bouton et l’overlay fonctionnent.</div>'
            + '</div>';
        }
      }catch(_){}
    }
  }
  function closeOverlay(){
    var ov = qs('financeurWorkspaceOverlay');
    if(!ov) return;
    ov.classList.remove('active');
    ov.setAttribute('aria-hidden','true');
  }

  // Bind static FAB
  var btn = qs('openFinanceurWorkspaceFabStatic');
  if(btn){ btn.addEventListener('click', openOverlay); }

  // Bind close button if exists
  var closeBtn = qs('fwCloseBtn');
  if(closeBtn){ closeBtn.addEventListener('click', closeOverlay); }

  // Click outside closes
  var ov = qs('financeurWorkspaceOverlay');
  if(ov){
    ov.addEventListener('click', function(e){ if(e.target === ov) closeOverlay(); });
  }

  // Ensure visibility even if global CSS hides buttons
  if(btn){
    btn.style.display = 'inline-flex';
    btn.style.visibility = 'visible';
    btn.style.opacity = '1';
  }
})();

// ============================================
// ESPACE FINANCEUR - Gestion des onglets et actions
// ============================================

function showFinanceurPanel(panelName) {
    // Masquer tous les panels
    const panels = ['panelDashboard', 'panelFinances', 'panelOpportunites', 'panelEtude', 'panelFavoris', 'panelRefuses', 'panelNotifications'];
    panels.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.style.display = 'none';
    });

    // Afficher le panel sélectionné
    const panelId = 'panel' + panelName.charAt(0).toUpperCase() + panelName.slice(1);
    const activePanel = document.getElementById(panelId);
    if (activePanel) activePanel.style.display = 'block';

    // Mettre à jour les styles des boutons
    const tabBtns = document.querySelectorAll('[id^="tabBtn"]');
    tabBtns.forEach(btn => {
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.color = '#a0aec0';
        btn.style.border = '1px solid rgba(201, 162, 39, 0.3)';
    });

    // Activer le bouton sélectionné
    const btnId = 'tabBtn' + panelName.charAt(0).toUpperCase() + panelName.slice(1);
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) {
        activeBtn.style.background = 'linear-gradient(135deg, #c9a227, #d4b545)';
        activeBtn.style.color = '#0d1b2a';
        activeBtn.style.border = '1px solid rgba(201, 162, 39, 0.5)';
    }
}

// ============================================
// MON PATRIMOINE - Gestion des onglets
// ============================================
function setPatrimoineTab(tabName) {
    // Aucun alert placeholder : affichage direct du contenu (Décret Tertiaire, Projets énergie, Bailleurs).
    sessionStorage.setItem('patrimoineActiveTab', tabName);
    
    const panels = ['panelPatrimoine', 'panelEnergie'];
    panels.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.style.display = 'none';
    });
    
    const panelId = tabName === 'patrimoine' ? 'panelPatrimoine' : 'panelEnergie';
    const activePanel = document.getElementById(panelId);
    if (!activePanel) {
        console.error('[setPatrimoineTab] Panel non trouvé:', panelId);
        return;
    }
    activePanel.style.display = 'block';
    activePanel.style.visibility = 'visible';
    activePanel.style.opacity = '1';

    // Onglet Énergie : remplir "Projets liés patrimoine & énergie" (Décret Tertiaire, Bailleurs déjà dans le HTML)
    if (tabName === 'energie') {
        if (typeof loadPatrimoineProjets === 'function') loadPatrimoineProjets();
        setTimeout(function () { activePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    
    // Mettre à jour les styles des boutons
    const tabBtns = document.querySelectorAll('.pat-tab');
    tabBtns.forEach(btn => {
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.color = '#a0aec0';
        btn.style.border = '1px solid rgba(201, 162, 39, 0.3)';
        btn.style.fontWeight = '500';
        btn.classList.remove('active');
    });
    
    // Activer le bouton sélectionné
    const btnId = tabName === 'patrimoine' ? 'tabBtnPatrimoine' : 'tabBtnEnergie';
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) {
        activeBtn.style.background = 'linear-gradient(135deg, #c9a227, #d4b545)';
        activeBtn.style.color = '#0d1b2a';
        activeBtn.style.border = '1px solid rgba(201, 162, 39, 0.5)';
        activeBtn.style.fontWeight = '600';
        activeBtn.classList.add('active');
    }
    
    // Mettre à jour le titre et sous-titre de la page
    const titleEl = document.getElementById('patrimoinePageTitle');
    const subtitleEl = document.getElementById('patrimoinePageSubtitle');
    
    if (tabName === 'patrimoine') {
        if (titleEl) titleEl.textContent = 'Mon Patrimoine — Patrimoine analysé';
        if (subtitleEl) subtitleEl.textContent = 'Inventaire et qualification des bâtiments · Analyse des opportunités';
    } else {
        if (titleEl) titleEl.textContent = 'Mon Patrimoine — Énergie analysée';
        if (subtitleEl) subtitleEl.textContent = 'Pilotage énergétique du patrimoine bâti · Suivi Décret Tertiaire · Export OPERAT';
    }
}

// Exposer la fonction globalement
window.setPatrimoineTab = setPatrimoineTab;

// Restaurer l'onglet actif au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si on est sur la page Mon Patrimoine
    const patrimoineSection = document.getElementById('priv-patrimoine');
    if (patrimoineSection) {
        const savedTab = sessionStorage.getItem('patrimoineActiveTab') || 'patrimoine';
        setTimeout(() => setPatrimoineTab(savedTab), 100);
    }
});


// Notification Toast system
function showToast(message, type = 'success') {
    // Créer le conteneur si nécessaire
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 10000; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colors = {
        success: { bg: 'rgba(39,174,96,0.95)', icon: 'fa-check-circle' },
        error: { bg: 'rgba(231,76,60,0.95)', icon: 'fa-times-circle' },
        warning: { bg: 'rgba(241,196,15,0.95)', icon: 'fa-exclamation-triangle' },
        info: { bg: 'rgba(52,152,219,0.95)', icon: 'fa-info-circle' }
    };
    const config = colors[type] || colors.success;

    toast.style.cssText = `
        display: flex; align-items: center; gap: 12px; padding: 16px 20px;
        background: ${config.bg}; color: white; border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3); font-size: 0.95rem; font-weight: 500;
        animation: slideInRight 0.3s ease forwards; min-width: 280px;
    `;
    toast.innerHTML = `<i class="fas ${config.icon}"></i> ${message}`;
    container.appendChild(toast);

    // Auto-remove after 4s
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Ajouter animations CSS pour les toasts
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(toastStyles);

function ajouterFavori(projectName, btn) {
    showToast('⭐ "' + projectName + '" ajouté aux favoris', 'success');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-star"></i>';
        btn.style.background = 'linear-gradient(135deg, #9b59b6, #8e44ad)';
        btn.style.color = 'white';
        btn.onclick = null;
    }
    // Mise à jour du compteur favoris
    updateTabCounter('tabBtnFavoris', 1);
}

function retirerFavori(projectName, btn) {
    showToast('Projet retiré des favoris', 'info');
    if (btn) {
        btn.closest('.projet-card-financeur').style.opacity = '0.5';
        setTimeout(() => btn.closest('.projet-card-financeur').remove(), 500);
    }
    updateTabCounter('tabBtnFavoris', -1);
}

function marquerEtude(projectName, btn) {
    showToast('🔍 "' + projectName + '" marqué pour étude', 'info');
    if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Ajouté';
        btn.style.background = 'linear-gradient(135deg, #f1c40f, #f39c12)';
        btn.style.color = '#0d1b2a';
        btn.disabled = true;
    }
    updateTabCounter('tabBtnEtude', 1);
}

function validerFinancement(projectName) {
    if (confirm('💰 Confirmer le financement du projet "' + projectName + '" ?')) {
        showToast('🎉 Financement validé pour "' + projectName + '"', 'success');
        updateTabCounter('tabBtnFinances', 1);
        updateTabCounter('tabBtnEtude', -1);
    }
}

function refuserProjet(projectName, btn) {
    const raison = prompt('❌ Refuser "' + projectName + '" ?\n\nIndiquez la raison :');
    if (raison !== null && raison.trim() !== '') {
        showToast('Projet refusé : ' + projectName, 'warning');
        updateTabCounter('tabBtnRefuses', 1);
        updateTabCounter('tabBtnEtude', -1);
        if (btn) {
            btn.closest('.projet-card-financeur').style.opacity = '0.5';
            setTimeout(() => btn.closest('.projet-card-financeur').remove(), 500);
        }
    }
}

function reexaminerProjet(projectName) {
    showToast('🔄 "' + projectName + '" remis en étude', 'info');
    updateTabCounter('tabBtnRefuses', -1);
    updateTabCounter('tabBtnEtude', 1);
}

function updateTabCounter(tabId, delta) {
    const tab = document.getElementById(tabId);
    if (tab) {
        const span = tab.querySelector('span');
        if (span) {
            let count = parseInt(span.textContent) + delta;
            span.textContent = Math.max(0, count);
        }
    }
}

function voirTousProjetsFinances() {
    showFinanceurPanel('finances');
}

function openProjetFinanceur(projectName) {
    document.getElementById('detailTitle').textContent = projectName;
    document.getElementById('financeurProjectTitle').textContent = projectName;
    navigateTo('detail');
    setTimeout(() => {
        setDetailView('financeur');
        // Trouver le projet dans les données et appliquer les règles de visibilité
        const projet = (typeof projectsDatabase !== 'undefined' && projectsDatabase) ?
            projectsDatabase.find(p => (p.name || p.title) === projectName) :
            (typeof projetsParCollectivite !== 'undefined' ? 
                Object.values(projetsParCollectivite).flat().find(p => p.title === projectName) : null);
        if (projet && typeof populateProjectDetails === 'function') {
            // Créer un objet projet compatible avec populateProjectDetails
            const projetCompatible = {
                ...projet,
                title: projet.title || projet.name || projectName,
                name: projet.name || projet.title || projectName,
                collectivite: projet.collectivite || projet.collectiviteId,
                status: projet.status || 'etude'
            };
            populateProjectDetails(projetCompatible);
        } else if (typeof applyProjetVisibilityRules === 'function') {
            // Si projet non trouvé, appliquer quand même les règles avec un objet minimal
            applyProjetVisibilityRules({ title: projectName, collectivite: null });
        }
    }, 150);
}

function validerDocument(docId) {
    showToast('✅ Document validé avec succès', 'success');
    const countEl = document.getElementById('fkpiDocsAttente');
    if (countEl) {
        let count = parseInt(countEl.textContent) - 1;
        countEl.textContent = Math.max(0, count);
    }
}

function voirTousDocuments() {
    showToast('📄 Ouverture du gestionnaire de documents...', 'info');
}

function exportRapportFinanceur() {
    showToast('📊 Génération du rapport en cours...', 'info');
    setTimeout(() => showToast('✅ Rapport PDF exporté avec succès !', 'success'), 2000);
}

function openParametresFinanceur() {
    showToast('⚙️ Paramètres en cours de développement', 'info');
}

function ajouterCollaborateur() {
    showToast('📧 Ajout collaborateur en cours de développement', 'info');
}

// Raccourcis clavier
document.addEventListener('keydown', function(e) {
    // Alt + 1-6 pour naviguer entre les onglets financeur
    if (e.altKey && document.querySelector('#espace-financeur.active')) {
        const tabs = ['dashboard', 'finances', 'opportunites', 'etude', 'favoris', 'refuses'];
        const num = parseInt(e.key);
        if (num >= 1 && num <= 6) {
            e.preventDefault();
            showFinanceurPanel(tabs[num - 1]);
            showToast('Onglet: ' + tabs[num - 1], 'info');
        }
    }
});

// ============================================
// INTÉGRATION AIDES TERRITOIRES
// ============================================

function syncAidesTerritoires() {
    showToast('🔄 Synchronisation avec Aides Territoires...', 'info');
    // Simule une synchronisation
    setTimeout(() => {
        showToast('✅ Synchronisation terminée ! 3 nouvelles aides détectées', 'success');
    }, 2000);
}

function verifierEligibiliteAT(projectName, thematique) {
    // Mapping des thématiques ColConnect vers les catégories AT
    const thematiqueMap = {
        'education': 'education-culture-et-sport',
        'environnement': 'nature-environnement-risques',
        'energie': 'energies-dechets',
        'mobilite': 'mobilite-transports',
        'urbanisme': 'urbanisme-logement-amenagement'
    };

    const atThematique = thematiqueMap[thematique] || 'tous';
    const searchQuery = encodeURIComponent(projectName);

    // Ouvre Aides Territoires avec le pré-filtrage
    const url = `https://aides-territoires.beta.gouv.fr/aides/?text=${searchQuery}&categories=${atThematique}`;

    showToast('🔗 Ouverture d\'Aides Territoires...', 'info');
    window.open(url, '_blank');
}

function openAideTerritoires(aideType) {
    const aideUrls = {
        'fonds-vert': 'https://aides-territoires.beta.gouv.fr/aides/?programs=fonds-vert',
        'dsil': 'https://aides-territoires.beta.gouv.fr/aides/?text=DSIL',
        'detr': 'https://aides-territoires.beta.gouv.fr/aides/?text=DETR',
        'ademe': 'https://aides-territoires.beta.gouv.fr/aides/?backers=agence-de-l-environnement-et-de-la-maitrise-de-l-energie-ademe'
    };

    const url = aideUrls[aideType] || 'https://aides-territoires.beta.gouv.fr/aides/';
    window.open(url, '_blank');
    showToast('🔗 Ouverture des aides ' + aideType.toUpperCase(), 'info');
}

function rechercherAidesProjet(projectName, budget, thematiques) {
    // Fonction avancée pour rechercher des aides correspondant à un projet
    const params = new URLSearchParams();
    params.append('text', projectName);

    if (thematiques && thematiques.length > 0) {
        thematiques.forEach(t => params.append('categories', t));
    }

    const url = `https://aides-territoires.beta.gouv.fr/aides/?${params.toString()}`;
    window.open(url, '_blank');
}

function afficherHistoriqueSynchro() {
    showToast('📊 Historique des synchronisations', 'info');
    // Affiche un résumé des dernières synchros
    console.log('Dernières synchronisations Aides Territoires:');
    console.log('- 28/12/2024 14:32 : 247 aides récupérées');
    console.log('- 27/12/2024 10:15 : 245 aides récupérées');
    console.log('- 26/12/2024 16:45 : 244 aides récupérées');
}

// ============================================
// FILTRAGE NOTIFICATIONS PANEL
// ============================================

(function () {
    const list = document.getElementById('cc-notif-list');
    if (!list) return;

    const normStr = (s) => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const search = document.getElementById('notif-search');
    const typeFilter = document.getElementById('notif-type');
    const territoireFilter = document.getElementById('notif-territoire');
    const statutFilter = document.getElementById('notif-statut');
    const echeanceFilter = document.getElementById('notif-ech');
    const items = Array.from(list.querySelectorAll('.cc-notif-item'));

    function applyFilters() {
        const q = (search && search.value) ? normStr(search.value) : '';
        const typeVal = (typeFilter && typeFilter.value) ? typeFilter.value : '';
        const terrVal = (territoireFilter && territoireFilter.value) ? territoireFilter.value : '';
        const statVal = (statutFilter && statutFilter.value) ? statutFilter.value : '';
        const echVal = (echeanceFilter && echeanceFilter.value) ? echeanceFilter.value : '';

        items.forEach(item => {
            const text = normStr(item.textContent);
            const matchSearch = !q || text.includes(q);
            const matchType = !typeVal || item.dataset.type === typeVal;
            const matchTerritoire = !terrVal || item.dataset.territoire === terrVal;
            const matchStatut = !statVal || (statVal === 'non_lu' ? item.classList.contains('is-unread') : !item.classList.contains('is-unread'));
            const matchEcheance = !echVal || checkEcheance(item.dataset.ech, echVal);

            item.style.display = (matchSearch && matchType && matchTerritoire && matchStatut && matchEcheance) ? '' : 'none';
        });

        updateNotifCounter();
    }

    function checkEcheance(echVal, filterVal) {
        const ech = parseInt(echVal, 10);
        if (isNaN(ech)) return true;
        switch (filterVal) {
            case '7': return ech <= 7;
            case '30': return ech <= 30;
            case '90': return ech <= 90;
            default: return true;
        }
    }

    function updateNotifCounter() {
        const visibleUnread = items.filter(item =>
            item.style.display !== 'none' && item.classList.contains('is-unread')
        ).length;

        const tabBtn = document.getElementById('tabBtnNotifications');
        if (tabBtn) {
            const badge = tabBtn.querySelector('span');
            if (badge) badge.textContent = visibleUnread;
        }
    }

    // Attach event listeners
    [search, typeFilter, territoireFilter, statutFilter, echeanceFilter].forEach(el => {
        if (el) {
            el.addEventListener('input', applyFilters);
            el.addEventListener('change', applyFilters);
        }
    });

    // Actions: Mark as read / Archive
    list.addEventListener('click', e => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const article = btn.closest('.cc-notif-item');
        if (!article) return;

        if (btn.classList.contains('mark-read') || btn.classList.contains('cc-notif-action-read') || btn.textContent.toLowerCase().includes('lu')) {
            article.classList.remove('is-unread');
            article.dataset.statut = 'lu';
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-check"></i> ✓ Lu';
            btn.style.opacity = '0.5';
            showToast('📬 Notification marquée comme lue', 'success');
            updateNotifCounter();
        }

        if (btn.classList.contains('archive') || btn.classList.contains('cc-notif-action-archive') || btn.textContent.toLowerCase().includes('archiver')) {
            article.style.transition = 'all 0.3s ease';
            article.style.opacity = '0';
            article.style.transform = 'translateX(50px)';
            setTimeout(() => {
                article.remove();
                showToast('🗂️ Notification archivée', 'info');
                updateNotifCounter();
            }, 300);
        }
    });

    // Initial counter update
    updateNotifCounter();
})();

// ============================================
// BLOCAGE JAVASCRIPT BOUTON ADMINISTRATION
// ============================================

(function () {
    const role = document.body.dataset.role || 'collectivite';
    const blockedRoles = ['collectivite', 'financeur'];

    // 1) Désactivation visuelle
    if (blockedRoles.includes(role)) {
        document.querySelectorAll('.cc-nav-admin').forEach(btn => {
            btn.classList.add('cc-nav-admin-disabled');
        });
    }

    // 2) Gestion des clics de navigation
    document.querySelectorAll('.cc-nav-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const target = btn.dataset.nav;

            // Si Administration ET rôle bloqué -> on bloque tout
            if (target === 'administration' && blockedRoles.includes(role)) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            // Logique existante d'activation d'onglet / panneau
            document.querySelectorAll('[data-panel]').forEach(p => {
                p.classList.toggle('active', p.dataset.panel === target);
            });
            document.querySelectorAll('.cc-nav-btn').forEach(b => {
                b.classList.toggle('active', b === btn);
            });
        });
    });
})();

// ============================================
// BLOCAGE ADDITIONNEL - Après rechargement dynamique navigation
// ============================================

(function () {
    // Observer les changements sur data-role et bloquer le bouton admin
    function setupAdminBlocker() {
        const role = document.body.dataset.role || 'collectivite';
        const blockedRoles = ['collectivite', 'financeur'];

        document.querySelectorAll('.cc-nav-admin').forEach(adminBtn => {
            if (blockedRoles.includes(role)) {
                adminBtn.classList.add('cc-nav-admin-disabled');
                adminBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    console.warn('[ColConnect] Accès Administration bloqué pour le rôle:', role);
                }, true);
            }
        });
    }

    // Observer les mutations sur le body pour détecter les changements de data-role
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-role') {
                setTimeout(setupAdminBlocker, 100);
            }
            // Observer aussi les changements dans le DOM (nouvelle nav)
            if (mutation.type === 'childList') {
                setTimeout(setupAdminBlocker, 100);
            }
        });
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    // Setup initial
    document.addEventListener('DOMContentLoaded', setupAdminBlocker);

    // Re-setup régulier au cas où
    setInterval(setupAdminBlocker, 500);
})();

// ============================================
// NAVIGATION GLOBALE - openSection()
// ============================================

function openSection(sectionId) {
    if (sectionId === 'detail' && document.documentElement.getAttribute('data-cc-private') !== '1') return;
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Afficher la section demandée
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    // Mettre à jour l'onglet actif dans la nav
    document.querySelectorAll('.nav-tab').forEach(tab => {
        const s = tab.getAttribute('data-section');
        tab.classList.toggle('active', s === sectionId);
    });

    // Scroll en haut de la page
    window.scrollTo(0, 0);
}

// Event listeners pour les nav-tabs
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const sectionId = tab.getAttribute('data-section');
        if (sectionId) {
            openSection(sectionId);
        }
    });
});

// Event listeners pour les action buttons
document.querySelectorAll('[data-action="search"]').forEach(btn => {
    btn.addEventListener('click', () => openSection('search'));
});
document.querySelectorAll('[data-action="projets"]').forEach(btn => {
    btn.addEventListener('click', () => openSection('projets'));
});
document.querySelectorAll('[data-action="detail"]').forEach(btn => {
    btn.addEventListener('click', () => openSection('detail'));
});

// ============================================
// GESTION DES RÔLES - updateUIForRole()
// ============================================

function updateUIForRole(role) {
    // Appliquer le rôle sur le body
    document.body.setAttribute('data-role', role);

    const isAdmin = (role === 'admin' || role === 'superadmin');

    // Activer / désactiver les éléments admin
    document.querySelectorAll('.cc-nav-admin').forEach(el => {
        el.classList.toggle('cc-nav-admin-disabled', !isAdmin);
    });

    // Adapter le badge de rôle dans le header
    const roleBadge = document.querySelector('.header-role-badge');
    if (roleBadge) {
        const labels = {
            collectivite: 'Collectivité',
            financeur: 'Financeur',
            admin: 'Admin',
            superadmin: 'Super Admin'
        };
        roleBadge.textContent = labels[role] || role;
    }
}

// ============================================
// enterPlatform() : délègue à handleLogin si disponible (pour définir currentUser et rediriger)
// ============================================

function enterPlatform() {
    // Utiliser le flux d'authentification complet (handleLogin) qui définit currentUser et redirige
    if (typeof handleLogin === 'function') {
        handleLogin();
        return;
    }
    // Fallback si handleLogin pas encore chargé
    const username = document.getElementById('loginUsername')?.value?.trim();
    const password = document.getElementById('loginPassword')?.value?.trim();
    const role = document.getElementById('loginRole')?.value || 'collectivite';
    if (!username || !password) {
        alert('Merci de renseigner identifiant et mot de passe.');
        return;
    }
    updateUIForRole(role);
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.classList.add('hidden');
    if (typeof openSection === 'function') {
        if (role === 'collectivite') openSection('dashboard');
        else if (role === 'financeur') openSection('projets');
        else openSection('dashboard');
    }
}

// ============================================
// GESTION DES PROJETS - openProjectDetail()
// ============================================
// currentCollectivite déjà déclaré plus haut dans la page

function openProjectDetail(projectId) {
    // Chercher le projet dans la base de données simulée
    const project = (typeof projectsDatabase !== 'undefined')
        ? projectsDatabase.find(p => p.id === projectId)
        : null;

    if (project) {
        // Mapping vers la fiche détail
        const titleEl = document.querySelector('#detail-projet .detail-title, #detail .section-title');
        if (titleEl) titleEl.textContent = project.name + ' – ' + project.collectivite;

        const statusEl = document.querySelector('#detail-projet .detail-status, #detail .status-badge');
        if (statusEl) statusEl.textContent = project.status ? project.status.toUpperCase() : 'EN COURS';

        const budgetEl = document.querySelector('#detail-projet .detail-budget');
        if (budgetEl && project.budget) budgetEl.textContent = project.budget.toFixed(1) + ' M€';
    }

    // Ouvrir la section détail
    if (document.getElementById('detail-projet')) {
        openSection('detail-projet');
    } else if (document.getElementById('detail')) {
        openSection('detail');
    }
}

// ============================================
// RAFRAÎCHISSEMENT LISTE PROJETS
// ============================================

function refreshProjectsList() {
    const container = document.querySelector('.projets-grid');
    if (!container) return;

    // Filtrer par collectivité si projectsDatabase existe
    const filtered = (typeof projectsDatabase !== 'undefined')
        ? projectsDatabase.filter(p => p.collectivite === currentCollectivite)
        : [];

    container.innerHTML = '';
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'projet-card';
        card.onclick = () => openProjectDetail(p.id);
        card.innerHTML = `
            <div class="projet-header">
                <div class="projet-status ${p.status || ''}">
                    ${p.status || 'En cours'}
                </div>
                <div class="projet-title">${p.name || 'Projet'}</div>
            </div>
            <div class="projet-body">
                <div class="projet-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${p.collectivite || ''}</span>
                    <span><i class="fas fa-euro-sign"></i> ${p.budget ? p.budget.toFixed(1) + ' M€' : 'N/A'}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialiser la liste des projets au chargement
document.addEventListener('DOMContentLoaded', function() {
    if (typeof refreshProjectsList === 'function') {
        refreshProjectsList();
    }
});

// ============================================
// SYSTÈME DE MODALES
// ============================================

function openGenericModal({ title = '', body = '', footer = '' } = {}) {
    const overlay = document.getElementById('genericModalOverlay');
    if (!overlay) return;

    const titleEl = document.getElementById('genericModalTitle');
    const bodyEl = document.getElementById('genericModalBody');
    const footerEl = document.getElementById('genericModalFooter');

    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = body;
    if (footerEl) footerEl.innerHTML = footer;

    overlay.classList.add('active');
}

function closeGenericModal() {
    const overlay = document.getElementById('genericModalOverlay');
    if (overlay) overlay.classList.remove('active');
}

function openAdminModal(viewOrTitle, htmlBody) {
    const overlay = document.getElementById('adminModalOverlay');
    if (!overlay) return;

    const titleEl = document.getElementById('adminModalTitle');
    const bodyEl = document.getElementById('adminModalBody');

    // Appel avec contenu personnalisé (title + htmlBody) depuis main.js
    if (arguments.length >= 2 && htmlBody != null) {
        if (titleEl) titleEl.innerHTML = viewOrTitle;
        if (bodyEl) bodyEl.innerHTML = htmlBody;
        overlay.classList.remove('hidden'); // admin-modal-overlay
        return;
    }

    const view = viewOrTitle;
    // Routing interne selon la vue demandée
    if (view === 'users') {
        if (titleEl) titleEl.textContent = 'Gestion des utilisateurs';
        if (bodyEl) bodyEl.innerHTML = `
            <p>Liste des comptes utilisateurs de la plateforme.</p>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                    <span>lyon@collectivite.fr</span>
                    <span style="color: var(--secondary);">Collectivité</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--border);">
                    <span>paris@collectivite.fr</span>
                    <span style="color: var(--secondary);">Collectivité</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                    <span>admin@colconnect.fr</span>
                    <span style="color: #2ecc71;">Admin</span>
                </div>
            </div>
        `;
    } else if (view === 'settings') {
        if (titleEl) titleEl.textContent = 'Paramètres de la plateforme';
        if (bodyEl) bodyEl.innerHTML = `
            <p>Options de configuration globale.</p>
            <div style="margin-top: 1rem;">
                <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <input type="checkbox" checked> Activer les notifications par email
                </label>
                <label style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                    <input type="checkbox" checked> Synchronisation automatique Aides Territoires
                </label>
                <label style="display: flex; align-items: center; gap: 0.75rem;">
                    <input type="checkbox"> Mode maintenance
                </label>
            </div>
        `;
    } else {
        if (titleEl) titleEl.textContent = 'Administration';
        if (bodyEl) bodyEl.innerHTML = '<p>Panel d\'administration ColConnect.</p>';
    }

    overlay.classList.add('active');
}

function closeAdminModal() {
    const overlay = document.getElementById('adminModalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        overlay.classList.add('hidden'); // admin-modal-overlay utilise .hidden
    }
}

// Afficher les détails d'une aide
function showAideDetails(aide) {
    openGenericModal({
        title: aide.nom || 'Détails de l\'aide',
        body: `<p>${aide.resume || 'Aucune description disponible.'}</p>`,
        footer: `
            <button class="btn btn-secondary" onclick="closeGenericModal()">Fermer</button>
            ${aide.url ? `<a href="${aide.url}" target="_blank" class="btn btn-primary">Voir la fiche complète</a>` : ''}
        `
    });
}

// Fermer les modales avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGenericModal();
        closeAdminModal();
    }
});
