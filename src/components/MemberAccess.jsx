import { useState } from "react";
import { trouverMembre } from "../data/membres.js";
import { writeStorage } from "../hooks/useStoredState.js";
export default function MemberAccess() {
  const [id, setId] = useState("");
  function access() {
    if (!id.trim()) return;
    const member = trouverMembre(id);
    if (!member) return window.alert("Identifiant introuvable");
    writeStorage("membreActif", JSON.stringify(member));
    window.open(
      `client.html?id=${encodeURIComponent(member.id)}`,
      "_blank",
      "noopener",
    );
  }
  return (
    <section className="section" id="member">
      <div className="member-box">
        <div>
          <h2 className="member-title">
            MEMBERS
            <br />
            ACCESS
          </h2>
          <p className="member-desc">
            Accédez à votre carte membre, vos réductions exclusives et vos
            commandes.
          </p>
        </div>
        <div className="member-form">
          <input
            className="member-input"
            id="clientIdInput"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") access();
            }}
            placeholder="Votre identifiant"
            type="text"
          />
          <button className="member-btn" onClick={access}>
            Continuer
          </button>
        </div>
      </div>
    </section>
  );
}
