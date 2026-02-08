import { db } from "./firebase.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

let activeChannel = "genel";
let messages = {};

listenMessages(activeChannel);

function renderMessages(channelId) {

    const container = document.getElementById("messagesContainer");
    const channelMessages = messages[channelId] || [];

    container.innerHTML = channelMessages.map(msg => `
        <div class="message">
            <b>${msg.author}</b>: ${msg.text}
            <span style="font-size:12px">${msg.time}</span>
        </div>
    `).join("");

}

export function sendMessage() {

    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if (!text) return;

    const messageRef = ref(db, "messages/" + activeChannel);

    push(messageRef, {
        author: "#0001",
        text: text,
        time: new Date().toLocaleTimeString()
    });

    input.value = "";
}

window.sendMessage = sendMessage;

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
