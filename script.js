/* ============================================================
   PRODUITS DE LA BOUTIQUE (statique)
   ------------------------------------------------------------
   Pour modifier une image  → change "image_url"
   Pour modifier un prix    → change "prix"
   Pour modifier le nom     → change "nom"
   Pour modifier le texte   → change "description"
   Pour ajouter un produit  → copie un bloc { ... }, adapte-le,
                              et donne-lui un "id" UNIQUE.
============================================================ */

/* -----------------------------------------------------------
   GRANDES CARTES — section "Tendances du moment"
----------------------------------------------------------- */

const PRODUITS = [
  {
    id: 1,
    nom: "T-shirt Slim FREEDOM",
    description: "T-shirt slim de la collection freedom 2026",
    prix: 4800,
    collection: "FREEDOM",
    image_url: "https://i.postimg.cc/B6q0mj79/IMG-6766.png"
  },
  {
    id: 2,
    nom: "Débardeur vibe street",
    description: "Streetwear premium",
    prix: 2900,
    collection: "Vibe Street",
    image_url: "https://i.postimg.cc/gjnZVd0L/image-(8).png"
  },
  {
    id: 3,
    nom: "Débardeur vibe street",
    description: "Streetwear premium",
    prix: 2900,
    collection: "Vibe Street",
    image_url: "https://i.postimg.cc/J0vBKgyj/image-(12).png"
  }
];

/* -----------------------------------------------------------
   MINI-CARTES SCROLLABLES — juste après le hero
   (liste totalement indépendante des grandes cartes)
----------------------------------------------------------- */

const MINI_PRODUITS = [
  {
    id: "m1",
    nom: "vibe street",
    description: "Débardeur vibe street , Logo brodé",
    prix: 2900,
    collection: "Vibe Street",
    image_url: "https://i.postimg.cc/sxqZK8B1/image-(13).png"
  },
  {
    id: "m2",
    nom: "Tshirt Over size",
    description: " oversize , Logo brodé, design arrière DTFS",
    prix: 9000,
    collection: "Spirit",
    image_url: "https://i.postimg.cc/vm3shy0B/IMG-9584.jpg"
  },
  {
    id: "m3",
    nom: "T-shirt Slim",
    description: "",
    prix: 3200,
    collection: "FREEDOM",
    image_url: "https://i.postimg.cc/k4nmT21L/IMG-6767.png"
  }
];

/* ======================================================
CONFIG
====================================================== */

const CLIENT_PAGE = 'client.html';




/* ======================================================
HAMBURGER MENU
====================================================== */
let menuOpenedAt = 0;

function toggleMenu() {
  const menu = document.getElementById('hamburgerMenu');
  const overlay = document.getElementById('hamOverlay');
  const isOpen = menu.classList.contains('open');

  menu.classList.toggle('open');
  overlay.classList.toggle('open');

  document.body.style.overflow = isOpen ? '' : 'hidden';

  if (!isOpen) {
    menuOpenedAt = Date.now();
  }
}



function togglePanier() {
  const panel = document.getElementById('cartPanel');
  panel.classList.toggle('open');
}

// Fermer en scrollant (desktop)
window.addEventListener('scroll', () => {
  const menu = document.getElementById('hamburgerMenu');
  if (menu.classList.contains('open') && Date.now() - menuOpenedAt > 300) {
    toggleMenu();
  }
}, { passive: true });

// Fermer en swipant (mobile) — détecte un glissement vertical
let touchStartY = 0;

window.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', e => {
  const menu = document.getElementById('hamburgerMenu');
  if (!menu.classList.contains('open')) return;
  if (Date.now() - menuOpenedAt < 300) return;

  const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
  if (deltaY > 40) toggleMenu();
}, { passive: true });
/* ======================================================
THEME
====================================================== */

function toggleTheme(){

  document.body.classList.toggle('dark');

  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark')
    ? 'dark'
    : 'light'
  );

}

if(localStorage.getItem('theme') === 'dark'){
  document.body.classList.add('dark');
}

/* ======================================================
PRODUCTS
====================================================== */

let allProduits = PRODUITS;

renderProducts(allProduits);
renderMiniProducts(MINI_PRODUITS);

function renderProducts(list){

  document.querySelector('.product-grid').innerHTML =
  list.map(productCard).join('');

}

