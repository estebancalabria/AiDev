class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.clock = new THREE.Clock();
        
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameState = 'playing'; // 'playing', 'paused', 'gameOver'
        
        this.enemies = [];
        this.bullets = [];
        this.particles = [];
        
        this.init();
    }
    
    init() {
        // Configurar renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000011);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('gameContainer').appendChild(this.renderer.domElement);
        
        // Inicializar sistemas
        this.sceneManager = new Scene(this.scene);
        this.player = new Player(this.scene, this.camera);
        this.weapon = new Weapon(this.scene, this.camera);
        this.input = new Input(this.player, this.weapon);
        this.ui = new UI();
        
        // Configurar cámara
        this.camera.position.set(0, 1.6, 0);
        
        // Iniciar bucle de juego
        this.animate();
        
        // Event listeners
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Iniciar generación de enemigos
        this.startEnemySpawn();
    }
    
    startEnemySpawn() {
        setInterval(() => {
            if (this.gameState === 'playing') {
                this.spawnEnemy();
            }
        }, 2000 - (this.level * 100)); // Más enemigos en niveles superiores
    }
    
    spawnEnemy() {
        const enemy = new Enemy(this.scene, this.player);
        this.enemies.push(enemy);
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = this.clock.getDelta();
        
        // Actualizar jugador
        this.player.update(deltaTime);
        
        // Actualizar enemigos
        this.enemies.forEach((enemy, index) => {
            enemy.update(deltaTime);
            if (enemy.isDead) {
                this.enemies.splice(index, 1);
                this.scene.remove(enemy.mesh);
            }
        });
        
        // Actualizar balas del arma
        this.weapon.update(deltaTime);
        this.bullets = this.weapon.getBullets();
        
        // Verificar colisiones
        this.checkCollisions();
        
        // Actualizar UI
        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
        this.ui.updateLevel(this.level);
        
        // Verificar condición de derrota
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    checkCollisions() {
        // Colisión balas con enemigos
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (bullet.position.distanceTo(enemy.mesh.position) < 1) {
                    // Impacto
                    enemy.takeDamage(1);
                    this.scene.remove(bullet);
                    
                    if (enemy.isDead) {
                        this.score += 10;
                        this.enemies.splice(enemyIndex, 1);
                        this.scene.remove(enemy.mesh);
                    }
                }
            });
        });
        
        // Colisión enemigos con jugador
        this.enemies.forEach((enemy) => {
            if (enemy.mesh.position.distanceTo(this.player.mesh.position) < 2) {
                this.lives--;
                enemy.takeDamage(100); // Eliminar enemigo
            }
        });
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.ui.showGameOver(this.score);
    }
    
    restart() {
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.gameState = 'playing';
        
        // Limpiar enemigos y balas
        this.enemies.forEach(enemy => this.scene.remove(enemy.mesh));
        this.bullets.forEach(bullet => this.scene.remove(bullet));
        this.enemies = [];
        this.bullets = [];
        
        // Resetear jugador
        this.player.reset();
        
        this.ui.hideGameOver();
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.renderer.render(this.scene, this.camera);
    }
}
