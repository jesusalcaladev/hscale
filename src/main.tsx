import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HScale } from "./hscale";
import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <HScale />
  </StrictMode>,
);
