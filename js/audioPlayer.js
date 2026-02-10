document.addEventListener('DOMContentLoaded', () => {
    // 1. Busca a configuração de áudio definida na tag <body> da página
    const body = document.querySelector('body');
    const audioSrc = body.getAttribute('data-audio'); // Ex: 'data/audio/bleachTema.mp3'
    const audioLoop = body.getAttribute('data-audio-loop') !== 'false'; // Padrão é true

    if (audioSrc) {
        // Ajusta o caminho se estiver dentro de subpastas
        const rootPath = window.location.pathname.includes('/pages/') 
            ? (window.location.pathname.includes('/academia/') ? '../../' : '../') 
            : '';

        const player = new Audio(rootPath + audioSrc);
        player.loop = audioLoop;
        player.volume = 0.5;

        // 2. Tentativa de Autoplay com tratamento de erro
        const startAudio = () => {
            player.play().catch(() => {
                console.log("Autoplay bloqueado. Aguardando interação para tocar: " + audioSrc);
            });
        };

        startAudio();

        // 3. Se o browser bloquear, ele toca no primeiro clique do usuário na página
        document.addEventListener('click', () => {
            if (player.paused) {
                player.play();
            }
        }, { once: true });
    }
});