

/* ======================================================
CONFIG
====================================================== */

const API = 'https://backend-xxgf.onrender.com';

const CLIENT_PAGE = 'client.html';

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

