import { auth } from './firebase-config.js';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// OTURUM DURUMU TAKİBİ
export function initAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        const authScreen = document.getElementById('authScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (user) {
            authScreen.style.display = "none";
            mainApp.style.display = "flex";
            callback(user);
        } else {
            authScreen.style.display = "flex";
            mainApp.style.display = "none";
        }
    });
}

// KAYIT FONKSİYONU
export async function registerUser(email, password, username) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: username });
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// GİRİŞ FONKSİYONU
export async function loginUser(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ÇIKIŞ
export const logout = () => signOut(auth);