function productCard(p){

  return `

  <div class="product-card">

    <div class="product-image-wrap">

      <img
      src="${p.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop'}"
      class="product-image">

      <div class="product-tag">
        ${p.collection || 'NEW'}
      </div>

      <button class="add-to-cart-btn" onclick="ajouterAuPanier(${p.id}, '${(p.nom||'').replace(/'/g,"\\'")}', ${p.prix||0}, '${p.image_url||''}')">
        Acheter
      </button>

    </div>

    <div class="product-info">

      <div class="product-name">
        ${p.nom}
      </div>

      <div class="product-category">
        ${p.description || 'Streetwear premium'}
      </div>

      <div class="product-price">
        ${Number(p.prix || 0).toLocaleString('fr-FR')} FCFA
      </div>

    </div>

  </div>

  `;

}

/* ======================================================
MINI PRODUITS SCROLLABLES + CARTE AGRANDIE
====================================================== */

function renderMiniProducts(list){

  document.getElementById('miniProductsScroll').innerHTML =
  list.map(p => `
    <div class="mini-product-card" onclick="ouvrirMiniProduitModal('${p.id}')">
      <img
      src="${p.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400'}"
      class="mini-product-img">
      <div class="mini-product-name">${p.nom}</div>
      <div class="mini-product-price">${Number(p.prix || 0).toLocaleString('fr-FR')} FCFA</div>
    </div>
  `).join('');

}

