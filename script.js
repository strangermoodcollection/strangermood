

/* ======================================================
CONFIG
====================================================== */

const API = 'https://backend-xxgf.onrender.com';

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

let allProduits = [];

(async () => {

  try {

    const r = await fetch(`${API}/vetement/produits`);

    const data = await r.json();

    allProduits = data.produits || [];

    renderProducts(allProduits);

  } catch(e){

    document.querySelector('.product-grid').innerHTML = `
      <p>Impossible de charger les produits.</p>
    `;

  }

})();

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
PANIER
====================================================== */

let panier = JSON.parse(localStorage.getItem('panier') || '[]');

function majAffichagePanier() {

  const badge = document.getElementById('cartBadge');
  const count = document.getElementById('hamCartCount');
  const itemsEl = document.getElementById('hamCartItems');
  const totalEl = document.getElementById('hamCartTotal');
  const totalPrice = document.getElementById('hamCartTotalPrice');

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
CLIENT ACCESS
====================================================== */

async function accederClient(){

  const id = document
  .getElementById('clientIdInput')
  .value
  .trim()
  .toUpperCase();

  if(!id) return;

  try{

    const r = await fetch(
      `${API}/vetement/client/${encodeURIComponent(id)}`
    );

    if(r.ok){

      window.open(
        `${CLIENT_PAGE}?id=${encodeURIComponent(id)}&api=${encodeURIComponent(API)}`,
        '_blank'
      );

    } else {

      alert('Identifiant introuvable');

    }

  } catch {

    window.open(
      `${CLIENT_PAGE}?id=${encodeURIComponent(id)}&api=${encodeURIComponent(API)}`,
      '_blank'
    );

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

