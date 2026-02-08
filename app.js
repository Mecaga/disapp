let messages = [];
let currentUser = null;

function login() {
    const username = document.getElementById("usernameInput").value.trim();

    if (!username) {
        alert("Kullanıcı adı gir!");
        return;
    }

    currentUser = username;
    localStorage.setItem("username", username);

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("chatApp").style.display = "block";
    document.getElementById("currentUser").textContent = currentUser;

    renderMessages();
}

window.onload = () => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("chatApp").style.display = "block";
        document.getElementById("currentUser").textContent = currentUser;
        renderMessages();
    }
};

function sendMessage() {
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text || !currentUser) return;

    messages.push({
        author: currentUser,
        text: text,
        time: new Date().toLocaleTimeString()
    });

    input.value = "";
    renderMessages();
}

function renderMessages() {
    const container = document.getElementById("messagesContainer");
    if (messages.length === 0) {
        container.innerHTML = `<div class="empty-state">Henüz mesaj yok</div>`;
        return;
    }

    container.innerHTML = messages.map(msg => `
        <div class="message">
            <b>${msg.author}</b>: ${msg.text} <span class="time">${msg.time}</span>
        </div>
    `).join("");

    container.scrollTop = container.scrollHeight;
}
