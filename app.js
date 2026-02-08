let users = [];
let currentUser = null;
let messages = [];

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const chatScreen = document.getElementById('chatScreen');

document.getElementById('showLogin').addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

document.getElementById('showRegister').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Şifre göster/gizle
document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = btn.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
        }
        input.focus();
    });
});

// Kayıt ol
document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    if (!username || !email || !password) return alert('Lütfen tüm alanları doldurun!');
    users.push({username, email, password});
    alert('Kayıt başarılı! Giriş yapabilirsiniz.');
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Giriş yap
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert('Hatalı email veya şifre!');
    currentUser = user;
    document.getElementById('currentUser').textContent = currentUser.username;
    loginForm.style.display = 'none';
    chatScreen.style.display = 'block';
});

// Mesaj gönder
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;
    messages.push({author: currentUser.username, text});
    input.value = '';
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = messages.map(m => `<div><strong>${m.author}:</strong> ${m.text}</div>`).join('');
    container.scrollTop = container.scrollHeight;
}
