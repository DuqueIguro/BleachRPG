document.addEventListener('DOMContentLoaded', () => {
    const dataUrl = '../../data/boletimMedias.json';
    const tableHead = document.querySelector('#grade-table thead tr');
    const tableBody = document.querySelector('#grade-table tbody');
    const legendContainer = document.querySelector('#legend-container');

    fetch(dataUrl)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar dados");
            return response.json();
        })
        .then(data => {
            initializeBoard(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            tableBody.innerHTML = `<tr><td colspan="100%" style="text-align:center; color:red;">FALHA NA COMUNICAÇÃO COM A CENTRAL 46 (JSON Error)</td></tr>`;
        });

    function initializeBoard(data) {
        const subjects = data.config.subjects;
        const students = data.students;
        const defaultGrade = data.config.gradeSystem.default;
        const legend = data.config.gradeSystem.legend;

        // 1. Renderizar Cabeçalho (Matérias)
        // O primeiro TH (Aluno) já existe no HTML estático
        subjects.forEach(subject => {
            const th = document.createElement('th');
            th.textContent = subject;
            tableHead.appendChild(th);
        });

        // 2. Renderizar Alunos e Notas
        students.forEach(student => {
            const tr = document.createElement('tr');
            
            // Coluna do Nome
            const tdName = document.createElement('td');
            tdName.textContent = student.name;
            tr.appendChild(tdName);

            // Colunas das Notas
            subjects.forEach(subject => {
                const tdGrade = document.createElement('td');
                // Pega a nota salva ou usa o padrão
                // Normaliza a chave da matéria para minúsculo/sem espaço se necessário, 
                // mas aqui faremos match direto ou assumiremos vazio.
                const grade = student.grades[subject] || defaultGrade;
                
                tdGrade.textContent = grade;
                tdGrade.setAttribute('title',  'Pare de ser um fracassado e estude para melhorar essa nota'); // Tooltip para motivar o aluno
                
                // Estilização condicional baseada na nota (Opcional, mas útil visualmente)
                const gradeText = grade.toString();
                
                // Notas baixas ou falhas sistêmicas em vermelho, notas avançadas em laranja, variáveis positivas/negativas em tons distintos
                if(gradeText.includes('二') || gradeText.includes('三') || gradeText.includes('四') || gradeText.includes('五')) {
                    tdGrade.innerHTML = gradeText.replace('二', '<span style="color:red;">二</span>'); // Nota 2
                    tdGrade.innerHTML = tdGrade.innerHTML.replace('三', '<span style="color:red;">三</span>'); // Nota 3
                    tdGrade.innerHTML = tdGrade.innerHTML.replace('四', '<span style="color:red;">四</span>'); // Nota 4
                    tdGrade.innerHTML = tdGrade.innerHTML.replace('五', '<span style="color:red;">五</span>'); // Nota 5
                }
                if(gradeText.includes('Reprovada')) {
                    tdGrade.innerHTML = gradeText.replace('Reprovada', '<span style="color:#ff0000;">Reprovada</span>'); // Nota Reprovada
                }

                if(gradeText.includes('十')) {
                    tdGrade.innerHTML = gradeText.replace('十', '<span style="color:#ff8300;">十</span>'); // Nota 10
                }
                if(gradeText.includes('Avançada')) {
                    tdGrade.innerHTML = gradeText.replace('Avançada', '<span style="color:#ff8300;">Avançada</span>'); // Nota Avançada
                }
                tr.appendChild(tdGrade);
            });

            tableBody.appendChild(tr);
        });

        // 3. Renderizar Legenda Dinâmica (Opcional)
        if(legendContainer) {
            Object.entries(legend).forEach(([symbol, info]) => {
                const div = document.createElement('div');
                div.className = 'legend-item';
                div.innerHTML = `<span>${symbol}</span> ${info.name}`;
                legendContainer.appendChild(div);
            });
        }
    }
});