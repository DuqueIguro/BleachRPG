document.addEventListener('DOMContentLoaded', () => {
    const jsonPath = '../../data/materias.json';
    const gridContainer = document.getElementById('materias-grid');
    const zanpakutoContainer = document.getElementById('zanpakuto-timeline');

    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            renderCurriculo(data.curriculo);
            renderZanpakuto(data.zanpakuto_info);
        })
        .catch(error => console.error('Erro ao carregar matérias:', error));

    function renderCurriculo(materias) {
        materias.forEach(materia => {
            const card = document.createElement('div');
            card.className = 'instrutor-card'; // Reutilizando classe do CSS docentes

            // Lógica condicional: Se for Kidō, layout diferente
            let subContent = '';
            
            if (materia.id === 'kido' && materia.caminhos) {
                const pathsHTML = materia.caminhos.map(caminho => `
                    <div class="kido-item" title="${caminho.desc}">
                        <img src="${caminho.imagem}" alt="${caminho.nome}" class="kido-icon">
                        <span class="kido-name">${caminho.nome.split(' ')[0]}</span>
                    </div>
                `).join('');

                subContent = `
                    <div class="materia-sub">
                        <span class="materia-tag" style="font-size: 0.8rem;">Caminhos:</span>
                        <div class="kido-grid">
                            ${pathsHTML}
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="instrutor-img-box">
                    <img src="${materia.imagem}" alt="${materia.titulo}">
                </div>
                <div class="instrutor-info">
                    <h3>${materia.titulo}</h3>
                    <span class="materia-tag">Sensei: ${materia.professor}</span>
                    <p class="instrutor-bio">${materia.descricao}</p>
                    ${subContent}
                </div>
            `;

            gridContainer.appendChild(card);
        });
    }

    function renderZanpakuto(fases) {
        fases.forEach(fase => {
            const zCard = document.createElement('div');
            zCard.className = 'zan-card';

            zCard.innerHTML = `
                <img src="${fase.imagem}" alt="${fase.estagio}" class="zan-img">
                <h3 class="zan-title">${fase.estagio}</h3>
                <p class="zan-desc">${fase.desc}</p>
            `;

            zanpakutoContainer.appendChild(zCard);
        });
    }
});