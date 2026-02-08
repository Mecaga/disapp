import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "BURAYA",
  authDomain: "BURAYA",
  databaseURL: "BURAYA",
  projectId: "BURAYA",
  storageBucket: "BURAYA",
  messagingSenderId: "BURAYA",
  appId: "BURAYA"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
