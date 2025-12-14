document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    loadCalendar();
    initAssistant();
});

/* --- CARREGAMENTO DE DADOS (JSON) --- */

async function loadNotices() {
    const container = document.getElementById('notices-container');
    
    // Caminho relativo para a pasta data
    try {
        const response = await fetch('../../data/academia_notices.json');
        if (!response.ok) throw new Error("Erro na rede");
        const data = await response.json();

        container.innerHTML = ''; // Limpa loading

        data.avisos.forEach(aviso => {
            const div = document.createElement('div');
            div.innerHTML = `
                <span class="notice-date">[${aviso.data}]</span>
                ${aviso.titulo}
            `;
            container.appendChild(div);
        });
    } catch (error) {
        // Fallback caso não tenha JSON ou servidor rodando
        container.innerHTML = `
            <p><span class="notice-date">[HOJE]</span> Bem-vindo à Academia.</p>
            <p><span class="notice-date">[ERRO]</span> Falha ao conectar com banco de dados espiritual.</p>
        `;
    }
}

async function loadCalendar() {
    const tbody = document.querySelector('#calendar-table tbody');
    
    try {
        const response = await fetch('../../data/academia_calendar.json');
        if (!response.ok) throw new Error("Erro na rede");
        const data = await response.json();

        tbody.innerHTML = '';

        data.aulas.forEach(aula => {
            const row = `
                <tr>
                    <td>${aula.dia}</td>
                    <td>${aula.horario}</td>
                    <td>${aula.materia}</td>
                    <td>${aula.instrutor}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="4">Sem dados de agendamento disponíveis.</td></tr>`;
    }
}

/* --- LÓGICA DA ASSISTENTE CAPIVARA --- */

function initAssistant() {
    const overlay = document.getElementById('assistant-overlay');
    const textElem = document.getElementById('assistant-text');
    const btnNext = document.getElementById('next-dialogue');
    const btnClose = document.getElementById('close-assistant');
    const imgElem = document.getElementById('capi-img');

    // Verifica se o usuário já viu o tutorial (opcional, usando localStorage)
    if (localStorage.getItem('tutorialSeen')) {
        overlay.classList.add('hidden');
        return;
    } else {
        overlay.classList.remove('hidden');
    }

    // Roteiro do Tutorial
    const tutorialSteps = [
        {
            text: "Olá, novato! Bem-vindo à Academia Shin'ō. Eu sou a Capi-sensei, sua guia.",
            img: "../../img/Capi1.png" // Capi1: Feliz/Normal
        },
        {
            text: "Aqui no HUB você encontra seus horários de aula e avisos da Central 46.",
            img: "../../img/Capi2.png" // Capi2: Apontando ou Explicando
        },
        {
            text: "Se sua Reiatsu estiver baixa, não esqueça de passar no Dojo para treinar!",
            img: "../../img/Capi3.png" // Capi3: Séria ou Motivada
        },
        {
            text: "Agora vá! Estude muito para se tornar um bom Shinigami!",
            img: "../../img/Capi1.png"
        }
    ];

    let currentStep = 0;

    // Função de Digitação (Typewriter)
    function typeText(text) {
        textElem.innerHTML = "";
        let i = 0;
        btnNext.disabled = true; // Bloqueia botão enquanto digita
        
        function typing() {
            if (i < text.length) {
                textElem.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 30); // Velocidade
            } else {
                btnNext.disabled = false;
            }
        }
        typing();
    }

    // Inicializa
    imgElem.src = tutorialSteps[0].img;
    typeText(tutorialSteps[0].text);

    // Evento Próximo
    btnNext.addEventListener('click', () => {
        currentStep++;
        if (currentStep < tutorialSteps.length) {
            imgElem.src = tutorialSteps[currentStep].img;
            typeText(tutorialSteps[currentStep].text);
            
            // Muda texto do botão no último passo
            if (currentStep === tutorialSteps.length - 1) {
                btnNext.innerText = "Encerrar";
            }
        } else {
            closeTutorial();
        }
    });

    // Evento Fechar
    btnClose.addEventListener('click', closeTutorial);

    function closeTutorial() {
        overlay.classList.add('hidden');
        localStorage.setItem('tutorialSeen', 'true'); // Salva que já viu
    }
}