import { trouverMembre } from "../data/membres.js";
import { readJSON, useTheme } from "../hooks/useStoredState.js";
export default function ClientPage() {
  useTheme();
  const id = new URLSearchParams(window.location.search).get("id");
  const membre =
    (id ? trouverMembre(id) : null) || readJSON("membreActif", null);
  return (
    <>
      <a href="index.html" className="back-link">
        ← Retour
      </a>
      <div id="content">
        {membre ? (
          <div className="card">
            <div className="card-logo">STRANGER MOOD</div>
            <div className="card-badge">{membre.statut}</div>
            <div className="card-top">
              <img className="card-photo" src={membre.photo} alt={membre.nom} />
              <div>
                <div className="card-name">{membre.nom}</div>
                <div className="card-id">{membre.id}</div>
              </div>
            </div>
            <div className="card-divider" />
            <div className="card-row">
              <span className="card-row-label">Membre depuis</span>
              <span className="card-row-value">{membre.dateAdhesion}</span>
            </div>
            <div className="card-row">
              <span className="card-row-label">Réduction</span>
              <span className="card-row-value card-reduction">
                {membre.reduction}
              </span>
            </div>
          </div>
        ) : (
          <div className="error-box">
            <h1>Membre introuvable</h1>
            <p>Cet identifiant ne correspond à aucun compte membre.</p>
            <a href="index.html">Retour à l'accueil</a>
          </div>
        )}
      </div>
    </>
  );
}
