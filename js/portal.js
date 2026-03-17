document.addEventListener('DOMContentLoaded', () => {
    const alumniGrid = document.getElementById('alumni-grid');

    // Caminho para o seu arquivo JSON de registros
    fetch('../../data/registro_academico.json')
        .then(response => response.json())
        .then(data => {
            renderStudents(data.alunos);
        })
        .catch(error => console.error('Erro ao carregar registros:', error));

    function renderStudents(alunos) {
        alumniGrid.innerHTML = '';

        alunos.forEach(aluno => {
            const card = document.createElement('div');
            card.className = 'student-card';

            card.innerHTML = `
            <img src="../../img/alunos/${aluno.foto}" alt="${aluno.nome}" class="student-photo" style="object-position: top;">
            <h3 class="student-name">${aluno.nome}</h3>
            <button class="access-button" onclick="verifyAccess('${aluno.matricula}', '${aluno.senha}', '${aluno.perfil}')">
                Acessar Dados
            </button>
        `;
            alumniGrid.appendChild(card);
        });
    }
});

function verifyAccess(matricula, senhaCorreta, urlPerfil) {
    const inputSenha = prompt("Digite a senha de acesso espiritual:");

    if (inputSenha === senhaCorreta) {
        // Redireciona para a página específica do aluno definida no JSON
        window.location.href = urlPerfil;
    } else {
        alert("Senha incorreta. O acesso ao Sistema Acadêmico foi negado.");
    }
}