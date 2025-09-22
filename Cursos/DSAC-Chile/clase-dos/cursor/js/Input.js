class Input {
    constructor(player, weapon) {
        this.player = player;
        this.weapon = weapon;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isPointerLocked = false;
        
        this.setupEventListeners();
        this.requestPointerLock();
    }
    
    setupEventListeners() {
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('click', (e) => this.handleClick(e));
        
        // Pointer Lock
        document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
        document.addEventListener('pointerlockerror', () => this.onPointerLockError());
    }
    
    requestPointerLock() {
        document.body.requestPointerLock();
    }
    
    onPointerLockChange() {
        this.isPointerLocked = document.pointerLockElement === document.body;
        
        if (this.isPointerLocked) {
            console.log('Pointer lock activado');
        } else {
            console.log('Pointer lock desactivado');
        }
    }
    
    onPointerLockError() {
        console.error('Error al activar pointer lock');
    }
    
    handleKeyDown(event) {
        switch(event.code) {
            case 'KeyW':
                this.player.keys.w = true;
                break;
            case 'KeyA':
                this.player.keys.a = true;
                break;
            case 'KeyS':
                this.player.keys.s = true;
                break;
            case 'KeyD':
                this.player.keys.d = true;
                break;
            case 'Space':
                event.preventDefault();
                this.player.keys.space = true;
                break;
            case 'KeyR':
                this.weapon.startReload();
                break;
            case 'Escape':
                this.togglePause();
                break;
        }
    }
    
    handleKeyUp(event) {
        switch(event.code) {
            case 'KeyW':
                this.player.keys.w = false;
                break;
            case 'KeyA':
                this.player.keys.a = false;
                break;
            case 'KeyS':
                this.player.keys.s = false;
                break;
            case 'KeyD':
                this.player.keys.d = false;
                break;
            case 'Space':
                this.player.keys.space = false;
                break;
        }
    }
    
    handleMouseMove(event) {
        if (!this.isPointerLocked) return;
        
        const sensitivity = 0.002;
        
        // Rotación horizontal (Y-axis)
        this.player.mesh.rotation.y -= event.movementX * sensitivity;
        
        // Rotación vertical (X-axis) - limitada
        this.mouseY -= event.movementY * sensitivity;
        this.mouseY = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.mouseY));
        
        // Aplicar rotación vertical a la cámara
        this.player.camera.rotation.x = this.mouseY;
    }
    
    handleClick(event) {
        if (this.isPointerLocked) {
            this.weapon.shoot();
        } else {
            // Si no está en pointer lock, activarlo
            this.requestPointerLock();
        }
    }
    
    togglePause() {
        // Implementar pausa del juego
        if (window.game) {
            if (window.game.gameState === 'playing') {
                window.game.gameState = 'paused';
                this.showPauseMenu();
            } else if (window.game.gameState === 'paused') {
                window.game.gameState = 'playing';
                this.hidePauseMenu();
            }
        }
    }
    
    showPauseMenu() {
        // Crear menú de pausa
        const pauseMenu = document.createElement('div');
        pauseMenu.id = 'pauseMenu';
        pauseMenu.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            color: white;
            font-size: 24px;
            text-align: center;
        `;
        
        pauseMenu.innerHTML = `
            <div>
                <h2>Juego Pausado</h2>
                <p>Presiona ESC para continuar</p>
                <p>WASD - Mover</p>
                <p>Mouse - Mirar</p>
                <p>Click - Disparar</p>
                <p>R - Recargar</p>
            </div>
        `;
        
        document.body.appendChild(pauseMenu);
    }
    
    hidePauseMenu() {
        const pauseMenu = document.getElementById('pauseMenu');
        if (pauseMenu) {
            pauseMenu.remove();
        }
    }
    
    // Métodos para manejar diferentes tipos de input
    handleTouchStart(event) {
        // Para dispositivos táctiles
        event.preventDefault();
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
    }
    
    handleTouchMove(event) {
        // Para dispositivos táctiles
        if (!this.touchStartX || !this.touchStartY) return;
        
        event.preventDefault();
        
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        
        const deltaX = touchX - this.touchStartX;
        const deltaY = touchY - this.touchStartY;
        
        // Simular movimiento del mouse
        this.handleMouseMove({
            movementX: deltaX,
            movementY: deltaY
        });
        
        this.touchStartX = touchX;
        this.touchStartY = touchY;
    }
    
    handleTouchEnd(event) {
        // Para dispositivos táctiles
        this.touchStartX = null;
        this.touchStartY = null;
    }
    
    // Método para configurar controles táctiles
    setupTouchControls() {
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
    }
}
