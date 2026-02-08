// GLOBAL DEĞİŞKENLER
let activeUser = null;
let activeChannel = null;
let messages = {}; // Kanal mesajları
let typingUsers = new Set();

// ÖRNEK KANAL
const channels = [
    {id:'genel#0001', name:'genel', messages:[]}
];

// ÖRNEK KULLANICILAR (Avatar sadece emoji)
const users = [
    {id:'#0001', name:'Admin', avatar:'🧑‍💻', online:true},
    {id:'#0002', name:'Bot', avatar:'🤖', online:true}
];

// INIT
function init() {
    // Login butonu
    const loginBtn = document.getElementById('loginBtn');
    if(loginBtn) loginBtn.addEventListener('click', login);

    // Mesaj gönderme butonu
    const sendBtn = document.getElementById('sendBtn');
    if(sendBtn) sendBtn.addEventListener('click', sendMessage);

    // Enter ile mesaj gönderme
    const input = document.getElementById('messageInput');
    if(input){
        input.addEventListener('keypress', function(e){
            if(e.key === 'Enter') sendMessage();
        });
    }
}

// LOGIN
function login() {
    const username = document.getElementById('loginUsername').value.trim();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if(!username || !email || !password){
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    // Kullanıcı oluştur veya al
    activeUser = {username,email,password,online:true};

    // Aktif kanal
    activeChannel = channels[0].id;

    // Ekran değişimi
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('chatScreen').style.display = 'flex';

    // Kullanıcı adını göster
    document.getElementById('activeUserDisplay').textContent = `Hoşgeldin, ${activeUser.username}`;

    renderChannelMessages(activeChannel);
}

// MESAJ GÖNDERME
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if(!text || !activeUser || !activeChannel) return;

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

    // Bot cevabı
    setTimeout(()=>{
        const botTime = `${now.getHours()}:${String(now.getMinutes()+1).padStart(2,'0')}`;
        messages[activeChannel].push({
            author:'Bot',
            text:'Mesajını aldım! 👍',
            time:botTime,
            reactions:{}
        });
        renderChannelMessages(activeChannel);
    },1500);
}

// MESAJLARI RENDER
function renderChannelMessages(channelId){
    const container = document.getElementById('messagesContainer');
    const channelMessages = messages[channelId] || [];

    if(channelMessages.length === 0){
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💬</div>
                <p>Henüz mesaj yok</p>
                <p style="font-size:12px;margin-top:8px;">İlk mesajı gönderin!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = channelMessages.map((msg,index)=>{
        const author = users.find(u => u.name === msg.author) || {avatar:'🧑', name:msg.author};
        const reactionsHtml = Object.entries(msg.reactions||{}).map(([emoji,count])=>
            `<div class="reaction" onclick="addReaction('${channelId}',${index},'${emoji}')">
                ${emoji} <span class="reaction-count">${count}</span>
            </div>`).join('');

        return `
            <div class="message-group">
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
                    <button onclick="addReaction('${channelId}',${index},'👍')">👍</button>
                    <button onclick="addReaction('${channelId}',${index},'❤️')">❤️</button>
                    <button onclick="addReaction('${channelId}',${index},'😂')">😂</button>
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
}

// TEPKİ EKLE
function addReaction(channelId,messageIndex,emoji){
    if(!messages[channelId][messageIndex].reactions) messages[channelId][messageIndex].reactions = {};
    if(messages[channelId][messageIndex].reactions[emoji]) messages[channelId][messageIndex].reactions[emoji]++;
    else messages[channelId][messageIndex].reactions[emoji]=1;

    renderChannelMessages(channelId);
}

// INIT
init();
