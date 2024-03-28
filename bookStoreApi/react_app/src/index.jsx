import React from "react";
import { createRoot } from "react-dom";

import AppWrapper from "./AppWrapper";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
);
