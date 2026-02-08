import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Panelinden aldığın güncel bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyAsUVL3qL9LZZy1Jgkvayww0TZvdODBcr0",
  authDomain: "what-ap.firebaseapp.com",
  projectId: "what-ap",
  storageBucket: "what-ap.firebasestorage.app",
  messagingSenderId: "365632298956",
  appId: "1:365632298956:web:9b8abf2b8bd982570ac769"
};

// Başlatma
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
