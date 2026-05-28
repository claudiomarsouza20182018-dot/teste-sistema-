const menuHTML = `
<div class="menu-overlay" onclick="toggleMenu()"></div>
<button class="btn-hamburger" onclick="toggleMenu()">☰</button>
<nav class="nav-sidebar" id="sidebar">
    <div class="sidebar-titulo">LDS BARBER</div>
    <a href="painel-geral.html" id="linkAgenda">📅 Agenda</a>
    <a href="caixa.html" id="linkCaixa">💰 Caixa Diário</a>
    <a href="vendas.html" id="linkVendas">Registrar Venda</a>
    <a href="estoque.html" id="linkEstoque">Ver Estoque</a>
    <a href="cadastro.html" id="linkCadastro">Cadastrar/Entrada</a>
    <a href="faturamento.html" id="linkFaturamento">Faturamento</a>
    <a href="configuracoes.html" id="linkConfig">⚙️ Configurações</a>
    <a href="#" onclick="fazerLogout()" style="color: #f74040; margin-top: auto; border-top: 1px solid #323238; padding-top: 15px;">Sair</a>
</nav>
`;

// Injeta o menu no topo do body
document.body.insertAdjacentHTML('afterbegin', menuHTML);

// Função para abrir/fechar menu (Mobile)
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.menu-overlay').classList.toggle('active');
}

// Destacar página atual no menu
const paginaAtual = window.location.pathname.split("/").pop();
const links = document.querySelectorAll('.nav-sidebar a');
links.forEach(link => {
    // Verifica se o href do link contém o nome da página atual
    if (link.getAttribute('href') === paginaAtual) {
        link.style.backgroundColor = '#ff9000';
        link.style.color = '#121214';
        link.style.borderRadius = '5px';
    }
});
