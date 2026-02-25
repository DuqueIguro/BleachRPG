document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('downloads-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let allMaterials = [];

    fetch('../../data/downloads.json')
        .then(res => res.json())
        .then(data => {
            allMaterials = data;
            renderCards(data);
        })
        .catch(err => {
            grid.innerHTML = `<p class="loading-text">Erro ao carregar arquivos: ${err.message}</p>`;
        });

    function renderCards(items) {
        grid.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'instrutor-card';
            card.innerHTML = `
                <div class="instrutor-info">
                    <span class="materia-tag">${item.materia.toUpperCase()}</span>
                    <h3>${item.titulo}</h3>
                    <span class="diretor-cargo" style="font-size: 0.8rem; margin-bottom: 10px;">
                        Docente: ${item.professor}
                    </span>
                    <p class="instrutor-bio">${item.descricao}</p>
                    <a href="${item.arquivo}" download class="download-btn btn-${item.tipo}">
                        Download PDF (${item.tipo})
                    </a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            const filtered = filter === 'todos' ? allMaterials : allMaterials.filter(i => i.tipo === filter);
            renderCards(filtered);
        });
    });
});