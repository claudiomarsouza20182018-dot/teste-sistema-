/**
 * Configuração Global: Identifica o ID da Barbearia
 */

function obterIdComercio() {
    // Tenta pegar do LocalStorage primeiro
    return localStorage.getItem('idLojaAtual') || new URLSearchParams(window.location.search).get('id');
}

function salvarIdComercio(id) {
    if (id) {
        localStorage.setItem('idLojaAtual', id);
    }
}

// Escuta a autenticação de forma assíncrona e segura
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // Se já temos o ID salvo, não precisamos chamar o Firestore novamente (Economiza leitura)
        if (localStorage.getItem('idLojaAtual')) return;

        try {
            const db = firebase.firestore();
            const doc = await db.collection("usuarios").doc(user.uid).get();
            
            if (doc.exists && doc.data().estabelecimentoId) {
                salvarIdComercio(doc.data().estabelecimentoId);
                console.log("ID da loja sincronizado com sucesso.");
            } else {
                console.warn("Usuário logado, mas não possui 'estabelecimentoId' definido.");
            }
        } catch (error) {
            console.error("Erro ao buscar ID do comércio no Firestore:", error);
            // IMPORTANTE: Se der erro de permissão aqui, verifique suas Regras de Segurança
        }
    } else {
        localStorage.removeItem('idLojaAtual');
    }
});
