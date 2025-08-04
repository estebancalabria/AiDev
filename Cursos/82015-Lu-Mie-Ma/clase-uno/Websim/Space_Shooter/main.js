import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Enemy } from './enemy.js';
import { Projectile } from './projectile.js';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.assets = {};
        this.assetPromises = [];
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.soundBuffers = {};
        this.lastTime = 0;
        this.enemyTimer = 0;
        this.enemyInterval = 1000; // ms
        this.score = 0;
        this.gameOver = true;
        
        this.uiScore = document.getElementById('score');
        this.finalScore = document.getElementById('finalScore');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.startScreen = document.getElementById('startScreen');
        this.startButton = document.getElementById('startButton');
        this.restartButton = document.getElementById('restartButton');

        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.startGame());
    }

    async loadAssets() {
        const assetManifest = [
            { name: 'player.png', type: 'image' },
            { name: 'enemy.png', type: 'image' },
            { name: 'projectile.png', type: 'image' },
            { name: 'shoot.mp3', type: 'audio' },
            { name: 'explosion.mp3', type: 'audio' },
            { name: 'game-over.mp3', type: 'audio' }
        ];

        for (const asset of assetManifest) {
            if (asset.type === 'image') {
                const img = new Image();
                img.src = asset.name;
                this.assetPromises.push(new Promise(resolve => {
                    img.onload = () => {
                        this.assets[asset.name] = img;
                        resolve();
                    };
                }));
            } else if (asset.type === 'audio') {
                this.assetPromises.push(
                    fetch(asset.name)
                        .then(res => res.arrayBuffer())
                        .then(data => this.audioContext.decodeAudioData(data))
                        .then(buffer => {
                            this.soundBuffers[asset.name] = buffer;
                        })
                );
            }
        }
        await Promise.all(this.assetPromises);
    }
    
    playSound(name) {
        if (!this.soundBuffers[name] || this.audioContext.state === 'suspended') return;
        const source = this.audioContext.createBufferSource();
        source.buffer = this.soundBuffers[name];
        source.connect(this.audioContext.destination);
        source.start(0);
    }

    init() {
        this.input = new InputHandler(this);
        this.player = new Player(this);
        this.projectiles = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.score = 0;
        this.gameOver = false;
        this.uiScore.textContent = this.score;
        this.gameOverScreen.style.display = 'none';
        this.startScreen.style.display = 'none';
    }

    startGame() {
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        this.init();
        this.animate(0);
    }

    update(deltaTime) {
        if (this.gameOver) return;

        this.player.update(this.input.keys);

        // Update projectiles
        this.projectiles.forEach(p => p.update());
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);

        // Update enemies
        this.enemies.forEach(e => e.update());
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);

        // Spawn enemies
        if (this.enemyTimer > this.enemyInterval) {
            this.enemies.push(new Enemy(this));
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
        
        // Collision detection
        this.checkCollisions();
    }
    
    checkCollisions() {
        // Projectile vs Enemy
        this.projectiles.forEach(projectile => {
            this.enemies.forEach(enemy => {
                if (
                    projectile.x < enemy.x + enemy.width &&
                    projectile.x + projectile.width > enemy.x &&
                    projectile.y < enemy.y + enemy.height &&
                    projectile.y + projectile.height > enemy.y
                ) {
                    projectile.markedForDeletion = true;
                    enemy.markedForDeletion = true;
                    this.score++;
                    this.uiScore.textContent = this.score;
                    this.playSound('explosion.mp3');
                }
            });
        });
        
        // Player vs Enemy
        this.enemies.forEach(enemy => {
            if (
                this.player.x < enemy.x + enemy.width &&
                this.player.x + this.player.width > enemy.x &&
                this.player.y < enemy.y + enemy.height &&
                this.player.y + this.player.height > enemy.y
            ) {
                this.endGame();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.player.draw(this.ctx);
        this.projectiles.forEach(p => p.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));
    }
    
    endGame() {
        this.gameOver = true;
        this.finalScore.textContent = this.score;
        this.gameOverScreen.style.display = 'flex';
        this.playSound('game-over.mp3');
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        
        this.update(deltaTime);
        this.draw();

        if (!this.gameOver) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }
}

window.addEventListener('load', async () => {
    const canvas = document.getElementById('gameCanvas');
    canvas.width = 800;
    canvas.height = 600;

    const game = new Game(canvas);
    await game.loadAssets();
    game.startScreen.style.display = 'flex';
});

