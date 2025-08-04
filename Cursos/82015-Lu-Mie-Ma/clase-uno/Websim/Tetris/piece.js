import { COLS } from 'constants';

export class Piece {
    constructor(ctx, shape, color) {
        this.ctx = ctx;
        this.shape = shape;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(COLS / 2) - Math.floor(this.shape[0].length / 2);
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }
}