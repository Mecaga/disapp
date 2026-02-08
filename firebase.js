import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAzffyBznJFzt9-mixht5NGoLLFpomXE8",
  authDomain: "diapp-3a705.firebaseapp.com",
  projectId: "diapp-3a705",
  storageBucket: "diapp-3a705.firebasestorage.app",
  messagingSenderId: "681461127191",
  appId: "1:681461127191:web:cf762e58807aeb70d36452"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
