import Cart from "./Cart.jsx";
export default function Navigation({
  menuOpen,
  toggleMenu,
  cartOpen,
  toggleCart,
  items,
  changeQuantity,
  checkout,
  toggleTheme,
}) {
  const count = items.reduce((sum, item) => sum + item.quantite, 0);
  return (
    <>
      <nav>
        <div className="nav-container">
          <div className="logo">STRANGER MOOD</div>
          <ul className="nav-links">
            <li>
              <a href="#shop">Nouveautés</a>
            </li>
            <li>
              <a href="#shop">Homme</a>
            </li>
            <li>
              <a href="#shop">Femme</a>
            </li>
            <li>
              <a href="#member">Membres</a>
            </li>
          </ul>
          <div className="nav-actions">
            <button
              aria-label="Menu"
              className="burger-btn"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
              <div
                key={count}
                className="cart-badge badge-pop"
                id="cartBadge"
                style={{ display: count ? "flex" : "none" }}
              >
                {count > 99 ? "99+" : count}
              </div>
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`hamburger-menu${menuOpen ? " open" : ""}`}
        id="hamburgerMenu"
      >
        <div className="ham-links">
          <a href="#shop" onClick={toggleMenu}>
            Nouveautés
          </a>
          <a href="#shop" onClick={toggleMenu}>
            Homme
          </a>
          <a href="#shop" onClick={toggleMenu}>
            Femme
          </a>
          <a href="#member" onClick={toggleMenu}>
            Membres
          </a>
        </div>

        <button className="ham-cart-btn" onClick={toggleCart}>
          <svg
            fill="none"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <line strokeLinecap="round" x1="3" x2="21" y1="6" y2="6"></line>
            <path
              d="M16 10a4 4 0 01-8 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Panier
          <span className="ham-cart-count" id="hamCartCount">
            {count}
          </span>
        </button>

        <Cart
          open={cartOpen}
          toggle={toggleCart}
          items={items}
          changeQuantity={changeQuantity}
          checkout={checkout}
        />
        <div className="ham-bottom">
          <span>Mode sombre</span>
          <button className="theme-btn" onClick={toggleTheme}>
            🌙
          </button>
        </div>
      </div>
      <div
        className={`ham-overlay${menuOpen ? " open" : ""}`}
        id="hamOverlay"
        onClick={toggleMenu}
      />
    </>
  );
}
