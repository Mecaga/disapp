import { db } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let activeChannel = "genel";
let messages = {};
let currentUser = null;

/* Kullanıcı giriş */

function login() {

    const username = document.getElementById("usernameInput").value.trim();

    if (!username) return alert("Kullanıcı adı gir!");

    currentUser = username;
    localStorage.setItem("username", username);

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("chatApp").style.display = "block";

    listenMessages(activeChannel);
}

window.login = login;

/* Sayfa açılınca kullanıcı kontrol */

window.onload = () => {

    const savedUser = localStorage.getItem("username");

    if (savedUser) {

        currentUser = savedUser;

        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("chatApp").style.display = "block";

        listenMessages(activeChannel);
    }
};

/* Mesaj gönder */

function sendMessage() {

    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text || !currentUser) return;

    const messageRef = ref(db, "messages/" + activeChannel);

    push(messageRef, {
        author: currentUser,
        text: text,
        time: new Date().toLocaleTimeString()
    });

    input.value = "";
}

window.sendMessage = sendMessage;

/* Mesajları dinle */

function listenMessages(channelId) {

    const messageRef = ref(db, "messages/" + channelId);

    onValue(messageRef, (snapshot) => {

        messages[channelId] = [];

        snapshot.forEach(child => {
            messages[channelId].push(child.val());
        });

        renderMessages(channelId);
    });
}

/* Mesajları ekrana bas */

function renderMessages(channelId) {

    const container = document.getElementById("messagesContainer");
    const channelMessages = messages[channelId] || [];

    container.innerHTML = channelMessages.map(msg => `
        <div class="message">
            <b>${msg.author}</b>: ${msg.text}
            <span class="time">${msg.time}</span>
        </div>
    `).join("");

    container.scrollTop = container.scrollHeight;
}
