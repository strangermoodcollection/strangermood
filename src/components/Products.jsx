import { MINI_PRODUITS } from "../data/produits.js";
import { price } from "../data/format.js";
export function MiniProducts({ onSelect }) {
  return (
    <section className="mini-products-section">
      <div className="mini-products-scroll" id="miniProductsScroll">
        {MINI_PRODUITS.map((product) => (
          <div
            className="mini-product-card"
            key={product.id}
            onClick={() => onSelect(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(product);
              }
            }}
          >
            <img
              src={product.image_url}
              className="mini-product-img"
              alt={product.nom}
            />
            <div className="mini-product-name">{product.nom}</div>
            <div className="mini-product-price">{price(product.prix)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Products({ products, onAdd }) {
  return (
    <section className="section" id="shop">
      <div className="section-head">
        <div>
          <h2 className="section-title">Tendances du moment</h2>
          <p className="section-sub">
            Les pièces les plus populaires de la collection.
          </p>
        </div>
      </div>
      <div id="productsWrap">
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img
                  src={product.image_url}
                  className="product-image"
                  alt={product.nom}
                />
                <div className="product-tag">{product.collection || "NEW"}</div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAdd(product)}
                >
                  Acheter
                </button>
              </div>
              <div className="product-info">
                <div className="product-name">{product.nom}</div>
                <div className="product-category">
                  {product.description || "Streetwear premium"}
                </div>
                <div className="product-price">{price(product.prix)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProductModal({ product, onClose, onAdd }) {
  return (
    <div
      className={`product-modal-overlay${product ? " open" : ""}`}
      id="productModalOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="product-modal"
        id="productModal"
        role={product ? "dialog" : undefined}
        aria-modal={product ? true : undefined}
        aria-label={product?.nom}
      >
        {product && (
          <>
            <button
              className="product-modal-close"
              onClick={onClose}
              aria-label="Fermer"
            >
              ✕
            </button>
            <img
              src={product.image_url}
              className="product-modal-img"
              alt={product.nom}
            />
            <div className="product-modal-tag">
              {product.collection || "NEW"}
            </div>
            <div className="product-modal-name">{product.nom}</div>
            <div className="product-modal-desc">
              {product.description || ""}
            </div>
            <div className="product-modal-price">{price(product.prix)}</div>
            <button
              className="product-modal-add"
              onClick={() => onAdd(product)}
            >
              Ajouter au panier
            </button>
          </>
        )}
      </div>
    </div>
  );
}
