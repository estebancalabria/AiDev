class PantallaResultado extends HTMLElement {
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
                
                .resultado-feliz {
                    color: #28a745;
                }
                
                .resultado-neutral {
                    color: #ffc107;
                }
                
                .resultado-triste {
                    color: #dc3545;
                }
            </style>
            
            <div class="card p-4 mx-auto text-center" style="max-width: 500px;">
                <h2 class="mb-4">🎯 Resultado Final</h2>
                <h3 id="puntaje-final" class="mb-4"></h3>
                <p id="mensaje-final" class="lead mb-4"></p>
                <button id="volver-inicio" class="btn btn-primary">Volver al Inicio</button>
            </div>
        `;
    }

    setupEventListeners() {
        const volverBtn = this.shadowRoot.getElementById('volver-inicio');
        volverBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('volver-inicio'));
        });
    }

    mostrarResultado(puntaje, totalPreguntas) {
        const puntajeFinal = this.shadowRoot.getElementById('puntaje-final');
        const mensajeFinal = this.shadowRoot.getElementById('mensaje-final');
        
        const porcentaje = (puntaje / totalPreguntas) * 100;
        puntajeFinal.textContent = `Puntaje: ${puntaje}/${totalPreguntas}`;
        
        let mensaje = '';
        let clase = '';
        
        if (porcentaje >= 80) {
            mensaje = '¡Excelente trabajo! 🎉';
            clase = 'resultado-feliz';
        } else if (porcentaje >= 60) {
            mensaje = '¡Buen trabajo! 👍';
            clase = 'resultado-neutral';
        } else {
            mensaje = '¡Sigue practicando! 💪';
            clase = 'resultado-triste';
        }
        
        mensajeFinal.textContent = mensaje;
        mensajeFinal.className = `lead mb-4 ${clase}`;
    }
}

customElements.define('pantalla-resultado', PantallaResultado); 