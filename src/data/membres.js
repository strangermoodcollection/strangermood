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
    id: "SM-9637",
    nom: "ABE Désiré",
    statut: "Membre Gold",
    dateAdhesion: "10/09/2026",
    reduction: "15%",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",

    commandes: [
      {
        numero: "CMD-0001",
        date: "2026-09-10",
        produits: [
          {
            nom: "T-shirt Slim FREEDOM",
            image: "https://i.postimg.cc/B6q0mj79/IMG-6766.png",
            quantite: 1,
            prixUnitaire: 4800,
          },
          {
            nom: "Débardeur vibe street",
            image: "https://i.postimg.cc/sxqZK8B1/image-(13).png",
            quantite: 1,
            prixUnitaire: 2900,
          },
        ],
      },
      
      
    ],
  },


  {
    id: "SM-5190",
    nom: "Joseph Amani",
    statut: "Membre Silver",
    dateAdhesion: "16/09/2026",
    reduction: "18%",
    photo:
      "",

    commandes: [
      {
        numero: "CMD-0001",
        date: "2026-09-10",
        produits: [
          {
            nom: "T-shirt Slim FREEDOM",
            image: "https://i.postimg.cc/B6q0mj79/IMG-6766.png",
            quantite: 1,
            prixUnitaire: 4800,
          },
          
        ],
      },
    ],
  },




  
  {
    id: "999",
    nom: "999",
    statut: "Membre Gold",
    dateAdhesion: "17/01/2021",
    reduction: "50%",
    photo:
      "https://i.postimg.cc/wx2dwhBV/IMG-3106.jpg",

    commandes: [
      {
        numero: "CMD-0001",
        date: "2026-09-10",
        produits: [
          {
            nom: "T-shirt Slim FREEDOM",
            image: "https://i.postimg.cc/B6q0mj79/IMG-6766.png",
            quantite: 1,
            prixUnitaire: 4800,
          },
          
        ],
      },
    ],
  },






  {
    id: "667",
    nom: "Stan Ogochumaru",
    statut: "Membre Gold",
    dateAdhesion: "11/09/2025",
    reduction: "15%",
    photo:
      "https://i.postimg.cc/4dY9Xj0S/Whats-App-Image-2026-09-19-at-2-32-55-PM.jpg",

    commandes: [
      {
        numero: "CMD-0001",
        date: "2026-09-10",
        produits: [
          {
            nom: "T-shirt Slim FREEDOM",
            image: "https://i.postimg.cc/B6q0mj79/IMG-6766.png",
            quantite: 1,
            prixUnitaire: 4800,
          },
          
        ],
      },
    ],
  },

];

/* Cherche un membre par id (insensible à la casse) */
export function trouverMembre(id) {
  if (!id) return null;
  return (
    MEMBRES.find((m) => m.id.toUpperCase() === id.trim().toUpperCase()) || null
  );
}
