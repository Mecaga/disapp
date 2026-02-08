// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCAzffyBznJFzt9-mixht5NGoLLFpomXE8",
  authDomain: "diapp-3a705.firebaseapp.com",
  databaseURL: "https://diapp-3a705-default-rtdb.firebaseio.com",
  projectId: "diapp-3a705",
  storageBucket: "diapp-3a705.firebasestorage.app",
  messagingSenderId: "681461127191",
  appId: "1:681461127191:web:cf762e58807aeb70d36452"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elementleri
const registerScreen = document.getElementById('registerScreen');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const chatWelcome = document.getElementById('chatWelcome');

const switchToLogin = document.getElementById('switchToLogin');
const switchToRegister = document.getElementById('switchToRegister');

// Toggle form ekranları
switchToLogin.addEventListener('click', () => {
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'block';
    switchToLogin.style.display = 'none';
    switchToRegister.style.display = 'block';
});

switchToRegister.addEventListener('click', () => {
    loginScreen.style.display = 'none';
    registerScreen.style.display = 'block';
    switchToLogin.style.display = 'block';
    switchToRegister.style.display = 'none';
});

// Toggle password show/hide
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});

// Kayıt ol
document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim().replace('.', ',');
    const password = document.getElementById('regPassword').value.trim();

    if (!username || !email || !password) return alert('Tüm alanları doldur!');

    db.ref('users/' + email).get().then(snapshot => {
        if (snapshot.exists()) {
            alert('Bu email zaten kayıtlı!');
        } else {
            db.ref('users/' + email).set({
                username: username,
                password: password,
                online: true
            });
            alert('Kayıt başarılı!');
            showLoginScreen();
        }
    });
});

// Giriş yap
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim().replace('.', ',');
    const password = document.getElementById('loginPassword').value.trim();

    db.ref('users/' + email).get().then(snapshot => {
        if (!snapshot.exists()) return alert('Kayıt bulunamadı!');
        const data = snapshot.val();
        if (data.password !== password) return alert('Şifre yanlış!');

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
