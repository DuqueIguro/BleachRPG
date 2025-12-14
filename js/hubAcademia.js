document.addEventListener('DOMContentLoaded', () => {
    loadNotices();
    loadCalendar();
    initAssistant();
});

/* --- CARREGAMENTO DE DADOS (JSON) --- */

async function loadNotices() {
    const container = document.getElementById('notices-container');
    
    try {
        // Busca o JSON na pasta data
        const response = await fetch('../../data/academia_notices.json');
        if (!response.ok) throw new Error("Erro de conexão");
        const data = await response.json();

        container.innerHTML = ''; 

        data.avisos.forEach(aviso => {
            const div = document.createElement('div');
            // Formata o HTML do aviso
            div.innerHTML = `
                <p>
                    <span class="notice-date">[${aviso.data}]</span>
                    ${aviso.titulo}
                </p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        // Fallback se não achar o arquivo
        container.innerHTML = `
            <p><span class="notice-date">[SISTEMA]</span> Erro ao conectar com os arquivos da Seireitei.</p>
            <p>Certifique-se que o arquivo 'data/academia_notices.json' existe.</p>
        `;
    }
}

async function loadCalendar() {
    const tbody = document.querySelector('#calendar-table tbody');
    
    try {
        const response = await fetch('../../data/academia_calendar.json');
        if (!response.ok) throw new Error("Erro de conexão");
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
        tbody.innerHTML = `<tr><td colspan="4">Sistema de agendamento offline.</td></tr>`;
    }
}

/* --- LÓGICA DA ASSISTENTE CAPIVARA --- */

function initAssistant() {
    const overlay = document.getElementById('assistant-overlay');
    const textElem = document.getElementById('assistant-text');
    const btnNext = document.getElementById('next-dialogue');
    const btnClose = document.getElementById('close-assistant');
    const imgElem = document.getElementById('capi-img');

    // Remove a classe hidden para mostrar o assistente
    // (Você pode usar localStorage aqui se quiser que apareça só uma vez)
    overlay.classList.remove('hidden');

    // Roteiro do Tutorial
    const tutorialSteps = [
        {
            text: "Saudações, estudante! Bem-vindo ao Hub da Academia Shin'ō. Eu sou a Capi-sensei!",
            img: "../../img/Capi1.png" // Feliz
        },
        {
            text: "Acima, na seção 'Sobre', você aprende nossa história. À esquerda, fique atento aos avisos oficiais.",
            img: "../../img/Capi2.png" // Explicando
        },
        {
            text: "No calendário, verifique suas aulas. Não tolerei atrasos nas minhas aulas de História!",
            img: "../../img/Capi3.png" // Séria
        },
        {
            text: "Use os botões abaixo para acessar a Biblioteca ou o Dojo. Bom estudo!",
            img: "../../img/Capi1.png" // Feliz
        }
    ];

    let currentStep = 0;
    let isTyping = false;

    // Função de Digitação
    function typeText(text) {
        textElem.innerHTML = "";
        let i = 0;
        isTyping = true;
        btnNext.disabled = true; // Evita pular rápido demais
        
        function typing() {
            if (i < text.length) {
                textElem.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 35); // Velocidade da digitação
            } else {
                isTyping = false;
                btnNext.disabled = false;
            }
        }
        typing();
    }

    // Inicialização
    updateAssistantUI();

    function updateAssistantUI() {
        if (currentStep < tutorialSteps.length) {
            imgElem.src = tutorialSteps[currentStep].img;
            typeText(tutorialSteps[currentStep].text);
            
            // Texto do botão no final
            if (currentStep === tutorialSteps.length - 1) {
                btnNext.innerText = "Entendido!";
            } else {
                btnNext.innerText = "Próximo >";
            }
        }
    }

    // Botão Próximo
    btnNext.addEventListener('click', () => {
        if (isTyping) return; // Segurança extra

        currentStep++;
        if (currentStep < tutorialSteps.length) {
            updateAssistantUI();
        } else {
            closeTutorial();
        }
    });

    // Botão Fechar
    btnClose.addEventListener('click', closeTutorial);

    function closeTutorial() {
        overlay.classList.add('hidden');
    }
}