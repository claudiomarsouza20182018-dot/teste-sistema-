// 1. Injeta o CSS do Menu automaticamente para não quebrar o layout
const style = document.createElement('style');
style.innerHTML = `
    .nav-sidebar { width: 220px; background-color: #202024; position: fixed; left: -220px; top: 0; height: 100vh; transition: 0.3s; z-index: 2000; padding: 20px; box-sizing: border-box; display: flex; flex-direction: column; border-right: 1px solid #323238; }
    .nav-sidebar.active { left: 0; }
    .btn-hamburger { position: fixed; top: 15px; left: 15px; z-index: 2001; background: #ff9000; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; color: #121214; font-weight: bold; }
    .menu-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1999; }
    .menu-overlay.active { display: block; }
    .sidebar-titulo { color: #a8a8a8; font-size: 14px; margin-bottom: 20px; font-weight: bold; }
    .nav-sidebar a { color: #fff; text-decoration: none; padding: 12px; margin-bottom: 5px; border-radius: 5px; display: block; }
`;
document.head.appendChild(style);

// 2. Injeta o HTML do Menu
const menuHTML = `
<div class="menu-overlay" onclick="toggleMenu()"></div>
<button class="btn-hamburger" onclick="toggleMenu()">☰</button>
<nav class="nav-sidebar" id="sidebar">
    <div class="sidebar-titulo">       </div>
    <a href="painel-geral.html" id="linkAgenda">📅 Agenda</a>
    <a href="caixa.html" id="linkCaixa">💰 Caixa Diário</a>
    <a href="vendas.html" id="linkVendas">Registrar Venda</a>
    <a href="estoque.html" id="linkEstoque">Ver Estoque</a>
    <a href="cadastro.html" id="linkCadastro">Cadastrar/Entrada</a>
    <a href="faturamento.html" id="linkFaturamento">Faturamento</a>
    <a href="configuracoes.html" id="linkConfig">⚙️ Configurações</a>
    <a href="#" onclick="fazerLogout()" style="color: #ff9000; margin-top: auto; border-top: 1px solid #323238; padding-top: 15px;">Sair</a>
</nav>
`;
document.body.insertAdjacentHTML('afterbegin', menuHTML);

// 3. Funções de controle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.menu-overlay').classList.toggle('active');
}

function fazerLogout() {
    localStorage.removeItem("idLojaAtual");
    window.location.href = "index.html";
}

// 4. Destaque do link ativo
const paginaAtual = window.location.pathname.split("/").pop();
const links = document.querySelectorAll('.nav-sidebar a');
links.forEach(link => {
    if (link.getAttribute('href') === paginaAtual) {
        link.style.backgroundColor = '#ff9000';
        link.style.color = '#121214';
    }
});
