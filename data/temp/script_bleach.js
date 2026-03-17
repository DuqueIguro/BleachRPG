function updateBleachSheet() {
    // 1. Cálculo de Modificadores (Baseado na regra de Star Wars que você já usava)
    const atributos = ['for', 'des', 'con', 'int', 'sab', 'esp'];

    atributos.forEach(attr => {
        const base = parseInt(document.getElementById(`${attr}-base`).value) || 0;
        // Aqui podemos somar bônus temporários ou de equipamentos depois
        const total = base;
        document.getElementById(`${attr}-total`).textContent = total;
    });

    // 2. Cálculo Automático de PV e Reiryoku
    const nivel = parseInt(document.getElementById('nivel').value) || 1;
    const con = parseInt(document.getElementById('con-base').value) || 10;
    const esp = parseInt(document.getElementById('esp-base').value) || 10;

    // Exemplo de regra: PV = Constituição + (Nível * multiplicador da classe)
    // Você pode ajustar conforme o manual do S&H
}

// Inicialização
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updateBleachSheet);
});