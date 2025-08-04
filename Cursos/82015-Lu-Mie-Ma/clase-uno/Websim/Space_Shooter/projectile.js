export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.width = 5;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.speed = 10;
        this.image = this.game.assets['projectile.png'];
        this.markedForDeletion = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0 - this.height) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
         if (this.image) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}

