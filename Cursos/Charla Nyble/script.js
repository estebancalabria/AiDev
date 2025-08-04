class JuegoController {
    constructor() {
        this.pantallaInicio = document.getElementById('pantalla-inicio');
        this.pantallaJuego = document.getElementById('pantalla-juego');
        this.pantallaResultado = document.getElementById('pantalla-resultado');
        
        this.preguntas = [];
        this.preguntaActual = 0;
        this.puntaje = 0;
        this.nombreJugador = '';
        this.categoriaSeleccionada = '';
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.pantallaInicio.addEventListener('categoria-seleccionada', (e) => {
            this.categoriaSeleccionada = e.detail.categoria;
        });
        
        this.pantallaInicio.addEventListener('iniciar-juego', (e) => {
            this.nombreJugador = e.detail.nombre;
            this.iniciarJuego();
        });
        
        this.pantallaJuego.addEventListener('opcion-seleccionada', (e) => {
            this.verificarRespuesta(e.detail.opcion);
        });
        
        this.pantallaJuego.addEventListener('siguiente-pregunta', () => {
            this.siguientePregunta();
        });
        
        this.pantallaResultado.addEventListener('volver-inicio', () => {
            this.reiniciarJuego();
        });
    }
    
    async iniciarJuego() {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${this.getCategoriaId()}&type=multiple`);
            const data = await response.json();
            
            if (data.results) {
                this.preguntas = data.results;
                this.preguntaActual = 0;
                this.puntaje = 0;
                
                this.pantallaInicio.classList.add('d-none');
                this.pantallaJuego.classList.remove('d-none');
                this.pantallaJuego.setNombreJugador(this.nombreJugador);
                
                this.mostrarPreguntaActual();
            }
        } catch (error) {
            console.error('Error al cargar las preguntas:', error);
        }
    }
    
    getCategoriaId() {
        const categorias = {
            'Historia': 23,
            'Ciencia': 17,
            'Geografia': 22,
            'Deportes': 21,
            'Arte': 25,
            'Entretenimiento': 11
        };
        return categorias[this.categoriaSeleccionada] || 9;
    }
    
    mostrarPreguntaActual() {
        const pregunta = this.preguntas[this.preguntaActual];
        const opciones = [...pregunta.incorrect_answers, pregunta.correct_answer];
        this.shuffleArray(opciones);
        
        this.pantallaJuego.actualizarPregunta(pregunta.question, opciones);
        this.pantallaJuego.actualizarProgreso((this.preguntaActual / this.preguntas.length) * 100);
    }
    
    verificarRespuesta(opcionSeleccionada) {
        const pregunta = this.preguntas[this.preguntaActual];
        const esCorrecta = opcionSeleccionada === pregunta.correct_answer;
        
        if (esCorrecta) {
            this.puntaje++;
        }
        
        this.pantallaJuego.mostrarResultadoOpcion(opcionSeleccionada, esCorrecta);
    }
    
    siguientePregunta() {
        this.preguntaActual++;
        
        if (this.preguntaActual < this.preguntas.length) {
            this.mostrarPreguntaActual();
        } else {
            this.mostrarResultado();
        }
    }
    
    mostrarResultado() {
        this.pantallaJuego.classList.add('d-none');
        this.pantallaResultado.classList.remove('d-none');
        this.pantallaResultado.mostrarResultado(this.puntaje, this.preguntas.length);
    }
    
    reiniciarJuego() {
        this.pantallaResultado.classList.add('d-none');
        this.pantallaInicio.classList.remove('d-none');
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new JuegoController();
}); 