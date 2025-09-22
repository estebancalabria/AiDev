// Archivo principal del juego
let game;

// Inicializar el juego cuando la página esté cargada
document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando juego Shooter 3D...');
    
    try {
        // Crear instancia del juego
        game = new Game();
        
        // Hacer el juego accesible globalmente para debugging
        window.game = game;
        
        console.log('Juego inicializado correctamente');
        
        // Mostrar instrucciones iniciales
        showInitialInstructions();
        
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
        showError('Error al cargar el juego. Por favor, recarga la página.');
    }
});

function showInitialInstructions() {
    const instructions = document.createElement('div');
    instructions.id = 'initialInstructions';
    instructions.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        color: white;
        font-size: 20px;
        text-align: center;
        flex-direction: column;
    `;
    
    instructions.innerHTML = `
        <div>
            <h1>🎮 Shooter 3D</h1>
            <h2>¡Bienvenido al juego!</h2>
            <div style="margin: 30px 0;">
                <p><strong>Controles:</strong></p>
                <p>WASD - Mover</p>
                <p>Mouse - Mirar alrededor</p>
                <p>Click - Disparar</p>
                <p>R - Recargar</p>
                <p>ESC - Pausar</p>
            </div>
            <div style="margin: 30px 0;">
                <p><strong>Objetivo:</strong></p>
                <p>Elimina a todos los enemigos rojos</p>
                <p>Evita que te toquen</p>
                <p>¡Sobrevive el mayor tiempo posible!</p>
            </div>
            <button id="startGameBtn" style="
                background: #00ff00;
                color: black;
                border: none;
                padding: 15px 30px;
                font-size: 18px;
                cursor: pointer;
                border-radius: 10px;
                margin-top: 20px;
            ">¡Comenzar Juego!</button>
        </div>
    `;
    
    document.body.appendChild(instructions);
    
    // Event listener para el botón de inicio
    document.getElementById('startGameBtn').addEventListener('click', () => {
        instructions.remove();
        // El juego ya está iniciado, solo removemos las instrucciones
    });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ff0000;
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        z-index: 3000;
        text-align: center;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
}

// Función para reiniciar el juego
function restartGame() {
    if (game) {
        game.restart();
    }
}

// Función para pausar/reanudar el juego
function togglePause() {
    if (game) {
        if (game.gameState === 'playing') {
            game.gameState = 'paused';
        } else if (game.gameState === 'paused') {
            game.gameState = 'playing';
        }
    }
}

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    console.error('Error no capturado:', event.error);
    showError('Ha ocurrido un error inesperado. Por favor, recarga la página.');
});

// Manejar errores de promesas rechazadas
window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesa rechazada:', event.reason);
    showError('Error de carga. Por favor, recarga la página.');
});

// Función de utilidad para debugging
function debugInfo() {
    if (game) {
        console.log('=== DEBUG INFO ===');
        console.log('Score:', game.score);
        console.log('Lives:', game.lives);
        console.log('Level:', game.level);
        console.log('Game State:', game.gameState);
        console.log('Enemies:', game.enemies.length);
        console.log('Bullets:', game.bullets.length);
        console.log('Player Position:', game.player.getPosition());
        console.log('==================');
    }
}

// Hacer funciones de debugging disponibles globalmente
window.debugInfo = debugInfo;
window.restartGame = restartGame;
window.togglePause = togglePause;
