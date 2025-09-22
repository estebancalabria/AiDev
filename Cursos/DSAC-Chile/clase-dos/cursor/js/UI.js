class UI {
    constructor() {
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.levelElement = document.getElementById('level');
        this.gameOverElement = document.getElementById('gameOver');
        this.finalScoreElement = document.getElementById('finalScore');
        this.restartBtn = document.getElementById('restartBtn');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.restartBtn.addEventListener('click', () => {
            if (window.game) {
                window.game.restart();
            }
        });
    }
    
    updateScore(score) {
        this.scoreElement.textContent = score;
    }
    
    updateLives(lives) {
        this.livesElement.textContent = lives;
        
        // Cambiar color según las vidas
        if (lives <= 1) {
            this.livesElement.style.color = '#ff0000';
        } else if (lives <= 2) {
            this.livesElement.style.color = '#ffaa00';
        } else {
            this.livesElement.style.color = '#ffffff';
        }
    }
    
    updateLevel(level) {
        this.levelElement.textContent = level;
    }
    
    showGameOver(finalScore) {
        this.finalScoreElement.textContent = finalScore;
        this.gameOverElement.style.display = 'block';
    }
    
    hideGameOver() {
        this.gameOverElement.style.display = 'none';
    }
    
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            z-index: 1000;
            text-align: center;
            border: 2px solid #00ff00;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
    
    updateAmmo(ammo, maxAmmo) {
        // Crear o actualizar indicador de munición
        let ammoElement = document.getElementById('ammo');
        if (!ammoElement) {
            ammoElement = document.createElement('div');
            ammoElement.id = 'ammo';
            ammoElement.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                color: white;
                font-size: 18px;
                z-index: 100;
            `;
            document.getElementById('gameContainer').appendChild(ammoElement);
        }
        
        ammoElement.textContent = `Munición: ${ammo}/${maxAmmo}`;
        
        // Cambiar color según la munición
        if (ammo <= 5) {
            ammoElement.style.color = '#ff0000';
        } else if (ammo <= 10) {
            ammoElement.style.color = '#ffaa00';
        } else {
            ammoElement.style.color = '#ffffff';
        }
    }
    
    showReloading() {
        const reloadElement = document.getElementById('reload');
        if (!reloadElement) {
            const reload = document.createElement('div');
            reload.id = 'reload';
            reload.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 24px;
                z-index: 100;
                text-align: center;
                background: rgba(0, 0, 0, 0.7);
                padding: 20px;
                border-radius: 10px;
            `;
            document.getElementById('gameContainer').appendChild(reload);
        }
        
        const reload = document.getElementById('reload');
        reload.textContent = 'RECARGANDO...';
        reload.style.display = 'block';
    }
    
    hideReloading() {
        const reloadElement = document.getElementById('reload');
        if (reloadElement) {
            reloadElement.style.display = 'none';
        }
    }
    
    createHealthBar() {
        const healthBar = document.createElement('div');
        healthBar.id = 'healthBar';
        healthBar.style.cssText = `
            position: absolute;
            bottom: 60px;
            left: 20px;
            width: 200px;
            height: 20px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid #ffffff;
            border-radius: 10px;
            overflow: hidden;
        `;
        
        const healthFill = document.createElement('div');
        healthFill.id = 'healthFill';
        healthFill.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00);
            transition: width 0.3s ease;
        `;
        
        healthBar.appendChild(healthFill);
        document.getElementById('gameContainer').appendChild(healthBar);
    }
    
    updateHealth(health, maxHealth) {
        let healthBar = document.getElementById('healthBar');
        if (!healthBar) {
            this.createHealthBar();
            healthBar = document.getElementById('healthBar');
        }
        
        const healthFill = document.getElementById('healthFill');
        const healthPercentage = (health / maxHealth) * 100;
        healthFill.style.width = `${healthPercentage}%`;
    }
    
    showLevelUp(level) {
        this.showNotification(`¡NIVEL ${level} ALCANZADO!`, 2000);
    }
    
    showKillStreak(streak) {
        if (streak > 0 && streak % 5 === 0) {
            this.showNotification(`¡RACHA DE ${streak} ELIMINACIONES!`, 1500);
        }
    }
    
    createMinimap() {
        const minimap = document.createElement('div');
        minimap.id = 'minimap';
        minimap.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            width: 150px;
            height: 150px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid #ffffff;
            border-radius: 10px;
            z-index: 100;
        `;
        
        document.getElementById('gameContainer').appendChild(minimap);
    }
    
    updateMinimap(playerPos, enemies) {
        let minimap = document.getElementById('minimap');
        if (!minimap) {
            this.createMinimap();
            minimap = document.getElementById('minimap');
        }
        
        // Limpiar minimap
        minimap.innerHTML = '';
        
        // Dibujar jugador
        const playerDot = document.createElement('div');
        playerDot.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: #00ff00;
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `;
        minimap.appendChild(playerDot);
        
        // Dibujar enemigos
        enemies.forEach(enemy => {
            const enemyDot = document.createElement('div');
            enemyDot.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: #ff0000;
                border-radius: 50%;
                left: ${50 + (enemy.mesh.position.x - playerPos.x) * 2}%;
                top: ${50 + (enemy.mesh.position.z - playerPos.z) * 2}%;
                transform: translate(-50%, -50%);
            `;
            minimap.appendChild(enemyDot);
        });
    }
}
