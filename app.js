// app.js

// Kullanıcı ve mesaj verileri
let users = []; // {username, email, password, online}
let currentUser = null;
let messages = []; // {author, text, time, reactions}

// Kayıt ol
function registerUser() {
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (!username || !email || !password) {
        alert("Tüm alanları doldurun!");
        return;
    }

    if (users.find(u => u.email === email)) {
        alert("Bu email zaten kayıtlı!");
        return;
    }

    users.push({ username, email, password, online: false });
    alert("Kayıt başarılı! Giriş yapabilirsiniz.");

    // Formu temizle
    document.getElementById('regUsername').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
}

// Giriş yap
function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Email veya şifre yanlış!");
        return;
    }

    currentUser = user;
    currentUser.online = true;

    // Chat ekranını aç, giriş ekranını gizle
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('chatScreen').style.display = 'block';

    // Kullanıcı bilgilerini göster
    document.getElementById('displayUsername').textContent = currentUser.username;
    updateOnlineStatus();

    // Mesajları temizle ve hazırla
    renderMessages();

    // Formu temizle
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Online göstergesi
function updateOnlineStatus() {
    const status = document.getElementById('onlineStatus');
    status.textContent = currentUser.online ? '🟢 Online' : '⚫ Offline';
}

// Mesaj gönder
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text || !currentUser) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

    messages.push({
        author: currentUser.username,
        text,
        time,
        reactions: {}
    });

    input.value = '';
    renderMessages();
}

// Enter ile mesaj gönder
function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Mesajları render et
function renderMessages() {
    const container = document.getElementById('messagesContainer');
    container.innerHTML = '';

    messages.forEach((msg, index) => {
        const reactionsHtml = Object.entries(msg.reactions || {}).map(([emoji, count]) =>
            `<span class="reaction" onclick="toggleReaction(${index}, '${emoji}')">${emoji} ${count}</span>`
        ).join(' ');

        const messageHtml = `
            <div class="message">
                <strong>${msg.author}</strong> <span class="time">${msg.time}</span>
                <p>${msg.text}</p>
                <div>${reactionsHtml}</div>
            </div>
        `;
        container.innerHTML += messageHtml;
    });

    container.scrollTop = container.scrollHeight;
}

// Tepki ekle / çıkar
function toggleReaction(msgIndex, emoji) {
    const msg = messages[msgIndex];
    if (!msg.reactions[emoji]) {
        msg.reactions[emoji] = 1;
    } else {
        msg.reactions[emoji] = msg.reactions[emoji] === 1 ? 0 : msg.reactions[emoji] - 1;
        if (msg.reactions[emoji] === 0) delete msg.reactions[emoji];
    }
    renderMessages();
}
