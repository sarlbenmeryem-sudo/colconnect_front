/* CC_PATCH:STAT_COLLECTIVITES_TO_20_V1 */
        // ColConnect - main.js | v1.0 | Extrait de v8.html script 1 | Dépendances: aucune
        // ========================
        // PROJECTS DATABASE (for global map)
        // 20 collectivités, 6 projets chacune = 120 projets. Adresses cohérentes. Pastille couleur par collectivité.
        // ========================
        const COLLECTIVITES_REF = [
            {id:'lyon',nom:'Ville de Lyon',couleur:'#1e3a5f'},{id:'paris',nom:'Ville de Paris',couleur:'#6366f1'},{id:'marseille',nom:'Ville de Marseille',couleur:'#ec4899'},{id:'bordeaux',nom:'Ville de Bordeaux',couleur:'#06b6d4'},{id:'nantes',nom:'Ville de Nantes',couleur:'#84cc16'},{id:'toulouse',nom:'Ville de Toulouse',couleur:'#f59e0b'},{id:'nice',nom:'Ville de Nice',couleur:'#8b5cf6'},{id:'strasbourg',nom:'Ville de Strasbourg',couleur:'#14b8a6'},{id:'montpellier',nom:'Ville de Montpellier',couleur:'#f97316'},{id:'lille',nom:'Ville de Lille',couleur:'#3b82f6'},{id:'rennes',nom:'Ville de Rennes',couleur:'#eab308'},{id:'grenoble',nom:'Ville de Grenoble',couleur:'#10b981'},{id:'dijon',nom:'Ville de Dijon',couleur:'#d946ef'},{id:'angers',nom:"Ville d'Angers",couleur:'#0ea5e9'},{id:'nimes',nom:'Ville de Nîmes',couleur:'#64748b'},{id:'rhone',nom:'Département du Rhône',couleur:'#991b1b'},{id:'gironde',nom:'Département de la Gironde',couleur:'#2d6a4f'},{id:'bdr',nom:'Département des Bouches-du-Rhône',couleur:'#c9a227'},{id:'aura',nom:'Région Auvergne-Rhône-Alpes',couleur:'#ef4444'},{id:'naquit',nom:'Région Nouvelle-Aquitaine',couleur:'#a855f7'}
        ];
        var COLLECTIVITES_CP_VILLE = { lyon:'69001 Lyon',paris:'75001 Paris',marseille:'13001 Marseille',bordeaux:'33000 Bordeaux',nantes:'44000 Nantes',toulouse:'31000 Toulouse',nice:'06000 Nice',strasbourg:'67000 Strasbourg',montpellier:'34000 Montpellier',lille:'59000 Lille',rennes:'35000 Rennes',grenoble:'38000 Grenoble',dijon:'21000 Dijon',angers:'49100 Angers',nimes:'30000 Nîmes',rhone:'69000 Lyon',gironde:'33000 Bordeaux',bdr:'13001 Marseille',aura:'69000 Lyon',naquit:'33000 Bordeaux' };
        function getAnalyseForProject(p) {
            if (!p) return '—';
            if (p.analyse && String(p.analyse).trim()) return p.analyse;
            var t = (p.type || '').toLowerCase();
            if (t.indexOf('patrimoine')>=0) return 'Rénovation ou valorisation du bâti patrimonial. Conformité énergétique et objectifs Décret Tertiaire intégrés au programme.';
            if (t.indexOf('éducation')>=0) return 'Bâtiment éducatif. Performance énergétique, confort et qualité de l\'air au programme.';
            if (t.indexOf('petite enfance')>=0) return 'Équipement petite enfance. Enjeux sanitaires et énergétiques conformes aux normes.';
            if (t.indexOf('culture')>=0) return 'Équipement culturel. Impact patrimonial et maîtrise énergétique pris en compte.';
            if (t.indexOf('sport')>=0) return 'Équipement sportif. Performance énergétique et toiture/ENR possibles (solaire, etc.).';
            if (t.indexOf('santé')>=0) return 'Bâtiment de santé. Exigences énergétiques et sanitaires intégrées.';
            if (t.indexOf('urbanisme')>=0) return 'Projet d\'urbanisme ou d\'écoquartier. Dimension énergie et patrimoine dans l\'aménagement.';
            if (t.indexOf('espaces verts')>=0) return 'Aménagement d\'espaces verts. Impact paysager et biodiversité; lien avec le bâti limité.';
            if (t.indexOf('mobilité')>=0) return 'Projet mobilité/voirie. Impact indirect sur le patrimoine et les déplacements.';
            if (t.indexOf('transport')>=0) return 'Infrastructure de transport. Enjeux structurants; dimension énergétique des bâtiments associés.';
            if (t.indexOf('infrastructure')>=0) return 'Infrastructure. Enjeux techniques et durabilité.';
            if (t.indexOf('économie')>=0) return 'Projet économique. Bâtiments et zones d\'activité; performance énergétique.';
            if (t.indexOf('numérique')>=0) return 'Projet numérique. Réseaux et bâtiments techniques.';
            if (t.indexOf('administration')>=0) return 'Bâtiment administratif. Assujettissement Décret Tertiaire et rénovation énergétique.';
            if (t.indexOf('formation')>=0) return 'Formation. Bâtiments d\'enseignement; enjeux énergétiques.';
            if (t.indexOf('énergie')>=0) return 'Projet énergie. Production, réseaux, ENR.';
            if (t.indexOf('environnement')>=0) return 'Projet environnement. Biodiversité, eau, déchets.';
            return 'Projet au service des finalités de la collectivité. Conformité et pilotage suivis.';
        }
        function formatProjetCode(id) { var n = parseInt(id, 10); return 'P' + (isNaN(n) ? String(id || '').padStart(6, '0') : String(n).padStart(6, '0')); }
        function __normStr(s) { return String(s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
        var __userCreatedProjets = [];
        try { var _cc = localStorage.getItem('cc_projets_creation'); if (_cc) { var _arr = JSON.parse(_cc); if (Array.isArray(_arr)) __userCreatedProjets = _arr; } } catch (e) {}
        function saveUserCreatedProjets() { try { if (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) localStorage.setItem('cc_projets_creation', JSON.stringify(__userCreatedProjets)); } catch (e) {} }
        const projectsDatabase = [
            {id:1,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Nouveau groupe scolaire Confluence',adresse:'112 cours Charlemagne, 69002 Lyon',status:'travaux',lat:45.738,lon:4.82,budget:4.2,progressEtudes:100,progressTravaux:68,type:'Éducation',date:'Juin 2026',eligible:true},
            {id:2,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Rénovation énergétique Hôtel de Ville',adresse:'1 place de la Comédie, 69001 Lyon',status:'etude',lat:45.7674,lon:4.8345,budget:2.8,progressEtudes:45,progressTravaux:0,type:'Patrimoine',date:'Dec 2026',eligible:true},
            {id:3,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Piste cyclable Part-Dieu',adresse:'Boulevard Vivier-Merle, 69003 Lyon',status:'travaux',lat:45.7606,lon:4.858,budget:1.5,progressEtudes:100,progressTravaux:35,type:'Mobilité',date:'Sept 2026',eligible:true},
            {id:4,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Crèche municipale Gerland',adresse:'88 avenue Tony-Garnier, 69007 Lyon',status:'termine',lat:45.7267,lon:4.8278,budget:3.1,progressEtudes:100,progressTravaux:100,type:'Petite enfance',date:'Terminé',eligible:true},
            {id:5,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Modernisation éclairage public Confluence',adresse:'Rue Smith, 69002 Lyon',status:'travaux',lat:45.732,lon:4.818,budget:1.2,progressEtudes:100,progressTravaux:89,type:'Urbanisme',date:'Fév 2026',eligible:false},
            {id:6,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Extension médiathèque du Bachut',adresse:'2 place du 11-Novembre, 69008 Lyon',status:'etude',lat:45.735,lon:4.875,budget:5.2,progressEtudes:35,progressTravaux:0,type:'Culture',date:'Mars 2027',eligible:true},
            {id:121,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Rénovation énergétique – liloo',adresse:'Lyon',status:'etude',lat:45.75,lon:4.85,budget:1.5,progressEtudes:10,progressTravaux:0,type:'Énergie',date:'Dec 2026',eligible:true},
            {id:7,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Rénovation Palais de Tokyo',adresse:'13 avenue du Président-Wilson, 75116 Paris',status:'travaux',lat:48.8634,lon:2.2977,budget:12.5,progressEtudes:100,progressTravaux:55,type:'Culture',date:'Juin 2026',eligible:true},
            {id:8,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Piscine olympique 13ème',adresse:'30 avenue d\'Ivry, 75013 Paris',status:'travaux',lat:48.8235,lon:2.3767,budget:8.3,progressEtudes:100,progressTravaux:72,type:'Sport',date:'Sept 2026',eligible:true},
            {id:9,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Parc urbain Batignolles',adresse:'147 rue Cardinet, 75017 Paris',status:'termine',lat:48.8906,lon:2.3089,budget:6.7,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:10,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Extension ligne 14 métro',adresse:'Gare de Lyon, 75012 Paris',status:'travaux',lat:48.8566,lon:2.3522,budget:45,progressEtudes:100,progressTravaux:82,type:'Transport',date:'Dec 2026',eligible:true},
            {id:11,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Rénovation Bourse du Travail',adresse:'3 rue du Château-d\'Eau, 75010 Paris',status:'etude',lat:48.872,lon:2.355,budget:4.5,progressEtudes:62,progressTravaux:0,type:'Patrimoine',date:'2027',eligible:false},
            {id:12,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Crèche Gambetta',adresse:'120 avenue Gambetta, 75020 Paris',status:'travaux',lat:48.865,lon:2.398,budget:2.1,progressEtudes:100,progressTravaux:28,type:'Petite enfance',date:'Mai 2026',eligible:true},
            
            {id:13,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Réhabilitation Vieux-Port',adresse:'Quai du Port, 13002 Marseille',status:'travaux',lat:43.2952,lon:5.3678,budget:15.2,progressEtudes:100,progressTravaux:61,type:'Urbanisme',date:'Oct 2026',eligible:true},
            {id:14,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Médiathèque Castellane',adresse:'8 rue du Docteur Morucci, 13006 Marseille',status:'travaux',lat:43.2883,lon:5.3886,budget:4.5,progressEtudes:100,progressTravaux:40,type:'Culture',date:'Juin 2026',eligible:true},
            {id:15,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Stade Vélodrome - Toiture solaire',adresse:'3 boulevard Michelet, 13008 Marseille',status:'etude',lat:43.2701,lon:5.3958,budget:8.5,progressEtudes:60,progressTravaux:0,type:'Sport',date:'2028',eligible:true},
            {id:16,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Parc du 26e centenaire extension',adresse:'Rue de Bonneveine, 13008 Marseille',status:'termine',lat:43.268,lon:5.385,budget:2.8,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:17,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Tramway T3 prolongement',adresse:'Avenue de Hambourg, 13008 Marseille',status:'travaux',lat:43.255,lon:5.375,budget:22,progressEtudes:100,progressTravaux:48,type:'Transport',date:'Dec 2026',eligible:false},
            {id:18,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'EHPAD Bonneveine',adresse:'Traverse Parangon, 13008 Marseille',status:'etude',lat:43.262,lon:5.392,budget:6.2,progressEtudes:42,progressTravaux:0,type:'Santé',date:'2029',eligible:true},
            {id:19,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Pont Simone Veil',adresse:'Quai de Bacalan, 33000 Bordeaux',status:'termine',lat:44.8611,lon:-0.5508,budget:18.5,progressEtudes:100,progressTravaux:100,type:'Infrastructure',date:'Terminé',eligible:true},
            {id:20,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Éco-quartier Ginko',adresse:'Cours du Médoc, 33300 Bordeaux',status:'travaux',lat:44.879,lon:-0.5481,budget:25,progressEtudes:100,progressTravaux:68,type:'Urbanisme',date:'2027',eligible:true},
            {id:21,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Rénovation Grand Théâtre',adresse:'Place de la Comédie, 33000 Bordeaux',status:'etude',lat:44.8421,lon:-0.5743,budget:9.2,progressEtudes:55,progressTravaux:0,type:'Patrimoine',date:'2028',eligible:true},
            {id:22,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Ligne C tramway extension',adresse:'Avenue Thiers, 33100 Bordeaux',status:'travaux',lat:44.835,lon:-0.57,budget:12,progressEtudes:100,progressTravaux:35,type:'Transport',date:'Juin 2026',eligible:true},
            {id:23,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Stade Matmut rénovation',adresse:'Cours Jules-Ladoumegue, 33300 Bordeaux',status:'etude',lat:44.886,lon:-0.555,budget:7.5,progressEtudes:38,progressTravaux:0,type:'Sport',date:'2029',eligible:false},
            {id:24,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Médiathèque Mériadeck',adresse:'85 cours du Maréchal-Juin, 33000 Bordeaux',status:'travaux',lat:44.837,lon:-0.586,budget:3.8,progressEtudes:100,progressTravaux:72,type:'Culture',date:'Sept 2026',eligible:true},
            
            {id:25,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Île de Nantes - Phase 3',adresse:'Boulevard Léon-Bureau, 44200 Nantes',status:'travaux',lat:47.2058,lon:-1.5404,budget:22,progressEtudes:100,progressTravaux:65,type:'Urbanisme',date:'2027',eligible:true},
            {id:26,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'CHU - Nouveau bâtiment',adresse:'1 place Alexis-Ricordeau, 44093 Nantes',status:'travaux',lat:47.2464,lon:-1.5413,budget:38,progressEtudes:100,progressTravaux:52,type:'Santé',date:'2028',eligible:true},
            {id:27,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Parc des Chantiers extension',adresse:'Île de Nantes, 44200 Nantes',status:'termine',lat:47.2066,lon:-1.5642,budget:5.5,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:28,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Ligne 4 bus à haut niveau',adresse:'Boulevard de la Prairie-au-Duc, 44200 Nantes',status:'etude',lat:47.21,lon:-1.55,budget:8.5,progressEtudes:48,progressTravaux:0,type:'Transport',date:'2029',eligible:false},
            {id:29,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Médiathèque Jacques-Demy',adresse:'24 quai de la Fosse, 44000 Nantes',status:'travaux',lat:47.212,lon:-1.555,budget:4.2,progressEtudes:100,progressTravaux:58,type:'Culture',date:'Juin 2026',eligible:true},
            {id:30,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Rénovation thermal écoles',adresse:'Rue du Gâvre, 44100 Nantes',status:'travaux',lat:47.218,lon:-1.548,budget:6.8,progressEtudes:100,progressTravaux:42,type:'Éducation',date:'Dec 2026',eligible:true},
            {id:31,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'Ligne métro T3',adresse:'Avenue de Muret, 31300 Toulouse',status:'travaux',lat:43.6043,lon:1.4437,budget:35,progressEtudes:100,progressTravaux:42,type:'Transport',date:'2028',eligible:true},
            {id:32,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'Parc technologique Aerospace',adresse:'Rue du Faubourg Bonnefoy, 31500 Toulouse',status:'travaux',lat:43.5678,lon:1.48,budget:28,progressEtudes:100,progressTravaux:58,type:'Économie',date:'2027',eligible:true},
            {id:33,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'Piscine Nakache rénovation',adresse:'116 allée de Barcelone, 31000 Toulouse',status:'etude',lat:43.5987,lon:1.4442,budget:6.5,progressEtudes:38,progressTravaux:0,type:'Sport',date:'2029',eligible:true},
            {id:34,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'École Pouvourville',adresse:'Rue de Pouvourville, 31400 Toulouse',status:'travaux',lat:43.575,lon:1.452,budget:3.5,progressEtudes:100,progressTravaux:72,type:'Éducation',date:'Sept 2026',eligible:true},
            {id:35,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'ZAC Borderouge Nord',adresse:'Avenue de Lyon, 31200 Toulouse',status:'etude',lat:43.62,lon:1.455,budget:18,progressEtudes:55,progressTravaux:0,type:'Urbanisme',date:'2030',eligible:false},
            {id:36,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'Halle aux grains rénovation',adresse:'Place Dupuy, 31000 Toulouse',status:'termine',lat:43.6,lon:1.442,budget:5.2,progressEtudes:100,progressTravaux:100,type:'Culture',date:'Terminé',eligible:true},
            {id:37,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Tramway ligne 3',adresse:'Promenade des Anglais, 06000 Nice',status:'travaux',lat:43.7034,lon:7.2663,budget:18,progressEtudes:100,progressTravaux:71,type:'Transport',date:'2026',eligible:true},
            {id:38,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Promenade du Paillon phase 2',adresse:'Place Masséna, 06000 Nice',status:'termine',lat:43.6979,lon:7.2687,budget:8.5,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:39,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Centre culturel Phoenix',adresse:'405 promenade des Anglais, 06200 Nice',status:'etude',lat:43.6952,lon:7.2606,budget:5.8,progressEtudes:42,progressTravaux:0,type:'Culture',date:'2028',eligible:true},
            {id:40,collectiviteId:'nice',collectivite:'Ville de Nice',name:'École Pasteur extension',adresse:'Rue Pasteur, 06000 Nice',status:'travaux',lat:43.698,lon:7.272,budget:2.5,progressEtudes:100,progressTravaux:35,type:'Éducation',date:'Mai 2026',eligible:true},
            {id:41,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Stade du Ray rénovation',adresse:'Boulevard Jean-Jaurès, 06100 Nice',status:'etude',lat:43.69,lon:7.258,budget:9.2,progressEtudes:28,progressTravaux:0,type:'Sport',date:'2030',eligible:false},
            {id:42,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Hôpital Pasteur 2',adresse:'30 voie Romaine, 06001 Nice',status:'travaux',lat:43.675,lon:7.265,budget:42,progressEtudes:100,progressTravaux:55,type:'Santé',date:'2027',eligible:true},
            {id:43,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Rénovation Palais Rohan',adresse:'2 place du Château, 67000 Strasbourg',status:'travaux',lat:48.5798,lon:7.752,budget:7.2,progressEtudes:100,progressTravaux:48,type:'Patrimoine',date:'Juin 2026',eligible:true},
            {id:44,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Écoquartier Danube',adresse:'Rue du Danube, 67100 Strasbourg',status:'travaux',lat:48.5893,lon:7.7639,budget:15,progressEtudes:100,progressTravaux:55,type:'Urbanisme',date:'2027',eligible:true},
            {id:45,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Extension tram ligne F',adresse:'Place des Halles, 67000 Strasbourg',status:'etude',lat:48.5734,lon:7.7521,budget:12,progressEtudes:28,progressTravaux:0,type:'Transport',date:'2029',eligible:true},
            {id:46,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Parc de la Citadelle',adresse:'Avenue de la Forêt-Noire, 67000 Strasbourg',status:'termine',lat:48.582,lon:7.762,budget:3.2,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:47,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Médiathèque Malraux',adresse:'1 presqu\'île André-Malraux, 67100 Strasbourg',status:'travaux',lat:48.578,lon:7.748,budget:2.8,progressEtudes:100,progressTravaux:82,type:'Culture',date:'Fév 2026',eligible:true},
            {id:48,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Gymnase Robertsau',adresse:'Rue de la Wantzenau, 67000 Strasbourg',status:'etude',lat:48.61,lon:7.785,budget:4.5,progressEtudes:45,progressTravaux:0,type:'Sport',date:'2028',eligible:false},
            {id:49,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Hôpital Arnaud de Villeneuve',adresse:'371 avenue du Doyen-Giraud, 34295 Montpellier',status:'travaux',lat:43.6288,lon:3.8624,budget:42,progressEtudes:100,progressTravaux:63,type:'Santé',date:'2028',eligible:true},
            {id:50,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Extension ligne 5 tramway',adresse:'Place de l\'Europe, 34000 Montpellier',status:'etude',lat:43.6047,lon:3.883,budget:12.5,progressEtudes:51,progressTravaux:0,type:'Transport',date:'2030',eligible:true},
            {id:51,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Quartier Cambacérès',adresse:'Rue de la Petite-Carlencas, 34070 Montpellier',status:'travaux',lat:43.6108,lon:3.8767,budget:18,progressEtudes:100,progressTravaux:35,type:'Urbanisme',date:'2027',eligible:true},
            {id:52,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Rénovation Corum',adresse:'Place de la Comédie, 34000 Montpellier',status:'etude',lat:43.608,lon:3.879,budget:8.5,progressEtudes:38,progressTravaux:0,type:'Culture',date:'2029',eligible:false},
            {id:53,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Parc Marianne extension',adresse:'Rue de la Font-Mascle, 34070 Montpellier',status:'termine',lat:43.612,lon:3.882,budget:2.2,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:54,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Groupe scolaire Boutonnet',adresse:'Rue de l\'École-Normale, 34090 Montpellier',status:'travaux',lat:43.618,lon:3.868,budget:5.5,progressEtudes:100,progressTravaux:48,type:'Éducation',date:'Sept 2026',eligible:true},
            
            {id:55,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Euralille 3000',adresse:'Place François-Mitterrand, 59777 Lille',status:'travaux',lat:50.6372,lon:3.075,budget:28,progressEtudes:100,progressTravaux:44,type:'Urbanisme',date:'2028',eligible:true},
            {id:56,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Rénovation Gare Saint-Sauveur',adresse:'17 place des Vins-de-France, 59000 Lille',status:'travaux',lat:50.6372,lon:3.0594,budget:11.5,progressEtudes:100,progressTravaux:58,type:'Culture',date:'Juin 2026',eligible:true},
            {id:57,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Parc de la Citadelle extension',adresse:'Avenue du 43e-Régiment-d\'Infanterie, 59800 Lille',status:'termine',lat:50.6421,lon:3.0452,budget:4.2,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:58,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Ligne 2 métro',adresse:'Gare Lille-Flandres, 59000 Lille',status:'etude',lat:50.636,lon:3.071,budget:15,progressEtudes:35,progressTravaux:0,type:'Transport',date:'2031',eligible:false},
            {id:59,collectiviteId:'lille',collectivite:'Ville de Lille',name:'École Solférino',adresse:'Rue Solférino, 59000 Lille',status:'travaux',lat:50.634,lon:3.062,budget:3.2,progressEtudes:100,progressTravaux:62,type:'Éducation',date:'Sept 2026',eligible:true},
            {id:60,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Piscine Vauban',adresse:'Rue du Guet, 59000 Lille',status:'etude',lat:50.64,lon:3.058,budget:5.5,progressEtudes:48,progressTravaux:0,type:'Sport',date:'2029',eligible:true},
            {id:61,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Ligne métro B extension',adresse:'Place de la République, 35000 Rennes',status:'travaux',lat:48.1113,lon:-1.68,budget:16,progressEtudes:100,progressTravaux:67,type:'Transport',date:'2027',eligible:true},
            {id:62,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Couvent des Jacobins',adresse:'Place des Jacobins, 35000 Rennes',status:'termine',lat:48.1147,lon:-1.6806,budget:6,progressEtudes:100,progressTravaux:100,type:'Patrimoine',date:'Terminé',eligible:true},
            {id:63,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Campus universitaire rénovation',adresse:'Avenue du Professeur-Léon-Bernard, 35000 Rennes',status:'travaux',lat:48.1173,lon:-1.6778,budget:22,progressEtudes:100,progressTravaux:40,type:'Éducation',date:'2028',eligible:true},
            {id:64,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'ZAC Baud-Chardonnet',adresse:'Quai d\'Ille-et-Rance, 35000 Rennes',status:'etude',lat:48.108,lon:-1.682,budget:12,progressEtudes:52,progressTravaux:0,type:'Urbanisme',date:'2030',eligible:false},
            {id:65,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Piscine Bréquigny',adresse:'Rue d\'Espagne, 35200 Rennes',status:'travaux',lat:48.105,lon:-1.712,budget:4.8,progressEtudes:100,progressTravaux:55,type:'Sport',date:'Juin 2026',eligible:true},
            {id:66,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Médiathèque les Champs Libres',adresse:'10 cours des Alliés, 35000 Rennes',status:'travaux',lat:48.11,lon:-1.676,budget:2.5,progressEtudes:100,progressTravaux:88,type:'Culture',date:'Fév 2026',eligible:true},
            {id:67,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Téléphérique urbain',adresse:'Quai Stéphane-Jay, 38000 Grenoble',status:'etude',lat:45.1841,lon:5.7155,budget:14,progressEtudes:35,progressTravaux:0,type:'Transport',date:'2030',eligible:true},
            {id:68,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Rénovation thermique écoles',adresse:'Rue Hébert, 38000 Grenoble',status:'travaux',lat:45.1885,lon:5.7245,budget:8.5,progressEtudes:100,progressTravaux:52,type:'Éducation',date:'Dec 2026',eligible:true},
            {id:69,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Esplanade centrale piétonne',adresse:'Place Verdun, 38000 Grenoble',status:'termine',lat:45.188,lon:5.724,budget:3.8,progressEtudes:100,progressTravaux:100,type:'Urbanisme',date:'Terminé',eligible:true},
            {id:70,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'MC2 extension',adresse:'4 rue Paul-Claudel, 38000 Grenoble',status:'travaux',lat:45.192,lon:5.718,budget:6.2,progressEtudes:100,progressTravaux:38,type:'Culture',date:'2027',eligible:true},
            {id:71,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Parc Paul-Mistral',adresse:'Boulevard Jean-Pain, 38000 Grenoble',status:'etude',lat:45.178,lon:5.732,budget:2.8,progressEtudes:42,progressTravaux:0,type:'Espaces verts',date:'2029',eligible:false},
            {id:72,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'CHU Michallon',adresse:'Boulevard de la Chantourne, 38700 La Tronche',status:'travaux',lat:45.201,lon:5.745,budget:35,progressEtudes:100,progressTravaux:62,type:'Santé',date:'2028',eligible:true},
            {id:73,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Tramway ligne T2',adresse:'Place de la République, 21000 Dijon',status:'travaux',lat:47.3215,lon:5.0357,budget:13,progressEtudes:100,progressTravaux:60,type:'Transport',date:'Juin 2026',eligible:true},
            {id:74,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Cité Internationale Gastronomie',adresse:'21000 Dijon',status:'termine',lat:47.3215,lon:5.042,budget:18.5,progressEtudes:100,progressTravaux:100,type:'Culture',date:'Terminé',eligible:true},
            {id:75,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Réhabilitation quartier Bourroches',adresse:'Rue de Bourroches, 21000 Dijon',status:'etude',lat:47.313,lon:5.028,budget:9,progressEtudes:62,progressTravaux:0,type:'Urbanisme',date:'2028',eligible:true},
            {id:76,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Collège Révolution',adresse:'Rue de la Manutention, 21000 Dijon',status:'travaux',lat:47.318,lon:5.04,budget:5.5,progressEtudes:100,progressTravaux:45,type:'Éducation',date:'Sept 2026',eligible:true},
            {id:77,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Parc de la Toison d\'Or',adresse:'Rue de la Toison d\'Or, 21000 Dijon',status:'etude',lat:47.308,lon:5.025,budget:1.8,progressEtudes:28,progressTravaux:0,type:'Espaces verts',date:'2030',eligible:false},
            {id:78,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Opéra rénovation',adresse:'Place du Théâtre, 21000 Dijon',status:'travaux',lat:47.323,lon:5.038,budget:7.2,progressEtudes:100,progressTravaux:72,type:'Patrimoine',date:'2027',eligible:true},
            {id:79,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Ligne B tramway',adresse:'Place du Ralliement, 49100 Angers',status:'travaux',lat:47.4784,lon:-0.5632,budget:15,progressEtudes:100,progressTravaux:45,type:'Transport',date:'2027',eligible:true},
            {id:80,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Rénovation château médiéval',adresse:'2 promenade du Bout-du-Monde, 49100 Angers',status:'travaux',lat:47.4698,lon:-0.5596,budget:8.2,progressEtudes:100,progressTravaux:72,type:'Patrimoine',date:'Juin 2026',eligible:true},
            {id:81,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Parc Terra Botanica extension',adresse:'Route d\'Épinard, 49100 Angers',status:'etude',lat:47.492,lon:-0.585,budget:6,progressEtudes:48,progressTravaux:0,type:'Espaces verts',date:'2029',eligible:true},
            {id:82,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Médiathèque Toussaint',adresse:'49 rue Toussaint, 49100 Angers',status:'travaux',lat:47.472,lon:-0.552,budget:3.5,progressEtudes:100,progressTravaux:58,type:'Culture',date:'Sept 2026',eligible:true},
            {id:83,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'ZAC des Capucins',adresse:'Boulevard du Doyenné, 49100 Angers',status:'etude',lat:47.465,lon:-0.568,budget:12,progressEtudes:35,progressTravaux:0,type:'Urbanisme',date:'2031',eligible:false},
            {id:84,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Gymnase Jean-Bouin',adresse:'Rue Claude-Debussy, 49100 Angers',status:'travaux',lat:47.475,lon:-0.545,budget:2.8,progressEtudes:100,progressTravaux:42,type:'Sport',date:'Mai 2026',eligible:true},
            {id:85,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Musée de la Romanité phase 2',adresse:'16 boulevard des Arènes, 30000 Nîmes',status:'travaux',lat:43.8367,lon:4.3601,budget:12,progressEtudes:100,progressTravaux:38,type:'Culture',date:'2027',eligible:true},
            {id:86,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Rénovation Jardins de la Fontaine',adresse:'Quai de la Fontaine, 30000 Nîmes',status:'termine',lat:43.84,lon:4.348,budget:4.5,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true},
            {id:87,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Gare routière multimodale',adresse:'Rue de la Gare, 30900 Nîmes',status:'etude',lat:43.833,lon:4.365,budget:7.8,progressEtudes:55,progressTravaux:0,type:'Transport',date:'2029',eligible:true},
            {id:88,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'École Antonin-Perrin',adresse:'Rue Antonin-Perrin, 30000 Nîmes',status:'travaux',lat:43.838,lon:4.355,budget:3.2,progressEtudes:100,progressTravaux:65,type:'Éducation',date:'Dec 2026',eligible:true},
            {id:89,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'ZAC Hôtel-de-Ville',adresse:'Place de l\'Hôtel-de-Ville, 30000 Nîmes',status:'etude',lat:43.837,lon:4.362,budget:9.5,progressEtudes:42,progressTravaux:0,type:'Urbanisme',date:'2030',eligible:false},
            {id:90,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Piscine Nemausa',adresse:'Boulevard des Arènes, 30000 Nîmes',status:'travaux',lat:43.834,lon:4.358,budget:4.8,progressEtudes:100,progressTravaux:78,type:'Sport',date:'Mars 2026',eligible:true},
            {id:91,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Contournement Est Lyon',adresse:'RD 306, 69150 Décines-Charpieu',status:'travaux',lat:45.764,lon:4.95,budget:85,progressEtudes:100,progressTravaux:32,type:'Infrastructure',date:'2029',eligible:true},
            {id:92,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Rénovation collèges publics',adresse:'60 rue de Créqui, 69003 Lyon',status:'travaux',lat:45.764,lon:4.8357,budget:45,progressEtudes:100,progressTravaux:55,type:'Éducation',date:'2028',eligible:true},
            {id:93,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Fibre optique zones rurales',adresse:'69440 Mornant',status:'travaux',lat:45.85,lon:4.7,budget:28,progressEtudes:100,progressTravaux:78,type:'Numérique',date:'2026',eligible:true},
            {id:94,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Maison de santé Belleville',adresse:'69430 Beaujeu',status:'etude',lat:46.15,lon:4.58,budget:2.5,progressEtudes:48,progressTravaux:0,type:'Santé',date:'2029',eligible:false},
            {id:95,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'RD 485 sécurisation',adresse:'RD 485, 69620 Bessenay',status:'travaux',lat:45.77,lon:4.55,budget:8.5,progressEtudes:100,progressTravaux:42,type:'Infrastructure',date:'2027',eligible:true},
            {id:96,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Pôle culturel nord',adresse:'Place de la Gare, 69170 Tarare',status:'etude',lat:45.895,lon:4.435,budget:5.2,progressEtudes:35,progressTravaux:0,type:'Culture',date:'2030',eligible:true},
            {id:97,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Pont Bacalan-Bastide rénovation',adresse:'Quai de Bacalan, 33000 Bordeaux',status:'termine',lat:44.86,lon:-0.55,budget:12,progressEtudes:100,progressTravaux:100,type:'Infrastructure',date:'Terminé',eligible:true},
            {id:98,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Plan vélo départemental',adresse:'33140 Villenave-d\'Ornon',status:'travaux',lat:44.8378,lon:-0.5792,budget:35,progressEtudes:100,progressTravaux:42,type:'Mobilité',date:'2028',eligible:true},
            {id:99,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Rénovation EHPAD publics',adresse:'33400 Talence',status:'etude',lat:44.9,lon:-0.6,budget:22,progressEtudes:68,progressTravaux:0,type:'Santé',date:'2030',eligible:true},
            {id:100,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Collèges énergie positive',adresse:'33700 Mérignac',status:'travaux',lat:44.838,lon:-0.646,budget:28,progressEtudes:100,progressTravaux:58,type:'Éducation',date:'2027',eligible:true},
            {id:101,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'RD 215 réaménagement',adresse:'RD 215, 33310 Lormont',status:'etude',lat:44.88,lon:-0.52,budget:6.5,progressEtudes:42,progressTravaux:0,type:'Infrastructure',date:'2029',eligible:false},
            {id:102,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Zones d\'activité économiques',adresse:'33127 Saint-Jean-d\'Illac',status:'travaux',lat:44.815,lon:-0.78,budget:12,progressEtudes:100,progressTravaux:35,type:'Économie',date:'2026',eligible:true},
            {id:103,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Route littorale sécurisation',adresse:'RD 559, 13600 La Ciotat',status:'travaux',lat:43.35,lon:5.3,budget:42,progressEtudes:100,progressTravaux:58,type:'Infrastructure',date:'2028',eligible:true},
            {id:104,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Modernisation ports de pêche',adresse:'13002 Marseille',status:'travaux',lat:43.2965,lon:5.3698,budget:18,progressEtudes:100,progressTravaux:35,type:'Économie',date:'2027',eligible:true},
            {id:105,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Campus santé Aix-Marseille',adresse:'13015 Marseille',status:'etude',lat:43.52,lon:5.45,budget:65,progressEtudes:45,progressTravaux:0,type:'Santé',date:'2032',eligible:true},
            {id:106,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Collèges rénovation énergétique',adresse:'13100 Aix-en-Provence',status:'travaux',lat:43.528,lon:5.447,budget:25,progressEtudes:100,progressTravaux:48,type:'Éducation',date:'2027',eligible:true},
            {id:107,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Réseau eau potable',adresse:'13200 Martigues',status:'etude',lat:43.405,lon:5.055,budget:18,progressEtudes:52,progressTravaux:0,type:'Infrastructure',date:'2030',eligible:false},
            {id:108,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Maisons de service public',adresse:'13800 Istres',status:'travaux',lat:43.515,lon:4.99,budget:5.5,progressEtudes:100,progressTravaux:62,type:'Administration',date:'Juin 2026',eligible:true},
            {id:109,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'TER nouvelle génération',adresse:'Gare Part-Dieu, 69003 Lyon',status:'travaux',lat:45.764,lon:4.8357,budget:250,progressEtudes:100,progressTravaux:45,type:'Transport',date:'2029',eligible:true},
            {id:110,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Lycées à énergie positive',adresse:'63000 Clermont-Ferrand',status:'travaux',lat:45.75,lon:4.85,budget:120,progressEtudes:100,progressTravaux:62,type:'Éducation',date:'2028',eligible:true},
            {id:111,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Plan hydrogène régional',adresse:'38000 Grenoble',status:'etude',lat:45.5,lon:4.5,budget:85,progressEtudes:38,progressTravaux:0,type:'Énergie',date:'2032',eligible:true},
            {id:112,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Ligne Saint-Étienne-Lyon',adresse:'42000 Saint-Étienne',status:'travaux',lat:45.44,lon:4.39,budget:95,progressEtudes:100,progressTravaux:52,type:'Transport',date:'2027',eligible:true},
            {id:113,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Pôles formation pro',adresse:'43000 Le Puy-en-Velay',status:'etude',lat:45.043,lon:3.885,budget:35,progressEtudes:48,progressTravaux:0,type:'Formation',date:'2030',eligible:false},
            {id:114,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Stade des Alpes',adresse:'90 avenue d\'Innsbruck, 38100 Grenoble',status:'travaux',lat:45.185,lon:5.732,budget:22,progressEtudes:100,progressTravaux:78,type:'Sport',date:'2026',eligible:true},
            {id:115,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'LGV Tours-Bordeaux extension',adresse:'Gare Saint-Jean, 33000 Bordeaux',status:'etude',lat:44.8378,lon:-0.5792,budget:450,progressEtudes:28,progressTravaux:0,type:'Transport',date:'2032',eligible:true},
            {id:116,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Campus numérique régional',adresse:'33400 Talence',status:'travaux',lat:44.85,lon:-0.56,budget:75,progressEtudes:100,progressTravaux:52,type:'Numérique',date:'2028',eligible:true},
            {id:117,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Rénovation ports atlantique',adresse:'17000 La Rochelle',status:'travaux',lat:45.0,lon:-1.2,budget:95,progressEtudes:100,progressTravaux:38,type:'Infrastructure',date:'2029',eligible:true},
            {id:118,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Lycées rénovation',adresse:'24000 Périgueux',status:'travaux',lat:45.183,lon:0.718,budget:55,progressEtudes:100,progressTravaux:45,type:'Éducation',date:'2027',eligible:true},
            {id:119,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Tram-train Poitiers',adresse:'86000 Poitiers',status:'etude',lat:46.58,lon:0.34,budget:28,progressEtudes:42,progressTravaux:0,type:'Transport',date:'2031',eligible:false},
            {id:120,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Parc naturel régional',adresse:'64140 Lons',status:'termine',lat:43.32,lon:-0.41,budget:8.5,progressEtudes:100,progressTravaux:100,type:'Environnement',date:'Terminé',eligible:true},
            // 3 projets démo anomalie par collectivité (DONNEES, JALONS, FINANCE, KPI, PIECES — BLOCKING/INFO)
            {id:201,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Salle polyvalente Gerland',adresse:'50 avenue Tony-Garnier, 69007 Lyon',status:'travaux',budget:2.1,progressEtudes:100,progressTravaux:45,type:'Culture',date:'Juin 2026',eligible:true,_anomalies:[{code:'MISSING_BUDGET',severity:'BLOCKING',category:'DONNEES',label:'Budget total non renseigné',details:'Le budget consolidé est requis pour la validation mensuelle.',suggestedAction:'Renseigner le budget dans la fiche projet'}]},
            {id:202,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Réfection toiture école Croix-Rousse',adresse:'12 montée de la Grande-Côte, 69004 Lyon',status:'etude',budget:1.8,progressEtudes:65,progressTravaux:0,type:'Éducation',date:'2027',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Jalon AVP non validé',details:'Avant-projet sommaire en attente de validation.',suggestedAction:'Valider le jalon AVP dans la fiche projet'}]},
            {id:203,collectiviteId:'lyon',collectivite:'Ville de Lyon',name:'Chaufferie bois La Part-Dieu',adresse:'Boulevard Vivier-Merle, 69003 Lyon',status:'travaux',budget:4.5,progressEtudes:100,progressTravaux:72,type:'Énergie',date:'Sept 2026',eligible:true,_anomalies:[{code:'FINANCE_CONVENTION',severity:'INFO',category:'FINANCE',label:'Convention financeur incomplète',details:'Pièce justificative manquante pour la subvention Région.',suggestedAction:'Joindre la convention signée'},{code:'KPI_AVANCEMENT',severity:'INFO',category:'KPI',label:'Indicateur avancement à actualiser',details:'Le dernier pointage date de plus de 30 jours.',suggestedAction:'Mettre à jour l\'avancement travaux'}]},
            {id:204,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Relamping LED bibliothèque',adresse:'15 rue du Faubourg-du-Temple, 75011 Paris',status:'travaux',budget:0.8,progressEtudes:100,progressTravaux:88,type:'Culture',date:'Fév 2026',eligible:true,_anomalies:[{code:'PIECES_MANQUANTES',severity:'BLOCKING',category:'PIECES',label:'PV de réception manquant',details:'Le PV de réception des travaux est requis.',suggestedAction:'Joindre le PV de réception'}]},
            {id:205,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Extension crèche 14ème',adresse:'Rue d\'Alésia, 75014 Paris',status:'etude',budget:3.2,progressEtudes:42,progressTravaux:0,type:'Petite enfance',date:'2028',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Jalons DCE et OS en attente',details:'DCE et ordre de service non validés.',suggestedAction:'Valider les jalons dans la fiche projet'}]},
            {id:206,collectiviteId:'paris',collectivite:'Ville de Paris',name:'Végétalisation cour d\'école',adresse:'18 rue de Belleville, 75020 Paris',status:'travaux',budget:0.5,progressEtudes:100,progressTravaux:55,type:'Espaces verts',date:'Mai 2026',eligible:true,_anomalies:[{code:'KPI_ECONOMIE',severity:'INFO',category:'KPI',label:'Économies énergie non renseignées',details:'Les gains estimés post-travaux ne sont pas renseignés.',suggestedAction:'Renseigner les économies estimées'}]},
            {id:207,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Désamiantage gymnase',adresse:'Rue Paradis, 13006 Marseille',status:'travaux',budget:null,progressEtudes:100,progressTravaux:28,type:'Sport',date:'2027',eligible:true,_anomalies:[{code:'MISSING_BUDGET',severity:'BLOCKING',category:'DONNEES',label:'Budget total manquant',details:'Le champ budget total est requis.',suggestedAction:'Renseigner le budget dans la fiche projet'}]},
            {id:208,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Rénovation marché aux puces',adresse:'Place du Général-de-Gaulle, 13003 Marseille',status:'etude',budget:5.5,progressEtudes:28,progressTravaux:0,type:'Urbanisme',date:'2030',eligible:false,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'APD non validé',details:'Avant-projet détaillé en attente.',suggestedAction:'Valider le jalon APD'}]},
            {id:209,collectiviteId:'marseille',collectivite:'Ville de Marseille',name:'Toiture photovoltaïque mairie annexe',adresse:'Boulevard Longchamp, 13001 Marseille',status:'travaux',budget:2.2,progressEtudes:100,progressTravaux:62,type:'Énergie',date:'Juin 2026',eligible:true,_anomalies:[{code:'FINANCE_CEE',severity:'INFO',category:'FINANCE',label:'Attestation CEE non jointe',details:'L\'attestation CEE pourrait compléter le dossier.',suggestedAction:'Joindre l\'attestation si disponible'}]},
            {id:210,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Vélodrome couverture',adresse:'Cours du Médoc, 33300 Bordeaux',status:'etude',budget:12,progressEtudes:55,progressTravaux:0,type:'Sport',date:'2029',eligible:true,_anomalies:[{code:'DONNEES_ADRESSE',severity:'BLOCKING',category:'DONNEES',label:'Adresse projet incomplète',details:'L\'adresse doit inclure le code postal.',suggestedAction:'Compléter l\'adresse'}]},
            {id:211,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Médiathèque Mériadeck extension',adresse:'85 cours du Maréchal-Juin, 33000 Bordeaux',status:'travaux',budget:4.5,progressEtudes:100,progressTravaux:35,type:'Culture',date:'2027',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Réception provisoire non signée',details:'Le PV de réception provisoire est en attente.',suggestedAction:'Finaliser la réception provisoire'}]},
            {id:212,collectiviteId:'bordeaux',collectivite:'Ville de Bordeaux',name:'Éclairage LED parc',adresse:'Jardin public, 33000 Bordeaux',status:'termine',budget:0.6,progressEtudes:100,progressTravaux:100,type:'Espaces verts',date:'Terminé',eligible:true,_anomalies:[{code:'PIECES_OPTIONNEL',severity:'INFO',category:'PIECES',label:'Facture final non archivée',details:'Facture de solde non encore jointe.',suggestedAction:'Archiver la facture'}]},
            {id:213,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Rénovation salle des fêtes',adresse:'Place du Commerce, 44000 Nantes',status:'travaux',budget:1.5,progressEtudes:100,progressTravaux:42,type:'Culture',date:'Dec 2026',eligible:true,_anomalies:[{code:'KPI_DECRET',severity:'BLOCKING',category:'KPI',label:'Objectif Décret Tertiaire non renseigné',details:'L\'objectif de réduction énergétique est requis.',suggestedAction:'Renseigner l\'objectif Décret Tertiaire'}]},
            {id:214,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Piste cyclable Chézine',adresse:'Boulevard des Anglais, 44000 Nantes',status:'etude',budget:2.8,progressEtudes:38,progressTravaux:0,type:'Mobilité',date:'2028',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Enquête publique en cours',details:'Résultat enquête publique attendu.',suggestedAction:'Finaliser l\'enquête publique'}]},
            {id:215,collectiviteId:'nantes',collectivite:'Ville de Nantes',name:'Isolation combles écoles',adresse:'Rue de la Contrie, 44100 Nantes',status:'travaux',budget:0.9,progressEtudes:100,progressTravaux:95,type:'Éducation',date:'Mars 2026',eligible:true,_anomalies:[{code:'FINANCE_SUBVENTION',severity:'INFO',category:'FINANCE',label:'Avenant subvention en cours',details:'Avenant ADEME en instruction.',suggestedAction:'Suivre la instruction ADEME'}]},
            {id:216,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'PAC piscine Ponts-Jumeaux',adresse:'Allée de Barcelone, 31000 Toulouse',status:'travaux',budget:3.5,progressEtudes:100,progressTravaux:58,type:'Sport',date:'Sept 2026',eligible:true,_anomalies:[{code:'DONNEES_TYPE',severity:'INFO',category:'DONNEES',label:'Sous-type PAC non précisé',details:'Préciser air/eau ou eau/eau.',suggestedAction:'Compléter le type de PAC'}]},
            {id:217,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'ZAC Cartoucherie phase 2',adresse:'Rue de la Cartoucherie, 31400 Toulouse',status:'etude',budget:22,progressEtudes:48,progressTravaux:0,type:'Urbanisme',date:'2030',eligible:false,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Permis d\'aménager en instruction',details:'Délai instruction dépassé.',suggestedAction:'Relancer l\'instruction'}]},
            {id:218,collectiviteId:'toulouse',collectivite:'Ville de Toulouse',name:'LED Halles centrale',adresse:'Place des Carmes, 31000 Toulouse',status:'termine',budget:0.4,progressEtudes:100,progressTravaux:100,type:'Urbanisme',date:'Terminé',eligible:true,_anomalies:[{code:'PIECES_CEE',severity:'INFO',category:'PIECES',label:'Fiche CEE à archiver',details:'Fiche standardisée CEE non jointe.',suggestedAction:'Joindre la fiche CEE'}]},
            {id:219,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Rénovation thermique collège',adresse:'Avenue Brancolar, 06100 Nice',status:'travaux',budget:4.2,progressEtudes:100,progressTravaux:35,type:'Éducation',date:'2027',eligible:true,_anomalies:[{code:'KPI_AVANCEMENT',severity:'BLOCKING',category:'KPI',label:'Avancement travaux non cohérent',details:'Écart > 10% entre déclaré et constaté.',suggestedAction:'Ajuster l\'avancement'}]},
            {id:220,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Promenade du Paillon phase 3',adresse:'Place Masséna, 06000 Nice',status:'etude',budget:6.5,progressEtudes:22,progressTravaux:0,type:'Espaces verts',date:'2031',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'DCE en cours de rédaction',details:'Dossier de consultation en cours.',suggestedAction:'Finaliser le DCE'}]},
            {id:221,collectiviteId:'nice',collectivite:'Ville de Nice',name:'Relamping stade',adresse:'Boulevard Jean-Jaurès, 06100 Nice',status:'travaux',budget:0.7,progressEtudes:100,progressTravaux:78,type:'Sport',date:'Mai 2026',eligible:true,_anomalies:[{code:'FINANCE_PAIEMENT',severity:'INFO',category:'FINANCE',label:'Solde en cours de paiement',details:'Facture solde en cours de traitement.',suggestedAction:'Suivre le paiement'}]},
            {id:222,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Bâtiment administratif éco',adresse:'Place de l\'Étoile, 67000 Strasbourg',status:'travaux',budget:18,progressEtudes:100,progressTravaux:48,type:'Administration',date:'2028',eligible:true,_anomalies:[{code:'DONNEES_DELAI',severity:'BLOCKING',category:'DONNEES',label:'Date de livraison manquante',details:'La date prévisionnelle de livraison est requise.',suggestedAction:'Renseigner la date de livraison'}]},
            {id:223,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Piste cyclable Rhin',adresse:'Quai des Bateliers, 67000 Strasbourg',status:'etude',budget:3.2,progressEtudes:62,progressTravaux:0,type:'Mobilité',date:'2027',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'OS travaux non signé',details:'Ordre de service travaux en attente.',suggestedAction:'Signer l\'OS travaux'}]},
            {id:224,collectiviteId:'strasbourg',collectivite:'Ville de Strasbourg',name:'Vélux toiture mairie',adresse:'Place Broglie, 67000 Strasbourg',status:'travaux',budget:0.5,progressEtudes:100,progressTravaux:92,type:'Patrimoine',date:'Fév 2026',eligible:true,_anomalies:[{code:'PIECES_DEVIS',severity:'INFO',category:'PIECES',label:'Devis initial à archiver',details:'Devis d\'exécution non archivé.',suggestedAction:'Archiver le devis'}]},
            {id:225,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Crèche Mosson',adresse:'Rue de la Mosson, 34080 Montpellier',status:'travaux',budget:2.8,progressEtudes:100,progressTravaux:28,type:'Petite enfance',date:'2027',eligible:true,_anomalies:[{code:'FINANCE_GARANTIE',severity:'BLOCKING',category:'FINANCE',label:'Garantie à bonne exécution manquante',details:'La GBE n\'a pas été constituée.',suggestedAction:'Constituer la GBE'}]},
            {id:226,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'Parc Millénaire extension',adresse:'Rue de la Chenaie, 34000 Montpellier',status:'etude',budget:1.2,progressEtudes:35,progressTravaux:0,type:'Espaces verts',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Projet définitif non validé',details:'Projet définitif en cours de validation.',suggestedAction:'Valider le projet définitif'}]},
            {id:227,collectiviteId:'montpellier',collectivite:'Ville de Montpellier',name:'LED bâtiments techniques',adresse:'ZI de Garosud, 34070 Montpellier',status:'termine',budget:0.35,progressEtudes:100,progressTravaux:100,type:'Énergie',date:'Terminé',eligible:true,_anomalies:[{code:'KPI_ECONOMIE',severity:'INFO',category:'KPI',label:'Économies réalisées non saisies',details:'Saisir les économies constatées post-travaux.',suggestedAction:'Renseigner les économies'}]},
            {id:228,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Gymnase Wazemmes',adresse:'Rue de Wazemmes, 59000 Lille',status:'travaux',budget:5.5,progressEtudes:100,progressTravaux:42,type:'Sport',date:'2028',eligible:true,_anomalies:[{code:'PIECES_OBLIGATOIRES',severity:'BLOCKING',category:'PIECES',label:'Dossier de consultation incomplet',details:'Plans du lot structure manquants.',suggestedAction:'Compléter le dossier'}]},
            {id:229,collectiviteId:'lille',collectivite:'Ville de Lille',name:'École Solférino réhabilitation',adresse:'Rue Solférino, 59000 Lille',status:'etude',budget:4.2,progressEtudes:55,progressTravaux:0,type:'Éducation',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Permis de construire en attente',details:'Instruction permis en cours.',suggestedAction:'Suivre l\'instruction'}]},
            {id:230,collectiviteId:'lille',collectivite:'Ville de Lille',name:'Végétalisation toiture',adresse:'Rue de la Monnaie, 59000 Lille',status:'travaux',budget:0.8,progressEtudes:100,progressTravaux:65,type:'Urbanisme',date:'Juin 2026',eligible:true,_anomalies:[{code:'DONNEES_SURFACE',severity:'INFO',category:'DONNEES',label:'Surface végétalisée non renseignée',details:'Surface en m² à préciser.',suggestedAction:'Renseigner la surface'}]},
            {id:231,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Médiathèque extension',adresse:'10 cours des Alliés, 35000 Rennes',status:'travaux',budget:6.5,progressEtudes:100,progressTravaux:38,type:'Culture',date:'2027',eligible:true,_anomalies:[{code:'KPI_PATRIMOINE',severity:'BLOCKING',category:'KPI',label:'Données patrimoine non synchronisées',details:'DNU non mis à jour pour ce projet.',suggestedAction:'Mettre à jour le DNU'}]},
            {id:232,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Piscine Bréquigny',adresse:'Rue d\'Espagne, 35200 Rennes',status:'etude',budget:8.2,progressEtudes:42,progressTravaux:0,type:'Sport',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'AVP et APD en attente',details:'Phases conception non validées.',suggestedAction:'Valider les jalons conception'}]},
            {id:233,collectiviteId:'rennes',collectivite:'Ville de Rennes',name:'Eclairage public quartier Nord',adresse:'Boulevard de Verdun, 35000 Rennes',status:'travaux',budget:1.2,progressEtudes:100,progressTravaux:88,type:'Urbanisme',date:'Mai 2026',eligible:true,_anomalies:[{code:'FINANCE_CEE',severity:'INFO',category:'FINANCE',label:'Pré-certificat CEE en cours',details:'Pré-certificat en instruction.',suggestedAction:'Joindre le pré-certificat'}]},
            {id:234,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Rénovation thermique immeuble',adresse:'Rue Hébert, 38000 Grenoble',status:'travaux',budget:null,progressEtudes:100,progressTravaux:55,type:'Patrimoine',date:'Dec 2026',eligible:true,_anomalies:[{code:'MISSING_BUDGET',severity:'BLOCKING',category:'DONNEES',label:'Budget total manquant',details:'Budget consolidé requis.',suggestedAction:'Renseigner le budget'}]},
            {id:235,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'Téléphérique urbain',adresse:'Quai Stéphane-Jay, 38000 Grenoble',status:'etude',budget:14,progressEtudes:28,progressTravaux:0,type:'Transport',date:'2030',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Dossier technique incomplet',details:'Études géotechniques en cours.',suggestedAction:'Finaliser les études'}]},
            {id:236,collectiviteId:'grenoble',collectivite:'Ville de Grenoble',name:'PAC mairie annexe',adresse:'Place Verdun, 38000 Grenoble',status:'travaux',budget:0.9,progressEtudes:100,progressTravaux:72,type:'Énergie',date:'Sept 2026',eligible:true,_anomalies:[{code:'PIECES_FACTURE',severity:'INFO',category:'PIECES',label:'Facture partielle non jointe',details:'Facture acompte à archiver.',suggestedAction:'Archiver la facture'}]},
            {id:237,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Rénovation Opéra',adresse:'Place du Théâtre, 21000 Dijon',status:'travaux',budget:7.2,progressEtudes:100,progressTravaux:48,type:'Patrimoine',date:'2027',eligible:true,_anomalies:[{code:'FINANCE_DECLASSEMENT',severity:'BLOCKING',category:'FINANCE',label:'Déclassement budget non signé',details:'Avenant déclassement en attente.',suggestedAction:'Signer l\'avenant'}]},
            {id:238,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Collège hybride',adresse:'Rue de la Manutention, 21000 Dijon',status:'etude',budget:6.5,progressEtudes:38,progressTravaux:0,type:'Éducation',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Validation programme en attente',details:'Programme pédagogique non validé.',suggestedAction:'Valider le programme'}]},
            {id:239,collectiviteId:'dijon',collectivite:'Ville de Dijon',name:'Relamping LED écoles',adresse:'Rue Darcy, 21000 Dijon',status:'travaux',budget:0.6,progressEtudes:100,progressTravaux:95,type:'Éducation',date:'Mars 2026',eligible:true,_anomalies:[{code:'KPI_DECRET',severity:'INFO',category:'KPI',label:'Consommation de référence à mettre à jour',details:'Données consommations 2024 à saisir.',suggestedAction:'Mettre à jour les données'}]},
            {id:240,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Château restauration',adresse:'2 promenade du Bout-du-Monde, 49100 Angers',status:'travaux',budget:8.2,progressEtudes:100,progressTravaux:55,type:'Patrimoine',date:'Juin 2026',eligible:true,_anomalies:[{code:'DONNEES_MR',severity:'BLOCKING',category:'DONNEES',label:'Monument historique : avis ABF manquant',details:'Avis architecte Bâtiments France requis.',suggestedAction:'Joindre l\'avis ABF'}]},
            {id:241,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'Parc Terra Botanica',adresse:'Route d\'Épinard, 49100 Angers',status:'etude',budget:6,progressEtudes:48,progressTravaux:0,type:'Espaces verts',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Enquête publique non clôturée',details:'Clôture enquête en attente.',suggestedAction:'Clôturer l\'enquête'}]},
            {id:242,collectiviteId:'angers',collectivite:"Ville d'Angers",name:'LED bâtiments communaux',adresse:'Boulevard du Doyenné, 49100 Angers',status:'termine',budget:0.45,progressEtudes:100,progressTravaux:100,type:'Énergie',date:'Terminé',eligible:true,_anomalies:[{code:'PIECES_CEE',severity:'INFO',category:'PIECES',label:'Fiche standardisée à archiver',details:'Fiche CEE non jointe au dossier.',suggestedAction:'Archiver la fiche'}]},
            {id:243,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Arènes rénovation',adresse:'Boulevard des Arènes, 30000 Nîmes',status:'travaux',budget:15,progressEtudes:100,progressTravaux:35,type:'Patrimoine',date:'2028',eligible:true,_anomalies:[{code:'KPI_MATURITE',severity:'BLOCKING',category:'KPI',label:'Indicateur maturité incohérent',details:'Maturité déclarée ne correspond pas à l\'avancement.',suggestedAction:'Ajuster la maturité'}]},
            {id:244,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Gare multimodale',adresse:'Rue de la Gare, 30900 Nîmes',status:'etude',budget:7.8,progressEtudes:42,progressTravaux:0,type:'Transport',date:'2029',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'DCE non transmis',details:'Dossier consultation entrepreneurs en attente.',suggestedAction:'Transmettre le DCE'}]},
            {id:245,collectiviteId:'nimes',collectivite:'Ville de Nîmes',name:'Piscine Nemausa rénovation',adresse:'Boulevard des Arènes, 30000 Nîmes',status:'travaux',budget:2.5,progressEtudes:100,progressTravaux:62,type:'Sport',date:'Dec 2026',eligible:true,_anomalies:[{code:'FINANCE_ENGAGEMENT',severity:'INFO',category:'FINANCE',label:'Engagement financier à confirmer',details:'Convention Région à renouveler.',suggestedAction:'Renouveler la convention'}]},
            {id:246,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Contournement Est collèges',adresse:'RD 306, 69150 Décines',status:'travaux',budget:28,progressEtudes:100,progressTravaux:42,type:'Éducation',date:'2028',eligible:true,_anomalies:[{code:'DONNEES_MAITRISE',severity:'BLOCKING',category:'DONNEES',label:'Maître d\'ouvrage délégué non renseigné',details:'MOD requis pour ce projet.',suggestedAction:'Renseigner le MOD'}]},
            {id:247,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Fibre zones blanches',adresse:'69440 Mornant',status:'etude',budget:18,progressEtudes:35,progressTravaux:0,type:'Numérique',date:'2030',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Validation schéma directeur',details:'Schéma directeur en cours de validation.',suggestedAction:'Valider le schéma'}]},
            {id:248,collectiviteId:'rhone',collectivite:'Département du Rhône',name:'Maison de santé',adresse:'69430 Beaujeu',status:'travaux',budget:2.5,progressEtudes:100,progressTravaux:78,type:'Santé',date:'Juin 2026',eligible:true,_anomalies:[{code:'PIECES_CONVENTION',severity:'INFO',category:'PIECES',label:'Convention ARS à archiver',details:'Convention avec ARS non jointe.',suggestedAction:'Joindre la convention'}]},
            {id:249,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Plan vélo extension',adresse:'33140 Villenave-d\'Ornon',status:'travaux',budget:22,progressEtudes:100,progressTravaux:35,type:'Mobilité',date:'2028',eligible:true,_anomalies:[{code:'FINANCE_EUROPE',severity:'BLOCKING',category:'FINANCE',label:'Subvention FEDER non acquittée',details:'Demande d\'acompte FEDER en attente.',suggestedAction:'Finaliser la demande FEDER'}]},
            {id:250,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'EHPAD rénovation',adresse:'33400 Talence',status:'etude',budget:18,progressEtudes:48,progressTravaux:0,type:'Santé',date:'2030',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Validation ARS en attente',details:'Avis ARS requis avant lancement.',suggestedAction:'Obtenir l\'avis ARS'}]},
            {id:251,collectiviteId:'gironde',collectivite:'Département de la Gironde',name:'Collèges énergie positive',adresse:'33700 Mérignac',status:'travaux',budget:28,progressEtudes:100,progressTravaux:62,type:'Éducation',date:'2027',eligible:true,_anomalies:[{code:'KPI_ENR',severity:'INFO',category:'KPI',label:'Production ENR à renseigner',details:'Production solaire estimée non saisie.',suggestedAction:'Saisir la production'}]},
            {id:252,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Route littorale',adresse:'RD 559, 13600 La Ciotat',status:'travaux',budget:42,progressEtudes:100,progressTravaux:55,type:'Infrastructure',date:'2028',eligible:true,_anomalies:[{code:'PIECES_ENVIRONNEMENT',severity:'BLOCKING',category:'PIECES',label:'Étude d\'impact manquante',details:'Étude impact environnement requis.',suggestedAction:'Joindre l\'étude d\'impact'}]},
            {id:253,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Ports de pêche',adresse:'13002 Marseille',status:'etude',budget:18,progressEtudes:62,progressTravaux:0,type:'Économie',date:'2027',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Enquête commissaire enquêteur',details:'Rapport CE non rendu.',suggestedAction:'Obtenir le rapport CE'}]},
            {id:254,collectiviteId:'bdr',collectivite:'Département des Bouches-du-Rhône',name:'Campus santé',adresse:'13015 Marseille',status:'travaux',budget:65,progressEtudes:100,progressTravaux:28,type:'Santé',date:'2032',eligible:true,_anomalies:[{code:'DONNEES_PARTENAIRES',severity:'INFO',category:'DONNEES',label:'Partenaires financeurs à compléter',details:'Liste des financeurs incomplète.',suggestedAction:'Compléter les financeurs'}]},
            {id:255,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'TER nouvelle génération',adresse:'Gare Part-Dieu, 69003 Lyon',status:'travaux',budget:250,progressEtudes:100,progressTravaux:38,type:'Transport',date:'2029',eligible:true,_anomalies:[{code:'FINANCE_CONTRAT',severity:'BLOCKING',category:'FINANCE',label:'Contrat État-Région non signé',details:'Avenant CPER en attente de signature.',suggestedAction:'Signer l\'avenant CPER'}]},
            {id:256,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Lycées énergie positive',adresse:'63000 Clermont-Ferrand',status:'etude',budget:95,progressEtudes:48,progressTravaux:0,type:'Éducation',date:'2028',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Validation académie',details:'Validation rectorat en attente.',suggestedAction:'Obtenir la validation'}]},
            {id:257,collectiviteId:'aura',collectivite:'Région Auvergne-Rhône-Alpes',name:'Plan hydrogène',adresse:'38000 Grenoble',status:'travaux',budget:85,progressEtudes:100,progressTravaux:22,type:'Énergie',date:'2032',eligible:true,_anomalies:[{code:'KPI_EMISSION',severity:'INFO',category:'KPI',label:'Émissions évitées à renseigner',details:'Bilan carbone post-projet à saisir.',suggestedAction:'Saisir le bilan'}]},
            {id:258,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'LGV extension',adresse:'Gare Saint-Jean, 33000 Bordeaux',status:'etude',budget:450,progressEtudes:22,progressTravaux:0,type:'Transport',date:'2032',eligible:true,_anomalies:[{code:'DONNEES_CHIFFRAGE',severity:'BLOCKING',category:'DONNEES',label:'Chiffrage prévisionnel obsolète',details:'Chiffrage 2022 à actualiser.',suggestedAction:'Actualiser le chiffrage'}]},
            {id:259,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Campus numérique',adresse:'33400 Talence',status:'travaux',budget:75,progressEtudes:100,progressTravaux:45,type:'Numérique',date:'2028',eligible:true,_anomalies:[{code:'JALON_PENDING',severity:'BLOCKING',category:'JALONS',label:'Réception partielle en attente',details:'OPR lot 1 non signé.',suggestedAction:'Signer l\'OPR'}]},
            {id:260,collectiviteId:'naquit',collectivite:'Région Nouvelle-Aquitaine',name:'Ports atlantique',adresse:'17000 La Rochelle',status:'travaux',budget:95,progressEtudes:100,progressTravaux:58,type:'Infrastructure',date:'2029',eligible:true,_anomalies:[{code:'PIECES_MARCHE',severity:'INFO',category:'PIECES',label:'Avenant marché à archiver',details:'Avenant n°3 non archivé.',suggestedAction:'Archiver l\'avenant'}]},
        ];

        let currentUserCollectivite = 'Ville de Lyon';


        // ======== COLCONNECT EVENT BUS ========
        // Petit gestionnaire d'événements interne pour notifications temps réel

        const ColConnectEvents = {
            listeners: {},

            on(event, handler) {
                if (!this.listeners[event]) this.listeners[event] = [];
                this.listeners[event].push(handler);
            },

            emit(event, data) {
                (this.listeners[event] || []).forEach(handler => handler(data));
            }
        };

        // ======== HIERARCHIE DES ROLES ET PERMISSIONS ========

        const RolesAccess = {
            superadmin: {
                niveau: 4,
                canView: ['*'],
                canManageUsers: true,
                canManageCollectivites: true,
                canManageCodes: true,
                canDelete: true,
                canIntervene: true,
                canExport: true
            },
            admin: {
                niveau: 3,
                canView: ['dashboard', 'patrimoine', 'projets', 'catalogue', 'administration', 'priv-patrimoine', 'priv-projets', 'priv-collectivite', 'priv-administration', 'validation-mensuelle', 'espace-financeur', 'carte-globale', 'detail'],
                canManageUsers: true,
                canManageCollectivites: true,
                canDelete: false,
                canIntervene: true,
                canExport: true
            },
            collectivite: {
                niveau: 2,
                canView: ['dashboard', 'patrimoine', 'projets', 'espace-prive', 'priv-patrimoine', 'priv-projets', 'priv-collectivite', 'validation-mensuelle'],
                canManageUsers: false,
                canManageCollectivites: false,
                canDelete: false,
                canIntervene: false,
                canExport: true
            },
            financeur: {
                niveau: 2,
                canView: ['dashboard', 'espace-financeur', 'detail', 'projets', 'carte-globale'],
                canManageUsers: false,
                canManageCollectivites: false,
                canDelete: false,
                canIntervene: false,
                canExport: true,
                canValidateDocuments: true
            },
        };

        // ======== MOCK API COLCONNECT (Simulation REST) ========
        // Simule un micro-serveur d'API utilisant localStorage

        const MockAPI = {
            // Lecture : GET
            async get(resource) {
                const data = JSON.parse(localStorage.getItem(resource) || '[]');
                console.log(`[MockAPI] GET → ${resource} (${data.length} éléments)`);
                await delay(200);
                return { status: 200, data };
            },

            // Ajout : POST
            async post(resource, payload) {
                const data = JSON.parse(localStorage.getItem(resource) || '[]');
                data.push(payload);
                localStorage.setItem(resource, JSON.stringify(data));
                console.log(`[MockAPI] POST → ${resource}`, payload);
                await delay(150);
                ColConnectEvents.emit(`${resource}:created`, payload); // 🔔 Notification
                return { status: 201, data: payload };
            },

            // Mise à jour : PUT
            async put(resource, id, payload) {
                const data = JSON.parse(localStorage.getItem(resource) || '[]');
                const index = data.findIndex(item => item.id === id);
                if (index !== -1) {
                    data[index] = { ...data[index], ...payload };
                    localStorage.setItem(resource, JSON.stringify(data));
                }
                console.log(`[MockAPI] PUT → ${resource}/${id}`, payload);
                await delay(200);
                return { status: 200, data: data[index] };
            },

            // Suppression : DELETE
            async delete(resource, filterFn) {
                const data = JSON.parse(localStorage.getItem(resource) || '[]');
                const toDelete = data.find(filterFn);
                const newData = data.filter(item => !filterFn(item));
                localStorage.setItem(resource, JSON.stringify(newData));
                console.log(`[MockAPI] DELETE → ${resource}`);
                await delay(150);
                ColConnectEvents.emit(`${resource}:deleted`, toDelete); // 🔔 Notification
                return { status: 204 };
            }
        };

        // Petite latence simulée (réalisme serveur)
        function delay(ms) {
            return new Promise(res => setTimeout(res, ms));
        }

        // Capitalisation helper
        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // ======== INTERCEPTION FETCH() : MockAPI ou API réelle ========
        const originalFetch = window.fetch;
        window.fetch = async function(url, options) {
            options = options || {};
            var apiBase = (window.__CC_API_BASE__ || '').replace(/\/$/, '');
            var prefix = window.__CC_API_PREFIX__ || '/api/v1';

            // Mode API réelle : forward vers l'API avec Bearer token
            if (window.__CC_USE_REAL_API__) {
                var match = url.match(/\/api\/(.+)/);
                if (match) {
                    var base = apiBase || (typeof window !== 'undefined' && window.location ? window.location.origin : '');
                    var path = (prefix + '/' + match[1]).replace(/\/+/g, '/');
                    var fullUrl = base ? (base.replace(/\/$/, '') + path) : path;
                    var opts = { method: options.method || 'GET', headers: options.headers || {} };
                    if (opts.method !== 'GET' && options.body) opts.body = options.body;
                    if (typeof opts.headers === 'object' && !(opts.headers instanceof Headers)) {
                        opts.headers = new Headers(opts.headers);
                    }
                    var token = localStorage.getItem('colconnectToken') || (typeof currentUser !== 'undefined' && currentUser && currentUser.accessToken);
                    if (token) opts.headers.set('Authorization', 'Bearer ' + token);
                    if (!opts.headers.has('Content-Type') && options.body) opts.headers.set('Content-Type', 'application/json');
                    return originalFetch(fullUrl, opts);
                }
            }

            // Mode Mock : interception /api/*
            var matchMock = url.match(/\/api\/(.+)/);
            if (!matchMock) return originalFetch(url, options);

            var resource = matchMock[1];
            var resourceKey = 'colconnect' + capitalize(resource);

            if (options.method === 'POST') {
                var body = JSON.parse(options.body || '{}');
                return MockAPI.post(resourceKey, body);
            }
            if (options.method === 'PUT') {
                var bodyPut = JSON.parse(options.body || '{}');
                return MockAPI.put(resourceKey, bodyPut.id, bodyPut);
            }
            if (options.method === 'DELETE') {
                var bodyDel = JSON.parse(options.body || '{}');
                return MockAPI.delete(resourceKey, function(r) { return r.id === bodyDel.id; });
            }
            return MockAPI.get(resourceKey);
        };

        // ========================
        // BASE DE DONNÉES UTILISATEURS/COLLECTIVITÉS
        // ========================
        const usersDatabase = {
            // Format: "identifiant": { password: "...", collectivite: "...", collectiviteId: "...", role: "..." }
            "superadmin": { password: "superadmin", collectivite: "Toutes les collectivités", collectiviteId: "all", role: "superadmin" },
            "admin": { password: "admin", collectivite: "Administration Centrale", collectiviteId: "central", role: "superadmin" },
            // Collectivités : identifiant = id (ex. lyon, paris) • mot de passe = 1234 pour tous
            "lyon": { password: "1234", collectivite: "Ville de Lyon", collectiviteId: "lyon", role: "admin" },
            "marseille": { password: "1234", collectivite: "Ville de Marseille", collectiviteId: "marseille", role: "admin" },
            "paris": { password: "1234", collectivite: "Ville de Paris", collectiviteId: "paris", role: "admin" },
            "bordeaux": { password: "1234", collectivite: "Ville de Bordeaux", collectiviteId: "bordeaux", role: "admin" },
            "toulouse": { password: "1234", collectivite: "Ville de Toulouse", collectiviteId: "toulouse", role: "admin" },
            "nantes": { password: "1234", collectivite: "Ville de Nantes", collectiviteId: "nantes", role: "admin" },
            "nice": { password: "1234", collectivite: "Ville de Nice", collectiviteId: "nice", role: "collectivite" },
            "strasbourg": { password: "1234", collectivite: "Ville de Strasbourg", collectiviteId: "strasbourg", role: "collectivite" },
            "montpellier": { password: "1234", collectivite: "Ville de Montpellier", collectiviteId: "montpellier", role: "collectivite" },
            "lille": { password: "1234", collectivite: "Ville de Lille", collectiviteId: "lille", role: "collectivite" },
            "rennes": { password: "1234", collectivite: "Ville de Rennes", collectiviteId: "rennes", role: "collectivite" },
            "grenoble": { password: "1234", collectivite: "Ville de Grenoble", collectiviteId: "grenoble", role: "collectivite" },
            "dijon": { password: "1234", collectivite: "Ville de Dijon", collectiviteId: "dijon", role: "admin" },
            "adam2026": { password: "1234", collectivite: "Ville de Dijon", collectiviteId: "dijon", role: "collectivite" },
            "angers": { password: "1234", collectivite: "Ville d'Angers", collectiviteId: "angers", role: "collectivite" },
            "nimes": { password: "1234", collectivite: "Ville de Nîmes", collectiviteId: "nimes", role: "collectivite" },
            "rhone": { password: "1234", collectivite: "Département du Rhône", collectiviteId: "rhone", role: "collectivite" },
            "gironde": { password: "1234", collectivite: "Département de la Gironde", collectiviteId: "gironde", role: "collectivite" },
            "bdr": { password: "1234", collectivite: "Département des Bouches-du-Rhône", collectiviteId: "bdr", role: "collectivite" },
            "aura": { password: "1234", collectivite: "Région Auvergne-Rhône-Alpes", collectiviteId: "aura", role: "collectivite" },
            "naquit": { password: "1234", collectivite: "Région Nouvelle-Aquitaine", collectiviteId: "naquit", role: "collectivite" },
            "demo": { password: "demo", collectivite: "Ville de Lyon", collectiviteId: "lyon", role: "visiteur" }
        };

        // ========================================
        // GESTION UTILISATEUR ET ROLES
        // ========================================

        // ======== MATRICE DES DROITS =========
        // Cette table définit ce que chaque rôle peut faire
        const rolesPermissions = {
            visiteur: {
                canView: ['dashboard', 'catalogue', 'patrimoine', 'projets', 'search'],
                canEdit: [],
                canValidate: [],
                canExport: ['dashboard', 'catalogue']
            },
            collectivite: {
                canView: ['dashboard', 'catalogue', 'patrimoine', 'projets', 'espace-prive', 'search'],
                canEdit: [],
                canValidate: ['projets'],
                canExport: ['patrimoine', 'projets']
            },
            financeur: {
                canView: ['dashboard', 'espace-financeur', 'detail', 'projets', 'carte-globale', 'catalogue'],
                canEdit: [],
                canValidate: ['documents'],
                canExport: ['espace-financeur', 'projets'],
                canValidateDocuments: true
            },
            admin: {
                canView: ['*'],
                canEdit: ['*'],
                canValidate: ['*'],
                canExport: ['*']
            },
            superadmin: {
                canView: ['*'],
                canEdit: ['*'],
                canValidate: ['*'],
                canExport: ['*'],
                canManageUsers: true,
                canManageCollectivites: true,
                canDelete: true
            }
        };

        // Simulation de session utilisateur
        let currentUser = null;

        // Sélecteurs utiles
        const overlay = document.getElementById('loginOverlay');
        const btnLogin = document.getElementById('loginSubmit');
        // Connexion gérée par onclick="enterPlatform()" qui appelle handleLogin (évite double appel)

        function handleLogin() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value;
            const role = document.getElementById('loginRole').value;

            if (!username) return alert("Veuillez entrer un login.");

            // Mode API réelle : appel POST /api/v1/auth/login
            if (window.__CC_USE_REAL_API__) {
                const apiBase = (window.__CC_API_BASE__ || '').replace(/\/$/, '');
                const prefix = window.__CC_API_PREFIX__ || '/api/v1';
                const url = apiBase + prefix + '/auth/login';
                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password || '' })
                }).then(function(r) {
                    if (!r.ok) return r.json().then(function(d) { throw new Error(d.detail || 'Erreur connexion'); });
                    return r.json();
                }).then(function(data) {
                    var u = data.user || {};
                    currentUser = {
                        id: u.id,
                        nom: u.nom || u.username || username,
                        username: (u.username || username).toLowerCase(),
                        role: u.role || 'collectivite',
                        niveau: RolesAccess[u.role || 'collectivite']?.niveau || 1,
                        collectivite: u.collectivite || u.collectiviteNom,
                        collectiviteId: u.collectiviteId || '',
                        dateConnexion: new Date().toLocaleString('fr-FR'),
                        accessToken: data.access_token
                    };
                    try { localStorage.setItem('colconnectToken', data.access_token || ''); } catch (e) {}
                    localStorage.setItem('colconnectUser', JSON.stringify(currentUser));
                    sessionStorage.setItem('colconnect_user', JSON.stringify(currentUser));
                    _finishLogin();
                }).catch(function(err) {
                    showLoginError(err.message || 'Login ou mot de passe incorrect.');
                });
                return;
            }

            // Mode Mock : vérification usersDatabase
            const userDB = usersDatabase[username.toLowerCase()];

            if (userDB && userDB.password === password) {
                const userRole = userDB.role || role;
                currentUser = {
                    nom: username,
                    username: username.toLowerCase(),
                    role: userRole,
                    niveau: RolesAccess[userRole]?.niveau || 1,
                    collectivite: userDB.collectivite,
                    collectiviteId: userDB.collectiviteId,
                    dateConnexion: new Date().toLocaleString('fr-FR'),
                };
            } else if (!password) {
                currentUser = {
                    nom: username || 'Utilisateur',
                    username: username.toLowerCase() || 'demo',
                    role: role,
                    niveau: RolesAccess[role]?.niveau || 1,
                    collectivite: 'Mode Démo',
                    collectiviteId: 'demo',
                    dateConnexion: new Date().toLocaleString('fr-FR'),
                };
            } else {
                return showLoginError('Login ou mot de passe incorrect.');
            }

            localStorage.setItem('colconnectUser', JSON.stringify(currentUser));
            sessionStorage.setItem('colconnect_user', JSON.stringify(currentUser));
            _finishLogin();
        }

        function _finishLogin() {
            currentUserCollectivite = currentUser.collectivite || 'Ville de Lyon';
            applyUserPermissions();
            applyRoleRestrictions(currentUser);
            updateUserBadge();
            document.body.dataset.role = currentUser.role;
            console.log('[ColConnect] data-role défini à:', currentUser.role);
            overlay.classList.add('hidden');
            logAction("Connexion réussie", "Authentification", "login");
            showToast('Bienvenue ' + currentUser.nom, 'Connecté en tant que ' + currentUser.role);
            if (currentUser.role === 'financeur') {
                setTimeout(function() { navigateTo('espace-financeur'); }, 300);
            } else {
                try {
                    if (sessionStorage.getItem('colconnect_redirect_private') === '1') {
                        sessionStorage.removeItem('colconnect_redirect_private');
                        setTimeout(enterPrivateMode, 400);
                    }
                } catch (e) {}
            }
            setTimeout(checkCollectiviteOwner, 500);
        }

        // Fonction legacy pour compatibilité avec onclick
        function enterPlatform() {
            handleLogin();
        }
        window.enterPlatform = enterPlatform;

        function showLoginError(message) {
            let errorEl = document.getElementById('loginError');
            if (!errorEl) {
                errorEl = document.createElement('div');
                errorEl.id = 'loginError';
                errorEl.style.cssText = 'background: rgba(153, 27, 27, 0.2); border: 1px solid var(--danger); color: #fca5a5; padding: 0.75rem 1rem; border-radius: 8px; margin-top: 1rem; font-size: 0.9rem;';
                document.querySelector('.login-card').appendChild(errorEl);
            }
            errorEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
            setTimeout(() => { if (errorEl) errorEl.remove(); }, 4000);
        }

        // Applique les permissions selon le rôle
        function applyUserPermissions() {
            const user = JSON.parse(localStorage.getItem('colconnectUser'));
            if (!user) return;

            const perms = rolesPermissions[user.role];

            // Masque les onglets non autorisés
            document.querySelectorAll('.nav-tab').forEach(tab => {
                const id = tab.dataset.section;
                const visible = perms.canView.includes('*') || perms.canView.includes(id);
                tab.style.display = visible ? '' : 'none';
            });

            // Masque les sections non autorisées par défaut
            document.querySelectorAll('.section').forEach(sec => {
                const id = sec.id;
                const visible = perms.canView.includes('*') || perms.canView.includes(id);
                if (!visible) sec.style.display = 'none';
            });

            // Header : nom de la collectivité uniquement (MAJUSCULES), sans rôle — égalité institutionnelle
            let userInfo = document.querySelector('#userInfo');
            if (!userInfo) {
                userInfo = document.createElement('div');
                userInfo.id = 'userInfo';
                userInfo.className = 'user-info';
                document.querySelector('.header-content').appendChild(userInfo);
            }
            const collectiviteHeader = (user.collectivite || user.nom || '').toString().trim().toUpperCase();
            userInfo.innerHTML = `<i class="fas fa-landmark" aria-hidden="true"></i> ${collectiviteHeader}`;

            // Active les contrôles d'action liés aux droits
            initPermissions(user);
        }

        // Initialise les permissions sur les boutons d'action
        function initPermissions(user) {
            const perms = rolesPermissions[user.role];

            // Édition restreinte : invisible et désactivée hors Administration (gouvernance)
            document.querySelectorAll('[data-action="edit"]').forEach(btn => {
                const allowed = perms.canEdit.includes('*') || perms.canEdit.includes(btn.dataset.section);
                btn.disabled = !allowed;
                btn.style.display = allowed ? '' : 'none';
                if (!allowed) btn.title = "Réservé à l'administrateur.";
            });

            // Validation restreinte
            document.querySelectorAll('[data-action="validate"]').forEach(btn => {
                const allowed = perms.canValidate.includes('*') || perms.canValidate.includes(btn.dataset.section);
                btn.disabled = !allowed;
                if (!allowed) btn.title = "Action réservée à l'administrateur ou à la collectivité.";
            });

            // Export restreint
            document.querySelectorAll('[data-action="export"]').forEach(btn => {
                const allowed = perms.canExport.includes('*') || perms.canExport.includes(btn.dataset.section);
                btn.style.display = allowed ? '' : 'none';
            });
        }

        // Fonction de journalisation des actions (améliorée)
        function logAction(action, section = '', actionType = 'custom') {
            const user = currentUser?.nom || 'Anonyme';
            const role = currentUser?.role || 'Inconnu';
            const logs = JSON.parse(localStorage.getItem('colconnectLogs') || '[]');
            logs.push({
                user,
                role,
                action,
                section,
                actionType,
                date: new Date().toLocaleString('fr-FR')
            });
            localStorage.setItem('colconnectLogs', JSON.stringify(logs));
            console.log(`[LOG] ${user} (${role}) → ${action} (${section})`);
        }

        // Enregistrement automatique des validations
        document.querySelectorAll('[data-action="validate"]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                logAction("Validation d'un projet", btn.dataset.section, 'validate');
            });
        });

        // Enregistrement des exports
        document.getElementById('exportPDF')?.addEventListener('click', () => logAction("Export PDF", "Patrimoine", "export"));
        document.getElementById('exportExcel')?.addEventListener('click', () => logAction("Export Excel", "Patrimoine", "export"));

        // Aligné v8 bis : toujours demander les identifiants
        function checkExistingSession() {
            localStorage.removeItem('colconnectUser');
            localStorage.removeItem('colconnectToken');
            currentUser = null;
        }

        // Déconnexion
        function logout() {
            currentUser = null;
            localStorage.removeItem('colconnectUser');
            localStorage.removeItem('colconnectToken');
            document.location.reload();
        }

        // Mode actuel : 'public' ou 'private'
        let currentMode = 'public';

        // Sections publiques et privées
        const publicSections = ['dashboard', 'search', 'projets', 'fiche', 'mes-projets', 'detail'];
        const privateSections = ['priv-collectivite', 'priv-projets', 'priv-patrimoine', 'priv-ficheBatiment', 'priv-catalogue', 'priv-administration', 'validation-mensuelle'];

        // Accéder à l'espace patrimoine de sa collectivité (aligné v8 bis)
        function accederMonEspace() {
            if (!currentUser) {
                try { sessionStorage.setItem('colconnect_redirect_private', '1'); } catch (e) {}
                var ov = overlay || document.getElementById('loginOverlay');
                if (ov) ov.classList.remove('hidden');
                if (typeof showToast === 'function') showToast('Connectez-vous pour accéder à votre espace', '');
                return;
            }
            if (!currentUser.collectiviteId && currentUser.collectivite) {
                currentUser.collectiviteId = (currentUser.collectivite || '').toString().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_-]/g, '') || 'default';
                try { localStorage.setItem('colconnectUser', JSON.stringify(currentUser)); } catch (e) {}
            }
            if (!currentUser.collectiviteId && !currentUser.collectivite) {
                try { sessionStorage.setItem('colconnect_redirect_private', '1'); } catch (e) {}
                var ov = overlay || document.getElementById('loginOverlay');
                if (ov) ov.classList.remove('hidden');
                if (typeof showToast === 'function') showToast('Connectez-vous pour accéder à votre espace', '');
                return;
            }

            // Basculer vers le mode privé
            enterPrivateMode();
        }
        window.accederMonEspace = accederMonEspace;

        // Mise à jour de la fiche collectivité selon l'utilisateur connecté (avant checkCollectiviteOwner)
        function updateCollectiviteFicheDisplay() {
            if (!currentUser) return;
            var name = currentUser.collectivite || 'Collectivité';
            var cid = (currentUser.collectiviteId || '').toString();
            if (typeof updateFicheCollectivite === 'function') updateFicheCollectivite(name);
            var collectiviteNameEl = document.getElementById('collectiviteName');
            var ficheNameEl = document.getElementById('ficheName');
            if (collectiviteNameEl) collectiviteNameEl.textContent = name;
            if (ficheNameEl) ficheNameEl.textContent = name;
            if (cid) document.body.dataset.collectiviteId = cid;
        }

        // Entrer dans la zone privée (Accéder à ma collectivité)
        function enterPrivateMode() {
            currentMode = 'private';
            document.documentElement.setAttribute('data-cc-private', '1');

            // Masquer toutes les sections publiques
            publicSections.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('active');
            });

            // Afficher la zone privée
            const privateZone = document.getElementById('private-zone');
            if (privateZone) {
                privateZone.style.display = 'block';
            }

            // Mettre à jour la fiche AVANT checkCollectiviteOwner (nom, département, population selon utilisateur)
            updateCollectiviteFicheDisplay();

            // Afficher la navigation privée
            showPrivateNav();

            // Naviguer vers la collectivité privée
            navigateTo('priv-collectivite');
            
            // Vérifier les permissions après navigation
            setTimeout(checkCollectiviteOwner, 300);
        }

        // Gouvernance : seul l'administrateur peut ouvrir les modales d'édition structurante
        function isAdmin() {
            return currentUser && (currentUser.role === 'admin' || currentUser.role === 'superadmin');
        }
        function toggleEditMode(moduleId) {
            if (!isAdmin()) return;
            var el = document.getElementById(moduleId);
            if (el) el.classList.toggle('edit-mode');
        }

        // ========================
        // FONCTIONS MODALES
        // ========================
        function openModal(modalId) {
            var modalesAdminOnly = ['collectiviteModal', 'teamModal', 'modifierBatimentChoiceModal', 'editFicheBatModal'];
            if (modalesAdminOnly.indexOf(modalId) !== -1 && !isAdmin()) return;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        }

        // Fermer modal en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.remove('open');
                document.body.style.overflow = '';
            }
        });

        // Retour à la zone publique
        function exitPrivateMode() {
            currentMode = 'public';
            document.documentElement.removeAttribute('data-cc-private');

            // Masquer la zone privée
            const privateZone = document.getElementById('private-zone');
            if (privateZone) {
                privateZone.style.display = 'none';
            }

            // Masquer toutes les sections privées
            privateSections.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('active');
            });

            // Afficher la navigation publique
            showPublicNav();

            // Retourner au dashboard
            navigateTo('dashboard');
        }

        // Afficher la navigation privée
        function showPrivateNav() {
            const navTabs = document.querySelector('.nav-tabs');
            if (navTabs) {
                navTabs.innerHTML = `
                    <button class="nav-tab" onclick="exitPrivateMode()" title="Retour à l'accueil public">
                        <i class="fas fa-arrow-left"></i><span>Retour à ma collectivité</span>
                    </button>
                    <button class="nav-tab active" onclick="navigateTo('priv-collectivite')">
                        <i class="fas fa-landmark"></i><span>Ma Collectivité</span>
                    </button>
                    <button class="nav-tab" onclick="navigateTo('priv-projets')">
                        <i class="fas fa-project-diagram"></i><span>Mes Projets</span>
                    </button>
                    <button class="nav-tab" onclick="navigateTo('priv-patrimoine')">
                        <i class="fas fa-building"></i><span>Mon Patrimoine</span>
                    </button>
                    <button class="nav-tab" onclick="navigateTo('priv-catalogue')">
                        <i class="fas fa-clipboard-check"></i><span>Catalogue</span>
                    </button>
                    <button class="nav-tab cc-nav-admin" onclick="navigateTo('priv-administration')">
                        <i class="fas fa-crown"></i><span>Administration</span>
                    </button>
                    <button class="nav-tab" onclick="logout()" style="margin-left: auto; color: #fca5a5;">
                        <i class="fas fa-sign-out-alt"></i><span>Déconnexion</span>
                    </button>
                `;
            }

            // Mettre à jour le sous-titre du logo
            const logoSubtitle = document.querySelector('.logo-subtitle');
            if (logoSubtitle && currentUser) {
                logoSubtitle.textContent = currentUser.collectivite;
            }
        }

        // Afficher la navigation publique (Accueil, Suivi, Carte — comme à l'arrivée)
        function showPublicNav() {
            const navTabs = document.querySelector('.nav-tabs');
            if (navTabs) {
                navTabs.innerHTML = `
                    <button class="nav-tab active" data-section="dashboard" onclick="navigateTo('dashboard')">
                        <i class="fas fa-home"></i><span>Accueil</span>
                    </button>
                    <button class="nav-tab" data-section="search" onclick="navigateTo('search')">
                        <i class="fas fa-search-location"></i><span>Recherche</span>
                    </button>
                    <button class="nav-tab" data-section="projets" onclick="navigateTo('projets')">
                        <i class="fas fa-tasks"></i><span>Projets</span>
                    </button>
                    <button class="nav-tab" data-section="detail" onclick="navigateTo('detail')">
                        <i class="fas fa-chart-line"></i><span>Suivi</span>
                    </button>
                    <button class="nav-tab" data-section="carte-globale" onclick="navigateTo('carte-globale')">
                        <i class="fas fa-map-marked-alt"></i><span>Carte</span>
                    </button>
                `;
            }

            // Remettre le sous-titre par défaut
            const logoSubtitle = document.querySelector('.logo-subtitle');
            if (logoSubtitle) {
                logoSubtitle.textContent = 'Pilotage Territorial';
            }
        }

        // Fonction logout
        function logout() {
            localStorage.removeItem('colconnect_user');
            localStorage.removeItem('colconnectUser');
            localStorage.removeItem('colconnectToken');
            currentUser = null;
            exitPrivateMode();
            location.reload();
        }

        // Initialisation au chargement du DOM
        document.addEventListener('DOMContentLoaded', function() {
            // Vérifier session existante
            checkExistingSession();

            // Allow Enter key to submit
            const loginPassword = document.getElementById('loginPassword');
            const loginUsername = document.getElementById('loginUsername');

            if (loginPassword) {
                loginPassword.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        enterPlatform();
                    }
                });
            }

            if (loginUsername) {
                loginUsername.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        document.getElementById('loginPassword').focus();
                    }
                });
            }
        });

        // ========================
        // DARK/LIGHT MODE - FORCÉ EN MODE SOMBRE
        // ========================
        // ColConnect utilise toujours le thème sombre institutionnel
        // Ne pas suivre les préférences système de l'appareil
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');

        // ========================
        // NAVIGATION
        // ========================

        function navigateTo(sectionId) {
            if (sectionId === 'detail' && typeof currentMode !== 'undefined' && currentMode === 'public') return;
            if (!sectionId) return;
            var navTabs = document.querySelectorAll('.nav-tab');
            var sections = document.querySelectorAll('.section');
            navTabs.forEach(function(t) { t.classList.remove('active'); });
            sections.forEach(function(s) { s.classList.remove('active'); });

            var targetTab = document.querySelector('[data-section="' + sectionId + '"]');
            var targetSection = document.getElementById(sectionId);

            if (targetTab) targetTab.classList.add('active');
            if (targetSection) targetSection.classList.add('active');

            // Initialize map if navigating to detail section
            if (sectionId === 'detail') {
                setTimeout(initMap, 100);
            }
            // Init validation mensuelle
            if (sectionId === 'validation-mensuelle') {
                setTimeout(recalculerValidationMensuelle, 50);
            }
            if (sectionId === 'projets') {
                setTimeout(function() {
                    if (typeof window.applyProjetsFiltersAndSearch === 'function') window.applyProjetsFiltersAndSearch();
                }, 50);
            }
            if (sectionId === 'search') {
                setTimeout(function() {
                    if (typeof window.applySearchFilter === 'function') window.applySearchFilter();
                }, 50);
            }
            // Tous mes projets (données Ma Collectivité)
            if (sectionId === 'priv-projets') {
                if (typeof loadPrivProjets === 'function') loadPrivProjets();
            }
            // Si on navigue vers mes-projets, mettre à jour les compteurs avec les projets de la collectivité
            if (sectionId === 'mes-projets') {
                if (Array.isArray(window.mesProjetsCourants) && window.mesProjetsCourants.length > 0) {
                    if (typeof updateProjetsFilterCounts === 'function') {
                        updateProjetsFilterCounts();
                    }
                }
            } else {
                // Réinitialiser mesProjetsCourants quand on quitte la page mes-projets
                window.mesProjetsCourants = [];
                // Remettre les compteurs sur tous les projets
                if (typeof updateProjetsFilterCounts === 'function') {
                    updateProjetsFilterCounts();
                }
            }
            // Patrimoine & Énergie : projets liés — rafraîchir la liste bâtiments pour refléter les modifs + analyse
            if (sectionId === 'priv-patrimoine') {
                if (typeof renderBatiments === 'function') renderBatiments();
                if (typeof loadPatrimoineProjets === 'function') loadPatrimoineProjets();
                // Restaurer l'onglet actif
                setTimeout(() => {
                    const savedTab = sessionStorage.getItem('patrimoineActiveTab') || 'patrimoine';
                    if (typeof setPatrimoineTab === 'function') {
                        setPatrimoineTab(savedTab);
                    }
                }, 200);
            }
            // Masquer les informations sensibles si l'utilisateur n'est pas le propriétaire de la fiche
            if (sectionId === 'priv-collectivite' || sectionId === 'fiche') {
                setTimeout(checkCollectiviteOwner, 200);
                // Double vérification après un délai supplémentaire pour s'assurer que le DOM est mis à jour
                setTimeout(checkCollectiviteOwner, 500);
            }
        }

        // Vérifie si l'utilisateur est le propriétaire de la fiche collectivité
        function checkCollectiviteOwner() {
            const currentUser = JSON.parse(localStorage.getItem('colconnectUser') || sessionStorage.getItem('colconnect_user') || 'null');
            if (!currentUser) {
                // Si pas d'utilisateur connecté, masquer les éléments
                const ownerOnlyElements = document.querySelectorAll('.validation-info-owner-only, .owner-only-content');
                ownerOnlyElements.forEach(el => {
                    el.style.display = 'none';
                });
                return;
            }

            // Récupérer le nom de la collectivité de la fiche affichée (vérifier les deux éléments possibles)
            const ficheNameEl = document.getElementById('ficheName');
            const collectiviteNameEl = document.getElementById('collectiviteName');
            const ficheCollectiviteName = (ficheNameEl?.textContent?.trim() || collectiviteNameEl?.textContent?.trim() || '').trim();
            const userCollectivite = currentUser.collectivite || '';
            
            // Vérifier si l'utilisateur est le propriétaire (comparaison insensible à la casse)
            const normalizeName = (name) => {
                if (!name) return '';
                let normalized = name.toLowerCase().trim();
                // Retirer les préfixes communs
                normalized = normalized.replace(/^(ville de|métropole de|département (du|de|des)|région|conseil (départemental|régional) (du|de|des)?)\s+/i, '');
                return normalized.trim();
            };
            
            const normalizedFiche = normalizeName(ficheCollectiviteName);
            const normalizedUser = normalizeName(userCollectivite);
            const userCollectiviteId = (currentUser.collectiviteId || '').toString().toLowerCase();
            const ficheCollectiviteId = (document.body.dataset.collectiviteId || '').toString().toLowerCase();
            const matchByName = normalizedFiche && normalizedUser && normalizedFiche === normalizedUser;
            const matchById = userCollectiviteId && ficheCollectiviteId && userCollectiviteId === ficheCollectiviteId;
            const isOwner = matchByName || matchById;

            // Masquer les éléments si l'utilisateur n'est pas le propriétaire
            const ownerOnlyElements = document.querySelectorAll('.validation-info-owner-only, .owner-only-content');
            ownerOnlyElements.forEach(el => {
                el.style.display = isOwner ? '' : 'none';
            });
            
            console.log('[ColConnect] Vérification propriétaire:', {
                fiche: ficheCollectiviteName,
                user: userCollectivite,
                normalizedFiche: normalizedFiche,
                normalizedUser: normalizedUser,
                isOwner: isOwner
            });
            if (typeof refreshDashboardElu === 'function') refreshDashboardElu();
        }

        // Appeler la fonction au chargement de la page si on est sur la section priv-collectivite
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                const activeSection = document.querySelector('.section.active');
                if (activeSection && (activeSection.id === 'priv-collectivite' || activeSection.id === 'fiche')) {
                    checkCollectiviteOwner();
                }
            }, 500);
            
            // Observer les changements dans le nom de la fiche pour mettre à jour les permissions
            const ficheNameEl = document.getElementById('ficheName');
            const collectiviteNameEl = document.getElementById('collectiviteName');
            
            if (ficheNameEl) {
                const observer1 = new MutationObserver(function() {
                    setTimeout(checkCollectiviteOwner, 150);
                });
                observer1.observe(ficheNameEl, { childList: true, characterData: true, subtree: true });
            }
            
            if (collectiviteNameEl) {
                const observer2 = new MutationObserver(function() {
                    setTimeout(checkCollectiviteOwner, 150);
                });
                observer2.observe(collectiviteNameEl, { childList: true, characterData: true, subtree: true });
            }
        });

        document.querySelectorAll('.nav-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                var sid = tab.dataset.section;
                if (sid) navigateTo(sid);
            });
        });

        // Quick actions (uniquement si data-action : les cartes avec onclick propre ne déclenchent pas navigateTo(undefined))
        document.querySelectorAll('.action-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.action) navigateTo(card.dataset.action);
            });
        });

        // ========================
        // MAP INITIALIZATION
        // ========================
        let map = null;

        function initMap() {
    if (typeof L === 'undefined') { console.warn('Leaflet (L) non chargé — carte désactivée.'); return; }

            if (map) {
                map.remove();
            }

            // Coordinates for Lyon Confluence (the project location)
            const confluenceCoords = [45.7380, 4.8200];

            map = L.map('project-map').setView(confluenceCoords, 16);

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add a marker for the project location
            const projectIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: linear-gradient(135deg, #c9a227, #d4b545); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(201, 162, 39, 0.5); border: 3px solid white;"><i class="fas fa-school" style="color: #0d1b2a; font-size: 16px;"></i></div>',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            L.marker(confluenceCoords, { icon: projectIcon })
                .addTo(map)
                .bindPopup('<strong>Nouveau groupe scolaire Confluence</strong><br>Chantier en cours - Phase travaux');

            // Add a red zone polygon for the construction area
            const constructionZone = L.polygon([
                [45.7390, 4.8180],
                [45.7395, 4.8220],
                [45.7370, 4.8225],
                [45.7365, 4.8185]
            ], {
                color: '#991b1b',
                fillColor: '#991b1b',
                fillOpacity: 0.3,
                weight: 2,
                dashArray: '5, 10'
            }).addTo(map);

            constructionZone.bindPopup('<strong>Zone de chantier</strong><br>Périmètre sécurisé');

            // Force map to recalculate size
            setTimeout(() => {
                map.invalidateSize();
            }, 200);
        }

        // ========================
        // SEARCH FUNCTIONALITY
        // ========================
                const collectivites = [
            { name: 'Ville de Lyon', type: 'commune', typeLabel: 'Commune', departement: 'Rhône (69)', projets: 23, population: '522 250 hab.', derniereValidation: '15 Jan 2025', icon: 'landmark', lat: 45.7640, lon: 4.8357 },
            { name: 'Ville de Paris', type: 'commune', typeLabel: 'Commune', departement: 'Paris (75)', projets: 156, population: '2,1 M hab.', derniereValidation: '12 Jan 2025', icon: 'landmark', lat: 48.8566, lon: 2.3522 },
            { name: 'Ville de Marseille', type: 'commune', typeLabel: 'Commune', departement: 'Bouches-du-Rhône (13)', projets: 89, population: '870 000 hab.', derniereValidation: '10 Jan 2025', icon: 'landmark', lat: 43.2965, lon: 5.3698 },
            { name: 'Ville de Bordeaux', type: 'commune', typeLabel: 'Commune', departement: 'Gironde (33)', projets: 67, population: '260 000 hab.', derniereValidation: '18 Déc 2024', icon: 'landmark', lat: 44.8378, lon: -0.5792 },
            { name: 'Ville de Nantes', type: 'commune', typeLabel: 'Commune', departement: 'Loire-Atlantique (44)', projets: 54, population: '320 000 hab.', derniereValidation: '20 Déc 2024', icon: 'landmark', lat: 47.2184, lon: -1.5536 },
            { name: 'Ville de Toulouse', type: 'commune', typeLabel: 'Commune', departement: 'Haute-Garonne (31)', projets: 78, population: '490 000 hab.', derniereValidation: '15 Déc 2024', icon: 'landmark', lat: 43.6047, lon: 1.4442 },
            { name: 'Ville de Nice', type: 'commune', typeLabel: 'Commune', departement: 'Alpes-Maritimes (06)', projets: 45, population: '340 000 hab.', derniereValidation: '22 Déc 2024', icon: 'landmark', lat: 43.7102, lon: 7.2620 },
            { name: 'Ville de Strasbourg', type: 'commune', typeLabel: 'Commune', departement: 'Bas-Rhin (67)', projets: 38, population: '285 000 hab.', derniereValidation: '18 Déc 2024', icon: 'landmark', lat: 48.5734, lon: 7.7521 },
            { name: 'Ville de Montpellier', type: 'commune', typeLabel: 'Commune', departement: 'Hérault (34)', projets: 42, population: '295 000 hab.', derniereValidation: '12 Déc 2024', icon: 'landmark', lat: 43.6108, lon: 3.8767 },
            { name: 'Ville de Lille', type: 'commune', typeLabel: 'Commune', departement: 'Nord (59)', projets: 51, population: '233 000 hab.', derniereValidation: '20 Déc 2024', icon: 'landmark', lat: 50.6292, lon: 3.0573 },
            { name: 'Ville de Rennes', type: 'commune', typeLabel: 'Commune', departement: 'Ille-et-Vilaine (35)', projets: 36, population: '220 000 hab.', derniereValidation: '16 Déc 2024', icon: 'landmark', lat: 48.1173, lon: -1.6778 },
            { name: 'Ville de Grenoble', type: 'commune', typeLabel: 'Commune', departement: 'Isère (38)', projets: 34, population: '158 000 hab.', derniereValidation: '10 Déc 2024', icon: 'landmark', lat: 45.1885, lon: 5.7245 },
            { name: 'Ville de Dijon', type: 'commune', typeLabel: 'Commune', departement: 'Côte-d\'Or (21)', projets: 28, population: '156 000 hab.', derniereValidation: '18 Déc 2024', icon: 'landmark', lat: 47.3220, lon: 5.0415 },
            { name: "Ville d'Angers", type: 'commune', typeLabel: 'Commune', departement: 'Maine-et-Loire (49)', projets: 25, population: '155 000 hab.', derniereValidation: '14 Déc 2024', icon: 'landmark', lat: 47.4784, lon: -0.5632 },
            { name: 'Ville de Nîmes', type: 'commune', typeLabel: 'Commune', departement: 'Gard (30)', projets: 31, population: '151 000 hab.', derniereValidation: '19 Déc 2024', icon: 'landmark', lat: 43.8367, lon: 4.3601 },
            { name: 'Département du Rhône', type: 'departement', typeLabel: 'Département', departement: 'Rhône (69)', projets: 45, population: '1,9 M hab.', derniereValidation: '15 Jan 2025', icon: 'map', lat: 45.7640, lon: 4.8357 },
            { name: 'Département de la Gironde', type: 'departement', typeLabel: 'Département', departement: 'Gironde (33)', projets: 78, population: '1,6 M hab.', derniereValidation: '18 Déc 2024', icon: 'map', lat: 44.8378, lon: -0.5792 },
            { name: 'Département des Bouches-du-Rhône', type: 'departement', typeLabel: 'Département', departement: 'Bouches-du-Rhône (13)', projets: 92, population: '2,0 M hab.', derniereValidation: '10 Jan 2025', icon: 'map', lat: 43.2965, lon: 5.3698 },
            { name: 'Région Auvergne-Rhône-Alpes', type: 'region', typeLabel: 'Région', departement: 'Multi-départements', projets: 234, population: '8,1 M hab.', derniereValidation: '15 Jan 2025', icon: 'map-marked-alt', lat: 45.7640, lon: 4.8357 },
            { name: 'Région Nouvelle-Aquitaine', type: 'region', typeLabel: 'Région', departement: 'Multi-départements', projets: 189, population: '6,0 M hab.', derniereValidation: '12 Déc 2024', icon: 'map-marked-alt', lat: 44.8378, lon: -0.5792 },
        ];

        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        function renderCollectivites(data) {
            var el = searchResults || document.getElementById('searchResults');
            if (!el) return;
            var list = Array.isArray(data) ? data : [];
            el.innerHTML = list.map(function(c) {
                var nameEsc = (c.name || '').replace(/'/g, "\\'");
                var typeLabel = c.typeLabel || (c.type === 'commune' ? 'Commune' : c.type === 'departement' ? 'Département' : c.type === 'region' ? 'Région' : c.type) || '';
                return '<div class="collectivite-card" onclick="selectCollectivite(\'' + nameEsc + '\')">' +
                    '<div class="collectivite-avatar"><i class="fas fa-' + (c.icon || 'landmark') + '"></i></div>' +
                    '<div class="collectivite-info">' +
                    '<div class="collectivite-name">' + (c.name || '') + '</div>' +
                    '<div class="collectivite-type">' + typeLabel + '</div>' +
                    '<div class="collectivite-stats">' +
                    '<span class="collectivite-stat"><i class="fas fa-folder"></i> ' + (c.projets != null ? c.projets + ' projets' : '—') + '</span>' +
                    '<span class="collectivite-stat"><i class="fas fa-users"></i> ' + (c.population || '—') + '</span>' +
                    '</div></div>' +
                    '<i class="fas fa-chevron-right collectivite-arrow"></i></div>';
            }).join('');
        }

        function getCollectiviteInfos(name) {
            if (!name) return null;
            var n = String(name).trim();
            return collectivites.find(function(c) { return c.name === n || (c.name && c.name.trim() === n); }) || null;
        }
        function updateFicheCollectivite(name) {
            var infos = getCollectiviteInfos(name);
            var nom = infos ? infos.name : (name || 'Collectivité');
            var departement = infos ? (infos.departement || '—') : '—';
            var population = infos ? (infos.population || '—') : '—';
            var projetsCount = infos ? (infos.projets != null ? infos.projets + ' projets' : '—') : '—';
            var dateValidation = infos ? (infos.derniereValidation || '—') : '—';
            var el;
            if (el = document.getElementById('ficheName')) el.textContent = nom;
            if (el = document.getElementById('collectiviteName')) el.textContent = nom;
            if (el = document.getElementById('collectiviteDept')) el.textContent = departement;
            if (el = document.getElementById('collectivitePop')) el.textContent = population;
            if (el = document.getElementById('collectiviteProjetsCount')) el.textContent = projetsCount;
            if (el = document.getElementById('collectiviteValidationDate')) el.textContent = dateValidation;
            if (el = document.getElementById('fichePop')) el.textContent = population;
            if (el = document.getElementById('ficheDept')) el.textContent = departement;
            if (el = document.getElementById('ficheProjetsCount')) el.textContent = projetsCount;
            if (el = document.getElementById('ficheValidationDate')) el.textContent = dateValidation;
            var typeLabel = infos ? (infos.typeLabel || (infos.type === 'commune' ? 'Commune' : infos.type === 'departement' ? 'Département' : infos.type === 'region' ? 'Région' : '')) : '';
            if (typeLabel && (el = document.getElementById('collectiviteType'))) el.textContent = typeLabel;
            var ficheTypeBadge = document.querySelector('#fiche .fiche-type-badge');
            if (typeLabel && ficheTypeBadge) ficheTypeBadge.textContent = typeLabel;
        }

        var currentSearchFilter = 'all';
        function applySearchFilter() {
            var query = (searchInput && searchInput.value) ? (typeof __normStr === 'function' ? __normStr(searchInput.value) : searchInput.value.trim().toLowerCase()) : '';
            var byType = currentSearchFilter === 'all'
                ? collectivites
                : collectivites.filter(function(c) { return c.type === currentSearchFilter; });
            var filtered = !query
                ? byType
                : byType.filter(function(c) {
                    var name = typeof __normStr === 'function' ? __normStr(c.name) : (c.name || '').toLowerCase();
                    var typeLabel = typeof __normStr === 'function' ? __normStr(c.typeLabel || c.type) : (c.typeLabel || c.type || '').toLowerCase();
                    var dept = typeof __normStr === 'function' ? __normStr(c.departement) : (c.departement || '').toLowerCase();
                    return name.indexOf(query) !== -1 || typeLabel.indexOf(query) !== -1 || dept.indexOf(query) !== -1;
                  });
            renderCollectivites(filtered);
        }

        function initSearchSection() {
            var sr = document.getElementById('searchResults');
            if (sr) {
                applySearchFilter();
                window.applySearchFilter = applySearchFilter;
            }
        }
        initSearchSection();
        document.addEventListener('DOMContentLoaded', initSearchSection);

        if (searchInput) {
            searchInput.addEventListener('input', function() { applySearchFilter(); });
        }

        document.querySelectorAll('#search .filter-chip[data-filter]').forEach(function(chip) {
            chip.addEventListener('click', function() {
                document.querySelectorAll('#search .filter-chip[data-filter]').forEach(function(c) { c.classList.remove('active'); });
                chip.classList.add('active');
                currentSearchFilter = chip.dataset.filter || 'all';
                applySearchFilter();
            });
        });

        function selectCollectivite(name) {
            const currentUser = JSON.parse(sessionStorage.getItem('colconnect_user') || '{}');
            if (currentUser && currentUser.collectivite) {
                currentUserCollectivite = currentUser.collectivite;
            }

            if (typeof updateFicheCollectivite === 'function') {
                updateFicheCollectivite(name);
            } else {
                const ficheNameEl = document.getElementById('ficheName');
                const collectiviteNameEl = document.getElementById('collectiviteName');
                if (ficheNameEl) ficheNameEl.textContent = name;
                if (collectiviteNameEl) collectiviteNameEl.textContent = name;
            }

            const uc = (currentUserCollectivite || '').toLowerCase();
            const n = name.toLowerCase();
            const slugUser = uc.replace(/^(ville de |ville d\'|département (du |de la |des )?|région )/i, '').trim();
            const slugName = n.replace(/^(ville de |ville d\'|département (du |de la |des )?|région )/i, '').trim();
            const isOwnCollectivite = !!slugUser && (slugName === slugUser || n.includes(slugUser) || slugUser.includes(slugName));

            if (isOwnCollectivite) {
                const activeSection = document.querySelector('.section.active');
                if (activeSection && activeSection.id === 'priv-collectivite') {
                    navigateTo('priv-collectivite');
                } else {
                    navigateTo('fiche');
                }
            } else {
                navigateTo('fiche');
            }
            setTimeout(checkCollectiviteOwner, 300);
            setTimeout(checkCollectiviteOwner, 600);
        }

        // ========================
        // PROJECTS (dérivés de projectsDatabase, 120 projets, 6 par collectivité)
        // ========================
        const projets = (typeof projectsDatabase !== 'undefined' && typeof COLLECTIVITES_REF !== 'undefined') ? projectsDatabase.map(p => {
            const c = COLLECTIVITES_REF.find(x => x.id === (p.collectiviteId || ''));
            return {
                id: p.id,
                code: formatProjetCode(p.id),
                title: p.name,
                name: p.name,
                status: p.status || 'etude',
                etudes: p.progressEtudes || 0,
                travaux: p.progressTravaux || 0,
                budget: (p.budget != null ? (p.budget >= 1 ? p.budget + 'M€' : p.budget + 'M€') : '—'),
                date: p.date || '—',
                collectiviteId: p.collectiviteId || '',
                collectivite: p.collectivite || '',
                collectiviteCouleur: (c && c.couleur) ? c.couleur : '#718096',
                adresse: p.adresse || '—',
                eligible: !!p.eligible
            };
        }) : [];
        window.__projets = projets;
        (function () {
            if (typeof __userCreatedProjets === 'undefined' || !Array.isArray(__userCreatedProjets) || __userCreatedProjets.length === 0) return;
            var collRef = typeof COLLECTIVITES_REF !== 'undefined' ? COLLECTIVITES_REF : [];
            __userCreatedProjets.forEach(function (p) {
                var c = collRef.find(function (x) { return x.id === (p.collectiviteId || ''); });
                window.__projets.push({
                    id: p.id, code: formatProjetCode(p.id), title: p.name, name: p.name, status: p.status || 'etude',
                    etudes: p.progressEtudes || 0, travaux: p.progressTravaux || 0,
                    budget: (p.budget != null ? p.budget + 'M€' : '—'), date: p.date || '—',
                    collectiviteId: p.collectiviteId || '', collectivite: p.collectivite || '',
                    collectiviteCouleur: (c && c.couleur) ? c.couleur : '#718096',
                    adresse: p.adresse || '—', eligible: !!p.eligible
                });
            });
        })();

        function renderProjets(data, gridId) {
            // S'assurer que data est un tableau
            if (!Array.isArray(data)) {
                console.warn('[renderProjets] data n\'est pas un tableau, utilisation de []');
                data = [];
            }
            
            // Si c'est la grille privée, s'assurer qu'on ne rend que les projets filtrés
            if (gridId === 'privProjetsGrid') {
                // Double vérification : ne pas utiliser window.__projets pour privProjetsGrid
                if (data.length === 0 && Array.isArray(__privProjetsBase) && __privProjetsBase.length > 0) {
                    console.warn('[renderProjets] privProjetsGrid: data vide, utilisation de __privProjetsBase');
                    data = __privProjetsBase;
                }
            } else {
                // Pour les autres grilles, utiliser window.__projets comme fallback
                if (data.length === 0) {
                    data = window.__projets || [];
                }
            }
            
            const grid = document.getElementById(gridId || 'projetsGrid');
            if (!grid) return;
            if (gridId === 'privProjetsGrid') { window.__currentPrivProjets = data; } else { window.__currentProjets = data; }
            grid.innerHTML = data.map(p => {
                const titre = (p.title || p.name || '').replace(/'/g, "\\'");
                const code = p.code || formatProjetCode(p.id);
                return `<div class="projet-card" onclick="openProjetById(${p.id})">
                    <div class="projet-header">
                        <div>
                            <span class="projet-status ${p.status}">${p.status === 'creation' ? 'En création' : p.status === 'etude' ? 'En études' : p.status === 'travaux' ? 'En travaux' : 'Terminé'}</span>
                            <h3 class="projet-title">${(p.title || p.name || '—')}</h3><span class="projet-code projet-code-block">${code}</span>
                        </div>
                        <span class="projet-collectivite-pastille" style="background:${p.collectiviteCouleur || '#718096'};" title="${(p.collectivite || '').replace(/"/g, '&quot;')}">${p.collectivite || '—'}</span>
                    </div>
                    <div class="projet-body">
                        <div class="progress-section">
                            <div class="progress-label"><span>Études</span><span>${p.etudes || 0}%</span></div>
                            <div class="progress-bar"><div class="progress-fill etudes" style="width: ${p.etudes || 0}%"></div></div>
                        </div>
                        <div class="progress-section">
                            <div class="progress-label"><span>Travaux</span><span>${p.travaux || 0}%</span></div>
                            <div class="progress-bar"><div class="progress-fill travaux" style="width: ${p.travaux || 0}%"></div></div>
                        </div>
                        <div class="projet-adresse"><i class="fas fa-map-marker-alt"></i> ${p.adresse || '—'}</div>
                        <div class="projet-meta">
                            <span><i class="fas fa-euro-sign"></i>${p.budget || '—'}</span>
                            <span><i class="fas fa-calendar"></i>${p.date || '—'}</span>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        function openProjetById(id) {
            if (typeof currentMode !== 'undefined' && currentMode === 'public') return;
            window.__detailFromAdminValidation = false;
            const list = window.__currentProjets || window.__currentPrivProjets || [];
            const p = list.find(x => x.id == id);
            if (p) { window.__currentProjet = p; populateProjectDetails(p); navigateTo('detail'); }
            else { const dt = document.getElementById('detailTitle'); if (dt) dt.textContent = 'Projet'; navigateTo('detail'); }
        }
        function openProjetDetailFromDb(id) {
            if (typeof currentMode !== 'undefined' && currentMode === 'public') return;
            window.__detailFromAdminValidation = false;
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var d = db.find(function(x){ return x.id == id; }) || userList.find(function(x){ return x.id == id; });
            if (!d) { var dt = document.getElementById('detailTitle'); if (dt) dt.textContent = 'Projet'; if (typeof navigateTo === 'function') navigateTo('detail'); return; }
            var c = (typeof COLLECTIVITES_REF !== 'undefined') && COLLECTIVITES_REF.find(function(x){ return x.id === (d.collectiviteId || ''); });
            var p = { id: d.id, code: formatProjetCode(d.id), name: d.name, title: d.name, status: d.status || 'etude', etudes: d.progressEtudes || 0, travaux: d.progressTravaux || 0, budget: (d.budget != null ? d.budget + 'M€' : '—'), adresse: d.adresse || '—', date: d.date || '—', type: d.type, collectivite: d.collectivite || '', collectiviteCouleur: (c && c.couleur) ? c.couleur : '#718096' };
            window.__currentProjet = p;
            if (typeof populateProjectDetails === 'function') populateProjectDetails(p);
            if (typeof navigateTo === 'function') navigateTo('detail');
        }

        // Liste des projets de la collectivité visitée (page Projets)
        window.mesProjetsCourants = [];

        function updateProjetsFilterCounts() {
            function normStatus(s) {
                const x = String(s || '').toLowerCase().trim();
                if (x === 'etude' || x === 'en études' || x === 'en etude') return 'etude';
                if (x === 'travaux' || x === 'en travaux') return 'travaux';
                if (x === 'termine' || x === 'terminé') return 'termine';
                return x || 'etude';
            }
            const useMesProjets = Array.isArray(window.mesProjetsCourants) && window.mesProjetsCourants.length > 0;
            var rawBase = useMesProjets ? window.mesProjetsCourants : (window.__projets || []);
            var base = useMesProjets ? rawBase : rawBase.filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; });

            const all = base.length;
            const etude = base.filter(p => normStatus(p.status) === 'etude').length;
            const travaux = base.filter(p => normStatus(p.status) === 'travaux').length;
            const termine = base.filter(p => normStatus(p.status) === 'termine').length;

            const chips = useMesProjets
                ? document.querySelectorAll('#mes-projets .filter-chip[data-status]')
                : document.querySelectorAll('#projets .filter-chip[data-status]');
            chips.forEach(chip => {
                const s = chip.dataset.status || 'all';
                const n = s === 'all' ? all : s === 'etude' ? etude : s === 'travaux' ? travaux : termine;
                const label = s === 'all' ? 'Tous' : s === 'etude' ? 'En études' : s === 'travaux' ? 'En travaux' : 'Terminés';
                chip.textContent = label + ' (' + n + ')';
            });
        }

        function normProjetStatus(s) {
            const x = String(s || '').toLowerCase().trim();
            if (x === 'etude' || x === 'en études' || x === 'en etude') return 'etude';
            if (x === 'travaux' || x === 'en travaux') return 'travaux';
            if (x === 'termine' || x === 'terminé') return 'termine';
            return x || 'etude';
        }

        var __projetsSearchDebounce = null;
        function getProjetsFilteredByStatusAndSearch() {
            var section = document.getElementById('projets');
            if (!section) return [];
            var activeChip = section.querySelector('.filter-chip[data-status].active');
            var status = (activeChip && activeChip.dataset.status) ? activeChip.dataset.status : 'all';
            var searchInput = document.getElementById('projetsSearchInput');
            var query = (searchInput && searchInput.value) ? searchInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
            var base = (Array.isArray(window.__projets) ? window.__projets : []).filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; });
            var byStatus = status === 'all' ? base : base.filter(function(p) { return normProjetStatus(p.status) === status; });
            if (!query) return byStatus;
            return byStatus.filter(function(p) {
                var title = (p.title || p.name || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                var collectivite = (p.collectivite || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                var adresse = (p.adresse || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                var statusLabel = (p.status === 'etude' ? 'etudes' : p.status === 'travaux' ? 'travaux' : 'termine');
                var budget = (p.budget != null ? String(p.budget) : '').toLowerCase();
                var q = query;
                return title.indexOf(q) !== -1 || collectivite.indexOf(q) !== -1 || adresse.indexOf(q) !== -1 || statusLabel.indexOf(q) !== -1 || budget.indexOf(q) !== -1;
            });
        }
        function applyProjetsFiltersAndSearch() {
            var list = getProjetsFilteredByStatusAndSearch();
            renderProjets(list, 'projetsGrid');
            var countEl = document.getElementById('projetsSearchCountNum');
            if (countEl) countEl.textContent = list.length;
            var grid = document.getElementById('projetsGrid');
            var emptyEl = document.getElementById('projetsEmptyState');
            if (grid) grid.style.display = list.length === 0 ? 'none' : '';
            if (emptyEl) emptyEl.style.display = list.length === 0 ? 'block' : 'none';
            if (typeof updateProjetsFilterCounts === 'function') updateProjetsFilterCounts();
        }
        window.applyProjetsFiltersAndSearch = applyProjetsFiltersAndSearch;

        document.querySelectorAll('#projets .filter-chip[data-status]').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('#projets .filter-chip[data-status]').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                applyProjetsFiltersAndSearch();
            });
        });

        (function() {
            var searchInput = document.getElementById('projetsSearchInput');
            var clearBtn = document.getElementById('projetsSearchClear');
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    var q = searchInput.value.trim();
                    if (clearBtn) clearBtn.classList.toggle('visible', q.length > 0);
                    if (__projetsSearchDebounce) clearTimeout(__projetsSearchDebounce);
                    __projetsSearchDebounce = setTimeout(function() { applyProjetsFiltersAndSearch(); }, 250);
                });
                searchInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') { searchInput.value = ''; if (clearBtn) clearBtn.classList.remove('visible'); applyProjetsFiltersAndSearch(); searchInput.blur(); }
                });
            }
            if (clearBtn) {
                clearBtn.addEventListener('click', function() {
                    if (searchInput) { searchInput.value = ''; searchInput.focus(); }
                    clearBtn.classList.remove('visible');
                    applyProjetsFiltersAndSearch();
                });
            }
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    var proj = document.getElementById('projets');
                    if (proj && proj.classList.contains('active') && searchInput) { e.preventDefault(); searchInput.focus(); }
                }
            });
            applyProjetsFiltersAndSearch();
        })();

        // ——— Tous mes projets (priv-projets) : données de Ma Collectivité, filtres, recherche ———
        let __privProjetsBase = [];
        let __privProjetsFilter = 'tous';
        let __privProjetsSearch = '';

        function loadPrivProjets() {
            // Récupérer currentUser depuis localStorage/sessionStorage si nécessaire
            var user = currentUser;
            if (!user) {
                try {
                    var saved = localStorage.getItem('colconnectUser') || sessionStorage.getItem('colconnect_user');
                    if (saved) user = JSON.parse(saved);
                } catch(e) {
                    console.warn('[loadPrivProjets] Erreur parsing user:', e);
                }
            }
            
            // Mes projets = uniquement la collectivité de l'utilisateur (pas toutes les collectivités)
            var userColId = (user && user.collectiviteId) ? String(user.collectiviteId).trim() : '';
            var userColName = (user && user.collectivite) ? String(user.collectivite).trim() : '';

            var fallbackName = (typeof currentCollectivite !== 'undefined' && currentCollectivite) ? String(currentCollectivite).trim()
                : (typeof currentUserCollectivite !== 'undefined' && currentUserCollectivite) ? String(currentUserCollectivite).trim()
                : 'Ville de Lyon';

            var colName = userColName || fallbackName;
            var allProjets = Array.isArray(window.__projets) ? window.__projets.slice() : [];

            // Logs de débogage
            console.log('[loadPrivProjets] userColId:', userColId);
            console.log('[loadPrivProjets] userColName:', userColName);
            console.log('[loadPrivProjets] Total projets avant filtre:', allProjets.length);

            __privProjetsBase = allProjets.filter(function(p) {
                // Si l'utilisateur a un collectiviteId, utiliser uniquement ce critère (plus fiable)
                if (userColId && userColId !== 'all' && userColId !== 'central') {
                    var pColId = String(p.collectiviteId || '').trim();
                    // Retourner true uniquement si l'ID correspond exactement
                    var match = pColId === userColId;
                    if (!match && pColId) {
                        console.log('[loadPrivProjets] Projet rejeté (ID):', { id: p.id, name: p.name, projetColId: pColId, userColId: userColId, collectivite: p.collectivite });
                    }
                    return match;
                }
                
                // Sinon, utiliser le nom de collectivité (normalisé)
                var pColName = String(p.collectivite || '').trim();
                var normMatch = __normStr(pColName) === __normStr(colName);
                if (!normMatch) {
                    console.log('[loadPrivProjets] Projet rejeté (nom):', { id: p.id, name: p.name, projetCol: pColName, userCol: colName });
                }
                return normMatch;
            });

            console.log('[loadPrivProjets] Projets filtrés:', __privProjetsBase.length);
            console.log('[loadPrivProjets] Exemples de projets filtrés:', __privProjetsBase.slice(0, 3).map(p => ({ id: p.id, collectivite: p.collectivite, collectiviteId: p.collectiviteId })));

            __privProjetsFilter = 'tous';
            __privProjetsSearch = '';
            applyPrivProjetsFilters();
        }

        function applyPrivProjetsFilters() {
            let list = __privProjetsBase || [];
            
            console.log('[applyPrivProjetsFilters] Début - list.length:', list.length);
            if (list.length > 0) {
                console.log('[applyPrivProjetsFilters] Exemples avant filtre:', list.slice(0, 3).map(p => ({ id: p.id, collectivite: p.collectivite, collectiviteId: p.collectiviteId })));
            }
            
            // SÉCURITÉ : Re-filtrer par collectivité de l'utilisateur pour éviter tout projet d'une autre collectivité
            var user = currentUser;
            if (!user) {
                try {
                    var saved = localStorage.getItem('colconnectUser') || sessionStorage.getItem('colconnect_user');
                    if (saved) user = JSON.parse(saved);
                } catch(e) {}
            }
            
            console.log('[applyPrivProjetsFilters] user:', user ? { collectiviteId: user.collectiviteId, collectivite: user.collectivite } : 'null');
            
            if (user && user.collectiviteId && user.collectiviteId !== 'all' && user.collectiviteId !== 'central') {
                var userColId = String(user.collectiviteId).trim();
                var beforeCount = list.length;
                list = list.filter(function(p) {
                    var pColId = String(p.collectiviteId || '').trim();
                    var match = pColId === userColId;
                    if (!match && pColId) {
                        console.log('[applyPrivProjetsFilters] Projet rejeté:', { id: p.id, projetColId: pColId, userColId: userColId, collectivite: p.collectivite });
                    }
                    return match;
                });
                console.log('[applyPrivProjetsFilters] Après filtre par ID:', beforeCount, '->', list.length);
            } else if (user && user.collectivite) {
                var userColName = String(user.collectivite).trim();
                var beforeCount = list.length;
                list = list.filter(function(p) {
                    var pColName = String(p.collectivite || '').trim();
                    var match = __normStr(pColName) === __normStr(userColName);
                    if (!match) {
                        console.log('[applyPrivProjetsFilters] Projet rejeté par nom:', { id: p.id, projetCol: pColName, userCol: userColName });
                    }
                    return match;
                });
                console.log('[applyPrivProjetsFilters] Après filtre par nom:', beforeCount, '->', list.length);
            } else {
                console.warn('[applyPrivProjetsFilters] Aucun utilisateur trouvé, liste vide pour sécurité');
                list = [];
            }
            
            // Appliquer les filtres de statut
            if (__privProjetsFilter === 'etude') list = list.filter(p => p.status === 'etude');
            else if (__privProjetsFilter === 'travaux') list = list.filter(p => p.status === 'travaux');
            else if (__privProjetsFilter === 'termine') list = list.filter(p => p.status === 'termine');
            else if (__privProjetsFilter === 'eligible') list = list.filter(p => p.eligible === true);
            
            // Appliquer la recherche (accent-insensible)
            var q = typeof __normStr === 'function' ? __normStr(__privProjetsSearch) : (__privProjetsSearch || '').trim().toLowerCase();
            if (q) list = list.filter(function(p) { return [p.name, p.title, p.adresse, p.collectivite].some(function(v) { var n = typeof __normStr === 'function' ? __normStr(v) : (v || '').toLowerCase(); return n.indexOf(q) !== -1; }); });
            
            // Rendre les projets
            if (typeof renderProjets === 'function') renderProjets(list, 'privProjetsGrid');
            const cnt = document.getElementById('projetsCount');
            if (cnt) cnt.textContent = list.length;
            var privGrid = document.getElementById('privProjetsGrid');
            var privEmpty = document.getElementById('privProjetsEmptyState');
            if (privGrid) privGrid.style.display = list.length === 0 ? 'none' : '';
            if (privEmpty) privEmpty.style.display = list.length === 0 ? 'block' : 'none';
            document.querySelectorAll('#priv-projets .filters-container .filter-chip[data-f]').forEach(chip => chip.classList.toggle('active', (chip.dataset.f || '') === __privProjetsFilter));
        }

        function filterProjets(status) {
            __privProjetsFilter = status || 'tous';
            applyPrivProjetsFilters();
        }

        function searchProjets(value) {
            __privProjetsSearch = (value || '').trim();
            applyPrivProjetsFilters();
        }

        var CP_TYPE_HINTS = { 'Patrimoine':'Rénovation/valorisation du bâti. Conformité énergétique et Décret Tertiaire.', 'Éducation':'Bâtiment éducatif. Performance énergétique et confort.', 'Petite enfance':'Enjeux sanitaires et énergétiques.', 'Culture':'Impact patrimonial et maîtrise énergétique.', 'Sport':'Performance énergétique, toiture/ENR possibles.', 'Santé':'Exigences énergétiques et sanitaires.', 'Urbanisme':'Dimension énergie et patrimoine dans l\'aménagement.', 'Espaces verts':'Impact paysager et biodiversité.', 'Mobilité':'Impact sur le patrimoine et les déplacements.', 'Transport':'Enjeux structurants, dimension énergétique des bâtiments.', 'Infrastructure':'Enjeux techniques et durabilité.', 'Économie':'Bâtiments et zones d\'activité.', 'Numérique':'Réseaux et bâtiments techniques.', 'Administration':'Décret Tertiaire et rénovation énergétique.', 'Formation':'Bâtiments d\'enseignement.', 'Énergie':'Production, réseaux, ENR.', 'Environnement':'Biodiversité, eau, déchets.' };
        function updateCreerProjetTypeHint() {
            var s = document.getElementById('cpType'), h = document.getElementById('cpTypeHint');
            if (!s || !h) return;
            var v = (s.value || '').trim();
            if (v && CP_TYPE_HINTS[v]) { h.textContent = CP_TYPE_HINTS[v]; h.style.display = 'block'; } else { h.textContent = ''; h.style.display = 'none'; }
        }
        function openCreerProjetModal() {
            var col = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ? currentUser.collectivite : (typeof currentCollectivite !== 'undefined' ? currentCollectivite : 'Ville de Lyon');
            var colFixed = document.getElementById('cpCollectiviteFixed');
            if (colFixed) colFixed.textContent = col;
            var d = new Date();
            var months = ['Janv.','Fév.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];
            document.getElementById('cpDate').value = (months[d.getMonth()] || '') + ' ' + (d.getFullYear() + 1);
            document.getElementById('cpName').value = '';
            document.getElementById('cpAdresse').value = '';
            document.getElementById('cpType').value = '';
            document.getElementById('cpBudget').value = '';
            ['cpPorteurPolitique','cpChefProjet','cpMod','cpMoe','cpAmoCsps','cpPartenaires'].forEach(function(id){ var e = document.getElementById(id); if (e) e.value = ''; });
            var h = document.getElementById('cpNameHint'); if (h) h.textContent = '';
            updateCreerProjetTypeHint();
            openModal('creerProjetModal');
        }
        function openCreerProjetModalFromBatiment() {
            var bat = (typeof currentBatiment !== 'undefined') ? currentBatiment : null;
            var col = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ? currentUser.collectivite : (typeof currentCollectivite !== 'undefined' ? currentCollectivite : 'Ville de Lyon');
            var colFixed = document.getElementById('cpCollectiviteFixed');
            if (colFixed) colFixed.textContent = col;
            var d = new Date();
            var months = ['Janv.','Fév.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];
            document.getElementById('cpDate').value = (months[d.getMonth()] || '') + ' ' + (d.getFullYear() + 1);
            if (bat && bat.nom) {
                document.getElementById('cpName').value = 'Rénovation énergétique – ' + (bat.nom || '').trim();
                var typeMap = { ecole: 'Éducation', sport: 'Sport', mairie: 'Administration', salle: 'Patrimoine' };
                document.getElementById('cpType').value = typeMap[bat.type] || 'Énergie';
                document.getElementById('cpBudget').value = (bat.depense > 0) ? (bat.depense / 1000000).toFixed(2) : '';
                var adrDisplay = (typeof getBatimentAdresseDisplay === 'function') ? getBatimentAdresseDisplay(bat) : '';
                document.getElementById('cpAdresse').value = adrDisplay || '';
            } else {
                document.getElementById('cpName').value = '';
                document.getElementById('cpAdresse').value = '';
                document.getElementById('cpType').value = '';
                document.getElementById('cpBudget').value = '';
            }
            var h = document.getElementById('cpNameHint'); if (h) h.textContent = '';
            updateCreerProjetTypeHint();
            openModal('creerProjetModal');
        }
        function creerProjetFromFicheBatiment() {
            if (typeof navigateTo === 'function') navigateTo('priv-projets');
            setTimeout(function () {
                if (typeof openCreerProjetModalFromBatiment === 'function') openCreerProjetModalFromBatiment();
                else if (typeof openCreerProjetModal === 'function') openCreerProjetModal();
            }, 200);
        }
        function submitCreerProjet() {
            var name = (document.getElementById('cpName').value || '').trim();
            if (name.length < 2) {
                var h = document.getElementById('cpNameHint'); if (h) h.textContent = 'Le nom doit contenir au moins 2 caractères.'; if (typeof showToast === 'function') showToast('Veuillez saisir un nom de projet (2 caractères min.).');
                return;
            }
            var ref = (typeof COLLECTIVITES_REF !== 'undefined') ? COLLECTIVITES_REF : [];
            var collectivite = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ? currentUser.collectivite : (document.getElementById('cpCollectiviteFixed') || {}).textContent || 'Ville de Lyon';
            var collectiviteId = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
            var c = ref.find(function(r){ return (r.nom || r.id || '') === collectivite || (r.id || '') === collectiviteId; });
            if (c) { collectivite = c.nom || collectivite; collectiviteId = c.id || collectiviteId; }
            var status = 'creation';
            var budgetVal = (document.getElementById('cpBudget') || {}).value;
            var budget = (budgetVal !== '' && !isNaN(parseFloat(budgetVal))) ? parseFloat(budgetVal) : null;
            var et = 0;
            var tr = 0;
            var idsDb = (typeof projectsDatabase !== 'undefined') ? projectsDatabase.map(function (p) { return p.id || 0; }) : [];
            var idsUser = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets.map(function (p) { return p.id || 0; }) : [];
            var newId = (idsDb.length || idsUser.length) ? (Math.max.apply(null, idsDb.concat(idsUser)) + 1) : 1;
            var g = {};
            var gEl = function(id){ var e = document.getElementById(id); return e ? (e.value || '').trim() : ''; };
            g.porteurPolitique = gEl('cpPorteurPolitique');
            g.chefProjet = gEl('cpChefProjet');
            g.mod = gEl('cpMod');
            g.moe = gEl('cpMoe');
            g.amoCsps = gEl('cpAmoCsps');
            g.partenaires = gEl('cpPartenaires');
            var rec = { id: newId, collectiviteId: collectiviteId, collectivite: collectivite, name: name, adresse: (document.getElementById('cpAdresse') || {}).value || '', status: status, lat: 46.6, lon: 2.4, budget: budget, progressEtudes: 0, progressTravaux: 0, type: (document.getElementById('cpType') || {}).value || '—', date: (document.getElementById('cpDate') || {}).value || '—', eligible: false, governance: g };
            projectsDatabase.push(rec);
            __userCreatedProjets.push(rec);
            saveUserCreatedProjets();
            var cr = ref.find(function(x){ return x.id === (rec.collectiviteId || ''); });
            var mapped = { id: rec.id, code: formatProjetCode(rec.id), title: rec.name, name: rec.name, status: rec.status || 'etude', etudes: rec.progressEtudes || 0, travaux: rec.progressTravaux || 0, budget: (rec.budget != null ? rec.budget + 'M€' : '—'), date: rec.date || '—', collectivite: rec.collectivite || '', collectiviteCouleur: (cr && cr.couleur) ? cr.couleur : '#718096', adresse: rec.adresse || '—', eligible: !!rec.eligible };
            if (Array.isArray(window.__projets)) window.__projets.push(mapped);
            if (typeof loadPrivProjets === 'function') loadPrivProjets();
            var g = document.getElementById('projetsGrid'); if (g && typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch(); else if (typeof renderProjets === 'function') { var list = (window.__projets || []).filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; }); renderProjets(list, 'projetsGrid'); }
            if (typeof showToast === 'function') showToast('Projet soumis pour validation : ' + name);
            closeModal('creerProjetModal');
            if (typeof navigateTo === 'function') navigateTo('priv-administration');
            if (typeof showAdminPanel === 'function') setTimeout(function() { showAdminPanel('validations'); }, 150);
        }

        function openModifierProjetModal() {
            var cur = window.__currentProjet;
            if (!cur || !cur.id) { if (typeof showToast === 'function') showToast('Aucun projet sélectionné.'); return; }
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var p = db.find(function(x) { return x.id == cur.id; }) || userList.find(function(x) { return x.id == cur.id; });
            if (!p) { if (typeof showToast === 'function') showToast('Projet introuvable en base.'); return; }
            document.getElementById('mpName').value = p.name || p.title || '';
            document.getElementById('mpAdresse').value = p.adresse || '';
            document.getElementById('mpType').value = p.type || '';
            document.getElementById('mpStatus').value = p.status || 'creation';
            document.getElementById('mpBudget').value = (p.budget != null && p.budget !== '') ? String(p.budget) : '';
            document.getElementById('mpDate').value = p.date || '';
            document.getElementById('mpCollectiviteFixed').textContent = p.collectivite || '—';
            var gov = p.governance || {};
            var setGov = function(id, k){ var e = document.getElementById(id); if (e) e.value = gov[k] || ''; };
            setGov('mpPorteurPolitique','porteurPolitique'); setGov('mpChefProjet','chefProjet'); setGov('mpMod','mod'); setGov('mpMoe','moe'); setGov('mpAmoCsps','amoCsps'); setGov('mpPartenaires','partenaires');
            document.getElementById('mpAnalyse').value = p.analyse || '';
            document.getElementById('mpEligible').checked = !!p.eligible;
            var h = document.getElementById('mpNameHint'); if (h) h.textContent = '';
            openModal('modifierProjetModal');
        }

        function submitModifierProjet() {
            var cur = window.__currentProjet;
            if (!cur || !cur.id) { closeModal('modifierProjetModal'); return; }
            var name = (document.getElementById('mpName').value || '').trim();
            if (name.length < 2) {
                var h = document.getElementById('mpNameHint'); if (h) h.textContent = 'Le nom doit contenir au moins 2 caractères.';
                if (typeof showToast === 'function') showToast('Veuillez saisir un nom de projet (2 caractères min.).');
                return;
            }
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var p = db.find(function(x) { return x.id == cur.id; }) || userList.find(function(x) { return x.id == cur.id; });
            if (!p) { closeModal('modifierProjetModal'); return; }
            var budgetVal = (document.getElementById('mpBudget') || {}).value;
            var budget = (budgetVal !== '' && !isNaN(parseFloat(budgetVal))) ? parseFloat(budgetVal) : null;
            p.name = name;
            p.adresse = (document.getElementById('mpAdresse') || {}).value || '';
            p.type = (document.getElementById('mpType') || {}).value || '—';
            p.status = (document.getElementById('mpStatus') || {}).value || 'creation';
            p.budget = budget;
            p.date = (document.getElementById('mpDate') || {}).value || '—';
            p.analyse = (document.getElementById('mpAnalyse') || {}).value || '';
            p.eligible = !!(document.getElementById('mpEligible') || {}).checked;
            var gEl = function(id){ var e = document.getElementById(id); return e ? (e.value || '').trim() : ''; };
            p.governance = { porteurPolitique: gEl('mpPorteurPolitique'), chefProjet: gEl('mpChefProjet'), mod: gEl('mpMod'), moe: gEl('mpMoe'), amoCsps: gEl('mpAmoCsps'), partenaires: gEl('mpPartenaires') };
            if (typeof saveUserCreatedProjets === 'function') saveUserCreatedProjets();
            closeModal('modifierProjetModal');
            var budgetStr = (p.budget != null && p.budget !== '') ? (typeof p.budget === 'number' ? p.budget + 'M€' : String(p.budget)) : '—';
            var projetCompatible = { id: p.id, code: formatProjetCode(p.id || ''), title: p.name, name: p.name, status: p.status, adresse: p.adresse || '—', budget: budgetStr, progressEtudes: p.progressEtudes ?? 0, progressTravaux: p.progressTravaux ?? 0, etudes: p.progressEtudes ?? 0, travaux: p.progressTravaux ?? 0, collectivite: p.collectivite, analyse: p.analyse };
            window.__currentProjet = projetCompatible;
            if (typeof populateProjectDetails === 'function') populateProjectDetails(projetCompatible);
            if (typeof loadPrivProjets === 'function') loadPrivProjets();
            if (typeof loadAdminValidationProjets === 'function') loadAdminValidationProjets();
            var g = document.getElementById('projetsGrid'); if (g && typeof renderProjets === 'function' && window.__projets) { var idx = window.__projets.findIndex(function(x){ return x.id == p.id; }); if (idx >= 0) { window.__projets[idx] = { id: p.id, code: formatProjetCode(p.id), title: p.name, name: p.name, status: p.status || 'etude', etudes: p.progressEtudes || 0, travaux: p.progressTravaux || 0, budget: budgetStr, date: p.date || '—', collectivite: p.collectivite || '', collectiviteCouleur: (cur.collectiviteCouleur || '#718096'), adresse: p.adresse || '—', eligible: !!p.eligible }; if (typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch(); else renderProjets((window.__projets || []).filter(function(x){ return (String(x.status||'').toLowerCase())!=='creation'; }), 'projetsGrid'); } }
            if (typeof showToast === 'function') showToast('Projet enregistré : ' + name);
        }

        function openModifierAvancementModal() {
            var cur = window.__currentProjet;
            if (!cur || !cur.id) { if (typeof showToast === 'function') showToast('Aucun projet sélectionné.'); return; }
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var p = db.find(function(x) { return x.id == cur.id; }) || userList.find(function(x) { return x.id == cur.id; });
            if (!p) { if (typeof showToast === 'function') showToast('Projet introuvable en base.'); return; }
            var et = Math.max(0, Math.min(100, parseInt(p.progressEtudes, 10) || 0));
            var tr = Math.max(0, Math.min(100, parseInt(p.progressTravaux, 10) || 0));
            document.getElementById('mpEtudes').value = et;
            document.getElementById('mpEtudesVal').textContent = et + '%';
            document.getElementById('mpTravaux').value = tr;
            document.getElementById('mpTravauxVal').textContent = tr + '%';
            openModal('modifierAvancementModal');
        }

        function submitModifierAvancement() {
            var cur = window.__currentProjet;
            if (!cur || !cur.id) { closeModal('modifierAvancementModal'); return; }
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var p = db.find(function(x) { return x.id == cur.id; }) || userList.find(function(x) { return x.id == cur.id; });
            if (!p) { closeModal('modifierAvancementModal'); return; }
            var et = Math.max(0, Math.min(100, parseInt((document.getElementById('mpEtudes') || {}).value, 10) || 0));
            var tr = Math.max(0, Math.min(100, parseInt((document.getElementById('mpTravaux') || {}).value, 10) || 0));
            p.progressEtudes = et;
            p.progressTravaux = tr;
            if (typeof saveUserCreatedProjets === 'function') saveUserCreatedProjets();
            closeModal('modifierAvancementModal');
            var budgetStr = (p.budget != null && p.budget !== '') ? (typeof p.budget === 'number' ? p.budget + 'M€' : String(p.budget)) : '—';
            var projetCompatible = { id: p.id, code: formatProjetCode(p.id || ''), title: p.name, name: p.name, status: p.status, adresse: p.adresse || '—', budget: budgetStr, progressEtudes: et, progressTravaux: tr, etudes: et, travaux: tr, collectivite: p.collectivite, analyse: p.analyse, date: p.date };
            window.__currentProjet = projetCompatible;
            if (typeof populateProjectDetails === 'function') populateProjectDetails(projetCompatible);
            if (typeof loadPrivProjets === 'function') loadPrivProjets();
            if (typeof loadAdminValidationProjets === 'function') loadAdminValidationProjets();
            var g = document.getElementById('projetsGrid'); if (g && typeof renderProjets === 'function' && window.__projets) { var idx = window.__projets.findIndex(function(x){ return x.id == p.id; }); if (idx >= 0) { window.__projets[idx].etudes = et; window.__projets[idx].travaux = tr; if (typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch(); else renderProjets((window.__projets || []).filter(function(x){ return (String(x.status||'').toLowerCase())!=='creation'; }), 'projetsGrid'); } }
            if (typeof showToast === 'function') showToast('Avancement enregistré.');
        }

        function submitChronoAvancement() {
            var cur = window.__currentProjet;
            if (!cur || !cur.id) { if (typeof showToast === 'function') showToast('Aucun projet sélectionné.'); return; }
            var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
            var p = db.find(function(x) { return x.id == cur.id; }) || userList.find(function(x) { return x.id == cur.id; });
            if (!p) { if (typeof showToast === 'function') showToast('Projet introuvable en base.'); return; }
            var statusEl = document.getElementById('chronoStatus');
            var etEl = document.getElementById('chronoEtudes');
            var trEl = document.getElementById('chronoTravaux');
            var dateEl = document.getElementById('chronoDate');
            var et = Math.max(0, Math.min(100, parseInt((etEl || {}).value, 10) || 0));
            var tr = Math.max(0, Math.min(100, parseInt((trEl || {}).value, 10) || 0));
            p.status = (statusEl && statusEl.value) || p.status || 'etude';
            p.progressEtudes = et;
            p.progressTravaux = tr;
            p.date = (dateEl && dateEl.value) ? String(dateEl.value).trim() : (p.date || '');
            if (typeof saveUserCreatedProjets === 'function') saveUserCreatedProjets();
            var budgetStr = (p.budget != null && p.budget !== '') ? (typeof p.budget === 'number' ? p.budget + 'M€' : String(p.budget)) : '—';
            var projetCompatible = { id: p.id, code: formatProjetCode(p.id || ''), title: p.name, name: p.name, status: p.status, adresse: p.adresse || '—', budget: budgetStr, progressEtudes: et, progressTravaux: tr, etudes: et, travaux: tr, collectivite: p.collectivite, analyse: p.analyse, date: p.date, type: p.type };
            window.__currentProjet = projetCompatible;
            if (typeof populateProjectDetails === 'function') populateProjectDetails(projetCompatible);
            if (typeof loadPrivProjets === 'function') loadPrivProjets();
            if (typeof loadAdminValidationProjets === 'function') loadAdminValidationProjets();
            var g = document.getElementById('projetsGrid'); if (g && typeof renderProjets === 'function' && window.__projets) { var idx = window.__projets.findIndex(function(x){ return x.id == p.id; }); if (idx >= 0) { window.__projets[idx].status = p.status; window.__projets[idx].etudes = et; window.__projets[idx].travaux = tr; window.__projets[idx].date = p.date; if (typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch(); else renderProjets((window.__projets || []).filter(function(x){ return (String(x.status||'').toLowerCase())!=='creation'; }), 'projetsGrid'); } }
            if (typeof showToast === 'function') showToast('Avancement enregistré.');
        }

        var PATRIMOINE_TYPES = ['Patrimoine','Énergie','Éducation','Petite enfance','Culture','Sport','Santé','Urbanisme','Espaces verts','Administration'];
        function loadPatrimoineProjets() {
            var col = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ? currentUser.collectivite : (typeof currentCollectivite !== 'undefined' ? currentCollectivite : 'Ville de Lyon');
            var ref = (typeof COLLECTIVITES_REF !== 'undefined') ? COLLECTIVITES_REF : [];
            var coll = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            var raw = coll.filter(function(p){ return (p.collectivite || '') === col && PATRIMOINE_TYPES.indexOf(p.type || '') >= 0; });
            var list = raw.map(function(p){
                var c = ref.find(function(x){ return x.id === (p.collectiviteId || ''); });
                return { id: p.id, code: formatProjetCode(p.id), name: p.name, type: p.type, status: p.status, budget: (p.budget != null ? p.budget + 'M€' : '—'), analyse: (typeof getAnalyseForProject === 'function' ? getAnalyseForProject(p) : '—'), collectiviteCouleur: (c && c.couleur) ? c.couleur : '#718096' };
            });
            var el = document.getElementById('patrimoineProjetsList');
            if (!el) return;
            if (!list.length) { el.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">Aucun projet patrimoine/énergie pour cette collectivité.</p>'; return; }
            el.innerHTML = list.map(function(p){
                var a = (p.analyse || '').substring(0, 90); if ((p.analyse || '').length > 90) a += '…';
                var st = p.status === 'travaux' ? 'En travaux' : (p.status === 'termine' ? 'Terminé' : 'En études');
                return '<div class="patrimoine-projet-card" onclick="openProjetDetailFromDb('+p.id+')">' +
                    '<div style="display:flex;justify-content:flex-end;align-items:flex-start;margin-bottom:0.5rem;">' +
                    '<span class="status-pill '+p.status+'" style="font-size:0.7rem;">'+st+'</span></div>' +
                    '<h4 style="font-size:0.95rem;margin-bottom:0.2rem;">'+ (p.name || '—').replace(/</g,'&lt;') +'</h4>' +
                    '<span class="projet-code projet-code-block" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem;">'+ (p.code || formatProjetCode(p.id)) +'</span>' +
                    '<p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.5rem;"><i class="fas fa-tag"></i> '+ (p.type || '—') +' · '+ (p.budget || '—') +'</p>' +
                    (a ? '<p style="font-size:0.8rem;color:var(--text-secondary);line-height:1.35;margin-bottom:0.5rem;">'+ a.replace(/</g,'&lt;') +'</p>' : '') +
                    '<span style="font-size:0.8rem;color:var(--secondary);"><i class="fas fa-external-link-alt"></i> Voir la fiche</span></div>';
            }).join('');
        }

        function openProjet(title) {
            // Compat: ancien appel avec seulement un titre
            const list = window.__currentMesProjets || [];
            const found = list.find(p => p && p.title === title);
            if (found) {
                window.__currentProjet = found;
                populateProjectDetails(found);
            } else {
                const dt = document.getElementById('detailTitle');
                if (dt) dt.textContent = title || 'Projet';
                const ft = document.getElementById('financeurProjectTitle');
                if (ft) ft.textContent = title || 'Projet';
            }
            navigateTo('detail');
        }

        function openProjetFromMesProjets(index) {
            window.__detailFromAdminValidation = false;
            const list = window.__currentMesProjets || [];
            const p = list[index];
            if (!p) return;
            window.__currentProjet = p;
            populateProjectDetails(p);
            navigateTo('detail');
        }

        function maturityDots(score) {
            // score 0..5
            const s = Math.max(0, Math.min(5, score|0));
            return "●".repeat(s) + "○".repeat(5 - s);
        }

        /* Barème réaliste des quotes-parts (règles applicables hors ColConnect) :
         * - Plafond aides publiques (subventions) : 80 % max du projet
         * - Autofinancement MO : min 20 %
         * - DSIL : jusqu'à 80 % (variable par projet/territoire), ex. 25 %
         * - Région : variable par région, ex. 20 %
         * - FEDER : 50-80 % selon région (taux cofinancement), ex. 15 %
         * - Caisse des Dépôts : prêt (n'entre pas dans le plafond 80 %)
         */
        var QP_PLAFOND_AIDES_PUBLIQUES = 80;
        function getPartnersForProject(p) {
            var totalEur = p.budgetNum;
            if (totalEur == null || isNaN(totalEur)) {
                var b = p.budget;
                if (typeof b === 'number') { totalEur = b * 1e6; }
                else {
                    var n = parseFloat(String(b || '0').replace(/[^\d.,]/g, '').replace(',', '.'));
                    totalEur = (isNaN(n) ? 0 : n) * 1e6;
                }
            }
            var def = [
                { name: p.collectivite || "Maître d'ouvrage", type: "Autofinancement (min 20 %)", pct: 35, icon: 'fa-city', nature: 'autofinancement' },
                { name: 'État - DSIL', type: "Subvention (max 80 % en droit)", pct: 25, icon: 'fa-university', nature: 'subvention' },
                { name: 'Région partenaire', type: 'Subvention régionale', pct: 20, icon: 'fa-landmark', nature: 'subvention' },
                { name: 'Fonds européen FEDER', type: 'Subvention UE (taux variable)', pct: 15, icon: 'fa-flag-eu', nature: 'subvention' },
                { name: 'Caisse des Dépôts', type: 'Prêt bonifié (hors plafond 80 %)', pct: 5, icon: 'fa-euro-sign', nature: 'pret' }
            ];
            var partners = def.map(function (x) {
                var amount = Math.round((totalEur || 0) * x.pct / 100);
                return { name: x.name, type: x.type, pct: x.pct, icon: x.icon, amount: amount, nature: x.nature || 'subvention' };
            });
            return { totalEur: totalEur || 0, partners: partners };
        }
        function getQPSubventionsPct(partners) {
            var total = 0, subv = 0;
            (partners || []).forEach(function (x) {
                total += (x.amount || 0);
                if ((x.nature || 'subvention') === 'subvention') subv += (x.amount || 0);
            });
            return total > 0 ? Math.round(1000 * subv / total) / 10 : 0;
        }

        /* Normalise les quotes-parts pour ne jamais dépasser le plafond 80 % aides publiques. Retourne true si modifié. */
        function normalizeQPForPlafond(partners, state) {
            if (!partners || !partners.length) return false;
            var total = 0, subvTotal = 0;
            partners.forEach(function (x) {
                var amt = x.amount || 0;
                total += amt;
                if ((x.nature || 'subvention') === 'subvention') subvTotal += amt;
            });
            if (total <= 0 || subvTotal <= 0) return false;
            var subvPct = subvTotal / total;
            if (subvPct <= QP_PLAFOND_AIDES_PUBLIQUES / 100) return false;
            var plafondEur = Math.round(total * QP_PLAFOND_AIDES_PUBLIQUES / 100);
            var facteur = plafondEur / subvTotal;
            var excess = 0;
            partners.forEach(function (x) {
                if ((x.nature || 'subvention') === 'subvention') {
                    var oldAmt = x.amount || 0;
                    var newAmt = Math.round(oldAmt * facteur);
                    excess += (oldAmt - newAmt);
                    x.amount = newAmt;
                    x.pct = total > 0 ? Math.round(1000 * newAmt / total) / 10 : 0;
                }
            });
            var autoPartners = partners.filter(function (x) { return (x.nature || '') === 'autofinancement'; });
            if (autoPartners.length > 0 && excess > 0) {
                var mo = autoPartners[0];
                mo.amount = (mo.amount || 0) + excess;
                mo.pct = total > 0 ? Math.round(1000 * (mo.amount || 0) / total) / 10 : 0;
            } else if (excess > 0) {
                partners.unshift({ name: "Maître d'ouvrage (ajusté)", type: 'Autofinancement', pct: 0, icon: 'fa-city', amount: excess, nature: 'autofinancement' });
                var newTotal = total;
                partners[0].pct = newTotal > 0 ? Math.round(1000 * excess / newTotal) / 10 : 0;
                if (state && state.statuts) {
                    var newStatuts = {};
                    newStatuts['0'] = { statut: 'en_attente', date: '', ref: '' };
                    for (var k in state.statuts) newStatuts['' + (parseInt(k, 10) + 1)] = state.statuts[k];
                    state.statuts = newStatuts;
                }
            }
            return true;
        }

        /* Applique la normalisation à tous les projets enregistrés */
        function normalizeAllQPForPlafond() {
            if (!qpWorkflowState || typeof qpWorkflowState !== 'object') return;
            Object.keys(qpWorkflowState).forEach(function (pid) {
                var state = qpWorkflowState[pid];
                if (state && state.partners && Array.isArray(state.partners) && state.partners.length > 0) {
                    normalizeQPForPlafond(state.partners, state);
                }
            });
            saveQPWorkflowState();
        }

        /* Workflow quotes-parts : état et sauvegarde (ne jamais faire planter le script) */
        var qpWorkflowState = {};
        try {
            var _qp = localStorage.getItem('cc_qp_workflow');
            if (_qp != null) { var _parsed = JSON.parse(_qp); if (_parsed && typeof _parsed === 'object') qpWorkflowState = _parsed; }
            normalizeAllQPForPlafond();
        } catch (e) { qpWorkflowState = {}; }
        function saveQPWorkflowState() { try { if (qpWorkflowState != null && typeof qpWorkflowState === 'object') localStorage.setItem('cc_qp_workflow', JSON.stringify(qpWorkflowState)); } catch (e) {} }

        function getQPState(p) {
            var pid = (p && p.id != null) ? p.id.toString() : '';
            if (!qpWorkflowState) qpWorkflowState = {};
            var state = qpWorkflowState[pid];
            if (!state || !state.partners || !Array.isArray(state.partners) || state.partners.length === 0) {
                var pf = getPartnersForProject(p);
                state = { partners: [], statuts: {}, locked: false };
                if (pf && pf.partners && pf.partners.length) {
                    state.partners = pf.partners.map(function (x) { return { name: x.name, type: x.type || '', pct: x.pct || 0, icon: x.icon || 'fa-euro-sign', amount: x.amount || 0, nature: x.nature || 'subvention' }; });
                    state.partners.forEach(function (_, i) { state.statuts['' + i] = { statut: 'en_attente', date: '', ref: '' }; });
                }
                qpWorkflowState[pid] = state;
            }
            if (!state.statuts || typeof state.statuts !== 'object') state.statuts = {};
            normalizeQPForPlafond(state.partners, state);
            return state;
        }

        function rekeyStatutsAfterDelete(state, deletedIndex) {
            var newStatuts = {};
            for (var j = 0; j < state.partners.length; j++) {
                var oldKey = '' + (j < deletedIndex ? j : j + 1);
                newStatuts['' + j] = (state.statuts && state.statuts[oldKey]) ? state.statuts[oldKey] : { statut: 'en_attente', date: '', ref: '' };
            }
            state.statuts = newStatuts;
        }

        function syncPartnersAndWorkflow(p) {
            try {
                if (!p) return;
                var state = getQPState(p);
                var partners = state.partners;
                var pid = (p.id != null) ? p.id.toString() : '';
                qpWorkflowState[pid] = state;

                var pg = document.getElementById('detailPartnersGrid');
                var pta = document.getElementById('detailPartnersTotalAmount');
                var sb = document.getElementById('qpSimulationBody');
                var stb = document.getElementById('qpStatutsBody');
                var wrap = document.getElementById('qpSimulationWrap');
                var histText = document.getElementById('qpHistoriqueText');

                var totalEur = 0;
                partners.forEach(function (x) { totalEur += (x.amount || 0); });

                if (pg) {
                    var natureLabel = { autofinancement: 'Autofinancement', subvention: 'Subvention', pret: 'Prêt' };
                    pg.innerHTML = partners.map(function (x) {
                        var am = (x.amount || 0).toLocaleString('fr-FR') + ' €';
                        var pct = (x.pct != null) ? x.pct : 0;
                        var nat = natureLabel[(x.nature || 'subvention')] || 'Subvention';
                        return '<div class="partner-item"><div class="partner-logo"><i class="fas ' + (x.icon || 'fa-euro-sign') + '"></i></div><div class="partner-info"><div class="partner-name">' + (x.name || '—').replace(/</g, '&lt;') + '</div><div class="partner-type">' + (x.type || '—').replace(/</g, '&lt;') + ' <span class="partner-nature-badge" style="font-size:0.75em;color:var(--text-muted);">' + nat + '</span></div></div><div class="partner-contribution"><div class="partner-amount">' + am + '</div><div class="partner-percentage">' + pct + '%</div></div></div>';
                    }).join('');
                }
                if (pta) pta.textContent = totalEur > 0 ? totalEur.toLocaleString('fr-FR') + ' €' : '—';

                var ro = state.locked ? ' readonly' : '';
                var updatePlafondDisplay = function () {
                    var subvPct = getQPSubventionsPct(partners);
                    var totalEur = 0;
                    partners.forEach(function (x) { totalEur += (x.amount || 0); });
                    var banner = document.getElementById('qpPlafondBanner');
                    var okDiv = document.getElementById('qpPlafondOk');
                    var pctSpan = document.getElementById('qpSubventionsPct');
                    if (banner) banner.style.display = (totalEur > 0 && subvPct > QP_PLAFOND_AIDES_PUBLIQUES) ? 'block' : 'none';
                    if (okDiv) okDiv.style.display = (totalEur > 0 && subvPct <= QP_PLAFOND_AIDES_PUBLIQUES) ? 'block' : 'none';
                    if (pctSpan) pctSpan.textContent = subvPct;
                };
                if (sb) {
                    sb.innerHTML = partners.map(function (x, i) {
                        var am = (x.amount || 0);
                        var nameEsc = (x.name || '').replace(/</g, '&lt;').replace(/"/g, '&quot;');
                        var nat = x.nature || 'subvention';
                        var selNat = '<select class="qp-nature" data-qp-index="' + i + '"' + ro + '><option value="subvention"' + (nat === 'subvention' ? ' selected' : '') + '>Subvention</option><option value="pret"' + (nat === 'pret' ? ' selected' : '') + '>Prêt</option><option value="autofinancement"' + (nat === 'autofinancement' ? ' selected' : '') + '>Autofinancement</option></select>';
                        return '<tr data-qp-index="' + i + '"><td><input type="text" class="qp-name" data-qp-index="' + i + '" value="' + nameEsc + '"' + ro + ' placeholder="Financeur"></td><td>' + selNat + '</td><td><input type="text" class="qp-montant" data-qp-index="' + i + '" value="' + am.toLocaleString('fr-FR') + '"' + ro + '></td><td><input type="text" class="qp-pct" data-qp-index="' + i + '" value="' + (x.pct != null ? x.pct : 0) + '"' + ro + '></td><td><button type="button" class="qp-btn-del" data-qp-index="' + i + '" title="Supprimer la ligne" aria-label="Supprimer"><i class="fas fa-times"></i></button></td></tr>';
                    }).join('');

                    sb.querySelectorAll('.qp-nature').forEach(function (sel) {
                        sel.addEventListener('change', function () {
                            try {
                                var i = parseInt(this.getAttribute('data-qp-index'), 10);
                                if (isNaN(i) || !partners[i]) return;
                                partners[i].nature = this.value;
                                saveQPWorkflowState();
                                syncPartnersAndWorkflow(p);
                            } catch (err) {}
                        });
                    });
                    function refreshQPTableFromPartners(editedIndex) {
                        var totalEur = 0;
                        partners.forEach(function (x) { totalEur += (x.amount || 0); });
                        partners.forEach(function (x) {
                            x.pct = totalEur > 0 ? Math.round(1000 * (x.amount || 0) / totalEur) / 10 : 0;
                        });
                        sb.querySelectorAll('tr[data-qp-index]').forEach(function (row) {
                            var j = parseInt(row.getAttribute('data-qp-index'), 10);
                            if (isNaN(j) || !partners[j]) return;
                            var amtInp = row.querySelector('input.qp-montant');
                            var pctInp = row.querySelector('input.qp-pct');
                            if (pctInp) pctInp.value = partners[j].pct != null ? partners[j].pct : 0;
                            if (amtInp && (editedIndex == null || j === editedIndex)) amtInp.value = (partners[j].amount || 0).toLocaleString('fr-FR');
                        });
                    }
                    function applyQPInputSync() {
                        var i = parseInt(this.getAttribute('data-qp-index'), 10);
                        if (isNaN(i) || !partners[i]) return;
                        if (this.classList.contains('qp-name')) { partners[i].name = this.value; }
                        if (this.classList.contains('qp-montant')) {
                            var n = parseFloat(String(this.value).replace(/[\s]/g, '').replace(',', '.'));
                            partners[i].amount = isNaN(n) ? 0 : Math.round(n);
                            refreshQPTableFromPartners(i);
                        }
                        if (this.classList.contains('qp-pct')) {
                            var p = parseFloat(String(this.value).replace(/\s/g, '').replace(',', '.').replace('%', ''));
                            partners[i].pct = isNaN(p) ? 0 : Math.min(99.9, Math.max(0, p));
                            var totalWithoutThis = 0;
                            partners.forEach(function (x, j) { if (j !== i) totalWithoutThis += (x.amount || 0); });
                            var pctVal = partners[i].pct / 100;
                            var newAmount;
                            if (pctVal <= 0) newAmount = 0;
                            else newAmount = Math.round((pctVal * totalWithoutThis) / (1 - pctVal));
                            partners[i].amount = newAmount;
                            refreshQPTableFromPartners(i);
                        }
                        saveQPWorkflowState();
                        var totalEur = 0;
                        partners.forEach(function (x) { totalEur += (x.amount || 0); });
                        var natureLabel = { autofinancement: 'Autofinancement', subvention: 'Subvention', pret: 'Prêt' };
                        if (pg) pg.innerHTML = partners.map(function (x) {
                            var am = (x.amount || 0).toLocaleString('fr-FR') + ' €';
                            var nat = natureLabel[(x.nature || 'subvention')] || 'Subvention';
                            return '<div class="partner-item"><div class="partner-logo"><i class="fas ' + (x.icon || 'fa-euro-sign') + '"></i></div><div class="partner-info"><div class="partner-name">' + (x.name || '—').replace(/</g, '&lt;') + '</div><div class="partner-type">' + (x.type || '—').replace(/</g, '&lt;') + ' <span class="partner-nature-badge" style="font-size:0.75em;color:var(--text-muted);">' + nat + '</span></div></div><div class="partner-contribution"><div class="partner-amount">' + am + '</div><div class="partner-percentage">' + (x.pct != null ? x.pct : 0) + '%</div></div></div>';
                        }).join('');
                        if (pta) pta.textContent = totalEur > 0 ? totalEur.toLocaleString('fr-FR') + ' €' : '—';
                        var stb = document.getElementById('qpStatutsBody');
                        if (stb && this.classList.contains('qp-name')) {
                            var row = stb.querySelector('tr[data-qp-index="' + i + '"]');
                            if (row) { var cell = row.querySelector('td:first-child'); if (cell) cell.textContent = partners[i].name || '—'; }
                        }
                        if (typeof updatePlafondDisplay === 'function') updatePlafondDisplay();
                    }
                    sb.querySelectorAll('.qp-name, .qp-montant, .qp-pct').forEach(function (inp) {
                        inp.addEventListener('input', function () { try { applyQPInputSync.call(this); } catch (err) {} });
                        inp.addEventListener('change', function () { try { applyQPInputSync.call(this); } catch (err) {} });
                    });
                    sb.querySelectorAll('.qp-btn-del').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            try {
                                var i = parseInt(this.getAttribute('data-qp-index'), 10);
                                if (isNaN(i) || i < 0 || i >= partners.length) return;
                                state.partners.splice(i, 1);
                                rekeyStatutsAfterDelete(state, i);
                                saveQPWorkflowState();
                                syncPartnersAndWorkflow(p);
                            } catch (err) {}
                        });
                    });
                }

                if (stb) {
                    stb.innerHTML = partners.map(function (x, i) {
                        var s = (state.statuts && state.statuts['' + i]) ? state.statuts['' + i] : { statut: 'en_attente', date: '', ref: '' };
                        var nameEsc = (x.name || '—').replace(/</g, '&lt;');
                        var rowClass = s.statut === 'valide' ? ' qp-row-valide' : '';
                        var selDisabled = s.statut === 'valide' ? ' disabled' : '';
                        var inpRo = s.statut === 'valide' ? ' readonly' : '';
                        var sel = '<select class="qp-statut-select" data-qp-index="' + i + '"' + selDisabled + '><option value="en_attente"' + (s.statut === 'en_attente' ? ' selected' : '') + '>En attente</option><option value="valide"' + (s.statut === 'valide' ? ' selected' : '') + '>Validé</option><option value="modifie"' + (s.statut === 'modifie' ? ' selected' : '') + '>Modifié</option><option value="refuse"' + (s.statut === 'refuse' ? ' selected' : '') + '>Refusé</option></select>';
                        var btnValide = '<button type="button" class="qp-btn-valide" data-qp-index="' + i + '" title="Valider la ligne"' + (s.statut === 'valide' ? ' disabled' : '') + '><i class="fas fa-check"></i> Validé</button>';
                        var btnModifier = s.statut === 'valide' ? '<button type="button" class="qp-btn-modifier" data-qp-index="' + i + '" title="Débloquer la ligne"><i class="fas fa-edit"></i> Modifier</button>' : '';
                        return '<tr data-qp-index="' + i + '" class="' + rowClass.trim() + '"><td>' + nameEsc + '</td><td>' + sel + '</td><td><input type="text" class="qp-date" data-qp-index="' + i + '" value="' + (s.date || '').replace(/</g, '&lt;') + '" placeholder="JJ/MM/AAAA"' + inpRo + '></td><td><input type="text" class="qp-ref" data-qp-index="' + i + '" value="' + (s.ref || '').replace(/</g, '&lt;') + '" placeholder="Réf. courrier / délibération"' + inpRo + '></td><td class="qp-actions-cell">' + btnValide + ' ' + btnModifier + ' <button type="button" class="qp-btn-del" data-qp-index="' + i + '" title="Supprimer la ligne" aria-label="Supprimer"><i class="fas fa-times"></i></button></td></tr>';
                    }).join('');

                    stb.querySelectorAll('.qp-date, .qp-ref').forEach(function (inp) {
                        inp.addEventListener('change', function () {
                            try {
                                var i = this.getAttribute('data-qp-index');
                                if (!state.statuts) state.statuts = {};
                                if (!state.statuts[i]) state.statuts[i] = { statut: 'en_attente', date: '', ref: '' };
                                if (inp.classList.contains('qp-date')) state.statuts[i].date = inp.value;
                                if (inp.classList.contains('qp-ref')) state.statuts[i].ref = inp.value;
                                saveQPWorkflowState();
                            } catch (err) {}
                        });
                    });
                    stb.querySelectorAll('.qp-statut-select').forEach(function (sel) {
                        sel.addEventListener('change', function () {
                            try {
                                var i = this.getAttribute('data-qp-index');
                                if (!state.statuts) state.statuts = {};
                                if (!state.statuts[i]) state.statuts[i] = { statut: 'en_attente', date: '', ref: '' };
                                state.statuts[i].statut = this.value;
                                saveQPWorkflowState();
                                var allValide = state.partners.every(function (_, j) { var s = state.statuts['' + j]; return s && s.statut === 'valide'; });
                                state.locked = allValide && state.partners.length > 0;
                                if (wrap) { if (state.locked) wrap.classList.add('locked'); else wrap.classList.remove('locked'); }
                                if (histText) histText.textContent = state.locked ? 'Tableau de financement verrouillé. Toutes les quotes-parts sont validées.' : 'Toutes les décisions, dates et références sont archivées dans la fiche projet.';
                            } catch (err) {}
                        });
                    });
                    stb.querySelectorAll('.qp-btn-valide').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            try {
                                if (this.disabled) return;
                                var i = this.getAttribute('data-qp-index');
                                if (!state.statuts) state.statuts = {};
                                if (!state.statuts[i]) state.statuts[i] = { statut: 'en_attente', date: '', ref: '' };
                                state.statuts[i].statut = 'valide';
                                saveQPWorkflowState();
                                syncPartnersAndWorkflow(p);
                            } catch (err) {}
                        });
                    });
                    stb.querySelectorAll('.qp-btn-modifier').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            try {
                                var i = this.getAttribute('data-qp-index');
                                if (!state.statuts) state.statuts = {};
                                if (!state.statuts[i]) state.statuts[i] = { statut: 'en_attente', date: '', ref: '' };
                                state.statuts[i].statut = 'en_attente';
                                saveQPWorkflowState();
                                syncPartnersAndWorkflow(p);
                            } catch (err) {}
                        });
                    });
                    stb.querySelectorAll('.qp-btn-del').forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            try {
                                var i = parseInt(this.getAttribute('data-qp-index'), 10);
                                if (isNaN(i) || i < 0 || i >= partners.length) return;
                                state.partners.splice(i, 1);
                                rekeyStatutsAfterDelete(state, i);
                                saveQPWorkflowState();
                                syncPartnersAndWorkflow(p);
                            } catch (err) {}
                        });
                    });
                }

                var allValide = state.partners.length > 0 && state.partners.every(function (_, j) { var s = state.statuts['' + j]; return s && s.statut === 'valide'; });
                state.locked = allValide;
                if (wrap) { if (state.locked) wrap.classList.add('locked'); else wrap.classList.remove('locked'); }
                if (histText) histText.textContent = state.locked ? 'Tableau de financement verrouillé. Toutes les quotes-parts sont validées.' : 'Toutes les décisions, dates et références sont archivées dans la fiche projet.';
                if (typeof updatePlafondDisplay === 'function') updatePlafondDisplay();
                saveQPWorkflowState();
                if (typeof bindQpAddRowButton === 'function') bindQpAddRowButton();
            } catch (e) {}
        }

        function qpAddRow() {
            try {
                var p = window.__currentProjet;
                if (!p) {
                    if (typeof showToast === 'function') showToast('Ouvrez d\'abord un projet pour ajouter une ligne de financeur.', 'warning');
                    else alert('Ouvrez d\'abord un projet pour ajouter une ligne.');
                    return;
                }
                var state = getQPState(p);
                var pid = (p.id != null) ? p.id.toString() : '';
                qpWorkflowState[pid] = state;
                state.partners.push({ name: 'Nouveau financeur', type: 'À renseigner', pct: 0, icon: 'fa-euro-sign', amount: 0, nature: 'subvention' });
                state.statuts['' + (state.partners.length - 1)] = { statut: 'en_attente', date: '', ref: '' };
                saveQPWorkflowState();
                syncPartnersAndWorkflow(p);
                if (typeof showToast === 'function') showToast('Ligne ajoutée.');
            } catch (err) {
                console.error('[qpAddRow]', err);
                if (typeof showToast === 'function') showToast('Erreur lors de l\'ajout de la ligne.', 'error');
            }
        }
        window.qpAddRow = qpAddRow;

        function bindQpAddRowButton() {
            var btn = document.getElementById('qpBtnAddRow');
            if (btn && !btn._qpAddRowBound) {
                btn._qpAddRowBound = true;
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (typeof qpAddRow === 'function') qpAddRow();
                });
            }
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', bindQpAddRowButton);
        } else {
            bindQpAddRowButton();
        }

        function generateDossierQuotesParts() {
            try {
                var p = window.__currentProjet;
                if (!p) { alert('Aucun projet sélectionné.'); return; }
                var state = getQPState(p);
                var partners = state.partners;
                if (!partners || !partners.length) { alert('Aucun financeur à inclure dans le dossier.'); return; }
                var totalEur = 0;
                partners.forEach(function (x) { totalEur += (x.amount || 0); });
                var title = (p.title || p.name || 'Projet').toString().replace(/</g, '&lt;');
                var filename = 'Dossier_quotes-parts_' + (p.id || 'projet') + '.pdf';
                if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
                    var JsPDF = window.jspdf.jsPDF;
                    var doc = new JsPDF('p', 'mm', 'a4');
                    doc.setFontSize(14);
                    doc.text('Dossier de validation des quotes-parts', 20, 20);
                    doc.setFontSize(10);
                    doc.text('Projet : ' + title, 20, 28);
                    doc.text('Budget total : ' + totalEur.toLocaleString('fr-FR') + ' €', 20, 34);
                    var y = 42;
                    var natureLabel = { autofinancement: 'Autofinancement', subvention: 'Subvention', pret: 'Prêt' };
                    partners.forEach(function (x) {
                        var nat = natureLabel[(x.nature || 'subvention')] || 'Subvention';
                        doc.text((x.name || '—') + ' (' + nat + ') : ' + (x.amount || 0).toLocaleString('fr-FR') + ' € (' + (x.pct != null ? x.pct : 0) + ' %)', 20, y);
                        y += 6;
                    });
                    var subvPct = getQPSubventionsPct(partners);
                    y += 4;
                    doc.setFontSize(9);
                    doc.text('Règle : aides publiques (subventions) plafonnées à 80 % max. Total subventions : ' + subvPct + ' %.', 20, y);
                    doc.save(filename);
                }
                alert('Génération du dossier de validation des quotes-parts\n\nColConnect produit :\n• Un PDF récapitulatif (tableau de financement, description du projet)\n• Un modèle de courrier personnalisé par financeur\n\nTéléchargez le dossier puis transmettez-le aux financeurs via vos canaux habituels (email, courrier, plateforme).\n\nProjet : ' + title);
            } catch (e) {}
        }

        function populateProjectDetails(p) {
            window.__currentProjet = p;
            // Normalisation etudes/travaux (compat projectsDatabase et projetsParCollectivite)
            var etudesNorm = p.etudes ?? p.progressEtudes ?? (p.status === 'termine' ? 100 : (p.status === 'travaux' ? 100 : (p.status === 'etude' ? 30 : 0)));
            var travauxNorm = p.travaux ?? p.progressTravaux ?? (p.status === 'termine' ? 100 : (p.status === 'travaux' ? 50 : 0));
            etudesNorm = Math.max(0, Math.min(100, parseInt(etudesNorm, 10) || 0));
            travauxNorm = Math.max(0, Math.min(100, parseInt(travauxNorm, 10) || 0));

            // ---------- Vue Collectivité (détail complet)
            const titleEl = document.getElementById('detailTitle');
            if (titleEl) titleEl.textContent = p.title || p.name || 'Projet';

            const ae = document.getElementById('detailAdresse');
            if (ae) ae.textContent = p.adresse || '—';

            const aEl = document.getElementById('detailAnalyse');
            if (aEl) aEl.textContent = (p.analyse && String(p.analyse).trim()) ? p.analyse : ((typeof getAnalyseForProject === 'function' && p.id && typeof projectsDatabase !== 'undefined') ? getAnalyseForProject(projectsDatabase.find(function(x){ return x.id == p.id; }) || p) : '—');

            const codeEl = document.getElementById('detailCode');
            if (codeEl) codeEl.textContent = p.code || formatProjetCode(p.id || '') || '—';

            // Status pill (si présent)
            const statusEl = document.querySelector('#detailCollectiviteView .projet-status');
            if (statusEl) {
                statusEl.classList.remove('etude','travaux','termine','creation');
                statusEl.classList.add(p.status || 'etude');
                const label = (p.status === 'travaux') ? 'En travaux' : (p.status === 'termine') ? 'Terminé' : (p.status === 'creation') ? 'En création' : 'En études';
                const icon = (p.status === 'travaux') ? 'fa-hard-hat' : (p.status === 'termine') ? 'fa-check-circle' : (p.status === 'creation') ? 'fa-file-alt' : 'fa-search';
                statusEl.innerHTML = `<i class="fas ${icon}"></i> ${label}`;
            }

            // Budget/date dans le hero (meilleure compat: on remplace juste les valeurs)
            const hero = document.querySelector('#detailCollectiviteView .detail-hero');
            if (hero) {
                const budgetNode = hero.querySelector('i.fa-euro-sign')?.parentElement;
                if (budgetNode) budgetNode.innerHTML = `<i class="fas fa-euro-sign" style="color: var(--accent-orange); margin-right: 0.5rem;"></i> Budget: ${p.budget || '—'}`;
            }

            // ---------- Partenaires financiers + workflow quotes-parts (une seule source, 3 tableaux synchronisés)
            try { if (typeof syncPartnersAndWorkflow === 'function') syncPartnersAndWorkflow(p); } catch (qpErr) {}

            // ---------- Suivi de l'avancement (4 étapes)
            var st = p.status || 'etude';
            var c1 = (etudesNorm > 0 || st === 'travaux' || st === 'termine') ? 'completed' : '';
            var c2 = etudesNorm >= 100 ? 'completed' : (st === 'etude' ? 'active' : '');
            var c3 = travauxNorm >= 100 || st === 'termine' ? 'completed' : (st === 'travaux' && travauxNorm < 100 ? 'active' : '');
            var c4 = st === 'termine' ? 'completed' : (st === 'travaux' && travauxNorm >= 100 ? 'active' : '');
            var steps = [
                { c: c1, icon: 'fa-lightbulb', label: 'Conception' },
                { c: c2, icon: 'fa-pencil-ruler', label: 'Études' },
                { c: c3, icon: 'fa-hard-hat', label: 'Travaux' },
                { c: c4, icon: 'fa-key', label: 'Livraison' }
            ];
            var sv = document.getElementById('detailSuiviVisual');
            if (sv) {
                sv.innerHTML = steps.map(function (s) { return '<div class="suivi-step ' + (s.c || '') + '"><div class="suivi-icon-wrapper"><i class="fas ' + s.icon + '"></i></div><span class="suivi-label">' + s.label + '</span></div>'; }).join('');
            }

            // ---------- Phases (Études, Travaux, Livraison)
            var pe = document.getElementById('detailPhaseEtudes');
            if (pe) {
                var pep = pe.querySelector('.phase-progress');
                var pes = pe.querySelector('.phase-statut');
                if (pep) pep.textContent = etudesNorm + '%';
                if (pes) pes.textContent = etudesNorm >= 100 ? 'Terminée' : (st === 'etude' ? 'En cours' : 'À venir');
            }
            var pt = document.getElementById('detailPhaseTravaux');
            if (pt) {
                var ptp = pt.querySelector('.phase-progress');
                var pts = pt.querySelector('.phase-statut');
                if (ptp) ptp.textContent = travauxNorm + '%';
                if (pts) pts.textContent = (st === 'termine') ? 'Terminée' : (st === 'travaux' ? 'En cours' : 'À venir');
            }
            var pl = document.getElementById('detailPhaseLivraison');
            if (pl) {
                var plp = pl.querySelector('.phase-progress');
                var pls = pl.querySelector('.phase-statut');
                if (plp) plp.textContent = st === 'termine' ? '100%' : (st === 'travaux' && travauxNorm >= 100 ? travauxNorm + '%' : '—');
                if (pls) pls.textContent = (st === 'termine') ? 'Terminée' : (st === 'travaux' && travauxNorm >= 100 ? 'En cours' : 'À venir');
            }

            // ---------- Vue Financeur (lecture synthétique)
            const fTitle = document.getElementById('financeurProjectTitle');
            if (fTitle) fTitle.textContent = p.title || 'Projet';
            const fCode = document.getElementById('financeurProjectCode');
            if (fCode) fCode.textContent = p.code || formatProjetCode(p.id || '') || '—';

            const cName = (typeof currentCollectivite === 'string' && currentCollectivite.trim()) ? currentCollectivite : (document.getElementById('ficheName')?.textContent || 'Collectivité');
            const fmC = document.getElementById('financeurMetaCollectivite');
            if (fmC) fmC.textContent = cName;

            const fmS = document.getElementById('financeurMetaStatut');
            if (fmS) {
                var st = String(p.status || '').toLowerCase();
                fmS.textContent = (st === 'creation') ? 'En création' : (st === 'travaux') ? 'En travaux' : (st === 'termine') ? 'Terminé' : 'En études';
            }

            // ---------- Budget & financement (synchronisé collectivité / quotes-parts)
            var totalEur = p.budgetNum;
            if (totalEur == null || isNaN(totalEur)) {
                var b = p.budget;
                if (typeof b === 'number') { totalEur = b * 1e6; }
                else {
                    var n = parseFloat(String(b || '0').replace(/[^\d.,]/g, '').replace(',', '.'));
                    totalEur = (isNaN(n) ? 0 : n) * 1e6;
                }
            }
            var stateQP = getQPState(p);
            var dejaFinance = 0;
            stateQP.partners.forEach(function (x, i) {
                if (stateQP.statuts && stateQP.statuts['' + i] && stateQP.statuts['' + i].statut === 'valide') {
                    dejaFinance += (x.amount || 0);
                }
            });
            var aSecuriser = Math.max(0, Math.round((totalEur || 0) - dejaFinance));
            var totalEurRounded = Math.round(totalEur || 0);
            var pctDeja = totalEurRounded > 0 ? Math.round((dejaFinance / totalEurRounded) * 100) : 0;

            var budgetCard = document.getElementById('projetBudgetFinancement');
            if (budgetCard) {
                var ul = budgetCard.querySelector('ul');
                if (ul) {
                    ul.innerHTML =
                        '<li><strong>Coût total :</strong> ' + (totalEurRounded > 0 ? totalEurRounded.toLocaleString('fr-FR') + ' €' : '—') + '</li>' +
                        '<li class="projet-budget-finance-deja" id="projetBudgetDejaFinance"><strong>Déjà financé :</strong> ' + (dejaFinance > 0 ? dejaFinance.toLocaleString('fr-FR') + ' € (' + pctDeja + '%)' : '—') + '</li>' +
                        '<li class="projet-budget-finance-securiser" id="projetBudgetASecuriser"><strong>À sécuriser :</strong> ' + (aSecuriser > 0 ? aSecuriser.toLocaleString('fr-FR') + ' €' : (totalEurRounded > 0 ? '0 €' : '—')) + '</li>' +
                        '<li class="projet-budget-finance-nature" id="projetBudgetNature"><strong>Nature :</strong> 100% financement public</li>';
                }
            }

            // ---------- Échéancier du projet (dérivé de p.date et p.status)
            var baseYear = new Date().getFullYear();
            var baseMonth = new Date().getMonth();
            var dateStr = (p.date || '').toString().trim();
            var matchYear = dateStr.match(/(\d{4})/);
            if (matchYear) baseYear = parseInt(matchYear[1], 10);
            var months = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
            function monthLabel(yr, mo) { return (mo >= 0 && mo < 12 ? months[mo] : months[0]) + ' ' + yr; }
            var st = p.status || 'etude';
            var etudesNorm = p.etudes ?? p.progressEtudes ?? (st === 'termine' ? 100 : (st === 'travaux' ? 100 : (st === 'etude' ? 30 : 0)));
            var travauxNorm = p.travaux ?? p.progressTravaux ?? (st === 'termine' ? 100 : (st === 'travaux' ? 50 : 0));
            etudesNorm = Math.max(0, Math.min(100, parseInt(etudesNorm, 10) || 0));
            travauxNorm = Math.max(0, Math.min(100, parseInt(travauxNorm, 10) || 0));
            var livraisonDate = monthLabel(baseYear, 5);
            if (/termine|terminé/i.test(dateStr)) livraisonDate = 'Terminé';
            var steps = [
                { label: 'Réf. Conception', date: monthLabel(baseYear - 2, 0), done: etudesNorm > 0 || st === 'travaux' || st === 'termine', current: false, pct: null },
                { label: 'Réf. Lancement études', date: monthLabel(baseYear - 1, 2), done: etudesNorm >= 30, current: st === 'etude' && etudesNorm < 30, pct: st === 'etude' && etudesNorm < 30 ? etudesNorm : null },
                { label: 'Réf. Fin études / Dépôt', date: monthLabel(baseYear - 1, 8), done: etudesNorm >= 100, current: st === 'etude' && etudesNorm >= 30, pct: st === 'etude' && etudesNorm >= 30 ? etudesNorm : null },
                { label: 'Réf. Travaux', date: monthLabel(baseYear, 2), done: travauxNorm >= 100 || st === 'termine', current: st === 'travaux', pct: st === 'travaux' ? travauxNorm : null },
                { label: 'Réf. Livraison', date: livraisonDate, done: st === 'termine', current: st === 'travaux' && travauxNorm >= 90, pct: st === 'travaux' && travauxNorm >= 90 ? travauxNorm : null }
            ];
            var dlEl = document.getElementById('financeurDeadlines');
            if (dlEl) {
                var avancementNote = 'Aligné sur le suivi d\'avancement réel — Études <strong>' + etudesNorm + ' %</strong>, Travaux <strong>' + travauxNorm + ' %</strong>.';
                var timelineHtml = '<h3><i class="fas fa-calendar-alt"></i> Échéancier du Projet</h3><p class="echeancier-note">' + avancementNote + ' Références indicatives (ces intitulés ne visent pas des documents ciblés par la plateforme).</p><div class="deadline-timeline">';
                var nextLabel = '';
                steps.forEach(function (s) {
                    var cls = 'deadline-item';
                    if (s.done) cls += ' completed';
                    else if (s.current) cls += ' current';
                    else cls += ' upcoming';
                    var pctSuffix = (s.current && s.pct != null) ? ' (' + s.pct + ' %)' : '';
                    var statusHtml = s.done ? '<span class="deadline-status done"><i class="fas fa-check"></i> Terminé</span>' : (s.current ? '<span class="deadline-status in-progress"><i class="fas fa-hourglass-half"></i> En cours' + pctSuffix + '</span>' : '<span class="deadline-status pending"><i class="fas fa-clock"></i> À venir</span>');
                    timelineHtml += '<div class="' + cls + '"><div class="deadline-date">' + s.date + '</div><div class="deadline-label">' + s.label + ' ' + statusHtml + '</div></div>';
                    if (!s.done && !nextLabel) nextLabel = s.label + ' - ' + s.date;
                });
                timelineHtml += '</div>';
                timelineHtml += '<div class="deadline-alert"><i class="fas fa-bell"></i><div class="deadline-alert-text">Prochaine échéance : <span class="deadline-alert-date">' + (nextLabel || livraisonDate) + '</span></div></div>';
                dlEl.innerHTML = timelineHtml;
            }

            // ---------- Chronologie Collectivité (alignée sur avancement réel) + formulaire éditer
            var timelineContainer = document.getElementById('projetTimelineContainer');
            if (timelineContainer) {
                var timelineColHtml = '<h3 class="timeline-title"><i class="fas fa-history"></i> Chronologie du projet</h3>';
                timelineColHtml += '<p class="echeancier-note" style="margin:-0.3rem 0 0.6rem 0;font-size:0.85rem;color:var(--text-muted);">Aligné sur le suivi d\'avancement réel — Études <strong>' + etudesNorm + ' %</strong>, Travaux <strong>' + travauxNorm + ' %</strong>. Références indicatives.</p>';
                timelineColHtml += '<div class="timeline" id="projetTimeline">';
                steps.forEach(function (s) {
                    var cls = 'timeline-item';
                    if (s.done) cls += ' completed';
                    else if (s.current) cls += ' active';
                    var pctSuffix = (s.current && s.pct != null) ? ' (' + s.pct + ' %)' : '';
                    var statLabel = s.done ? 'Terminé' : (s.current ? 'En cours' + pctSuffix : 'À venir');
                    timelineColHtml += '<div class="' + cls + '"><div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-date">' + s.date + '</div><div class="timeline-label">' + s.label + ' — ' + statLabel + '</div></div></div>';
                });
                timelineColHtml += '</div>';
                var canEdit = (typeof isProjetFromUserCollectivite === 'function' && isProjetFromUserCollectivite(p));
                timelineColHtml += '<div class="chrono-form-wrap" id="chronoFormWrap" style="' + (canEdit ? '' : 'display:none;') + 'margin-top:1.25rem;padding:1rem;background:var(--bg-elevated);border-radius:12px;border:1px solid var(--border);">';
                timelineColHtml += '<h4 style="margin:0 0 1rem 0;font-size:0.95rem;"><i class="fas fa-edit"></i> Mettre à jour l\'avancement</h4>';
                timelineColHtml += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;margin-bottom:1rem;">';
                timelineColHtml += '<div class="form-group"><label class="form-label">Statut</label><select class="form-select" id="chronoStatus"><option value="etude"' + (st === 'etude' ? ' selected' : '') + '>En études</option><option value="travaux"' + (st === 'travaux' ? ' selected' : '') + '>En travaux</option><option value="termine"' + (st === 'termine' ? ' selected' : '') + '>Terminé</option></select></div>';
                timelineColHtml += '<div class="form-group"><label class="form-label">Études (%)</label><input type="range" class="form-range" id="chronoEtudes" min="0" max="100" value="' + etudesNorm + '" oninput="document.getElementById(\'chronoEtudesVal\').textContent=this.value+\'%\'"><span id="chronoEtudesVal" style="font-weight:600;color:var(--secondary);">' + etudesNorm + '%</span></div>';
                timelineColHtml += '<div class="form-group"><label class="form-label">Travaux (%)</label><input type="range" class="form-range" id="chronoTravaux" min="0" max="100" value="' + travauxNorm + '" oninput="document.getElementById(\'chronoTravauxVal\').textContent=this.value+\'%\'"><span id="chronoTravauxVal" style="font-weight:600;color:var(--secondary);">' + travauxNorm + '%</span></div>';
                timelineColHtml += '<div class="form-group"><label class="form-label">Date livraison prévue</label><input type="text" class="form-input" id="chronoDate" placeholder="Ex: Juin 2026" value="' + ((p.date || '').toString().replace(/</g, '&lt;')) + '"></div>';
                timelineColHtml += '</div><button type="button" class="btn btn-primary" onclick="submitChronoAvancement()"><i class="fas fa-save"></i> Enregistrer l\'avancement</button></div>';
                timelineContainer.innerHTML = timelineColHtml;
            }

            // KPI Financeur
            const maturite = document.getElementById('financeurKpiMaturite');
            if (maturite) {
                // heuristique simple: études/travaux -> maturité
                const mScore = (p.status === 'termine') ? 5 : (p.status === 'travaux') ? 4 : (etudesNorm >= 70 ? 3 : 2);
                maturite.textContent = maturityDots(mScore);
            }

            const av = document.getElementById('financeurKpiAvancement');
            if (av) {
                var phaseCourante = (st === 'termine') ? 'Terminé' : (st === 'travaux') ? ('Travaux ' + travauxNorm + '%') : ('Études ' + etudesNorm + '%');
                av.textContent = phaseCourante;
            }

            const bud = document.getElementById('financeurKpiBudget');
            if (bud) bud.textContent = (totalEur != null && totalEur > 0) ? ((totalEur / 1e6).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + ' M€') : 'À consolider';

            const govEl = document.getElementById('financeurKpiGouvernance');
            if (govEl) govEl.textContent = (p.status === 'travaux' || p.status === 'termine') ? 'Identifiée' : 'À confirmer';

            const plan = document.getElementById('financeurKpiPlanning');
            if (plan) plan.textContent = (p.status === 'travaux' || p.status === 'termine') ? 'Engagé' : 'Prévisionnel';

            const maj = document.getElementById('financeurKpiMaj');
            if (maj) maj.textContent = p.date || '—';

            // ---------- Gouvernance & acteurs (depuis données projet)
            var rawProj = (typeof projectsDatabase !== 'undefined' ? projectsDatabase : []).find(function(x){ return x.id == p.id; }) || (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets) ? __userCreatedProjets : []).find(function(x){ return x.id == p.id; });
            var gov = (rawProj && rawProj.governance) ? rawProj.governance : {};
            var govItems = [
                { label: 'Porteur politique', key: 'porteurPolitique' },
                { label: 'Chef de projet', key: 'chefProjet' },
                { label: 'MOD', key: 'mod' },
                { label: 'MOE', key: 'moe' },
                { label: 'AMO / CSPS / Bureau de contrôle', key: 'amoCsps' },
                { label: 'Partenaires', key: 'partenaires' }
            ];
            var govListEl = document.getElementById('projetGovernanceList');
            if (govListEl) {
                var hasAny = govItems.some(function(it){ return (gov[it.key] || '').trim(); });
                govListEl.innerHTML = hasAny ? govItems.filter(function(it){ return (gov[it.key] || '').trim(); }).map(function(it){
                    return '<li><strong>' + it.label + ' :</strong> ' + (gov[it.key] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</li>';
                }).join('') : '<li><em>Non renseigné</em>. Renseignez les acteurs lors de la création ou via la modification du projet.</li>';
            }

            // Mise à jour collectiviteKpiGrid (vue Collectivité) — synchronisé avec mêmes données
            var cMat = document.getElementById('collectiviteKpiMaturite');
            if (cMat) cMat.textContent = typeof maturityDots === 'function' ? maturityDots((p.status === 'termine') ? 5 : (p.status === 'travaux') ? 4 : (etudesNorm >= 70 ? 3 : 2)) : '●●●●○';
            var cAv = document.getElementById('collectiviteKpiAvancement');
            if (cAv) cAv.textContent = (st === 'termine') ? 'Terminé' : (st === 'travaux') ? ('Travaux ' + travauxNorm + '%') : ('Études ' + etudesNorm + '%');
            var cBud = document.getElementById('collectiviteKpiBudget');
            if (cBud) cBud.textContent = (totalEur != null && totalEur > 0) ? ((totalEur / 1e6).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + ' M€') : (p.budget || '—');
            var cPlan = document.getElementById('collectiviteKpiPlanning');
            if (cPlan) cPlan.textContent = (p.status === 'travaux' || p.status === 'termine') ? 'Engagé' : 'Prévisionnel';
            var cMaj = document.getElementById('collectiviteKpiMaj');
            if (cMaj) cMaj.textContent = p.date || '—';

            // Appliquer les règles de visibilité selon l'appartenance du projet (avec délai pour garantir que le DOM est prêt)
            setTimeout(() => {
                applyProjetVisibilityRules(p);
                // Mise à jour bloc climat (Traçabilité Finance Climat) + formulaire Checklist audit-ready
                if (typeof updateClimatWidget === 'function') updateClimatWidget(p.title || p.name || '');
                if (typeof setupAuditChecklistForm === 'function') setupAuditChecklistForm(p.id, p.status);
                // Bouton Éditer MRV : toujours actif (éditable pour tout statut)
                var btnClimat = document.getElementById('btnEditClimatMRV');
                if (btnClimat) btnClimat.style.display = '';
            }, 100);

            // Si on n'est pas en mode "ouverte depuis Administration > Validations", remettre le bouton Retour par défaut
            if (!window.__detailFromAdminValidation) {
                var backEl = document.querySelector('#detail .detail-back');
                if (backEl) {
                    backEl.innerHTML = '<i class="fas fa-arrow-left"></i> Retour à la liste des projets';
                    backEl.onclick = function() { if (typeof navigateTo === 'function') navigateTo('projets'); };
                }
            }
        }

        // ========================
        // VISIBILITÉ CONDITIONNELLE PROJETS
        // ========================

        /**
         * Vérifie si le projet appartient à la collectivité de l'utilisateur connecté
         * @param {Object} projet - Objet projet
         * @returns {boolean} true si le projet appartient à la collectivité de l'utilisateur
         */
        function isProjetFromUserCollectivite(projet) {
            if (!projet) {
                console.log('[ColConnect] isProjetFromUserCollectivite: projet est null/undefined');
                return false;
            }

            // Récupérer la collectivité de l'utilisateur
            const userCollectivite = currentUserCollectivite || 
                (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ||
                (document.getElementById('collectiviteName')?.textContent?.trim()) ||
                (document.getElementById('ficheName')?.textContent?.trim()) ||
                'Ville de Lyon';

            // Vérifier l'appartenance du projet
            let projetCollectivite = null;
            
            // Si le projet a directement une propriété collectivite (priorité)
            if (projet.collectivite) {
                projetCollectivite = projet.collectivite;
            }
            // Si le projet a un collectiviteId, chercher dans COLLECTIVITES_REF
            else if (projet.collectiviteId && typeof COLLECTIVITES_REF !== 'undefined') {
                const collectiviteRef = COLLECTIVITES_REF.find(c => c.id === projet.collectiviteId || c.nom === projet.collectiviteId);
                if (collectiviteRef) {
                    projetCollectivite = collectiviteRef.nom || collectiviteRef.name;
                }
            }

            // Si toujours pas trouvé, retourner false (projet externe par défaut)
            if (!projetCollectivite) {
                return false;
            }

            // Comparaison (insensible à la casse et aux espaces)
            const normalize = (str) => (str || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return normalize(projetCollectivite) === normalize(userCollectivite);
        }

        /**
         * Applique les règles de visibilité selon l'appartenance du projet
         * @param {Object} projet - Objet projet
         */
        function applyProjetVisibilityRules(projet) {
            if (!projet) return;
            
            const isOwnProjet = isProjetFromUserCollectivite(projet);
            const detailView = document.getElementById('detailCollectiviteView');
            const detailFinanceurView = document.getElementById('detailFinanceurView');
            
            // Appliquer la classe sur les deux vues (Collectivité et Financeur)
            const views = [detailView, detailFinanceurView].filter(v => v !== null);

            // Ajouter ou retirer la classe "projet-externe" selon l'appartenance
            if (isOwnProjet) {
                views.forEach(view => view.classList.remove('projet-externe'));
                
                // Restaurer la visibilité des éléments du budget
                const budgetDejaFinance = document.querySelector('#projetBudgetDejaFinance') || document.getElementById('projetBudgetDejaFinance');
                const budgetASecuriser = document.querySelector('#projetBudgetASecuriser') || document.getElementById('projetBudgetASecuriser');
                const budgetNature = document.querySelector('#projetBudgetNature') || document.getElementById('projetBudgetNature');
                // Pour Avancement et Points d'attention, restaurer uniquement le contenu
                const avancementEtapesContent = document.querySelector('#projetAvancementEtapesContent') || document.getElementById('projetAvancementEtapesContent');
                const pointsAttentionContent = document.querySelector('#projetPointsAttentionContent') || document.getElementById('projetPointsAttentionContent');
                
                if (budgetDejaFinance) budgetDejaFinance.style.removeProperty('display');
                if (budgetASecuriser) budgetASecuriser.style.removeProperty('display');
                if (budgetNature) budgetNature.style.removeProperty('display');
                if (avancementEtapesContent) avancementEtapesContent.style.removeProperty('display');
                if (pointsAttentionContent) pointsAttentionContent.style.removeProperty('display');
                
                // Restaurer le signataire original si sauvegardé
                const signataireEl = document.getElementById('projetValidationSignataire');
                if (signataireEl && signataireEl.dataset.originalText) {
                    signataireEl.innerHTML = '<i class="fas fa-signature"></i> ' + signataireEl.dataset.originalText;
                }
            } else {
                views.forEach(view => view.classList.add('projet-externe'));
                
                // Masquer directement les éléments sensibles du budget (JavaScript pour garantir)
                // Chercher dans les deux vues (même si non active) - utiliser querySelector pour forcer la recherche
                const budgetDejaFinance = document.querySelector('#projetBudgetDejaFinance') || document.getElementById('projetBudgetDejaFinance');
                const budgetASecuriser = document.querySelector('#projetBudgetASecuriser') || document.getElementById('projetBudgetASecuriser');
                const budgetNature = document.querySelector('#projetBudgetNature') || document.getElementById('projetBudgetNature');
                // Pour Avancement et Points d'attention, masquer uniquement le contenu (pas le titre)
                const avancementEtapesContent = document.querySelector('#projetAvancementEtapesContent') || document.getElementById('projetAvancementEtapesContent');
                const pointsAttentionContent = document.querySelector('#projetPointsAttentionContent') || document.getElementById('projetPointsAttentionContent');
                
                // Masquer avec !important via style
                if (budgetDejaFinance) {
                    budgetDejaFinance.style.setProperty('display', 'none', 'important');
                }
                if (budgetASecuriser) {
                    budgetASecuriser.style.setProperty('display', 'none', 'important');
                }
                if (budgetNature) {
                    budgetNature.style.setProperty('display', 'none', 'important');
                }
                if (avancementEtapesContent) {
                    avancementEtapesContent.style.setProperty('display', 'none', 'important');
                }
                if (pointsAttentionContent) {
                    pointsAttentionContent.style.setProperty('display', 'none', 'important');
                }
                
                // Pour le signataire, remplacer le texte par une version grisée
                const signataireEl = document.getElementById('projetValidationSignataire');
                if (signataireEl) {
                    // Sauvegarder le texte original si pas déjà fait
                    if (!signataireEl.dataset.originalText) {
                        const signataireText = signataireEl.querySelector('#projetValidationSignataire') || signataireEl;
                        signataireEl.dataset.originalText = signataireText.textContent.trim().replace(/^Signé par\s+/i, '');
                    }
                    // Remplacer par version grisée sans nom
                    const signataireSpan = document.getElementById('projetValidationSignataire');
                    if (signataireSpan) {
                        signataireSpan.innerHTML = '<i class="fas fa-signature"></i> <span style="color: var(--text-muted); opacity: 0.5;">Signé par (non disponible)</span>';
                    }
                }
                
                // Vider la liste des documents
                const archiveList = document.getElementById('projetArchiveList');
                if (archiveList) {
                    archiveList.innerHTML = '';
                }
                
                // Masquer les dates et labels de la timeline
                const timeline = document.getElementById('projetTimeline');
                if (timeline) {
                    timeline.querySelectorAll('.timeline-date, .timeline-label').forEach(el => {
                        el.style.display = 'none';
                    });
                }
            }
        }

        // ========================
        // MES PROJETS (Projets d'une collectivité)
        // ========================
        let currentCollectivite = 'Ville de Lyon';

        // Projets par collectivité (simulation)
        const projetsParCollectivite = {
            'Ville de Lyon': [
                { title: 'Nouveau groupe scolaire Confluence', status: 'travaux', etudes: 100, travaux: 68, budget: '4.2M€', date: 'Juin 2025' },
                { title: 'Création piste cyclable Part-Dieu', status: 'travaux', etudes: 100, travaux: 45, budget: '1.8M€', date: 'Sept 2025' },
                { title: 'Rénovation du Parc de la Tête d\'Or', status: 'etude', etudes: 72, travaux: 0, budget: '12M€', date: 'Dec 2026' },
                { title: 'Modernisation éclairage public', status: 'travaux', etudes: 100, travaux: 89, budget: '3.5M€', date: 'Fév 2025' },
                { title: 'Extension médiathèque Vaise', status: 'etude', etudes: 35, travaux: 0, budget: '5.2M€', date: 'Mars 2027' },
                { title: 'Réhabilitation place Bellecour', status: 'termine', etudes: 100, travaux: 100, budget: '8.4M€', date: 'Terminé' },
            ],
            'Métropole de Lyon': [
                { title: 'Extension Ligne Métro B', status: 'etude', etudes: 45, travaux: 0, budget: '850M€', date: 'Dec 2030' },
                { title: 'Réaménagement berges du Rhône', status: 'travaux', etudes: 100, travaux: 32, budget: '25M€', date: 'Sept 2026' },
            ],
            'Conseil Départemental du Rhône': [
                { title: 'Rénovation collèges secteur Nord', status: 'travaux', etudes: 100, travaux: 55, budget: '18M€', date: 'Juin 2026' },
                { title: 'Voie verte du Beaujolais', status: 'etude', etudes: 80, travaux: 0, budget: '8M€', date: 'Mars 2027' },
            ],
            'default': []
        };

        
function voirMesProjets() {
            // Récupérer le nom de la collectivité depuis la fiche
            const collectiviteName = (document.getElementById('ficheName')?.textContent || '').trim() || 'Collectivité';
            currentCollectivite = collectiviteName;

            // Mettre à jour le titre
            const t = document.getElementById('mesProjetsCollectivite');
            if (t) t.textContent = collectiviteName;

            // Charger les projets de cette collectivité
            // Utiliser TOUS les projets de window.__projets et filtrer par collectivité
            let mesProjets = [];
            const allProjets = Array.isArray(window.__projets) ? window.__projets : [];
            function normalizeName(name) {
                return String(name || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            }
            const normalizedCollectiviteName = normalizeName(collectiviteName);
            mesProjets = allProjets.filter(function(p) {
                if ((String(p.status || '').toLowerCase()) === 'creation') return false;
                const pCollectivite = normalizeName(p.collectivite || '');
                return pCollectivite === normalizedCollectiviteName;
            });
            if (mesProjets.length === 0 && typeof COLLECTIVITES_REF !== 'undefined') {
                const collectiviteRef = COLLECTIVITES_REF.find(function(c) {
                    return normalizeName(c.nom) === normalizedCollectiviteName;
                });
                if (collectiviteRef && collectiviteRef.id) {
                    mesProjets = allProjets.filter(function(p) {
                        if ((String(p.status || '').toLowerCase()) === 'creation') return false;
                        return String(p.collectiviteId || '').trim() === String(collectiviteRef.id).trim();
                    });
                }
            }
            mesProjets = mesProjets.map(function(p) {
                // S'assurer que le nom de la collectivité est toujours présent
                const projetCollectivite = (p.collectivite && p.collectivite.trim()) ? p.collectivite.trim() : collectiviteName;
                
                // Trouver la couleur de la collectivité si elle n'est pas présente
                let couleur = p.collectiviteCouleur;
                if (!couleur && typeof COLLECTIVITES_REF !== 'undefined') {
                    const colRef = COLLECTIVITES_REF.find(function(c) {
                        return (c.nom && c.nom.trim() === projetCollectivite) || (c.id && c.id === (p.collectiviteId || ''));
                    });
                    if (colRef && colRef.couleur) couleur = colRef.couleur;
                }
                
                return {
                    id: p.id,
                    code: p.code || formatProjetCode(p.id),
                    title: p.title || p.name || '',
                    name: p.name || p.title || '',
                    status: p.status || 'etude',
                    etudes: p.etudes || 0,
                    travaux: p.travaux || 0,
                    budget: p.budget || '—',
                    date: p.date || '—',
                    collectivite: projetCollectivite,
                    collectiviteId: p.collectiviteId || '',
                    collectiviteCouleur: couleur || '#718096',
                    adresse: p.adresse || '—',
                    eligible: p.eligible || false
                };
            });
            console.log('[voirMesProjets] Collectivité:', collectiviteName, 'Projets trouvés:', mesProjets.length);

            // Trier les projets par nom (alphabétique) par défaut
            mesProjets.sort(function(a, b) {
                const nameA = (a.title || a.name || '').toLowerCase();
                const nameB = (b.title || b.name || '').toLowerCase();
                return nameA.localeCompare(nameB, 'fr', { numeric: true, sensitivity: 'base' });
            });

            // Les compteurs seront mis à jour après le stockage dans window.__currentMesProjets

            // Si la collectivité n'a pas de projets en base de démo, ne pas afficher un "Projet exemple 1" générique.
            // On génère plutôt des placeholders contextualisés (ou liste vide).
            if (!Array.isArray(mesProjets)) mesProjets = [];

            if (!mesProjets.length) {
                mesProjets = [
                    { title: `Rénovation énergétique d’un bâtiment (exemple) – ${collectiviteName}`, status: 'etude', etudes: 55, travaux: 0, budget: '—', date: '—' },
                    { title: `Aménagement voirie / sécurité piétons (exemple) – ${collectiviteName}`, status: 'etude', etudes: 35, travaux: 0, budget: '—', date: '—' }
                ];
            }

            // S'assurer que tous les projets sont stockés dans window.__currentMesProjets
            window.__currentMesProjets = Array.isArray(mesProjets) ? mesProjets : [];
            
            // Sauvegarder dans window.mesProjetsCourants pour que updateProjetsFilterCounts l'utilise
            window.mesProjetsCourants = window.__currentMesProjets;
            
            console.log('[voirMesProjets] Collectivité:', collectiviteName);
            console.log('[voirMesProjets] Projets stockés dans __currentMesProjets:', window.__currentMesProjets.length);
            console.log('[voirMesProjets] Projets stockés dans mesProjetsCourants:', window.mesProjetsCourants.length);
            if (window.__currentMesProjets.length > 0) {
                console.log('[voirMesProjets] Exemples de projets:', window.__currentMesProjets.slice(0, 3).map(p => ({ 
                    id: p.id, 
                    title: p.title, 
                    collectivite: p.collectivite,
                    collectiviteCouleur: p.collectiviteCouleur,
                    status: p.status
                })));
            }

            renderMesProjets(window.__currentMesProjets);
            
            // Mettre à jour les compteurs avec updateProjetsFilterCounts (qui utilisera mesProjetsCourants)
            if (typeof updateProjetsFilterCounts === 'function') {
                updateProjetsFilterCounts();
            }
            
            // Mettre à jour aussi avec updateMesProjetsFilterCounts pour les chips spécifiques à mes-projets
            if (typeof updateMesProjetsFilterCounts === 'function') {
                updateMesProjetsFilterCounts(window.__currentMesProjets);
            }

            // Naviguer vers la section
            navigateTo('mes-projets');
        }

        
function renderMesProjets(data) {
            // Conserver la liste courante pour pouvoir ouvrir une fiche projet fiable
            let projets = Array.isArray(data) ? data : [];
            
            // Récupérer le nom de la collectivité depuis currentCollectivite ou depuis le premier projet
            const collectiviteNameForDisplay = currentCollectivite || (projets.length > 0 && projets[0].collectivite) || 'Collectivité';
            
            // S'assurer que tous les projets ont le nom de la collectivité
            projets = projets.map(function(p) {
                if (!p.collectivite || !p.collectivite.trim()) {
                    p.collectivite = collectiviteNameForDisplay;
                }
                return p;
            });
            
            // S'assurer que les projets sont triés par nom
            projets.sort(function(a, b) {
                const nameA = (a.title || a.name || '').toLowerCase();
                const nameB = (b.title || b.name || '').toLowerCase();
                return nameA.localeCompare(nameB, 'fr', { numeric: true, sensitivity: 'base' });
            });
            
            window.__currentMesProjets = projets;

            const grid = document.getElementById('mesProjetsGrid');
            if (!grid) return;

            if (!window.__currentMesProjets.length) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <div style="display:flex; align-items:center; gap:.75rem; margin-bottom:.5rem;">
                            <div style="width:44px;height:44px;border-radius:12px;background:rgba(212,175,55,.15);display:flex;align-items:center;justify-content:center;border:1px solid rgba(212,175,55,.25);">
                                <i class="fas fa-folder-open" style="color:var(--secondary);"></i>
                            </div>
                            <div>
                                <div style="font-weight:800; color:var(--text-primary);">Aucun projet renseigné</div>
                                <div style="color:var(--text-secondary); font-size:.9rem;">Ajoute un projet ou utilise le Catalogue pour générer un modèle.</div>
                            </div>
                        </div>
                    </div>
                `;
                return;
            }

            // Gérer la pagination - Afficher TOUS les projets par défaut, pas seulement les 100 premiers
            const pageSizeSelect = document.getElementById('mesProjetsPageSize');
            const pageSize = pageSizeSelect ? parseInt(pageSizeSelect.value || '100') : 100;
            window.__mesProjetsPageSize = pageSize;
            
            // Afficher tous les projets jusqu'à la limite de pagination
            const projetsToDisplay = window.__currentMesProjets.slice(0, pageSize);
            
            console.log('[renderMesProjets] Total projets:', window.__currentMesProjets.length, 'Page size:', pageSize, 'Affichés:', projetsToDisplay.length);
            
            // Stocker les projets affichés pour que openProjetFromMesProjets fonctionne correctement
            window.__displayedMesProjets = projetsToDisplay;
            
            // Récupérer le nom de la collectivité pour l'affichage
            const collectiviteDisplayName = currentCollectivite || (projetsToDisplay.length > 0 && projetsToDisplay[0].collectivite) || document.getElementById('mesProjetsCollectivite')?.textContent || 'Collectivité';
            
            grid.innerHTML = projetsToDisplay.map((p, i) => {
                // Trouver l'index réel dans window.__currentMesProjets
                const realIndex = window.__currentMesProjets.findIndex(proj => proj.id === p.id);
                
                // S'assurer que le nom de la collectivité est présent
                const projetCollectivite = (p.collectivite && p.collectivite.trim()) ? p.collectivite.trim() : collectiviteDisplayName;
                const projetCouleur = p.collectiviteCouleur || '#718096';
                
                // Debug: vérifier que le nom de la collectivité est présent
                if (!projetCollectivite || projetCollectivite === 'Collectivité') {
                    console.warn('[renderMesProjets] Projet sans collectivité:', p.id, p.title);
                }
                
                return `
                <div class="projet-card" onclick="openProjetFromMesProjets(${realIndex >= 0 ? realIndex : i})">
                    <div class="projet-header">
                        <div>
                            <span class="projet-status ${p.status}">
                                ${p.status === 'etude' ? 'En études' : p.status === 'travaux' ? 'En travaux' : 'Terminé'}
                            </span>
                            <h3 class="projet-title">${p.title}</h3><span class="projet-code projet-code-block">${p.code || formatProjetCode(p.id)}</span>
                        </div>
                        <span class="projet-collectivite-pastille" style="background:${projetCouleur}; color: white !important; font-weight: 600; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 999px; white-space: nowrap; display: inline-block !important; flex-shrink: 0; visibility: visible !important; opacity: 1 !important; z-index: 10;" title="${projetCollectivite.replace(/"/g, '&quot;')}">${projetCollectivite.substring(0, 30)}</span>
                    </div>
                    <div class="projet-body">
                        <div class="progress-section">
                            <div class="progress-label">
                                <span>Études</span>
                                <span>${p.etudes || 0}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill etudes" style="width: ${p.etudes || 0}%"></div>
                            </div>
                        </div>
                        <div class="progress-section">
                            <div class="progress-label">
                                <span>Travaux</span>
                                <span>${p.travaux || 0}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill travaux" style="width: ${p.travaux || 0}%"></div>
                            </div>
                        </div>
                        <div style="display:flex; justify-content: space-between; align-items:center; margin-top: .75rem; color: var(--text-secondary); font-size: .85rem;">
                            <div><i class="fas fa-euro-sign" style="color: var(--secondary); margin-right: .35rem;"></i> ${p.budget || '—'}</div>
                            <div><i class="fas fa-calendar" style="color: var(--accent); margin-right: .35rem;"></i> ${p.date || '—'}</div>
                        </div>
                    </div>
                </div>
            `;
            }).join('');
        }

        // Fonction pour mettre à jour les compteurs des filtres
        function updateMesProjetsFilterCounts(projets) {
            if (!Array.isArray(projets)) {
                console.warn('[updateMesProjetsFilterCounts] projets n\'est pas un tableau');
                projets = [];
            }
            
            // Compter les projets par statut (normaliser les statuts)
            const all = projets.length;
            const etude = projets.filter(p => {
                const s = String(p.status || '').toLowerCase().trim();
                return s === 'etude' || s === 'en études' || s === 'en etude';
            }).length;
            const travaux = projets.filter(p => {
                const s = String(p.status || '').toLowerCase().trim();
                return s === 'travaux' || s === 'en travaux';
            }).length;
            const termine = projets.filter(p => {
                const s = String(p.status || '').toLowerCase().trim();
                return s === 'termine' || s === 'terminé' || s === 'termine';
            }).length;
            
            console.log('[updateMesProjetsFilterCounts] Total projets:', all);
            console.log('[updateMesProjetsFilterCounts] Compteurs calculés:', { all, etude, travaux, termine });
            console.log('[updateMesProjetsFilterCounts] Exemples de statuts:', projets.slice(0, 5).map(p => p.status));
            
            const chips = document.querySelectorAll('.filter-chip[data-target="mes-projets"]');
            console.log('[updateMesProjetsFilterCounts] Chips trouvés:', chips.length);
            
            chips.forEach(chip => {
                const status = chip.dataset.status || 'all';
                const count = status === 'all' ? all : status === 'etude' ? etude : status === 'travaux' ? travaux : termine;
                const label = status === 'all' ? 'Tous' : status === 'etude' ? 'En études' : status === 'travaux' ? 'En travaux' : 'Terminés';
                const newText = label + ' (' + count + ')';
                chip.textContent = newText;
                console.log('[updateMesProjetsFilterCounts] Chip mis à jour:', status, '->', newText);
            });
        }

        // Filtres pour Mes Projets - Utiliser la délégation d'événements pour que ça fonctionne même après rechargement
        function initMesProjetsFilters() {
            // Supprimer les anciens listeners pour éviter les doublons
            const container = document.getElementById('mes-projets');
            if (!container) return;
            
            // Utiliser la délégation d'événements pour les filtres
            container.addEventListener('click', function(e) {
                // Gestion des filtres
                const chip = e.target.closest('.filter-chip[data-target="mes-projets"]');
                if (chip) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    document.querySelectorAll('.filter-chip[data-target="mes-projets"]').forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');

                    const status = chip.dataset.status || 'all';
                    function _norm(s) {
                        const x = String(s || '').toLowerCase().trim();
                        if (x === 'etude' || x === 'en études' || x === 'en etude') return 'etude';
                        if (x === 'travaux' || x === 'en travaux') return 'travaux';
                        if (x === 'termine' || x === 'terminé') return 'termine';
                        return x || 'etude';
                    }
                    const full = Array.isArray(window.mesProjetsCourants) && window.mesProjetsCourants.length
                        ? window.mesProjetsCourants
                        : (Array.isArray(window.__currentMesProjets) ? window.__currentMesProjets : []);
                    let filtered = full.slice();
                    if (status !== 'all') filtered = filtered.filter(p => _norm(p.status) === status);
                    filtered.sort(function(a, b) {
                        const nameA = (a.title || a.name || '').toLowerCase();
                        const nameB = (b.title || b.name || '').toLowerCase();
                        return nameA.localeCompare(nameB, 'fr', { numeric: true, sensitivity: 'base' });
                    });
                    renderMesProjets(filtered);
                    return;
                }
                
            });
            
            // Gestion du sélecteur de pagination
            const pageSizeSelect = document.getElementById('mesProjetsPageSize');
            if (pageSizeSelect) {
                pageSizeSelect.addEventListener('change', function() {
                    const pageSize = parseInt(this.value) || 100;
                    window.__mesProjetsPageSize = pageSize;
                    // Re-rendre les projets avec la nouvelle taille de page
                    const allProjets = Array.isArray(window.__currentMesProjets) ? window.__currentMesProjets : [];
                    renderMesProjets(allProjets);
                });
            }
        }
        
        // Initialiser les filtres au chargement et après navigation
        initMesProjetsFilters();

        // Bascule grille/liste pour #projets et #mes-projets (délégation document, capture)
        document.addEventListener('click', function(e) {
            const viewBtn = e.target && e.target.closest && e.target.closest('.view-btn[data-view]');
            if (!viewBtn) return;
            const section = viewBtn.closest('section');
            if (!section) return;
            const grid = section.querySelector('.projets-grid');
            if (!grid) return;
            e.preventDefault();
            e.stopPropagation();
            const view = viewBtn.dataset.view;
            grid.classList.toggle('list-view', view === 'list');
            section.querySelectorAll('.view-btn').forEach(function(btn) {
                btn.classList.toggle('active', btn.dataset.view === view);
                btn.setAttribute('aria-pressed', btn.dataset.view === view ? 'true' : 'false');
            });
        }, true);

        // Réinitialiser après navigation vers mes-projets
        if (typeof window.navigateTo === 'function') {
            const currentNavigateTo = window.navigateTo;
            window.navigateTo = function(sectionId) {
                currentNavigateTo(sectionId);
                if (sectionId === 'mes-projets') {
                    setTimeout(initMesProjetsFilters, 100);
                }
            };
        }

        // ========================
        // AI ASSISTANT
        // ========================
        let aiOpen = false;

        function toggleAI() {
            aiOpen = !aiOpen;
            document.getElementById('aiPanel').classList.toggle('open', aiOpen);
        }

        // AI Suggestions
        document.querySelectorAll('.ai-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                document.getElementById('aiInput').value = query;
                sendAIMessage();
            });
        });

        document.getElementById('aiInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });

        function sendAIMessage() {
            const input = document.getElementById('aiInput');
            const message = input.value.trim();
            if (!message) return;

            const messagesContainer = document.getElementById('aiMessages');

            // Add user message
            messagesContainer.innerHTML += `
                <div class="ai-message user">${message}</div>
            `;

            input.value = '';

            // Add loading
            messagesContainer.innerHTML += `
                <div class="ai-message bot loading" id="aiLoading">
                    <span></span><span></span><span></span>
                </div>
            `;

            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Hide suggestions after first message
            document.getElementById('aiSuggestions').style.display = 'none';

            // Simulated response
            setTimeout(() => {
                const loading = document.getElementById('aiLoading');
                if (loading) loading.remove();

                let response = '';
                const msg = message.toLowerCase();

                if (msg.includes('validation') || msg.includes('signer') || msg.includes('signature')) {
                    response = `<strong>Processus de validation mensuelle</strong><br><br>Chaque mois, le tableau de bord de la collectivité doit être validé par le maire ou son délégataire. Cette signature crée un <strong>engagement institutionnel horodaté</strong>.<br><br>📋 <strong>Étapes:</strong><br>1. Vérification des projets mis à jour<br>2. Contrôle des avancements déclarés<br>3. Signature électronique avec horodatage<br>4. Archivage automatique<br><br>⚠️ <em>Note: La validation est actuellement en lecture seule. Consultez l'historique des validations pour voir les signatures passées.</em>`;
                } else if (msg.includes('avancement') || msg.includes('état') || msg.includes('situation')) {
                    response = `<strong>État d'avancement de votre collectivité</strong><br><br>📊 Voici la synthèse:<br>- <strong>23 projets</strong> en cours<br>- <strong>8</strong> en phase d'études<br>- <strong>12</strong> en phase travaux<br>- <strong>3</strong> terminés ce mois<br><br>✅ Taux de validation: <strong>89%</strong><br><br>💡 Utilisez l'onglet "Projets" pour consulter le détail de chaque projet.`;
                } else if (msg.includes('phase') || msg.includes('études') || msg.includes('travaux') || msg.includes('livraison')) {
                    response = `<strong>Suivi Études / Travaux / Livraison</strong><br><br>Chaque projet suit un cycle en 3 phases:<br><br>1. <strong>📐 Études</strong> - Conception, études techniques, validations<br>2. <strong>🏗️ Travaux</strong> - Réalisation, suivi de chantier<br>3. <strong>🔑 Livraison</strong> - Réception, mise en service<br><br>Chaque phase dispose d'un baromètre d'avancement visible en temps réel.`;
                } else if (msg.includes('recherche') || msg.includes('collectivité') || msg.includes('commune') || msg.includes('trouver')) {
                    response = `<strong>Recherche de collectivité</strong><br><br>🔍 Pour trouver une collectivité:<br><br>1. Cliquez sur <strong>"Recherche collectivité"</strong> dans le menu<br>2. Tapez le nom de la commune, département ou région<br>3. Utilisez les filtres (Communes, Départements, Régions)<br>4. Cliquez sur le résultat pour ouvrir sa fiche<br><br>💡 La fiche collectivité affiche les projets en cours et l'historique des validations.`;
                } else if (msg.includes('projet') || msg.includes('budget') || msg.includes('délai')) {
                    response = `<strong>Gestion des projets</strong><br><br>📁 Chaque projet contient:<br>- <strong>Budget</strong> alloué et consommé<br>- <strong>Délais</strong> prévisionnels et réels<br>- <strong>Baromètre</strong> d'avancement par phase<br>- <strong>Documents</strong> et pièces jointes<br><br>📊 Accédez à l'onglet "Projets" pour la liste complète, puis "Suivi" pour le détail d'un projet sélectionné.`;
                } else if (msg.includes('aide') || msg.includes('comment') || msg.includes('help') || msg.includes('utiliser')) {
                    response = `<strong>Guide d'utilisation ColConnect</strong><br><br>🏠 <strong>Accueil</strong> - Vue d'ensemble et statistiques<br>🔍 <strong>Recherche collectivité</strong> - Trouvez une collectivité<br>📁 <strong>Projets</strong> - Liste des projets publics<br>📊 <strong>Suivi</strong> - Détail d'un projet<br><br>💬 Posez-moi vos questions, je suis là pour vous aider !`;
                } else if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('hello') || msg.includes('coucou')) {
                    response = `Bonjour ! 👋<br><br>Je suis l'assistant ColConnect, votre guide sur la plateforme de pilotage territorial.<br><br>Comment puis-je vous aider aujourd'hui ?`;
                } else if (msg.includes('merci') || msg.includes('super') || msg.includes('parfait')) {
                    response = `Avec plaisir ! 😊<br><br>N'hésitez pas si vous avez d'autres questions. Je reste à votre disposition pour vous accompagner sur ColConnect.`;
                } else {
                    response = `Merci pour votre question ! En tant qu'assistant ColConnect, je suis là pour vous aider à comprendre et utiliser la plateforme de pilotage territorial.<br><br>💡 N'hésitez pas à me poser des questions sur:<br>- La recherche de collectivités<br>- Le suivi des projets<br>- Le processus de validation<br>- Les phases d'avancement (Études/Travaux/Livraison)`;
                }

                messagesContainer.innerHTML += `
                    <div class="ai-message bot">${response}</div>
                `;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }

        // ========================
        // VALIDATION MODAL
        // ========================
        function openValidationModal() {
            document.getElementById('validationModal').classList.add('open');
        }

        function closeValidationModal() {
            document.getElementById('validationModal').classList.remove('open');
        }

        function confirmValidation() {
            closeValidationModal();
            showToast('Validation enregistrée avec succès !');
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').textContent = message;
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }

        // Close modal on overlay click
        document.getElementById('validationModal').addEventListener('click', (e) => {
            if (e.target.id === 'validationModal') {
                closeValidationModal();
            }
        });

        // ========================
        // VALIDATION MENSUELLE (écran Valider et signer)
        // ========================
        let __validationSnapshot = null;
        let __valFilter = 'all';
        let __valKpiFilter = null;
        let __valSelectedProjectId = null;

        function buildValidationSnapshot() {
            const now = new Date();
            const y = now.getFullYear(), m = now.getMonth() + 1;
            const moisLabels = ['','Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
            const raw = Array.isArray(window.__projets) && window.__projets.length ? window.__projets : [];
            const cid = (currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : '';
            const cname = (currentUser && currentUser.collectivite) ? currentUser.collectivite : '';
            var byCollectivite = (cid || cname) ? raw.filter(function(p) { return (p.collectiviteId || '') === cid || (p.collectivite || '') === cname; }) : raw;
            var rawFiltered = byCollectivite.filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; });
            var dbRaw = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
            const projects = rawFiltered.length ? rawFiltered.map((p, i) => {
                const id = p.id != null ? p.id : (101 + i);
                var rawP = dbRaw.find(function(x) { return (x.id != null && x.id == id) || (x.id === id); }) || p;
                const name = (p.nom || p.name || p.title || p.titre || 'Projet ' + id) + '';
                const s = (p.statut || p.status || 'etude') + '';
                const status = (s === 'etude' ? 'ETUDES' : (s === 'termine' ? 'TRAVAUX' : 'TRAVAUX'));
                var budgetNum = rawP.budgetNum != null ? rawP.budgetNum : (rawP.budget != null && typeof rawP.budget === 'number' ? rawP.budget : null);
                const budgetTotal = budgetNum != null ? (budgetNum * 1000000) : (p.budgetTotal != null ? p.budgetTotal : (p.budget && typeof p.budget === 'number' ? p.budget * 1000000 : 0));
                const lastM = p.lastMilestone || rawP.lastMilestone || { code: 'AVP', label: 'Avant-projet', date: '2026-01-25' };
                var anomalies, missingFields, pendingMilestones;
                if (Array.isArray(rawP._anomalies) && rawP._anomalies.length > 0) {
                    anomalies = rawP._anomalies;
                    missingFields = anomalies.filter(function(a){ return a.category === 'DONNEES'; }).length ? ['*'] : [];
                    pendingMilestones = anomalies.filter(function(a){ return a.category === 'JALONS'; }).map(function(a){ return a.label || 'Jalon'; });
                } else {
                    missingFields = [];
                    if (!name || name.length < 2) missingFields.push('name');
                    if (!status) missingFields.push('status');
                    if (budgetTotal == null || budgetTotal === '') missingFields.push('budgetTotal');
                    pendingMilestones = Array.isArray(p.pendingMilestones) ? p.pendingMilestones : [];
                    anomalies = [];
                    missingFields.forEach(function(f) { anomalies.push({ code: 'MISSING_REQUIRED_FIELD', severity: 'BLOCKING', category: 'DONNEES', label: 'Champ requis manquant: ' + f, details: 'Le champ "' + f + '" est requis.', suggestedAction: 'Corriger dans la fiche projet' }); });
                    if (pendingMilestones.length) anomalies.push({ code: 'JALON_PENDING', severity: 'BLOCKING', category: 'JALONS', label: 'Jalon(s) non validé(s)', details: pendingMilestones.join(', '), suggestedAction: 'Valider les jalons dans la fiche projet' });
                }
                var hasBlocking = anomalies.some(function(a) { return a.severity === 'BLOCKING'; });
                var hasInfo = anomalies.some(function(a) { return a.severity === 'INFO'; });
                var conformity = 'CONFORME';
                if (hasBlocking) conformity = 'NON_CONFORME'; else if (hasInfo) conformity = 'CONFORME_AVEC_RESERVES';
                return { projectId: id, name, code: p.code || formatProjetCode(id), collectivite: p.collectivite || cname || '—', status, lastMilestone: lastM, budgetTotal, conformity, missingFields: missingFields || [], pendingMilestones: pendingMilestones || [], anomalies };
            }) : [
                { projectId: 101, name: 'Rénovation Gymnase X', code: 'P000101', collectivite: cname || 'Ville de Lyon', status: 'TRAVAUX', lastMilestone: { code: 'OS_TRAVAUX', label: 'Ordre de service', date: '2025-01-12' }, budgetTotal: 500000, conformity: 'CONFORME', missingFields: [], pendingMilestones: [], anomalies: [] },
                { projectId: 102, name: 'Éclairage public - secteur Y', code: 'P000102', collectivite: cname || 'Ville de Lyon', status: 'ETUDES', lastMilestone: { code: 'AVP', label: 'Avant-projet', date: '2025-01-18' }, budgetTotal: null, conformity: 'NON_CONFORME', missingFields: ['budgetTotal'], pendingMilestones: ['AVP'], anomalies: [{ code: 'MISSING_REQUIRED_FIELD', severity: 'BLOCKING', category: 'DONNEES', label: 'Budget total manquant', details: "Le champ 'budgetTotal' est requis.", suggestedAction: 'Corriger dans la fiche projet' }] },
                { projectId: 103, name: 'Voirie Z', code: 'P000103', collectivite: cname || 'Ville de Lyon', status: 'TRAVAUX', lastMilestone: { code: 'OS', label: 'Ordre de service', date: '2025-01-10' }, budgetTotal: 1200000, conformity: 'CONFORME_AVEC_RESERVES', missingFields: [], pendingMilestones: [], anomalies: [{ code: 'INFO_FACULTATIF', severity: 'INFO', category: 'DONNEES', label: 'Champ facultatif absent', details: 'Commentaire de clôture non renseigné.', suggestedAction: '' }] }
            ];
            const c = { total: projects.length, conformes: 0, avecReserves: 0, nonConformes: 0, jalonsNonValides: 0, donneesManquantes: 0 };
            projects.forEach(pr => {
                if (pr.conformity === 'CONFORME') c.conformes++;
                else if (pr.conformity === 'CONFORME_AVEC_RESERVES') c.avecReserves++;
                else c.nonConformes++;
                c.jalonsNonValides += (pr.pendingMilestones || []).length;
                c.donneesManquantes += (pr.missingFields || []).length;
            });
            const label = moisLabels[m] + ' ' + y;
            __validationSnapshot = {
                snapshotVersion: '1.0', collectiviteId: cid || 'lyon', collectiviteName: cname || 'Ville de Lyon',
                period: { year: y, month: m, label: label },
                generatedAt: now.toISOString(), generatedBy: { userId: (currentUser && currentUser.id) ? currentUser.id : 'user-1', displayName: (currentUser && currentUser.name) ? currentUser.name : 'Utilisateur', role: 'ADMIN' },
                scope: { projectIds: projects.map(p => p.projectId), ruleset: 'monthly_validation_rules_v1', filters: {} },
                counters: c, projects,
                signature: null,
                integrity: { contentHash: null, hashAlgo: 'SHA-256' }
            };
            return __validationSnapshot;
        }

        function recalculerValidationMensuelle() {
            buildValidationSnapshot();
            const s = __validationSnapshot; if (!s) return;
            const lab = document.getElementById('valPeriodLabel'); if (lab) lab.textContent = s.period.label;
            const co = s.counters;
            const el = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v != null ? v : 0; };
            el('valKpiConformes', co.conformes); el('valKpiAnomalies', co.nonConformes + co.avecReserves); el('valKpiJalons', co.jalonsNonValides); el('valKpiDonnees', co.donneesManquantes);
            const o = document.getElementById('valBadgeOuverte'); if (o) o.style.display = s.signature ? 'none' : 'inline-flex';
            const a = document.getElementById('valBadgeAnomalies'); if (a) a.style.display = (co.nonConformes > 0) ? 'inline-flex' : 'none';
            const p = document.getElementById('valBadgePret'); if (p) p.style.display = (co.conformes > 0 && !s.signature) ? 'inline-flex' : 'none';
            renderValProjectsTable();
            onValSignatureModeChange();
            const auditWrap = document.getElementById('valAuditWrap');
            if (auditWrap) auditWrap.style.display = (s.signature || (s.auditLog && s.auditLog.length)) ? 'block' : 'none';
            const auditList = document.getElementById('valAuditList');
            if (auditList && s.auditLog && s.auditLog.length) {
                auditList.innerHTML = s.auditLog.map(l => '<div class="val-audit-item">' + (l.at || '') + ' — ' + (l.actor || '') + ' — ' + (l.action || '') + (l.comment ? ' — ' + l.comment : '') + '</div>').join('');
            }
        }

        function applyValFilter(f) {
            __valKpiFilter = __valKpiFilter === f ? null : f;
            document.querySelectorAll('#validationKPIs .val-kpi').forEach(k => k.classList.toggle('active', k.dataset.filter === __valKpiFilter));
            setValFilter(__valKpiFilter || 'all');
            renderValProjectsTable();
        }

        function setValFilter(f) {
            __valFilter = f || 'all';
            document.querySelectorAll('.val-table-filters button').forEach(b => b.classList.toggle('active', (b.dataset.f || 'all') === __valFilter));
            renderValProjectsTable();
        }

        function renderValProjectsTable() {
            const s = __validationSnapshot; const tbody = document.getElementById('valProjectsTbody');
            if (!s || !tbody) return;
            let list = s.projects;
            var q = (document.getElementById('valSearch') || {}).value || '';
            if (q) {
                var qq = typeof __normStr === 'function' ? __normStr(q) : q.toLowerCase();
                list = list.filter(function(pr) {
                    var n = typeof __normStr === 'function' ? __normStr(pr.name) : (pr.name || '').toLowerCase();
                    var c = typeof __normStr === 'function' ? __normStr(pr.code) : (pr.code || '').toLowerCase();
                    var col = typeof __normStr === 'function' ? __normStr(pr.collectivite) : (pr.collectivite || '').toLowerCase();
                    return n.indexOf(qq) !== -1 || c.indexOf(qq) !== -1 || col.indexOf(qq) !== -1;
                });
            }
            if (__valFilter === 'conformes') list = list.filter(pr => pr.conformity === 'CONFORME');
            else if (__valFilter === 'anomalie') list = list.filter(pr => pr.conformity !== 'CONFORME');
            else if (__valFilter === 'jalon_pending') list = list.filter(pr => (pr.pendingMilestones || []).length > 0);
            else if (__valFilter === 'missing_fields') list = list.filter(pr => (pr.missingFields || []).length > 0);
            const ordre = (document.getElementById('valSort') || {}).value || 'gravite';
            if (ordre === 'gravite') list = [...list].sort((a,b) => { const g = { NON_CONFORME:0, CONFORME_AVEC_RESERVES:1, CONFORME:2 }; return (g[a.conformity]||2) - (g[b.conformity]||2); });
            else if (ordre === 'montant') list = [...list].sort((a,b) => (b.budgetTotal||0) - (a.budgetTotal||0));
            tbody.innerHTML = list.map(function(pr) {
                var anomCount = (pr.anomalies || []).length;
                var isAnomalie = pr.conformity !== 'CONFORME';
                var badge = pr.conformity === 'CONFORME' ? 'conforme' : (pr.conformity === 'CONFORME_AVEC_RESERVES' ? 'reserves' : 'non-conforme');
                var badgeLabel = isAnomalie ? 'En anomalie' : (pr.conformity || '—');
                var lm = pr.lastMilestone || {};
                var sel = __valSelectedProjectId === pr.projectId ? ' selected' : '';
                var showCorriger = __valSelectedProjectId === pr.projectId;
                var corrigerBtn = showCorriger ? '<button type="button" class="btn secondary val-btn-corriger" onclick="event.stopPropagation();goToProjectFromDrawer()"><i class="fas fa-external-link-alt"></i> Corriger</button>' : '';
                var rowClass = 'val-row' + sel + (isAnomalie ? ' val-row-anomalie' : '');
                return '<tr class="' + rowClass + '" data-id="' + pr.projectId + '" onclick="selectValProject(' + pr.projectId + ')"><td><strong>' + (pr.name||'—') + '</strong><br><span style="font-size:0.8rem;color:var(--text-muted);">' + (pr.code||'') + '</span> <span class="val-collectivite-pastille">' + (pr.collectivite||'—') + '</span></td><td>' + (pr.status||'—') + '</td><td>' + (lm.label||lm.code||'—') + '<br><span style="font-size:0.8rem;color:var(--text-muted);">' + (lm.date||'') + '</span></td><td><span class="badge ' + badge + '" title="' + (pr.conformity||'') + '">' + badgeLabel + '</span></td><td>' + (anomCount ? '<span class="anom-count">' + anomCount + '</span>' : '—') + '</td><td class="val-actions-cell"><div class="val-actions-btns"><button type="button" class="btn" onclick="event.stopPropagation();voirValProject(' + pr.projectId + ')">Voir</button>' + corrigerBtn + '</div></td></tr>';
            }).join('');
        }

        function selectValProject(id) {
            __valSelectedProjectId = id;
            renderValProjectsTable();
        }

        function voirValProject(id) {
            selectValProject(id);
        }

        function openAnomaliesDrawer(projectId) {
            const s = __validationSnapshot; if (!s) return;
            const pr = s.projects.find(p => p.projectId == projectId);
            const dr = document.getElementById('anomaliesDrawer');
            const n = document.getElementById('drawerProjectName');
            const b = document.getElementById('drawerProjectBadge');
            const list = document.getElementById('drawerAnomaliesList');
            if (!dr || !n || !b || !list) return;
            if (!pr) { closeAnomaliesDrawer(); return; }
            n.textContent = pr.name || '—';
            b.textContent = pr.conformity || '—';
            b.className = 'badge ' + (pr.conformity === 'CONFORME' ? 'conforme' : (pr.conformity === 'CONFORME_AVEC_RESERVES' ? 'reserves' : 'non-conforme'));
            const anoms = pr.anomalies || [];
            list.innerHTML = anoms.length ? anoms.map(a => '<div class="val-anom-item"><span class="severity ' + (a.severity||'info').toLowerCase() + '">' + (a.severity||'') + '</span> — ' + (a.category||'') + '<br><strong>' + (a.label||'') + '</strong><br><span style="font-size:0.85rem;color:var(--text-muted);">' + (a.details||'') + '</span></div>').join('') : '<p style="color:var(--text-muted);">Aucune anomalie.</p>';
            const wrapper = document.getElementById('valDrawerStickyWrapper');
            if (wrapper) wrapper.classList.remove('drawer-closed');
            dr.classList.add('open');
            var row = document.querySelector('#valProjectsTbody tr[data-id="' + projectId + '"]') || document.querySelector('#valProjectsTbody tr.selected');
            if (row) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function closeAnomaliesDrawer() {
            const dr = document.getElementById('anomaliesDrawer');
            const wrapper = document.getElementById('valDrawerStickyWrapper');
            if (dr) dr.classList.remove('open');
            if (wrapper) wrapper.classList.add('drawer-closed');
            __valSelectedProjectId = null;
            renderValProjectsTable();
        }

        function goToProjectFromDrawer() {
            const id = __valSelectedProjectId;
            closeAnomaliesDrawer();
            if (id && typeof openProjetDetailFromDb === 'function') {
                openProjetDetailFromDb(id);
            } else if (id) {
                navigateTo('priv-projets');
            }
        }

        function onValSignatureModeChange() {
            const res = document.getElementById('valReserveWrap');
            const modeReserves = (document.querySelector('input[name="valSignatureMode"]:checked') || {}).value === 'reserves';
            if (res) res.style.display = modeReserves ? 'block' : 'none';
            if (!modeReserves) { const m = document.getElementById('valReserveMotif'); if (m) m.value = ''; }
            updateValSignButton();
            updateValSynthese();
        }

        function onValReserveInput() { updateValSignButton(); }

        function updateValSynthese() {
            const s = __validationSnapshot; if (!s) return;
            const mode = (document.querySelector('input[name="valSignatureMode"]:checked') || {}).value;
            const conformes = s.counters.conformes + (s.counters.avecReserves || 0);
            const signCount = mode === 'reserves' ? s.counters.total : conformes;
            const hors = mode === 'conformes' ? (s.counters.total - conformes) : 0;
            const sc = document.getElementById('valSignCount'); if (sc) sc.textContent = signCount;
            const hw = document.getElementById('valHorsSignatureWrap'); if (hw) hw.style.display = hors > 0 ? 'inline' : 'none';
            const hc = document.getElementById('valHorsCount'); if (hc) hc.textContent = hors;
        }

        function updateValSignButton() {
            const mode = (document.querySelector('input[name="valSignatureMode"]:checked') || {}).value;
            const motif = (document.getElementById('valReserveMotif') || {}).value || '';
            const s = __validationSnapshot;
            const conformes = s ? (s.counters.conformes + (s.counters.avecReserves || 0)) : 0;
            let dis = true;
            if (mode === 'conformes') dis = conformes === 0;
            else if (mode === 'reserves') dis = !motif.trim();
            if (s && s.signature) dis = true;
            const btn = document.getElementById('valSignBtn'); if (btn) btn.disabled = dis;
            updateValSynthese();
        }

        function openValConfirmModal() {
            const s = __validationSnapshot; if (!s) return;
            const mode = (document.querySelector('input[name="valSignatureMode"]:checked') || {}).value;
            const period = document.getElementById('valConfirmPeriodCollectivite');
            const modeEl = document.getElementById('valConfirmMode');
            if (period) period.textContent = s.period.label + ' — ' + (s.collectiviteName || '');
            if (modeEl) modeEl.textContent = mode === 'reserves' ? 'Signature avec réserves (motif enregistré).' : 'Signature des projets conformes uniquement.';
            const ch = document.getElementById('valConfirmCheck'); if (ch) ch.checked = false;
            openModal('valConfirmModal');
        }

        function confirmValSignature() {
            const ch = document.getElementById('valConfirmCheck');
            if (!ch || !ch.checked) { if (typeof showToast==='function') showToast('Veuillez confirmer l\'exactitude des informations.'); else alert('Veuillez cocher la confirmation.'); return; }
            const s = __validationSnapshot; if (!s) { closeModal('valConfirmModal'); return; }
            const mode = (document.querySelector('input[name="valSignatureMode"]:checked') || {}).value;
            const motif = (document.getElementById('valReserveMotif') || {}).value || '';
            const signedIds = mode === 'reserves' ? s.projects.map(p => p.projectId) : s.projects.filter(p => p.conformity === 'CONFORME' || p.conformity === 'CONFORME_AVEC_RESERVES').map(p => p.projectId);
            s.signature = { mode: mode === 'reserves' ? 'SIGNATURE_AVEC_RESERVES' : 'SIGNATURE_CONFORMES', at: new Date().toISOString(), by: (currentUser && currentUser.name) ? currentUser.name : 'Utilisateur', signedProjectIds: signedIds, reserveNote: mode === 'reserves' ? motif : null };
            s.integrity = s.integrity || {}; s.integrity.contentHash = 'hash-' + Date.now();
            s.auditLog = s.auditLog || [];
            s.auditLog.unshift({ at: new Date().toLocaleString('fr-FR'), actor: s.signature.by, action: s.signature.mode, objet: 'période ' + s.period.label, comment: s.signature.reserveNote || '' });
            closeModal('valConfirmModal');
            recalculerValidationMensuelle();
            if (typeof showToast==='function') showToast('Période signée avec succès.'); else alert('Période signée avec succès.');
        }

        // ========================
        // ANIMATED COUNTERS
        // ========================
        function animateCounter(elementId, target, suffix = '') {
            const element = document.getElementById(elementId);
            if (!element) return;

            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 30);
        }

        // Animate on load
        setTimeout(() => {
            animateCounter('stat-collectivites', "20");
        }, 500);
    


// Bind tabs to navigation (robust for Safari/iOS)
(function(){
  const tabs = Array.from(document.querySelectorAll('.tab[data-section]'));
  tabs.forEach(btn => {
    // Avoid implicit form submit behavior
    try { btn.type = 'button'; } catch(e) {}
    btn.addEventListener('click', () => navigateTo(btn.dataset.section));
  });

  // If no section is active at load, default to dashboard
  const anyActive = document.querySelector('.section.active');
  if (!anyActive) navigateTo('dashboard');
})();


    // =========================================
    // JS ZONE PRIVÉE (Bâtiments, Patrimoine)
    // =========================================
    function getBatimentAdresseDisplay(b) {
        var cpVille = (typeof COLLECTIVITES_CP_VILLE !== 'undefined' && b.collectiviteId && COLLECTIVITES_CP_VILLE[b.collectiviteId]) ? COLLECTIVITES_CP_VILLE[b.collectiviteId] : '';
        var rue = b.adresseRue || '';
        if (b.adresse && !rue) {
            var m1 = (b.adresse || '').match(/^(.+?)\s*,\s*(\d{5}\s+.+)$/);
            if (m1) { rue = m1[1].trim(); cpVille = cpVille || m1[2].trim(); } else rue = b.adresse;
        }
        if (!rue && !cpVille) return '—';
        if (rue && cpVille) return rue + ' / ' + cpVille;
        return rue || cpVille || '—';
    }

    var BATIMENTS_DEMO_LYON = [
        { id: 1, nom: "Gymnase Gustave Roussy", adresseRue: "12 rue du Stade", collectiviteId: "lyon", type: "sport", typeLabel: "Sport", surface: 800, annee: 1993, zone: "H2", energie: "gaz", energieLabel: "Gaz", systeme: "chaudière", conso: 49800, depense: 8300, audit: "2023-12-10", auditRecent: true, opportunites: 2, analyse: true },
        { id: 2, nom: "École Jean Jaurès", adresseRue: "45 avenue Jean Jaurès", collectiviteId: "lyon", type: "ecole", typeLabel: "École", surface: 1200, annee: 1993, zone: "H2", energie: "gaz", energieLabel: "Gaz", systeme: "chaudière", conso: 320000, depense: 52000, audit: "2021-06-15", auditRecent: false, opportunites: 3, analyse: true },
        { id: 3, nom: "Hôtel de Ville", adresseRue: "1 place de la Comédie", collectiviteId: "lyon", type: "mairie", typeLabel: "Mairie", surface: 850, annee: 1975, zone: "H1", energie: "fioul", energieLabel: "Fioul", systeme: "chaudière", conso: 210000, depense: 38000, audit: "2017-11-20", auditRecent: false, opportunites: 0, analyse: false },
        { id: 4, nom: "Gymnase Municipal", adresseRue: "8 rue des Sports", collectiviteId: "lyon", type: "sport", typeLabel: "Sport", surface: 1600, annee: 1988, zone: "H2", energie: "electricite", energieLabel: "Électricité", systeme: "convecteurs", conso: 180000, depense: 41000, audit: "2022-10-03", auditRecent: true, opportunites: 2, analyse: true },
        { id: 5, nom: "Salle Polyvalente – Les Fleurs", adresseRue: "22 avenue des Fleurs", collectiviteId: "lyon", type: "salle", typeLabel: "Salle polyvalente", surface: 420, annee: 2002, zone: "H3", energie: "gaz", energieLabel: "Gaz", systeme: "chaudière", conso: 65000, depense: 9000, audit: "", auditRecent: false, opportunites: 0, analyse: false },
    ];
    var BATIMENTS_DEMO_DIJON = [
        { id: 101, nom: "Gymnase Mansart", adresseRue: "Rue Mansart", collectiviteId: "dijon", type: "sport", typeLabel: "Sport", surface: 950, annee: 1990, zone: "H2", energie: "gaz", energieLabel: "Gaz", systeme: "chaudière", conso: 58000, depense: 9200, audit: "2023-08-15", auditRecent: true, opportunites: 2, analyse: true },
        { id: 102, nom: "École Darcy", adresseRue: "Rue Darcy", collectiviteId: "dijon", type: "ecole", typeLabel: "École", surface: 1100, annee: 1985, zone: "H2", energie: "gaz", energieLabel: "Gaz", systeme: "chaudière", conso: 295000, depense: 48000, audit: "2022-03-10", auditRecent: true, opportunites: 3, analyse: true },
        { id: 103, nom: "Hôtel de Ville de Dijon", adresseRue: "Place de la Libération", collectiviteId: "dijon", type: "mairie", typeLabel: "Mairie", surface: 1200, annee: 1970, zone: "H1", energie: "fioul", energieLabel: "Fioul", systeme: "chaudière", conso: 240000, depense: 42000, audit: "2019-11-20", auditRecent: false, opportunites: 1, analyse: true },
    ];
    var batimentsData = BATIMENTS_DEMO_LYON.slice();
    function getBatimentsForCollectivite(cid) {
        if (!cid) return batimentsData;
        var c = cid.toString().toLowerCase();
        var fromData = batimentsData.filter(function(b) { return (b.collectiviteId || '').toString().toLowerCase() === c; });
        if (fromData.length > 0) return fromData;
        if (c === 'dijon') {
            BATIMENTS_DEMO_DIJON.forEach(function(b) { if (!batimentsData.find(function(x) { return x.id === b.id; })) batimentsData.push(b); });
            return batimentsData.filter(function(b) { return (b.collectiviteId || '').toString().toLowerCase() === 'dijon'; });
        }
        if (c === 'lyon') return BATIMENTS_DEMO_LYON.slice();
        return [];
    }
    function getBatimentById(id) {
        var b = batimentsData.find(function(x) { return x.id == id; });
        if (b) return b;
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var list = getBatimentsForCollectivite(cid);
        return list.find(function(x) { return x.id == id; }) || null;
    }
    let batIdCounter = 6;
    let currentBatiment = null;

    function openBatimentModal() {
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var cpVille = (typeof COLLECTIVITES_CP_VILLE !== 'undefined' && COLLECTIVITES_CP_VILLE[cid]) ? COLLECTIVITES_CP_VILLE[cid] : '—';
        var el = document.getElementById('batCpVille'); if (el) el.textContent = cpVille;
        if (typeof openModal === 'function') openModal('batimentModal');
    }

    function renderBatiments() {
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var data = typeof getBatimentsForCollectivite === 'function' ? getBatimentsForCollectivite(cid) : batimentsData;
        var filterType = (document.getElementById('filterType') || {}).value || 'tous';
        var filterEnergie = (document.getElementById('filterEnergie') || {}).value || 'tous';
        var searchTerm = (document.getElementById('searchBatiment') || {}).value || '';
        var searchNorm = typeof __normStr === 'function' ? __normStr(searchTerm) : searchTerm.toLowerCase();

        var filtered = data.filter(function(b) {
            if (filterType !== 'tous' && b.type !== filterType) return false;
            if (filterEnergie !== 'tous' && b.energie !== filterEnergie) return false;
            if (searchNorm && (typeof __normStr === 'function' ? __normStr(b.nom) : (b.nom || '').toLowerCase()).indexOf(searchNorm) === -1) return false;
            return true;
        });

        var totalDepense = data.reduce(function(sum, b) { return sum + (b.depense || 0); }, 0);
        var totalConso = data.reduce(function(sum, b) { return sum + (b.conso || 0); }, 0);
        var totalOpp = data.reduce(function(sum, b) { return sum + (b.opportunites || 0); }, 0);
        var kpiDepenses = document.getElementById('kpiDepenses'); if (kpiDepenses) kpiDepenses.textContent = totalDepense.toLocaleString('fr-FR') + ' €';
        var kpiConso = document.getElementById('kpiConso'); if (kpiConso) kpiConso.textContent = totalConso.toLocaleString('fr-FR') + ' kWh';
        var kpiBatiments = document.getElementById('kpiBatiments'); if (kpiBatiments) kpiBatiments.textContent = data.length;
        var kpiOpportunites = document.getElementById('kpiOpportunites'); if (kpiOpportunites) kpiOpportunites.textContent = totalOpp;

        if (typeof renderAlertesDecretTertiaire === 'function') renderAlertesDecretTertiaire(data);

        var list = document.getElementById('batimentsList');
        if (!list) return;
        if (filtered.length === 0) {
            var isEmpty = data.length === 0;
            list.innerHTML = '<div class="empty-state-block" style="padding: 2rem; text-align: center; color: var(--text-muted); grid-column: 1 / -1;">' +
                (isEmpty ? '<i class="fas fa-building" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i><p class="cc-hint">Première étape</p><p>Aucun bâtiment dans votre patrimoine.</p><p class="empty-state-hint" style="font-size: 0.9rem; margin: 0.5rem 0 1rem;">Ajoutez votre premier bâtiment pour lancer l\'analyse.</p><button class="btn btn-primary" onclick="openBatimentModal()"><i class="fas fa-plus"></i> Ajouter un bâtiment</button>' :
                '<i class="fas fa-search"></i><p>Aucun bâtiment ne correspond aux filtres.</p><p class="empty-state-hint" style="font-size: 0.9rem;">Modifiez les critères de recherche.</p>') +
                '</div>';
            return;
        }

        list.innerHTML = filtered.map(b => `
            <div class="batiment-row">
                <div>
                    <div class="batiment-name">${b.nom}</div>
                    <div class="batiment-meta">${b.typeLabel} · ${b.surface.toLocaleString('fr-FR')} m² · Zone ${b.zone}</div>
                </div>
                <div class="batiment-profil">
                    <div class="profil-line">Chauffage: <strong>${b.energieLabel}</strong></div>
                    <div class="profil-line">Conso: <strong>${b.conso.toLocaleString('fr-FR')}</strong> kWh</div>
                    <div class="profil-line">Dépense: <strong>${b.depense.toLocaleString('fr-FR')} €</strong></div>
                    <div class="profil-line">Dernier audit: <strong>${b.audit || 'NC'}</strong></div>
                    ${b.audit ? `<span class="audit-badge ${b.auditRecent ? 'audit-recent' : 'audit-warning'}">${b.auditRecent ? 'Audit récent' : 'Audit à vérifier'}</span>` : '<span class="audit-badge audit-warning">Audit à vérifier</span>'}
                </div>
                <div>
                    ${b.analyse ? `<span class="opportunites-badge opp-eligible">${b.opportunites} éligible(s)</span>` : '<span class="opportunites-badge opp-none">Non analysé</span>'}
                    <div class="opportunites-hint">Cliquez Ouvrir pour l'analyse de votre fiche.</div>
                </div>
                <div class="batiment-actions">
                    <button class="btn-ouvrir" onclick="openFicheBatiment(${b.id})">Ouvrir</button>
                </div>
            </div>
        `).join('');
    }

    function filterBatiments() {
        renderBatiments();
    }

    // ========== Dashboard Élu (Point 5 différenciation) ==========
    function refreshDashboardElu() {
        var tco2El = document.getElementById('eluTco2');
        var okEl = document.getElementById('eluBatimentsOk');
        var alerteEl = document.getElementById('eluBatimentsAlerte');
        var aidesEl = document.getElementById('eluAides');
        var jalonsEl = document.getElementById('eluJalonsList');
        if (!tco2El) return;
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var climatStore = window.__climatByProjectId || {};
        var tco2Total = 0; var aidesTotal = 0;
        Object.keys(climatStore).forEach(function(k) {
            var c = climatStore[k];
            if (!c || (c.collectiviteId && c.collectiviteId.toString().toLowerCase() !== cid.toString().toLowerCase())) return;
            var tco2 = c.tco2_an;
            if (tco2 == null && c.mwh && c.fe) tco2 = c.mwh * c.fe;
            if (tco2) tco2Total += tco2;
            var fin = c.financeurs || [];
            fin.forEach(function(f) { if (f.montant_eur) aidesTotal += f.montant_eur; });
        });
        var batList = (typeof getBatimentsForCollectivite === 'function') ? getBatimentsForCollectivite(cid) : [];
        var batOk = 0, batAlerte = 0;
        batList.forEach(function(b) {
            var st = typeof getDecretTertiaireStatus === 'function' ? getDecretTertiaireStatus(b) : { assujetti: false };
            if (!st.assujetti) return;
            if (st.alerte) batAlerte++; else batOk++;
        });
        if (tco2El) tco2El.textContent = tco2Total > 0 ? Math.round(tco2Total).toLocaleString('fr-FR') + ' t' : '—';
        if (okEl) okEl.textContent = batOk > 0 ? batOk : '0';
        if (alerteEl) alerteEl.textContent = batAlerte > 0 ? batAlerte : '0';
        if (aidesEl) aidesEl.textContent = aidesTotal > 0 ? (aidesTotal / 1000).toFixed(0) + ' k€' : '—';
        var jalons = [];
        var projets = window.__currentMesProjets || window.mesProjetsCourants || [];
        var allProjets = [];
        try { allProjets = typeof __privProjetsBase !== 'undefined' ? __privProjetsBase : []; } catch (e) {}
        if (allProjets.length === 0 && Array.isArray(window.__projets)) {
            var uid = (cid || '').toString().toLowerCase();
            allProjets = window.__projets.filter(function(p) { return ((p.collectiviteId || '').toString().toLowerCase()) === uid; });
        }
        var toScan = projets.length ? projets : allProjets;
        toScan.forEach(function(p) {
            var d = p.date || p.dateLivraison;
            if (d && String(d).match(/\d{4}/)) jalons.push({ nom: p.title || p.name || 'Projet', date: d });
        });
        jalons.sort(function(a, b) { return String(a.date).localeCompare(String(b.date)); });
        if (jalonsEl) jalonsEl.innerHTML = jalons.slice(0, 5).map(function(j) { return '<li>' + (j.nom || 'Projet') + ' — ' + j.date + '</li>'; }).join('') || '<li class="cc-hint">Aucun jalon à venir</li>';
    }

    // ========== Alertes prospectives Décret Tertiaire (Point 3 différenciation) ==========
    function getDecretTertiaireStatus(bat) {
        var consoRef = bat.conso || 0;
        var surface = bat.surface || 0;
        var assujetti = surface >= 1000;
        if (!assujetti || consoRef <= 0) return { assujetti: false, alerte: false };
        var target2030 = Math.round(consoRef * 0.6);
        var target2040 = Math.round(consoRef * 0.5);
        var target2050 = Math.round(consoRef * 0.4);
        var ecart2030 = consoRef - target2030;
        var alerte = ecart2030 > 0;
        var recommandations = [];
        if (bat.energie === 'fioul' || bat.energie === 'gaz') recommandations.push('Remplacement chauffage (PAC)');
        if (surface >= 400 && (bat.type === 'ecole' || bat.type === 'mairie')) recommandations.push('Isolation combles');
        if (surface >= 200) recommandations.push('Relamping LED');
        if (surface >= 1000 && consoRef >= 150000) recommandations.push('GTB / Régulation');
        return { assujetti: true, alerte: alerte, consoRef: consoRef, target2030: target2030, target2040: target2040, target2050: target2050, ecart2030: ecart2030, recommandations: recommandations };
    }

    function renderAlertesDecretTertiaire(data) {
        var container = document.getElementById('alertesDecretList');
        if (!container) return;
        if (!data || data.length === 0) { container.innerHTML = '<p class="cc-hint">Aucun bâtiment dans le patrimoine.</p>'; return; }
        var assujettis = [];
        data.forEach(function(b) {
            var st = getDecretTertiaireStatus(b);
            if (st.assujetti) assujettis.push({ bat: b, status: st });
        });
        if (assujettis.length === 0) { container.innerHTML = '<p class="cc-hint">Aucun bâtiment assujetti (&lt; 1000 m²).</p>'; return; }
        var enAlerte = assujettis.filter(function(x) { return x.status.alerte; });
        container.innerHTML = assujettis.map(function(x) {
            var b = x.bat; var s = x.status;
            var badge = s.alerte ? '<span class="audit-badge audit-warning" style="background:rgba(239,68,68,0.2);color:#fca5a5;">En alerte</span>' : '<span class="audit-badge audit-recent">Sur trajectoire</span>';
            var recommand = s.recommandations.length ? '<div class="cc-hint" style="font-size:0.75rem;margin-top:0.35rem;">Recommandé : ' + s.recommandations.slice(0, 2).join(', ') + '</div>' : '';
            return '<div class="alerte-decret-row" style="display:flex;align-items:flex-start;gap:1rem;padding:0.75rem;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:0.5rem;">' +
                '<div style="flex:1;"><strong>' + (b.nom || 'Bâtiment') + '</strong> · ' + (b.surface || 0) + ' m² · Objectif 2030 : ≤ ' + s.target2030.toLocaleString('fr-FR') + ' kWh' +
                (s.alerte ? ' · <span style="color:#fca5a5;">Écart : ' + s.ecart2030.toLocaleString('fr-FR') + ' kWh à réduire</span>' : '') + recommand + '</div>' +
                '<div>' + badge + '</div>' +
                '<button class="btn btn-secondary" style="padding:0.35rem 0.75rem;font-size:0.8rem;" onclick="openFicheBatiment(' + b.id + ')">Ouvrir</button>' +
                '</div>';
        }).join('');
    }

    // —— Moteur d'éligibilité ColConnect ——
    // Règles évaluables : types (array ou undefined), surfaceMin, energies (array ou undefined), consoMin
    const measureTemplates = [
        {
            titre: "Relamping LED et optimisation éclairage",
            categorie: "ÉCLAIRAGE",
            complexity: "low",
            statut: "active",
            actifDepuis: "Jan 01, 2025",
            reference: "CEE-BAT-EQ-115",
            exigences: "Pour le remplacement ou l'optimisation de l'éclairage : les luminaires doivent respecter les niveaux d'éclairement selon NF EN 12464-1, avec un flux lumineux minimal de 100 lm/W et une température de couleur entre 3000K et 4000K.",
            pieces: [
                { nom: "Inventaire", obligatoire: false },
                { nom: "Devis", obligatoire: true },
                { nom: "PV réception", obligatoire: true }
            ],
            regles: "// Règle d'éligibilité - Éclairage LED\nIF batiment.type IN [\"sport\", \"ecole\", \"mairie\", \"salle\"]\nAND batiment.surface >= 200\nAND batiment.energie IN [\"gaz\", \"fioul\", \"electricite\"]\nTHEN eligible = TRUE\n\n// Calcul économie estimée\neconomie_kwh = batiment.conso * 0.06\neconomie_euro = economie_kwh * 0.10\ncout_estime = batiment.surface * 18",
            rule: { types: ["sport", "ecole", "mairie", "salle"], surfaceMin: 200, energies: ["gaz", "fioul", "electricite"] },
            formula: { economiePerConso: 0.06, gainPerEconomie: 0.10, coutPerSurface: 18 }
        },
        {
            titre: "Remplacement chauffage par PAC",
            categorie: "CHAUFFAGE",
            complexity: "high",
            statut: "active",
            actifDepuis: "Jan 01, 2025",
            reference: "CEE-BAT-TH-139",
            exigences: "Installation d'une pompe à chaleur air/eau ou eau/eau. Le COP minimal doit être de 3.4 selon EN 14511. L'installation doit être réalisée par un professionnel RGE.",
            pieces: [
                { nom: "Étude / dimensionnement", obligatoire: true },
                { nom: "Devis", obligatoire: true },
                { nom: "PV réception + mise en service", obligatoire: true }
            ],
            regles: "// Règle d'éligibilité - PAC\nIF batiment.energie IN [\"gaz\", \"fioul\"]\nAND batiment.surface >= 500\nTHEN eligible = TRUE\n\n// Calcul économie estimée\neconomie_kwh = batiment.conso * 0.18\neconomie_euro = economie_kwh * 0.10\ncout_estime = batiment.surface * 95",
            rule: { energies: ["gaz", "fioul"], surfaceMin: 500 },
            formula: { economiePerConso: 0.18, gainPerEconomie: 0.10, coutPerSurface: 95 }
        },
        {
            titre: "Isolation des combles perdus",
            categorie: "ISOLATION",
            complexity: "medium",
            statut: "active",
            actifDepuis: "Jan 01, 2025",
            reference: "CEE-BAT-EN-101",
            exigences: "Isolation thermique des combles perdus avec R ≥ 7 m².K/W. Mise en œuvre selon DTU 45.11.",
            pieces: [
                { nom: "Étude thermique", obligatoire: true },
                { nom: "Devis", obligatoire: true },
                { nom: "PV réception", obligatoire: true }
            ],
            regles: "// Règle d'éligibilité - Isolation combles\nIF batiment.type IN [\"ecole\", \"mairie\"]\nAND batiment.surface >= 400\nTHEN eligible = TRUE",
            rule: { types: ["ecole", "mairie"], surfaceMin: 400 },
            formula: { economiePerSurface: 16, gainPerEconomie: 0.1625, coutPerSurface: 20 }
        },
        {
            titre: "Relamping LED",
            categorie: "ÉCLAIRAGE",
            complexity: "low",
            statut: "active",
            actifDepuis: "Jan 01, 2025",
            reference: "CEE-BAT-EQ-115",
            exigences: "Remplacement des luminaires existants par des LED conformes.",
            pieces: [
                { nom: "Devis", obligatoire: true },
                { nom: "PV réception", obligatoire: true }
            ],
            regles: "// Règle d'éligibilité - LED\nIF batiment.surface >= 200\nTHEN eligible = TRUE",
            rule: { surfaceMin: 200 },
            formula: { economiePerConso: 0.06, gainPerEconomie: 0.10, coutPerSurface: 18 }
        },
        {
            titre: "GTB - Gestion technique du bâtiment",
            categorie: "RÉGULATION",
            complexity: "high",
            statut: "active",
            actifDepuis: "Mar 01, 2025",
            reference: "CEE-BAT-SE-106",
            exigences: "Installation d'un système de GTB de classe A ou B selon EN 15232.",
            pieces: [
                { nom: "Étude de programmation", obligatoire: true },
                { nom: "Devis", obligatoire: true },
                { nom: "PV réception et paramétrage", obligatoire: true }
            ],
            regles: "// Règle d'éligibilité - GTB\nIF batiment.surface >= 1000\nAND batiment.conso >= 150000\nTHEN eligible = TRUE",
            rule: { surfaceMin: 1000, consoMin: 150000 },
            formula: { economieFixed: 32000, gainPerEconomie: 0.1625, coutPerSurface: 37.5 }
        }
    ];

    function evaluateEligibilityRule(bat, rule) {
        if (!rule) return true;
        if (rule.types && rule.types.indexOf(bat.type) === -1) return false;
        if (rule.surfaceMin != null && (bat.surface || 0) < rule.surfaceMin) return false;
        if (rule.energies && rule.energies.indexOf(bat.energie) === -1) return false;
        if (rule.consoMin != null && (bat.conso || 0) < rule.consoMin) return false;
        return true;
    }

    function computeOpportunityMetrics(bat, template) {
        var f = template.formula;
        var surface = bat.surface || 0;
        var conso = bat.conso || 0;
        var economie = 0;
        if (f.economiePerConso != null) economie = Math.round(conso * f.economiePerConso);
        else if (f.economiePerSurface != null) economie = Math.round(surface * f.economiePerSurface);
        else if (f.economieFixed != null) economie = f.economieFixed;
        var gain = f.gainPerEconomie != null ? Math.round(economie * f.gainPerEconomie) : 0;
        var cout = f.coutPerSurface != null ? Math.round(surface * f.coutPerSurface) : 0;
        return { economie: economie, gain: gain, cout: cout };
    }

    function analyzeAssetWithEngine(batId, silent) {
        var bat = (typeof getBatimentById === 'function' ? getBatimentById(batId) : null) || batimentsData.find(function (b) { return b.id === batId; });
        if (!bat) return;
        var eligible = [];
        for (var i = 0; i < measureTemplates.length; i++) {
            var t = measureTemplates[i];
            if (!evaluateEligibilityRule(bat, t.rule)) continue;
            var m = computeOpportunityMetrics(bat, t);
            eligible.push({
                id: eligible.length + 1,
                titre: t.titre,
                categorie: t.categorie,
                complexity: t.complexity,
                statut: t.statut,
                actifDepuis: t.actifDepuis,
                reference: t.reference,
                exigences: t.exigences,
                pieces: t.pieces,
                regles: t.regles,
                cout: m.cout,
                gain: m.gain,
                economie: m.economie
            });
        }
        opportunitesData[batId] = eligible;
        bat.opportunites = eligible.length;
        bat.analyse = true;
        if (!silent) {
            renderBatiments();
            if (currentBatiment && currentBatiment.id === batId) {
                populateFicheBatiment(currentBatiment);
                renderOpportunites(batId);
            }
            if (typeof showToast === 'function') showToast('Analyse terminée', bat.nom + ' : ' + eligible.length + ' opportunité(s) éligible(s) détectée(s).');
        }
    }

    // Données des opportunités (remplies par le moteur d'éligibilité)
    const opportunitesData = {};

    function openFicheBatiment(id) {
        currentBatiment = (typeof getBatimentById === 'function' ? getBatimentById(id) : null) || batimentsData.find(function(b) { return b.id === id; });
        if (currentBatiment) {
            populateFicheBatiment(currentBatiment);
            navigateTo('priv-ficheBatiment');
        }
    }

    function populateFicheBatiment(bat) {
        const typeLabels = { ecole: 'École', sport: 'Sport', mairie: 'Mairie', salle: 'Salle polyvalente' };
        const energieLabels = { gaz: 'Gaz', fioul: 'Fioul', electricite: 'Électricité' };
        const systemeDefault = bat.energie === 'electricite' ? 'convecteurs' : 'chaudière';

        // Header
        document.querySelector('#priv-ficheBatiment .section-title').innerHTML = `<i class="fas fa-file-alt"></i> Fiche bâtiment - ${bat.nom}`;
        document.getElementById('ficheBatMeta').textContent = `${bat.typeLabel} · ${bat.surface.toLocaleString('fr-FR')} m² · Zone ${bat.zone} · ${systemeDefault}`;

        // Synthèse
        document.getElementById('ficheBatNom').textContent = bat.nom;
        var adrEl = document.getElementById('ficheBatAdresse'); if (adrEl) adrEl.textContent = typeof getBatimentAdresseDisplay === 'function' ? getBatimentAdresseDisplay(bat) : (bat.adresse || bat.adresseRue || '—');
        document.getElementById('ficheBatType').textContent = bat.typeLabel;
        document.getElementById('ficheBatSurface').textContent = `${bat.surface.toLocaleString('fr-FR')} m²`;
        document.getElementById('ficheBatAnnee').textContent = bat.annee || '1993';
        document.getElementById('ficheBatZone').textContent = bat.zone;
        document.getElementById('ficheBatEnergie').textContent = bat.energieLabel;
        document.getElementById('ficheBatSysteme').textContent = bat.systeme || systemeDefault;
        document.getElementById('ficheBatConso').textContent = `${bat.conso.toLocaleString('fr-FR')} kWh`;
        document.getElementById('ficheBatDepense').textContent = `${bat.depense.toLocaleString('fr-FR')} €`;
        document.getElementById('ficheBatAudit').textContent = bat.audit ? (function (d) { var p = d.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : d; })(bat.audit) : 'Non renseigné';
        document.getElementById('ficheBatStatut').textContent = bat.analyse ? 'ANALYSÉ' : 'NON ANALYSÉ';
        document.getElementById('ficheBatStatut').className = bat.analyse ? 'synthese-badge synthese-badge-active' : 'synthese-badge';

        // Opportunités
        renderOpportunites(bat.id);
    }

    function renderOpportunites(batId) {
        const opps = opportunitesData[batId] || [];
        const container = document.getElementById('opportunitesCards');

        if (opps.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 2rem; text-align: center; background: var(--bg-elevated); border-radius: 16px; border: 1px solid var(--border);">
                    <i class="fas fa-search" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-muted);">Aucune opportunité trouvée. Cliquez sur "Analyser l'éligibilité" pour lancer l'analyse.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = opps.map(opp => `
            <div class="opp-card">
                <h4 class="opp-card-title">${opp.titre}</h4>
                <div class="opp-badges">
                    <span class="opp-badge opp-eligible">Éligible</span>
                    <span class="opp-badge opp-cat">${opp.categorie}</span>
                </div>
                <div class="opp-badges">
                    <span class="opp-badge opp-complexity-${opp.complexity}">Complexité : ${opp.complexity === 'low' ? 'faible' : opp.complexity === 'medium' ? 'moyenne' : 'élevée'}</span>
                </div>
                <div class="opp-version">Version: 2025-01</div>
                <p class="opp-desc">${opp.exigences.substring(0, 80)}...</p>
                <div class="opp-metrics">
                    <div class="opp-metric"><span>Coût estimatif:</span> <strong>${opp.cout.toLocaleString('fr-FR')} €</strong></div>
                    <div class="opp-metric"><span>Gain estimatif:</span> <strong>${opp.gain.toLocaleString('fr-FR')} € /an</strong></div>
                    <div class="opp-metric"><span>Économie:</span> <strong>${opp.economie.toLocaleString('fr-FR')} kWh /an</strong></div>
                </div>
                <div class="opp-checklist">
                    <div class="opp-checklist-title">Pièces (checklist) :</div>
                    <ul>
                        ${opp.pieces.map(p => `<li><span class="${p.obligatoire ? 'piece-oblig' : 'piece-opt'}">${p.obligatoire ? 'Obligatoire' : 'Optionnel'}</span> – ${p.nom}</li>`).join('')}
                    </ul>
                </div>
                <div class="opp-card-actions">
                    <button class="btn-voir-detail" onclick="openDetailModal(${batId}, ${opp.id})">Voir détail</button>
                    <button class="btn-ajouter-projet" onclick="ajouterOpportuniteAuProjet(${batId}, ${opp.id})">Ajouter au projet</button>
                </div>
            </div>
        `).join('');
    }

    function openDetailModal(batId, oppId) {
        const opps = opportunitesData[batId] || [];
        const opp = opps.find(o => o.id === oppId);
        if (!opp) return;

        // Remplir le modal
        document.getElementById('detailModalTitle').textContent = opp.titre;

        // Complexité
        const complexityLabels = { low: 'LOW', medium: 'MEDIUM', high: 'HIGH' };
        document.getElementById('detailComplexity').innerHTML = `<span class="detail-badge complexity-${opp.complexity}">${complexityLabels[opp.complexity]}</span>`;

        // Statut
        const statutLabels = { active: 'ACTIVE', inactive: 'INACTIVE' };
        document.getElementById('detailStatut').innerHTML = `<span class="detail-badge statut-${opp.statut}">${statutLabels[opp.statut]}</span>`;

        // Actif depuis et référence
        document.getElementById('detailActifDepuis').textContent = opp.actifDepuis;
        document.getElementById('detailReference').textContent = opp.reference;

        // Exigences
        document.getElementById('detailExigences').innerHTML = `<p>${opp.exigences}</p>`;

        // Checklist
        document.getElementById('detailChecklist').innerHTML = opp.pieces.map(p => `
            <div class="checklist-item ${p.obligatoire ? 'checklist-required' : 'checklist-optional'}">
                <span class="checklist-status"><i class="fas fa-circle"></i></span>
                <span class="checklist-text">${p.nom}</span>
                <span class="checklist-badge ${p.obligatoire ? 'badge-required' : 'badge-optional'}">${p.obligatoire ? 'Obligatoire' : 'Optionnel'}</span>
            </div>
        `).join('');

        // Règles DSL
        document.getElementById('detailRules').innerHTML = `<pre class="rules-code">${opp.regles}</pre>`;

        var btnAjouter = document.getElementById('detailModalAjouterProjet');
        if (btnAjouter) {
            btnAjouter.onclick = function() { ajouterOpportuniteAuProjet(batId, oppId); closeModal('detailOpportuniteModal'); };
        }
        openModal('detailOpportuniteModal');
    }

    function ajouterOpportuniteAuProjet(batId, oppId) {
        var bat = (typeof getBatimentById === 'function') ? getBatimentById(batId) : (currentBatiment && currentBatiment.id == batId ? currentBatiment : null);
        var opps = opportunitesData[batId] || [];
        var opp = opps.find(function(o) { return o.id === oppId; });
        if (!bat) { if (typeof showToast === 'function') showToast('Bâtiment introuvable.'); return; }
        if (!opp) { if (typeof showToast === 'function') showToast('Opportunité introuvable.'); return; }
        closeModal('detailOpportuniteModal');
        var catToType = { 'ÉCLAIRAGE': 'Énergie', 'CHAUFFAGE': 'Énergie', 'ISOLATION': 'Patrimoine', 'RÉGULATION': 'Énergie' };
        var nomProjet = (bat.nom || 'Bâtiment') + ' – ' + (opp.titre || 'Opportunité');
        var budgetM = opp.cout ? (opp.cout / 1000000).toFixed(2) : '';
        if (typeof openCreerProjetModalFromBatiment === 'function') {
            document.getElementById('cpName').value = nomProjet;
            document.getElementById('cpType').value = catToType[opp.categorie] || 'Énergie';
            document.getElementById('cpBudget').value = budgetM;
            document.getElementById('cpAdresse').value = typeof getBatimentAdresseDisplay === 'function' ? getBatimentAdresseDisplay(bat) : (bat.adresseRue || bat.adresse || '');
            var col = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectivite) ? currentUser.collectivite : 'Ville de Lyon';
            var colFixed = document.getElementById('cpCollectiviteFixed'); if (colFixed) colFixed.textContent = col;
            var d = new Date();
            var months = ['Janv.','Fév.','Mars','Avr.','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'];
            document.getElementById('cpDate').value = (months[d.getMonth()] || '') + ' ' + (d.getFullYear() + 1);
            var h = document.getElementById('cpNameHint'); if (h) h.textContent = '';
            if (typeof updateCreerProjetTypeHint === 'function') updateCreerProjetTypeHint();
        }
        openModal('creerProjetModal');
        if (typeof showToast === 'function') showToast('Formulaire pré-rempli : modifiez si besoin et validez.');
    }

    function analyserCurrentBatiment() {
        if (currentBatiment) {
            // Utilise le moteur de règles pour l'analyse
            analyzeAssetWithEngine(currentBatiment.id);
        }
    }

    // ========== Simulateur d'aides (Point 1 différenciation) ==========
    var AIDES_CATALOGUE = [
        { id: 'cee', nom: 'CEE (Certificats d\'Économie d\'Énergie)', pctMax: 0.25, typesProjet: ['led','pac','isolation','gtb'], typesBat: ['sport','ecole','mairie','salle'], surfaceMin: 200, energies: ['gaz','fioul','electricite'] },
        { id: 'actee', nom: 'ACTEE (Ingénierie)', pctMax: 0.12, typesProjet: ['led','pac','isolation','gtb','mixte'], surfaceMin: 500 },
        { id: 'maprimerenov', nom: 'MaPrimeRénov\' (secteur public)', pctMax: 0.15, typesProjet: ['pac','isolation'], typesBat: ['ecole','mairie','salle'], energies: ['gaz','fioul'] },
        { id: 'coupdepouce', nom: 'Coup de pouce Chauffage (PAC)', forfait: 4000, typesProjet: ['pac'], energies: ['gaz','fioul'], surfaceMin: 500 },
        { id: 'detr', nom: 'DETR / Dotations territoriales', pctMax: 0.10, typesProjet: ['led','pac','isolation','gtb','mixte'] }
    ];

    function openSimulateurAidesModal() {
        if (typeof openModal === 'function') openModal('simulateurAidesModal');
        var coutEl = document.getElementById('simAidesCout'); if (coutEl) coutEl.value = '';
        var resEl = document.getElementById('simAidesResult'); if (resEl) resEl.style.display = 'none';
        if (currentBatiment) {
            var opps = opportunitesData[currentBatiment.id] || [];
            var firstOpp = opps.find(function(o) { return o.cout; });
            if (firstOpp && coutEl) coutEl.value = firstOpp.cout;
        }
    }

    function calculerAides() {
        var coutVal = parseInt(document.getElementById('simAidesCout').value, 10) || 0;
        var typeProjet = (document.getElementById('simAidesTypeProjet') || {}).value || 'led';
        if (coutVal <= 0) { if (typeof showToast === 'function') showToast('Veuillez entrer un coût estimé.'); else alert('Veuillez entrer un coût estimé.'); return; }
        var bat = currentBatiment;
        if (!bat) { if (typeof showToast === 'function') showToast('Aucun bâtiment sélectionné.'); return; }
        var surface = bat.surface || 0, energie = bat.energie || '', typeBat = bat.type || '';
        var aides = [];
        AIDES_CATALOGUE.forEach(function(a) {
            if (a.typesProjet && a.typesProjet.indexOf(typeProjet) === -1 && a.typesProjet.indexOf('mixte') === -1) return;
            if (a.typesBat && a.typesBat.indexOf(typeBat) === -1) return;
            if (a.energies && a.energies.indexOf(energie) === -1) return;
            if (a.surfaceMin != null && surface < a.surfaceMin) return;
            var montant = 0;
            if (a.forfait) montant = Math.min(a.forfait, coutVal * 0.5);
            else if (a.pctMax) montant = Math.round(coutVal * a.pctMax);
            if (montant > 0) aides.push({ nom: a.nom, montant: montant });
        });
        var totalAides = aides.reduce(function(s, x) { return s + x.montant; }, 0);
        var net = Math.max(0, coutVal - totalAides);
        document.getElementById('simAidesBrut').textContent = coutVal.toLocaleString('fr-FR') + ' €';
        document.getElementById('simAidesList').innerHTML = aides.length ? aides.map(function(x) { return '<div style="display:flex;justify-content:space-between;margin:0.25rem 0;"><span>' + x.nom + '</span><strong style="color:var(--accent);">− ' + x.montant.toLocaleString('fr-FR') + ' €</strong></div>'; }).join('') : '<p class="cc-hint">Aucune aide éligible identifiée pour ce profil. Vérifiez les critères (type bâtiment, surface, énergie).</p>';
        document.getElementById('simAidesNet').textContent = net.toLocaleString('fr-FR') + ' €';
        document.getElementById('simAidesResult').style.display = 'block';
    }

    // ========== Export OPERAT / Décret Tertiaire (Point 2 différenciation) ==========
    var OPERAT_CATEGORIES = { ecole: 'Enseignement', sport: 'Sport et loisirs', mairie: 'Administration publique', salle: 'Autres activités' };

    function exportOperat() {
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var list = (typeof getBatimentsForCollectivite === 'function') ? getBatimentsForCollectivite(cid) : batimentsData;
        if (!list || list.length === 0) { if (typeof showToast === 'function') showToast('Aucun bâtiment à exporter.'); return; }
        var anneeRef = new Date().getFullYear();
        var csvRows = [];
        var cols = ['Identifiant_ColConnect', 'Nom', 'Adresse', 'Surface_plancher_m2', 'Categorie_activite', 'Type_energie_chauffage', 'Consommation_kWh_an', 'Depense_euro_an', 'Zone_climatique', 'Annee_construction', 'Annee_reference'];
        csvRows.push(cols.join(';'));
        list.forEach(function(b) {
            var adr = typeof getBatimentAdresseDisplay === 'function' ? getBatimentAdresseDisplay(b) : (b.adresseRue || b.adresse || '');
            var cat = OPERAT_CATEGORIES[b.type] || 'Autres';
            var row = [
                'CC-' + (b.collectiviteId || cid) + '-' + b.id,
                (b.nom || '').replace(/;/g, ','),
                (adr || '').replace(/;/g, ','),
                b.surface || '',
                cat,
                b.energie || '',
                b.conso || '',
                b.depense || '',
                b.zone || '',
                b.annee || '',
                anneeRef
            ];
            csvRows.push(row.join(';'));
        });
        var csv = '\uFEFF' + csvRows.join('\r\n');
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'colconnect_operat_' + (currentUser && currentUser.collectivite ? (currentUser.collectivite.replace(/\s+/g, '_') + '_') : '') + anneeRef + '.csv';
        a.click();
        URL.revokeObjectURL(a.href);
        if (typeof showToast === 'function') showToast('Export OPERAT téléchargé : ' + list.length + ' bâtiment(s).');
    }

    function openModifierBatimentChoice() {
        if (typeof isAdmin === 'function' && !isAdmin()) return;
        var sel = document.getElementById('modifierBatimentSelect');
        if (!sel) return;
        var cid = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        var list = (typeof getBatimentsForCollectivite === 'function') ? getBatimentsForCollectivite(cid) : batimentsData;
        sel.innerHTML = '<option value="">-- Choisir --</option>' +
            list.map(function(b) { return '<option value="' + b.id + '">' + (b.nom || 'Bâtiment #' + b.id) + ' · ' + (b.surface || 0) + ' m²</option>'; }).join('');
        sel.value = '';
        openModal('modifierBatimentChoiceModal');
    }

    function confirmModifierBatiment() {
        if (typeof isAdmin === 'function' && !isAdmin()) return;
        var el = document.getElementById('modifierBatimentSelect');
        if (!el) return;
        var val = parseInt(el.value, 10);
        if (!val) { if (typeof showToast === 'function') showToast('Veuillez choisir un bâtiment.'); else alert('Veuillez choisir un bâtiment.'); return; }
        currentBatiment = (typeof getBatimentById === 'function' ? getBatimentById(val) : null) || batimentsData.find(function(b) { return b.id === val; });
        if (!currentBatiment) return;
        closeModal('modifierBatimentChoiceModal');
        openEditFicheModal();
    }

    function openEditFicheModal() {
        if (typeof isAdmin === 'function' && !isAdmin()) return;
        if (!currentBatiment) return;

        document.getElementById('editFicheNom').value = currentBatiment.nom;
        var editRue = document.getElementById('editFicheAdresseRue');
        if (editRue) {
            var ar = currentBatiment.adresseRue;
            if (!ar && currentBatiment.adresse) { var m = (currentBatiment.adresse || '').match(/^(.+?)\s*,\s*\d{5}/); ar = m ? m[1].trim() : currentBatiment.adresse; }
            editRue.value = ar || '';
        }
        var cid = currentBatiment.collectiviteId || ((typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon');
        var cpVille = (typeof COLLECTIVITES_CP_VILLE !== 'undefined' && COLLECTIVITES_CP_VILLE[cid]) ? COLLECTIVITES_CP_VILLE[cid] : '—';
        var editCp = document.getElementById('editFicheCpVille'); if (editCp) editCp.textContent = cpVille;
        document.getElementById('editFicheType').value = currentBatiment.type;
        document.getElementById('editFicheSurface').value = currentBatiment.surface;
        document.getElementById('editFicheAnnee').value = currentBatiment.annee || 1993;
        document.getElementById('editFicheZone').value = currentBatiment.zone;
        document.getElementById('editFicheEnergie').value = currentBatiment.energie;
        document.getElementById('editFicheSysteme').value = currentBatiment.systeme || (currentBatiment.energie === 'electricite' ? 'convecteurs' : 'chaudière');
        document.getElementById('editFicheAudit').value = currentBatiment.audit || '';
        document.getElementById('editFicheConso').value = currentBatiment.conso;
        document.getElementById('editFicheDepense').value = currentBatiment.depense;

        openModal('editFicheBatModal');
    }

    function saveEditFiche() {
        if (typeof isAdmin === 'function' && !isAdmin()) return;
        if (!currentBatiment) return;

        const typeLabels = { ecole: 'École', sport: 'Sport', mairie: 'Mairie', salle: 'Salle polyvalente' };
        const energieLabels = { gaz: 'Gaz', fioul: 'Fioul', electricite: 'Électricité' };

        currentBatiment.nom = document.getElementById('editFicheNom').value;
        var editRue = document.getElementById('editFicheAdresseRue'); currentBatiment.adresseRue = editRue ? (editRue.value || '').trim() || undefined : undefined;
        currentBatiment.type = document.getElementById('editFicheType').value;
        currentBatiment.typeLabel = typeLabels[currentBatiment.type];
        currentBatiment.surface = parseInt(document.getElementById('editFicheSurface').value) || 0;
        currentBatiment.annee = parseInt(document.getElementById('editFicheAnnee').value) || 1993;
        currentBatiment.zone = document.getElementById('editFicheZone').value;
        currentBatiment.energie = document.getElementById('editFicheEnergie').value;
        currentBatiment.energieLabel = energieLabels[currentBatiment.energie];
        currentBatiment.systeme = document.getElementById('editFicheSysteme').value;
        currentBatiment.audit = document.getElementById('editFicheAudit').value;
        currentBatiment.auditRecent = currentBatiment.audit && new Date(currentBatiment.audit) > new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
        currentBatiment.conso = parseInt(document.getElementById('editFicheConso').value) || 0;
        currentBatiment.depense = parseInt(document.getElementById('editFicheDepense').value) || 0;

        populateFicheBatiment(currentBatiment);
        renderBatiments();
        closeModal('editFicheBatModal');
    }

    function analyserBatiment(id) {
        // Utilise le moteur de règles pour l'analyse
        analyzeAssetWithEngine(id);
    }

    function saveBatiment() {
        const nom = document.getElementById('batNom').value.trim();
        const adresseRue = (document.getElementById('batAdresseRue') || {}).value ? (document.getElementById('batAdresseRue').value || '').trim() : '';
        const collectiviteId = (typeof currentUser !== 'undefined' && currentUser && currentUser.collectiviteId) ? currentUser.collectiviteId : 'lyon';
        const type = document.getElementById('batType').value;
        const typeLabels = { ecole: 'École', sport: 'Sport', mairie: 'Mairie', salle: 'Salle polyvalente' };
        const surface = parseInt(document.getElementById('batSurface').value) || 0;
        const annee = parseInt(document.getElementById('batAnnee').value) || null;
        const zone = document.getElementById('batZone').value;
        const energie = document.getElementById('batEnergie').value;
        const energieLabels = { gaz: 'Gaz', fioul: 'Fioul', electricite: 'Électricité' };
        const systeme = (document.getElementById('batSysteme').value || '').trim() || (energie === 'electricite' ? 'convecteurs' : 'chaudière');
        const conso = parseInt(document.getElementById('batConso').value) || 0;
        const depense = parseInt(document.getElementById('batDepense').value) || 0;
        const audit = (document.getElementById('batAudit').value || '').trim();
        const analyser = document.getElementById('batAnalyser').checked;

        if (!nom || !surface) { if (typeof showToast === 'function') showToast('Nom et surface sont obligatoires.'); else alert('Nom et surface sont obligatoires.'); return; }

        const newBat = {
            id: batIdCounter++,
            nom,
            adresseRue: adresseRue || undefined,
            collectiviteId: collectiviteId,
            type,
            typeLabel: typeLabels[type],
            surface,
            annee: annee || undefined,
            zone,
            energie,
            energieLabel: energieLabels[energie],
            systeme,
            conso,
            depense,
            audit: audit || undefined,
            auditRecent: audit && new Date(audit) > new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000),
            opportunites: 0,
            analyse: false
        };

        batimentsData.push(newBat);
        closeModal('batimentModal');

        // Si analyser est coché, lancer l'analyse avec le moteur de règles
        if (analyser) {
            analyzeAssetWithEngine(newBat.id);
        } else {
            renderBatiments();
            showToast("Bâtiment ajouté", `${nom} a été ajouté au patrimoine.`);
        }

        // Reset form
        document.getElementById('batNom').value = '';
        var adrEl = document.getElementById('batAdresseRue'); if (adrEl) adrEl.value = '';
        document.getElementById('batSurface').value = '';
        document.getElementById('batAnnee').value = '';
        document.getElementById('batSysteme').value = '';
        document.getElementById('batConso').value = '';
        document.getElementById('batDepense').value = '';
        document.getElementById('batAudit').value = '';
        document.getElementById('batAnalyser').checked = false;
    }

    // ========== CATALOGUE ==========
    function reloadCatalogue() {
        const btn = event.target.closest('.btn-reload');
        const icon = btn.querySelector('i');

        // Animation de rotation
        icon.style.animation = 'spin 1s linear';
        btn.disabled = true;

        setTimeout(() => {
            icon.style.animation = '';
            btn.disabled = false;
            // Recharger le catalogue depuis le moteur de règles
            energyState.measures = seedMeasures();
            saveState(energyState);
            showToast("Catalogue rechargé", "Les mesures et règles ont été réinitialisées.");
        }, 1000);
    }

    // Animation CSS pour le spin
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);

    document.addEventListener('DOMContentLoaded', function () {
        // Initialiser le moteur d'éligibilité
        if (typeof initEnergyState === 'function') {
            initEnergyState();
        }

        if (typeof applyProjetsFiltersAndSearch === 'function') {
            applyProjetsFiltersAndSearch();
        } else if (typeof renderProjets === 'function') {
            var list = (window.__projets || []).filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; });
            renderProjets(list, 'projetsGrid');
        }

        if (typeof renderBatiments === 'function') {
            // Lancer l'analyse d'éligibilité pour tous les bâtiments (sans toast)
            for (var i = 0; i < batimentsData.length; i++) {
                analyzeAssetWithEngine(batimentsData[i].id, true);
            }
            renderBatiments();
        }
    });

    // ========================================
    // EXPORT PDF / EXCEL
    // ========================================

    // PDF avec html2pdf.js
    async function exportCurrentSectionToPDF() {
        const section = document.querySelector('.section.active');
        if (!section) return alert("Aucune section active !");
        const opt = {
            margin: 0.5,
            filename: `ColConnect_${section.id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
        };
        // Si la lib n'est pas chargée, on la télécharge à la volée
        if (typeof html2pdf === "undefined") {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = () => html2pdf().set(opt).from(section).save();
            document.body.appendChild(script);
        } else {
            html2pdf().set(opt).from(section).save();
        }
    }

    // Excel avec SheetJS
    async function exportCurrentSectionToExcel() {
        const section = document.querySelector('.section.active');
        if (!section) return alert("Aucune section active !");
        // Extraction basique du texte de cartes
        const rows = [];
        section.querySelectorAll('.collectivite-card, .projet-card, .batiment-row').forEach((el) => {
            const name = el.querySelector('.collectivite-name, .projet-title, .batiment-name')?.innerText || '';
            const desc = el.querySelector('.collectivite-type, .projet-status, .batiment-meta')?.innerText || '';
            rows.push({ Nom: name, Détails: desc });
        });
        if (rows.length === 0) return alert("Aucune donnée à exporter !");
        // Chargement de SheetJS
        if (typeof XLSX === "undefined") {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js";
            script.onload = () => saveExcel(rows, section.id);
            document.body.appendChild(script);
        } else {
            saveExcel(rows, section.id);
        }
    }

    function saveExcel(data, sectionName) {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Données");
        XLSX.writeFile(wb, `ColConnect_${sectionName}.xlsx`);
    }

    // Activation des boutons
    document.getElementById('exportPDF')?.addEventListener('click', exportCurrentSectionToPDF);
    document.getElementById('exportExcel')?.addEventListener('click', exportCurrentSectionToExcel);

    // ========================================
    // RAPPORTS PERSONNALISÉS
    // ========================================

    function buildReportTemplate(context) {
        const date = new Date().toLocaleDateString('fr-FR');
        return `
        <div style="font-family: Arial; padding:1rem;">
            <h1 style="color:#c9a227">Rapport ${context.titre}</h1>
            <p>Date : <strong>${date}</strong></p>
            <hr style="border:1px solid #c9a227; margin:1rem 0;">
            <h2>Résumé</h2>
            <p>${context.resume}</p>
            <h3>Données clés</h3>
            <ul>
                ${context.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
            <p style="font-size:0.8rem;color:#718096;margin-top:1rem;">Généré automatiquement par ColConnect</p>
        </div>`;
    }

    function genererRapport() {
        const section = document.querySelector('.section.active');
        if (!section) return alert("Aucune section active !");
        const id = section.id;
        let context = {};

        // Récupérer les stats depuis les KPIs
        const stats = {
            nbCollectivites: document.querySelectorAll('.collectivite-card').length || 6,
            nbBatiments: batimentsData ? batimentsData.length : 5,
            nbOpportunites: document.getElementById('kpiOpportunites')?.textContent || '7'
        };

        switch (id) {
            case 'dashboard':
            case 'priv-collectivite':
                context = {
                    titre: "Tableau de Bord Territorial",
                    resume: "Analyse globale des indicateurs du territoire (bâtiments, collectivités, opportunités énergétiques).",
                    points: [
                        `Collectivités actives : ${stats.nbCollectivites}`,
                        `Bâtiments recensés : ${stats.nbBatiments}`,
                        `Opportunités : ${stats.nbOpportunites}`
                    ]
                };
                break;
            case 'priv-patrimoine':
                context = {
                    titre: "Rapport Patrimonial",
                    resume: "État du parc bâti et diagnostics énergétiques.",
                    points: batimentsData ? batimentsData.map(b => `${b.nom} (${b.typeLabel}) – ${b.surface} m², ${b.energieLabel}`) : []
                };
                break;
            case 'priv-projets':
            case 'projets':
                context = {
                    titre: "Rapport sur les Projets",
                    resume: "Synthèse des opérations planifiées et de leur avancement.",
                    points: ["Projet Réno-Gymnase : en travaux", "Audit thermique écoles : en étude"]
                };
                break;
            case 'priv-catalogue':
                context = {
                    titre: "Rapport Catalogue",
                    resume: "Liste des mesures et règles d'éligibilité disponibles.",
                    points: ["Mesures énergétiques actives", "Règles de conformité"]
                };
                break;
            default:
                context = {
                    titre: "Rapport Général",
                    resume: "Aperçu du module sélectionné.",
                    points: [`Section : ${id}`]
                };
        }

        const rapportHTML = buildReportTemplate(context);
        const win = window.open("", "_blank");
        win.document.write(rapportHTML);
        win.document.close();

        // Si html2pdf dispo, option d'export immédiat
        if (typeof html2pdf !== "undefined") {
            setTimeout(() => html2pdf().from(win.document.body).save(`Rapport_${id}.pdf`), 500);
        }
    }

    // Bouton Générer Rapport supprimé de la page d'accueil
    
    // Supprimer les boutons Export PDF et Générer Rapport de la page d'accueil
    function removeDashboardButtons() {
        // Supprimer le bouton Export PDF du dashboard
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            const exportBtn = dashboard.querySelector('button[data-action="export"][data-section="dashboard"]');
            if (exportBtn) exportBtn.remove();
            
            const heroActions = dashboard.querySelector('.hero-actions');
            if (heroActions) heroActions.remove();
            
            const exportPDFBtn = dashboard.querySelector('button[onclick*="exportDashboardPDF"]');
            if (exportPDFBtn) exportPDFBtn.remove();
        }
        
        // Supprimer le bouton Générer Rapport du header
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            const rapportBtn = headerContent.querySelector('button[onclick*="genererRapport"]');
            if (rapportBtn) rapportBtn.remove();
            
            // Supprimer aussi les boutons avec icône file-alt ou file-pdf dans le header
            const headerButtons = headerContent.querySelectorAll('button');
            headerButtons.forEach(btn => {
                const icon = btn.querySelector('i.fa-file-alt, i.fa-file-pdf');
                if (icon && (btn.textContent.includes('Rapport') || btn.textContent.includes('Export PDF'))) {
                    btn.remove();
                }
            });
        }
    }
    
    // Exécuter au chargement et après un délai pour les éléments créés dynamiquement
    document.addEventListener('DOMContentLoaded', function() {
        removeDashboardButtons();
        setTimeout(removeDashboardButtons, 500);
        setTimeout(removeDashboardButtons, 1000);
    });
    
    // Observer les changements dans le DOM pour supprimer les boutons s'ils sont ajoutés dynamiquement
    const observer = new MutationObserver(function(mutations) {
        removeDashboardButtons();
    });
    
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // ========================================
    // MODULE ADMINISTRATION
    // ========================================

    const adminContent = document.getElementById('adminPanel');

    // Gestion du clic sur les cartes d'action
    document.getElementById('btnUsers')?.addEventListener('click', () => {
        if (adminContent) {
            adminContent.innerHTML = renderUsersPanel();
            setTimeout(loadUsers, 100);
        }
    });
    document.getElementById('btnCatalogue')?.addEventListener('click', () => {
        if (adminContent) adminContent.innerHTML = renderCataloguePanel();
    });
    document.getElementById('btnValidations')?.addEventListener('click', () => {
        if (adminContent) adminContent.innerHTML = renderValidationPanel();
    });
    document.getElementById('btnTerritoire')?.addEventListener('click', () => {
        if (adminContent) adminContent.innerHTML = renderTerritoirePanel();
    });

    // --- GESTION DES UTILISATEURS ---
    function renderUsersPanel() {
        return `
            <h3><i class="fas fa-users-cog"></i> Gestion des Utilisateurs</h3>
            <div class="batiments-table-header">
                <div>Nom</div><div>Rôle</div><div>Email</div><div>Statut</div>
            </div>
            <div class="batiments-list" id="usersList"></div>
            <button class="btn btn-primary" onclick="addUser()"><i class="fas fa-user-plus"></i> Ajouter un utilisateur</button>
        `;
    }

    const usersData = [
        { nom: "Admin Central", role: "Administrateur", email: "admin@colconnect.fr", actif: true },
        { nom: "Marie Dupont", role: "Collectivité", email: "md@lyon.fr", actif: true },
        { nom: "Julien Morel", role: "Visiteur", email: "jm@nimes.fr", actif: false },
    ];

    function loadUsers() {
        const list = document.getElementById('usersList');
        if (!list) return;
        list.innerHTML = '';
        usersData.forEach(user => {
            const row = document.createElement('div');
            row.className = 'batiment-row';
            row.innerHTML = `
                <div>${user.nom}</div>
                <div>${user.role}</div>
                <div>${user.email}</div>
                <div>
                    <span class="badge ${user.actif ? 'opp-eligible' : 'opp-none'}">
                        ${user.actif ? 'Actif' : 'Inactif'}
                    </span>
                </div>
            `;
            list.appendChild(row);
        });
    }

    function addUser() {
        alert("Prototype : ouverture du formulaire d'ajout d'utilisateur.");
    }

    // --- GESTION DU CATALOGUE ---
    function renderCataloguePanel() {
        return `
            <h3><i class="fas fa-book"></i> Catalogue et Opportunités</h3>
            <div id="catalogueAdmin">
                <p>Liste simplifiée des mesures énergétiques.</p>
                <ul class="bonnes-pratiques-list">
                    <li>Installation de panneaux solaires <code>OPP-001</code></li>
                    <li>Audit énergétique global <code>OPP-002</code></li>
                    <li>Isolation toiture / murs <code>OPP-003</code></li>
                </ul>
                <button class="btn btn-primary"><i class="fas fa-plus"></i> Ajouter une mesure</button>
            </div>
        `;
    }

    // --- VALIDATIONS DES PROJETS ---
    function renderValidationPanel() {
        return `
            <h3><i class="fas fa-clipboard-check"></i> Validation des projets</h3>
            <p class="admin-validation-desc" style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">Projets soumis pour validation par les collectivités.</p>
            <div class="admin-validation-filters" style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;margin-bottom:1rem;">
                <input type="text" id="adminValSearch" placeholder="Rechercher un projet…" style="flex:1;min-width:180px;padding:0.4rem 0.75rem;font-size:0.85rem;border-radius:8px;border:1px solid var(--border);">
                <select id="adminValCollectivite" style="padding:0.4rem 0.75rem;font-size:0.85rem;border-radius:8px;border:1px solid var(--border);min-width:160px;">
                    <option value="">Toutes les collectivités</option>
                </select>
                <select id="adminValStatut" style="padding:0.4rem 0.75rem;font-size:0.85rem;border-radius:8px;border:1px solid var(--border);min-width:140px;">
                    <option value="">Tous les statuts</option>
                    <option value="creation">En création</option>
                    <option value="etude">En étude</option>
                    <option value="travaux">En travaux</option>
                    <option value="termine">Terminé</option>
                </select>
                <button type="button" class="btn btn-secondary" onclick="loadAdminValidationProjets()" title="Recharger la liste"><i class="fas fa-sync-alt"></i> Actualiser</button>
            </div>
            <div class="batiments-list" id="adminValidationProjetsList">
                <div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">Chargement…</div>
            </div>
        `;
    }

    function getAdminValidationProjetsFullList() {
        var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
        var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
        var seen = {};
        var out = [];
        userList.forEach(function(p) { if (p && p.id && !seen[p.id]) { seen[p.id] = 1; out.push(p); } });
        db.forEach(function(p) { if (p && p.id && !seen[p.id]) { seen[p.id] = 1; out.push(p); } });
        return out;
    }

    function loadAdminValidationProjets() {
        var listEl = document.getElementById('adminValidationProjetsList');
        if (!listEl) return;
        var fullList = getAdminValidationProjetsFullList();

        var searchEl = document.getElementById('adminValSearch');
        var colEl = document.getElementById('adminValCollectivite');
        var statutEl = document.getElementById('adminValStatut');
        var searchTerm = (searchEl && searchEl.value) ? (typeof __normStr === 'function' ? __normStr(searchEl.value) : String(searchEl.value).trim().toLowerCase()) : '';
        var colFilter = (colEl && colEl.value) ? colEl.value : '';
        var statutFilter = (statutEl && statutEl.value) ? statutEl.value : '';

        if (colEl && colEl.options.length <= 1) {
            var collectivites = {};
            fullList.forEach(function(p) { var c = (p.collectivite || '').trim(); if (c) collectivites[c] = 1; });
            var opts = Object.keys(collectivites).sort();
            opts.forEach(function(c) {
                var o = document.createElement('option');
                o.value = c;
                o.textContent = c;
                colEl.appendChild(o);
            });
        }

        var list = fullList.filter(function(p) {
            if (searchTerm) {
                var nameNorm = typeof __normStr === 'function' ? __normStr(p.name || p.title) : (p.name || p.title || '').toLowerCase();
                if (nameNorm.indexOf(searchTerm) === -1) return false;
            }
            if (colFilter && (p.collectivite || '').trim() !== colFilter) return false;
            if (statutFilter && (String(p.status || '').toLowerCase()) !== statutFilter) return false;
            return true;
        });

        if (list.length === 0) {
            listEl.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted); background: var(--bg-elevated); border-radius: 12px; border: 1px dashed var(--border);"><i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i><p>Aucun projet trouvé.</p><p style="font-size: 0.85rem; margin-top: 0.5rem;">' + (searchTerm || colFilter || statutFilter ? 'Modifiez les filtres pour afficher plus de résultats.' : 'Les projets créés via « Mes projets » → « Créer un projet » apparaîtront ici.') + '</p></div>';
            return;
        }
        listEl.innerHTML = list.map(function(p) {
            var name = (p.name || p.title || '—').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            var col = (p.collectivite || '—').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            var isCreation = (p.status || '') === 'creation';
            var statusLabel = isCreation ? 'En création' : (p.status === 'etude' ? 'En études' : (p.status === 'travaux' ? 'En travaux' : (p.status === 'termine' ? 'Terminé' : 'Validé')));
            var statusClass = isCreation ? 'creation' : 'etude';
            var btnValider = isCreation
                ? '<button type="button" class="btn btn-primary" onclick="adminValiderProjet(' + (p.id || 0) + ')"><i class="fas fa-check"></i> Valider</button>'
                : '<button type="button" class="btn btn-validated" disabled><i class="fas fa-check-circle"></i> Validé</button>';
            var btnSupprimer = '<button type="button" class="btn btn-danger-outline" onclick="adminSupprimerProjet(' + (p.id || 0) + ')" title="Supprimer le projet"><i class="fas fa-trash-alt"></i> Supprimer</button>';
            return '<div class="batiment-row" data-projet-id="' + (p.id || '') + '">' +
                '<div><strong>' + name + '</strong></div>' +
                '<div>Collectivité : ' + col + '</div>' +
                '<div>Statut : <span class="status-pill ' + statusClass + '">' + statusLabel + '</span></div>' +
                '<div class="admin-validation-actions">' +
                '<div style="display:flex;gap:0.5rem;flex-wrap:wrap;">' +
                '<button type="button" class="btn btn-secondary" onclick="adminOuvrirFicheProjet(' + (p.id || 0) + ')"><i class="fas fa-external-link-alt"></i> Ouvrir</button>' +
                btnValider +
                '</div>' +
                '<div style="margin-top:0.5rem;">' + btnSupprimer + '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    }

    function adminOuvrirFicheProjet(id) {
        var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
        var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
        var p = db.find(function(x) { return x.id == id; }) || userList.find(function(x) { return x.id == id; });
        if (!p) return;
        var budgetStr = (p.budget != null && p.budget !== '') ? (typeof p.budget === 'number' ? p.budget + 'M€' : String(p.budget)) : '—';
        var projetCompatible = { id: p.id, code: formatProjetCode(p.id || ''), title: p.name || p.title, name: p.name || p.title, status: p.status || 'creation', adresse: p.adresse || '—', budget: budgetStr, progressEtudes: p.progressEtudes ?? 0, progressTravaux: p.progressTravaux ?? 0, etudes: p.progressEtudes ?? 0, travaux: p.progressTravaux ?? 0, collectivite: p.collectivite, analyse: p.analyse };
        window.__detailFromAdminValidation = true;
        window.__currentProjet = projetCompatible;
        if (typeof populateProjectDetails === 'function') populateProjectDetails(projetCompatible);
        if (typeof navigateTo === 'function') navigateTo('detail');
        setTimeout(function() {
            var backEl = document.querySelector('#detail .detail-back');
            if (backEl) {
                backEl.innerHTML = '<i class="fas fa-arrow-left"></i> Retour à l\'administration';
                backEl.onclick = function() {
                    window.__detailFromAdminValidation = false;
                    if (typeof navigateTo === 'function') navigateTo('priv-administration');
                    if (typeof showAdminPanel === 'function') setTimeout(function() { showAdminPanel('validations'); }, 100);
                };
            }
            // Projet en création : basculer automatiquement en Mode Financeur pour la Checklist audit-ready
            if ((p.status || '').toLowerCase() === 'creation' && typeof setDetailView === 'function') {
                setDetailView('financeur');
            }
        }, 120);
    }

    function adminValiderProjet(id) {
        var db = (typeof projectsDatabase !== 'undefined') ? projectsDatabase : [];
        var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
        var p = db.find(function(x) { return x.id == id; }) || userList.find(function(x) { return x.id == id; });
        if (!p) return;
        p.status = 'etude';
        p.progressEtudes = 10;
        p.progressTravaux = 0;
        saveUserCreatedProjets();
        var idx = (window.__projets || []).findIndex(function(x) { return x.id == id; });
        if (idx >= 0 && window.__projets[idx]) {
            window.__projets[idx].status = 'etude';
            window.__projets[idx].etudes = 10;
            window.__projets[idx].travaux = 0;
        } else {
            // Projet validé : l'ajouter à la liste "Mes projets" s'il n'y était pas
            var ref = (typeof COLLECTIVITES_REF !== 'undefined') ? COLLECTIVITES_REF : [];
            var c = ref.find(function(x) { return x.id === (p.collectiviteId || ''); });
            var budgetStr = (p.budget != null && p.budget !== '') ? (typeof p.budget === 'number' ? p.budget + 'M€' : String(p.budget)) : '—';
            var mapped = { id: p.id, code: formatProjetCode(p.id), title: p.name, name: p.name, status: 'etude', etudes: 10, travaux: 0, budget: budgetStr, date: p.date || '—', collectivite: p.collectivite || '', collectiviteCouleur: (c && c.couleur) ? c.couleur : '#718096', adresse: p.adresse || '—', eligible: !!p.eligible };
            if (Array.isArray(window.__projets)) window.__projets.push(mapped);
        }
        loadAdminValidationProjets();
        if (typeof loadPrivProjets === 'function') loadPrivProjets();
        var g = document.getElementById('projetsGrid'); if (g && typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch(); else if (typeof renderProjets === 'function') { var list = (window.__projets || []).filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; }); renderProjets(list, 'projetsGrid'); }
        if (typeof showToast === 'function') showToast('Projet validé : ' + (p.name || p.title || ''));
    }

    function adminSupprimerProjet(id) {
        if (!confirm('Supprimer définitivement ce projet ? Cette action est irréversible.')) return;
        var userList = (typeof __userCreatedProjets !== 'undefined' && Array.isArray(__userCreatedProjets)) ? __userCreatedProjets : [];
        var idx = userList.findIndex(function(x) { return x.id == id; });
        if (idx >= 0) {
            var name = userList[idx].name || userList[idx].title || 'Projet';
            userList.splice(idx, 1);
            if (typeof saveUserCreatedProjets === 'function') saveUserCreatedProjets();
        }
        var projIdx = (window.__projets || []).findIndex(function(x) { return x.id == id; });
        if (projIdx >= 0 && window.__projets) window.__projets.splice(projIdx, 1);
        loadAdminValidationProjets();
        if (typeof loadPrivProjets === 'function') loadPrivProjets();
        var g = document.getElementById('projetsGrid');
        if (g && typeof applyProjetsFiltersAndSearch === 'function') applyProjetsFiltersAndSearch();
        else if (typeof renderProjets === 'function') { var list = (window.__projets || []).filter(function(p) { return (String(p.status || '').toLowerCase()) !== 'creation'; }); renderProjets(list, 'projetsGrid'); }
        if (typeof showToast === 'function') showToast('Projet supprimé');
    }

    // --- VUE TERRITOIRE GLOBAL ---
    function renderTerritoirePanel() {
        return `
            <h3><i class="fas fa-globe-europe"></i> Indicateurs Territoriaux</h3>
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon green"><i class="fas fa-flag"></i></div><div class="stat-value">12</div><div class="stat-label">Collectivités</div></div>
                <div class="stat-card"><div class="stat-icon blue"><i class="fas fa-building"></i></div><div class="stat-value">328</div><div class="stat-label">Bâtiments</div></div>
                <div class="stat-card"><div class="stat-icon orange"><i class="fas fa-sun"></i></div><div class="stat-value">47</div><div class="stat-label">Opportunités</div></div>
                <div class="stat-card"><div class="stat-icon purple"><i class="fas fa-leaf"></i></div><div class="stat-value">-22%</div><div class="stat-label">Baisse conso CO₂</div></div>
            </div>
        `;
    }

    // Fonction legacy pour compatibilité avec onclick dans HTML
    function showAdminPanel(panel) {

    // --- Data Sources ---
    if (panel === "data-sources") {
        // Active la carte si elle existe (optionnel)
        document.querySelectorAll(".action-card").forEach(c => c.classList.remove("active"));
        const card = document.getElementById("btnDataSources");
        if (card) card.classList.add("active");

        if (typeof renderDataSourcesPanel === "function") {
            renderDataSourcesPanel();
        } else if (typeof showToast === "function") {
            showToast("Module Sources de données indisponible.", "error");
        } else {
            console.warn("Module Sources de données indisponible.");
        }
        return;
    }


        if (!adminContent) return;
        switch(panel) {
            case 'users':
                adminContent.innerHTML = renderUsersPanel();
                setTimeout(loadUsers, 100);
                break;
            case 'catalogue':
                adminContent.innerHTML = renderCataloguePanel();
                break;
            case 'validations':
                adminContent.innerHTML = renderValidationPanel();
                setTimeout(function() {
                    loadAdminValidationProjets();
                    var searchEl = document.getElementById('adminValSearch');
                    var colEl = document.getElementById('adminValCollectivite');
                    var statutEl = document.getElementById('adminValStatut');
                    if (searchEl) searchEl.addEventListener('input', loadAdminValidationProjets);
                    if (colEl) colEl.addEventListener('change', loadAdminValidationProjets);
                    if (statutEl) statutEl.addEventListener('change', loadAdminValidationProjets);
                }, 50);
                break;
            case 'territoire':
                adminContent.innerHTML = renderTerritoirePanel();
                break;
            case 'historique':
                adminContent.innerHTML = renderHistoriquePanel();
                setTimeout(renderLogsTable, 100);
                break;
            case 'rapports':
                adminContent.innerHTML = renderRapportPanel();
                setTimeout(renderSavedReports, 100);
                break;
            case 'supervision':
                adminContent.innerHTML = renderSupervisionPanel();
                setTimeout(renderLiveUsers, 100);
                break;
        }
    }

    // ======== MODULE HISTORIQUE / JOURNAL ========

    // Génération du contenu principal avec graphique
    function renderHistoriquePanel() {
        return `
            <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;"><i class="fas fa-history"></i> Historique des actions</h3>
            <div class="filters-row" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <div class="filter-chip active" data-filter="all" onclick="filterLogs('all')">Tous</div>
                <div class="filter-chip" data-filter="login" onclick="filterLogs('login')">Connexions</div>
                <div class="filter-chip" data-filter="edit" onclick="filterLogs('edit')">Éditions</div>
                <div class="filter-chip" data-filter="validate" onclick="filterLogs('validate')">Validations</div>
                <div class="filter-chip" data-filter="export" onclick="filterLogs('export')">Exports</div>
            </div>

            <!-- Graphique d'activité -->
            <div class="stats-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:1rem;margin-bottom:2rem;">
                <h4 style="margin-bottom:0.75rem; color: var(--text-primary);">Activité quotidienne</h4>
                <canvas id="logsChart" height="120"></canvas>
            </div>

            <div id="logsTableContainer" class="logs-table"></div>
            <div style="text-align:right;margin-top:1rem;">
                <button class="btn btn-secondary" id="generateReport"><i class="fas fa-chart-pie"></i> Générer rapport analytique</button>
                <button class="btn btn-primary" onclick="exportLogsToCSV()"><i class="fas fa-file-csv"></i> Exporter CSV</button>
                <button class="btn btn-danger" onclick="clearLogs()"><i class="fas fa-trash"></i> Effacer les logs</button>
            </div>
        `;
    }

    // ======== GRAPHIQUE D'ACTIVITÉ ========

    // Charge la librairie Chart.js si nécessaire
    function ensureChartLibrary(callback) {
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/chart.js";
            script.onload = callback;
            document.body.appendChild(script);
        } else {
            callback();
        }
    }

    // Dessine le graphique à partir des logs
    function drawLogsChart() {
        ensureChartLibrary(() => {
            const logs = JSON.parse(localStorage.getItem('colconnectLogs') || '[]');
            const canvas = document.getElementById('logsChart');
            if (!canvas || logs.length === 0) return;

            // Regroupement des logs par date
            const counts = {};
            logs.forEach(l => {
                const d = l.date.split(' ')[0]; // ex: 26/12/2025
                counts[d] = (counts[d] || 0) + 1;
            });

            const labels = Object.keys(counts).reverse();
            const values = labels.map(d => counts[d]);

            // Détruit le graphique précédent s'il existe
            if (window.logsChartInstance) window.logsChartInstance.destroy();

            const ctx = canvas.getContext('2d');
            window.logsChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Actions enregistrées',
                        data: values,
                        backgroundColor: 'rgba(201, 162, 39, 0.7)',
                        borderColor: 'rgba(201, 162, 39, 1)',
                        borderWidth: 1,
                        borderRadius: 4
                    }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary') },
                            grid: { color: 'rgba(255,255,255,0.05)' }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: { color: getComputedStyle(document.body).getPropertyValue('--text-secondary') },
                            grid: { color: 'rgba(255,255,255,0.05)' }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(13,27,42,0.9)',
                            borderColor: 'rgba(201,162,39,0.5)',
                            borderWidth: 1
                        }
                    }
                }
            });
        });
    }

    // Rendu du tableau des logs
    function renderLogsTable(filter = 'all') {
        const logs = JSON.parse(localStorage.getItem('colconnectLogs') || '[]').reverse();
        const container = document.getElementById('logsTableContainer');
        if (!container) return;

        const filtered = filter === 'all' ? logs : logs.filter(l => l.actionType === filter);
        if (filtered.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted);text-align:center;">Aucun enregistrement trouvé.</p>`;
        } else {
            container.innerHTML = `
                <table class="log-table">
                    <thead>
                        <tr><th>Utilisateur</th><th>Rôle</th><th>Action</th><th>Section</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                        ${filtered.map(l => `
                            <tr>
                                <td>${l.user}</td>
                                <td>${l.role || '-'}</td>
                                <td>${l.action}</td>
                                <td>${l.section || '-'}</td>
                                <td>${l.date}</td>
                            </tr>`).join('')}
                    </tbody>
                </table>
            `;
        }

        // Redessine le graphique dès que le tableau change
        drawLogsChart();
    }

    // Filtrage simple
    function filterLogs(type) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        document.querySelector(`.filter-chip[data-filter="${type}"]`)?.classList.add('active');
        renderLogsTable(type);
    }

    // Export CSV
    function exportLogsToCSV() {
        const logs = JSON.parse(localStorage.getItem('colconnectLogs') || '[]');
        if (logs.length === 0) return alert("Aucun log à exporter !");
        const csvRows = [
            ['Utilisateur', 'Rôle', 'Action', 'Section', 'Catégorie', 'Date'],
            ...logs.map(l => [l.user, l.role || '', l.action, l.section || '', l.actionType || '', l.date])
        ];
        const csvContent = csvRows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ColConnect_Historique_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    }

    // Suppression totale des logs
    function clearLogs() {
        if (!confirm("Effacer la totalité de l'historique ?")) return;
        localStorage.removeItem('colconnectLogs');
        renderLogsTable();
    }

    // ======== RAPPORT ANALYTIQUE ADMIN ========

    document.addEventListener('click', e => {
        if (e.target && e.target.id === 'generateReport') generateAnalyticReport();
    });

    function generateAnalyticReport() {
        const logs = JSON.parse(localStorage.getItem('colconnectLogs') || '[]');
        if (logs.length === 0) {
            alert("Aucun log disponible pour le rapport.");
            return;
        }

        // Classement par type d'action
        const stats = { login: 0, edit: 0, export: 0, validate: 0, autres: 0 };
        const userStats = {};

        logs.forEach(l => {
            const type = l.actionType || 'autres';
            if (stats[type] !== undefined) stats[type]++;
            else stats.autres++;
            userStats[l.user] = (userStats[l.user] || 0) + 1;
        });

        const total = logs.length;

        // Classement des utilisateurs actifs
        const topUsers = Object.entries(userStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        // Analyse comparative mensuelle
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        function extractMonthYear(dateStr) {
            const parts = dateStr.split(/[\/\-]/);
            return `${parseInt(parts[1])}/${parts[2]}`;
        }

        const logsThisMonth = logs.filter(l => {
            const monthYear = extractMonthYear(l.date.split(' ')[0]);
            return monthYear === `${thisMonth + 1}/${thisYear}`;
        });

        const prevMonthDate = new Date(thisYear, thisMonth - 1);
        const prevMonthKey = `${prevMonthDate.getMonth() + 1}/${prevMonthDate.getFullYear()}`;
        const logsPrevMonth = logs.filter(l => extractMonthYear(l.date.split(' ')[0]) === prevMonthKey);

        function summarize(arr) {
            const s = { login: 0, edit: 0, export: 0, validate: 0, total: arr.length };
            arr.forEach(l => {
                if (s[l.actionType] !== undefined) s[l.actionType]++;
            });
            return s;
        }
        const monthStats = summarize(logsThisMonth);
        const prevStats = summarize(logsPrevMonth);

        function variation(current, previous) {
            if (previous === 0) return current === 0 ? 0 : 100;
            return (((current - previous) / previous) * 100).toFixed(1);
        }

        const comp = {
            total: variation(monthStats.total, prevStats.total),
            login: variation(monthStats.login, prevStats.login),
            edit: variation(monthStats.edit, prevStats.edit),
            validate: variation(monthStats.validate, prevStats.validate),
            export: variation(monthStats.export, prevStats.export)
        };

        // Génération du HTML du rapport
        const rapportHTML = `
            <div style="font-family:Arial; padding:2rem; color:#1a202c;">
                <h1 style="color:#c9a227;">Rapport Analytique - ColConnect</h1>
                <p>Date du rapport : <strong>${new Date().toLocaleDateString('fr-FR')}</strong></p>
                <hr style="margin:1rem 0; border:1px solid #c9a227;">

                <h2 style="color:#2d6a4f;">Synthèse globale</h2>
                <ul style="line-height:1.6;">
                    <li>Total d'actions enregistrées : <strong>${total}</strong></li>
                    <li>Connexions : <strong>${stats.login}</strong></li>
                    <li>Éditions : <strong>${stats.edit}</strong></li>
                    <li>Validations : <strong>${stats.validate}</strong></li>
                    <li>Exports : <strong>${stats.export}</strong></li>
                </ul>

                <h2 style="color:#2d6a4f;">Top utilisateurs actifs</h2>
                <table style="width:100%; border-collapse:collapse; margin-top:0.5rem;">
                    <thead>
                        <tr style="background:#c9a227;color:#0d1b2a;">
                            <th style="padding:0.5rem;">Utilisateur</th>
                            <th style="padding:0.5rem;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${topUsers.map(u => `<tr><td style="padding:0.5rem;">${u[0]}</td><td style="padding:0.5rem;">${u[1]}</td></tr>`).join('')}
                    </tbody>
                </table>

                <h2 style="color:#2d6a4f;">Évolution mensuelle</h2>
                <table style="width:100%; border-collapse:collapse; margin-bottom:1.5rem;">
                    <thead>
                        <tr style="background:#2d6a4f; color:white;">
                            <th style="padding:0.4rem;">Indicateur</th>
                            <th style="padding:0.4rem;">Mois courant (${thisMonth + 1}/${thisYear})</th>
                            <th style="padding:0.4rem;">Mois précédent (${prevMonthKey})</th>
                            <th style="padding:0.4rem;">Variation (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Connexions</td><td>${monthStats.login}</td><td>${prevStats.login}</td>
                            <td style="color:${comp.login >= 0 ? '#2d6a4f' : '#991b1b'};">${comp.login > 0 ? '+' : ''}${comp.login}%</td>
                        </tr>
                        <tr><td>Éditions</td><td>${monthStats.edit}</td><td>${prevStats.edit}</td>
                            <td style="color:${comp.edit >= 0 ? '#2d6a4f' : '#991b1b'};">${comp.edit > 0 ? '+' : ''}${comp.edit}%</td>
                        </tr>
                        <tr><td>Validations</td><td>${monthStats.validate}</td><td>${prevStats.validate}</td>
                            <td style="color:${comp.validate >= 0 ? '#2d6a4f' : '#991b1b'};">${comp.validate > 0 ? '+' : ''}${comp.validate}%</td>
                        </tr>
                        <tr><td>Exports</td><td>${monthStats.export}</td><td>${prevStats.export}</td>
                            <td style="color:${comp.export >= 0 ? '#2d6a4f' : '#991b1b'};">${comp.export > 0 ? '+' : ''}${comp.export}%</td>
                        </tr>
                        <tr><td><strong>Total actions</strong></td><td><strong>${monthStats.total}</strong></td><td><strong>${prevStats.total}</strong></td>
                            <td style="color:${comp.total >= 0 ? '#2d6a4f' : '#991b1b'};"><strong>${comp.total > 0 ? '+' : ''}${comp.total}%</strong></td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top:0.5rem; line-height:1.5;">
                    <p style="font-size:0.9rem;">
                        ${comp.total > 0
                            ? `📈 Activité en hausse de <strong>${comp.total}%</strong> par rapport au mois précédent.`
                            : comp.total < 0
                            ? `📉 Activité en baisse de <strong>${Math.abs(comp.total)}%</strong>.`
                            : `➡️ Activité stable sur la période.`}
                    </p>
                </div>

                <hr style="margin-top:1.5rem; border:1px solid #ccc;">
                <p style="font-size:0.8rem; color:#718096;">Rapport généré automatiquement par ColConnect © ${new Date().getFullYear()}</p>
            </div>
        `;

        // Sauvegarde du rapport en JSON
        const reportData = {
            id: Date.now(),
            auteur: currentUser?.nom || "Administrateur",
            role: currentUser?.role || "admin",
            dateGeneration: new Date().toLocaleString('fr-FR'),
            periode: `${thisMonth + 1}/${thisYear}`,
            comparaison: `${prevMonthKey}`,
            statsActuelles: monthStats,
            statsPrecedentes: prevStats,
            variations: comp,
            totalActions: total,
            topUtilisateurs: topUsers.map(([nom, actions]) => ({ nom, actions })),
        };

        const oldReports = JSON.parse(localStorage.getItem('colconnectReports') || '[]');
        oldReports.push(reportData);
        localStorage.setItem('colconnectReports', JSON.stringify(oldReports));
        console.log(`[RAPPORT] Rapport analytique enregistré : ${reportData.periode}`);

        // Utilisation de html2pdf pour générer le PDF
        ensurePDFLibrary(() => {
            html2pdf().set({
                margin: 0.5,
                filename: `ColConnect_Rapport_Analytique_${new Date().toISOString().slice(0,10)}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
            }).from(rapportHTML).save();
        });
    }

    function ensurePDFLibrary(callback) {
        if (typeof html2pdf === 'undefined') {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = callback;
            document.body.appendChild(script);
        } else {
            callback();
        }
    }

    // ======== MODULE RAPPORTS ANALYTIQUES ENREGISTRÉS ========

    function renderRapportPanel() {
        return `
            <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;"><i class="fas fa-chart-bar"></i> Rapports Analytiques Sauvegardés</h3>
            <div id="reportsContainer"></div>
            <div style="text-align:right;margin-top:1rem;">
                <button class="btn btn-danger" id="clearReports"><i class="fas fa-trash"></i> Supprimer tout</button>
            </div>
        `;
    }

    // Affiche les rapports stockés
    function renderSavedReports() {
        const data = JSON.parse(localStorage.getItem('colconnectReports') || '[]').reverse();
        const container = document.getElementById('reportsContainer');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted);">Aucun rapport sauvegardé pour l'instant.</p>`;
            return;
        }

        container.innerHTML = `
            <table class="rapports-table" style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr><th>Date</th><th>Période</th><th>Auteur</th><th>Actions totales</th><th>Variation</th><th></th></tr>
                </thead>
                <tbody>
                    ${data.map(r => `
                        <tr>
                            <td>${r.dateGeneration}</td>
                            <td>${r.periode}</td>
                            <td>${r.auteur}</td>
                            <td><strong>${r.totalActions}</strong></td>
                            <td style="color:${r.variations.total >= 0 ? '#2d6a4f' : '#991b1b'};">
                                ${r.variations.total > 0 ? '+' : ''}${r.variations.total}%
                            </td>
                            <td><button class="btn btn-secondary" onclick="viewReportDetails(${r.id})">
                                <i class="fas fa-eye"></i> Détails
                            </button></td>
                        </tr>`).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('clearReports').onclick = () => {
            if (confirm("Supprimer tous les rapports enregistrés ?")) {
                localStorage.removeItem('colconnectReports');
                renderSavedReports();
            }
        };
    }

    // Affichage détaillé d'un rapport
    function viewReportDetails(id) {
        const data = JSON.parse(localStorage.getItem('colconnectReports') || '[]');
        const report = data.find(r => r.id === id);
        if (!report) return alert("Rapport introuvable.");

        const card = `
            <div class="fiche-section" style="margin-top:1rem; padding: 1.5rem; background: var(--bg-elevated); border-radius: 12px;">
                <h4 style="color: var(--text-primary);"><i class="fas fa-chart-line"></i> Rapport du ${report.periode}</h4>
                <p><strong>Auteur :</strong> ${report.auteur} (${report.role})</p>
                <p><strong>Généré le :</strong> ${report.dateGeneration}</p>
                <ul style="line-height:1.6; color: var(--text-secondary);">
                    <li>Total actions : <strong>${report.totalActions}</strong></li>
                    <li>Connexions : ${report.statsActuelles.login} (${report.variations.login > 0 ? '+' : ''}${report.variations.login}%)</li>
                    <li>Exports : ${report.statsActuelles.export} (${report.variations.export > 0 ? '+' : ''}${report.variations.export}%)</li>
                    <li>Validations : ${report.statsActuelles.validate} (${report.variations.validate > 0 ? '+' : ''}${report.variations.validate}%)</li>
                </ul>
                <div style="text-align:right; margin-top: 1rem;">
                    <button class="btn btn-secondary" onclick="showAdminPanel('rapports')"><i class="fas fa-arrow-left"></i> Retour</button>
                    <button class="btn btn-primary" onclick="reexportReport(${id})"><i class="fas fa-file-pdf"></i> Re‑télécharger PDF</button>
                </div>
            </div>
        `;
        document.getElementById('reportsContainer').innerHTML = card;
    }

    // Régénération du PDF
    function reexportReport(id) {
        const data = JSON.parse(localStorage.getItem('colconnectReports') || '[]');
        const report = data.find(r => r.id === id);
        if (!report) return;

        ensurePDFLibrary(() => {
            const html = `
                <div style="font-family:Arial;padding:1.5rem;">
                    <h1 style="color:#c9a227;">Rapport Analytique Rétroactif</h1>
                    <p><strong>Période :</strong> ${report.periode}</p>
                    <p><strong>Auteur :</strong> ${report.auteur} (${report.role})</p>
                    <p><strong>Actions totales :</strong> ${report.totalActions}</p>
                    <p><strong>Variation mensuelle :</strong> ${report.variations.total > 0 ? '+' : ''}${report.variations.total}%</p>
                    <hr>
                    <p>Rapport généré depuis l'historique ColConnect © ${new Date().getFullYear()}</p>
                </div>`;
            html2pdf().from(html).save(`Rapport_ColConnect_${report.periode.replace('/', '-')}.pdf`);
        });
    }

    // ======== NOTIFICATIONS TEMPS RÉEL (EVENT BUS) ========

    // Affiche une notification toast
    function showNotifToast(msg, color = 'var(--secondary)') {
        const toast = document.getElementById('notifToast');
        if (!toast) return;
        toast.innerHTML = `<i class="fas fa-bell"></i> ${msg}`;
        toast.style.borderColor = color;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // Écoute temps réel du MockAPI - Rapports
    ColConnectEvents.on('colconnectReports:created', (data) => {
        console.log('🟢 Nouveau rapport détecté', data);
        showNotifToast(`Rapport "${data.periode}" enregistré !`, 'var(--accent-light)');
        if (document.getElementById('reportsContainer')) {
            renderSavedReports(); // Met à jour automatiquement le tableau
        }
    });

    ColConnectEvents.on('colconnectReports:deleted', (data) => {
        console.log('🔴 Rapport supprimé', data);
        showNotifToast(`Un rapport a été supprimé.`, 'var(--danger)');
        if (document.getElementById('reportsContainer')) {
            renderSavedReports();
        }
    });

    // Écoute temps réel - Logs
    ColConnectEvents.on('colconnectLogs:created', (data) => {
        console.log('📝 Nouvelle action loggée', data);
        if (document.getElementById('logsTableContainer')) {
            renderLogsTable();
        }
    });

    // ======== MODULE CONSOLE DE SUPERVISION ========

    // État simulé des utilisateurs connectés
    let liveUsers = [
        { id: 1, name: "Admin Central", role: "superadmin", lastAction: "Validation projet", lastActive: Date.now() - 120000 },
        { id: 2, name: "Mairie Lyon", role: "collectivite", lastAction: "Consultation budget", lastActive: Date.now() - 45000 },
        { id: 3, name: "Agent Dupont", role: "admin", lastAction: "Export CSV", lastActive: Date.now() - 600000 },
        { id: 4, name: "Visiteur 42", role: "visiteur", lastAction: "Lecture fiche", lastActive: Date.now() - 900000 }
    ];

    // Génération du panneau supervision
    function renderSupervisionPanel() {
        return `
            <h3 style="color: var(--text-primary); margin-bottom: 1.5rem;"><i class="fas fa-satellite-dish"></i> Console de Supervision</h3>
            <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Suivi en temps réel des utilisateurs connectés à ColConnect.</p>

            <div class="stats-row" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="stat-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div id="statOnline" style="font-size: 2rem; font-weight: bold; color: #2d6a4f;">-</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">En ligne</div>
                </div>
                <div class="stat-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div id="statIdle" style="font-size: 2rem; font-weight: bold; color: #c9a227;">-</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">Inactifs</div>
                </div>
                <div class="stat-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div id="statOffline" style="font-size: 2rem; font-weight: bold; color: #991b1b;">-</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">Hors ligne</div>
                </div>
                <div class="stat-card" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 1rem; text-align: center;">
                    <div id="statTotal" style="font-size: 2rem; font-weight: bold; color: var(--accent);">-</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">Total suivi</div>
                </div>
            </div>

            <div id="liveUsersTable" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; overflow: hidden;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead style="background: var(--bg-elevated);">
                        <tr>
                            <th style="text-align: left; padding: 0.75rem 1rem; color: var(--text-primary);">Utilisateur</th>
                            <th style="text-align: left; padding: 0.75rem 1rem; color: var(--text-primary);">Rôle</th>
                            <th style="text-align: left; padding: 0.75rem 1rem; color: var(--text-primary);">Dernière action</th>
                            <th style="text-align: center; padding: 0.75rem 1rem; color: var(--text-primary);">Statut</th>
                        </tr>
                    </thead>
                    <tbody id="liveUsersBody"></tbody>
                </table>
            </div>

            <div style="text-align: right; margin-top: 1rem;">
                <button class="btn btn-secondary" onclick="simulateNewUser()"><i class="fas fa-user-plus"></i> Simuler connexion</button>
                <button class="btn btn-primary" onclick="refreshLiveUsers()"><i class="fas fa-sync"></i> Rafraîchir</button>
            </div>
        `;
    }

    // Affichage des utilisateurs en temps réel
    function renderLiveUsers() {
        const tbody = document.getElementById('liveUsersBody');
        if (!tbody) return;

        const now = Date.now();

        // Calcul des statistiques
        let online = 0, idle = 0, offline = 0;
        liveUsers.forEach(u => {
            const diff = now - u.lastActive;
            if (diff < 120000) online++;
            else if (diff < 600000) idle++;
            else offline++;
        });

        // Mise à jour des compteurs
        const statOnline = document.getElementById('statOnline');
        const statIdle = document.getElementById('statIdle');
        const statOffline = document.getElementById('statOffline');
        const statTotal = document.getElementById('statTotal');
        if (statOnline) statOnline.textContent = online;
        if (statIdle) statIdle.textContent = idle;
        if (statOffline) statOffline.textContent = offline;
        if (statTotal) statTotal.textContent = liveUsers.length;

        // Rendu du tableau
        tbody.innerHTML = liveUsers.map(user => {
            const diff = now - user.lastActive;
            let statusClass, statusLabel;
            if (diff < 120000) {
                statusClass = 'badge-online';
                statusLabel = 'En ligne';
            } else if (diff < 600000) {
                statusClass = 'badge-idle';
                statusLabel = 'Inactif';
            } else {
                statusClass = 'badge-offline';
                statusLabel = 'Hors ligne';
            }

            const timeAgo = diff < 60000 ? 'À l\'instant' :
                            diff < 3600000 ? Math.floor(diff / 60000) + ' min' :
                            Math.floor(diff / 3600000) + ' h';

            return `
                <tr style="border-top: 1px solid var(--border);">
                    <td style="padding: 0.75rem 1rem; color: var(--text-primary);">
                        <i class="fas fa-user-circle" style="margin-right: 0.5rem; color: var(--accent);"></i>
                        ${user.name}
                    </td>
                    <td style="padding: 0.75rem 1rem;">
                        <span class="role-chip role-${user.role}">${user.role}</span>
                    </td>
                    <td style="padding: 0.75rem 1rem; color: var(--text-secondary);">
                        ${user.lastAction} <span style="color: var(--text-muted); font-size: 0.8rem;">(${timeAgo})</span>
                    </td>
                    <td style="padding: 0.75rem 1rem; text-align: center;">
                        <div class="activity-status">
                            <span class="badge-status ${statusClass}"></span>
                            <span style="font-size: 0.85rem; color: var(--text-secondary);">${statusLabel}</span>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Mise à jour simulée (polling)
    function updateLiveUsers() {
        // Simule une mise à jour aléatoire des activités
        liveUsers.forEach(user => {
            if (Math.random() < 0.3) {
                user.lastActive = Date.now() - Math.floor(Math.random() * 900000);
            }
        });
        renderLiveUsers();
    }

    // Rafraîchir manuellement
    function refreshLiveUsers() {
        updateLiveUsers();
        showNotifToast('Liste des utilisateurs actualisée', 'var(--accent)');
    }

    // Simuler une nouvelle connexion
    function simulateNewUser() {
        const newId = liveUsers.length + 1;
        const actions = ['Consultation fiche', 'Export données', 'Modification budget', 'Lecture rapport'];
        const roles = ['admin', 'collectivite', 'visiteur'];
        liveUsers.push({
            id: newId,
            name: `Utilisateur ${newId}`,
            role: roles[Math.floor(Math.random() * roles.length)],
            lastAction: actions[Math.floor(Math.random() * actions.length)],
            lastActive: Date.now()
        });
        renderLiveUsers();
        showNotifToast(`Nouvelle connexion : Utilisateur ${newId}`, '#2d6a4f');
    }

    // Enregistrer une action utilisateur (pour intégration future)
    function registerUserAction(userName, action) {
        const user = liveUsers.find(u => u.name === userName);
        if (user) {
            user.lastAction = action;
            user.lastActive = Date.now();
        }
    }

    // Détection des déconnexions (appelée périodiquement)
    function detectDisconnections() {
        const now = Date.now();
        liveUsers.forEach(user => {
            if (now - user.lastActive > 1800000) { // 30 min = considéré déconnecté
                console.log(`🔌 ${user.name} considéré comme déconnecté`);
            }
        });
    }

    // Mise à jour automatique toutes les 30 secondes
    setInterval(() => {
        if (document.getElementById('liveUsersBody')) {
            updateLiveUsers();
        }
    }, 30000);

    // ======== MODALES SUPER ADMIN ========

    const adminModalOverlay = document.getElementById('adminModalOverlay');
    const adminModalTitle = document.getElementById('adminModalTitle');
    const adminModalBody = document.getElementById('adminModalBody');

    // Liste globale des utilisateurs (simulation)
    let allUsers = JSON.parse(localStorage.getItem('colconnectUsers') || '[]');

    // Ouvrir une modale admin
    function openAdminModal(title, htmlBody) {
        adminModalTitle.innerHTML = title;
        adminModalBody.innerHTML = htmlBody;
        adminModalOverlay.classList.remove('hidden');
    }

    // Fermer la modale admin
    function closeAdminModal() {
        adminModalOverlay.classList.add('hidden');
    }

    // Sauvegarder les utilisateurs
    function saveUsersToStorage() {
        localStorage.setItem('colconnectUsers', JSON.stringify(allUsers));
    }

    // Rendu du tableau utilisateurs global
    function renderGlobalUsers() {
        const container = document.getElementById('usersTableContainer');
        if (!container) return;

        if (allUsers.length === 0) {
            container.innerHTML = `<p style="color:var(--text-muted);">Aucun utilisateur enregistré.</p>`;
            return;
        }

        container.innerHTML = `
            <table class="log-table" style="width:100%;">
                <thead>
                    <tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    ${allUsers.map(u => `
                        <tr>
                            <td>${u.nom}</td>
                            <td>${u.email}</td>
                            <td><span class="badge" style="background:var(--secondary);color:#0d1b2a;">${u.role}</span></td>
                            <td>
                                <button class="btn btn-secondary" onclick="openResetPasswordModal('${u.email}')" style="padding:0.3rem 0.6rem;font-size:0.8rem;">
                                    <i class="fas fa-key"></i>
                                </button>
                                <button class="btn btn-danger" onclick="confirmDeleteUser('${u.email}')" style="padding:0.3rem 0.6rem;font-size:0.8rem;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`).join('')}
                </tbody>
            </table>
        `;
    }

    // === 1. Ajouter un utilisateur ===
    function openAddUserModal() {
        // Seuls superadmin et admin peuvent ajouter des utilisateurs
        if (!hasMinLevel(3)) {
            return showNotifToast("Accès refusé : privilèges insuffisants.", 'var(--danger)');
        }

        // Superadmin peut créer d'autres superadmin
        const superadminOption = hasMinLevel(4) ? '<option value="superadmin">Super Administrateur</option>' : '';

        const html = `
            <label>Nom</label>
            <input id="newUserName" placeholder="Nom complet">
            <label>Email</label>
            <input id="newUserEmail" type="email" placeholder="exemple@domaine.fr">
            <label>Rôle</label>
            <select id="newUserRole">
                <option value="visiteur">Visiteur</option>
                <option value="collectivite">Collectivité</option>
                <option value="financeur">Financeur / Partenaire</option>
                        <option value="admin">Administrateur</option>
                ${superadminOption}
            </select>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="saveNewUser()"><i class="fas fa-check"></i> Enregistrer</button>
            </div>`;
        openAdminModal("<i class='fas fa-user-plus'></i> Ajouter un utilisateur", html);
    }

    function saveNewUser() {
        const role = document.getElementById('newUserRole').value;
        const user = {
            id: Date.now(),
            nom: document.getElementById('newUserName').value,
            email: document.getElementById('newUserEmail').value,
            role: role,
            niveau: RolesAccess[role]?.niveau || 1
        };
        if (!user.nom || !user.email) return alert("Tous les champs sont requis.");
        allUsers.push(user);
        saveUsersToStorage();
        renderGlobalUsers();
        closeAdminModal();
        showNotifToast(`Utilisateur "${user.nom}" ajouté comme ${role}.`, 'var(--accent-light)');
        logAction("Ajout utilisateur", `${user.email} (${role})`, "edit");
    }

    // === 2. Réinitialiser mot de passe ===
    function openResetPasswordModal(email = '') {
        const html = `
            <label>Email de l'utilisateur</label>
            <input id="resetEmail" type="email" placeholder="adresse@colconnect.fr" value="${email}">
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="resetPassword()"><i class="fas fa-sync"></i> Réinitialiser</button>
            </div>`;
        openAdminModal("<i class='fas fa-key'></i> Réinitialiser le mot de passe", html);
    }

    function resetPassword() {
        const email = document.getElementById('resetEmail').value;
        const user = allUsers.find(u => u.email === email);
        if (!user) return alert("Utilisateur introuvable.");
        showNotifToast(`Mot de passe réinitialisé pour ${user.nom}.`, 'var(--secondary)');
        logAction("Reset mot de passe", email, "edit");
        closeAdminModal();
    }

    // === 3. Supprimer utilisateur ===
    function confirmDeleteUser(email) {
        const html = `
            <p style="color:var(--text-secondary);">Voulez-vous vraiment supprimer l'utilisateur <strong>${email}</strong> ?</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeAdminModal()">Annuler</button>
                <button class="btn btn-danger" onclick="deleteUser('${email}')"><i class="fas fa-user-slash"></i> Supprimer</button>
            </div>`;
        openAdminModal("<i class='fas fa-exclamation-triangle'></i> Confirmation", html);
    }

    function deleteUser(email) {
        const index = allUsers.findIndex(u => u.email === email);
        if (index === -1) return alert("Utilisateur introuvable.");
        const removed = allUsers.splice(index, 1);
        saveUsersToStorage();
        renderGlobalUsers();
        closeAdminModal();
        showNotifToast(`Utilisateur ${removed[0].nom} supprimé.`, 'var(--danger)');
        logAction("Suppression utilisateur", email, "edit");
    }

    // ======== RESTRICTIONS BASÉES SUR LE RÔLE ========

    // Applique les restrictions visuelles selon le rôle
    function applyRoleRestrictions(user) {
        if (!user) return;
        const role = RolesAccess[user.role];
        if (!role) return;

        // Cache les boutons d'administration si non autorisé
        if (!role.canManageUsers) {
            document.querySelectorAll('[data-admin-action]').forEach(btn => {
                btn.style.display = 'none';
            });
        }

        // Désactive les actions de suppression si non autorisé
        if (!role.canDelete) {
            document.querySelectorAll('.btn-danger[data-delete]').forEach(btn => {
                btn.disabled = true;
                btn.title = "Action réservée au Super Administrateur";
            });
        }

        // Cache les onglets non autorisés
        document.querySelectorAll('.nav-tab').forEach(tab => {
            const id = tab.dataset.section;
            if (!id) return;
            const visible = role.canView.includes('*') || role.canView.includes(id);
            tab.style.display = visible ? '' : 'none';
        });

        // Cache les boutons d'export si non autorisé
        if (!role.canExport) {
            document.querySelectorAll('[data-action="export"]').forEach(btn => {
                btn.style.display = 'none';
            });
        }

        console.log(`[RBAC] Restrictions appliquées pour ${user.role} (niveau ${role.niveau})`);
    }

    // Met à jour le header : nom de la collectivité uniquement (MAJUSCULES), sans rôle — égalité institutionnelle
    function updateUserBadge() {
        const info = document.querySelector('#userInfo');
        if (!currentUser || !info) return;

        const collectiviteHeader = (currentUser.collectivite || currentUser.nom || '').toString().trim().toUpperCase();
        info.innerHTML = `<i class="fas fa-landmark" aria-hidden="true"></i> ${collectiviteHeader}`;
    }

    // Ouvre une modale avec vérification de niveau
    function openModalSecure(title, htmlBody, requiredLevel = 3) {
        if (!currentUser) {
            return alert("Vous devez être connecté.");
        }
        const access = RolesAccess[currentUser.role];
        if (!access || access.niveau < requiredLevel) {
            showNotifToast("Accès refusé : privilèges insuffisants.", 'var(--danger)');
            return;
        }
        openAdminModal(title, htmlBody);
    }

    // Vérifie si l'utilisateur a un niveau suffisant
    function hasMinLevel(minLevel) {
        if (!currentUser) return false;
        const access = RolesAccess[currentUser.role];
        return access && access.niveau >= minLevel;
    }

    // Vérifie une permission spécifique
    function hasPermission(permission) {
        if (!currentUser) return false;
        const access = RolesAccess[currentUser.role];
        return access && access[permission] === true;
    }

    // ========================
    // CARTE GLOBALE INTERACTIVE
    // ========================
    let globalMap = null;
    let collectivitesLayer = null;
    let projetsLayer = null;
    let allMarkers = [];

    function initGlobalMap() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet non chargé');
            return;
        }

        // Détruire la carte existante si elle existe
        if (globalMap) {
            globalMap.remove();
            globalMap = null;
        }

        // Centre de la France
        const franceCentre = [46.603354, 1.888334];

        // Créer la carte
        globalMap = L.map('global-map', {
            zoomControl: true,
            scrollWheelZoom: true
        }).setView(franceCentre, 6);

        // Ajouter les tuiles CartoDB Dark
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap © CARTO',
            maxZoom: 19
        }).addTo(globalMap);

        // Créer les groupes de couches
        collectivitesLayer = L.layerGroup().addTo(globalMap);
        projetsLayer = L.layerGroup().addTo(globalMap);

        // Ajouter les marqueurs
        addCollectivitesMarkers();
        addProjetsMarkers();

        // Ajuster la taille
        setTimeout(() => { globalMap.invalidateSize(); }, 300);
    }

    function addCollectivitesMarkers() {
        collectivites.forEach(coll => {
            const icon = L.divIcon({
                className: 'custom-div-icon',
                html: '<div class="custom-marker-collectivite" style="width: 36px; height: 36px;"><i class="fas fa-' + coll.icon + '" style="color: #c9a227; font-size: 14px;"></i></div>',
                iconSize: [36, 36],
                iconAnchor: [18, 18]
            });

            const marker = L.marker([coll.lat, coll.lon], { icon: icon });

            const popupContent = '<div class="popup-title">' + coll.name + '</div>' +
                '<div class="popup-info"><i class="fas fa-tag"></i> ' + coll.type + '</div>' +
                '<div class="popup-info"><i class="fas fa-users"></i> Population: ' + coll.population + '</div>' +
                '<div class="popup-info"><i class="fas fa-folder"></i> ' + coll.projets + ' projets</div>' +
                '<button class="popup-btn" onclick="selectCollectivite(\'' + coll.name + '\')"><i class="fas fa-eye"></i> Voir la fiche</button>';

            marker.bindPopup(popupContent);
            marker.markerType = 'collectivite';
            marker.addTo(collectivitesLayer);
            allMarkers.push(marker);
        });
    }

    function addProjetsMarkers() {
        projectsDatabase.forEach(projet => {
            let markerClass = 'marker-travaux';
            let statusLabel = 'En travaux';
            let statusClass = 'travaux';

            if (projet.status === 'etude') {
                markerClass = 'marker-etude';
                statusLabel = 'En étude';
                statusClass = 'etude';
            } else if (projet.status === 'termine') {
                markerClass = 'marker-termine';
                statusLabel = 'Terminé';
                statusClass = 'termine';
            }

            const icon = L.divIcon({
                className: 'custom-div-icon',
                html: '<div class="custom-marker-projet ' + markerClass + '" style="width: 28px; height: 28px;"><i class="fas fa-hard-hat" style="color: white; font-size: 12px;"></i></div>',
                iconSize: [28, 28],
                iconAnchor: [14, 14]
            });

            const marker = L.marker([projet.lat, projet.lon], { icon: icon });

            const progress = projet.status === 'etude' ? projet.progressEtudes : projet.progressTravaux;
            const progressLabel = projet.status === 'etude' ? 'Études' : 'Travaux';
            const progressColor = projet.status === 'etude' ? '#d97706' : '#40916c';

            const popupContent = '<div class="popup-title">' + projet.name + '</div>' +
                '<div class="popup-info"><i class="fas fa-hashtag"></i> P' + projet.id + ' · <i class="fas fa-landmark"></i> ' + projet.collectivite + '</div>' +
                '<div class="popup-info"><i class="fas fa-tag"></i> ' + projet.type + '</div>' +
                '<div class="popup-info"><i class="fas fa-euro-sign"></i> Budget: ' + projet.budget + ' M€</div>' +
                '<span class="popup-status ' + statusClass + '">' + statusLabel + '</span>' +
                '<div style="margin-top: 0.5rem;"><div style="font-size: 0.75rem; color: #a0aec0;">' + progressLabel + ': ' + progress + '%</div>' +
                '<div style="background: #243447; height: 6px; border-radius: 3px; margin-top: 0.25rem;"><div style="background: ' + progressColor + '; height: 100%; width: ' + progress + '%; border-radius: 3px;"></div></div></div>';

            marker.bindPopup(popupContent);
            marker.markerType = 'projet';
            marker.addTo(projetsLayer);
            allMarkers.push(marker);
        });
    }

    function filterMapMarkers(filter) {
        document.querySelectorAll('.map-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mapFilter === filter) {
                btn.classList.add('active');
            }
        });

        if (filter === 'all') {
            globalMap.addLayer(collectivitesLayer);
            globalMap.addLayer(projetsLayer);
        } else if (filter === 'collectivites') {
            globalMap.addLayer(collectivitesLayer);
            globalMap.removeLayer(projetsLayer);
        } else if (filter === 'projets') {
            globalMap.removeLayer(collectivitesLayer);
            globalMap.addLayer(projetsLayer);
        }
    }

    // Surcharger navigateTo pour initialiser la carte
    if (typeof navigateTo === 'function') {
        const currentNavigateTo = navigateTo;
        navigateTo = function(sectionId) {
            currentNavigateTo(sectionId);
            if (sectionId === 'carte-globale') {
                setTimeout(initGlobalMap, 150);
            }
        };
    }



    // ========================
    // DÉCRET TERTIAIRE / OPERAT
    // ========================

    // Export vers OPERAT
    function exportOPERAT() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 10000;';

        modal.innerHTML = `
            <div style="background: var(--bg-card); border-radius: 20px; padding: 2rem; max-width: 500px; width: 90%; border: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #2d6a4f, #40916c); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-cloud-upload-alt" style="color: white; font-size: 1.25rem;"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; color: var(--text-primary);">Export OPERAT</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Préparer les données pour la plateforme nationale</p>
                    </div>
                </div>

                <div style="background: var(--bg-elevated); border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: var(--text-secondary);">Bâtiments assujettis</span>
                        <span style="color: var(--text-primary); font-weight: 600;">3</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span style="color: var(--text-secondary);">Surface totale</span>
                        <span style="color: var(--text-primary); font-weight: 600;">4 850 m²</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-secondary);">Période de déclaration</span>
                        <span style="color: var(--text-primary); font-weight: 600;">2024</span>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button onclick="this.closest('.modal-overlay').remove()" style="flex: 1; padding: 0.75rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-family: inherit; cursor: pointer;">
                        Annuler
                    </button>
                    <button onclick="generateOPERATFile(); this.closest('.modal-overlay').remove();" style="flex: 1; padding: 0.75rem; background: linear-gradient(135deg, #2d6a4f, #40916c); border: none; border-radius: 10px; color: white; font-family: inherit; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <i class="fas fa-download"></i> Générer le fichier
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    function generateOPERATFile() {
        // Simuler la génération du fichier OPERAT
        const operatData = {
            declarant: {
                siret: "21690123800019",
                collectivite: currentUserCollectivite
            },
            annee_declaration: 2024,
            batiments: [
                {
                    efa_id: "EFA-69001-001",
                    nom: "Hôtel de Ville",
                    surface: 2500,
                    activite: "Bureaux",
                    conso_ref_2019: 520,
                    conso_2024: 342,
                    reduction: -34.2
                },
                {
                    efa_id: "EFA-69001-002",
                    nom: "Médiathèque Centrale",
                    surface: 1800,
                    activite: "Culture",
                    conso_ref_2019: 445,
                    conso_2024: 298,
                    reduction: -33.0
                },
                {
                    efa_id: "EFA-69001-003",
                    nom: "Complexe Sportif Municipal",
                    surface: 1550,
                    activite: "Sport",
                    conso_ref_2019: 280,
                    conso_2024: 184,
                    reduction: -34.3
                }
            ]
        };

        // Créer un blob et télécharger
        const blob = new Blob([JSON.stringify(operatData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export_operat_' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);

        // Notification de succès
        showNotification('Fichier OPERAT généré avec succès !', 'success');
    }

    // Synchronisation ANCT
    function syncANCT() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 10000;';

        modal.innerHTML = `
            <div style="background: var(--bg-card); border-radius: 20px; padding: 2rem; max-width: 500px; width: 90%; border: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="width: 50px; height: 50px; background: var(--gradient-gold); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-landmark" style="color: #0d1b2a; font-size: 1.25rem;"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; color: var(--text-primary);">Mon Espace Collectivité</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Synchronisation avec la plateforme ANCT</p>
                    </div>
                </div>

                <div style="background: rgba(45, 106, 79, 0.1); border: 1px solid rgba(45, 106, 79, 0.3); border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
                    <p style="color: #40916c; font-size: 0.9rem; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-info-circle"></i>
                        Cette synchronisation permet de :
                    </p>
                    <ul style="color: var(--text-secondary); font-size: 0.85rem; margin: 0.75rem 0 0 1.5rem; padding: 0;">
                        <li>Remonter vos projets vers Mon Espace Collectivité</li>
                        <li>Identifier les aides Fonds Vert éligibles</li>
                        <li>Faciliter les demandes de financement CRTE</li>
                    </ul>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button onclick="this.closest('.modal-overlay').remove()" style="flex: 1; padding: 0.75rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-family: inherit; cursor: pointer;">
                        Plus tard
                    </button>
                    <button onclick="performANCTSync(); this.closest('.modal-overlay').remove();" style="flex: 1; padding: 0.75rem; background: var(--gradient-gold); border: none; border-radius: 10px; color: #0d1b2a; font-family: inherit; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <i class="fas fa-sync-alt"></i> Synchroniser
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    function performANCTSync() {
        // Simuler une synchronisation
        showNotification('Synchronisation ANCT en cours...', 'info');

        setTimeout(() => {
            showNotification('Synchronisation réussie ! 3 projets remontés vers Mon Espace Collectivité', 'success');
        }, 2000);
    }

    // Notification helper
    function showNotification(message, type) {
        const colors = {
            success: { bg: 'rgba(45, 106, 79, 0.95)', icon: 'check-circle' },
            error: { bg: 'rgba(153, 27, 27, 0.95)', icon: 'times-circle' },
            info: { bg: 'rgba(30, 58, 95, 0.95)', icon: 'info-circle' },
            warning: { bg: 'rgba(180, 83, 9, 0.95)', icon: 'exclamation-triangle' }
        };

        const config = colors[type] || colors.info;

        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: ${config.bg};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10001;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
        `;

        notif.innerHTML = `
            <i class="fas fa-${config.icon}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // Ajouter les animations
    const notifStyles = document.createElement('style');
    notifStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notifStyles);



    // ========================
    // BAILLEURS & FINANCEMENTS
    // ========================

    const bailleursData = {
        'anct': {
            name: 'ANCT',
            fullName: 'Agence Nationale de la Cohésion des Territoires',
            url: 'https://monespacecollectivite.anct.gouv.fr',
            aides: ['Fonds Vert', 'CRTE', 'DSIL', 'DETR', 'Action Cœur de Ville', 'Petites Villes de Demain']
        },
        'banque-territoires': {
            name: 'Banque des Territoires',
            fullName: 'Caisse des Dépôts - Banque des Territoires',
            url: 'https://www.banquedesterritoires.fr',
            aides: ['Prêts Gaïa', 'Intracting', 'Aqua Prêt', 'Prêts verts']
        },
        'ademe': {
            name: 'ADEME',
            fullName: 'Agence de la Transition Écologique',
            url: 'https://agirpourlatransition.ademe.fr',
            aides: ['Fonds Chaleur', 'Fonds Économie Circulaire', 'CEE', 'Études préalables']
        },
        'afd': {
            name: 'AFD',
            fullName: 'Agence Française de Développement',
            url: 'https://www.afd.fr',
            aides: ['Prêts bonifiés climat', 'Facilité ARIZ', 'Programmes biodiversité']
        },
        'bei': {
            name: 'BEI',
            fullName: 'Banque Européenne d\'Investissement',
            url: 'https://www.eib.org/fr',
            aides: ['Prêts long terme', 'InvestEU', 'ELENA', 'Facilité rénovation']
        },
        'europe': {
            name: 'Fonds Européens',
            fullName: 'Fonds Structurels et d\'Investissement Européens',
            url: 'https://www.europe-en-france.gouv.fr',
            aides: ['FEDER', 'FSE+', 'FEADER', 'React-EU', 'Just Transition Fund']
        }
    };

    function openBailleurDetail(bailleurId) {
        const bailleur = bailleursData[bailleurId];
        if (!bailleur) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 10000;';

        modal.innerHTML = `
            <div style="background: var(--bg-card); border-radius: 20px; padding: 2rem; max-width: 600px; width: 90%; border: 1px solid var(--border); max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="width: 60px; height: 60px; background: var(--gradient-gold); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-university" style="color: #0d1b2a; font-size: 1.5rem;"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; color: var(--text-primary);">${bailleur.name}</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">${bailleur.fullName}</p>
                    </div>
                </div>

                <h4 style="color: var(--text-primary); margin-bottom: 0.75rem;">Programmes d'aides disponibles</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                    ${bailleur.aides.map(aide => `<span style="background: var(--bg-elevated); border: 1px solid var(--border); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; color: var(--text-secondary);">${aide}</span>`).join('')}
                </div>

                <div style="background: var(--bg-elevated); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;">
                    <h5 style="color: var(--text-primary); margin: 0 0 0.5rem 0;">Actions possibles depuis ColConnect</h5>
                    <ul style="margin: 0; padding-left: 1.5rem; color: var(--text-secondary); font-size: 0.9rem;">
                        <li>Vérifier l'éligibilité de vos projets</li>
                        <li>Préparer les dossiers de demande</li>
                        <li>Exporter les données au format requis</li>
                        <li>Suivre l'avancement des demandes</li>
                    </ul>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button onclick="this.closest('.modal-overlay').remove()" style="flex: 1; padding: 0.75rem; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 10px; color: var(--text-primary); font-family: inherit; cursor: pointer;">
                        Fermer
                    </button>
                    <button onclick="window.open('${bailleur.url}', '_blank')" style="flex: 1; padding: 0.75rem; background: var(--gradient-gold); border: none; border-radius: 10px; color: #0d1b2a; font-family: inherit; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <i class="fas fa-external-link-alt"></i> Accéder au portail
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }

    function openBailleurPortal(bailleurId) {
        const bailleur = bailleursData[bailleurId];
        if (bailleur && bailleur.url) {
            window.open(bailleur.url, '_blank');
        }
    }

    function openAidesTerritoires() {
        window.open('https://aides-territoires.beta.gouv.fr/', '_blank');
    }

    function exportDemandesFinancement() {
        const demandesData = {
            collectivite: currentUserCollectivite,
            date_export: new Date().toISOString(),
            demandes_en_cours: [
                { bailleur: 'ANCT', programme: 'Fonds Vert', projet: 'Rénovation énergétique Hôtel de Ville', montant_demande: 450000, statut: 'Instruction' },
                { bailleur: 'ANCT', programme: 'CRTE', projet: 'Piste cyclable Part-Dieu', montant_demande: 280000, statut: 'Déposé' },
                { bailleur: 'Banque des Territoires', programme: 'Prêt Gaïa', projet: 'Complexe sportif', montant_demande: 1200000, statut: 'Accord de principe' },
                { bailleur: 'Fonds Européens', programme: 'FEDER', projet: 'Médiathèque numérique', montant_demande: 380000, statut: 'En attente' }
            ],
            potentiel_total: 10220000,
            aides_eligibles: 23
        };

        const blob = new Blob([JSON.stringify(demandesData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'demandes_financement_' + new Date().toISOString().split('T')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);

        showNotification('Export des demandes de financement généré !', 'success');
    }


        // ========================
        // MODE FINANCEUR - Toggle
        // ========================
        function setDetailView(mode) {
            const btnC = document.getElementById('btnDetailCollectivite');
            const btnF = document.getElementById('btnDetailFinanceur');
            const viewC = document.getElementById('detailCollectiviteView');
            const viewF = document.getElementById('detailFinanceurView');

            if (!btnC || !btnF || !viewC || !viewF) return;

            const isFinanceur = (mode === 'financeur');

            btnC.classList.toggle('active', !isFinanceur);
            btnF.classList.toggle('active', isFinanceur);
            viewC.classList.toggle('active', !isFinanceur);
            viewF.classList.toggle('active', isFinanceur);
            
            // Réappliquer les règles de visibilité si un projet est ouvert
            if (window.__currentProjet && typeof applyProjetVisibilityRules === 'function') {
                setTimeout(() => {
                    applyProjetVisibilityRules(window.__currentProjet);
                }, 50);
            }

            document.body.classList.toggle('financeur-mode', isFinanceur);

            // Sync title
            if (isFinanceur) {
                const title = document.getElementById('detailTitle');
                const financeurTitle = document.getElementById('financeurProjectTitle');
                if (title && financeurTitle) financeurTitle.textContent = title.textContent;
            }

            // Recalcul carte Leaflet si retour en mode collectivité
            if (!isFinanceur) {
                try { setTimeout(() => { if (typeof initMap === 'function') initMap(); }, 150); } catch(e) {}
            }
        }

        function initDetailViewModeToggle() {
            const btnC = document.getElementById('btnDetailCollectivite');
            const btnF = document.getElementById('btnDetailFinanceur');
            if (!btnC || !btnF) return;
            if (btnC._ccDetailToggleInit) return;
            btnC._ccDetailToggleInit = true;

            btnC.addEventListener('click', () => setDetailView('collectivite'));
            btnF.addEventListener('click', () => setDetailView('financeur'));
        }

        // Override navigateTo : reset mode financeur, fermer l'overlay workspace, éviter l'empiètement
        const __originalNavigateTo = navigateTo;
        navigateTo = function(sectionId) {
            __originalNavigateTo(sectionId);

            /* Reset mode détail + retirer body.financeur-mode (évite empiètement des styles financeur sur collectivité, etc.) */
            setDetailView('collectivite');
            if (sectionId === 'detail') { initDetailViewModeToggle(); }

            /* Fermer l'overlay workspace financeur (Ctrl+K / FAB) pour qu'il ne reste pas par-dessus les autres onglets */
            var ov = document.getElementById('financeurWorkspaceOverlay');
            if (ov && ov.classList.contains('active')) {
                ov.classList.remove('active');
                ov.setAttribute('aria-hidden', 'true');
            }
        };

        // Init au chargement
        document.addEventListener('DOMContentLoaded', () => {
            initDetailViewModeToggle();
        });


    
        // ========================
        // MODULE FINANCE CLIMAT
        // ========================
        const climatData = {
            'Nouveau groupe scolaire Confluence': {
                typeFinancement: 'Fonds Vert + FEDER',
                natureAction: 'Atténuation - Bâtiment neuf E+C-',
                statut: 'accorde',
                statutLabel: 'Accordé',
                montant: '1 200 000 €',
                co2: '850',
                mwh: '2 400',
                water: '15 000',
                taxonomie: 'Atténuation - Bâtiment',
                odd: 'ODD 7, 11, 13',
                secteur: 'Bâtiment tertiaire',
                methodeImpact: 'Estimée',
                source: 'Convention FV-2024-0847',
                derniereMaj: '18/09/2024',
                timeline: [
                    { date: '15/03/2024', event: 'Dépôt dossier Fonds Vert', done: true },
                    { date: '02/06/2024', event: 'Pré-accord obtenu', done: true },
                    { date: '18/09/2024', event: 'Convention signée', done: true },
                    { date: 'Q1 2025', event: 'Premier versement attendu', done: false }
                ]
            },
            'Création piste cyclable Part-Dieu': {
                typeFinancement: 'Fonds Mobilités Actives',
                natureAction: 'Mobilité durable - Vélo',
                statut: 'execution',
                statutLabel: 'En exécution',
                montant: '540 000 €',
                co2: '320',
                mwh: '-',
                water: '-',
                taxonomie: 'Atténuation - Mobilité',
                odd: 'ODD 11, 13',
                secteur: 'Transport',
                methodeImpact: 'Estimée',
                source: 'Convention FMA-2024-0123',
                derniereMaj: '15/04/2024',
                timeline: [
                    { date: '01/02/2024', event: 'Dépôt Appel à Projets', done: true },
                    { date: '15/04/2024', event: 'Lauréat Fonds Mobilités', done: true },
                    { date: '01/09/2024', event: 'Démarrage travaux', done: true },
                    { date: 'Sept 2025', event: 'Livraison finale', done: false }
                ]
            },
            'Rénovation du Parc de la Tête d\'Or': {
                typeFinancement: 'Fonds Territorial Climat',
                natureAction: 'Adaptation - Espaces verts',
                statut: 'pre-accord',
                statutLabel: 'Pré-accord',
                montant: '3 500 000 €',
                co2: '120',
                mwh: '180',
                water: '85 000',
                taxonomie: 'Adaptation - Espaces verts',
                odd: 'ODD 13, 15',
                secteur: 'Adaptation',
                methodeImpact: 'Estimée',
                source: 'Dossier FTC-2024-0456',
                derniereMaj: '15/10/2024',
                timeline: [
                    { date: '10/06/2024', event: 'Étude de faisabilité climat', done: true },
                    { date: '15/10/2024', event: 'Dossier FTC déposé', done: true },
                    { date: 'Fév 2025', event: 'Décision comité', done: false }
                ]
            },
            'Modernisation éclairage public': {
                typeFinancement: 'CEE + Fonds Vert',
                natureAction: 'Efficacité énergétique',
                statut: 'cloture',
                statutLabel: 'Clôturé',
                montant: '980 000 €',
                co2: '1 450',
                mwh: '3 800',
                water: '-',
                taxonomie: 'Atténuation - Efficacité énergétique',
                odd: 'ODD 7, 11',
                secteur: 'Énergie',
                methodeImpact: 'Mesurée',
                source: 'Convention CEE-2023-0789',
                derniereMaj: '15/01/2025',
                timeline: [
                    { date: '01/03/2023', event: 'Demande CEE déposée', done: true },
                    { date: '15/05/2023', event: 'CEE accordés', done: true },
                    { date: '01/12/2024', event: 'Travaux terminés', done: true },
                    { date: '15/01/2025', event: 'Clôture administrative', done: true }
                ]
            },
            'Extension médiathèque Vaise': {
                typeFinancement: 'En prospection',
                natureAction: 'Rénovation énergétique - ERP',
                statut: 'prospection',
                statutLabel: 'En prospection',
                montant: 'À définir',
                co2: '280',
                mwh: '650',
                water: '2 000',
                taxonomie: 'Atténuation - Bâtiment',
                odd: 'ODD 7, 11',
                secteur: 'Bâtiment tertiaire',
                methodeImpact: 'Estimée',
                source: 'Étude en cours',
                derniereMaj: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                timeline: [
                    { date: 'Q1 2025', event: 'Étude opportunités financement', done: false },
                    { date: 'Q2 2025', event: 'Choix dispositif cible', done: false }
                ]
            },
            'Réhabilitation place Bellecour': {
                typeFinancement: 'FEDER + Région',
                natureAction: 'Adaptation - Îlot de fraîcheur',
                statut: 'cloture',
                statutLabel: 'Clôturé',
                montant: '2 100 000 €',
                co2: '95',
                mwh: '120',
                water: '45 000',
                taxonomie: 'Adaptation - Espaces publics',
                odd: 'ODD 11, 13',
                secteur: 'Adaptation',
                methodeImpact: 'Mesurée',
                source: 'Convention FEDER-2022-0345',
                derniereMaj: '15/12/2024',
                timeline: [
                    { date: '01/01/2022', event: 'Projet labellisé Climat', done: true },
                    { date: '15/06/2022', event: 'FEDER accordé', done: true },
                    { date: '01/11/2024', event: 'Réception travaux', done: true },
                    { date: '15/12/2024', event: 'Clôture financière', done: true }
                ]
            },
            // Alias pour compatibilité avec les noms utilisés ailleurs
            'Groupe scolaire Confluence': {
                typeFinancement: 'Fonds Vert + FEDER',
                natureAction: 'Atténuation - Bâtiment neuf E+C-',
                statut: 'accorde',
                statutLabel: 'Accordé',
                montant: '1 200 000 €',
                co2: '850',
                mwh: '2 400',
                water: '15 000',
                taxonomie: 'Atténuation - Bâtiment',
                odd: 'ODD 7, 11, 13',
                secteur: 'Bâtiment tertiaire',
                methodeImpact: 'Estimée',
                source: 'Convention FV-2024-0847',
                derniereMaj: '18/09/2024',
                timeline: [
                    { date: '15/03/2024', event: 'Dépôt dossier Fonds Vert', done: true },
                    { date: '02/06/2024', event: 'Pré-accord obtenu', done: true },
                    { date: '18/09/2024', event: 'Convention signée', done: true },
                    { date: 'Q1 2025', event: 'Premier versement attendu', done: false }
                ]
            },
            'Piste cyclable Part-Dieu': {
                typeFinancement: 'Fonds Mobilités Actives',
                natureAction: 'Mobilité durable - Vélo',
                statut: 'execution',
                statutLabel: 'En exécution',
                montant: '540 000 €',
                co2: '320',
                mwh: '-',
                water: '-',
                taxonomie: 'Atténuation - Mobilité',
                odd: 'ODD 11, 13',
                secteur: 'Transport',
                methodeImpact: 'Estimée',
                source: 'Convention FMA-2024-0123',
                derniereMaj: '15/04/2024',
                timeline: [
                    { date: '01/02/2024', event: 'Dépôt Appel à Projets', done: true },
                    { date: '15/04/2024', event: 'Lauréat Fonds Mobilités', done: true },
                    { date: '01/09/2024', event: 'Démarrage travaux', done: true },
                    { date: 'Sept 2025', event: 'Livraison finale', done: false }
                ]
            }
        };

        function updateClimatWidget(projetTitle) {
            const data = climatData[projetTitle] || {
                typeFinancement: 'Non renseigné',
                natureAction: 'Non renseigné',
                statut: 'prospection',
                statutLabel: 'Non renseigné',
                montant: '-',
                co2: '-',
                mwh: '-',
                water: '-',
                timeline: [],
                taxonomie: 'Atténuation - Bâtiment',
                odd: 'ODD 7, 11, 13',
                secteur: 'Bâtiment tertiaire'
            };

            // Mise à jour des champs principaux (IDs existants dans le HTML)
            const taxoEl = document.getElementById('climatTaxonomie');
            const oddEl = document.getElementById('climatODD');
            const secteurEl = document.getElementById('climatSecteur');
            const tco2El = document.getElementById('climatTCO2');
            const mwhEl = document.getElementById('climatMWh');

            if (taxoEl) taxoEl.textContent = data.taxonomie || data.natureAction || 'Non renseigné';
            if (oddEl) oddEl.textContent = data.odd || 'Non renseigné';
            if (secteurEl) secteurEl.textContent = data.secteur || 'Non renseigné';
            if (tco2El) tco2El.textContent = data.co2 || '-';
            if (mwhEl) mwhEl.textContent = data.mwh || '-';

            // Mise à jour des sources de financement
            const sourcesList = document.getElementById('climatSourcesList');
            if (sourcesList && data.typeFinancement) {
                // Parse le type de financement (peut contenir plusieurs sources séparées par +)
                const sources = data.typeFinancement.split('+').map(s => s.trim());
                const montantTotal = data.montant || 'N/A';
                const montantParSource = sources.length > 1 ? 
                    (typeof montantTotal === 'string' && montantTotal.includes('€') ? 
                        (parseFloat(montantTotal.replace(/[^\d]/g, '')) / sources.length).toLocaleString('fr-FR') + ' €' : 
                        montantTotal) : 
                    montantTotal;

                sourcesList.innerHTML = sources.map(source => 
                    '<li><span class="source-name">' + source + '</span><span class="source-amount">' + montantParSource + '</span></li>'
                ).join('');
            }

            // Mise à jour des anciens champs (si ils existent)
            const typeEl = document.getElementById('climatTypeFinancement');
            const natureEl = document.getElementById('climatNatureAction');
            const statutBadgeEl = document.getElementById('climatStatutBadge');
            const montantEl = document.getElementById('climatMontant');
            const co2El = document.getElementById('climatCO2');
            const waterEl = document.getElementById('climatWater');
            const timelineEl = document.getElementById('climatTimeline');

            if (typeEl) typeEl.textContent = data.typeFinancement;
            if (natureEl) natureEl.textContent = data.natureAction;
            if (montantEl) montantEl.textContent = data.montant;
            if (co2El) co2El.textContent = data.co2;
            if (waterEl) waterEl.textContent = data.water;

            if (statutBadgeEl) {
                statutBadgeEl.className = 'climat-status-badge ' + data.statut;
                const icons = {
                    'prospection': 'fa-search',
                    'pre-accord': 'fa-hourglass-half',
                    'accorde': 'fa-check-circle',
                    'execution': 'fa-play-circle',
                    'cloture': 'fa-flag-checkered'
                };
                statutBadgeEl.innerHTML = '<i class="fas ' + (icons[data.statut] || 'fa-question-circle') + '"></i> ' + data.statutLabel;
            }

            if (timelineEl && data.timeline) {
                timelineEl.innerHTML = data.timeline.map(t => `
                    <div class="climat-timeline-event">
                        <span class="date">${t.date}</span>
                        <span class="event ${t.done ? 'done' : ''}">${t.done ? '<i class="fas fa-check"></i> ' : ''}${t.event}</span>
                    </div>
                `).join('');
            }

            // Mise à jour du bloc audit complet
            updateClimatAuditBlock(data);
            // Données MRV sauvegardées (modal) — priorité sur climatData
            var p = window.__currentProjet;
            if (p && p.id && typeof updateClimatFromSaved === 'function') updateClimatFromSaved(p.id);
        }

        // ========================
        // MODAL IMPACT CLIMAT (MRV)
        // ========================
        var CLIMAT_MRV_STORAGE_KEY = 'cc_climat_mrv';
        window.__climatByProjectId = window.__climatByProjectId || {};
        window.__activeProjectIdForClimat = null;

        (function loadClimatFromStorage() {
            try {
                var raw = localStorage.getItem(CLIMAT_MRV_STORAGE_KEY);
                if (raw) {
                    var parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === 'object') window.__climatByProjectId = parsed;
                }
            } catch (e) {}
            if (typeof seedClimatMRVExamples === 'function') seedClimatMRVExamples();
        })();

        function seedClimatMRVExamples() {
            var store = window.__climatByProjectId || {};
            var taxonomieLabels = { attenuation_batiment: 'Atténuation - Bâtiment', adaptation: 'Adaptation', mobilite: 'Mobilité', energie: 'Énergie', autre: 'Autre' };
            var secteurLabels = { batiment_tertiaire: 'Bâtiment tertiaire', batiment_residentiel: 'Bâtiment résidentiel', transport: 'Transport', industrie: 'Industrie', autre: 'Autre' };

            var examples = [
                { id: 1, collectiviteId: 'lyon', convRef: 'LY-2024-0847', prefix: 'Lyon', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 420000, reference: 'FV-69-2024-012', date: '2024-03-15' },
                    { financeur: 'Métropole de Lyon', type: 'Subvention', montant_eur: 180000, reference: 'ML-2024-089', date: '2024-04-01' }
                ], mwh: 1850, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11'], statut: 'valide_collectivite', commentaire: 'Économies issues d\'audit énergétique groupe scolaire.' },
                { id: 2, collectiviteId: 'lyon', convRef: 'LY-2024-0912', prefix: 'Lyon', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 280000, reference: 'FV-69-2024-018', date: '2024-05-20' },
                    { financeur: 'DRAC Auvergne-Rhône-Alpes', type: 'Subvention', montant_eur: 95000, reference: 'DRAC-ARA-2024-042', date: '2024-06-01' }
                ], mwh: 1200, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11','13'], statut: 'brouillon', commentaire: 'Hôtel de Ville – rénovation patrimoniale et énergétique.' },
                { id: 3, collectiviteId: 'lyon', convRef: 'LY-2024-1025', prefix: 'Lyon', financeurs: [
                    { financeur: 'Fonds Mobilités Actives', type: 'Subvention', montant_eur: 450000, reference: 'FMA-2024-069', date: '2024-02-10' }
                ], mwh: 80, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'audit_ready', commentaire: 'Piste cyclable Part-Dieu – report modal voiture vers vélo.' },
                { id: 7, collectiviteId: 'paris', convRef: 'PA-2024-0912', prefix: 'Paris', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 850000, reference: 'FV-75-2024-025', date: '2024-04-15' },
                    { financeur: 'Région Île-de-France', type: 'Subvention', montant_eur: 320000, reference: 'IDF-2024-078', date: '2024-05-01' }
                ], mwh: 2400, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11'], statut: 'valide_collectivite', commentaire: 'Palais de Tokyo – rénovation énergétique équipement culturel.' },
                { id: 8, collectiviteId: 'paris', convRef: 'PA-2024-1028', prefix: 'Paris', financeurs: [
                    { financeur: 'CEE', type: 'CEE', montant_eur: 520000, reference: 'CEE-75-2024-112', date: '2024-06-20' },
                    { financeur: 'Ville de Paris', type: 'Subvention', montant_eur: 180000, reference: 'VP-2024-045', date: '2024-07-01' }
                ], mwh: 3100, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11','13'], statut: 'brouillon', commentaire: 'Piscine olympique 13ème – performance énergétique piscine.' },
                { id: 13, collectiviteId: 'marseille', convRef: 'MA-2024-0523', prefix: 'Marseille', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 1200000, reference: 'FV-13-2024-031', date: '2024-03-01' },
                    { financeur: 'Département BDR', type: 'Subvention', montant_eur: 280000, reference: 'BDR-2024-089', date: '2024-04-10' }
                ], mwh: 4200, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11'], statut: 'audit_ready', commentaire: 'Réhabilitation Vieux-Port – bâti existant et maîtrise énergétique.' },
                { id: 19, collectiviteId: 'bordeaux', convRef: 'BO-2024-0618', prefix: 'Bordeaux', financeurs: [
                    { financeur: 'État – Plan Relance', type: 'Subvention', montant_eur: 450000, reference: 'REL-33-2024-015', date: '2023-11-20' },
                    { financeur: 'Métropole de Bordeaux', type: 'Subvention', montant_eur: 320000, reference: 'BXM-2024-052', date: '2024-01-15' }
                ], mwh: 0, fe: 0.20, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'valide_collectivite', commentaire: 'Pont Simone Veil – impact indirect mobilités douces.' },
                { id: 25, collectiviteId: 'nantes', convRef: 'NA-2024-0734', prefix: 'Nantes', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 1850000, reference: 'FV-44-2024-048', date: '2024-05-05' },
                    { financeur: 'Nantes Métropole', type: 'Subvention', montant_eur: 420000, reference: 'NM-2024-091', date: '2024-06-01' }
                ], mwh: 5800, fe: 0.10, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11','13'], statut: 'brouillon', commentaire: 'Île de Nantes phase 3 – écoquartier mixte.' },
                { id: 31, collectiviteId: 'toulouse', convRef: 'TO-2024-0812', prefix: 'Toulouse', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 2800000, reference: 'FV-31-2024-062', date: '2024-04-22' },
                    { financeur: 'Tisséo', type: 'Subvention', montant_eur: 650000, reference: 'TIS-2024-033', date: '2024-05-10' }
                ], mwh: 12000, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'valide_collectivite', commentaire: 'Ligne métro T3 – report modal véhicule individuel.' },
                { id: 37, collectiviteId: 'nice', convRef: 'NI-2024-0925', prefix: 'Nice', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 1200000, reference: 'FV-06-2024-028', date: '2024-03-18' },
                    { financeur: 'Métropole Nice Côte d\'Azur', type: 'Subvention', montant_eur: 480000, reference: 'MNCA-2024-071', date: '2024-04-15' }
                ], mwh: 3500, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['7','11','13'], statut: 'audit_ready', commentaire: 'Tramway ligne 3 – maîtrise énergétique transport en commun.' },
                { id: 43, collectiviteId: 'strasbourg', convRef: 'ST-2024-0415', prefix: 'Strasbourg', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 380000, reference: 'FV-67-2024-019', date: '2024-05-12' },
                    { financeur: 'Région Grand Est', type: 'Subvention', montant_eur: 240000, reference: 'GE-2024-055', date: '2024-06-01' }
                ], mwh: 950, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11','13'], statut: 'brouillon', commentaire: 'Palais Rohan – rénovation patrimoniale et énergie.' },
                { id: 49, collectiviteId: 'montpellier', convRef: 'MO-2024-0622', prefix: 'Montpellier', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 2100000, reference: 'FV-34-2024-041', date: '2024-04-08' },
                    { financeur: 'ARS Occitanie', type: 'Subvention', montant_eur: 580000, reference: 'ARS-OC-2024-032', date: '2024-05-20' }
                ], mwh: 7200, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','13'], statut: 'valide_collectivite', commentaire: 'Hôpital Arnaud de Villeneuve – performance énergétique bâtiment santé.' },
                { id: 55, collectiviteId: 'lille', convRef: 'LI-2024-0518', prefix: 'Lille', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 1850000, reference: 'FV-59-2024-027', date: '2024-03-25' },
                    { financeur: 'Métropole Lilloise', type: 'Subvention', montant_eur: 620000, reference: 'MEL-2024-064', date: '2024-04-12' }
                ], mwh: 4500, fe: 0.20, type_action: 'attenuation_batiment', secteur: 'batiment_tertiaire', odd: ['7','11','13'], statut: 'brouillon', commentaire: 'Euralille 3000 – écoquartier tertiaire.' },
                { id: 61, collectiviteId: 'rennes', convRef: 'RE-2024-0712', prefix: 'Rennes', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 980000, reference: 'FV-35-2024-038', date: '2024-05-02' },
                    { financeur: 'Région Bretagne', type: 'Subvention', montant_eur: 420000, reference: 'BRET-2024-051', date: '2024-06-01' }
                ], mwh: 2800, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'audit_ready', commentaire: 'Ligne métro B extension – report modal.' },
                { id: 67, collectiviteId: 'grenoble', convRef: 'GR-2024-0834', prefix: 'Grenoble', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 720000, reference: 'FV-38-2024-022', date: '2024-04-18' },
                    { financeur: 'Métropole Grenoble-Alpes', type: 'Subvention', montant_eur: 380000, reference: 'MGA-2024-047', date: '2024-05-10' }
                ], mwh: 1800, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['7','11','13'], statut: 'valide_collectivite', commentaire: 'Téléphérique urbain – mobilité décarbonée.' },
                { id: 73, collectiviteId: 'dijon', convRef: 'DI-2024-0428', prefix: 'Dijon', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 680000, reference: 'FV-21-2024-029', date: '2024-05-08' },
                    { financeur: 'Dijon Métropole', type: 'Subvention', montant_eur: 320000, reference: 'DJM-2024-056', date: '2024-06-01' }
                ], mwh: 2100, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'brouillon', commentaire: 'Tramway ligne T2 – report modal.' },
                { id: 79, collectiviteId: 'angers', convRef: 'AN-2024-0531', prefix: 'Angers', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 850000, reference: 'FV-49-2024-035', date: '2024-04-28' },
                    { financeur: 'Angers Loire Métropole', type: 'Subvention', montant_eur: 350000, reference: 'ALM-2024-069', date: '2024-05-15' }
                ], mwh: 2500, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['7','11','13'], statut: 'valide_collectivite', commentaire: 'Ligne B tramway – mobilité durable.' },
                { id: 91, collectiviteId: 'rhone', convRef: 'RH-2024-1022', prefix: 'Rhône', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 4200000, reference: 'FV-69-2024-088', date: '2024-02-20' },
                    { financeur: 'Département du Rhône', type: 'Subvention', montant_eur: 1850000, reference: 'DR-69-2024-041', date: '2024-03-15' }
                ], mwh: 8500, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['11','13'], statut: 'audit_ready', commentaire: 'Contournement Est Lyon – réduction trafic poids lourds.' },
                { id: 109, collectiviteId: 'aura', convRef: 'AURA-2024-0134', prefix: 'AURA', financeurs: [
                    { financeur: 'Fonds Vert', type: 'Subvention', montant_eur: 12500000, reference: 'FV-ARA-2024-112', date: '2024-01-10' },
                    { financeur: 'Région AURA', type: 'Subvention', montant_eur: 8500000, reference: 'AURA-2024-078', date: '2024-02-01' }
                ], mwh: 45000, fe: 0.10, type_action: 'mobilite', secteur: 'transport', odd: ['7','11','13'], statut: 'valide_collectivite', commentaire: 'TER nouvelle génération – mobilité régionale décarbonée.' }
            ];

            examples.forEach(function(ex) {
                var key = String(ex.id);
                if (store[key]) return;
                var mwh = ex.mwh || 0;
                var fe = ex.fe || 0.20;
                var tco2_an = (mwh > 0 && fe > 0) ? mwh * fe : null;
                var taxo = taxonomieLabels[ex.type_action] || ex.type_action;
                var secLab = secteurLabels[ex.secteur] || ex.secteur;
                var total = (ex.financeurs || []).reduce(function(s, f) { return s + (isFinite(f.montant_eur) ? f.montant_eur : 0); }, 0);
                store[key] = {
                    type_action: ex.type_action,
                    secteur: ex.secteur,
                    mwh_an: mwh > 0 ? mwh : null,
                    fe: fe,
                    fe_is_custom: false,
                    fe_source: 'ADEME / SNBC',
                    tco2_an: tco2_an,
                    methode: 'estimee',
                    commentaire: ex.commentaire || '',
                    odd: ex.odd || [],
                    statut: ex.statut || 'brouillon',
                    convention_type: 'convention_attributive',
                    convention_ref: ex.convRef || '',
                    engagement: true,
                    financements: ex.financeurs || [],
                    taxonomie: taxo,
                    secteurLabel: secLab,
                    typeFinancement: (ex.financeurs || []).map(function(f) { return f.financeur || f.type; }).filter(Boolean).join(' + ') || 'Non renseigné',
                    montant: total
                };
            });
        }

        function saveClimatToStorage() {
            try {
                localStorage.setItem(CLIMAT_MRV_STORAGE_KEY, JSON.stringify(window.__climatByProjectId || {}));
            } catch (e) {}
        }

        function openClimatModalFromCurrent() {
            var p = window.__currentProjet;
            if (!p || !p.id) { if (typeof showToast === 'function') showToast('Aucun projet sélectionné'); return; }
            openClimatModal(p.id);
        }

        function openClimatModal(projectId) {
            window.__activeProjectIdForClimat = projectId;
            var overlay = document.getElementById('climatModalOverlay');
            if (!overlay) return;

            var saved = window.__climatByProjectId[String(projectId)] || null;

            var typeAction = document.getElementById('climat_type_action');
            var secteur = document.getElementById('climat_secteur');
            var mwhAn = document.getElementById('climat_mwh_an');
            var fe = document.getElementById('climat_fe');
            var feCustom = document.getElementById('climat_fe_custom');
            var feSource = document.getElementById('climat_fe_source');
            var methode = document.getElementById('climat_methode');
            var commentaire = document.getElementById('climat_commentaire');

            if (typeAction) typeAction.value = saved && saved.type_action ? saved.type_action : 'attenuation_batiment';
            if (secteur) secteur.value = saved && saved.secteur ? saved.secteur : 'batiment_tertiaire';
            if (mwhAn) mwhAn.value = saved && saved.mwh_an != null ? saved.mwh_an : '';
            if (fe) fe.value = saved && saved.fe_is_custom ? 'custom' : String(saved && saved.fe != null ? saved.fe : 0.20);
            if (feCustom) {
                feCustom.style.display = (saved && saved.fe_is_custom) ? '' : 'none';
                feCustom.value = saved && saved.fe_is_custom ? (saved.fe ?? '') : '';
            }
            if (feSource) feSource.value = saved && saved.fe_source ? saved.fe_source : '';
            if (methode) methode.value = saved && saved.methode ? saved.methode : 'estimee';
            if (commentaire) commentaire.value = saved && saved.commentaire ? saved.commentaire : '';

            var oddEl = document.getElementById('climat_odd');
            if (oddEl && saved && Array.isArray(saved.odd)) {
                Array.prototype.forEach.call(oddEl.options, function(opt) {
                    opt.selected = saved.odd.indexOf(opt.value) !== -1;
                });
            } else if (oddEl) { Array.prototype.forEach.call(oddEl.options, function(opt) { opt.selected = false; }); }
            var statutEl = document.getElementById('climat_statut');
            if (statutEl) statutEl.value = saved && saved.statut ? saved.statut : '';
            var convTypeEl = document.getElementById('climat_convention_type');
            if (convTypeEl) convTypeEl.value = saved && saved.convention_type ? saved.convention_type : '';
            var convRefEl = document.getElementById('climat_convention_ref');
            if (convRefEl) convRefEl.value = saved && saved.convention_ref ? saved.convention_ref : '';
            var engagEl = document.getElementById('climat_engagement');
            if (engagEl) engagEl.checked = !!(saved && saved.engagement);

            var rows = saved && Array.isArray(saved.financements) ? saved.financements : [];
            renderClimatFinanceRows(rows);
            wireClimatFESelect();
            recalcClimat();
            if (typeof bindMRVChecklistAutoUpdate === 'function') bindMRVChecklistAutoUpdate();
            overlay.classList.add('open');
        }

        function closeClimatModal() {
            var overlay = document.getElementById('climatModalOverlay');
            if (overlay) overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        function wireClimatFESelect() {
            var feSel = document.getElementById('climat_fe');
            var feCustom = document.getElementById('climat_fe_custom');
            if (!feSel || !feCustom) return;
            feSel.onchange = function() {
                feCustom.style.display = (feSel.value === 'custom') ? '' : 'none';
                recalcClimat();
            };
        }

        function getClimatFE() {
            var feSel = document.getElementById('climat_fe');
            var feCustom = document.getElementById('climat_fe_custom');
            if (!feSel) return { fe: 0.20, fe_is_custom: false };
            if (feSel.value === 'custom') {
                var v = parseFloat(feCustom && feCustom.value ? feCustom.value : '');
                return { fe: isFinite(v) ? v : 0, fe_is_custom: true };
            }
            var v = parseFloat(feSel.value);
            return { fe: isFinite(v) ? v : 0.20, fe_is_custom: false };
        }

        function recalcClimat() {
            var mwhEl = document.getElementById('climat_mwh_an');
            var mwh = mwhEl ? parseFloat(mwhEl.value || '') : NaN;
            var feVal = getClimatFE().fe;
            var out = document.getElementById('climat_tco2_an');
            if (!out) return;
            if (!isFinite(mwh) || mwh <= 0 || !isFinite(feVal) || feVal <= 0) {
                out.value = '—';
            } else {
                out.value = (mwh * feVal).toFixed(1) + ' tCO₂/an';
            }
            if (typeof updateMRVChecklistFromModal === 'function') updateMRVChecklistFromModal();
        }

        function mrvHasValue(el) {
            if (!el) return false;
            if (el.type === 'checkbox') return !!el.checked;
            if (el.multiple) return Array.prototype.slice.call(el.selectedOptions || []).length > 0;
            return String(el.value || '').trim().length > 0;
        }

        function setMRVChecklistItem(key, ok) {
            var el = document.querySelector('[data-audit-item="' + key + '"]');
            if (!el) return;
            var stat = el.querySelector('.stat');
            el.classList.toggle('is-ok', ok);
            el.classList.toggle('is-todo', !ok);
            if (stat) {
                stat.textContent = ok ? 'OK' : 'À compléter';
                stat.className = 'stat ' + (ok ? 'ok' : 'pending');
            }
        }

        function updateMRVChecklistFromModal() {
            var taxo = document.getElementById('climat_type_action');
            var secteur = document.getElementById('climat_secteur');
            var mwh = document.getElementById('climat_mwh_an');
            var tco2Out = document.getElementById('climat_tco2_an');
            var odd = document.getElementById('climat_odd');
            var statut = document.getElementById('climat_statut');
            var convType = document.getElementById('climat_convention_type');
            var convRef = document.getElementById('climat_convention_ref');
            var engagement = document.getElementById('climat_engagement');
            var totalEl = document.getElementById('climat_finance_total');
            var totalTxt = totalEl ? (totalEl.textContent || totalEl.value || '').replace(/\s/g, '') : '';
            var totalNum = parseFloat(totalTxt.replace(/[^\d.,-]/g, '').replace(',', '.')) || 0;

            var okTaxonomie = mrvHasValue(taxo) && mrvHasValue(secteur);
            var okMwh = mrvHasValue(mwh);
            var tco2Val = tco2Out ? String(tco2Out.value || tco2Out.textContent || '').trim() : '';
            var okTco2 = tco2Val !== '' && tco2Val !== '—';
            var okMontants = totalNum > 0;
            var okODD = mrvHasValue(odd);
            var okStatuts = mrvHasValue(statut);
            var okConvention = mrvHasValue(convType) && mrvHasValue(convRef);
            var okEngagement = mrvHasValue(engagement);

            setMRVChecklistItem('taxonomie', okTaxonomie);
            setMRVChecklistItem('odd', okODD);
            setMRVChecklistItem('mwh', okMwh);
            setMRVChecklistItem('tco2', okTco2);
            setMRVChecklistItem('montants', okMontants);
            setMRVChecklistItem('statuts', okStatuts);
            setMRVChecklistItem('convention', okConvention);
            setMRVChecklistItem('engagement', okEngagement);
        }

        function bindMRVChecklistAutoUpdate() {
            var ids = ['climat_type_action', 'climat_secteur', 'climat_mwh_an', 'climat_fe', 'climat_fe_custom', 'climat_tco2_an', 'climat_methode', 'climat_odd', 'climat_statut', 'climat_convention_type', 'climat_convention_ref', 'climat_engagement'];
            ids.forEach(function(id) {
                var el = document.getElementById(id);
                if (!el) return;
                el.addEventListener('input', updateMRVChecklistFromModal);
                el.addEventListener('change', updateMRVChecklistFromModal);
            });
            updateMRVChecklistFromModal();
        }

        function climatEscapeHtml(s) {
            return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }

        function renderClimatFinanceRows(rows) {
            var tbody = document.getElementById('climat_finance_rows');
            if (!tbody) return;
            tbody.innerHTML = rows.map(function(r, idx) { return climatFinanceRowHTML(r, idx); }).join('');
            updateClimatFinanceTotal();
        }

        function climatFinanceRowHTML(r, idx) {
            var financeur = climatEscapeHtml(r.financeur || '');
            var typeVal = r.type || 'Subvention';
            var montant = r.montant_eur !== undefined && r.montant_eur !== '' ? r.montant_eur : '';
            var ref = climatEscapeHtml(r.reference || '');
            var date = climatEscapeHtml(r.date || '');
            var opts = ['Subvention', 'FEDER', 'CEE', 'Prêt', 'Autre'];
            var optsHtml = opts.map(function(opt) {
                return '<option value="' + opt + '"' + (typeVal === opt ? ' selected' : '') + '>' + opt + '</option>';
            }).join('');
            return '<tr data-idx="' + idx + '">' +
                '<td style="padding:.5rem;"><input class="form-input" value="' + financeur + '" placeholder="ex: Fonds Vert" oninput="onClimatFinanceEdit(' + idx + ',\'financeur\',this.value)"></td>' +
                '<td style="padding:.5rem;"><select class="form-select" onchange="onClimatFinanceEdit(' + idx + ',\'type\',this.value)">' + optsHtml + '</select></td>' +
                '<td style="padding:.5rem; text-align:right;"><input class="form-input" style="text-align:right;" type="number" min="0" step="1" value="' + montant + '" placeholder="0" oninput="onClimatFinanceEdit(' + idx + ',\'montant_eur\',this.value)"></td>' +
                '<td style="padding:.5rem;"><input class="form-input" value="' + ref + '" placeholder="ex: FV-2024-0847" oninput="onClimatFinanceEdit(' + idx + ',\'reference\',this.value)"></td>' +
                '<td style="padding:.5rem;"><input class="form-input" type="date" value="' + date + '" oninput="onClimatFinanceEdit(' + idx + ',\'date\',this.value)"></td>' +
                '<td style="padding:.5rem; text-align:center;"><button class="btn btn-secondary" type="button" onclick="removeClimatFinanceRow(' + idx + ')" title="Supprimer"><i class="fas fa-trash-alt"></i></button></td>' +
                '</tr>';
        }

        function addFinanceRow() {
            var pid = window.__activeProjectIdForClimat;
            if (pid == null) return;
            var current = readClimatFinanceRowsFromDOM();
            current.push({ financeur: '', type: 'Subvention', montant_eur: '', reference: '', date: '' });
            renderClimatFinanceRows(current);
        }

        function removeFinanceRow(idx) {
            var current = readClimatFinanceRowsFromDOM().filter(function(_, i) { return i !== idx; });
            renderClimatFinanceRows(current);
        }

        function removeClimatFinanceRow(idx) {
            removeFinanceRow(idx);
        }

        function onClimatFinanceEdit(idx, key, value) {
            var current = readClimatFinanceRowsFromDOM();
            if (!current[idx]) return;
            if (key === 'montant_eur') {
                var v = parseFloat(value);
                current[idx][key] = isFinite(v) ? v : '';
            } else {
                current[idx][key] = value;
            }
            updateClimatFinanceTotal(current);
        }

        function onFinanceEdit(idx, key, value) {
            onClimatFinanceEdit(idx, key, value);
        }

        function readClimatFinanceRowsFromDOM() {
            var tbody = document.getElementById('climat_finance_rows');
            if (!tbody) return [];
            var trs = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
            return trs.map(function(tr) {
                var inputs = tr.querySelectorAll('input, select');
                var montantVal = inputs[2] ? parseFloat(inputs[2].value || '') : NaN;
                return {
                    financeur: inputs[0] ? inputs[0].value : '',
                    type: inputs[1] ? inputs[1].value : 'Subvention',
                    montant_eur: isFinite(montantVal) ? montantVal : '',
                    reference: inputs[3] ? inputs[3].value : '',
                    date: inputs[4] ? inputs[4].value : ''
                };
            });
        }

        function readFinanceRowsFromDOM() {
            return readClimatFinanceRowsFromDOM();
        }

        function updateClimatFinanceTotal(optionalRows) {
            var rows = optionalRows || readClimatFinanceRowsFromDOM();
            var total = rows.reduce(function(sum, r) {
                return sum + (isFinite(r.montant_eur) ? r.montant_eur : 0);
            }, 0);
            var el = document.getElementById('climat_finance_total');
            if (el) el.textContent = Math.round(total).toLocaleString('fr-FR') + ' €';
            if (typeof updateMRVChecklistFromModal === 'function') updateMRVChecklistFromModal();
        }

        function updateFinanceTotal(optionalRows) {
            updateClimatFinanceTotal(optionalRows);
        }

        function saveClimat() {
            var pid = window.__activeProjectIdForClimat;
            if (pid == null) return;

            var type_action = (document.getElementById('climat_type_action') || {}).value || 'attenuation_batiment';
            var secteur = (document.getElementById('climat_secteur') || {}).value || 'batiment_tertiaire';
            var mwhVal = parseFloat((document.getElementById('climat_mwh_an') || {}).value || '');
            var mwh_an = isFinite(mwhVal) ? mwhVal : null;
            var feData = getClimatFE();
            var fe_source = (document.getElementById('climat_fe_source') || {}).value || '';
            var methode = (document.getElementById('climat_methode') || {}).value || 'estimee';
            var commentaire = (document.getElementById('climat_commentaire') || {}).value || '';
            var oddEl = document.getElementById('climat_odd');
            var odd = oddEl ? Array.prototype.slice.call(oddEl.selectedOptions || []).map(function(o) { return o.value; }) : [];
            var statut = (document.getElementById('climat_statut') || {}).value || '';
            var convention_type = (document.getElementById('climat_convention_type') || {}).value || '';
            var convention_ref = (document.getElementById('climat_convention_ref') || {}).value || '';
            var engagement = !!((document.getElementById('climat_engagement') || {}).checked);
            var financements = readClimatFinanceRowsFromDOM();
            var tco2_an = (mwh_an && feData.fe) ? (mwh_an * feData.fe) : null;

            var taxonomieLabels = { attenuation_batiment: 'Atténuation - Bâtiment', adaptation: 'Adaptation', mobilite: 'Mobilité', energie: 'Énergie', autre: 'Autre' };
            var secteurLabels = { batiment_tertiaire: 'Bâtiment tertiaire', batiment_residentiel: 'Bâtiment résidentiel', transport: 'Transport', industrie: 'Industrie', autre: 'Autre' };

            window.__climatByProjectId[String(pid)] = {
                type_action: type_action,
                secteur: secteur,
                mwh_an: mwh_an,
                fe: feData.fe,
                fe_is_custom: feData.fe_is_custom,
                fe_source: fe_source,
                tco2_an: tco2_an,
                methode: methode,
                commentaire: commentaire,
                odd: odd,
                statut: statut,
                convention_type: convention_type,
                convention_ref: convention_ref,
                engagement: engagement,
                financements: financements,
                taxonomie: taxonomieLabels[type_action] || type_action,
                secteurLabel: secteurLabels[secteur] || secteur,
                typeFinancement: financements.map(function(f) { return f.financeur || f.type; }).filter(Boolean).join(' + ') || 'Non renseigné',
                montant: financements.reduce(function(s, f) { return s + (isFinite(f.montant_eur) ? f.montant_eur : 0); }, 0)
            };

            saveClimatToStorage();
            closeClimatModal();

            if (typeof showToast === 'function') showToast('Impact climat enregistré');

            var p = window.__currentProjet;
            if (p && typeof updateClimatFromSaved === 'function') updateClimatFromSaved(p.id);
        }

        function updateClimatFromSaved(projectId) {
            var saved = window.__climatByProjectId[String(projectId)];
            if (!saved) return;
            var taxoEl = document.getElementById('climatTaxonomie');
            var secteurEl = document.getElementById('climatSecteur');
            var tco2El = document.getElementById('climatTCO2');
            var mwhEl = document.getElementById('climatMWh');
            var methodeEl = document.getElementById('climatMethodeImpact');
            var sourcesList = document.getElementById('climatSourcesList');
            if (taxoEl && saved.taxonomie) taxoEl.textContent = saved.taxonomie;
            if (secteurEl && saved.secteurLabel) secteurEl.textContent = saved.secteurLabel;
            if (tco2El) tco2El.textContent = saved.tco2_an != null ? saved.tco2_an.toFixed(0) : '—';
            if (mwhEl) mwhEl.textContent = saved.mwh_an != null ? String(saved.mwh_an) : '—';
            if (methodeEl && saved.methode) methodeEl.textContent = saved.methode === 'mesuree' ? 'Mesurée' : 'Estimée';
            if (sourcesList && Array.isArray(saved.financements) && saved.financements.length) {
                sourcesList.innerHTML = saved.financements.map(function(f) {
                    var amt = isFinite(f.montant_eur) ? f.montant_eur.toLocaleString('fr-FR') + ' €' : '—';
                    return '<li><span class="source-name">' + climatEscapeHtml(f.financeur || f.type) + '</span><span class="source-amount">' + amt + '</span></li>';
                }).join('');
            }
        }

        // ========================
        // AUDIT CLIMAT - FONCTIONS FONCTIONNELLES
        // ========================

        // ========================
        // CHECKLIST AUDIT-READY — Formulaire validable (localStorage)
        // Accessible et éditable pour tous les projets (via Admin > Validations > Ouvrir ou fiche projet)
        // ========================
        var AUDIT_CHECKLIST_ITEMS = [
            { key: 'taxonomie', label: 'Taxonomie' },
            { key: 'odd', label: 'ODD' },
            { key: 'tco2', label: 'tCO₂' },
            { key: 'mwh', label: 'MWh' },
            { key: 'montants', label: 'Montants' },
            { key: 'statuts', label: 'Statuts' },
            { key: 'engagement', label: 'Engagement' },
            { key: 'convention', label: 'Convention' },
            { key: 'jalons', label: 'Jalons' }
        ];
        var AUDIT_CHECKLIST_STORAGE_KEY = 'cc_audit_checklist';

        function loadAuditChecklistForProject(projectId) {
            try {
                var raw = localStorage.getItem(AUDIT_CHECKLIST_STORAGE_KEY);
                if (!raw) return {};
                var all = JSON.parse(raw);
                return all[String(projectId)] || {};
            } catch (e) { return {}; }
        }

        function saveAuditChecklistForProject(projectId, data) {
            try {
                var raw = localStorage.getItem(AUDIT_CHECKLIST_STORAGE_KEY);
                var all = raw ? JSON.parse(raw) : {};
                all[String(projectId)] = data;
                localStorage.setItem(AUDIT_CHECKLIST_STORAGE_KEY, JSON.stringify(all));
            } catch (e) {}
        }

        function setupAuditChecklistForm(projectId, projectStatus) {
            var wrap = document.getElementById('climatAuditChecklist');
            if (!wrap) return;

            var saved = loadAuditChecklistForProject(projectId);

            wrap.className = 'climat-audit-checklist';
            wrap.setAttribute('data-project-id', String(projectId));

            var html = '';
            AUDIT_CHECKLIST_ITEMS.forEach(function (it) {
                var ok = saved[it.key];
                var statCls = ok ? 'ok' : 'pending';
                var statText = ok ? 'OK' : 'À compléter';
                html += '<div class="climat-audit-item climat-audit-item-clickable" data-audit-item="' + it.key + '"><span class="name">' + it.label + '</span><span class="stat ' + statCls + '">' + statText + '</span></div>';
            });
            html += '<p class="climat-audit-hint"><i class="fas fa-info-circle"></i> Cliquez sur un item pour valider. Enregistrement automatique.</p>';
            wrap.innerHTML = html;

            {
                var toastDebounce = 0;
                wrap.querySelectorAll('.climat-audit-item-clickable').forEach(function (el) {
                    el.addEventListener('click', function () {
                        var key = this.getAttribute('data-audit-item');
                        var data = loadAuditChecklistForProject(projectId);
                        data[key] = !data[key];
                        saveAuditChecklistForProject(projectId, data);
                        var stat = this.querySelector('.stat');
                        if (stat) {
                            stat.className = 'stat ' + (data[key] ? 'ok' : 'pending');
                            stat.textContent = data[key] ? 'OK' : 'À compléter';
                        }
                        if (typeof showToast === 'function' && Date.now() - toastDebounce > 1500) { toastDebounce = Date.now(); showToast('Checklist enregistrée'); }
                    });
                });
            }
        }

        /**
         * Vérifie dynamiquement chaque item de la checklist audit-ready
         * @param {Object} projetData - Données du projet
         */
        function updateAuditChecklist(projetData) {
            const checklist = document.getElementById('climatAuditChecklist');
            if (!checklist) return;

            const checks = {
                taxonomie: () => {
                    const taxo = document.getElementById('climatTaxonomie');
                    return taxo && taxo.textContent.trim() !== '' && taxo.textContent !== 'Non renseigné';
                },
                odd: () => {
                    const odd = document.getElementById('climatODD');
                    return odd && odd.textContent.trim() !== '' && odd.textContent !== 'Non renseigné';
                },
                tco2: () => {
                    const tco2 = document.getElementById('climatTCO2');
                    const val = tco2 ? parseFloat(tco2.textContent.replace(/\s/g, '')) : 0;
                    return !isNaN(val) && val > 0;
                },
                mwh: () => {
                    const mwh = document.getElementById('climatMWh');
                    const val = mwh ? parseFloat(mwh.textContent.replace(/\s/g, '')) : 0;
                    return !isNaN(val) && val > 0;
                },
                montants: () => {
                    const sourcesList = document.getElementById('climatSourcesList');
                    if (!sourcesList) return false;
                    const items = sourcesList.querySelectorAll('li');
                    return items.length > 0;
                },
                statuts: () => {
                    return projetData && projetData.statut && projetData.statut !== 'prospection';
                },
                engagement: () => {
                    return projetData && projetData.montant && projetData.montant !== '-' && projetData.montant !== 'À définir';
                },
                convention: () => {
                    return projetData && projetData.timeline && projetData.timeline.some(t => 
                        t.event && (t.event.toLowerCase().includes('convention') || t.event.toLowerCase().includes('signée')) && t.done
                    );
                },
                jalons: () => {
                    return projetData && projetData.timeline && projetData.timeline.length > 0;
                }
            };

            checklist.querySelectorAll('.climat-audit-item').forEach(item => {
                const key = item.getAttribute('data-audit-item');
                const statEl = item.querySelector('.stat');
                if (!statEl) return;

                const isValid = checks[key] ? checks[key]() : false;
                statEl.className = 'stat ' + (isValid ? 'ok' : 'pending');
                statEl.textContent = isValid ? 'OK' : 'À compléter';
            });
        }

        /**
         * Met à jour les métadonnées (Méthode d'impact, Dernière mise à jour, Source)
         * @param {Object} projetData - Données du projet
         */
        function updateClimatMetadata(projetData) {
            // Méthode d'impact
            const methodeEl = document.getElementById('climatMethodeImpact');
            if (methodeEl && projetData) {
                // Détermine la méthode selon les données disponibles
                if (projetData.methodeImpact) {
                    methodeEl.textContent = projetData.methodeImpact;
                } else if (projetData.co2 && projetData.mwh && projetData.co2 !== '-' && projetData.mwh !== '-') {
                    methodeEl.textContent = 'Estimée';
                } else {
                    methodeEl.textContent = 'À renseigner';
                }
            }

            // Dernière mise à jour
            const majEl = document.getElementById('climatDerniereMaj');
            if (majEl) {
                if (projetData && projetData.derniereMaj) {
                    majEl.textContent = projetData.derniereMaj;
                } else {
                    const now = new Date();
                    majEl.textContent = now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                }
            }

            // Source
            const sourceEl = document.getElementById('climatSource');
            if (sourceEl && projetData) {
                if (projetData.source) {
                    sourceEl.textContent = projetData.source;
                } else if (projetData.timeline && projetData.timeline.length > 0) {
                    const convention = projetData.timeline.find(t => 
                        t.event && (t.event.toLowerCase().includes('convention') || t.event.toLowerCase().includes('signée'))
                    );
                    if (convention) {
                        sourceEl.textContent = convention.event + ' (' + convention.date + ')';
                    } else {
                        sourceEl.textContent = 'Données projet';
                    }
                } else {
                    sourceEl.textContent = 'Non renseigné';
                }
            }
        }

        /**
         * Export PDF réel des justificatifs audit
         */
        function exportJustificatifsClimat() {
            try {
                if (typeof window.jspdf === 'undefined') {
                    if (typeof showToast === 'function') {
                        showToast('Erreur : jsPDF non chargé. Rechargez la page.', 'error');
                    } else {
                        alert('Erreur : jsPDF non chargé.');
                    }
                    return;
                }

                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                let yPos = 20;

                // En-tête
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('Traçabilité Finance Climat & Décarbonation', pageWidth / 2, yPos, { align: 'center' });
                yPos += 10;

                // Informations du projet
                const projetTitle = document.getElementById('detailTitle') ? document.getElementById('detailTitle').textContent : 'Projet non spécifié';
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Projet : ' + projetTitle, 20, yPos);
                yPos += 8;

                // Date d'export
                const exportDate = new Date().toLocaleDateString('fr-FR', { 
                    day: '2-digit', month: '2-digit', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                });
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text('Export généré le : ' + exportDate, 20, yPos);
                yPos += 10;

                // Taxonomie & ODD
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('Taxonomie & Alignement', 20, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                const taxo = document.getElementById('climatTaxonomie');
                const odd = document.getElementById('climatODD');
                const secteur = document.getElementById('climatSecteur');
                if (taxo) doc.text('Taxonomie : ' + taxo.textContent, 25, yPos);
                yPos += 5;
                if (odd) doc.text('ODD : ' + odd.textContent, 25, yPos);
                yPos += 5;
                if (secteur) doc.text('Secteur SNBC : ' + secteur.textContent, 25, yPos);
                yPos += 10;

                // Indicateurs climat
                doc.setFont('helvetica', 'bold');
                doc.text('Indicateurs d\'impact', 20, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                const tco2 = document.getElementById('climatTCO2');
                const mwh = document.getElementById('climatMWh');
                if (tco2) doc.text('tCO₂ évitées/an : ' + tco2.textContent, 25, yPos);
                yPos += 5;
                if (mwh) doc.text('MWh économisés/an : ' + mwh.textContent, 25, yPos);
                yPos += 10;

                // Sources de financement
                doc.setFont('helvetica', 'bold');
                doc.text('Sources de financement', 20, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                const sourcesList = document.getElementById('climatSourcesList');
                if (sourcesList) {
                    sourcesList.querySelectorAll('li').forEach(li => {
                        const name = li.querySelector('.source-name')?.textContent || '';
                        const amount = li.querySelector('.source-amount')?.textContent || '';
                        if (yPos > pageHeight - 20) {
                            doc.addPage();
                            yPos = 20;
                        }
                        doc.text('• ' + name + ' : ' + amount, 25, yPos);
                        yPos += 5;
                    });
                }
                yPos += 10;

                // Checklist audit
                doc.setFont('helvetica', 'bold');
                doc.text('Checklist Audit-Ready', 20, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                const checklist = document.getElementById('climatAuditChecklist');
                if (checklist) {
                    checklist.querySelectorAll('.climat-audit-item').forEach(item => {
                        if (yPos > pageHeight - 20) {
                            doc.addPage();
                            yPos = 20;
                        }
                        const name = item.querySelector('.name')?.textContent || '';
                        const stat = item.querySelector('.stat')?.textContent || '';
                        doc.text('• ' + name + ' : ' + stat, 25, yPos);
                        yPos += 5;
                    });
                }
                yPos += 10;

                // Métadonnées
                doc.setFont('helvetica', 'bold');
                doc.text('Métadonnées', 20, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                const methode = document.getElementById('climatMethodeImpact');
                const maj = document.getElementById('climatDerniereMaj');
                const source = document.getElementById('climatSource');
                if (methode) doc.text('Méthode d\'impact : ' + methode.textContent, 25, yPos);
                yPos += 5;
                if (maj) doc.text('Dernière mise à jour : ' + maj.textContent, 25, yPos);
                yPos += 5;
                if (source) doc.text('Source : ' + source.textContent, 25, yPos);
                yPos += 10;

                // Note de bas de page
                if (yPos > pageHeight - 30) {
                    doc.addPage();
                    yPos = 20;
                }
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                doc.text('Document généré par ColConnect - Traçabilité MRV (Measurement, Reporting, Verification)', 
                    pageWidth / 2, pageHeight - 10, { align: 'center' });

                // Téléchargement
                const fileName = 'Justificatifs_Audit_Climat_' + projetTitle.replace(/[^a-zA-Z0-9]/g, '_') + '_' + 
                    new Date().toISOString().split('T')[0] + '.pdf';
                doc.save(fileName);

                if (typeof showToast === 'function') {
                    showToast('✅ Export PDF généré avec succès : ' + fileName, 'success');
                } else {
                    console.log('[ColConnect] Export PDF réussi :', fileName);
                }
            } catch (error) {
                console.error('[ColConnect] Erreur export PDF :', error);
                if (typeof showToast === 'function') {
                    showToast('❌ Erreur lors de l\'export PDF : ' + error.message, 'error');
                } else {
                    alert('Erreur export PDF : ' + error.message);
                }
            }
        }
        window.exportJustificatifsClimat = exportJustificatifsClimat;

        /**
         * Met à jour tout le bloc audit depuis les données du projet
         * @param {Object} projetData - Données du projet depuis climatData
         */
        function updateClimatAuditBlock(projetData) {
            if (!projetData) return;

            // Mise à jour des indicateurs
            const tco2El = document.getElementById('climatTCO2');
            const mwhEl = document.getElementById('climatMWh');
            if (tco2El && projetData.co2) tco2El.textContent = projetData.co2;
            if (mwhEl && projetData.mwh) mwhEl.textContent = projetData.mwh;

            // Mise à jour des sources de financement
            const sourcesList = document.getElementById('climatSourcesList');
            if (sourcesList && projetData.typeFinancement) {
                // Simplification : on peut améliorer avec un mapping plus détaillé
                sourcesList.innerHTML = '<li><span class="source-name">' + projetData.typeFinancement + '</span><span class="source-amount">' + 
                    (projetData.montant || 'N/A') + '</span></li>';
            }

            // Mise à jour métadonnées
            updateClimatMetadata(projetData);

            // Vérification checklist
            updateAuditChecklist(projetData);
        }

        // Hook into openProjet to update climat data
        const __originalOpenProjet = typeof openProjet === 'function' ? openProjet : null;
        if (__originalOpenProjet) {
            openProjet = function(title) {
                __originalOpenProjet(title);
                setTimeout(() => {
                    updateClimatWidget(title);
                    // Mise à jour de l'audit
                    const projetData = climatData[title];
                    if (projetData) {
                        updateClimatAuditBlock(projetData);
                    }
                }, 150);
            };
        }

        // Hook into openProjetFinanceur aussi
        const __originalOpenProjetFinanceur = typeof openProjetFinanceur === 'function' ? openProjetFinanceur : null;
        if (__originalOpenProjetFinanceur) {
            openProjetFinanceur = function(projectName) {
                __originalOpenProjetFinanceur(projectName);
                setTimeout(() => {
                    const projetData = climatData[projectName];
                    if (projetData) {
                        updateClimatAuditBlock(projetData);
                    }
                }, 150);
            };
        }


        // ========================
        // ESPACE FINANCEUR
        // ========================
        function accederEspaceFinanceur() {
            navigateTo('espace-financeur');
            setTimeout(function() { if (typeof showFinanceurPanel === 'function') showFinanceurPanel('dashboard'); }, 50);
        }

        function exportRapportFinanceur() {
            alert('📊 Export du rapport financeur en cours...\n\nLe PDF sera généré avec :\n- Liste des projets financés\n- Indicateurs d\'impact\n- État des validations\n- Synthèse financière');
        }

        function openParametresFinanceur() {
            alert('⚙️ Paramètres du compte Financeur\n\n• Informations du dispositif\n• Préférences de notifications\n• Seuils d\'alertes\n• Modèles de rapports');
        }

        function ajouterCollaborateur() {
            const email = prompt('Email du collaborateur à ajouter :');
            if (email) {
                alert(`✉️ Demande envoyée à ${email}\n\nLe collaborateur recevra un lien pour rejoindre votre espace financeur.`);
            }
        }

        function voirTousProjetsFinances() {
            alert('📁 Affichage de la liste complète des 12 projets financés...\n\n(En production : vue tableau avec filtres et tri)');
        }

        function openProjetFinanceur(projectName) {
            // Ouvre le détail du projet en mode financeur
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
                if (projet) {
                    // Créer un objet projet compatible avec populateProjectDetails
                    const projetCompatible = {
                        ...projet,
                        title: projet.title || projet.name || projectName,
                        name: projet.name || projet.title || projectName,
                        collectivite: projet.collectivite || projet.collectiviteId,
                        status: projet.status || 'etude'
                    };
                    populateProjectDetails(projetCompatible);
                    // Réappliquer les règles après populateProjectDetails
                    setTimeout(() => {
                        if (typeof applyProjetVisibilityRules === 'function') {
                            applyProjetVisibilityRules(projetCompatible);
                        }
                    }, 200);
                } else {
                    // Si projet non trouvé, appliquer quand même les règles avec un objet minimal
                    if (typeof applyProjetVisibilityRules === 'function') {
                        applyProjetVisibilityRules({ title: projectName, collectivite: null });
                    }
                }
            }, 150);
        }

        function validerDocument(docId) {
            if (confirm('Valider ce document ?')) {
                alert('✅ Document validé avec succès !\n\nLa collectivité sera notifiée.');
                // Mise à jour du compteur
                const countEl = document.getElementById('fkpiDocsAttente');
                if (countEl) {
                    let count = parseInt(countEl.textContent) - 1;
                    countEl.textContent = Math.max(0, count);
                }
            }
        }

        function voirTousDocuments() {
            alert('📄 Ouverture du gestionnaire de documents...\n\nVue complète avec :\n- Tous les documents par projet\n- Filtres par statut\n- Historique des validations');
        }





/* ============================================================
   ADMIN — SOURCES DE DONNÉES (DataSources)
   - Pas de "Portail citoyen" pour l'instant
   - Prototype offline : actions = toasts
   ============================================================ */

(function ensureDataSourcesModule(){
  if (typeof window.__ccDataSourcesInit !== "undefined") return;
  window.__ccDataSourcesInit = true;

  
  window.__ccDataSources = [

    // ============================================================
    // 1️⃣ ERP FINANCIER
    // ============================================================

    {
      id: "berger_levrault",
      name: "Berger-Levrault",
      category: "ERP financier",
      desc: "Gestion budgétaire et comptable des collectivités",
      status: "connected"
    },
    {
      id: "ciril",
      name: "Ciril Group",
      category: "ERP financier",
      desc: "ERP finances publiques & ressources humaines",
      status: "connected"
    },

    // ============================================================
    // 2️⃣ SUIVI PROJETS & TRAVAUX
    // ============================================================

    {
      id: "planisware",
      name: "Planisware",
      category: "Suivi projets & travaux",
      desc: "Pilotage portefeuille projets et planification stratégique",
      status: "connected"
    },
    {
      id: "atelio",
      name: "Atelio",
      category: "Suivi projets & travaux",
      desc: "Gestion opérationnelle des projets & travaux",
      status: "pending"
    },

    // ============================================================
    // 3️⃣ ÉNERGIE / CLIMAT / TRANSITION
    // ============================================================

    {
      id: "operat",
      name: "ADEME – OPERAT",
      category: "Énergie & climat",
      desc: "Déclarations décret tertiaire & reporting réglementaire",
      status: "connected"
    },
    {
      id: "deepki",
      name: "Deepki",
      category: "Énergie & climat",
      desc: "Monitoring des consommations énergétiques",
      status: "connected"
    },
    {
      id: "citergy",
      name: "Citergy",
      category: "Énergie & climat",
      desc: "Suivi énergétique & performance bâtimentaire",
      status: "pending"
    },
    {
      id: "excel",
      name: "Excel (import manuel)",
      category: "Énergie & climat",
      desc: "Imports fichiers Excel & consolidation interne",
      status: "disconnected"
    },

    // ============================================================
    // 4️⃣ URBANISME / SIG / PATRIMOINE
    // ============================================================

    {
      id: "geoportail",
      name: "Géoportail de l'Urbanisme",
      category: "Urbanisme & SIG",
      desc: "Consultation documents d’urbanisme réglementaires",
      status: "connected"
    },
    {
      id: "esri",
      name: "Esri (ArcGIS)",
      category: "Urbanisme & SIG",
      desc: "Systèmes d'information géographique & cartographie",
      status: "connected"
    },
    {
      id: "qgis",
      name: "QGIS",
      category: "Urbanisme & SIG",
      desc: "SIG open source & analyses spatiales",
      status: "pending"
    }

  ];


  window.__ccDataSourcesState = { filter: "all" };
})();

function renderDataSourcesPanel() {
  const panel = document.getElementById("adminPanel");
  if (!panel) return;

  const list = (window.__ccDataSources || []);
  const total = list.length;
  const connected = list.filter(s => s.status === "connected").length;

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; flex-wrap:wrap;">
      <div>
        <div style="font-size:1.35rem; font-weight:800; color: var(--text-primary); margin-bottom:.25rem;">
          Sources de données
        </div>
        <div style="color: var(--text-muted); font-size:.9rem;">
          Gérez les connexions avec vos outils métiers et systèmes existants
        </div>
      </div>

      <button class="btn btn-primary" type="button" onclick="ccDataSourcesNewSource()">
        <i class="fas fa-plus"></i> Nouvelle source
      </button>
    </div>

    <div style="display:flex; gap:.75rem; margin:1rem 0 1.25rem; flex-wrap:wrap;">
      <button class="btn btn-secondary" type="button" onclick="ccDataSourcesSetFilter('all')" id="ccDsFilterAll">
        <i class="fas fa-database"></i> ${total} sources
      </button>
      <button class="btn btn-secondary" type="button" onclick="ccDataSourcesSetFilter('connected')" id="ccDsFilterConnected">
        <i class="fas fa-wifi"></i> ${connected} connectées
      </button>
    </div>

    <div id="ccDataSourcesGrid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;"></div>
  `;

  ccDataSourcesRenderGrid();
  ccDataSourcesSyncFilterButtons();
}

function ccDataSourcesSetFilter(filter) {
  window.__ccDataSourcesState = window.__ccDataSourcesState || { filter: "all" };
  window.__ccDataSourcesState.filter = filter;
  ccDataSourcesRenderGrid();
  ccDataSourcesSyncFilterButtons();
}

function ccDataSourcesSyncFilterButtons() {
  const allBtn = document.getElementById("ccDsFilterAll");
  const connBtn = document.getElementById("ccDsFilterConnected");
  if (!allBtn || !connBtn) return;

  const f = (window.__ccDataSourcesState && window.__ccDataSourcesState.filter) || "all";
  allBtn.classList.toggle("btn-primary", f === "all");
  allBtn.classList.toggle("btn-secondary", f !== "all");
  connBtn.classList.toggle("btn-primary", f === "connected");
  connBtn.classList.toggle("btn-secondary", f !== "connected");
}

function ccDataSourcesRenderGrid() {
  const wrap = document.getElementById("ccDataSourcesGrid");
  if (!wrap) return;

  const f = (window.__ccDataSourcesState && window.__ccDataSourcesState.filter) || "all";
  let list = (window.__ccDataSources || []);
  if (f === "connected") list = list.filter(s => s.status === "connected");

  wrap.innerHTML = list.map(ds => ccDataSourcesCardHTML(ds)).join("");
}

function ccDataSourcesCardHTML(ds) {
  const badge = ccDataSourcesStatusBadge(ds.status);
  const icon = ccDataSourcesIcon(ds.status);

  return `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 1rem;">
      <div style="display:flex; justify-content:space-between; gap:.75rem; align-items:flex-start;">
        <div style="display:flex; gap:.75rem; align-items:flex-start;">
          <div style="width:42px;height:42px;border-radius:12px; display:flex; align-items:center; justify-content:center;
                      background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.08);">
            ${icon}
          </div>
          <div>
            <div style="font-weight:800; color:var(--text-primary); line-height:1.2;">${escapeHTML(ds.name)}</div>
            <div style="font-size:.82rem; color:var(--text-muted); margin-top:.15rem;">${escapeHTML(ds.type)}</div>
          </div>
        </div>
        ${badge}
      </div>

      <div style="margin-top:.75rem; color:var(--text-secondary); font-size:.9rem; line-height:1.4;">
        ${escapeHTML(ds.desc)}
      </div>

      <div style="display:flex; gap:.5rem; margin-top:1rem; flex-wrap:wrap;">
        <button class="btn btn-secondary" type="button" onclick="ccDataSourcesConfigure('${ds.id}')">
          <i class="fas fa-sliders-h"></i> Configurer
        </button>
        ${ccDataSourcesActionButton(ds)}
      </div>
    </div>
  `;
}

function ccDataSourcesActionButton(ds) {
  if (ds.status === "connected") {
    return `<button class="btn btn-secondary" type="button" onclick="ccDataSourcesDisconnect('${ds.id}')">
      <i class="fas fa-unlink"></i> Déconnecter
    </button>`;
  }
  if (ds.status === "pending") {
    return `<button class="btn btn-secondary" type="button" onclick="ccDataSourcesConnect('${ds.id}')">
      <i class="fas fa-plug"></i> Finaliser
    </button>`;
  }
  return `<button class="btn btn-primary" type="button" onclick="ccDataSourcesConnect('${ds.id}')">
    <i class="fas fa-link"></i> Connecter
  </button>`;
}

function ccDataSourcesStatusBadge(status) {
  const common = `style="display:inline-flex; align-items:center; gap:.4rem; padding:.35rem .6rem; border-radius:999px; font-weight:800; font-size:.78rem;"`;
  if (status === "connected") {
    return `<span ${common} style="background: rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.35); color:#22c55e;">
      <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;"></span> Connecté
    </span>`;
  }
  if (status === "pending") {
    return `<span ${common} style="background: rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.35); color:#f59e0b;">
      <span style="width:7px;height:7px;border-radius:50%;background:#f59e0b;display:inline-block;"></span> En attente
    </span>`;
  }
  return `<span ${common} style="background: rgba(148,163,184,0.12); border:1px solid rgba(148,163,184,0.30); color:#94a3b8;">
    <span style="width:7px;height:7px;border-radius:50%;background:#94a3b8;display:inline-block;"></span> Déconnecté
  </span>`;
}

function ccDataSourcesIcon(status) {
  if (status === "connected") return `<i class="fas fa-wifi" style="color:#22c55e;"></i>`;
  if (status === "pending") return `<i class="fas fa-clock" style="color:#f59e0b;"></i>`;
  return `<i class="fas fa-plug" style="color:#94a3b8;"></i>`;
}

function ccDataSourcesNewSource() {
  if (typeof showToast === "function") showToast("Nouvelle source (prototype) — à implémenter", "info");
  else alert("Nouvelle source (prototype) — à implémenter");
}

function ccDataSourcesConfigure(id) {
  const ds = (window.__ccDataSources || []).find(x => x.id === id);
  const name = ds ? ds.name : id;
  if (typeof showToast === "function") showToast(`Configurer: ${name} (prototype)`, "info");
  else alert(`Configurer: ${name} (prototype)`);
}

function ccDataSourcesConnect(id) {
  const ds = (window.__ccDataSources || []).find(x => x.id === id);
  if (!ds) return;
  ds.status = "connected";
  if (typeof showToast === "function") showToast(`${ds.name} connecté`, "success");
  ccDataSourcesRenderGrid();
}

function ccDataSourcesDisconnect(id) {
  const ds = (window.__ccDataSources || []).find(x => x.id === id);
  if (!ds) return;
  ds.status = "disconnected";
  if (typeof showToast === "function") showToast(`${ds.name} déconnecté`, "info");
  ccDataSourcesRenderGrid();
}

function escapeHTML(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// ============================
/* SIM_EXEC_DISABLED_START */
// SIM Executive loader (V1)
// ============================
async function loadSimExecutive(collectiviteId, apiBase="") {
  try {
    const url = `${apiBase}/api/v1/sim/executive/${encodeURIComponent(collectiviteId)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    const setText = (sel, val) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.textContent = (val === null || val === undefined || val === "") ? "--" : String(val);
    };

    setText("#sim-ism-score", data?.ism?.score);
    setText("#sim-ism-trend", data?.ism?.trend);
    setText("#sim-ism-confidence", data?.ism?.confidence);

    setText("#sim-irm-score", data?.irm?.score);
    setText("#sim-projection-status", data?.projection?.status);

    setText("#sim-driver-ieb", data?.drivers?.ieb);
    setText("#sim-driver-iep", data?.drivers?.iep);
    setText("#sim-driver-ics", data?.drivers?.ics);

    const risk = data?.risks?.top?.[0] || "Aucun risque critique";
    setText("#sim-risk-top1", risk);

  } catch (e) {
    console.warn("SIM executive load failed:", e);
  }
}

// Hook DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // TODO: si tu as un sélecteur/état global, remplace ici.
  const defaultId = (document.body && document.body.dataset && document.body.dataset.collectiviteId) ? document.body.dataset.collectiviteId : "lyon";
  loadSimExecutive(defaultId);
/* SIM_EXEC_DISABLED_END */
});
