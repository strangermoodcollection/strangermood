import { useEffect, useRef, useState } from "react";

const HERO_IMAGES = [
  "https://i.postimg.cc/k4nmT21L/IMG-6767.png",

  // Remplace cette adresse par celle de ta deuxième image
  "https://i.postimg.cc/Nfqg0ZSq/Chat-GPT-Image-19-sept-2026-13-30-47.png",

  // Remplace cette adresse par celle de ta troisième image
  "https://i.postimg.cc/cLTZXCJc/Whats-App-Image-2026-09-18-at-11-25-22-PM.jpg",
];

export default function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionActive, setTransitionActive] = useState(true);

  const [autoPlay, setAutoPlay] = useState(true);
const [isDragging, setIsDragging] = useState(false);
const [dragX, setDragX] = useState(0);

const dragStartX = useRef(0);
const dragDistance = useRef(0);

  const slides = [...HERO_IMAGES, HERO_IMAGES[0]];

  useEffect(() => {
  if (!autoPlay) return;

  const interval = setInterval(() => {
    setCurrentSlide((slide) => slide + 1);
  }, 4500);

  return () => clearInterval(interval);
}, [autoPlay]);



function handlePointerDown(event) {
  setAutoPlay(false);
  setIsDragging(true);
  setTransitionActive(false);

  dragStartX.current = event.clientX;
  dragDistance.current = 0;
  setDragX(0);

  event.currentTarget.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
  if (!isDragging) return;

  let distance = event.clientX - dragStartX.current;

  // Petite résistance lorsqu'on essaie d'aller avant la première image
  if (currentSlide === 0 && distance > 0) {
    distance *= 0.25;
  }

  dragDistance.current = distance;
  setDragX(distance);
}

function handlePointerUp() {
  if (!isDragging) return;

  const distance = dragDistance.current;
  const minimumDistance = 50;

  setIsDragging(false);
  setTransitionActive(true);
  setDragX(0);

  if (distance <= -minimumDistance) {
    // Glissement vers la gauche : image suivante
    setCurrentSlide((slide) =>
      Math.min(slide + 1, HERO_IMAGES.length),
    );
  } else if (distance >= minimumDistance) {
    // Glissement vers la droite : image précédente
    setCurrentSlide((slide) => Math.max(slide - 1, 0));
  }

  dragDistance.current = 0;
}

  function handleTransitionEnd() {
    if (currentSlide === HERO_IMAGES.length) {
      setTransitionActive(false);
      setCurrentSlide(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionActive(true);
        });
      });
    }
  }


  return (
    <section className="hero">
      

      <div
        className={`hero-slider ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragX}px))`,
          transition: transitionActive
            ? "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)"
            : "none",

        }}
      >
  {slides.map((image, index) => (
    <div className="hero-slide" key={`${image}-${index}`}>
      <img src={image} alt="" draggable="false" /><img src={image} alt="" />
    </div>
  ))}
</div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-sub">Nouvelle Collection 2026</div>
        <h1 className="hero-title">
          FREEDOM
          <br />
          STREET
        </h1>
        <div className="hero-buttons">
          <button className="btn btn-white">Acheter</button>
          <button className="btn btn-dark">Explorer</button>
        </div>
      </div>
    </section>
  );
}
