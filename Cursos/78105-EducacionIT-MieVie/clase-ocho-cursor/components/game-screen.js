class GameScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedQuestions = [];
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['category', 'player-name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'category' && newValue) {
            this.initializeGame(newValue);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100%;
                    width: 100%;
                }
                .game-container {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 1rem;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .category-title {
                    color: #2193b0;
                    font-weight: 600;
                    margin: 0;
                    font-size: 1.5rem;
                }
                .progress-container {
                    flex-grow: 1;
                    margin: 0 1rem;
                }
                .progress {
                    height: 10px;
                    border-radius: 5px;
                    background-color: #e9ecef;
                }
                .progress-bar {
                    background: linear-gradient(45deg, #2193b0, #6dd5ed);
                    transition: width 0.3s ease;
                    height: 100%;
                    border-radius: 5px;
                }
                .question-counter {
                    background: #2193b0;
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 1rem;
                }
                .card {
                    background: white;
                    border-radius: 15px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .question-text {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    color: #333;
                }
                .options-container {
                    display: grid;
                    gap: 0.8rem;
                    flex: 1;
                }
                .option-btn {
                    background: white;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    padding: 0.8rem;
                    text-align: left;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    font-size: 1rem;
                }
                .option-btn:hover {
                    background: #f8f9fa;
                    border-color: #2193b0;
                }
                .option-btn.correct {
                    background: #28a745;
                    color: white;
                    border-color: #28a745;
                }
                .option-btn.incorrect {
                    background: #dc3545;
                    color: white;
                    border-color: #dc3545;
                }
            </style>
            <div class="game-container">
                <div class="header">
                    <h3 class="category-title"></h3>
                    <div class="progress-container">
                        <div class="progress">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                    <span class="question-counter"></span>
                </div>
                <div class="card">
                    <h2 class="question-text"></h2>
                    <div class="options-container"></div>
                </div>
            </div>
        `;
    }

    initializeGame(categoryKey) {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedQuestions = this.selectRandomQuestions(categoryKey);
        this.updateCategoryTitle(categoryKey);
        this.displayQuestion();
    }

    selectRandomQuestions(categoryKey) {
        const categoryQuestions = categories[categoryKey].questions;
        const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(10, categoryQuestions.length));
    }

    updateCategoryTitle(categoryKey) {
        const category = categories[categoryKey];
        this.shadowRoot.querySelector('.category-title').textContent = 
            `${category.icon} ${category.name}`;
    }

    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestion];
        const questionText = this.shadowRoot.querySelector('.question-text');
        const optionsContainer = this.shadowRoot.querySelector('.options-container');
        const questionCounter = this.shadowRoot.querySelector('.question-counter');

        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
        questionCounter.textContent = `Pregunta ${this.currentQuestion + 1} de ${this.selectedQuestions.length}`;

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index));
            optionsContainer.appendChild(button);
        });

        this.updateProgress();
    }

    checkAnswer(selectedIndex) {
        const question = this.selectedQuestions[this.currentQuestion];
        const buttons = this.shadowRoot.querySelectorAll('.option-btn');
        
        buttons.forEach(button => button.disabled = true);

        if (selectedIndex === question.correct) {
            buttons[selectedIndex].classList.add('correct');
            this.score++;
        } else {
            buttons[selectedIndex].classList.add('incorrect');
            buttons[question.correct].classList.add('correct');
        }

        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < this.selectedQuestions.length) {
                this.displayQuestion();
            } else {
                this.gameOver();
            }
        }, 1500);
    }

    updateProgress() {
        const progress = ((this.currentQuestion) / this.selectedQuestions.length) * 100;
        this.shadowRoot.querySelector('.progress-bar').style.width = `${progress}%`;
    }

    gameOver() {
        this.dispatchEvent(new CustomEvent('game-over', {
            detail: {
                score: this.score,
                totalQuestions: this.selectedQuestions.length
            }
        }));
    }
}

customElements.define('game-screen', GameScreen); 