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
    prix: 3700,
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
    nom: "Sac banane STRANGER",
    description: "Sac banane édition limitée",
    prix: 3200,
    collection: "Accessoires",
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
function toggleMenu() {
  const menu = document.getElementById('hamburgerMenu');
  const overlay = document.getElementById('hamOverlay');
  const isOpen = menu.classList.contains('open');

  menu.classList.toggle('open');
  overlay.classList.toggle('open');

  document.body.style.overflow = isOpen ? '' : 'hidden';
}



function togglePanier() {
  const panel = document.getElementById('cartPanel');
  panel.classList.toggle('open');
}

// Fermer en scrollant (desktop)
window.addEventListener('scroll', () => {
  const menu = document.getElementById('hamburgerMenu');
  if (menu.classList.contains('open')) {
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
          <button onclick="changerQuantite(${item.id}, -1)">−</button>
          <span>${item.quantite}</span>
          <button onclick="changerQuantite(${item.id}, 1)">+</button>
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
  const item = panier.find(i => i.id === id);
  if (!item) return;
  item.quantite += delta;
  if (item.quantite <= 0) panier = panier.filter(i => i.id !== id);
  majAffichagePanier();
}

// Init au chargement
majAffichagePanier();

/* ======================================================
VALIDER LA COMMANDE → WHATSAPP
====================================================== */

// Numéro WhatsApp qui reçoit les commandes (format international, SANS le +)
// Exemple Côte d'Ivoire : "2250700000000"
const WHATSAPP_NUMBER = "2250500090411"; // ⚠️ à remplacer par ton vrai numéro

function validerCommande(){

  if(panier.length === 0){
    alert('Votre panier est vide.');
    return;
  }

  let message = 'Bonjour, je souhaite commander :%0A%0A';

  panier.forEach(item => {
    const sousTotal = item.prix * item.quantite;
    message += `• ${item.nom} x${item.quantite} — ${sousTotal.toLocaleString('fr-FR')} FCFA%0A`;
  });

  const total = panier.reduce((s, i) => s + i.prix * i.quantite, 0);

  message += `%0ATotal : ${total.toLocaleString('fr-FR')} FCFA`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

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
