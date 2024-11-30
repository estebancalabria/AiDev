// Palabras para adivinar
const words = [
    'javascript', 'html', 'css', 'programacion', 
    'computadora', 'desarrollo', 'web', 'sistema'
];

class HangmanGame {
    constructor() {
        this.word = '';
        this.guessedLetters = new Set();
        this.remainingAttempts = 5;
        this.initElements();
        this.setupEventListeners();
    }

    initElements() {
        this.startScreen = document.getElementById('startScreen');
        this.gameContent = document.getElementById('gameContent');
        this.resultsScreen = document.getElementById('resultsScreen');
        this.wordDisplay = document.getElementById('wordDisplay');
        this.attemptsDisplay = document.getElementById('attempts');
        this.keyboard = document.getElementById('keyboard');
        this.resultEmoji = document.getElementById('resultEmoji');
        this.resultMessage = document.getElementById('resultMessage');
    }

    setupEventListeners() {
        document.getElementById('newGameBtn').addEventListener('click', () => this.startGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.startGame());
    }

    startGame() {
        this.reset();
        this.chooseWord();
        this.renderWord();
        this.renderKeyboard();
        this.showGameContent();
    }

    reset() {
        this.guessedLetters.clear();
        this.remainingAttempts = 5;
        this.attemptsDisplay.textContent = this.remainingAttempts;
        this.hideHangmanParts();
        this.startScreen.style.display = 'none';
        this.resultsScreen.style.display = 'none';
    }

    chooseWord() {
        this.word = words[Math.floor(Math.random() * words.length)];
    }

    renderWord() {
        const displayWord = this.word
            .split('')
            .map(letter => this.guessedLetters.has(letter) ? letter : '_')
            .join(' ');
        this.wordDisplay.textContent = displayWord;
    }

    renderKeyboard() {
        this.keyboard.innerHTML = '';
        for (let i = 97; i <= 122; i++) {
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => this.handleGuess(letter, button));
            this.keyboard.appendChild(button);
        }
    }

    handleGuess(letter, button) {
        if (this.guessedLetters.has(letter) || this.remainingAttempts === 0) return;

        this.guessedLetters.add(letter);
        button.classList.add('used');

        if (this.word.includes(letter)) {
            button.classList.add('correct');
            this.renderWord();
            if (this.isGameWon()) this.endGame(true);
        } else {
            button.classList.add('incorrect');
            this.decreaseAttempts();
            this.showHangmanPart();
        }
    }

    decreaseAttempts() {
        this.remainingAttempts--;
        this.attemptsDisplay.textContent = this.remainingAttempts;
        if (this.remainingAttempts === 0) this.endGame(false);
    }

    isGameWon() {
        return [...this.word].every(letter => this.guessedLetters.has(letter));
    }

    endGame(won) {
        this.gameContent.style.display = 'none';
        this.resultsScreen.style.display = 'flex';
        
        if (won) {
            this.resultEmoji.textContent = '🎉';
            this.resultMessage.textContent = '¡Ganaste! La palabra era: ' + this.word;
        } else {
            this.resultEmoji.textContent = '😢';
            this.resultMessage.textContent = 'Perdiste. La palabra era: ' + this.word;
        }
    }

    showGameContent() {
        this.gameContent.style.display = 'block';
    }

    showHangmanPart() {
        const partsOrder = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
        const partToShow = document.getElementById(partsOrder[6 - this.remainingAttempts - 1]);
        if (partToShow) partToShow.style.display = 'block';
    }

    hideHangmanParts() {
        ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg']
            .forEach(part => {
                const element = document.getElementById(part);
                if (element) element.style.display = 'none';
            });
    }
}

// Iniciar juego al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    new HangmanGame();
});
