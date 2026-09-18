import { useEffect, useState } from "react";

export function readStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Le site reste utilisable sans stockage. */
  }
}
export function readJSON(key, fallback) {
  try {
    return JSON.parse(readStorage(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function useCart() {
  const [items, setItems] = useState(() => {
    const saved = readJSON("panier", []);
    return Array.isArray(saved)
      ? saved.filter(
          (i) =>
            i &&
            i.id != null &&
            Number.isFinite(i.prix) &&
            Number.isInteger(i.quantite) &&
            i.quantite > 0,
        )
      : [];
  });
  useEffect(() => writeStorage("panier", JSON.stringify(items)), [items]);
  function add(product) {
    setItems((previous) =>
      previous.some((item) => item.id === product.id)
        ? previous.map((item) =>
            item.id === product.id
              ? { ...item, quantite: item.quantite + 1 }
              : item,
          )
        : [
            ...previous,
            {
              id: product.id,
              nom: product.nom,
              prix: product.prix,
              image: product.image_url,
              quantite: 1,
            },
          ],
    );
  }
  function changeQuantity(id, delta) {
    setItems((previous) =>
      previous
        .map((item) =>
          String(item.id) === String(id)
            ? { ...item, quantite: item.quantite + delta }
            : item,
        )
        .filter((item) => item.quantite > 0),
    );
  }
  return { items, add, changeQuantity };
}
export function useTheme() {
  const [dark, setDark] = useState(() => readStorage("theme") === "dark");
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    writeStorage("theme", dark ? "dark" : "light");
  }, [dark]);
  return () => setDark((previous) => !previous);
}
