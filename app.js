// Ekran geçişi
function showScreen(screenId) {
    document.querySelectorAll('#welcomeScreen, #registerScreen, #loginScreen, #chatScreen')
        .forEach(div => div.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Kayıt işlemi
function registerUser() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!username || !email || !password) return alert("Tüm alanları doldurun!");

    localStorage.setItem('user', JSON.stringify({username, email, password}));
    alert("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.");
    showScreen('loginScreen');
}

// Giriş işlemi
function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return alert("Kayıt bulunamadı!");
    if (user.email !== email || user.password !== password) return alert("Email veya şifre yanlış!");

    alert(`Hoşgeldin, ${user.username}!`);
    showScreen('chatScreen');
}

// Mesaj gönderme
function sendMessage(event) {
    event.preventDefault();
    const input = document.getElementById('messageInput');
    if (!input.value) return;

    const container = document.getElementById('messagesContainer');
    const msgDiv = document.createElement('div');
    msgDiv.textContent = input.value;
    container.appendChild(msgDiv);
    input.value = '';
    container.scrollTop = container.scrollHeight;
}
