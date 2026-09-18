export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">STRANGER MOOD</div>
        </div>
        <div className="footer-links">
          <div>
            <h4>Boutique</h4>
            <a href="#">Nouveautés</a>
            <a href="#">Collections</a>
          </div>
          <div>
            <h4>Aide</h4>
            <a href="#">Livraison</a>
            <a href="#">Contact</a>
          </div>
          <div>
            <h4>Réseaux</h4>
            <div className="footer-socials">
              <a
                aria-label="Instagram"
                className="social-icon"
                href="https://www.instagram.com/stranger_mood_collection?igsh=aDdyNnliemVteGMw&amp;utm_source=qr"
                rel="noopener"
                target="_blank"
              >
                <img
                  alt="Instagram"
                  src="https://img.icons8.com/color/96/instagram-new.png"
                />
              </a>
              <a
                aria-label="TikTok"
                className="social-icon"
                href="https://www.tiktok.com/@strangermood_official?_r=1&amp;_t=ZN-98ggoeLMmHO"
                rel="noopener"
                target="_blank"
              >
                <img
                  alt="TikTok"
                  src="https://img.icons8.com/color/96/tiktok--v1.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 STRANGER MOOD</div>
        <div>STREETWEAR CULTURE</div>
      </div>
    </footer>
  );
}
