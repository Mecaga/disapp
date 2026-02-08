import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Senin Firebase Bilgilerin
const firebaseConfig = {
    apiKey: "AIzaSyDbIFwbCiLlSLDMjaOq_lViHc_yFm9fbLw",
    authDomain: "whatsapp-a0929.firebaseapp.com",
    projectId: "whatsapp-a0929",
    storageBucket: "whatsapp-a0929.firebasestorage.app",
    messagingSenderId: "303101771948",
    appId: "1:303101771948:web:d0ecf61acfc6ed73459f09"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

        // Online yap
        db.ref('users/' + email + '/online').set(true);

        showChatScreen(data.username, email);
    });
});

// Fonksiyonlar
function showLoginScreen() {
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'block';
    switchToLogin.style.display = 'none';
    switchToRegister.style.display = 'block';
}

function showChatScreen(username, email) {
    document.getElementById('welcomeScreen').style.display = 'none';
    chatScreen.style.display = 'block';
    chatWelcome.textContent = `Hoşgeldin, ${username}!`;
}
