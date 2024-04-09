import React from "react";
import { createRoot } from "react-dom/client";

import AppWrapper from "./AppWrapper";
import App from "./App";

const rootElement = document.getElementById("root");
console.log("hassooo")
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AppWrapper>
        <App />
      </AppWrapper>
    </React.StrictMode>,
  );
}
