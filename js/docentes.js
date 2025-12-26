document.addEventListener('DOMContentLoaded', () => {
    fetchDocentes();
});

async function fetchDocentes() {
    const grid = document.getElementById('docentes-grid');
    
    try {
        const response = await fetch('../../data/docentes.json');
        if (!response.ok) throw new Error("Erro ao carregar docentes");
        const docentes = await response.json();

        grid.innerHTML = '';

        docentes.forEach(profe => {
            const card = document.createElement('div');
            card.className = 'docente-card';
            card.innerHTML = `
                <div class="docente-img-wrapper">
                    <img src="${profe.imagem}" alt="${profe.nome}" onerror="this.src='../../img/Academia.png'">
                </div>
                <div class="docente-info">
                    <h2>${profe.nome}</h2>
                    <span class="docente-materia">MATÉRIA: ${profe.materia}</span>
                    <p class="docente-desc">${profe.descricao}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = `<p style="color: white;">Erro ao carregar o corpo docente no banco de dados da Seireitei.</p>`;
    }
}