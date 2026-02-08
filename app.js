// Şifre göster/gizle
document.getElementById('toggleRegPassword').onclick = () => {
  const pw = document.getElementById('regPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
};
document.getElementById('toggleLoginPassword').onclick = () => {
  const pw = document.getElementById('loginPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
};

// Kayıt
async function handleRegister() {
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  if (!username || !email || !password) return alert('Tüm alanları doldur!');
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    await firebase.database().ref('users/' + uid).set({ username, email, online: true });
    alert('Kayıt başarılı!');
  } catch (err) { alert(err.message); }
}

// Giriş
async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;
    await firebase.database().ref('users/' + uid).update({ online: true });
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('chatScreen').style.display = 'block';
    loadMessages();
  } catch (err) { alert(err.message); }
}

// Çıkış
async function logoutUser() {
  const uid = firebase.auth().currentUser.uid;
  await firebase.database().ref('users/' + uid).update({ online: false });
  await firebase.auth().signOut();
  location.reload();
}

// Mesaj gönder
function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref('messages').push({
    author: uid,
    text,
    timestamp: Date.now()
  });
  input.value = '';
}

// Enter tuşu
function enterPress(e) { if (e.key === 'Enter') sendMessage(); }

// Mesajları dinle
function loadMessages() {
  const container = document.getElementById('messagesContainer');
  firebase.database().ref('messages').on('child_added', snapshot => {
    const msg = snapshot.val();
    firebase.database().ref('users/' + msg.author).once('value', u => {
      const username = u.val().username;
      const div = document.createElement('div');
      div.textContent = username + ': ' + msg.text;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    });
  });
}
