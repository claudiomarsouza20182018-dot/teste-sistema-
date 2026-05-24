// firebase-init.js
const firebaseConfig = {
    apiKey: "AIzaSyC3KQOyLglnEBlENTDmtXboODO-e984Sps",
    authDomain: "lds-baber.firebaseapp.com",
    projectId: "lds-baber",
    storageBucket: "lds-baber.firebasestorage.app",
    messagingSenderId: "214203799710",
    appId: "1:214203799710:web:12e68a9772495a7c18838f",
    measurementId: "G-Y0HMXH2XTL"
};

// Inicializa o Firebase apenas se ainda não estiver inicializado
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// AJUSTE: Inicializa o Firestore e torna disponível globalmente como window.db
window.db = firebase.firestore();

console.log("Firebase inicializado e db global configurado!");