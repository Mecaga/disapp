import { auth, db } from './firebase-config.js';
import { changeUserName, monitorAuthState } from './auth.js';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Kullanıcı giriş yaptığında arayüzü güncelle
monitorAuthState(
    (user) => {
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex';
        document.querySelector('.user-name').textContent = user.displayName || "Yeni Kullanıcı";
        if(user.displayName) {
            document.querySelector('.user-avatar').textContent = user.displayName.charAt(0).toUpperCase();
        }
    },
    () => {
        document.getElementById('authScreen').style.display = 'flex';
        document.getElementById('mainApp').style.display = 'none';
    }
);

// Profil Kaydet Butonu (İsim Değiştirme)
document.getElementById('saveProfileBtn').addEventListener('click', async () => {
    const newName = document.getElementById('customStatus').value; // Input ID'si
    const success = await changeUserName(newName);
    if(success) {
        alert("Profil güncellendi!");
        location.reload();
    }
});

// Mesaj Gönderme Fonksiyonu
window.sendMessage = async () => {
    const text = document.getElementById('messageInput').value;
    if(text.trim() !== "" && auth.currentUser) {
        await addDoc(collection(db, "messages"), {
            text: text,
            author: auth.currentUser.displayName || auth.currentUser.email,
            timestamp: serverTimestamp()
        });
        document.getElementById('messageInput').value = "";
    }
};
