import { auth } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// --- DEĞİŞKENLER VE ELEMENTLER ---
const authBtn = document.getElementById('authBtn');
const toggleAuth = document.getElementById('toggleAuth');
const authTitle = document.getElementById('authTitle');
const registerFields = document.getElementById('registerFields');

let isRegisterMode = false; // Varsayılan olarak Giriş ekranı

// --- GİRİŞ / KAYIT MODU DEĞİŞTİRME ---
toggleAuth.addEventListener('click', () => {
    isRegisterMode = !isRegisterMode;
    
    if (isRegisterMode) {
        authTitle.textContent = "MecagaChat'e Kayıt Ol";
        authBtn.textContent = "Kayıt Ol";
        toggleAuth.textContent = "Zaten hesabın var mı? Giriş Yap";
        registerFields.style.display = "block";
    } else {
        authTitle.textContent = "MecagaChat'e Giriş Yap";
        authBtn.textContent = "Giriş Yap";
        toggleAuth.textContent = "Hesabın yok mu? Kayıt Ol";
        registerFields.style.display = "none";
    }
});

// --- ANA İŞLEM (BUTONA BASILDIĞINDA) ---
authBtn.addEventListener('click', async () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const username = document.getElementById('authUsername').value;

    if (!email || !password) {
        alert("Lütfen e-posta ve şifre alanlarını doldurun!");
        return;
    }

    try {
        if (isRegisterMode) {
            // 1. Kayıt İşlemi
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // 2. Kullanıcı adını Firebase profiline kaydet
            await updateProfile(userCredential.user, {
                displayName: username
            });
            alert("Kayıt başarılı! Hoş geldin, " + username);
        } else {
            // 1. Giriş İşlemi
            await signInWithEmailAndPassword(auth, email, password);
            alert("Giriş yapıldı!");
        }
    } catch (error) {
        console.error("Hata Detayı:", error);
        
        // Hataları Türkçeleştirme
        if (error.code === 'auth/email-already-in-use') alert("Bu e-posta adresi zaten kullanımda!");
        else if (error.code === 'auth/weak-password') alert("Şifre çok zayıf (en az 6 karakter olmalı)!");
        else if (error.code === 'auth/invalid-email') alert("Geçersiz e-posta adresi!");
        else if (error.code === 'auth/user-not-found') alert("Kullanıcı bulunamadı!");
        else if (error.code === 'auth/wrong-password') alert("Hatalı şifre!");
        else alert("Bir hata oluştu: " + error.message);
    }
});

// --- OTURUM DURUMUNU TAKİP ET ---
onAuthStateChanged(auth, (user) => {
    const mainApp = document.getElementById('mainApp');
    const authScreen = document.getElementById('authScreen');
    const displayUserName = document.getElementById('displayUserName');

    if (user) {
        // Kullanıcı giriş yapmışsa
        authScreen.style.display = "none";
        mainApp.style.display = "flex";
        displayUserName.textContent = user.displayName || user.email;
        
        // Avatar baş harfi
        const avatar = document.querySelector('.user-avatar');
        if (avatar && user.displayName) {
            avatar.textContent = user.displayName.charAt(0).toUpperCase();
        }
    } else {
        // Kullanıcı çıkış yapmışsa veya giriş yapmamışsa
        authScreen.style.display = "flex";
        mainApp.style.display = "none";
    }
});
        // Kullanıcı giriş yapmışsa
        authScreen.style.display = "none";
        mainApp.style.display = "flex";
        displayUserName.textContent = user.displayName || user.email;
        
        // Avatar baş harfi
        const avatar = document.querySelector('.user-avatar');
        if (avatar && user.displayName) {
            avatar.textContent = user.displayName.charAt(0).toUpperCase();
        }
    } else {
        // Kullanıcı çıkış yapmışsa veya giriş yapmamışsa
        authScreen.style.display = "flex";
        mainApp.style.display = "none";
    }
});
<script type="module" src="app.js"></script>
// --- KATEGORİ VE KANAL LİSTELEME SİSTEMİ ---
const categoriesContainer = document.getElementById('categoriesContainer');

// Şimdilik bunları el ile (statik) ekliyoruz, ilerde Firestore'a bağlayabiliriz
const defaultCategories = [
    {
        name: "Metin Kanalları",
        channels: [
            { id: "genel", name: "genel", type: "text" },
            { id: "yardim", name: "yardım-destek", type: "text" }
        ]
    },
    {
        name: "Ses Kanalları",
        channels: [
            { id: "sohbet-ses", name: "Sohbet Odası", type: "voice" }
        ]
    }
];

function renderCategories() {
    if (!categoriesContainer) return;

    categoriesContainer.innerHTML = defaultCategories.map(cat => `
        <div class="category">
            <div class="category-header" style="padding: 10px; color: #8e9297; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                ▼ ${cat.name}
            </div>
            <div class="category-items">
                ${cat.channels.map(chan => `
                    <div class="channel-item" onclick="selectChannel('${chan.id}')" style="padding: 6px 20px; color: #8e9297; cursor: pointer; border-radius: 4px; margin: 2px 8px;">
                        <span style="margin-right: 8px;">${chan.type === 'text' ? '#' : '🔊'}</span>
                        ${chan.name}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Kanal seçme fonksiyonu
window.selectChannel = (channelId) => {
    document.querySelector('.chat-header-name').textContent = "# " + channelId;
    console.log("Kanal seçildi: ", channelId);
    // Burada o kanala ait mesajları yükleme kodu gelecek
};

// Sayfa yüklendiğinde kategorileri bas
renderCategories();
