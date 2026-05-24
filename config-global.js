/**
 * Configuração Global: Identifica o ID da Barbearia
 * Este arquivo deve ser carregado em todas as páginas HTML
 */

// Função para obter o ID do comércio de forma confiável
function obterIdComercio() {
    // 1. Tenta pegar da URL (prioridade, pois permite navegação direta)
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    
    // 2. Se não estiver na URL, tenta recuperar do sessionStorage
    // Isso é útil se o usuário navegar entre páginas e a URL perder o parâmetro
    if (!id) {
        id = sessionStorage.getItem('estabelecimentoId');
    }
    
    return id;
}

// Função para salvar o ID quando o login ocorrer ou for detectado
function salvarIdComercio(id) {
    if (id) {
        sessionStorage.setItem('estabelecimentoId', id);
    }
}

// Escuta a autenticação para garantir que o ID esteja sempre sincronizado
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Se o usuário estiver logado, busca o ID no Firestore caso não tenha
        const db = firebase.firestore();
        db.collection("usuarios").doc(user.uid).get().then((doc) => {
            if (doc.exists && doc.data().estabelecimentoId) {
                salvarIdComercio(doc.data().estabelecimentoId);
            }
        });
    }
});