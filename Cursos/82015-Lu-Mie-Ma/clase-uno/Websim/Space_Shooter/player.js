import { Projectile } from './projectile.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 45;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height - 20;
        this.speedX = 0;
        this.maxSpeed = 7;
        this.image = this.game.assets['player.png'];
        this.shootCooldown = 250; // ms
        this.lastShotTime = 0;
    }

    update(keys) {
        const currentTime = performance.now();
        // Movement
        if (keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;
        this.x += this.speedX;

        // Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // Shooting
        if ((keys.includes(' ') || keys.includes('ArrowUp')) && currentTime - this.lastShotTime > this.shootCooldown) {
            this.shoot();
            this.lastShotTime = currentTime;
        }
    }

    draw(context) {
        if (this.image) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    shoot() {
        this.game.projectiles.push(new Projectile(this.game, this.x + this.width / 2 - 2.5, this.y));
        this.game.playSound('shoot.mp3');
    }
}