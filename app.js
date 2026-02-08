// Kullanıcı verisi saklama
let users = []; // {username, email, password}
let currentUser = null;
let messages = [];

// DOM elementleri
const registerScreen = document.getElementById('registerScreen');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');

const regUsername = document.getElementById('regUsername');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const registerBtn = document.getElementById('registerBtn');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');

const goToLogin = document.getElementById('goToLogin');
const goToRegister = document.getElementById('goToRegister');

const userDisplay = document.getElementById('userDisplay');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Kayıt ol
registerBtn.addEventListener('click', () => {
    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value.trim();

    if (!username || !email || !password) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    users.push({username, email, password});
    alert('Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.');

    // Ekranı Giriş olarak değiştir
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
});

// Giriş ekranına geçiş
goToLogin.addEventListener('click', () => {
    registerScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
});

goToRegister.addEventListener('click', () => {
    loginScreen.style.display = 'none';
    registerScreen.style.display = 'flex';
});

// Giriş yap
loginBtn.addEventListener('click', () => {
    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Email veya şifre yanlış!');
        return;
    }

    currentUser = user.username;
    userDisplay.textContent = currentUser;

    loginScreen.style.display = 'none';
    chatScreen.style.display = 'flex';
});

// Mesaj gönderme
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    messages.push({
        user: currentUser,
        text: text,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });

    renderMessages();
    messageInput.value = '';
}

function renderMessages() {
    messagesContainer.innerHTML = messages.map(msg => `
        <div class="message">
            <div class="message-user">${msg.user} • ${msg.time}</div>
            <div class="message-text">${msg.text}</div>
        </div>
    `).join('');

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
