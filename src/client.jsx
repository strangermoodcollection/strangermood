import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ClientPage from "./pages/ClientPage.jsx";
import "./styles/client.css";

import "./styles/member-card.css";
import "./styles/theme.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClientPage />
  </StrictMode>,
);
