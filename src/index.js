import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root instance

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
