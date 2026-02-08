import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Kullanıcı Adı Değiştirme (Senin istediğin özellik)
export async function changeUserName(newName) {
    if (auth.currentUser) {
        try {
            await updateProfile(auth.currentUser, { displayName: newName });
            return true;
        } catch (error) {
            console.error("İsim değiştirme hatası:", error);
            return false;
        }
    }
}

// Oturum Durumunu Kontrol Et
export function monitorAuthState(onUserIn, onUserOut) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            onUserIn(user);
        } else {
            onUserOut();
        }
    });
}

