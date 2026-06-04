// --- FUNÇÃO DE LOGIN ---
window.loginComGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Login realizado com sucesso!");
            window.location.href = "painel-geral.html"; 
        })
        .catch((error) => {
            console.error("Erro no login:", error);
            alert("Erro ao realizar login: " + error.message);
        });
};

// --- FUNÇÃO DE MONITORAMENTO ---
function monitorarAutenticacao() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log("Estado de autenticação mudou:", user ? "Logado" : "Deslogado");
        
        const path = window.location.pathname;
        const estaNaPaginaLogin = path.includes("index.html") || path === "/" || path === "";

        if (user) {
            console.log("Usuário detectado, iniciando sincronização...");
            sincronizarUsuarioEloja(user, estaNaPaginaLogin);
        } else {
            console.log("Nenhum usuário logado.");
            localStorage.removeItem("idLojaAtual");
            if (!estaNaPaginaLogin) {
                window.location.href = "index.html";
            }
        }
    });
}

// --- FUNÇÃO DE SINCRONIZAÇÃO (RASTREADA) ---
async function sincronizarUsuarioEloja(user, estaNaPaginaLogin) {
    const db = firebase.firestore();
    const usuarioRef = db.collection("usuarios").doc(user.uid);

    try {
        console.log("Tentando acessar dados no Firestore...");
        
        const doc = await usuarioRef.get();
        console.log("Acesso ao Firestore concluído com sucesso!"); 
        
        let idLoja = user.uid;

        if (!doc.exists) {
            console.log("Usuário novo, criando registro...");
            await usuarioRef.set({
                nome: user.displayName || "Usuário",
                email: user.email,
                estabelecimentoId: idLoja,
                criadoEm: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Registro criado no Firestore!"); 
        } else {
            console.log("Usuário já existe no banco.");
            idLoja = user.uid;
        }

        localStorage.setItem("idLojaAtual", idLoja);
        console.log("ID da Loja definido (UID):", idLoja);

        if (estaNaPaginaLogin) {
            console.log("Redirecionando para painel-geral.html");
            window.location.href = "painel-geral.html";
        }
    } catch (error) {
        console.error("ERRO DETALHADO NO FIREBASE:", error.code, error.message);
        alert("Erro no Firestore: " + error.message);
    }
}

monitorarAutenticacao();
