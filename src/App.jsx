import { useEffect, useRef, useState } from "react";
import Navigation from "./components/Navigation.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Hero from "./components/Hero.jsx";
import Banner from "./components/Banner.jsx";
import Footer from "./components/Footer.jsx";
import MemberAccess from "./components/MemberAccess.jsx";
import {
  Products,
  MiniProducts,
  ProductModal,
} from "./components/Products.jsx";
import DeliveryModal from "./components/DeliveryModal.jsx";
import { PRODUITS } from "./data/produits.js";
import { useCart, useTheme } from "./hooks/useStoredState.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const openedAt = useRef(0);
  const { items, add, changeQuantity } = useCart();
  const toggleTheme = useTheme();
  function toggleMenu() {
    openedAt.current = Date.now();
    setMenuOpen((open) => !open);
  }
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow =
      menuOpen || product || deliveryOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, product, deliveryOpen]);
  useEffect(() => {
    let touchY = 0;
    const canClose = () => menuOpen && Date.now() - openedAt.current > 300;
    const scroll = () => {
      if (canClose()) setMenuOpen(false);
    };
    const start = (e) => {
      touchY = e.touches[0].clientY;
    };
    const move = (e) => {
      if (canClose() && Math.abs(e.touches[0].clientY - touchY) > 40)
        setMenuOpen(false);
    };
    const keydown = (e) => {
      if (e.key !== "Escape") return;
      if (deliveryOpen) setDeliveryOpen(false);
      else if (product) setProduct(null);
      else setMenuOpen(false);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("keydown", keydown);
    };
  }, [menuOpen, product, deliveryOpen]);
  const products = PRODUITS.filter((p) =>
    [p.nom, p.description, p.collection].some((value) =>
      (value || "").toLowerCase().includes(query.toLowerCase()),
    ),
  );
  return (
    <>
      <Navigation
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        cartOpen={cartOpen}
        toggleCart={() => setCartOpen((open) => !open)}
        items={items}
        changeQuantity={changeQuantity}
        checkout={() => {
          if (items.length) setDeliveryOpen(true);
        }}
        toggleTheme={toggleTheme}
      />
      <SearchBar value={query} onChange={setQuery} />
      <Hero />
      <MiniProducts onSelect={setProduct} />
      <Products products={products} onAdd={add} />
      <Banner />
      <MemberAccess />
      <Footer />
      <ProductModal
        product={product}
        onClose={() => setProduct(null)}
        onAdd={add}
      />
      {deliveryOpen && (
        <DeliveryModal items={items} onClose={() => setDeliveryOpen(false)} />
      )}
    </>
  );
}
