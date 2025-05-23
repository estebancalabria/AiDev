class QuizGame {
    constructor() {
        this.playerName = '';
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.maxQuestions = 10;
        this.selectedCategory = null;

        // Elementos del DOM
        this.welcomeScreen = document.getElementById('welcome-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.playerNameInput = document.getElementById('player-name');
        this.startButton = document.getElementById('start-game');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.progressBar = document.getElementById('progress-bar');
        this.playerResult = document.getElementById('player-result');
        this.scoreText = document.getElementById('score-text');
        this.playAgainButton = document.getElementById('play-again');
        this.categoriesContainer = document.getElementById('categories-container');
        this.categoryTitle = document.getElementById('category-title');
        this.questionCounter = document.getElementById('question-counter');

        // Event listeners
        this.startButton.addEventListener('click', () => this.startGame());
        this.playAgainButton.addEventListener('click', () => this.resetGame());

        // Inicializar categorías
        this.initializeCategories();
    }

    initializeCategories() {
        this.categoriesContainer.innerHTML = '';
        Object.entries(categories).forEach(([key, category]) => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4';
            
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.category = key;
            
            card.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <h5>${category.name}</h5>
            `;
            
            card.addEventListener('click', () => this.selectCategory(key, card));
            col.appendChild(card);
            this.categoriesContainer.appendChild(col);
        });
    }

    selectCategory(categoryKey, card) {
        // Remover selección previa
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        
        // Seleccionar nueva categoría
        card.classList.add('selected');
        this.selectedCategory = categoryKey;
    }

    startGame() {
        const name = this.playerNameInput.value.trim();
        if (!name) {
            alert('Por favor, ingresa tu nombre');
            return;
        }

        if (!this.selectedCategory) {
            alert('Por favor, selecciona una categoría');
            return;
        }

        this.playerName = name;
        this.selectRandomQuestions();
        this.showGameScreen();
        this.displayQuestion();
    }

    selectRandomQuestions() {
        const categoryQuestions = categories[this.selectedCategory].questions;
        const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
        this.selectedQuestions = shuffled.slice(0, Math.min(this.maxQuestions, categoryQuestions.length));
        this.maxQuestions = this.selectedQuestions.length;
    }

    showGameScreen() {
        this.welcomeScreen.classList.add('d-none');
        this.gameScreen.classList.remove('d-none');
        this.resultsScreen.classList.add('d-none');
        
        // Mostrar título de la categoría
        this.categoryTitle.textContent = `${categories[this.selectedCategory].icon} ${categories[this.selectedCategory].name}`;
    }

    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestion];
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        
        // Actualizar contador de preguntas
        this.questionCounter.textContent = `Pregunta ${this.currentQuestion + 1} de ${this.maxQuestions}`;

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'btn option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index));
            this.optionsContainer.appendChild(button);
        });

        this.updateProgress();
    }

    checkAnswer(selectedIndex) {
        const question = this.selectedQuestions[this.currentQuestion];
        const buttons = this.optionsContainer.getElementsByClassName('option-btn');
        
        // Deshabilitar todos los botones
        Array.from(buttons).forEach(button => button.disabled = true);

        if (selectedIndex === question.correct) {
            buttons[selectedIndex].classList.add('correct');
            this.score++;
        } else {
            buttons[selectedIndex].classList.add('incorrect');
            buttons[question.correct].classList.add('correct');
        }

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.maxQuestions) {
                this.displayQuestion();
            } else {
                this.showResults();
            }
        }, 1500);
    }

    updateProgress() {
        const progress = ((this.currentQuestion) / this.maxQuestions) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    showResults() {
        this.gameScreen.classList.add('d-none');
        this.resultsScreen.classList.remove('d-none');
        
        const percentage = (this.score / this.maxQuestions) * 100;
        let message = '';
        
        if (percentage >= 90) {
            message = '¡Excelente! ¡Eres un genio! 🏆';
        } else if (percentage >= 70) {
            message = '¡Muy bien! ¡Buen trabajo! 🌟';
        } else if (percentage >= 50) {
            message = '¡Bien! ¡Sigue practicando! 💪';
        } else {
            message = '¡No te rindas! ¡Sigue intentando! 📚';
        }

        this.playerResult.textContent = `${this.playerName}, ${message}`;
        this.scoreText.textContent = `Puntuación: ${this.score} de ${this.maxQuestions}`;
    }

    resetGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.playerNameInput.value = '';
        this.selectedCategory = null;
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        this.welcomeScreen.classList.remove('d-none');
        this.gameScreen.classList.add('d-none');
        this.resultsScreen.classList.add('d-none');
    }
}

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
}); 