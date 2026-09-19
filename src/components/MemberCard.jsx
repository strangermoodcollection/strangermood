import { useEffect } from "react";


const formatPrix = (valeur) =>
  `${Number(valeur || 0).toLocaleString("fr-FR")} FCFA`;

function formatDate(date) {
  const valeur = new Date(`${date}T12:00:00`);

  if (Number.isNaN(valeur.getTime())) return date;

  return valeur.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MemberCard({ membre }) {
  const commandes = Array.isArray(membre.commandes)
    ? membre.commandes
    : [];

  const nombreArticles = commandes.reduce(
    (total, commande) =>
      total +
      (commande.produits || []).reduce(
        (somme, produit) => somme + Number(produit.quantite || 0),
        0,
      ),
    0,
  );

  const reduction = String(membre.reduction || "0%");
  const aReduction =
    Number.parseFloat(reduction.replace(",", ".")) > 0;

  useEffect(() => {
    document.body.classList.add("member-dashboard");

    return () => {
      document.body.classList.remove("member-dashboard");
    };
  }, []);

  return (
    <main className="sm-member">
      <header className="sm-member-heading">
        <span className="sm-member-eyebrow">
          STRANGER MOOD — ESPACE MEMBRE
        </span>

        <h1>
          Votre style.
          <br />
          Votre histoire.
        </h1>

        <p>
          Retrouvez vos achats et les avantages réservés aux membres
          de la maison.
        </p>
      </header>

      <section className="sm-member-overview">
        <article className="sm-membership">


            <svg
  className="sm-membership-watermark"
  viewBox="0 0 1400 1120"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <g fill="currentColor">
    {/* Traits montants du monogramme */}
    <path
      d="
        M 126 1070
        L 638 167
        L 615 511
        L 955 44
        L 706 741
        L 660 728
        L 801 331
        L 531 727
        L 576 382
        L 234 985
        Z
      "
    />

    {/* Trait transversal */}
    <path
      d="
        M 157 588
        L 1327 377
        L 1341 421
        L 168 632
        Z
      "
    />

    {/* Pointe et trait inférieur */}
    <path
      d="
        M 126 1070
        L 1191 632
        L 444 558
        L 422 600
        L 1034 653
        L 234 986
        Z
      "
    />
  </g>
</svg>




          <div className="sm-membership-top">
            <span className="sm-membership-brand">
              STRANGER MOOD
            </span>

            <span className="sm-membership-status">
              {membre.statut || "Membre"}
            </span>
          </div>

          <div className="sm-membership-person">
            {membre.photo ? (
              <img
                className="sm-membership-avatar"
                src={membre.photo}
                alt={membre.nom}
              />
            ) : (
              <div className="sm-membership-initial">
                {membre.nom?.trim().charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <span className="sm-membership-label">
                CARTE MEMBRE
              </span>

              <h2>{membre.nom}</h2>
            </div>
          </div>

          <div className="sm-membership-bottom">
            <div>
              <span className="sm-membership-label">
                IDENTIFIANT 
              </span>

              <strong>{membre.id}</strong>
            </div>

            <div>
              <span className="sm-membership-label">
                MEMBRE DEPUIS
              </span>

              <strong>{membre.dateAdhesion}</strong>
            </div>
          </div>
        </article>

        <aside className="sm-member-benefit">
          <span className="sm-member-eyebrow">
            VOTRE AVANTAGE
          </span>

          <div className="sm-member-discount">
            {aReduction ? `−${reduction.replace(/^[−-]/, "")}` : "—"}
          </div>

          <h2>
            {aReduction
              ? "Un privilège pour la suite."
              : "L’histoire commence ici."}
          </h2>

          <p>
            {aReduction
              ? "Une réduction vous est réservée sur votre prochaine commande. Communiquez votre identifiant lors de votre achat."
              : "Vos prochaines offres personnalisées apparaîtront ici lorsqu’elles vous seront attribuées."}
          </p>

          <a href="index.html#shop" className="sm-member-shop">
            Retour à la collection <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </section>

      <section
        className="sm-member-stats"
        aria-label="Votre activité"
      >
        <div className="sm-member-stat">
          <strong>{String(commandes.length).padStart(2, "0")}</strong>
          <span>
            {commandes.length === 1 ? "Commande" : "Commandes"}
          </span>
        </div>

        <div className="sm-member-stat">
          <strong>{String(nombreArticles).padStart(2, "0")}</strong>
          <span>
            {nombreArticles === 1
              ? "Pièce achetée"
              : "Pièces achetées"}
          </span>
        </div>

        <div className="sm-member-stat">
          <strong>{aReduction ? reduction : "0%"}</strong>
          <span>Réduction attribuée</span>
        </div>
      </section>

      <section className="sm-member-history">
        <div className="sm-member-section-heading">
          <div>
            <span className="sm-member-eyebrow">
              VOTRE SÉLECTION
            </span>
            <h2>Vos commandes</h2>
          </div>

          <span className="sm-member-history-count">
            {commandes.length}
          </span>
        </div>

        {commandes.length === 0 ? (
          <div className="sm-member-empty">
            <h3>Votre historique arrive bientôt.</h3>
            <p>
              Vos achats apparaîtront ici une fois ajoutés à votre
              fiche membre.
            </p>
          </div>
        ) : (
          [...commandes]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((commande) => {
              const produits = commande.produits || [];

              const total = produits.reduce(
                (somme, produit) =>
                  somme +
                  Number(produit.prixUnitaire || 0) *
                    Number(produit.quantite || 0),
                0,
              );

              return (
                <article
                  className="sm-member-order"
                  key={commande.numero}
                >
                  <header className="sm-member-order-heading">
                    <div>
                      <h3>{commande.numero}</h3>
                      <time dateTime={commande.date}>
                        {formatDate(commande.date)}
                      </time>
                    </div>

                    <span className="sm-member-order-total">
                      {formatPrix(total)}
                    </span>
                  </header>

                  <div className="sm-member-purchases">
                    {produits.map((produit, index) => (
                      <div
                        className="sm-member-purchase"
                        key={`${commande.numero}-${index}`}
                      >
                        <div className="sm-member-product-image">
                          {produit.image ? (
                            <img
                              src={produit.image}
                              alt={produit.nom}
                              loading="lazy"
                            />
                          ) : (
                            <span>STRANGER MOOD</span>
                          )}
                        </div>

                        <div className="sm-member-product-info">
                          <h4>{produit.nom}</h4>
                          <p>Quantité : {produit.quantite}</p>
                          <strong>
                            {formatPrix(
                              produit.prixUnitaire * produit.quantite,
                            )}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })
        )}
      </section>

      <footer className="sm-member-footer">
        <span>STRANGER MOOD</span>
        <span>STREETWEAR CULTURE</span>
      </footer>
    </main>
  );
}