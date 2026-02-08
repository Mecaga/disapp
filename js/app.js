import { initAuth, registerUser, loginUser, logout } from './auth.js';
import { sendChatMessage, listenMessages, listenChannels, createChannel } from './chat.js';

let currentUser = null;
let activeChannel = "global";

// 1. BAŞLATMA VE AUTH KONTROLÜ
initAuth((user) => {
    currentUser = user;
    document.getElementById('displayUserName').innerText = user.displayName || user.email;
    document.getElementById('myAvatar').innerText = (user.displayName || "U").charAt(0).toUpperCase();
    
    // Mesajları ve Kanalları dinlemeye başla
    startChat();
});

function startChat() {
    listenMessages(activeChannel, (msgs) => {
        const wrapper = document.getElementById('messagesWrapper');
        wrapper.innerHTML = msgs.map(m => `
            <div style="margin-bottom:15px;">
                <b style="color:#5865f2;">${m.author}:</b> <span>${m.text}</span>
            </div>
        `).join('');
        wrapper.scrollTop = wrapper.scrollHeight;
    });

    listenChannels((chans) => {
        const list = document.getElementById('channelList');
        list.innerHTML = chans.map(c => `
            <div class="channel-item" onclick="window.setChannel('${c.name}')"># ${c.name}</div>
        `).join('');
    });
}

// 2. BUTON OLAYLARI
window.setChannel = (name) => {
    activeChannel = name;
    document.getElementById('activeChannelTitle').innerText = name;
    startChat();
};

document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('messageInput');
    sendChatMessage(activeChannel, currentUser.displayName, input.value);
    input.value = "";
};

// Giriş/Kayıt Butonu (Kısa versiyon)
document.getElementById('authBtn').onclick = async () => {
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPassword').value;
    const isRegister = document.getElementById('registerFields').style.display === "block";

    if(isRegister) {
        const user = document.getElementById('authUsername').value;
        await registerUser(email, pass, user);
    } else {
        await loginUser(email, pass);
    }
};

