import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// Fontawesome
import "./assets/fonts/fontawesome-free-6.6.0-web/css/all.min.css";

// Css
import "./assets/css/bootstrap-theme-cable.css";
import "./assets/css/index.css";

// Page
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
