import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";
import logoFav from "./assets/logo_fav.png";
// @ts-ignore
import "./index.css";

const ensureFavicon = () => {
  if (typeof document === "undefined") return;
  const existing = document.querySelector("link[rel='icon']");
  if (existing) {
    (existing as HTMLLinkElement).href = logoFav;
    return;
  }

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = logoFav;
  document.head.appendChild(link);
};

ensureFavicon();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
