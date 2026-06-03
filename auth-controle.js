// --- FUNÇÃO DE LOGIN ---
window.loginComGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("Login realizado com sucesso!");
            // Redirecionamento forçado após sucesso no login
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
        // Verifica se está no index ou na raiz
        const estaNaPaginaLogin = path.includes("index.html") || path === "/" || path === "";

        if (user) {
            console.log("Usuário detectado, iniciando sincronização...");
            sincronizarUsuarioEloja(user, estaNaPaginaLogin);
        } else {
            console.log("Nenhum usuário logado.");
            localStorage.removeItem("idLojaAtual");
            // Se não estiver na página de login e não houver usuário, volta para o index
            if (!estaNaPaginaLogin) {
                window.location.href = "index.html";
            }
        }
    });
}

// --- FUNÇÃO DE SINCRONIZAÇÃO (AJUSTADA PARA UID) ---
async function sincronizarUsuarioEloja(user, estaNaPaginaLogin) {
    const db = firebase.firestore();
    const usuarioRef = db.collection("usuarios").doc(user.uid);

    try {
        console.log("Tentando acessar dados no Firestore...");
        const doc = await usuarioRef.get();
        
        // FORÇAMOS o uso do user.uid como ID da loja, garantindo independência total.
        let idLoja = user.uid;

        if (!doc.exists) {
            console.log("Usuário novo, criando registro...");
            await usuarioRef.set({
                nome: user.displayName || "Usuário",
                email: user.email,
                estabelecimentoId: idLoja, // O ID do documento é o próprio estabelecimentoId
                criadoEm: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Ignoramos qualquer valor antigo salvo no banco e usamos o UID atual do Firebase.
            idLoja = user.uid;
        }

        // Define no localStorage o ID técnico (UID)
        localStorage.setItem("idLojaAtual", idLoja);
        console.log("ID da Loja definido (UID):", idLoja);

        // Se estiver na tela de login e já estiver logado, redireciona
        if (estaNaPaginaLogin) {
            console.log("Redirecionando para painel-geral.html");
            window.location.href = "painel-geral.html";
        }
    } catch (error) {
        console.error("Erro CRÍTICO na sincronização:", error);
        alert("Erro de permissão no Firestore. Verifique suas regras no Firebase Console.");
    }
}

// Inicializa o monitoramento assim que o arquivo carregar
monitorarAutenticacao();
