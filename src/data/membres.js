/* ============================================================
   BASE DE DONNÉES DES MEMBRES (statique)
   ------------------------------------------------------------
   Pas de backend : chaque membre est un objet dans ce tableau.
   Pour ajouter un membre, copie un bloc { ... } et change les
   infos, puis ajoute une virgule avant le suivant.

   Champs utilisés pour la carte membre (à adapter si besoin) :
   - id            → identifiant que le client tape sur le site
   - nom           → nom affiché sur la carte
   - statut        → ex: "Membre Gold", "Membre Silver"
   - dateAdhesion  → date d'inscription
   - reduction     → réduction accordée
   - photo         → image / avatar affiché sur la carte
============================================================ */

export const MEMBRES = [
  {
    id: "SM-0001",
    nom: "Jean Kouassi",
    statut: "Membre Gold",
    dateAdhesion: "12/01/2026",
    reduction: "15%",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: "SM-0002",
    nom: "Aïcha Traoré",
    statut: "Membre Silver",
    dateAdhesion: "03/03/2026",
    reduction: "10%",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400",
  },
];

/* Cherche un membre par id (insensible à la casse) */
export function trouverMembre(id) {
  if (!id) return null;
  return (
    MEMBRES.find((m) => m.id.toUpperCase() === id.trim().toUpperCase()) || null
  );
}
