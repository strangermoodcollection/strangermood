import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MagazinePage from "./pages/MagazinePage.jsx";

import "./styles/style.css";
import "./styles/theme.css";
import "./styles/magazine.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MagazinePage />
  </StrictMode>,
);