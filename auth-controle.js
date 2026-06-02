// --- FUNÇÃO DE LOGIN (O que faltava!) ---
window.loginComGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log("Login com Google iniciado...");
        // O monitorarAutenticacao detectará a mudança de estado automaticamente
    })
    .catch((error) => {
        console.error("Erro no login:", error);
        alert("Erro ao realizar login: " + error.message);
    });
};

// --- FUNÇÃO DE MONITORAMENTO (Sua lógica, corrigida para ser mais estável) ---
function monitorarAutenticacao() {
    firebase.auth().onAuthStateChanged((user) => {
        const path = window.location.pathname;
        const estaNaPaginaLogin = path.includes("index.html") || path === "/" || path.endsWith("/");

        if (user) {
            console.log("Usuário logado:", user.uid);
            if (estaNaPaginaLogin) {
                verificarOuCriarUsuario(user);
            } else {
                const nomeEl = document.getElementById("nomeUsuarioLogado");
                if (nomeEl) nomeEl.innerText = user.displayName || "Barbeiro";
            }
        } else {
            console.log("Nenhum usuário logado.");
            if (!estaNaPaginaLogin) {
                window.location.href = "index.html"; 
            }
        }
    });
}

// --- FUNÇÃO DE CRIAÇÃO ---
function verificarOuCriarUsuario(user) {
    const db = firebase.firestore();
    const usuarioRef = db.collection("usuarios").doc(user.uid);

    usuarioRef.get().then((doc) => {
        if (doc.exists && doc.data().estabelecimentoId) {
            window.location.href = `painel-geral.html?id=${doc.data().estabelecimentoId}`;
        } else {
            let idAutomatico = user.displayName
                ? user.displayName.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
                : `barbearia-${user.uid.substring(0, 5)}`;

            usuarioRef.set({
                nome: user.displayName || "Usuário",
                email: user.email,
                estabelecimentoId: idAutomatico,
                criadoEm: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                window.location.href = `painel-geral.html?id=${idAutomatico}`;
            });
        }
    });
}

// --- LOGOUT ---
function fazerLogout() {
    firebase.auth().signOut().then(() => window.location.href = "index.html");
}

// Inicializa
monitorarAutenticacao();
