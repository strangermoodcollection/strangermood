import { useState } from "react";
import {
  COMMUNES_ABIDJAN,
  PAYS_LISTE,
  WHATSAPP_NUMBER,
} from "../data/livraison.js";
import { price } from "../data/format.js";
import DeliveryZone from "./DeliveryZone.jsx";

export default function DeliveryModal({ items, onClose }) {
  const [step, setStep] = useState("zone");
  const [zone, setZone] = useState("");
  const [place, setPlace] = useState("");
  const [detail, setDetail] = useState("");
  const location =
    zone === "abidjan"
      ? `Abidjan — ${place}`
      : zone === "horsAbidjan"
        ? `${place} (Côte d'Ivoire)`
        : place;
  function chooseZone(value) {
    setZone(value);
    setPlace("");
    setDetail("");
    setStep("address");
  }
  function next() {
    if (!place.trim())
      return window.alert(
        zone === "abidjan"
          ? "Veuillez choisir une commune."
          : zone === "international"
            ? "Veuillez choisir un pays."
            : "Veuillez indiquer votre ville.",
      );
    setPlace(place.trim());
    setDetail(detail.trim());
    setStep("recap");
  }
  function send() {
    const total = items.reduce(
      (sum, item) => sum + item.prix * item.quantite,
      0,
    );
    const message = `Bonjour, je souhaite commander :\n\n${items.map((item) => `• ${item.nom} x${item.quantite} — ${price(item.prix * item.quantite)}`).join("\n")}\n\nTotal : ${price(total)}\n\n📍 Livraison :\n${location}\n${detail ? `Adresse : ${detail}\n` : ""}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
    onClose();
  }
  return (
    <div
      className="order-info-overlay open"
      id="orderInfoOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="order-info-modal"
        id="orderInfoModal"
        role="dialog"
        aria-modal="true"
        aria-label="Informations de livraison"
      >
        {step === "zone" ? (
          <DeliveryZone onClose={onClose} chooseZone={chooseZone} />
        ) : (
          <>
            <button
              className="order-info-close"
              onClick={onClose}
              aria-label="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {step === "address" ? (
              <>
                <div className="order-info-title">
                  {zone === "abidjan"
                    ? "Votre commune"
                    : zone === "horsAbidjan"
                      ? "Votre ville"
                      : "Votre pays"}
                </div>
                {zone === "horsAbidjan" ? (
                  <input
                    className="order-info-input"
                    id="villeInput"
                    type="text"
                    placeholder="Ex : Bouaké, Yamoussoukro..."
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  />
                ) : (
                  <select
                    className="order-info-select"
                    id={zone === "abidjan" ? "communeSelect" : "paysSelect"}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                  >
                    <option value="">
                      {zone === "abidjan"
                        ? "-- Choisir une commune --"
                        : "-- Choisir un pays --"}
                    </option>
                    {(zone === "abidjan" ? COMMUNES_ABIDJAN : PAYS_LISTE).map(
                      (value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ),
                    )}
                  </select>
                )}
                <textarea
                  className="order-info-textarea"
                  id="adresseDetail"
                  placeholder={
                    zone === "international"
                      ? "Ville, adresse complète..."
                      : "Précisez votre quartier, votre rue, un repère..."
                  }
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
                <div className="order-info-actions">
                  <button
                    className="order-info-back"
                    onClick={() => setStep("zone")}
                  >
                    ← Retour
                  </button>
                  <button className="order-info-next" onClick={next}>
                    Continuer
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="order-info-title">
                  Vérifiez vos informations
                </div>
                <div className="order-info-recap">
                  <strong>Lieu :</strong> {location}
                  <br />
                  {detail && (
                    <>
                      <strong>Adresse :</strong> {detail}
                    </>
                  )}
                </div>
                <div className="order-info-actions">
                  <button className="order-info-back" onClick={onClose}>
                    Annuler
                  </button>
                  <button className="order-info-next" onClick={send}>
                    Valider et envoyer
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
