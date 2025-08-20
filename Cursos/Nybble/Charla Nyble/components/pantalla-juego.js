class PantallaJuego extends HTMLElement {
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
                
                .card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .opcion-btn {
                    transition: all 0.3s ease;
                }
                
                .opcion-btn:hover {
                    transform: translateX(10px);
                }
                
                .opcion-btn.correcta {
                    background-color: #28a745;
                    color: white;
                }
                
                .opcion-btn.incorrecta {
                    background-color: #dc3545;
                    color: white;
                }
            </style>
            
            <div class="card p-4 mx-auto" style="max-width: 800px;">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 id="nombre-jugador-actual"></h3>
                    <div class="progress" style="width: 200px;">
                        <div id="barra-progreso" class="progress-bar" role="progressbar" style="width: 0%"></div>
                    </div>
                </div>
                <div id="pregunta-container">
                    <h4 id="pregunta-texto" class="mb-4"></h4>
                    <div id="opciones-container" class="d-grid gap-2">
                    </div>
                </div>
                <button id="siguiente-btn" class="btn btn-primary mt-4 d-none">Siguiente</button>
            </div>
        `;
    }

    setupEventListeners() {
        this.siguienteBtn = this.shadowRoot.getElementById('siguiente-btn');
        this.siguienteBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('siguiente-pregunta'));
        });
    }

    actualizarPregunta(pregunta, opciones) {
        const preguntaTexto = this.shadowRoot.getElementById('pregunta-texto');
        const opcionesContainer = this.shadowRoot.getElementById('opciones-container');
        
        preguntaTexto.textContent = pregunta;
        opcionesContainer.innerHTML = '';
        
        opciones.forEach(opcion => {
            const boton = document.createElement('button');
            boton.className = 'btn btn-outline-primary opcion-btn';
            boton.textContent = opcion;
            boton.addEventListener('click', () => this.seleccionarOpcion(opcion));
            opcionesContainer.appendChild(boton);
        });
    }

    seleccionarOpcion(opcionSeleccionada) {
        const opciones = this.shadowRoot.querySelectorAll('.opcion-btn');
        opciones.forEach(boton => {
            boton.disabled = true;
            if (boton.textContent === opcionSeleccionada) {
                this.dispatchEvent(new CustomEvent('opcion-seleccionada', {
                    detail: { opcion: opcionSeleccionada }
                }));
            }
        });
        this.siguienteBtn.classList.remove('d-none');
    }

    actualizarProgreso(progreso) {
        const barraProgreso = this.shadowRoot.getElementById('barra-progreso');
        barraProgreso.style.width = `${progreso}%`;
    }

    mostrarResultadoOpcion(opcionSeleccionada, esCorrecta) {
        const opciones = this.shadowRoot.querySelectorAll('.opcion-btn');
        opciones.forEach(boton => {
            if (boton.textContent === opcionSeleccionada) {
                boton.classList.add(esCorrecta ? 'correcta' : 'incorrecta');
            }
        });
    }

    setNombreJugador(nombre) {
        this.shadowRoot.getElementById('nombre-jugador-actual').textContent = nombre;
    }
}

customElements.define('pantalla-juego', PantallaJuego); 