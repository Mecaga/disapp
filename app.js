// Kullanıcı verisi
let users = [];
let currentUser = null;
let messages = [];

// Ekranlar
const welcomeScreen = document.getElementById('welcomeScreen');
const registerScreen = document.getElementById('registerScreen');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');

// Butonlar
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const backToWelcome1 = document.getElementById('backToWelcome1');
const backToWelcome2 = document.getElementById('backToWelcome2');
const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const sendMessageBtn = document.getElementById('sendMessageBtn');

// Inputlar
const regUsername = document.getElementById('regUsername');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');
const currentUserSpan = document.getElementById('currentUser');

// Şifre göster/gizle
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input.type === 'password') input.type = 'text';
    else input.type = 'password';
  });
});

// Ekran geçişleri
showRegisterBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  registerScreen.classList.remove('hidden');
});

showLoginBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

backToWelcome1.addEventListener('click', () => {
  registerScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});

backToWelcome2.addEventListener('click', () => {
  loginScreen.classList.add('hidden');
  welcomeScreen.classList.remove('hidden');
});

// Kayıt
registerBtn.addEventListener('click', () => {
  const username = regUsername.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (!username || !email || !password) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }

  // Aynı e-mail var mı
  if (users.find(u => u.email === email)) {
    alert('Bu email zaten kayıtlı!');
    return;
  }

  users.push({ username, email, password });
  alert('Kayıt başarılı! Giriş yapabilirsiniz.');
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
});

// Giriş
loginBtn.addEventListener('click', () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert('Email veya şifre yanlış!');
    return;
  }

  currentUser = user;
  loginScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  currentUserSpan.textContent = currentUser.username;
  renderMessages();
});

// Mesaj gönder
sendMessageBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  messages.push({ user: currentUser.username, text });
  messageInput.value = '';
  renderMessages();
}

function renderMessages() {
  messagesContainer.innerHTML = messages.map(m => 
    `<div class="message"><strong>${m.user}:</strong> ${m.text}</div>`
  ).join('');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
