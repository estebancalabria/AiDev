class PantallaInicio extends HTMLElement {
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
                @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css');
                
                :host {
                    display: block;
                    min-height: 100vh;
                    overflow: visible;
                    padding: 0 1em;
                }
                
                .container {
                    min-height: 100%;
                    display: flex;
                    flex-direction: column;
                    max-width: 100% !important;
                    margin-bottom: 2em;
                }
                
                .card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    width: 100%;
                }
                
                .categoria-btn {
                    height: 100%;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                
                .categoria-btn:hover {
                    transform: translateY(-5px);
                }
                
                .categorias-container {
                    flex: 1;
                    overflow: hidden;
                    padding: 1rem;
                }
                
                .categoria-img {
                    height: 100px;
                    object-fit: cover;
                }
            </style>
            
            <div class="container py-3">
                <!-- <h1 class="text-center mb-3">🎮 Juego de Preguntas y Respuestas</h1> -->
                <div class="card p-3">
                    <div class="mb-3">
                        <label for="nombre-jugador" class="form-label">👤 Tu Nombre:</label>
                        <input type="text" class="form-control" id="nombre-jugador" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">📚 Elige una Categoría:</label>
                        <div class="row g-2 categorias-container" id="categorias-container">
                            <!-- Las categorías se insertarán dinámicamente -->
                        </div>
                    </div>
                    <button id="iniciar-juego" class="btn btn-lg btn-warning" disabled>¡Comenzar Juego!</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const nombreInput = this.shadowRoot.getElementById('nombre-jugador');
        const iniciarBtn = this.shadowRoot.getElementById('iniciar-juego');
        const categoriasContainer = this.shadowRoot.getElementById('categorias-container');

        const categorias = [
            { nombre: 'Historia', imagen: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=500&auto=format' },
            { nombre: 'Ciencia', imagen: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format' },
            { nombre: 'Geografia', imagen: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=500&auto=format' },
            { nombre: 'Deportes', imagen: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format' },
            { nombre: 'Arte', imagen: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&auto=format' },
            { nombre: 'Entretenimiento', imagen: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format' }
        ];

        categorias.forEach(categoria => {
            const categoriaElement = document.createElement('div');
            categoriaElement.className = 'col-md-4 col-sm-6';
            categoriaElement.innerHTML = `
                <div class="card categoria-btn" data-categoria="${categoria.nombre}">
                    <img src="${categoria.imagen}" class="categoria-img" alt="${categoria.nombre}">
                    <div class="card-body p-2 text-center">
                        <h6 class="card-title mb-0">${categoria.nombre}</h6>
                    </div>
                </div>
            `;
            categoriasContainer.appendChild(categoriaElement);
        });

        nombreInput.addEventListener('input', () => {
            iniciarBtn.disabled = !nombreInput.value;
        });

        categoriasContainer.addEventListener('click', (e) => {
            const categoriaBtn = e.target.closest('.categoria-btn');
            if (categoriaBtn) {
                this.dispatchEvent(new CustomEvent('categoria-seleccionada', {
                    detail: { categoria: categoriaBtn.dataset.categoria }
                }));
            }
        });

        iniciarBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('iniciar-juego', {
                detail: { nombre: nombreInput.value }
            }));
        });
    }
}

customElements.define('pantalla-inicio', PantallaInicio); 