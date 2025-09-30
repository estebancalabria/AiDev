const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

canvas.width = 400;
canvas.height = 600;

let gameRunning = false;
let gameStarted = false;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;

const bird = {
    x: 100,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jumpPower: -8,
    color: '#FFD700'
};

const pipes = [];
const pipeWidth = 80;
const pipeGap = 200;
const pipeSpeed = 2;
let pipeTimer = 0;

function drawBird() {
    ctx.save();
    ctx.fillStyle = bird.color;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(bird.x + 8, bird.y - 5, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(bird.x + 10, bird.y - 5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.moveTo(bird.x + bird.radius, bird.y);
    ctx.lineTo(bird.x + bird.radius + 15, bird.y);
    ctx.lineTo(bird.x + bird.radius, bird.y + 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
}

function drawPipes() {
    ctx.fillStyle = '#228B22';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    
    pipes.forEach(pipe => {
        // Upper pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        
        // Lower pipe
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
        
        // Pipe caps
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, pipeWidth + 10, 30);
        ctx.fillRect(pipe.x - 5, canvas.height - pipe.bottomHeight, pipeWidth + 10, 30);
    });
    
    ctx.shadowBlur = 0;
}

function createPipe() {
    const minHeight = 100;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    const bottomHeight = canvas.height - topHeight - pipeGap;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomHeight: bottomHeight,
        passed: false
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    if (bird.y - bird.radius < 0) {
        bird.y = bird.radius;
        bird.velocity = 0;
    }
    
    if (bird.y + bird.radius > canvas.height) {
        gameOver();
    }
}

function updatePipes() {
    pipeTimer++;
    if (pipeTimer > 90) {
        createPipe();
        pipeTimer = 0;
    }
    
    pipes.forEach((pipe, index) => {
        pipe.x -= pipeSpeed;
        
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
        }
        
        if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
            pipe.passed = true;
            score++;
            scoreElement.textContent = score;
        }
        
        // Collision detection
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipeWidth) {
            if (bird.y - bird.radius < pipe.topHeight || bird.y + bird.radius > canvas.height - pipe.bottomHeight) {
                gameOver();
            }
        }
    });
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98D8E8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(100, 100, 30, 0, Math.PI * 2);
    ctx.arc(130, 100, 40, 0, Math.PI * 2);
    ctx.arc(160, 100, 30, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(300, 150, 25, 0, Math.PI * 2);
    ctx.arc(325, 150, 35, 0, Math.PI * 2);
    ctx.arc(350, 150, 25, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBackground();
    drawPipes();
    drawBird();
    
    updateBird();
    updatePipes();
    
    requestAnimationFrame(gameLoop);
}

function startGame() {
    gameStarted = true;
    gameRunning = true;
    score = 0;
    scoreElement.textContent = score;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes.length = 0;
    pipeTimer = 0;
    
    startScreen.classList.add('hidden');
    gameOverElement.classList.add('hidden');
    
    gameLoop();
}

function gameOver() {
    gameRunning = false;
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
    
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

function jump() {
    if (gameRunning) {
        bird.velocity = bird.jumpPower;
    }
}

canvas.addEventListener('click', jump);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jump();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameRunning) {
        e.preventDefault();
        jump();
    }
});

restartBtn.addEventListener('click', startGame);
startBtn.addEventListener('click', startGame);

// Initial draw
drawBackground();
drawBird();

