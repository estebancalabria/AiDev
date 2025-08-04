import { Piece } from 'piece';
import { COLS, ROWS, COLORS, SHAPES, POINTS } from 'constants';

export class Board {
    constructor(ctx, ctxNext) {
        this.ctx = ctx;
        this.ctxNext = ctxNext;
        this.score = 0;
        this.lines = 0;
        this.reset();
    }

    reset() {
        this.grid = this.getEmptyGrid();
        this.piece = this.getNewPiece();
        this.next = this.getNewPiece();
        this.drawNext();
        this.score = 0;
        this.lines = 0;
    }

    getEmptyGrid() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }
    
    getNewPiece() {
        const typeId = this.randomizeTetrominoType(SHAPES.length -1);
        const shape = SHAPES[typeId];
        const color = COLORS[typeId];
        return new Piece(this.ctx, shape, color);
    }
    
    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes + 1);
    }

    draw() {
        this.piece.draw();
        this.drawBoard();
    }

    drawBoard() {
        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillStyle = COLORS[value];
                    this.ctx.fillRect(x, y, 1, 1);
                }
            });
        });
    }
    
    drawNext() {
        this.ctxNext.clearRect(0, 0, this.ctxNext.canvas.width, this.ctxNext.canvas.height);
        const piece = this.next;
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctxNext.fillStyle = piece.color;
                    this.ctxNext.fillRect(x, y, 1, 1);
                }
            });
        });
    }
    
    rotate(piece) {
        // Clone the piece to avoid modifying the original
        let p = JSON.parse(JSON.stringify(piece));
        
        // The O piece does not rotate
        if (p.shape.length === 2) {
             return p;
        }

        const shape = p.shape;
        const n = shape.length;
        const newShape = Array.from({ length: n }, () => Array(n).fill(0));

        // Perform a 90-degree clockwise rotation
        for (let y = 0; y < n; y++) {
            for (let x = 0; x < n; x++) {
                newShape[x][n - 1 - y] = shape[y][x];
            }
        }
        
        p.shape = newShape;
        return p;
    }

    valid(p) {
        return p.shape.every((row, dy) => {
            return row.every((value, dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 ||
                    (this.insideWalls(x) && this.aboveFloor(y) && !this.collides(x, y))
                );
            });
        });
    }

    insideWalls(x) {
        return x >= 0 && x < COLS;
    }

    aboveFloor(y) {
        return y < ROWS;
    }

    collides(x, y) {
        return this.grid[y] && this.grid[y][x];
    }
    
    freeze() {
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.grid[this.piece.y + y][this.piece.x + x] = value;
                }
            });
        });
    }
    
    clearLines() {
        let linesCleared = 0;
        this.grid.forEach((row, y) => {
            if (row.every(value => value > 0)) {
                linesCleared++;
                this.grid.splice(y, 1);
                this.grid.unshift(Array(COLS).fill(0));
            }
        });
        
        if (linesCleared > 0) {
            this.score += this.getLineClearPoints(linesCleared);
            this.lines += linesCleared;
        }
    }
    
    getLineClearPoints(lines) {
        return lines === 1 ? POINTS.SINGLE :
               lines === 2 ? POINTS.DOUBLE :
               lines === 3 ? POINTS.TRIPLE :
               lines === 4 ? POINTS.TETRIS :
               0;
    }

    hardDrop(p) {
        let y = p.y;
        while(this.valid({...p, y: y + 1})) {
            y++;
        }
        return y - p.y;
    }
}