import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";

// Select the root element from the DOM
const rootElement = document.getElementById("root");

// Create a React root using createRoot and render the app
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  },
});
