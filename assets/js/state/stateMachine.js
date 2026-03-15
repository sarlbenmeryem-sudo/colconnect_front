/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ColConnect — State Machine v1.0
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Machine d'états formelle du frontend ColConnect.
 *
 * Sources :
 *   - colconnect_frontend_state_machine.md (12 états, transitions, règles de sûreté)
 *   - frontend_navigation_contract.md (contrat retour, contexte d'ouverture)
 *   - frontend_security_matrix.md (visible/ouvrable/modifiable/signable × rôle)
 *   - frontend_debug_playbook.md (fonctions réelles existantes)
 *   - system_invariants.md (invariants multi-tenant)
 *
 * Garanties :
 *   ✓ Table exhaustive état courant → événement → prochain état
 *   ✓ Représentation formelle des événements (EVENTS enum)
 *   ✓ Garde détaillée par transition (guard functions)
 *   ✓ Mapping vers fonctions réelles du code (main.js)
 *   ✓ Définition canonique des side effects
 *   ✓ Schéma TypeScript / JSON complet
 *   ✓ Cas d'erreur / fallback complets
 *   ✓ Transitions décrites pour TOUS les 12 états
 *
 * Usage :
 *   const sm = ColConnectStateMachine.create();
 *   sm.send('NAVIGATE_COLLECTIVITE_HOME', { collectiviteId: 'lyon' });
 *   sm.subscribe(snapshot => console.log(snapshot.state, snapshot.context));
 */

(function (root) {
  "use strict";

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. SCHEMA — Types formels (commentaire TypeScript pour documentation)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * @typedef {'BOOT'|'LOGIN'|'DASHBOARD_GLOBAL'|'COLLECTIVITE_HOME'|'COLLECTIVITE_PROJETS'|'COLLECTIVITE_VALIDATION'|'COLLECTIVITE_PATRIMOINE'|'PROJET_DETAIL_COLLECTIVITE'|'BATIMENT_DETAIL_COLLECTIVITE'|'PROJECT_DRAWER_VALIDATION'|'GLOBAL_MAP'|'GLOBAL_SEARCH'|'PROJECT_DETAIL_GLOBAL'} State
   *
   * @typedef {'public'|'global'|'collectivite'} Shell
   *
   * @typedef {'collectivite_read'|'collectivite_edit'|'collectivite_sign'|'collectivite_admin'} Role
   *
   * @typedef {Object} AuthContext
   * @property {boolean}  isAuthenticated
   * @property {string|null} collectiviteId
   * @property {Role|null}   role
   * @property {string[]}    scopes
   *
   * @typedef {Object} MachineContext
   * @property {AuthContext}  auth
   * @property {Shell}        shell
   * @property {State}        currentView
   * @property {State|null}   previousView
   * @property {string|null}  currentCollectiviteId
   * @property {string|null}  currentProjectId
   * @property {string|null}  currentBatimentId
   * @property {string|null}  currentValidationId
   * @property {'collectivite'|'global'|'validation'|null} projectOpenContext
   * @property {'projets'|'validation'|'patrimoine'|'carte'|'search'|null} sourceView
   * @property {Object|null}  error
   *
   * @typedef {Object} TransitionDef
   * @property {State}                      target
   * @property {function(MachineContext,Object):boolean} guard
   * @property {string}                     guardDesc   — human-readable guard description
   * @property {function(MachineContext,Object):MachineContext} assign — context mutations
   * @property {function(MachineContext,Object):void}   effect — side effects (DOM, API, etc.)
   * @property {string}                     effectDesc  — human-readable effect description
   * @property {State}                      fallback    — state to go to if guard fails
   * @property {string}                     fallbackReason
   */

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. ENUMS — États, événements, shells, rôles
  // ═══════════════════════════════════════════════════════════════════════════

  /** Les 12 états + BOOT = 13 états formels */
  var STATES = Object.freeze({
    BOOT:                        "BOOT",                        // S0
    LOGIN:                       "LOGIN",                       // S1
    DASHBOARD_GLOBAL:            "DASHBOARD_GLOBAL",            // S2
    COLLECTIVITE_HOME:           "COLLECTIVITE_HOME",           // S3
    COLLECTIVITE_PROJETS:        "COLLECTIVITE_PROJETS",        // S4
    COLLECTIVITE_VALIDATION:     "COLLECTIVITE_VALIDATION",     // S5
    COLLECTIVITE_PATRIMOINE:     "COLLECTIVITE_PATRIMOINE",     // S6
    PROJET_DETAIL_COLLECTIVITE:  "PROJET_DETAIL_COLLECTIVITE",  // S7
    BATIMENT_DETAIL_COLLECTIVITE:"BATIMENT_DETAIL_COLLECTIVITE",// S8
    PROJECT_DRAWER_VALIDATION:   "PROJECT_DRAWER_VALIDATION",   // S9
    GLOBAL_MAP:                  "GLOBAL_MAP",                  // S10
    GLOBAL_SEARCH:               "GLOBAL_SEARCH",               // S11
    PROJECT_DETAIL_GLOBAL:       "PROJECT_DETAIL_GLOBAL"        // S12
  });

  /** Événements formels — chaque action utilisateur ou système est un événement nommé */
  var EVENTS = Object.freeze({
    // ── Système ──
    APP_LOADED:                  "APP_LOADED",                  // Boot terminé → Login
    LOGIN_SUCCESS:               "LOGIN_SUCCESS",               // Auth réussie → Dashboard
    LOGOUT:                      "LOGOUT",                      // Déconnexion → Login

    // ── Navigation globale ──
    NAVIGATE_COLLECTIVITE_HOME:  "NAVIGATE_COLLECTIVITE_HOME",  // Dashboard → Ma collectivité
    NAVIGATE_GLOBAL_MAP:         "NAVIGATE_GLOBAL_MAP",         // Dashboard → Carte globale
    NAVIGATE_GLOBAL_SEARCH:      "NAVIGATE_GLOBAL_SEARCH",      // Dashboard → Recherche globale
    NAVIGATE_DASHBOARD:          "NAVIGATE_DASHBOARD",          // Retour au dashboard depuis shell global

    // ── Navigation collectivité ──
    NAVIGATE_PROJETS:            "NAVIGATE_PROJETS",            // Home collectivité → Mes projets
    NAVIGATE_VALIDATION:         "NAVIGATE_VALIDATION",         // Home collectivité → Validation
    NAVIGATE_PATRIMOINE:         "NAVIGATE_PATRIMOINE",         // Home collectivité → Patrimoine
    NAVIGATE_COLLECTIVITE_BACK:  "NAVIGATE_COLLECTIVITE_BACK",  // Retour à Home collectivité

    // ── Ouverture fiches ──
    OPEN_PROJET_COLLECTIVITE:    "OPEN_PROJET_COLLECTIVITE",    // Ouvrir fiche projet (shell collectivité)
    OPEN_PROJET_GLOBAL:          "OPEN_PROJET_GLOBAL",          // Ouvrir fiche projet (shell global)
    OPEN_BATIMENT:               "OPEN_BATIMENT",               // Ouvrir fiche bâtiment
    OPEN_VALIDATION_DRAWER:      "OPEN_VALIDATION_DRAWER",      // Clic Voir dans validation → drawer
    OPEN_PROJET_FROM_DRAWER:     "OPEN_PROJET_FROM_DRAWER",     // Clic Corriger dans drawer → fiche projet

    // ── Retour ──
    BACK_FROM_PROJET:            "BACK_FROM_PROJET",            // Retour depuis fiche projet
    BACK_FROM_BATIMENT:          "BACK_FROM_BATIMENT",          // Retour depuis fiche bâtiment
    CLOSE_DRAWER:                "CLOSE_DRAWER",                // Fermer drawer validation

    // ── Tentatives interdites (pour logging/audit) ──
    ATTEMPT_OPEN_EXTERNAL_PROJET:"ATTEMPT_OPEN_EXTERNAL_PROJET",// Clic sur projet externe
    ATTEMPT_OPEN_EXTERNAL_BATIMENT:"ATTEMPT_OPEN_EXTERNAL_BATIMENT", // Clic sur bâtiment externe
  });

  var SHELLS = Object.freeze({
    PUBLIC:      "public",
    GLOBAL:      "global",
    COLLECTIVITE:"collectivite"
  });

  var ROLES = Object.freeze({
    READ:  "collectivite_read",
    EDIT:  "collectivite_edit",
    SIGN:  "collectivite_sign",
    ADMIN: "collectivite_admin"
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. JSON SCHEMA — Export format pour validation externe / CI
  // ═══════════════════════════════════════════════════════════════════════════

  var JSON_SCHEMA = Object.freeze({
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "ColConnectStateMachineContext",
    "type": "object",
    "required": ["auth", "shell", "currentView", "previousView", "currentCollectiviteId",
                 "currentProjectId", "currentBatimentId", "currentValidationId",
                 "projectOpenContext", "sourceView", "error"],
    "properties": {
      "auth": {
        "type": "object",
        "required": ["isAuthenticated", "collectiviteId", "role", "scopes"],
        "properties": {
          "isAuthenticated": { "type": "boolean" },
          "collectiviteId":  { "type": ["string", "null"] },
          "role":            { "enum": ["collectivite_read", "collectivite_edit", "collectivite_sign", "collectivite_admin", null] },
          "scopes":          { "type": "array", "items": { "type": "string" } }
        }
      },
      "shell":                  { "enum": ["public", "global", "collectivite"] },
      "currentView":            { "enum": Object.keys(STATES) },
      "previousView":           { "type": ["string", "null"] },
      "currentCollectiviteId":  { "type": ["string", "null"] },
      "currentProjectId":       { "type": ["string", "null"] },
      "currentBatimentId":      { "type": ["string", "null"] },
      "currentValidationId":    { "type": ["string", "null"] },
      "projectOpenContext":     { "enum": ["collectivite", "global", "validation", null] },
      "sourceView":             { "enum": ["projets", "validation", "patrimoine", "carte", "search", null] },
      "error":                  { "type": ["object", "null"] }
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. GUARDS — Fonctions de garde réutilisables
  // ═══════════════════════════════════════════════════════════════════════════

  var Guards = {
    /** Toujours autorisé */
    always: function () { return true; },

    /** L'utilisateur est authentifié */
    isAuthenticated: function (ctx) {
      return ctx.auth && ctx.auth.isAuthenticated === true;
    },

    /** L'utilisateur a un collectiviteId valide */
    hasCollectivite: function (ctx) {
      return Guards.isAuthenticated(ctx) && !!ctx.auth.collectiviteId;
    },

    /** Le projet demandé appartient à la collectivité de l'utilisateur */
    isOwnProject: function (ctx, evt) {
      if (!evt || !evt.collectiviteId) return true; // pas d'info → on laisse le backend décider
      return ctx.auth.collectiviteId === evt.collectiviteId;
    },

    /** Le bâtiment demandé appartient à la collectivité de l'utilisateur */
    isOwnBatiment: function (ctx, evt) {
      if (!evt || !evt.collectiviteId) return true;
      return ctx.auth.collectiviteId === evt.collectiviteId;
    },

    /** La collectivité demandée est bien celle de l'utilisateur */
    matchesUserCollectivite: function (ctx, evt) {
      if (!evt || !evt.collectiviteId) return false;
      return ctx.auth.collectiviteId === evt.collectiviteId;
    },

    /** L'utilisateur a le scope requis */
    hasScope: function (scope) {
      return function (ctx) {
        return ctx.auth && Array.isArray(ctx.auth.scopes) && ctx.auth.scopes.indexOf(scope) !== -1;
      };
    },

    /** L'utilisateur a un rôle >= au rôle requis */
    hasMinRole: function (minRole) {
      var hierarchy = ["collectivite_read", "collectivite_edit", "collectivite_sign", "collectivite_admin"];
      var minIdx = hierarchy.indexOf(minRole);
      return function (ctx) {
        if (!ctx.auth || !ctx.auth.role) return false;
        return hierarchy.indexOf(ctx.auth.role) >= minIdx;
      };
    },

    /** Garde composite : ET logique */
    and: function () {
      var guards = Array.prototype.slice.call(arguments);
      return function (ctx, evt) {
        for (var i = 0; i < guards.length; i++) {
          if (!guards[i](ctx, evt)) return false;
        }
        return true;
      };
    },

    /** Interdit systématiquement (pour les transitions explicitement bloquées) */
    never: function () { return false; },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. SIDE EFFECTS — Actions DOM/API (mapping vers main.js)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Chaque effet reçoit (context, event) et exécute des actions côté DOM/API.
   * Le mapping vers les fonctions réelles de main.js est documenté en commentaire.
   */
  var Effects = {
    /** Aucun effet */
    none: function () {},

    /** → main.js: navigateTo('dashboard') */
    renderDashboard: function (ctx) {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("dashboard");
    },

    /** → main.js: navigateTo('priv-collectivite') + chargement fiche collectivité */
    renderCollectiviteHome: function (ctx) {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("priv-collectivite");
    },

    /** → main.js: navigateTo('mes-projets') ou navigateTo('priv-projets') + loadPrivProjets() */
    renderProjets: function (ctx) {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("priv-projets");
      if (typeof loadPrivProjets === "function") setTimeout(loadPrivProjets, 50);
    },

    /** → main.js: navigateTo('validation-mensuelle') + recalculerValidationMensuelle() */
    renderValidation: function (ctx) {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("validation-mensuelle");
      if (typeof recalculerValidationMensuelle === "function") setTimeout(recalculerValidationMensuelle, 50);
    },

    /** → main.js: navigateTo('priv-patrimoine') + renderBatiments() */
    renderPatrimoine: function (ctx) {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("priv-patrimoine");
      if (typeof renderBatiments === "function") setTimeout(renderBatiments, 50);
    },

    /** → main.js: openProjetDetailFromDb(id) + populateProjectDetails() + navigateTo('detail') */
    renderProjetDetail: function (ctx, evt) {
      var id = (evt && evt.projectId) || ctx.currentProjectId;
      if (id && typeof __ccOpenProjetDetailFromDbInternal === "function") {
        __ccOpenProjetDetailFromDbInternal(id);
      } else if (typeof __ccNavigateInternal === "function") {
        __ccNavigateInternal("detail");
      }
    },

    /** → main.js: openProjetDetailFromDb(id) pour le contexte global */
    renderProjetDetailGlobal: function (ctx, evt) {
      var id = (evt && evt.projectId) || ctx.currentProjectId;
      if (id && typeof __ccOpenProjetDetailFromDbInternal === "function") {
        __ccOpenProjetDetailFromDbInternal(id);
      }
    },

    /** → main.js: navigateTo pour le bâtiment, rendu fiche bâtiment */
    renderBatimentDetail: function (ctx, evt) {
      var id = (evt && evt.batimentId) || ctx.currentBatimentId;
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("detail-batiment");
    },

    /** → main.js: voirValProject(id) → selectValProject(id) → openAnomaliesDrawer(id) */
    renderValidationDrawer: function (ctx, evt) {
      var id = (evt && evt.projectId) || ctx.currentProjectId;
      if (id && typeof __ccVoirValProjectInternal === "function") __ccVoirValProjectInternal(id);
    },

    /** → main.js: goToProjectFromDrawer() → closeAnomaliesDrawer() + openProjetDetailFromDb(id) */
    renderProjetFromDrawer: function (ctx, evt) {
      if (typeof __ccGoToProjectFromDrawerInternal === "function") {
        __ccGoToProjectFromDrawerInternal();
      }
    },

    /** → main.js: closeAnomaliesDrawer() */
    closeDrawer: function () {
      if (typeof __ccCloseAnomaliesDrawerInternal === "function") __ccCloseAnomaliesDrawerInternal();
    },

    /** → main.js: navigateTo('detail') + initMap() (carte globale) */
    renderGlobalMap: function () {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("detail");
      if (typeof initMap === "function") setTimeout(initMap, 100);
    },

    /** → main.js: navigateTo('search') + applySearchFilter() */
    renderGlobalSearch: function () {
      if (typeof __ccNavigateInternal === "function") __ccNavigateInternal("search");
      if (typeof window.applySearchFilter === "function") setTimeout(window.applySearchFilter, 50);
    },

    /** Log de tentative interdite (monitoring/audit) */
    logBlockedAttempt: function (ctx, evt) {
      console.warn("[ColConnect SM] Transition bloquée:", {
        event: evt && evt.type,
        currentState: ctx.currentView,
        reason: "Accès à une ressource externe interdit",
        projectId: evt && evt.projectId,
        collectiviteId: evt && evt.collectiviteId,
        userCollectivite: ctx.auth && ctx.auth.collectiviteId
      });
    },

    /** Afficher un toast d'erreur */
    showErrorToast: function (ctx, evt) {
      var msg = (evt && evt.errorMessage) || (ctx.error && ctx.error.message) || "Navigation impossible.";
      if (typeof showToast === "function") showToast(msg, "error");
    },
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. TRANSITION TABLE — Exhaustive : état × événement → transition
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Format de chaque entrée :
   * TRANSITIONS[STATE][EVENT] = {
   *   target:        State,                          — état cible
   *   guard:         function(ctx, evt) → boolean,   — condition d'autorisation
   *   guardDesc:     string,                         — description humaine de la garde
   *   assign:        function(ctx, evt) → newCtx,    — mutations du contexte
   *   effect:        function(ctx, evt) → void,      — side effects (DOM/API)
   *   effectDesc:    string,                         — description humaine de l'effet
   *   fallback:      State|null,                     — état fallback si garde échoue
   *   fallbackReason:string                          — raison du fallback
   * }
   *
   * Si un événement n'est pas listé pour un état, il est IGNORÉ (pas de transition).
   */
  var TRANSITIONS = {};

  // ── Helper pour définir une transition ──
  function T(target, guard, guardDesc, assign, effect, effectDesc, fallback, fallbackReason) {
    return {
      target:         target,
      guard:          guard         || Guards.always,
      guardDesc:      guardDesc     || "Aucune condition",
      assign:         assign        || function (ctx) { return ctx; },
      effect:         effect        || Effects.none,
      effectDesc:     effectDesc    || "Aucun effet",
      fallback:       fallback      || null,
      fallbackReason: fallbackReason|| ""
    };
  }

  // ────────────────────────────────────────────────────────────────────────
  // S0 — BOOT
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.BOOT] = {};

  TRANSITIONS[STATES.BOOT][EVENTS.APP_LOADED] = T(
    STATES.LOGIN,
    Guards.always,
    "Toujours autorisé — l'app est chargée",
    function (ctx) {
      return Object.assign({}, ctx, { shell: SHELLS.PUBLIC });
    },
    Effects.none,
    "Afficher l'écran de connexion",
    null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S1 — LOGIN
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.LOGIN] = {};

  TRANSITIONS[STATES.LOGIN][EVENTS.LOGIN_SUCCESS] = T(
    STATES.DASHBOARD_GLOBAL,
    function (ctx, evt) {
      return evt && evt.token && evt.collectiviteId && evt.role;
    },
    "Le payload LOGIN_SUCCESS doit contenir token, collectiviteId, role",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        auth: {
          isAuthenticated: true,
          collectiviteId: evt.collectiviteId,
          role: evt.role,
          scopes: evt.scopes || []
        },
        shell: SHELLS.GLOBAL,
        currentCollectiviteId: null,
        currentProjectId: null,
        error: null
      });
    },
    Effects.renderDashboard,
    "Stocker auth, passer en shell global, afficher dashboard",
    STATES.LOGIN,
    "Payload d'authentification incomplet — rester sur LOGIN"
  );

  // ────────────────────────────────────────────────────────────────────────
  // S2 — DASHBOARD_GLOBAL
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.DASHBOARD_GLOBAL] = {};

  TRANSITIONS[STATES.DASHBOARD_GLOBAL][EVENTS.NAVIGATE_COLLECTIVITE_HOME] = T(
    STATES.COLLECTIVITE_HOME,
    Guards.and(Guards.isAuthenticated, Guards.hasCollectivite),
    "Utilisateur authentifié avec une collectivité assignée",
    function (ctx, evt) {
      var cid = (evt && evt.collectiviteId) || ctx.auth.collectiviteId;
      return Object.assign({}, ctx, {
        shell: SHELLS.COLLECTIVITE,
        currentCollectiviteId: cid,
        previousView: STATES.DASHBOARD_GLOBAL
      });
    },
    Effects.renderCollectiviteHome,
    "Passer en shell collectivité, charger fiche collectivité",
    STATES.DASHBOARD_GLOBAL,
    "Utilisateur non authentifié ou sans collectivité"
  );

  TRANSITIONS[STATES.DASHBOARD_GLOBAL][EVENTS.NAVIGATE_GLOBAL_MAP] = T(
    STATES.GLOBAL_MAP,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, {
        shell: SHELLS.GLOBAL,
        previousView: STATES.DASHBOARD_GLOBAL
      });
    },
    Effects.renderGlobalMap,
    "Afficher la carte globale avec tous les projets visibles",
    null, ""
  );

  TRANSITIONS[STATES.DASHBOARD_GLOBAL][EVENTS.NAVIGATE_GLOBAL_SEARCH] = T(
    STATES.GLOBAL_SEARCH,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, {
        shell: SHELLS.GLOBAL,
        previousView: STATES.DASHBOARD_GLOBAL
      });
    },
    Effects.renderGlobalSearch,
    "Afficher la recherche globale",
    null, ""
  );

  TRANSITIONS[STATES.DASHBOARD_GLOBAL][EVENTS.LOGOUT] = T(
    STATES.LOGIN,
    Guards.always,
    "Toujours autorisé",
    function (ctx) {
      return _resetContext();
    },
    Effects.none,
    "Réinitialiser contexte, afficher LOGIN",
    null, ""
  );

  TRANSITIONS[STATES.DASHBOARD_GLOBAL][EVENTS.ATTEMPT_OPEN_EXTERNAL_PROJET] = T(
    STATES.DASHBOARD_GLOBAL,
    Guards.never,
    "INTERDIT — un projet externe ne peut jamais être ouvert depuis le dashboard",
    null,
    Effects.logBlockedAttempt,
    "Logger la tentative, afficher toast erreur, rester sur DASHBOARD",
    STATES.DASHBOARD_GLOBAL,
    "Règle de sûreté #4 : clic sur carte projet externe neutralisé"
  );

  // ────────────────────────────────────────────────────────────────────────
  // S3 — COLLECTIVITE_HOME
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.COLLECTIVITE_HOME] = {};

  TRANSITIONS[STATES.COLLECTIVITE_HOME][EVENTS.NAVIGATE_PROJETS] = T(
    STATES.COLLECTIVITE_PROJETS,
    Guards.and(Guards.isAuthenticated, Guards.hasCollectivite),
    "Utilisateur authentifié dans sa collectivité",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_HOME });
    },
    Effects.renderProjets,
    "Charger et afficher la liste des projets de la collectivité",
    STATES.COLLECTIVITE_HOME,
    "Auth invalide"
  );

  TRANSITIONS[STATES.COLLECTIVITE_HOME][EVENTS.NAVIGATE_VALIDATION] = T(
    STATES.COLLECTIVITE_VALIDATION,
    Guards.and(Guards.isAuthenticated, Guards.hasCollectivite),
    "Utilisateur authentifié dans sa collectivité",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_HOME });
    },
    Effects.renderValidation,
    "Charger et afficher la validation mensuelle",
    STATES.COLLECTIVITE_HOME,
    "Auth invalide"
  );

  TRANSITIONS[STATES.COLLECTIVITE_HOME][EVENTS.NAVIGATE_PATRIMOINE] = T(
    STATES.COLLECTIVITE_PATRIMOINE,
    Guards.and(Guards.isAuthenticated, Guards.hasCollectivite),
    "Utilisateur authentifié dans sa collectivité",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_HOME });
    },
    Effects.renderPatrimoine,
    "Charger et afficher le patrimoine bâti",
    STATES.COLLECTIVITE_HOME,
    "Auth invalide"
  );

  TRANSITIONS[STATES.COLLECTIVITE_HOME][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.DASHBOARD_GLOBAL,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, {
        shell: SHELLS.GLOBAL,
        currentCollectiviteId: null,
        previousView: STATES.COLLECTIVITE_HOME
      });
    },
    Effects.renderDashboard,
    "Quitter le shell collectivité, revenir au dashboard global",
    null, ""
  );

  TRANSITIONS[STATES.COLLECTIVITE_HOME][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S4 — COLLECTIVITE_PROJETS
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.COLLECTIVITE_PROJETS] = {};

  TRANSITIONS[STATES.COLLECTIVITE_PROJETS][EVENTS.OPEN_PROJET_COLLECTIVITE] = T(
    STATES.PROJET_DETAIL_COLLECTIVITE,
    Guards.and(Guards.isAuthenticated, Guards.isOwnProject),
    "Utilisateur authentifié + projet appartient à sa collectivité",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        currentProjectId: evt.projectId,
        projectOpenContext: "collectivite",
        sourceView: "projets",
        previousView: STATES.COLLECTIVITE_PROJETS
      });
    },
    Effects.renderProjetDetail,
    "Ouvrir fiche projet dans shell collectivité (openProjetDetailFromDb)",
    STATES.COLLECTIVITE_PROJETS,
    "Projet n'appartient pas à la collectivité de l'utilisateur"
  );

  TRANSITIONS[STATES.COLLECTIVITE_PROJETS][EVENTS.ATTEMPT_OPEN_EXTERNAL_PROJET] = T(
    STATES.COLLECTIVITE_PROJETS,
    Guards.never,
    "INTERDIT — projet externe non ouvrable depuis Mes Projets",
    null,
    Effects.logBlockedAttempt,
    "Logger tentative + toast, rester sur COLLECTIVITE_PROJETS",
    STATES.COLLECTIVITE_PROJETS,
    "Règle de sûreté #4/#5 : projet externe = visible mais non ouvrable"
  );

  TRANSITIONS[STATES.COLLECTIVITE_PROJETS][EVENTS.NAVIGATE_COLLECTIVITE_BACK] = T(
    STATES.COLLECTIVITE_HOME,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_PROJETS });
    },
    Effects.renderCollectiviteHome,
    "Retour à Home collectivité",
    null, ""
  );

  TRANSITIONS[STATES.COLLECTIVITE_PROJETS][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S5 — COLLECTIVITE_VALIDATION
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.COLLECTIVITE_VALIDATION] = {};

  TRANSITIONS[STATES.COLLECTIVITE_VALIDATION][EVENTS.OPEN_VALIDATION_DRAWER] = T(
    STATES.PROJECT_DRAWER_VALIDATION,
    Guards.and(Guards.isAuthenticated, Guards.isOwnProject),
    "Utilisateur authentifié + projet appartient à sa collectivité",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        currentProjectId: evt.projectId,
        currentValidationId: evt.validationId || null,
        projectOpenContext: "validation",
        sourceView: "validation",
        previousView: STATES.COLLECTIVITE_VALIDATION
      });
    },
    Effects.renderValidationDrawer,
    "Ouvrir le drawer d'anomalies (voirValProject → openAnomaliesDrawer)",
    STATES.COLLECTIVITE_VALIDATION,
    "Projet non accessible"
  );

  TRANSITIONS[STATES.COLLECTIVITE_VALIDATION][EVENTS.NAVIGATE_COLLECTIVITE_BACK] = T(
    STATES.COLLECTIVITE_HOME,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_VALIDATION });
    },
    Effects.renderCollectiviteHome,
    "Retour à Home collectivité",
    null, ""
  );

  // TRANSITION INTERDITE : Validation → Dashboard Global
  TRANSITIONS[STATES.COLLECTIVITE_VALIDATION][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.COLLECTIVITE_VALIDATION,
    Guards.never,
    "INTERDIT — la Validation ne peut pas naviguer directement vers le Dashboard Global",
    null,
    function (ctx, evt) {
      Effects.logBlockedAttempt(ctx, evt);
      Effects.showErrorToast(ctx, { errorMessage: "Retournez d'abord à l'accueil collectivité." });
    },
    "Logger + toast : passage par Home collectivité obligatoire",
    STATES.COLLECTIVITE_VALIDATION,
    "Règle de sûreté : VALIDATION → DASHBOARD_GLOBAL interdit (doc state machine)"
  );

  TRANSITIONS[STATES.COLLECTIVITE_VALIDATION][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S6 — COLLECTIVITE_PATRIMOINE
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.COLLECTIVITE_PATRIMOINE] = {};

  TRANSITIONS[STATES.COLLECTIVITE_PATRIMOINE][EVENTS.OPEN_BATIMENT] = T(
    STATES.BATIMENT_DETAIL_COLLECTIVITE,
    Guards.and(Guards.isAuthenticated, Guards.isOwnBatiment),
    "Utilisateur authentifié + bâtiment appartient à sa collectivité",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        currentBatimentId: evt.batimentId,
        previousView: STATES.COLLECTIVITE_PATRIMOINE
      });
    },
    Effects.renderBatimentDetail,
    "Ouvrir fiche bâtiment dans shell collectivité",
    STATES.COLLECTIVITE_PATRIMOINE,
    "Bâtiment n'appartient pas à la collectivité"
  );

  TRANSITIONS[STATES.COLLECTIVITE_PATRIMOINE][EVENTS.ATTEMPT_OPEN_EXTERNAL_BATIMENT] = T(
    STATES.COLLECTIVITE_PATRIMOINE,
    Guards.never,
    "INTERDIT — bâtiment externe non ouvrable",
    null,
    Effects.logBlockedAttempt,
    "Logger tentative, rester sur PATRIMOINE",
    STATES.COLLECTIVITE_PATRIMOINE,
    "Règle de sûreté : bâtiment externe → détail interdit"
  );

  TRANSITIONS[STATES.COLLECTIVITE_PATRIMOINE][EVENTS.NAVIGATE_COLLECTIVITE_BACK] = T(
    STATES.COLLECTIVITE_HOME,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.COLLECTIVITE_PATRIMOINE });
    },
    Effects.renderCollectiviteHome,
    "Retour à Home collectivité",
    null, ""
  );

  TRANSITIONS[STATES.COLLECTIVITE_PATRIMOINE][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S7 — PROJET_DETAIL_COLLECTIVITE
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.PROJET_DETAIL_COLLECTIVITE] = {};

  TRANSITIONS[STATES.PROJET_DETAIL_COLLECTIVITE][EVENTS.BACK_FROM_PROJET] = T(
    null, // target dynamique
    Guards.isAuthenticated,
    "Utilisateur authentifié — le retour dépend de projectOpenContext + sourceView",
    function (ctx) {
      // Le retour est contextuel
      var target;
      if (ctx.sourceView === "validation") {
        target = STATES.COLLECTIVITE_VALIDATION;
      } else if (ctx.sourceView === "patrimoine") {
        target = STATES.COLLECTIVITE_PATRIMOINE;
      } else {
        target = STATES.COLLECTIVITE_PROJETS;
      }
      return Object.assign({}, ctx, {
        currentProjectId: null,
        projectOpenContext: null,
        sourceView: null,
        previousView: STATES.PROJET_DETAIL_COLLECTIVITE,
        // NB: _dynamicTarget utilisé par le moteur pour résoudre le target
        _dynamicTarget: target
      });
    },
    function (ctx) {
      // Routing vers le bon rendu selon sourceView
      if (ctx.sourceView === "validation") {
        Effects.renderValidation(ctx);
      } else if (ctx.sourceView === "patrimoine") {
        Effects.renderPatrimoine(ctx);
      } else {
        Effects.renderProjets(ctx);
      }
    },
    "Retour contextuel : validation → renderValidation, patrimoine → renderPatrimoine, sinon → renderProjets",
    STATES.COLLECTIVITE_PROJETS,
    "Fallback vers Mes Projets si le contexte de retour est ambigu"
  );

  // TRANSITION INTERDITE : Fiche projet collectivité → shell global
  TRANSITIONS[STATES.PROJET_DETAIL_COLLECTIVITE][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.PROJET_DETAIL_COLLECTIVITE,
    Guards.never,
    "INTERDIT — une fiche projet privée ne doit jamais basculer vers le shell global",
    null,
    function (ctx, evt) {
      Effects.logBlockedAttempt(ctx, evt);
      Effects.showErrorToast(ctx, { errorMessage: "Utilisez le bouton retour pour quitter cette fiche." });
    },
    "Règle de sûreté #1 : fiche projet privée ne passe jamais en shell global",
    STATES.PROJET_DETAIL_COLLECTIVITE,
    "Invariant de shell : collectivite → collectivite"
  );

  TRANSITIONS[STATES.PROJET_DETAIL_COLLECTIVITE][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S8 — BATIMENT_DETAIL_COLLECTIVITE
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.BATIMENT_DETAIL_COLLECTIVITE] = {};

  TRANSITIONS[STATES.BATIMENT_DETAIL_COLLECTIVITE][EVENTS.BACK_FROM_BATIMENT] = T(
    STATES.COLLECTIVITE_PATRIMOINE,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, {
        currentBatimentId: null,
        previousView: STATES.BATIMENT_DETAIL_COLLECTIVITE
      });
    },
    Effects.renderPatrimoine,
    "Retour vers la liste patrimoine",
    STATES.COLLECTIVITE_HOME,
    "Fallback vers Home collectivité"
  );

  TRANSITIONS[STATES.BATIMENT_DETAIL_COLLECTIVITE][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S9 — PROJECT_DRAWER_VALIDATION
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.PROJECT_DRAWER_VALIDATION] = {};

  TRANSITIONS[STATES.PROJECT_DRAWER_VALIDATION][EVENTS.OPEN_PROJET_FROM_DRAWER] = T(
    STATES.PROJET_DETAIL_COLLECTIVITE,
    Guards.and(Guards.isAuthenticated, Guards.hasMinRole(ROLES.EDIT)),
    "Utilisateur authentifié + rôle >= collectivite_edit (bouton Corriger = rôle requis)",
    function (ctx) {
      return Object.assign({}, ctx, {
        // Le projectOpenContext reste "validation" pour le retour
        // Le shell reste "collectivite" — JAMAIS global
        shell: SHELLS.COLLECTIVITE,
        sourceView: "validation",
        previousView: STATES.PROJECT_DRAWER_VALIDATION
      });
    },
    Effects.renderProjetFromDrawer,
    "Fermer drawer + ouvrir fiche projet dans shell collectivité (Corriger)",
    STATES.PROJECT_DRAWER_VALIDATION,
    "Rôle insuffisant (collectivite_read ne peut pas corriger)"
  );

  // TRANSITION INTERDITE : Drawer → Dashboard Global
  TRANSITIONS[STATES.PROJECT_DRAWER_VALIDATION][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.PROJECT_DRAWER_VALIDATION,
    Guards.never,
    "INTERDIT — le drawer ne peut pas naviguer vers le dashboard global",
    null,
    function (ctx, evt) {
      Effects.logBlockedAttempt(ctx, evt);
      Effects.showErrorToast(ctx, { errorMessage: "Fermez le panneau, puis revenez à l'accueil." });
    },
    "Règle de sûreté #2/#3 : Drawer → Dashboard interdit",
    STATES.PROJECT_DRAWER_VALIDATION,
    "Le bouton Corriger ouvre la fiche avec shell=collectivite, pas le dashboard"
  );

  TRANSITIONS[STATES.PROJECT_DRAWER_VALIDATION][EVENTS.CLOSE_DRAWER] = T(
    STATES.COLLECTIVITE_VALIDATION,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, {
        currentProjectId: null,
        currentValidationId: null,
        projectOpenContext: null,
        previousView: STATES.PROJECT_DRAWER_VALIDATION
      });
    },
    Effects.closeDrawer,
    "Fermer le drawer, retour à la liste de validation",
    null, ""
  );

  TRANSITIONS[STATES.PROJECT_DRAWER_VALIDATION][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S10 — GLOBAL_MAP
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.GLOBAL_MAP] = {};

  TRANSITIONS[STATES.GLOBAL_MAP][EVENTS.OPEN_PROJET_GLOBAL] = T(
    STATES.PROJECT_DETAIL_GLOBAL,
    Guards.and(Guards.isAuthenticated, Guards.isOwnProject),
    "Utilisateur authentifié + projet appartient à sa collectivité (les projets externes sont visibles mais non ouvrables)",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        currentProjectId: evt.projectId,
        projectOpenContext: "global",
        sourceView: "carte",
        previousView: STATES.GLOBAL_MAP
      });
    },
    Effects.renderProjetDetailGlobal,
    "Ouvrir fiche projet dans shell global (depuis carte)",
    STATES.GLOBAL_MAP,
    "Le projet est externe — pas d'ouverture (garde isOwnProject)"
  );

  TRANSITIONS[STATES.GLOBAL_MAP][EVENTS.ATTEMPT_OPEN_EXTERNAL_PROJET] = T(
    STATES.GLOBAL_MAP,
    Guards.never,
    "INTERDIT — projet externe non ouvrable depuis la carte",
    null,
    Effects.logBlockedAttempt,
    "Logger tentative + rester sur GLOBAL_MAP",
    STATES.GLOBAL_MAP,
    "Règle de sûreté #4 : clic sur carte projet externe neutralisé"
  );

  TRANSITIONS[STATES.GLOBAL_MAP][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.DASHBOARD_GLOBAL,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.GLOBAL_MAP });
    },
    Effects.renderDashboard,
    "Retour au dashboard global",
    null, ""
  );

  TRANSITIONS[STATES.GLOBAL_MAP][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S11 — GLOBAL_SEARCH
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.GLOBAL_SEARCH] = {};

  TRANSITIONS[STATES.GLOBAL_SEARCH][EVENTS.OPEN_PROJET_GLOBAL] = T(
    STATES.PROJECT_DETAIL_GLOBAL,
    Guards.and(Guards.isAuthenticated, Guards.isOwnProject),
    "Utilisateur authentifié + projet appartient à sa collectivité",
    function (ctx, evt) {
      return Object.assign({}, ctx, {
        currentProjectId: evt.projectId,
        projectOpenContext: "global",
        sourceView: "search",
        previousView: STATES.GLOBAL_SEARCH
      });
    },
    Effects.renderProjetDetailGlobal,
    "Ouvrir fiche projet (depuis recherche)",
    STATES.GLOBAL_SEARCH,
    "Projet externe — non ouvrable (garde isOwnProject)"
  );

  TRANSITIONS[STATES.GLOBAL_SEARCH][EVENTS.ATTEMPT_OPEN_EXTERNAL_PROJET] = T(
    STATES.GLOBAL_SEARCH,
    Guards.never,
    "INTERDIT — résultat externe non ouvrable",
    null,
    Effects.logBlockedAttempt,
    "Logger tentative + rester sur GLOBAL_SEARCH",
    STATES.GLOBAL_SEARCH,
    "Règle de sûreté #5 : clic sur résultat externe neutralisé"
  );

  TRANSITIONS[STATES.GLOBAL_SEARCH][EVENTS.NAVIGATE_DASHBOARD] = T(
    STATES.DASHBOARD_GLOBAL,
    Guards.isAuthenticated,
    "Utilisateur authentifié",
    function (ctx) {
      return Object.assign({}, ctx, { previousView: STATES.GLOBAL_SEARCH });
    },
    Effects.renderDashboard,
    "Retour au dashboard global",
    null, ""
  );

  TRANSITIONS[STATES.GLOBAL_SEARCH][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ────────────────────────────────────────────────────────────────────────
  // S12 — PROJECT_DETAIL_GLOBAL
  // ────────────────────────────────────────────────────────────────────────
  TRANSITIONS[STATES.PROJECT_DETAIL_GLOBAL] = {};

  TRANSITIONS[STATES.PROJECT_DETAIL_GLOBAL][EVENTS.BACK_FROM_PROJET] = T(
    null, // dynamique
    Guards.isAuthenticated,
    "Utilisateur authentifié — retour contextuel selon sourceView",
    function (ctx) {
      var target;
      if (ctx.sourceView === "carte") {
        target = STATES.GLOBAL_MAP;
      } else if (ctx.sourceView === "search") {
        target = STATES.GLOBAL_SEARCH;
      } else {
        target = STATES.DASHBOARD_GLOBAL;
      }
      return Object.assign({}, ctx, {
        currentProjectId: null,
        projectOpenContext: null,
        sourceView: null,
        previousView: STATES.PROJECT_DETAIL_GLOBAL,
        _dynamicTarget: target
      });
    },
    function (ctx) {
      if (ctx.sourceView === "carte") {
        Effects.renderGlobalMap(ctx);
      } else if (ctx.sourceView === "search") {
        Effects.renderGlobalSearch(ctx);
      } else {
        Effects.renderDashboard(ctx);
      }
    },
    "Retour contextuel : carte → GLOBAL_MAP, search → GLOBAL_SEARCH, sinon → DASHBOARD",
    STATES.DASHBOARD_GLOBAL,
    "Fallback vers Dashboard si contexte ambigu"
  );

  TRANSITIONS[STATES.PROJECT_DETAIL_GLOBAL][EVENTS.LOGOUT] = T(
    STATES.LOGIN, Guards.always, "Toujours autorisé",
    function () { return _resetContext(); },
    Effects.none, "Réinitialiser contexte", null, ""
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. MOTEUR — Exécution des transitions
  // ═══════════════════════════════════════════════════════════════════════════

  /** Contexte initial (BOOT) */
  function _resetContext() {
    return {
      auth: {
        isAuthenticated: false,
        collectiviteId: null,
        role: null,
        scopes: []
      },
      shell: SHELLS.PUBLIC,
      currentView: STATES.BOOT,
      previousView: null,
      currentCollectiviteId: null,
      currentProjectId: null,
      currentBatimentId: null,
      currentValidationId: null,
      projectOpenContext: null,
      sourceView: null,
      error: null
    };
  }

  function _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Crée une instance de machine d'états.
   * @returns {Object} Machine avec send(), getSnapshot(), subscribe(), getTransitionTable()
   */
  function create() {
    var _context = _resetContext();
    var _state = STATES.BOOT;
    var _subscribers = [];
    var _history = [];

    function _notify() {
      var snapshot = { state: _state, context: _deepClone(_context), history: _history.slice(-20) };
      for (var i = 0; i < _subscribers.length; i++) {
        try { _subscribers[i](snapshot); } catch (e) { console.error("[SM] Subscriber error:", e); }
      }
    }

    /**
     * Envoie un événement à la machine.
     * @param {string} eventType — nom de l'événement (EVENTS.*)
     * @param {Object} [payload] — données associées à l'événement
     * @returns {{ success: boolean, from: string, to: string, event: string, reason?: string }}
     */
    function send(eventType, payload) {
      var evt = Object.assign({ type: eventType }, payload || {});
      var from = _state;

      // Vérifier que l'état courant a des transitions définies
      var stateTransitions = TRANSITIONS[_state];
      if (!stateTransitions) {
        var errNoState = {
          success: false, from: from, to: from, event: eventType,
          reason: "Aucune transition définie pour l'état " + _state
        };
        _logHistory(from, from, eventType, "IGNORED_NO_TRANSITIONS");
        return errNoState;
      }

      // Vérifier que l'événement est défini pour cet état
      var transition = stateTransitions[eventType];
      if (!transition) {
        var errNoEvent = {
          success: false, from: from, to: from, event: eventType,
          reason: "Événement " + eventType + " non géré dans l'état " + _state
        };
        _logHistory(from, from, eventType, "IGNORED_NO_HANDLER");
        return errNoEvent;
      }

      // Évaluer la garde
      var guardResult = false;
      try {
        guardResult = transition.guard(_context, evt);
      } catch (guardError) {
        console.error("[SM] Guard error:", guardError);
        guardResult = false;
      }

      if (!guardResult) {
        // Garde échouée → fallback ou rester sur place
        var fallbackState = transition.fallback || _state;
        var reason = transition.fallbackReason || ("Garde échouée: " + transition.guardDesc);

        // Exécuter l'effet même en fallback (ex: logBlockedAttempt)
        try { transition.effect(_context, evt); } catch (e) { console.error("[SM] Fallback effect error:", e); }

        _context.error = { event: eventType, reason: reason, timestamp: new Date().toISOString() };
        _state = fallbackState;
        _context.currentView = _state;
        _logHistory(from, fallbackState, eventType, "GUARD_FAILED: " + reason);
        _notify();

        return {
          success: false, from: from, to: fallbackState, event: eventType, reason: reason
        };
      }

      // Garde OK → appliquer assign, résoudre target, exécuter effect
      var prevContext = _deepClone(_context);
      try {
        _context = transition.assign(_context, evt);
      } catch (assignError) {
        console.error("[SM] Assign error:", assignError);
        _context = prevContext;
        _context.error = { event: eventType, reason: "Erreur d'assignation: " + assignError.message, timestamp: new Date().toISOString() };
        _logHistory(from, from, eventType, "ASSIGN_ERROR");
        _notify();
        return { success: false, from: from, to: from, event: eventType, reason: "Assign error" };
      }

      // Résoudre le target (dynamique si _dynamicTarget est présent)
      var resolvedTarget = _context._dynamicTarget || transition.target || _state;
      delete _context._dynamicTarget;

      _state = resolvedTarget;
      _context.currentView = _state;
      _context.error = null;

      // Exécuter le side effect
      try {
        transition.effect(_context, evt);
      } catch (effectError) {
        console.error("[SM] Effect error:", effectError);
        // L'état a quand même changé — on ne rollback pas l'état pour un effet secondaire
      }

      _logHistory(from, _state, eventType, "OK");
      _notify();

      return { success: true, from: from, to: _state, event: eventType };
    }

    function _logHistory(from, to, event, status) {
      _history.push({
        from: from,
        to: to,
        event: event,
        status: status,
        timestamp: new Date().toISOString()
      });
      // Garder les 100 dernières transitions max
      if (_history.length > 100) _history.shift();
    }

    /** Retourne un snapshot immutable de l'état courant */
    function getSnapshot() {
      return { state: _state, context: _deepClone(_context), history: _history.slice(-20) };
    }

    /** S'abonne aux changements d'état */
    function subscribe(fn) {
      _subscribers.push(fn);
      // Retourne une fonction de désabonnement
      return function unsubscribe() {
        _subscribers = _subscribers.filter(function (s) { return s !== fn; });
      };
    }

    /** Exporte la table de transitions complète (pour debug/audit) */
    function getTransitionTable() {
      var table = [];
      var stateKeys = Object.keys(TRANSITIONS);
      for (var si = 0; si < stateKeys.length; si++) {
        var state = stateKeys[si];
        var events = Object.keys(TRANSITIONS[state]);
        for (var ei = 0; ei < events.length; ei++) {
          var event = events[ei];
          var t = TRANSITIONS[state][event];
          table.push({
            from:          state,
            event:         event,
            to:            t.target || "(dynamique)",
            guard:         t.guardDesc,
            effect:        t.effectDesc,
            fallback:      t.fallback || "(rester sur place)",
            fallbackReason:t.fallbackReason || ""
          });
        }
      }
      return table;
    }

    /** Exporte la table en format CSV (pour intégration CI/doc) */
    function exportCSV() {
      var rows = getTransitionTable();
      var header = "from;event;to;guard;effect;fallback;fallbackReason";
      var lines = [header];
      for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        lines.push([r.from, r.event, r.to, r.guard, r.effect, r.fallback, r.fallbackReason].join(";"));
      }
      return lines.join("\n");
    }

    /** Vérifie les invariants système */
    function checkInvariants() {
      var violations = [];

      // Invariant 1: shell cohérent avec l'état
      var collectiviteStates = [
        STATES.COLLECTIVITE_HOME, STATES.COLLECTIVITE_PROJETS, STATES.COLLECTIVITE_VALIDATION,
        STATES.COLLECTIVITE_PATRIMOINE, STATES.PROJET_DETAIL_COLLECTIVITE,
        STATES.BATIMENT_DETAIL_COLLECTIVITE, STATES.PROJECT_DRAWER_VALIDATION
      ];
      if (collectiviteStates.indexOf(_state) !== -1 && _context.shell !== SHELLS.COLLECTIVITE) {
        violations.push("SHELL_MISMATCH: état " + _state + " devrait être en shell collectivite, trouvé: " + _context.shell);
      }

      var globalStates = [STATES.DASHBOARD_GLOBAL, STATES.GLOBAL_MAP, STATES.GLOBAL_SEARCH, STATES.PROJECT_DETAIL_GLOBAL];
      if (globalStates.indexOf(_state) !== -1 && _context.shell !== SHELLS.GLOBAL) {
        violations.push("SHELL_MISMATCH: état " + _state + " devrait être en shell global, trouvé: " + _context.shell);
      }

      // Invariant 2: collectiviteId cohérent en shell collectivité
      if (_context.shell === SHELLS.COLLECTIVITE && !_context.auth.collectiviteId) {
        violations.push("NO_COLLECTIVITE_IN_SHELL: en shell collectivité sans auth.collectiviteId");
      }

      // Invariant 3: un projectId doit être défini sur les états détail
      if ((_state === STATES.PROJET_DETAIL_COLLECTIVITE || _state === STATES.PROJECT_DETAIL_GLOBAL) && !_context.currentProjectId) {
        violations.push("NO_PROJECT_ID: en état détail projet sans currentProjectId");
      }

      return { valid: violations.length === 0, violations: violations };
    }

    return {
      send:              send,
      getSnapshot:       getSnapshot,
      subscribe:         subscribe,
      getTransitionTable:getTransitionTable,
      exportCSV:         exportCSV,
      checkInvariants:   checkInvariants,

      // Accès direct aux constantes pour le code consommateur
      STATES:  STATES,
      EVENTS:  EVENTS,
      SHELLS:  SHELLS,
      ROLES:   ROLES,
      GUARDS:  Guards,
      SCHEMA:  JSON_SCHEMA
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. EXPORT
  // ═══════════════════════════════════════════════════════════════════════════

  var ColConnectStateMachine = {
    create:      create,
    STATES:      STATES,
    EVENTS:      EVENTS,
    SHELLS:      SHELLS,
    ROLES:       ROLES,
    GUARDS:      Guards,
    EFFECTS:     Effects,
    TRANSITIONS: TRANSITIONS,
    JSON_SCHEMA: JSON_SCHEMA,
    VERSION:     "1.0.0"
  };

  // UMD export
  if (typeof module !== "undefined" && module.exports) {
    module.exports = ColConnectStateMachine;
  } else {
    root.ColConnectStateMachine = ColConnectStateMachine;
  }

})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
