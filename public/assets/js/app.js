import { setupBlastHover, setProgressBars, setupStars } from "./effects.js";
import { setupContactForm } from "./contact-firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  setupBlastHover();
  setProgressBars();
  setupStars();
  setupContactForm();
});