/**
 * Função que carrega o estoque filtrado pelo ID da loja
 */
function carregarTabelaEstoque(idLoja) {
    if (!idLoja) {
        console.error("ID da loja não fornecido!");
        return;
    }

    const corpoTabela = document.getElementById("corpoTabelaEstoque");

    if (!window.db) {
        console.error("Firebase db não encontrado.");
        corpoTabela.innerHTML = "<tr><td colspan='5'>Erro: Conexão com banco de dados falhou.</td></tr>";
        return;
    }

    window.db.collection("estoque") 
        .where("estabelecimentoId", "==", idLoja) 
        .onSnapshot((snapshot) => {
            corpoTabela.innerHTML = ""; 

            if (snapshot.empty) {
                corpoTabela.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Nenhum item encontrado nesta barbearia.</td></tr>";
                return;
            }

            let linhas = "";
            snapshot.forEach((doc) => {
                const p = doc.data();
                const docId = doc.id;
                const precoFormatado = Number(p.preco || 0).toFixed(2);
                
                // Lógica da Categoria: busca 'categoria' ou 'tipo', senão exibe 'Geral'
                const categoria = p.categoria || p.tipo || "Geral";
                
                // ORDEM CORRETA DAS COLUNAS:
                linhas += `
                    <tr>
                        <td><span class="tag-cat">${categoria}</span></td>
                        <td>${p.nome || 'Sem nome'}</td>
                        <td>${p.quantidade || 0}</td>
                        <td>R$ ${precoFormatado}</td>
                        <td>
                            <button onclick="excluirItem('${docId}')" style="background:#f75a68; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Excluir</button>
                        </td>
                    </tr>
                `;
            });
            
            corpoTabela.innerHTML = linhas; 
            
        }, (error) => {
            console.error("Erro ao carregar estoque: ", error);
            corpoTabela.innerHTML = "<tr><td colspan='5'>Erro ao acessar banco de dados.</td></tr>";
        });
}

/**
 * Função para excluir um item do estoque
 */
function excluirItem(docId) {
    if (confirm("Tem certeza que deseja excluir este item?")) {
        window.db.collection("estoque").doc(docId).delete()
            .then(() => {
                console.log("Item removido com sucesso!");
            })
            .catch((err) => {
                console.error("Erro ao excluir: ", err);
                alert("Erro ao excluir.");
            });
    }
}
