export class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 44;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height;
        this.speedY = Math.random() * 2 + 1;
        this.image = this.game.assets['enemy.png'];
        this.markedForDeletion = false;
    }

    update() {
        this.y += this.speedY;
        if (this.y > this.game.height) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        if (this.image) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

