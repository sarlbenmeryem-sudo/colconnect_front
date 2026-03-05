/* ColConnect - 52 Améliorations | v1.1 | 03/02/2026 */
(function() {
    'use strict';

    // ========== 8. getBatimentAdresseDisplay ==========
    window.getBatimentAdresseDisplay = function(b) {
        if (!b) return '—';
        var cpVille = (typeof COLLECTIVITES_CP_VILLE !== 'undefined' && b.collectiviteId && COLLECTIVITES_CP_VILLE[b.collectiviteId]) ? COLLECTIVITES_CP_VILLE[b.collectiviteId] : (b.batCpVille || b.cpVille || '');
        var rue = b.batAdresseRue || b.adresseRue || b.editFicheAdresseRue || '';
        if (b.adresse && !rue && !cpVille) {
            var m1 = (b.adresse || '').match(/^(.+?)\s*,\s*(\d{5}\s+.+)$/);
            if (m1) { rue = m1[1].trim(); cpVille = cpVille || m1[2].trim(); } else return b.adresse;
        }
        if (!rue && !cpVille) return '—';
        if (rue && cpVille) return rue + ' / ' + cpVille;
        return rue || cpVille || '—';
    };

    // ========== 17-18. quickLogin ==========
    window.quickLogin = function() {
        var un = document.getElementById('loginUsername');
        var pw = document.getElementById('loginPassword');
        var role = document.getElementById('loginRole');
        if (un) un.value = 'lyon';
        if (pw) pw.value = '1234';
        if (role) role.value = 'collectivite';
        if (typeof enterPlatform === 'function') enterPlatform();
    };

    // ========== 23-27. Suggestions + pré-remplissage ==========
    var CP_NAME_BY_TYPE = { 'Éducation':'Groupe scolaire', 'Patrimoine':'Rénovation énergétique', 'Petite enfance':'Crèche municipale', 'Culture':'Médiathèque', 'Sport':'Gymnase', 'Santé':'EHPAD', 'Urbanisme':'Écoquartier', 'Mobilité':'Piste cyclable', 'Transport':'Ligne tramway', 'Énergie':'Rénovation énergétique' };
    var CP_BUDGET_BY_TYPE = { 'Éducation':'2.5', 'Patrimoine':'1.8', 'Petite enfance':'1.2', 'Culture':'3.5', 'Sport':'2.2', 'Santé':'8', 'Urbanisme':'12', 'Mobilité':'1.5', 'Transport':'15', 'Énergie':'1.5' };
    var BAT_NAME_BY_TYPE = { 'ecole':'École', 'sport':'Gymnase', 'mairie':'Mairie', 'salle':'Salle polyvalente' };

    function renderCpNameSuggestions() {
        var sel = document.getElementById('cpType');
        var cont = document.getElementById('cpNameSuggestions');
        if (!cont) return;
        var t = (sel && sel.value) ? sel.value : '';
        var names = t && CP_NAME_BY_TYPE[t] ? [CP_NAME_BY_TYPE[t]] : ['Rénovation énergétique', 'Groupe scolaire', 'Gymnase', 'Médiathèque'];
        cont.innerHTML = names.map(function(n){ return '<span class="cc-suggestion-chip" onclick="document.getElementById(\'cpName\').value=\''+n.replace(/'/g,"\\'")+'\'">'+n+'</span>'; }).join('');
    }
    function renderCpBudgetSuggestions() {
        var sel = document.getElementById('cpType');
        var cont = document.getElementById('cpBudgetSuggestions');
        if (!cont) return;
        var t = (sel && sel.value) ? sel.value : '';
        var budgets = t && CP_BUDGET_BY_TYPE[t] ? [CP_BUDGET_BY_TYPE[t]] : ['1.5', '2.5', '5', '10'];
        cont.innerHTML = budgets.map(function(b){ return '<span class="cc-suggestion-chip" onclick="document.getElementById(\'cpBudget\').value=\''+b+'\'">'+b+' M€</span>'; }).join('');
    }
    function renderBatNomSuggestions() {
        var sel = document.getElementById('batType');
        var cont = document.getElementById('batNomSuggestions');
        if (!cont) return;
        var t = (sel && sel.value) ? sel.value : 'ecole';
        var names = BAT_NAME_BY_TYPE[t] ? [BAT_NAME_BY_TYPE[t]] : ['École', 'Gymnase', 'Mairie', 'Salle polyvalente'];
        cont.innerHTML = names.map(function(n){ return '<span class="cc-suggestion-chip" onclick="document.getElementById(\'batNom\').value=\''+n.replace(/'/g,"\\'")+'\'">'+n+'</span>'; }).join('');
    }

    // Pré-remplissage depuis dernier projet/bâtiment
    function applyPrefillCreerProjet() {
        try {
            var last = localStorage.getItem('cc_last_projet');
            if (last) { var d = JSON.parse(last); if (d.type) { var el = document.getElementById('cpType'); if (el) el.value = d.type; } }
        } catch(e){}
        renderCpNameSuggestions();
        renderCpBudgetSuggestions();
    }
    function applyPrefillBatiment() {
        try {
            var last = localStorage.getItem('cc_last_batiment');
            if (last) { var d = JSON.parse(last); var z = document.getElementById('batZone'); var e = document.getElementById('batEnergie'); if (z && d.zone) z.value = d.zone; if (e && d.energie) e.value = d.energie; }
        } catch(e){}
        renderBatNomSuggestions();
    }
    function saveLastProjet(type) { try { localStorage.setItem('cc_last_projet', JSON.stringify({type: type||''})); } catch(e){} }
    function saveLastBatiment(zone, energie) { try { localStorage.setItem('cc_last_batiment', JSON.stringify({zone: zone||'', energie: energie||''})); } catch(e){} }

    // ========== 29-30. Validation classes ==========
    function setupValidationClasses() {
        ['cpName','mpName','batNom'].forEach(function(id){
            var el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', function(){ var v = (this.value||'').trim(); this.classList.remove('cc-valid','cc-invalid'); if (v.length>=2) this.classList.add('cc-valid'); else if (v.length>0) this.classList.add('cc-invalid'); });
        });
    }

    // ========== 46-50. Raccourcis clavier ==========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var fab = document.getElementById('ccFabMenu');
            if (fab && fab.classList.contains('open')) { fab.classList.remove('open'); return; }
            var openModal = document.querySelector('.modal-overlay.open');
            if (openModal && openModal.id) {
                if (openModal.id === 'climatModalOverlay' && typeof closeClimatModal === 'function') closeClimatModal();
                else if (typeof closeModal === 'function') closeModal(openModal.id);
            }
        }
        if (e.key === '?' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (typeof showContextualHelp === 'function') showContextualHelp();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            var search = document.getElementById('searchInput') || document.getElementById('projetsSearchInput') || document.querySelector('[placeholder*="echercher"]');
            if (search) { search.focus(); search.select(); }
        }
        var section = (document.querySelector('.section.active') || {}).id || '';
        if (e.key === 'n' && !e.target.matches('input, textarea')) {
            if (section === 'priv-projets' && typeof openCreerProjetModal === 'function') { e.preventDefault(); openCreerProjetModal(); }
        }
        if (e.key === 'b' && !e.target.matches('input, textarea')) {
            if (section === 'priv-patrimoine' && typeof openBatimentModal === 'function') { e.preventDefault(); openBatimentModal(); }
        }
    });

    // ========== 51. Toast amélioré ==========
    var _origShowToast = window.showToast;
    if (typeof _origShowToast === 'function') {
        window.showToast = function(message, type) {
            if (typeof message === 'object') {
                type = message.type || 'success';
                message = message.message || message.text || '';
            }
            return _origShowToast.call(this, message, type || 'success');
        };
    }

    // ========== 42. Aide contextuelle ==========
    window.showContextualHelp = function() {
        var section = (document.querySelector('.section.active') || {}).id || '';
        var helps = {
            'dashboard': 'Accueil : explorez les actions, accédez à votre collectivité ou essai rapide Lyon. Raccourcis : N (projet), B (bâtiment), Ctrl+K (recherche), ? (cette aide).',
            'priv-patrimoine': 'Patrimoine : gérez vos bâtiments (B pour ajouter), opportunités énergie.',
            'priv-projets': 'Projets : créez un projet (N), filtrez par statut.',
            'priv-collectivite': 'Ma Collectivité : KPIs et parcours recommandé.',
            'priv-administration': 'Administration : validations, catalogue, utilisateurs.',
            'validation-mensuelle': 'Validation mensuelle : signez la période.'
        };
        var msg = helps[section] || 'Raccourcis : N (nouveau projet), B (bâtiment), Ctrl+K (recherche), ? (aide).';
        if (typeof showToast === 'function') showToast(msg, 'info');
        else alert(msg);
    };

    // ========== 19-22. Action-card-primary, Essai rapide, Bienvenue ==========
    function initDashboard() {
        var accCard = document.querySelector('.action-card[onclick*="accederMonEspace"]');
        if (accCard && !accCard.classList.contains('action-card-primary')) accCard.classList.add('action-card-primary');
        /* Bloc Essai rapide sur dashboard : supprimé (bouton Essai rapide Lyon reste sur la page login) */
        var loginFooter = document.querySelector('.login-footer');
        if (loginFooter && !document.getElementById('loginKbdHints')) {
            var kbd = document.createElement('p');
            kbd.id = 'loginKbdHints';
            kbd.className = 'cc-kbd-hints';
            kbd.innerHTML = '<span class="cc-kbd"><kbd>Entrée</kbd></span> Valider · <span class="cc-kbd"><kbd>Tab</kbd></span> Navigation · <span class="cc-kbd"><kbd>?</kbd></span> Aide';
            kbd.style.cssText = 'font-size:0.75rem;color:var(--text-muted);margin-top:1rem;';
            loginFooter.appendChild(kbd);
        }
        if (!localStorage.getItem('cc_first_visit_done')) {
            var check = setInterval(function(){
                if (document.getElementById('private-zone') && document.getElementById('private-zone').style.display !== 'none') {
                    clearInterval(check);
                    localStorage.setItem('cc_first_visit_done', '1');
                    if (typeof showToast === 'function') showToast('Bienvenue dans votre espace privé ColConnect !', 'success');
                }
            }, 500);
            setTimeout(clearInterval, 10000, check);
        }
    }

    // Hooks pour pré-remplissage et suggestions
    function hookOpenCreerProjetModal() {
        var orig = window.openCreerProjetModal;
        if (typeof orig === 'function') {
            window.openCreerProjetModal = function() { orig(); setTimeout(applyPrefillCreerProjet, 50); };
        }
        var orig2 = window.openCreerProjetModalFromBatiment;
        if (typeof orig2 === 'function') {
            window.openCreerProjetModalFromBatiment = function() { orig2(); setTimeout(function(){ renderCpNameSuggestions(); renderCpBudgetSuggestions(); }, 50); };
        }
    }
    function hookOpenBatimentModal() {
        var orig = window.openBatimentModal;
        if (typeof orig === 'function') {
            window.openBatimentModal = function() { orig(); setTimeout(applyPrefillBatiment, 50); };
        }
    }
    function hookSubmitCreerProjet() {
        var orig = window.submitCreerProjet;
        if (typeof orig === 'function') {
            window.submitCreerProjet = function() {
                var t = (document.getElementById('cpType') || {}).value || '';
                var r = orig.apply(this, arguments);
                saveLastProjet(t);
                return r;
            };
        }
    }
    function hookSaveBatiment() {
        var orig = window.saveBatiment;
        if (typeof orig === 'function') {
            window.saveBatiment = function() {
                var z = (document.getElementById('batZone') || {}).value;
                var e = (document.getElementById('batEnergie') || {}).value;
                var r = orig.apply(this, arguments);
                saveLastBatiment(z, e);
                return r;
            };
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        initDashboard();
        hookOpenCreerProjetModal();
        hookOpenBatimentModal();
        hookSubmitCreerProjet();
        hookSaveBatiment();
        setupValidationClasses();
        var cpType = document.getElementById('cpType');
        if (cpType) cpType.addEventListener('change', function(){ renderCpNameSuggestions(); renderCpBudgetSuggestions(); });
        var batType = document.getElementById('batType');
        if (batType) batType.addEventListener('change', renderBatNomSuggestions);
    });
})();
