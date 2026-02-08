import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const authBtn = document.getElementById('authBtn');
const toggleAuth = document.getElementById('toggleAuth');
let isRegisterMode = false; // Başlangıçta giriş modunda

// Giriş ve Kayıt Arasında Geçiş Yap
toggleAuth.addEventListener('click', () => {
    isRegisterMode = !isRegisterMode;
    document.getElementById('authTitle').textContent = isRegisterMode ? "Kayıt Ol" : "Giriş Yap";
    document.getElementById('registerFields').style.display = isRegisterMode ? "block" : "none";
    authBtn.textContent = isRegisterMode ? "Kayıt Ol" : "Giriş Yap";
    toggleAuth.textContent = isRegisterMode ? "Hesabın var mı? Giriş Yap" : "Hesabın yok mu? Kayıt Ol";
});

// Butona Basıldığında İşlem Yap
authBtn.addEventListener('click', async () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    try {
        if (isRegisterMode) {
            // KAYIT OLMA
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Başarıyla kayıt oldun!");
        } else {
            // GİRİŞ YAPMA
            await signInWithEmailAndPassword(auth, email, password);
        }
    } catch (error) {
        alert("Hata: " + error.message);
    }
});
