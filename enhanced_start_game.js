// Função aprimorada para início de partida
function enhancedStartGame(modeConfig) {
    // Criar partículas de celebração antes de mudar de tela
    createParticles('success', 20, window.innerWidth / 2, window.innerHeight / 2);
    
    // Efeito de fade out suave da tela atual
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen) {
        currentScreen.style.transition = 'opacity 0.5s ease-out';
        currentScreen.style.opacity = '0';
    }
    
    setTimeout(() => {
        // Mudar para tela do jogo
        switchScreen('gameScreen');
        
        // Resetar opacidade e aplicar efeito de entrada
        const gameScreen = document.getElementById('gameScreen');
        if (gameScreen) {
            gameScreen.style.transition = 'opacity 0.5s ease-in';
            gameScreen.style.opacity = '1';
        }
        
        updateUI();
        
        // Efeito de brilho no tabuleiro com múltiplas camadas
        const board = document.getElementById('board');
        if (board) {
            board.style.animation = 'none';
            board.style.boxShadow = '0 0 50px rgba(99,102,241,0.8), 0 0 100px rgba(99,102,241,0.4)';
            setTimeout(() => {
                board.style.boxShadow = '0 0 30px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.3)';
                setTimeout(() => {
                    board.style.boxShadow = '0 0 15px rgba(99,102,241,0.4), 0 0 30px rgba(99,102,241,0.2)';
                    setTimeout(() => {
                        board.style.boxShadow = '';
                    }, 500);
                }, 500);
            }, 500);
        }
        
        // Mensagens detalhadas no log com emojis
        addLog('🎮 PARTIDA INICIADA!', 'success');
        addLog(`📋 Modo: ${modeConfig.name}`, 'info');
        addLog(`👥 Jogadores: ${modeConfig.playerCount}`, 'info');
        addLog(`💰 Dinheiro inicial: $${modeConfig.startingMoney}`, 'info');
        addLog(`🎯 Objetivo: Ser o último jogador com dinheiro!`, 'info');
        
        // Notificações em sequência para melhor experiência
        setTimeout(() => {
            showNotification('🎮 Partida Iniciada!', `Modo: ${modeConfig.name}`, 'success');
        }, 300);
        
        setTimeout(() => {
            showNotification('👥', `${modeConfig.playerCount} jogadores no jogo`, 'info');
        }, 800);
        
        setTimeout(() => {
            showNotification('💰', `Cada jogador começa com $${modeConfig.startingMoney}`, 'info');
        }, 1300);
        
        // Tocar som de início com delay
        setTimeout(() => {
            soundManager.play('start');
        }, 500);
        
        // Criar mais partículas após um segundo
        setTimeout(() => {
            createParticles('money', 10, window.innerWidth / 2, window.innerHeight / 2);
        }, 1000);
        
        // Iniciar partida da IA automaticamente com delay maior
        if (getCurrentPlayer().type === 'ai') {
            setTimeout(() => {
                addLog('🤖 IA pensando...', 'warning');
                setTimeout(rollDice, 1500);
            }, 2000);
        }
    }, 500);
}

// Adicionar esta função ao escopo global
if (typeof window !== 'undefined') {
    window.enhancedStartGame = enhancedStartGame;
}
