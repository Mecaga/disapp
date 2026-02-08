// GLOBAL DEĞİŞKENLER
let activeUser = null;
let activeChannel = null;
let servers = [];
let messages = {};
let usersDB = []; // kullanıcı veritabanı
let typingUsers = new Set();
let nextServerId = 1;
let nextChannelId = 1;

// ÖRNEK KULLANICILAR
const users = [
    {id:'#0001', name:'Admin', avatar:'🧑‍💻', online:true, customStatus:''},
    {id:'#0002', name:'Bot', avatar:'🤖', online:true, customStatus:''}
];

// INIT
function init() {
    renderServers();
}

// LOGIN FONKSİYONU
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if(!username || !email || !password) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    let user = usersDB.find(u => u.email === email);
    if(!user) {
        user = {username, email, password, online:true};
        usersDB.push(user);
    } else {
        if(user.password !== password) {
            alert("Şifre yanlış!");
            return;
        }
        user.username = username;
        user.online = true;
    }

    activeUser = user; // aktif kullanıcı
    document.getElementById('loginScreen').style.display = 'none';

    const userDisplay = document.createElement('div');
    userDisplay.textContent = `Hoşgeldin, ${user.username}`;
    userDisplay.style.padding = '10px';
    userDisplay.style.background = '#2c2c3e';
    userDisplay.style.textAlign = 'center';
    userDisplay.style.fontWeight = 'bold';
    document.body.prepend(userDisplay);

    init(); // chat ekranını başlat
}

// MESAJ GÖNDERME
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if(!text || !activeChannel || !activeUser) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

    if(!messages[activeChannel]) messages[activeChannel] = [];

    messages[activeChannel].push({
        author: activeUser.username,
        text: text,
        time: time,
        reactions: {}
    });

    renderChannelMessages(activeChannel);
    input.value = '';
}

// MESAJLARI RENDER
function renderChannelMessages(channelId) {
    const container = document.getElementById('messagesContainer');
    const channelMessages = messages[channelId] || [];

    if(channelMessages.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💬</div>
                <p>Henüz mesaj yok</p>
                <p style="font-size:12px;margin-top:8px;">İlk mesajı gönderin!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = channelMessages.map((msg,index) => {
        const author = users.find(u => u.name === msg.author) || {avatar:'🧑', name: msg.author};
        const reactionsHtml = Object.entries(msg.reactions||{}).map(([emoji,count]) =>
            `<div class="reaction" onclick="addReaction('${channelId}',${index},'${emoji}')">
                ${emoji} <span class="reaction-count">${count}</span>
            </div>`).join('');

        return `
            <div class="message-group" style="position:relative;">
                <div class="message-avatar">${author.avatar}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${msg.author}</span>
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <div class="message-text">${msg.text}</div>
                    ${reactionsHtml ? `<div class="message-reactions">${reactionsHtml}</div>` : ''}
                </div>
                <div class="message-actions">
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'👍')">👍</button>
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'❤️')">❤️</button>
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'😂')">😂</button>
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
}

// TEPKİ EKLE
function addReaction(channelId,messageIndex,emoji) {
    if(!messages[channelId][messageIndex].reactions) messages[channelId][messageIndex].reactions = {};
    if(messages[channelId][messageIndex].reactions[emoji]) messages[channelId][messageIndex].reactions[emoji]++;
    else messages[channelId][messageIndex].reactions[emoji] = 1;

    renderChannelMessages(channelId);
}

// ÖRNEK SERVER RENDER
function renderServers() {
    // Basit örnek: tek kanal
    activeChannel = 'genel#0001';
    if(!messages[activeChannel]) messages[activeChannel] = [];
    renderChannelMessages(activeChannel);
}

// INIT
init();


// GLOBAL DEĞİŞKENLER
let activeUser = null;
let activeChannel = null;
let messages = {};
let usersDB = [];
let typingUsers = new Set();

// ÖRNEK KULLANICILAR
const users = [
    {id:'#0001', name:'Admin', avatar:'🧑‍💻', online:true, customStatus:''},
    {id:'#0002', name:'Bot', avatar:'🤖', online:true, customStatus:''}
];

// INIT
function init() {
    renderServers();
    // Enter ile mesaj gönder
    const input = document.getElementById('messageInput');
    if(input) {
        input.addEventListener('keypress', function(e){
            if(e.key === 'Enter') sendMessage();
        });
    }
}

// LOGIN FONKSİYONU
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if(!username || !email || !password) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    let user = usersDB.find(u => u.email === email);
    if(!user) {
        user = {username,email,password,online:true};
        usersDB.push(user);
    } else {
        if(user.password !== password){
            alert("Şifre yanlış!");
            return;
        }
        user.username = username;
        user.online = true;
    }

    activeUser = user;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('chatScreen').style.display = 'flex';

    const userDisplay = document.getElementById('activeUserDisplay');
    if(userDisplay) userDisplay.textContent = `Hoşgeldin, ${user.username}`;

    init(); // chat ekranını başlat
}

// MESAJ GÖNDERME
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if(!text || !activeChannel || !activeUser) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

    if(!messages[activeChannel]) messages[activeChannel] = [];

    messages[activeChannel].push({
        author: activeUser.username,
        text: text,
        time: time,
        reactions: {}
    });

    input.value = '';
    renderChannelMessages(activeChannel);
}

// MESAJLARI RENDER
function renderChannelMessages(channelId) {
    const container = document.getElementById('messagesContainer');
    const channelMessages = messages[channelId] || [];

    if(channelMessages.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💬</div>
                <p>Henüz mesaj yok</p>
                <p style="font-size:12px;margin-top:8px;">İlk mesajı gönderin!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = channelMessages.map((msg,index) => {
        const author = users.find(u => u.name === msg.author) || {avatar:'🧑', name: msg.author};
        const reactionsHtml = Object.entries(msg.reactions||{}).map(([emoji,count]) =>
            `<div class="reaction" onclick="addReaction('${channelId}',${index},'${emoji}')">
                ${emoji} <span class="reaction-count">${count}</span>
            </div>`).join('');

        return `
            <div class="message-group" style="position:relative;">
                <div class="message-avatar">${author.avatar}</div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${msg.author}</span>
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <div class="message-text">${msg.text}</div>
                    ${reactionsHtml ? `<div class="message-reactions">${reactionsHtml}</div>` : ''}
                </div>
                <div class="message-actions">
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'👍')">👍</button>
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'❤️')">❤️</button>
                    <button class="message-action-btn" onclick="addReaction('${channelId}',${index},'😂')">😂</button>
                </div>
            </div>
        `;
    }).join('');

    // Otomatik scroll
    container.scrollTop = container.scrollHeight;
}

// TEPKİ EKLE
function addReaction(channelId,messageIndex,emoji) {
    if(!messages[channelId][messageIndex].reactions) messages[channelId][messageIndex].reactions = {};
    if(messages[channelId][messageIndex].reactions[emoji]) messages[channelId][messageIndex].reactions[emoji]++;
    else messages[channelId][messageIndex].reactions[emoji] = 1;

    renderChannelMessages(channelId);
}

// ÖRNEK SERVER
function renderServers() {
    activeChannel = 'genel#0001';
    if(!messages[activeChannel]) messages[activeChannel] = [];
    renderChannelMessages(activeChannel);
}

// INIT
init();
