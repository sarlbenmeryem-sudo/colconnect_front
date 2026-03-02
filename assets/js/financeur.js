// ColConnect - financeur.js | v1.0 | Extrait de v8.html script 2 | Dépendances: main.js
(function(){
  const LS_KEY='cc_financeur_state_v1';
  const fmtEUR=(n)=>{try{return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n)}catch(e){return (n||0).toLocaleString('fr-FR')+' €'}};
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  const normalize=(s)=>(s||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const nowFR=()=>new Date().toISOString().slice(0,10).split('-').reverse().join('/');

  function seededRandom(seed){let t=seed%2147483647;if(t<=0)t+=2147483646;return function(){t=t*16807%2147483647;return (t-1)/2147483646;}}
  const rnd=seededRandom(20251228);
  const collectivites=["Ville de Lyon","Ville de Paris","Commune de Saint-Denis","Bordeaux Métropole","Nantes Métropole","Ville de Lille","Ville de Marseille","Rennes Métropole","Ville de Strasbourg","Toulouse Métropole","Métropole de Nice","Ville de Montpellier","Ville de Grenoble","Ville de Reims"];
  const thematiques=["Rénovation","Mobilité","Énergie","Biodiversité","Numérique"];
  const tagsPool=["Transition écologique","Éligible Fonds Vert","CEE potentiel","Plan vélo","Résilience urbaine","Déploiement progressif","Site occupé","Interop SI","PMR","Baisse CO₂"];
  const titles={"Rénovation":["Rénovation énergétique du groupe scolaire","Rénovation de l’hôtel de ville","Isolation et GTB des équipements sportifs"],"Mobilité":["Requalification de l’axe principal","Sécurisation des traversées piétonnes","Création de pistes cyclables structurantes"],"Énergie":["Modernisation éclairage public LED","Photovoltaïque en toiture","Réseau de chaleur – extension"],"Biodiversité":["Renaturation d’un parc urbain","Trame verte et bleue","Désimperméabilisation des cours d’école"],"Numérique":["Guichet numérique citoyen","Dématérialisation des démarches","Portail de données territoriales"]};
  const pick=(a)=>a[Math.floor(rnd()*a.length)];
  const pickSome=(a,k)=>{const c=a.slice();const out=[];for(let i=0;i<k&&c.length;i++){out.push(c.splice(Math.floor(rnd()*c.length),1)[0]);}return out;};

  const dist=[...Array(12).fill('financed'),...Array(8).fill('study'),...Array(24).fill('opportunity'),...Array(3).fill('refused')];
  const projects=[];
  dist.forEach((fs,idx)=>{
    const th=pick(thematiques), co=pick(collectivites), bt=pick(titles[th]);
    const suffix=(idx%3===0)?" – phase 1":(idx%3===1)?" – lot 2":" – extension";
    const m=Math.round((150000+rnd()*5500000)/10000)*10000;
    const dec=clamp(Math.round(rnd()*100),0,100);
    const av=clamp(Math.round(rnd()*100),0,100);
    const st=['en_cours','termines','en_retard'][Math.floor(rnd()*3)];
    const dots=clamp(1+Math.floor(rnd()*5),1,5);
    projects.push({id:`p_${idx+1}`,title:`${bt} - ${co.replace('Ville de ','')}${suffix}`,collectivite:co,thematique:th,tags:pickSome(tagsPool,2+Math.floor(rnd()*2)),montantDemande:m,tauxDecaissement:dec,avancement:av,statut:st,financeurStatus:fs,maturite:"●".repeat(dots)+"○".repeat(5-dots),lastUpdate:nowFR()});
  });
  const initialFavs=projects.filter(p=>p.financeurStatus==='opportunity').slice(0,5).map(p=>p.id);

  const loadState=()=>{try{const raw=localStorage.getItem(LS_KEY);if(raw){const st=JSON.parse(raw);return{favoris:Array.isArray(st.favoris)?st.favoris:[],notes:(st.notes&&typeof st.notes==='object')?st.notes:{},financeurStatus:(st.financeurStatus&&typeof st.financeurStatus==='object')?st.financeurStatus:{}}}}catch(e){};return{favoris:initialFavs.slice(),notes:{},financeurStatus:{}}};
  const state=loadState();
  const save=()=>{try{localStorage.setItem(LS_KEY,JSON.stringify(state))}catch(e){}};

  const getFS=(p)=>state.financeurStatus[p.id]||p.financeurStatus;
  const setFS=(id,fs)=>{state.financeurStatus[id]=fs;save();};
  const isFav=(id)=>state.favoris.includes(id);
  const toggleFav=(id)=>{state.favoris=isFav(id)?state.favoris.filter(x=>x!==id):state.favoris.concat([id]);save();};
  const getNote=(id)=>state.notes[id]||"";
  const setNote=(id,t)=>{state.notes[id]=(t||"").toString();save();};

  const $=(id)=>document.getElementById(id);
  const overlay=$('financeurWorkspaceOverlay');
  const closeBtn=$('fwCloseBtn');
  const listPanel=$('fwListPanel');
  const dashPanel=$('fwDashboardPanel');
  const headerTitle=$('fwHeaderTitle');
  const headerSub=$('fwHeaderSub');
  const tabs=[...document.querySelectorAll('.fw-tab')];

  const searchEl=$('fwSearch');
  const statutEl=$('fwStatut');
  const collEl=$('fwCollectivite');
  const themEl=$('fwThematique');
  const montantEl=$('fwMontantMax');

  const notesModal=$('financeurNotesModal');
  const notesText=$('fwNotesText');
  const notesLabel=$('fwNotesProjectLabel');
  const notesCancel=$('fwNotesCancel');
  const notesSave=$('fwNotesSave');

  let activeTab='dashboard';
  let activeNotesPid=null;

  function fillCollectivites(){
    if(!collEl || collEl.options.length>1) return;
    [...new Set(projects.map(p=>p.collectivite))].sort((a,b)=>a.localeCompare(b,'fr')).forEach(c=>{
      const o=document.createElement('option');o.value=c;o.textContent=c;collEl.appendChild(o);
    });
  }

  function counts(){
    const all=projects.map(p=>({...p,financeurStatus:getFS(p)}));
    return{
      total:all.length,
      financed:all.filter(p=>p.financeurStatus==='financed').length,
      study:all.filter(p=>p.financeurStatus==='study').length,
      opp:all.filter(p=>p.financeurStatus==='opportunity').length,
      refused:all.filter(p=>p.financeurStatus==='refused').length,
      fav:all.filter(p=>isFav(p.id)).length,
      all
    };
  }

  function updatePills(){
    const c=counts();
    const set=(id,v)=>{const el=$(id);if(el) el.textContent=String(v);};
    set('fwCountDashboard',c.total);set('fwCountFinancements',c.financed);set('fwCountEtudier',c.study);set('fwCountOpportunites',c.opp);set('fwCountRefuses',c.refused);set('fwCountFavoris',c.fav);
    const engagements=c.all.filter(p=>p.financeurStatus==='financed').reduce((s,p)=>s+(p.montantDemande||0),0);
    set('fwKpiEngagements',fmtEUR(engagements));set('fwKpiEligibles',c.opp);
    const alerts=c.all.filter(p=>p.statut==='en_retard'&&(p.financeurStatus==='financed'||p.financeurStatus==='study')).slice(0,4);
    set('fwKpiAlertes',alerts.length||0);
    const ul=$('fwAlertsList');
    if(ul){
      ul.innerHTML="";
      if(!alerts.length){const li=document.createElement('li');li.textContent="Aucune alerte critique détectée.";ul.appendChild(li);}
      else alerts.forEach(p=>{const li=document.createElement('li');li.innerHTML=`<strong>${p.collectivite}</strong> — ${p.title} (en retard)`;ul.appendChild(li);});
    }
    set('fwKpiTotal',c.total);set('fwKpiFinances',c.financed);set('fwKpiEtudes',c.study);
  }

  function passes(p){
    const q=normalize(searchEl?searchEl.value:'');
    if(q){
      const hay=normalize([p.title,p.collectivite,p.thematique,...(p.tags||[])].join(' '));
      if(!hay.includes(q)) return false;
    }
    const st=statutEl?statutEl.value:''; if(st && p.statut!==st) return false;
    const co=collEl?collEl.value:''; if(co && p.collectivite!==co) return false;
    const th=themEl?themEl.value:''; if(th && p.thematique!==th) return false;
    const mx=montantEl?parseInt(montantEl.value||'',10):NaN; if(!isNaN(mx) && (p.montantDemande||0)>mx) return false;
    return true;
  }

  function byTab(all){
    if(activeTab==='dashboard') return [];
    if(activeTab==='favoris') return all.filter(p=>isFav(p.id));
    if(activeTab==='financements') return all.filter(p=>p.financeurStatus==='financed');
    if(activeTab==='etudier') return all.filter(p=>p.financeurStatus==='study');
    if(activeTab==='opportunites') return all.filter(p=>p.financeurStatus==='opportunity');
    if(activeTab==='refuses') return all.filter(p=>p.financeurStatus==='refused');
    return all;
  }

  function badge(p){
    const fs=p.financeurStatus;
    if(isFav(p.id)) return `<span class="fw-status favorite">★ Favori</span>`;
    if(fs==='financed') return `<span class="fw-status financed">✓ Financé</span>`;
    if(fs==='study') return `<span class="fw-status study">🔍 À étudier</span>`;
    if(fs==='refused') return `<span class="fw-status refused">✕ Refusé</span>`;
    return `<span class="fw-status opportunity">◆ Opportunité</span>`;
  }

  function card(p){
    const note=getNote(p.id);
    const tags=(p.tags||[]).map(t=>`<span class="fw-tag">${t}</span>`).join('');
    return `<div class="fw-card" data-pid="${p.id}">
      <div class="fw-card-top">
        <div style="min-width:0;">
          <div class="fw-card-title">${p.title}</div>
          <div class="fw-card-meta">${p.collectivite} • ${p.thematique}<br/>${fmtEUR(p.montantDemande)} demandés • décaissement ${p.tauxDecaissement}%<br/>Avancement ${p.avancement}% • Statut ${p.statut.replace('_',' ')}</div>
        </div>
        ${badge(p)}
      </div>
      <div class="fw-tags">${tags}</div>
      <div class="fw-metrics">
        <div class="fw-metric"><p class="k">Maturité</p><p class="v">${p.maturite}</p></div>
        <div class="fw-metric"><p class="k">Décaissement</p><p class="v">${p.tauxDecaissement}%</p></div>
        <div class="fw-metric"><p class="k">MAJ</p><p class="v">${p.lastUpdate}</p></div>
      </div>
      ${note?`<p class="fw-note"><strong>Note :</strong> ${note.replace(/</g,'&lt;')}</p>`:`<p class="fw-note">Aucune note privée.</p>`}
      <div class="fw-actions">
        <button class="fw-btn" data-action="fav" type="button">⭐ Favori</button>
        <button class="fw-btn" data-action="note" type="button">📝 Notes</button>
        <button class="fw-btn primary" data-action="details" type="button">👁️ Détails</button>
        <button class="fw-btn" data-action="etudier" type="button">🔍 Étudier</button>
        <button class="fw-btn" data-action="financer" type="button">✅ Financer</button>
        <button class="fw-btn danger" data-action="refuser" type="button">❌ Refuser</button>
      </div>
    </div>`;
  }

  function render(){
    const c=counts();
    const inTab=byTab(c.all);
    const filtered=inTab.filter(p=>passes(p));

    if(activeTab==='dashboard'){
      if(dashPanel) dashPanel.style.display='block';
      if(listPanel) listPanel.style.display='none';
      return;
    }
    if(dashPanel) dashPanel.style.display='none';
    if(listPanel) listPanel.style.display='grid';
    if(!listPanel) return;

    listPanel.innerHTML = filtered.length ? filtered.map(card).join('') :
      `<div class="fw-card" style="grid-column:1/-1;"><div class="fw-card-title">Aucun résultat</div><div class="fw-card-meta">Ajuste tes filtres ou change d’onglet.</div></div>`;
  }

  function setTab(tab){
    activeTab=tab;
    tabs.forEach(t=>t.classList.toggle('active',t.getAttribute('data-tab')===tab));
    const map={dashboard:["Tableau de bord","Vue d’ensemble, KPIs et alertes de portefeuille."],financements:["Mes financements","Projets que le financeur a choisi de financer."],etudier:["À étudier","Projets en cours d’analyse interne."],opportunites:["Opportunités","Projets éligibles non encore financés."],refuses:["Refusés","Historique des projets non retenus."],favoris:["Favoris","Projets suivis de près (veille)."]};
    if(headerTitle) headerTitle.textContent=map[tab][0];
    if(headerSub) headerSub.textContent=map[tab][1];
    updatePills(); render();
  }

  function openNotes(pid){
    activeNotesPid=pid;
    const p=projects.find(x=>x.id===pid);
    if(notesLabel) notesLabel.textContent=p?`${p.collectivite} — ${p.title}`:"Projet";
    if(notesText) notesText.value=getNote(pid);
    if(notesModal){notesModal.classList.add('active');notesModal.setAttribute('aria-hidden','false');}
    setTimeout(()=>{try{notesText&&notesText.focus();}catch(e){}},50);
  }
  function closeNotes(){ if(notesModal){notesModal.classList.remove('active');notesModal.setAttribute('aria-hidden','true');} activeNotesPid=null; }

  function closeWS(){ if(overlay){overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');} closeNotes(); }
  function openWS(){ if(overlay){overlay.classList.add('active');overlay.setAttribute('aria-hidden','false');} setTab(activeTab||'dashboard'); }

  function openDetails(pid){
    const p=projects.find(x=>x.id===pid); if(!p) return;
    try{
      const set=(id,v)=>{const el=$(id);if(el) el.textContent=v;};
      set('financeurProjectTitle',p.title);
      set('financeurMaturite',p.maturite);
      set('financeurAvancement',(p.avancement||0)+' %');
      set('financeurBudget',(getFS(p)==='financed'||getFS(p)==='study')?'Consolidé':'Estimé');
      set('financeurMaj',p.lastUpdate);
      const meta=$('financeurProjectMeta');
      if(meta) meta.innerHTML=`Collectivité porteuse : <strong>${p.collectivite}</strong> – Statut : <strong>${p.statut.replace('_',' ')}</strong><br/>Lecture synthétique indépendante des dispositifs d’aides.`;
    }catch(e){}
    closeWS();
    try{ if(typeof window.setDetailView==='function'){ window.setDetailView(true); } }catch(e){}
    try{ const detail=document.getElementById('detailFinanceurView'); if(detail) detail.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}
  }

  function act(pid,action){
    if(action==='fav'){toggleFav(pid);updatePills();render();return;}
    if(action==='note'){openNotes(pid);return;}
    if(action==='details'){openDetails(pid);return;}
    if(action==='financer'){setFS(pid,'financed');updatePills();render();return;}
    if(action==='etudier'){setFS(pid,'study');updatePills();render();return;}
    if(action==='refuser'){setFS(pid,'refused');if(isFav(pid)) toggleFav(pid);updatePills();render();return;}
  }

  document.addEventListener('click',(e)=>{
    const tab=e.target.closest&&e.target.closest('.fw-tab'); if(tab){ setTab(tab.getAttribute('data-tab')); return; }
    const btn=e.target.closest&&e.target.closest('.fw-card .fw-btn');
    if(btn){
      const card=e.target.closest('.fw-card');
      const pid=card?card.getAttribute('data-pid'):null;
      if(pid) act(pid, btn.getAttribute('data-action'));
    }
  });
  [searchEl,statutEl,collEl,themEl,montantEl].forEach(el=>{ if(!el) return; el.addEventListener('input',render); el.addEventListener('change',render); });

  if(closeBtn) closeBtn.addEventListener('click',closeWS);
  if(overlay) overlay.addEventListener('click',(e)=>{ if(e.target===overlay) closeWS(); });

  if(notesCancel) notesCancel.addEventListener('click',closeNotes);
  if(notesModal) notesModal.addEventListener('click',(e)=>{ if(e.target===notesModal) closeNotes(); });
  if(notesSave) notesSave.addEventListener('click',()=>{ if(!activeNotesPid) return closeNotes(); setNote(activeNotesPid, notesText?notesText.value:""); closeNotes(); render(); });

  function installEntry(){
    // Bouton Financeur supprimé
  }

  document.addEventListener('DOMContentLoaded',()=>{fillCollectivites();installEntry();updatePills();setTab('dashboard');});
  document.addEventListener('keydown',(e)=>{
    if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openWS(); }
    if(e.key==='Escape'){ if(notesModal && notesModal.classList.contains('active')) closeNotes(); else if(overlay && overlay.classList.contains('active')) closeWS(); }
  });
})();
