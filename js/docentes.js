document.addEventListener('DOMContentLoaded', () => {
    fetch('../../data/docentes.json')
        .then(response => response.json())
        .then(data => {
            renderDiretoria(data.diretoria);
            renderInstrutores(data.instrutores);
        })
        .catch(err => console.error("Erro ao carregar dados:", err));
});

function renderDiretoria(diretoria) {
    const container = document.getElementById('diretoria-section');
    let html = `<h2 class="section-title" style="margin-top:20px;"><span class="marker">>></span> Alta Cúpula Administrativa</h2>`;
    
    diretoria.forEach(membro => {
        html += `
            <div class="diretor-row">
                <img src="${membro.imagem}" class="diretor-img" alt="${membro.nome}">
                <div class="diretor-info">
                    <h3>${membro.nome}</h3>
                    <span class="diretor-cargo">${membro.cargo}</span>
                    <p class="diretor-desc">${membro.descricao}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderInstrutores(instrutores) {
    const grid = document.getElementById('instrutores-grid');
    grid.innerHTML = '';
    
    instrutores.forEach(profe => {
        grid.innerHTML += `
            <article class="instrutor-card">
                <div class="instrutor-img-box">
                    <img src="${profe.img}" alt="${profe.nome}" onerror="this.src='../../img/Academia.png'">
                </div>
                <div class="instrutor-info">
                    <h3>${profe.nome}</h3>
                    <span class="materia-tag">${profe.materia}</span>
                    <p class="instrutor-bio">${profe.bio}</p>
                </div>
            </article>
        `;
    });
}