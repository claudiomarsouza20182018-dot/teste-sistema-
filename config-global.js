/**
 * Configuração Global: Identifica o ID da Barbearia
 * Agora utiliza o UID (ID do Documento) como identificador único.
 */

function obterIdComercio() {
    // 1. Prioridade: ID que vem na URL (para o agendar.html funcionar para clientes)
    const urlParams = new URLSearchParams(window.location.search).get('id');
    if (urlParams) return urlParams;

    // 2. Segunda opção: O ID salvo no LocalStorage
    const localId = localStorage.getItem('idLojaAtual');
    if (localId) return localId;

    // 3. Fallback: Tenta pegar o UID do usuário logado (para o painel do dono)
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
}

function salvarIdComercio(id) {
    if (id) {
        localStorage.setItem('idLojaAtual', id);
    }
}

// Escuta a autenticação e garante que o ID da loja esteja sempre disponível no LocalStorage
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // O UID do Firebase É o ID do seu documento na coleção 'usuarios'.
        // Não precisamos mais buscar no Firestore para saber qual é o ID da loja,
        // pois o próprio user.uid já é a chave única.
        salvarIdComercio(user.uid);
        console.log("Sistema operando com o ID de documento (UID):", user.uid);
    } else {
        localStorage.removeItem('idLojaAtual');
    }
});
