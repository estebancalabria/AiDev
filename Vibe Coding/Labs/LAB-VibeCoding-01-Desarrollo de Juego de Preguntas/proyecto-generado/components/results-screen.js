class ResultsScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    static get observedAttributes() {
        return ['player-name', 'score', 'total-questions'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'score' && newValue) {
            this.updateResults();
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
                .results-container {
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                h2 {
                    color: #2193b0;
                    margin-bottom: 1.5rem;
                    font-size: 2.5rem;
                }
                .card {
                    background: white;
                    border-radius: 15px;
                    padding: 1.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    max-width: 600px;
                    margin: 0 auto;
                }
                .result-message {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    color: #333;
                }
                .score-text {
                    font-size: 1.1rem;
                    color: #666;
                    margin-bottom: 1.5rem;
                }
                button {
                    background: linear-gradient(45deg, #2193b0, #6dd5ed);
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    color: white;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                }
                button:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
            </style>
            <div class="results-container">
                <h2>¡Juego Terminado!</h2>
                <div class="card">
                    <h3 class="result-message"></h3>
                    <p class="score-text"></p>
                    <button id="play-again">Jugar de nuevo</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const playAgainButton = this.shadowRoot.getElementById('play-again');
        playAgainButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('play-again'));
        });
    }

    updateResults() {
        const playerName = this.getAttribute('player-name');
        const score = parseInt(this.getAttribute('score'));
        const totalQuestions = parseInt(this.getAttribute('total-questions'));
        const percentage = (score / totalQuestions) * 100;

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

        this.shadowRoot.querySelector('.result-message').textContent = `${playerName}, ${message}`;
        this.shadowRoot.querySelector('.score-text').textContent = 
            `Puntuación: ${score} de ${totalQuestions}`;
    }
}

customElements.define('results-screen', ResultsScreen); 