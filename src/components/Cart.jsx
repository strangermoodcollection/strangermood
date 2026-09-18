import { price } from "../data/format.js";
export default function Cart({
  open,
  toggle,
  items,
  changeQuantity,
  checkout,
}) {
  const total = items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  return (
    <div className={`cart-panel${open ? " open" : ""}`} id="cartPanel">
      <div className="cart-panel-header">
        <button className="cart-back-btn" onClick={toggle}>
          ← Retour
        </button>
        <span>Mon panier</span>
      </div>
      <div className="ham-cart-items" id="hamCartItems">
        {!items.length ? (
          <p className="ham-cart-empty">Votre panier est vide.</p>
        ) : (
          items.map((item) => (
            <div className="ham-cart-item" key={item.id}>
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200"
                }
                className="ham-cart-img"
                alt={item.nom}
              />
              <div className="ham-cart-info">
                <div className="ham-cart-name">{item.nom}</div>
                <div className="ham-cart-price">{price(item.prix)}</div>
              </div>
              <div className="ham-cart-actions">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  aria-label={`Diminuer ${item.nom}`}
                >
                  −
                </button>
                <span>{item.quantite}</span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  aria-label={`Augmenter ${item.nom}`}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        className="ham-cart-total"
        id="hamCartTotal"
        style={{ display: items.length ? "flex" : "none" }}
      >
        <span>Total</span>
        <span id="hamCartTotalPrice">{price(total)}</span>
      </div>
      <button
        className="cart-validate-btn"
        id="cartValidateBtn"
        onClick={checkout}
        style={{ display: items.length ? "block" : "none" }}
      >
        Valider la commande
      </button>
    </div>
  );
}
