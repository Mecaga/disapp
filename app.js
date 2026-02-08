// Kullanıcı verisi
let currentUser = null;

// Mesajlar
let messages = [];

// DOM elementleri
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const userDisplay = document.getElementById('userDisplay');

// Giriş yap
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !email || !password) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    currentUser = username;
    userDisplay.textContent = `Kullanıcı: ${currentUser}`;
    loginScreen.style.display = 'none';
    chatScreen.style.display = 'flex';
});

// Enter tuşu ile mesaj gönderme
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Gönder butonu ile mesaj gönderme
sendBtn.addEventListener('click', sendMessage);

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // Mesajı ekle
    messages.push({
        user: currentUser,
        text: text,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });

    // Mesajları render et
    renderMessages();

    // Input temizle
    messageInput.value = '';
}

// Mesajları ekrana yazdırma
function renderMessages() {
    messagesContainer.innerHTML = messages.map(msg => {
        return `
            <div class="message">
                <div class="message-user">${msg.user} • ${msg.time}</div>
                <div class="message-text">${msg.text}</div>
            </div>
        `;
    }).join('');

    // Scroll en alta
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
