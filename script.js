// DADOS DA ÁRVORE (JSON)
const gameData = [
    {
        id: 1,
        title: "Academia de Ceifeiros de Almas",
        subtitle: "1° TEMPORADA - O INÍCIO",
        symbol: "壱", // Kanji para 1
        desc: "Treinamento básico nas quatro artes: Zanjutsu (Espada), Hakuda (Corpo a Corpo), Hoho (Movimentação) e Kido (Artes Demoníacas). O estudante deve provar seu valor espiritual."
    },
    {
        id: 2,
        title: "Mundo dos Vivos",
        subtitle: "2° TEMPORADA - SUBSTITUTO",
        symbol: "弐", // Kanji para 2
        desc: "Patrulha na cidade de Karakura. Purificação de Hollows, uso do Gigai e interação com almas perdidas. Onde a fronteira entre a vida e a morte se cruza."
    },
    {
        id: 3,
        title: "Soul Society",
        subtitle: "2° TEMPORADA - INVASÃO",
        symbol: "参", // Kanji para 3
        desc: "Infiltração no Seireitei. Combates contra Tenentes. Despertar do Shikai e a luta para salvar seus aliados da execução central."
    },
    {
        id: 4,
        title: "Os Capitães",
        subtitle: "3° TEMPORADA - GOTEI 13",
        symbol: "肆", // Kanji para 4
        desc: "Confronto direto com a elite militar espiritual. Domínio da Bankai necessário para sobreviver à pressão espiritual (Reiatsu) de nível Capitão."
    },
    {
        id: 5,
        title: "Visoreds",
        subtitle: "HUB SECRETO - MÁSCARA",
        symbol: "仮", 
        desc: "Controle da Hollowficação interna. A linha tênue entre sanidade e destruição pura. Aumento explosivo de poder por tempo limitado."
    }
];

// REFERÊNCIAS AO DOM
const treeContainer = document.getElementById('tree-container');
const infoTitle = document.getElementById('info-title');
const infoMeta = document.getElementById('info-meta');
const infoDesc = document.getElementById('info-desc');
const infoSymbol = document.querySelector('.symbol-small');

// FUNÇÃO PARA CRIAR A ÁRVORE
function renderTree() {
    gameData.forEach((item, index) => {
        // Cria o wrapper do nó
        const wrapper = document.createElement('div');
        wrapper.className = 'node-wrapper';
        
        // Cria o botão (diamante)
        const btn = document.createElement('div');
        btn.className = 'node-btn';
        btn.dataset.id = index; // Guarda o índice para referência
        
        // Conteúdo interno (Kanji/Numero)
        btn.innerHTML = `<div class="node-content">${item.symbol}</div>`;

        // Evento de Clique
        btn.addEventListener('click', () => {
            // Remove classe ativa de todos
            document.querySelectorAll('.node-btn').forEach(b => b.classList.remove('active'));
            // Adiciona neste
            btn.classList.add('active');
            // Atualiza o painel
            updateInfoPanel(item);
        });

        wrapper.appendChild(btn);
        treeContainer.appendChild(wrapper);
    });
}

// FUNÇÃO DE ATUALIZAÇÃO DO PAINEL (Com efeito Typewriter)
let typewriterTimeout;

function updateInfoPanel(data) {
    // Efeito de Glitch no Título
    infoTitle.innerText = randomGlitch(data.title);
    setTimeout(() => { infoTitle.innerText = data.title; }, 100);

    infoMeta.innerText = data.subtitle;
    infoSymbol.innerText = data.symbol;
    
    // Limpa texto anterior
    infoDesc.innerHTML = '';
    
    // Efeito de Digitação
    let i = 0;
    const text = data.desc;
    const speed = 20;

    // Cancela digitação anterior se houver
    clearTimeout(typewriterTimeout);

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
}

// UTILITÁRIO: Gera caracteres aleatórios para efeito glitch
function randomGlitch(text) {
    const chars = '!@#$%^&*<>?';
    return text.split('').map(c => Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : c).join('');
}

// INICIALIZAÇÃO
window.onload = () => {
    renderTree();
    
    // CSS extra para o cursor piscar
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
    document.head.appendChild(styleSheet);
};