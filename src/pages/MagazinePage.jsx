import { useEffect, useRef, useState } from "react";
import { PageFlip } from "page-flip";
import { MAGAZINES } from "../data/magazines.js";
import { useTheme } from "../hooks/useStoredState.js";

function BookReader({ magazine, onClose }) {
  const mount = useRef(null);
  const engine = useRef(null);
  const audio = useRef(null);
  const sound = useRef(true);
  const title = useRef(null);

  const [soundOn, setSoundOn] = useState(true);
  const [page, setPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [portrait, setPortrait] = useState(true);
  const [error, setError] = useState("");

  function unlockAudio() {
    if (!sound.current) return;

    try {
      const Audio =
        window.AudioContext || window.webkitAudioContext;

      if (!Audio) return;

      if (!audio.current) {
        audio.current = new Audio();
      }

      if (audio.current.state === "suspended") {
        audio.current.resume().catch(() => {});
      }
    } catch {
      // Le livre reste utilisable sans audio.
    }
  }

  function paperSound() {
    const ctx = audio.current;

    if (
      !sound.current ||
      !ctx ||
      ctx.state !== "running"
    ) {
      return;
    }

    // Froissement synthétique : aucun fichier MP3 nécessaire.
    const buffer = ctx.createBuffer(
      1,
      Math.floor(ctx.sampleRate * 0.28),
      ctx.sampleRate,
    );

    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    source.buffer = buffer;

    filter.type = "bandpass";
    filter.frequency.value = 1300;
    filter.Q.value = 0.6;

    const now = ctx.currentTime;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    source
      .connect(filter)
      .connect(gain)
      .connect(ctx.destination);

    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
    };

    source.start();
  }

  useEffect(() => {
    title.current?.focus();

    // Le moteur gère uniquement les éléments de ce conteneur.
    const host = document.createElement("div");
    mount.current.appendChild(host);


    

    const pages = magazine.pages.map((image, index) => {
      const sheet = document.createElement("div");
      sheet.className = "mag-sheet";

      sheet.dataset.density = "soft";

      

      const img = document.createElement("img");

      img.src = image.src;
      img.alt = image.alt || `Page ${index + 1}`;
      img.draggable = false;

      img.addEventListener(
        "error",
        () => {
          const message = document.createElement("p");

          message.textContent =
            `Image indisponible — page ${index + 1}`;

          sheet.replaceChildren(message);
        },
        { once: true },
      );

      sheet.appendChild(img);
      host.appendChild(sheet);

      return sheet;
    });


        const nodes = pages;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const book = new PageFlip(host, {
      width: 420,
      height: 520,

      size: "stretch",
      minWidth: 240,
      maxWidth: 420,
      minHeight: 320,
      maxHeight: 560,

      showCover: true,
      usePortrait: true,
      autoSize: true,
      maxShadowOpacity: 0.5,
      flippingTime: reducedMotion ? 350 : 2200,
      mobileScrollSupport: false,
      showPageCorners: true,
    });

    engine.current = book;

    book.on("init", () => {
      setReady(true);
      setPage(book.getCurrentPageIndex());
      setPortrait(book.getOrientation() === "portrait");
    });

    book.on("flip", (event) => {
      setPage(event.data);
    });

    book.on("changeOrientation", (event) => {
      setPortrait(event.data === "portrait");
    });

    book.on("changeState", (event) => {
      setBusy(event.data !== "read");

      if (event.data === "flipping") {
        paperSound();
      }
    });

    try {
      book.loadFromHTML(nodes);
    } catch {
      setError(
        "Le lecteur n’a pas pu démarrer. Rechargez la page.",
      );
    }

    return () => {
      engine.current = null;
      book.destroy();
      host.remove();
    };
  }, [magazine]);

  useEffect(() => {
    return () => {
      const ctx = audio.current;
      audio.current = null;

      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  const last = magazine.pages.length - 1;

  const end =
    portrait || page === 0
      ? page
      : Math.min(page + 1, last);

  function turn(direction) {
    const book = engine.current;

    if (
      !ready ||
      !book ||
      book.getState() !== "read"
    ) {
      return;
    }

    if (
      (direction < 0 && page === 0) ||
      (direction > 0 && end >= last)
    ) {
      return;
    }

    unlockAudio();

    if (direction > 0) {
      book.flipNext();
    } else {
      book.flipPrev();
    }
  }

  return (
    <section
      className="mag-reader"
      onPointerDownCapture={unlockAudio}
    >
      <div className="mag-reader-heading">
        <button
          className="mag-button"
          onClick={onClose}
        >
          ← Les éditions
        </button>

        <button
          className="mag-button"
          aria-pressed={soundOn}
          onClick={() => {
            sound.current = !sound.current;
            setSoundOn(sound.current);
            unlockAudio();
          }}
        >
          Son {soundOn ? "activé" : "désactivé"}
        </button>
      </div>

      <h1 ref={title} tabIndex={-1}>
        {magazine.titre}
      </h1>

      <p className="mag-hint">
        Tournez les pages avec les flèches ou en faisant
        glisser un coin.
      </p>

      {error && <p role="alert">{error}</p>}

      <div
        className="mag-stage"
        ref={mount}
        role="region"
        aria-label="Livre à feuilleter"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowRight" ||
            event.key === "ArrowLeft"
          ) {
            event.preventDefault();

            turn(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      />

      <div className="mag-controls">
        <button
          className="mag-button"
          disabled={!ready || busy || page === 0}
          onClick={() => turn(-1)}
        >
          ← Précédente
        </button>

        <span aria-live="polite">
          {page === end
            ? `Page ${page + 1}`
            : `Pages ${page + 1}–${end + 1}`}
          {" / "}
          {magazine.pages.length}
        </span>

        <button
          className="mag-button"
          disabled={!ready || busy || end >= last}
          onClick={() => turn(1)}
        >
          Suivante →
        </button>
      </div>

      <a
        className="mag-original"
        href={magazine.pages[page].src}
        target="_blank"
        rel="noopener noreferrer"
      >
        Agrandir l’image de la page {page + 1} ↗
      </a>
    </section>
  );
}

export default function MagazinePage() {
  const toggleTheme = useTheme();
  const [selected, setSelected] = useState(null);
  const opener = useRef(null);

  function close() {
    setSelected(null);

    requestAnimationFrame(() => {
      opener.current?.focus();
    });
  }

  return (
    <>
      <header className="mag-header">
        <a className="mag-brand" href="index.html">
          STRANGER MOOD
        </a>

        <div className="mag-header-actions">
          <a href="index.html#shop">Boutique</a>

          <button
            className="mag-button"
            onClick={toggleTheme}
            aria-label="Changer le thème"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="mag-main">
        {selected ? (
          <BookReader
            key={selected.id}
            magazine={selected}
            onClose={close}
          />
        ) : (
          <>
            <p className="mag-eyebrow">
              LE JOURNAL DE LA MAISON
            </p>

            <h1>
              STRANGER
              <br />
              MAGAZINE.
            </h1>

            <p className="mag-intro">
              Collections, silhouettes et histoires.
              Notre univers, page après page.
            </p>

            <div className="mag-grid">
              {MAGAZINES.map((magazine) => (
                <article
                  className="mag-edition"
                  key={magazine.id}
                >
                  <button
                    className="mag-cover"
                    disabled={magazine.pages.length < 2}
                    aria-label={`Lire ${magazine.titre}`}
                    onClick={(event) => {
                      opener.current = event.currentTarget;
                      setSelected(magazine);
                    }}
                  >
                    <img
                      src={magazine.pages[0]?.src}
                      alt={
                        magazine.pages[0]?.alt ||
                        magazine.titre
                      }
                    />

                    <span>Ouvrir le magazine ↗</span>
                  </button>

                  <p className="mag-eyebrow">
                    {magazine.pages.length} PAGES
                  </p>

                  <h2>{magazine.titre}</h2>
                  <p>{magazine.description}</p>
                </article>
              ))}
            </div>

            {!MAGAZINES.length && (
              <p>La première édition arrive bientôt.</p>
            )}
          </>
        )}
      </main>
    </>
  );
}