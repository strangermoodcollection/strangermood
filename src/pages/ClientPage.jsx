import { trouverMembre } from "../data/membres.js";
import { readJSON, useTheme } from "../hooks/useStoredState.js";

import MemberCard from "../components/MemberCard.jsx";


export default function ClientPage() {
  useTheme();
  const id = new URLSearchParams(window.location.search).get("id");
  const membreStocke = readJSON("membreActif", null);
const membre = trouverMembre(id || membreStocke?.id);
    return (
    <>
      <a href="index.html" className="back-link">
        ← Retour
      </a>

      <div id="content">
        {membre ? (
          <MemberCard membre={membre} />
        ) : (
          <div className="error-box">
            <h1>Membre introuvable</h1>

            <p>
              Cet identifiant ne correspond à aucun compte membre.
            </p>

            <a href="index.html">
              Retour à l'accueil
            </a>
          </div>
        )}
      </div>
    </>
  );
}
