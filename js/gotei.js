document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gotei-grid');
    const title = document.getElementById('main-title');
    
    // URL do JSON
    const DATA_URL = '../data/gotei.json';

    async function fetchSquadData() {
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) throw new Error('Falha na comunicação espiritual');
            const data = await response.json();
            renderSquads(data);
        } catch (error) {
            console.error(error);
            container.innerHTML = `<div class="loading">ERRO CRÍTICO: DADOS DA SOUL SOCIETY INACESSÍVEIS.</div>`;
        }
    }

    function renderSquads(squads) {
        container.innerHTML = ''; 

        squads.forEach(squad => {
            const card = document.createElement('div');
            card.className = 'squad-card';

            // Verifica se existe Família para adicionar o badge
            const familyBadge = squad.family 
                ? `<div class="family-badge">${squad.family}</div>` 
                : '';

            // Lógica para transformar "01" em "1ª" visualmente (opcional, aqui mantive o ID cru + texto)
            const divNumber = parseInt(squad.id); 

            card.innerHTML = `
                ${familyBadge}
                <div class="division-bg-number">${squad.id}</div>
                
                <div class="img-wrapper">
                    <img src="../img/capitoes/divisao-${squad.id}.png" 
                         alt="Capitão da Divisão ${squad.id}" 
                         class="squad-img"
                         onerror="this.src='https://placehold.co/400x300/111/FFF?text=IMG+MISSING'">
                </div>
                
                <div class="info-wrapper">
                    <div class="div-header">
                        <span class="div-name">${divNumber}ª DIVISÃO</span>
                        <span class="role-title">-- ${squad.role}</span>
                    </div>

                    <h2 class="captain-name">${squad.captain}</h2>
                    
                    <div class="lieutenant-info">
                        <span class="lieutenant-label">Tenente:</span> ${squad.lieutenant}
                    </div>
                    
                    <p class="description-text">
                        ${squad.description}
                    </p>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Efeito Glitch no Título
    const originalText = title.innerText;
    const chars = 'ABCDEF1234567890!@#';
    
    setInterval(() => {
        if(Math.random() > 0.96) {
            let glitch = '';
            for(let i=0; i < originalText.length; i++) {
                glitch += chars[Math.floor(Math.random() * chars.length)];
            }
            title.innerText = glitch;
            title.style.color = '#d65a18';
            
            setTimeout(() => {
                title.innerText = originalText;
                title.style.color = '#fff';
            }, 100);
        }
    }, 1200);

    fetchSquadData();
});