function ouvrirMiniProduitModal(id){

  const p = MINI_PRODUITS.find(x => x.id === id);
  if(!p) return;

  document.getElementById('productModal').innerHTML = `
    <button class="product-modal-close" onclick="fermerProduitModal()">✕</button>
    <img
    src="${p.image_url}"
    class="product-modal-img">
    <div class="product-modal-tag">${p.collection || 'NEW'}</div>
    <div class="product-modal-name">${p.nom}</div>
    <div class="product-modal-desc">${p.description || ''}</div>
    <div class="product-modal-price">${Number(p.prix || 0).toLocaleString('fr-FR')} FCFA</div>
    <button class="product-modal-add" onclick="ajouterAuPanier('${p.id}', '${(p.nom||'').replace(/'/g,"\\'")}', ${p.prix||0}, '${p.image_url||''}')">
      Ajouter au panier
    </button>
  `;

  document.getElementById('productModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

}

function ouvrirProduitModal(id){

  const p = allProduits.find(x => x.id === id);
  if(!p) return;

  document.getElementById('productModal').innerHTML = `
    <button class="product-modal-close" onclick="fermerProduitModal()">✕</button>
    <img
    src="${p.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200'}"
    class="product-modal-img">
    <div class="product-modal-tag">${p.collection || 'NEW'}</div>
    <div class="product-modal-name">${p.nom}</div>
    <div class="product-modal-desc">${p.description || 'Streetwear premium'}</div>
    <div class="product-modal-price">${Number(p.prix || 0).toLocaleString('fr-FR')} FCFA</div>
    <button class="product-modal-add" onclick="ajouterAuPanier(${p.id}, '${(p.nom||'').replace(/'/g,"\\'")}', ${p.prix||0}, '${p.image_url||''}')">
      Ajouter au panier
    </button>
  `;

  document.getElementById('productModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

}

function fermerProduitModal(event){

  // Si on clique DANS la carte, on ne ferme pas — seulement clic en dehors ou bouton ✕
  if(event && event.target.id !== 'productModalOverlay') return;

  document.getElementById('productModalOverlay').classList.remove('open');
  document.body.style.overflow = '';

}





/* ======================================================
PANIER
====================================================== */

let panier = JSON.parse(localStorage.getItem('panier') || '[]');

function majAffichagePanier() {

  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('hamCartCount');
  const itemsEl = document.getElementById('hamCartItems');
  const totalEl = document.getElementById('hamCartTotal');
  const totalPrice = document.getElementById('hamCartTotalPrice');
  const validateBtn = document.getElementById('cartValidateBtn');

  const total = panier.reduce((s, i) => s + i.quantite, 0);
  const prix = panier.reduce((s, i) => s + i.prix * i.quantite, 0);

  // Badge sur l'icône burger
  if (total > 0) {
    badge.style.display = 'flex';
    badge.textContent = total > 99 ? '99+' : total;
  } else {
    badge.style.display = 'none';
  }

  // Compteur dans le menu
  count.textContent = total;

  // Liste des articles
  if (panier.length === 0) {
    itemsEl.innerHTML = '<p class="ham-cart-empty">Votre panier est vide.</p>';
    totalEl.style.display = 'none';
    validateBtn.style.display = 'none';
  } else {
    itemsEl.innerHTML = panier.map(item => `
      <div class="ham-cart-item">
        <img src="${item.image || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200'}" class="ham-cart-img">
        <div class="ham-cart-info">
          <div class="ham-cart-name">${item.nom}</div>
          <div class="ham-cart-price">${Number(item.prix).toLocaleString('fr-FR')} FCFA</div>
        </div>
        <div class="ham-cart-actions">
          <button onclick="changerQuantite('${item.id}', -1)">−</button>
          <span>${item.quantite}</span>
          <button onclick="changerQuantite('${item.id}', 1)">+</button>
        </div>
      </div>
    `).join('');
    totalEl.style.display = 'flex';
    totalPrice.textContent = prix.toLocaleString('fr-FR') + ' FCFA';
    validateBtn.style.display = 'block';
  }

  localStorage.setItem('panier', JSON.stringify(panier));
}

function ajouterAuPanier(id, nom, prix, image) {
  const exist = panier.find(i => i.id === id);
  if (exist) {
    exist.quantite++;
  } else {
    panier.push({ id, nom, prix, image, quantite: 1 });
  }
  majAffichagePanier();

  // Petite animation sur le badge
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('badge-pop');
  void badge.offsetWidth;
  badge.classList.add('badge-pop');
}

function changerQuantite(id, delta) {
  const item = panier.find(i => i.id == id);
  if (!item) return;
  item.quantite += delta;
  if (item.quantite <= 0) panier = panier.filter(i => i.id != id);
  majAffichagePanier();
}

// Init au chargement
majAffichagePanier();

/* ======================================================
VALIDER LA COMMANDE → WHATSAPP
====================================================== */

// Numéro WhatsApp qui reçoit les commandes (format international, SANS le +)
// Exemple Côte d'Ivoire : "2250700000000"
const WHATSAPP_NUMBER = "2250576754871"; // ⚠️ à remplacer par ton vrai numéro

/* ======================================================
INFOS LIVRAISON — avant envoi WhatsApp
====================================================== */

const COMMUNES_ABIDJAN = [
  "Abobo", "Adjamé", "Anyama", "Attécoubé", "Bingerville",
  "Cocody", "Koumassi", "Marcory", "Plateau", "Port-Bouët",
  "Songon", "Treichville", "Yopougon"
];

const PAYS_LISTE = [
  "Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola",
  "Antigua-et-Barbuda","Arabie saoudite","Argentine","Arménie","Australie","Autriche",
  "Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin",
  "Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil",
  "Brunei","Bulgarie","Burkina Faso","Burundi","Cambodge","Cameroun","Canada","Cap-Vert",
  "Chili","Chine","Chypre","Colombie","Comores","Congo (Brazzaville)","Congo (RDC)",
  "Corée du Nord","Corée du Sud","Costa Rica","Croatie","Cuba","Danemark","Djibouti",
  "Dominique","Égypte","Émirats arabes unis","Équateur","Érythrée","Espagne","Estonie",
  "Eswatini","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie",
  "Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau",
  "Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie","Inde","Indonésie","Irak",
  "Iran","Irlande","Islande","Israël","Italie","Jamaïque","Japon","Jordanie",
  "Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweït","Laos","Lesotho","Lettonie",
  "Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Macédoine du Nord",
  "Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Îles Marshall",
  "Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco","Mongolie",
  "Monténégro","Mozambique","Namibie","Nauru","Népal","Nicaragua","Niger","Nigeria",
  "Norvège","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan","Pakistan","Palaos",
  "Palestine","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou",
  "Philippines","Pologne","Portugal","Qatar","République centrafricaine",
  "République dominicaine","République tchèque","Roumanie","Royaume-Uni","Russie",
  "Rwanda","Saint-Christophe-et-Niévès","Saint-Marin","Saint-Vincent-et-les-Grenadines",
  "Sainte-Lucie","Îles Salomon","Salvador","Samoa","São Tomé-et-Príncipe","Sénégal",
  "Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie",
  "Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie","Tadjikistan",
  "Tanzanie","Tchad","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago",
  "Tunisie","Turkménistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican",
  "Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"
];

let livraisonInfo = {};

function validerCommande(){
  if(panier.length === 0){
    alert('Votre panier est vide.');
    return;
  }
  livraisonInfo = {};
  ouvrirInfosLivraison();
  renderEtapeZone();
}

function ouvrirInfosLivraison(){
  document.getElementById('orderInfoOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fermerInfosLivraison(){
  document.getElementById('orderInfoOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function fermerInfosLivraisonOverlay(event){
  // Ferme seulement si on clique en dehors du modal (sur le fond)
  if(event.target.id !== 'orderInfoOverlay') return;
  fermerInfosLivraison();
}

// ÉTAPE 1 — Zone
function renderEtapeZone(){
  document.getElementById('orderInfoModal').innerHTML = `
    <button class="order-info-close" onclick="fermerInfosLivraison()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="order-info-title">Où habitez-vous ?</div>
    <div class="order-info-options">
      <button class="order-info-option" onclick="choisirZone('abidjan')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Abidjan
      </button>
      <button class="order-info-option" onclick="choisirZone('horsAbidjan')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Hors Abidjan (Côte d'Ivoire)
      </button>
      <button class="order-info-option" onclick="choisirZone('international')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        International
      </button>
    </div>
  `;
}

function choisirZone(zone){
  livraisonInfo.zone = zone;
  if(zone === 'abidjan') renderEtapeAbidjan();
  if(zone === 'horsAbidjan') renderEtapeHorsAbidjan();
  if(zone === 'international') renderEtapeInternational();
}

// ÉTAPE 2a — Abidjan
function renderEtapeAbidjan(){
  document.getElementById('orderInfoModal').innerHTML = `
    <button class="order-info-close" onclick="fermerInfosLivraison()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="order-info-title">Votre commune</div>
    <select class="order-info-select" id="communeSelect">
      <option value="">-- Choisir une commune --</option>
      ${COMMUNES_ABIDJAN.map(c => `<option value="${c}">${c}</option>`).join('')}
    </select>
    <textarea class="order-info-textarea" id="adresseDetail" placeholder="Précisez votre quartier, votre rue, un repère..."></textarea>
    <div class="order-info-actions">
      <button class="order-info-back" onclick="renderEtapeZone()">← Retour</button>
      <button class="order-info-next" onclick="validerAbidjan()">Continuer</button>
    </div>
  `;
}

function validerAbidjan(){
  const commune = document.getElementById('communeSelect').value;
  const detail = document.getElementById('adresseDetail').value.trim();
  if(!commune){ alert('Veuillez choisir une commune.'); return; }
  livraisonInfo.commune = commune;
  livraisonInfo.detail = detail;
  renderEtapeRecap();
}

// ÉTAPE 2b — Hors Abidjan
function renderEtapeHorsAbidjan(){
  document.getElementById('orderInfoModal').innerHTML = `
    <button class="order-info-close" onclick="fermerInfosLivraison()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="order-info-title">Votre ville</div>
    <input type="text" class="order-info-input" id="villeInput" placeholder="Ex : Bouaké, Yamoussoukro...">
    <textarea class="order-info-textarea" id="adresseDetail" placeholder="Précisez votre quartier, votre rue, un repère..."></textarea>
    <div class="order-info-actions">
      <button class="order-info-back" onclick="renderEtapeZone()">← Retour</button>
      <button class="order-info-next" onclick="validerHorsAbidjan()">Continuer</button>
    </div>
  `;
}

function validerHorsAbidjan(){
  const ville = document.getElementById('villeInput').value.trim();
  const detail = document.getElementById('adresseDetail').value.trim();
  if(!ville){ alert('Veuillez indiquer votre ville.'); return; }
  livraisonInfo.ville = ville;
  livraisonInfo.detail = detail;
  renderEtapeRecap();
}

// ÉTAPE 2c — International
function renderEtapeInternational(){
  document.getElementById('orderInfoModal').innerHTML = `
    <button class="order-info-close" onclick="fermerInfosLivraison()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="order-info-title">Votre pays</div>
    <select class="order-info-select" id="paysSelect">
      <option value="">-- Choisir un pays --</option>
      ${PAYS_LISTE.map(p => `<option value="${p}">${p}</option>`).join('')}
    </select>
    <textarea class="order-info-textarea" id="adresseDetail" placeholder="Ville, adresse complète..."></textarea>
    <div class="order-info-actions">
      <button class="order-info-back" onclick="renderEtapeZone()">← Retour</button>
      <button class="order-info-next" onclick="validerInternational()">Continuer</button>
    </div>
  `;
}

function validerInternational(){
  const pays = document.getElementById('paysSelect').value;
  const detail = document.getElementById('adresseDetail').value.trim();
  if(!pays){ alert('Veuillez choisir un pays.'); return; }
  livraisonInfo.pays = pays;
  livraisonInfo.detail = detail;
  renderEtapeRecap();
}

// ÉTAPE 3 — Récapitulatif
function renderEtapeRecap(){
  let lieuTexte = '';
  if(livraisonInfo.zone === 'abidjan'){
    lieuTexte = `Abidjan — ${livraisonInfo.commune}`;
  } else if(livraisonInfo.zone === 'horsAbidjan'){
    lieuTexte = `${livraisonInfo.ville} (Côte d'Ivoire)`;
  } else if(livraisonInfo.zone === 'international'){
    lieuTexte = livraisonInfo.pays;
  }

  document.getElementById('orderInfoModal').innerHTML = `
    <button class="order-info-close" onclick="fermerInfosLivraison()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="order-info-title">Vérifiez vos informations</div>
    <div class="order-info-recap">
      <strong>Lieu :</strong> ${lieuTexte}<br>
      ${livraisonInfo.detail ? `<strong>Adresse :</strong> ${livraisonInfo.detail}` : ''}
    </div>
    <div class="order-info-actions">
      <button class="order-info-back" onclick="fermerInfosLivraison()">Annuler</button>
      <button class="order-info-next" onclick="envoyerCommandeFinale()">Valider et envoyer</button>
    </div>
  `;
}

// ENVOI FINAL VERS WHATSAPP
function envoyerCommandeFinale(){

  let message = 'Bonjour, je souhaite commander :%0A%0A';

  panier.forEach(item => {
    const sousTotal = item.prix * item.quantite;
    message += `• ${item.nom} x${item.quantite} — ${sousTotal.toLocaleString('fr-FR')} FCFA%0A`;
  });

  const total = panier.reduce((s, i) => s + i.prix * i.quantite, 0);
  message += `%0ATotal : ${total.toLocaleString('fr-FR')} FCFA%0A%0A`;

  message += `📍 Livraison :%0A`;
  if(livraisonInfo.zone === 'abidjan'){
    message += `Abidjan — ${livraisonInfo.commune}%0A`;
  } else if(livraisonInfo.zone === 'horsAbidjan'){
    message += `${livraisonInfo.ville} (Côte d'Ivoire)%0A`;
  } else if(livraisonInfo.zone === 'international'){
    message += `${livraisonInfo.pays}%0A`;
  }
  if(livraisonInfo.detail){
    message += `Adresse : ${livraisonInfo.detail}%0A`;
  }

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

  fermerInfosLivraison();
}

/* ======================================================
CLIENT ACCESS
====================================================== */

function accederClient(){

  const id = document
  .getElementById('clientIdInput')
  .value
  .trim()
  .toUpperCase();

  if(!id) return;

  const membre = trouverMembre(id);

  if(membre){

    // On stocke le membre trouvé pour que client.html puisse l'afficher
    localStorage.setItem('membreActif', JSON.stringify(membre));

    window.open(
      `${CLIENT_PAGE}?id=${encodeURIComponent(id)}`,
      '_blank'
    );

  } else {

    alert('Identifiant introuvable');

  }

}



/* ======================================================
SEARCH
====================================================== */

document
.getElementById('searchInput')
.addEventListener('input', e => {

  const value = e.target.value.toLowerCase();

  const filtered = allProduits.filter(p => {

    return (
      (p.nom || '').toLowerCase().includes(value) ||
      (p.description || '').toLowerCase().includes(value) ||
      (p.collection || '').toLowerCase().includes(value)
    );

  });

  renderProducts(filtered);

});
