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

// Inicializa o Firestore
window.db = firebase.firestore();

// Inicializa o Storage com tratamento de erro para evitar quebra no plano gratuito
try {
    window.storage = firebase.storage();
    console.log("Firebase Storage inicializado com sucesso.");
} catch (e) {
    console.warn("Firebase Storage não pôde ser inicializado (talvez não esteja ativado no console). O sistema continuará funcionando apenas com o banco de dados.");
    window.storage = null; 
}

window.ID_LOJA = "I4M6KAeLmDMbkcuaSaUuxPfme692"; 

console.log("Firebase inicializado. Loja: " + window.ID_LOJA);
