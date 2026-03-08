// assets/js/contact-firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4rJrN0-cwqbJkCumRD03v3l4BYRZd9V0",
  authDomain: "jcaf-cv.firebaseapp.com",
  databaseURL: "https://jcaf-cv-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jcaf-cv",
  storageBucket: "jcaf-cv.firebasestorage.app",
  messagingSenderId: "302374957020",
  appId: "1:302374957020:web:3702d65ccf993c0c9f6919",
  measurementId: "G-1VK9FW6VK9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function sanitizeText(str) {
  return String(str).replace(/[<>]/g, '').trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function saveMessage(name, email, message) {
  const contactFormRef = ref(database, "contactForm");
  const newMessageRef = push(contactFormRef);
  await set(newMessageRef, { name, email, message, createdAt: Date.now() });
}

export function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = sanitizeText(document.getElementById("name")?.value ?? "");
    const email = sanitizeText(document.getElementById("email")?.value ?? "");
    const message = sanitizeText(document.getElementById("message")?.value ?? "");

    if (name.length < 2) return alert("Por favor, escribe tu nombre.");
    if (!isValidEmail(email)) return alert("Por favor, introduce un email válido.");
    if (message.length < 10) return alert("El mensaje es demasiado corto.");

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    try {
      await saveMessage(name, email, message);
      form.reset();
      alert("Mensaje enviado correctamente");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensaje";
      }
    }
  });
}