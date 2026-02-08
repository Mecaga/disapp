import { initAuth, registerUser, loginUser, logout } from './auth.js';
import { sendChatMessage, listenMessages, listenChannels, createChannel } from './chat.js';
import { auth } from './firebase-config.js';
import { updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let currentUser = null;
let activeChannel = "global";

// 1. OTURUM DURUMUNU TAKİP ET
initAuth((user) => {
    currentUser = user;
    document.getElementById('displayUserName').innerText = user.displayName || user.email;
    document.getElementById('myAvatar').innerText = (user.displayName || "U").charAt(0).toUpperCase();
    
    // Mesajları ve Kanalları yükle
    startChatSystems();
});

// 2. GİRİŞ VE KAYIT BUTONLARI
const authBtn = document.getElementById('authBtn');
if (authBtn) {
    authBtn.addEventListener('click', async () => {
        const email = document.getElementById('authEmail').value;
        const pass = document.getElementById('authPassword').value;
        const isRegister = document.getElementById('registerFields').style.display === "block";

        if (!email || !pass) {
            alert("Lütfen alanları doldurun mübarek!");
            return;
        }

        if (isRegister) {
            const username = document.getElementById('authUsername').value;
            const res = await registerUser(email, pass, username);
            if (!res.success) alert("Kayıt Hatası: " + res.message);
        } else {
            const res = await loginUser(email, pass);
            if (!res.success) alert("Giriş Hatası: " + res.message);
        }
    });
}

// 3. MESAJ GÖNDERME BUTONU
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const input = document.getElementById('messageInput');
        if (input.value.trim() && currentUser) {
            sendChatMessage(activeChannel, currentUser.displayName || currentUser.email, input.value);
            input.value = "";
        }
    });
}

// 4. PROFİL GÜNCELLEME VE ÇIKIŞ
document.getElementById('saveProfileBtn')?.addEventListener('click', async () => {
    const newName = document.getElementById('newNameInput').value;
    if (newName && auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
        alert("İsim güncellendi!");
        location.reload();
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    logout();
    location.reload();
});

// 5. CHAT SİSTEMLERİNİ BAŞLAT
function startChatSystems() {
    listenMessages(activeChannel, (msgs) => {
        const wrapper = document.getElementById('messagesWrapper');
        wrapper.innerHTML = msgs.map(m => `
            <div style="margin-bottom:15px; border-bottom:1px solid #313338; padding-bottom:10px;">
                <b style="color:#5865f2;">${m.author}:</b> <span style="color:#dbdee1;">${m.text}</span>
            </div>
        `).join('');
        wrapper.scrollTop = wrapper.scrollHeight;
    });

    listenChannels((chans) => {
        const list = document.getElementById('channelList');
        // Kanalları listelerken 'genel' her zaman olsun
        list.innerHTML = `<div class="channel-category">METİN KANALLARI</div>`;
        list.innerHTML += `<div class="channel-item ${activeChannel === 'global' ? 'active' : ''}" id="chan-global"># global</div>`;
        
        chans.forEach(c => {
            const item = document.createElement('div');
            item.className = `channel-item ${activeChannel === c.name ? 'active' : ''}`;
            item.innerText = `# ${c.name}`;
            item.onclick = () => {
                activeChannel = c.name;
                document.getElementById('activeChannelTitle').innerText = c.name;
                startChatSystems();
            };
            list.appendChild(item);
        });
    });
}

// Global butonu için olay dinleyici
document.getElementById('globalBtn')?.addEventListener('click', () => {
    activeChannel = "global";
    document.getElementById('activeChannelTitle').innerText = "global";
    startChatSystems();
});

// Kanal ekleme promptu
window.addNewChannelPrompt = async () => {
    const name = prompt("Yeni kanal adı:");
    if (name) await createChannel(name);
};
