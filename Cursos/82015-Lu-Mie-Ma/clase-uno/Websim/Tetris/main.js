import { Board } from 'board';
import { COLS, ROWS, BLOCK_SIZE, KEY, LEVEL } from 'constants';

// DOM elements
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');
const playButton = document.getElementById('play-button');
const playAgainButton = document.getElementById('play-again-button');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');

// Set canvas dimensions
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

let board = new Board(ctx, ctxNext);
let requestId;
let time = { start: 0, elapsed: 0, level: LEVEL[0] };
let score = 0;
let lines = 0;

const moves = {
    [KEY.LEFT]: p => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: p => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: p => ({ ...p, y: p.y + 1 }),
    [KEY.UP]: p => board.rotate(p),
    [KEY.SPACE]: p => ({ ...p, y: p.y + board.hardDrop(p) })
};

function handleKeyPress(event) {
    if (moves[event.code]) {
        event.preventDefault();
        let p = moves[event.code](board.piece);

        if (board.valid(p)) {
            if (event.code === KEY.SPACE) { // Hard drop
                board.piece.move(p);
                drop(); // force drop and lock
            } else {
                 board.piece.move(p);
            }
            // Clear and draw the board with the new piece position
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            board.draw();
        }
    }
}

function resetGame() {
    score = 0;
    lines = 0;
    updateAccount(0, 0);
    board.reset();
    time = { start: 0, elapsed: 0, level: LEVEL[0] };
    gameOverElement.classList.add('hidden');
    playButton.classList.remove('hidden');
}

function play() {
    resetGame();
    playButton.classList.add('hidden');
    time.start = performance.now();
    
    // If there's an old game running, cancel it
    if (requestId) {
        cancelAnimationFrame(requestId);
    }

    animate();
    document.addEventListener('keydown', handleKeyPress);
}

function animate(now = 0) {
    time.elapsed = now - time.start;
    if (time.elapsed > time.level) {
        time.start = now;
        if (!drop()) {
            gameOver();
            return;
        }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.draw();
    requestId = requestAnimationFrame(animate);
}

function drop() {
    let p = moves[KEY.DOWN](board.piece);
    if (board.valid(p)) {
        board.piece.move(p);
    } else {
        board.freeze();
        board.clearLines();
        
        if (board.piece.y === 0) { // Game over condition
            return false;
        }
        
        updateAccount(board.score, board.lines);
        
        // Update level
        if (lines >= LEVEL.length - 1) {
            time.level = LEVEL[LEVEL.length-1];
        } else {
            time.level = LEVEL[lines];
        }

        board.piece = board.next;
        board.next = board.getNewPiece();
        board.drawNext();
    }
    return true;
}

function updateAccount(newScore, newLines) {
    score += newScore;
    lines += newLines;
    scoreElement.textContent = score;
}

function gameOver() {
    cancelAnimationFrame(requestId);
    document.removeEventListener('keydown', handleKeyPress);
    gameOverElement.classList.remove('hidden');
}

playButton.addEventListener('click', play);
playAgainButton.addEventListener('click', play);

