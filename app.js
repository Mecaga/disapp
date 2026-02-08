// Elementleri seç
const welcomeScreen = document.getElementById('welcomeScreen');
const registerScreen = document.getElementById('registerScreen');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');

const showRegisterBtn = document.getElementById('showRegisterBtn');
const showLoginBtn = document.getElementById('showLoginBtn');

const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');

const currentUserSpan = document.getElementById('currentUser');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const messagesContainer = document.getElementById('messagesContainer');

// Kayıt/Giriş ekranlarını göster
showRegisterBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    registerScreen.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
});

// Kayıt ol
registerBtn.addEventListener('click', () => {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!username || !email || !password) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    // Kullanıcıyı localStorage'a kaydet
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
        alert('Bu Gmail zaten kayıtlı!');
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Kayıt başarılı! Mesaj ekranına yönlendiriliyorsunuz.');

    registerScreen.classList.add('hidden');
    chatScreen.classList.remove('hidden');

    currentUserSpan.textContent = username;
});

// Giriş yap
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        alert('Giriş bilgileri yanlış!');
        return;
    }

    loginScreen.classList.add('hidden');
    chatScreen.classList.remove('hidden');

    currentUserSpan.textContent = user.username;
});

// Mesaj gönderme
const messages = [];

function renderMessages() {
    messagesContainer.innerHTML = messages.map((msg, index) => {
        return `<div class="message">
                    <span class="author">${msg.author}:</span>
                    <span class="text">${msg.text}</span>
                </div>`;
    }).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (!text) return;

    const author = currentUserSpan.textContent;
    messages.push({ author, text });

    renderMessages();
    messageInput.value = '';
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
