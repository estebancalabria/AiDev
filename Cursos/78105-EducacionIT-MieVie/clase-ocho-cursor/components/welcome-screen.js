class WelcomeScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 100vh;
                    width: 100vw;
                }
                .welcome-container {
                    text-align: center;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                h1 {
                    color: #2193b0;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 2vh;
                    font-size: 3vw;
                }
                .card {
                    background: white;
                    border-radius: 1.5vw;
                    padding: 2vw;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    max-width: 60vw;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                }
                input {
                    width: 100%;
                    padding: 1.2vw;
                    border: 2px solid #e0e0e0;
                    border-radius: 1vw;
                    margin-bottom: 1vw;
                    font-size: 1.2vw;
                    box-sizing: border-box;
                }
                input:focus {
                    border-color: #2193b0;
                    outline: none;
                    box-shadow: 0 0 0 0.2rem rgba(33, 147, 176, 0.25);
                }
                button {
                    background: linear-gradient(45deg, #2193b0, #6dd5ed);
                    border: none;
                    padding: 1.2vw 3vw;
                    border-radius: 2vw;
                    color: white;
                    font-size: 1.3vw;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 100%;
                }
                button:hover {
                    transform: scale(1.02);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1vw;
                    margin: 1vw 0;
                }
                .category-card {
                    cursor: pointer;
                    border: 2px solid #e0e0e0;
                    border-radius: 1vw;
                    padding: 1vw;
                    text-align: center;
                    transition: all 0.3s ease;
                    background: white;
                    font-size: 1.1vw;
                }
                .category-card:hover {
                    transform: translateY(-0.5vw);
                    border-color: #2193b0;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .category-card.selected {
                    border-color: #2193b0;
                    background: linear-gradient(45deg, #2193b0, #6dd5ed);
                    color: white;
                }
                .category-icon {
                    font-size: 2vw;
                    margin-bottom: 0.5vw;
                }
                h4 {
                    margin: 0.5vw 0;
                    font-size: 1.5vw;
                }
                @media (max-width: 900px) {
                    .card {
                        max-width: 90vw;
                        padding: 3vw;
                    }
                    .categories-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    h1 {
                        font-size: 5vw;
                    }
                    .category-card {
                        font-size: 2vw;
                    }
                    .category-icon {
                        font-size: 4vw;
                    }
                }
                @media (max-width: 600px) {
                    .card {
                        max-width: 98vw;
                        padding: 2vw;
                    }
                    .categories-grid {
                        grid-template-columns: 1fr;
                    }
                    h1 {
                        font-size: 7vw;
                    }
                    .category-card {
                        font-size: 3vw;
                    }
                    .category-icon {
                        font-size: 6vw;
                    }
                }
            </style>
            <div class="welcome-container">
                <h1>🎮 Juego de Preguntas 🎮</h1>
                <div class="card">
                    <input type="text" id="player-name" placeholder="Ingresa tu nombre">
                    <h4>Elige una categoría:</h4>
                    <div id="categories-container" class="categories-grid"></div>
                    <button id="start-game">¡Comenzar Juego!</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const startButton = this.shadowRoot.getElementById('start-game');
        const playerNameInput = this.shadowRoot.getElementById('player-name');
        const categoriesContainer = this.shadowRoot.getElementById('categories-container');

        // Cargar categorías
        Object.entries(categories).forEach(([key, category]) => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.dataset.category = key;
            card.innerHTML = `
                <div class="category-icon">${category.icon}</div>
                <h5>${category.name}</h5>
            `;
            card.addEventListener('click', () => this.selectCategory(key, card));
            categoriesContainer.appendChild(card);
        });

        startButton.addEventListener('click', () => {
            const name = playerNameInput.value.trim();
            const selectedCategory = this.shadowRoot.querySelector('.category-card.selected');
            
            if (!name) {
                alert('Por favor, ingresa tu nombre');
                return;
            }

            if (!selectedCategory) {
                alert('Por favor, selecciona una categoría');
                return;
            }

            this.dispatchEvent(new CustomEvent('game-start', {
                detail: {
                    playerName: name,
                    category: selectedCategory.dataset.category
                }
            }));
        });
    }

    selectCategory(categoryKey, card) {
        this.shadowRoot.querySelectorAll('.category-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    }
}

customElements.define('welcome-screen', WelcomeScreen); 