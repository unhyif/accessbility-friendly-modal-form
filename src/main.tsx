import "modern-normalize";

import ModalFormPage from "./ModalFormPage";
import { OverlayProvider } from "overlay-kit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <ModalFormPage />
    </OverlayProvider>
  </StrictMode>
);
