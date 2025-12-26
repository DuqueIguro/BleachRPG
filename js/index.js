// DADOS DOS HUBS / TEMPORADAS 
const gameData = [
    {
        id: 1,
        title: "Academia Shin'ō",
        subtitle: "1° TEMPORADA - O INÍCIO",
        symbol: "壱", // Kanji para 1
        desc: "Treinamento básico nas quatro artes: Zanjutsu (Espada), Hakuda (Corpo a Corpo), Hoho (Movimentação) e Kido (Artes Demoníacas). O estudante deve provar seu valor espiritual.",
        status: "OPEN-ACADEMY"
    },
    {
        id: 2,
        title: "As 13 divisões de Guardas da Corte",
        subtitle: "2° TEMPORADA",
        symbol: "弐", // Kanji para 2
        desc: "Missões de patrulha e combate contra Hollows. Desenvolvimento do Shikai e primeiros confrontos reais com inimigos perigosos.",
        status: "LOCKED"
    },
    {
        id: 3,
        title: "Crepúsculo",
        subtitle: "3° TEMPORADA",
        symbol: "参", // Kanji para 3
        desc: "Exploração das ameaças emergentes no mundo espiritual. Introdução ao Bankai e batalhas contra inimigos formidáveis.",
        status: "LOCKED"
    },
    {
        id: 4,
        title: "Até Que a Alma quebre",
        subtitle: "4° TEMPORADA",
        symbol: "肆", // Kanji para 4
        desc: "Confronto direto com a elite militar espiritual. Domínio da Bankai necessário para sobreviver à pressão espiritual (Reiatsu) de nível Capitão.",
        status: "LOCKED"
    }
];

// REFERÊNCIAS AO DOM
const treeContainer = document.getElementById('tree-container');
const infoTitle = document.getElementById('info-title');
const infoMeta = document.getElementById('info-meta');
const infoDesc = document.getElementById('info-desc');
const infoSymbol = document.querySelector('.symbol-small');
const actionContainer = document.getElementById('action-container');

// FUNÇÃO PARA CRIAR A ÁRVORE VISUAL
function renderTree() {
    gameData.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'node-wrapper';
        
        const btn = document.createElement('div');
        btn.className = 'node-btn';
        
        // Se estiver bloqueado, adiciona uma classe visual ao nó da árvore também
        if (item.status === 'LOCKED') {
            btn.classList.add('node-locked');
        }
        
        btn.innerHTML = `<div class="node-content">${item.symbol}</div>`;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.node-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateInfoPanel(item);
        });

        wrapper.appendChild(btn);
        treeContainer.appendChild(wrapper);
    });
}

let typewriterTimeout;

function updateInfoPanel(data) {
    // 1. Títulos e Símbolos
    infoTitle.innerText = randomGlitch(data.title);
    setTimeout(() => { infoTitle.innerText = data.title; }, 100);

    infoMeta.innerText = data.subtitle;
    infoSymbol.innerText = data.symbol;
    
    // 2. Lógica de Descrição (Typewriter)
    infoDesc.innerHTML = '';
    clearTimeout(typewriterTimeout);

    let i = 0;
    const text = data.desc;
    const speed = 15; // Velocidade da digitação

    function type() {
        if (i < text.length) {
            infoDesc.innerHTML += text.charAt(i);
            i++;
            typewriterTimeout = setTimeout(type, speed);
        } else {
            infoDesc.innerHTML += '<span style="animation: blink 1s infinite; color: #d65a18">_</span>';
        }
    }
    type();

    // 3. Renderiza o Botão baseado no Status
    renderActionButton(data);
}

function renderActionButton(data) {
    // Reinicia animação do container
    actionContainer.innerHTML = '';
    actionContainer.style.animation = 'none';
    actionContainer.offsetHeight; /* trigger reflow */
    actionContainer.style.animation = 'fadeIn 0.5s forwards 0.5s';

    const btn = document.createElement('a');
    btn.className = 'action-btn';

    // === LÓGICA MESTRA DE REDIRECIONAMENTO ===
    if (data.status === "OPEN-ACADEMY") {
        // CAMINHO LIVRE
        btn.innerText = "ACESSAR DADOS";
        btn.href = "pages/hubs/hubAcademia";
        btn.classList.remove('btn-locked'); 
    } else {
        // CAMINHO BLOQUEADO
        btn.innerText = "ACESSO NEGADO";
        btn.href = "pages/ReiatsuInsuficiente";
        btn.classList.add('btn-locked'); // Classe para mudar a cor do botão
    }

    actionContainer.appendChild(btn);
}

// Utilitário de Glitch
function randomGlitch(text) {
    const chars = '!@#$%^&*<>?JP¥';
    return text.split('').map(c => Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
}

// Inicialização
window.onload = () => {
    renderTree();
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
    document.head.appendChild(styleSheet);
};