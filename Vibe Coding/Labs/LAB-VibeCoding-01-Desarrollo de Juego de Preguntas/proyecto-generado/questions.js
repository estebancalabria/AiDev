const categories = {
    historia: {
        name: "Historia",
        icon: "📚",
        questions: [
            {
                question: "¿En qué año comenzó la Primera Guerra Mundial?",
                options: ["1914", "1918", "1939", "1945"],
                correct: 0
            },
            {
                question: "¿Quién fue el primer presidente de Estados Unidos?",
                options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
                correct: 2
            },
            {
                question: "¿En qué año cayó el Muro de Berlín?",
                options: ["1987", "1989", "1991", "1993"],
                correct: 1
            },
            {
                question: "¿En qué año se fundó Google?",
                options: ["1995", "1998", "2000", "2004"],
                correct: 1
            },
            {
                question: "¿En qué año comenzó la Segunda Guerra Mundial?",
                options: ["1939", "1941", "1945", "1947"],
                correct: 0
            },
            {
                question: "¿Quién fue el primer emperador romano?",
                options: ["Julio César", "Augusto", "Nerón", "Trajano"],
                correct: 1
            },
            {
                question: "¿En qué año se descubrió América?",
                options: ["1492", "1498", "1500", "1502"],
                correct: 0
            },
            {
                question: "¿Quién fue el último zar de Rusia?",
                options: ["Pedro el Grande", "Nicolás II", "Alejandro III", "Iván el Terrible"],
                correct: 1
            },
            {
                question: "¿En qué año se firmó la Declaración de Independencia de Estados Unidos?",
                options: ["1774", "1776", "1783", "1789"],
                correct: 1
            },
            {
                question: "¿Quién fue el primer presidente de Argentina?",
                options: ["Bernardino Rivadavia", "Manuel Belgrano", "José de San Martín", "Juan Manuel de Rosas"],
                correct: 0
            }
        ]
    },
    geografia: {
        name: "Geografía",
        icon: "🌍",
        questions: [
            {
                question: "¿Cuál es la capital de Francia?",
                options: ["Londres", "Berlín", "París", "Madrid"],
                correct: 2
            },
            {
                question: "¿En qué continente se encuentra Egipto?",
                options: ["Asia", "Europa", "África", "América"],
                correct: 2
            },
            {
                question: "¿Cuál es el océano más grande del mundo?",
                options: ["Atlántico", "Índico", "Pacífico", "Ártico"],
                correct: 2
            },
            {
                question: "¿Cuál es el país más grande del mundo?",
                options: ["China", "Estados Unidos", "Rusia", "Canadá"],
                correct: 2
            },
            {
                question: "¿Cuál es el río más largo del mundo?",
                options: ["Amazonas", "Nilo", "Misisipi", "Yangtsé"],
                correct: 1
            },
            {
                question: "¿Cuál es la montaña más alta del mundo?",
                options: ["K2", "Monte Everest", "Aconcagua", "Kilimanjaro"],
                correct: 1
            },
            {
                question: "¿Cuál es el desierto más grande del mundo?",
                options: ["Sahara", "Gobi", "Antártida", "Atacama"],
                correct: 0
            },
            {
                question: "¿Cuál es la capital de Japón?",
                options: ["Seúl", "Pekín", "Tokio", "Bangkok"],
                correct: 2
            },
            {
                question: "¿Cuál es el lago más profundo del mundo?",
                options: ["Lago Victoria", "Lago Titicaca", "Lago Baikal", "Lago Superior"],
                correct: 2
            },
            {
                question: "¿Cuál es el país con más islas del mundo?",
                options: ["Indonesia", "Filipinas", "Suecia", "Japón"],
                correct: 2
            }
        ]
    },
    ciencia: {
        name: "Ciencia",
        icon: "🔬",
        questions: [
            {
                question: "¿Cuál es el planeta más grande del sistema solar?",
                options: ["Tierra", "Marte", "Júpiter", "Saturno"],
                correct: 2
            },
            {
                question: "¿Cuál es el elemento químico con símbolo 'O'?",
                options: ["Oro", "Oxígeno", "Osmio", "Oganesón"],
                correct: 1
            },
            {
                question: "¿Cuántos huesos tiene el cuerpo humano adulto?",
                options: ["206", "186", "216", "196"],
                correct: 0
            },
            {
                question: "¿Cuál es el metal más abundante en la corteza terrestre?",
                options: ["Hierro", "Aluminio", "Cobre", "Oro"],
                correct: 1
            },
            {
                question: "¿Cuál es la velocidad de la luz en el vacío?",
                options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
                correct: 0
            },
            {
                question: "¿Cuál es el elemento más abundante en el universo?",
                options: ["Helio", "Hidrógeno", "Oxígeno", "Carbono"],
                correct: 1
            },
            {
                question: "¿Cuántos cromosomas tiene una célula humana normal?",
                options: ["42", "44", "46", "48"],
                correct: 2
            },
            {
                question: "¿Cuál es la unidad básica de la vida?",
                options: ["Átomo", "Molécula", "Célula", "Tejido"],
                correct: 2
            },
            {
                question: "¿Cuál es el gas más abundante en la atmósfera terrestre?",
                options: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"],
                correct: 2
            },
            {
                question: "¿Cuál es el pH del agua pura?",
                options: ["5", "6", "7", "8"],
                correct: 2
            }
        ]
    },
    arte: {
        name: "Arte y Literatura",
        icon: "🎨",
        questions: [
            {
                question: "¿Quién pintó la Mona Lisa?",
                options: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"],
                correct: 1
            },
            {
                question: "¿Quién escribió 'Don Quijote de la Mancha'?",
                options: ["Gabriel García Márquez", "Miguel de Cervantes", "Pablo Neruda", "Federico García Lorca"],
                correct: 1
            },
            {
                question: "¿Quién pintó 'La noche estrellada'?",
                options: ["Van Gogh", "Monet", "Da Vinci", "Picasso"],
                correct: 0
            },
            {
                question: "¿Quién escribió 'Romeo y Julieta'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                correct: 1
            },
            {
                question: "¿Quién pintó 'El grito'?",
                options: ["Van Gogh", "Edvard Munch", "Salvador Dalí", "Pablo Picasso"],
                correct: 1
            },
            {
                question: "¿Quién escribió 'Cien años de soledad'?",
                options: ["Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar", "Jorge Luis Borges"],
                correct: 0
            },
            {
                question: "¿Quién pintó 'La última cena'?",
                options: ["Michelangelo", "Da Vinci", "Rafael", "Botticelli"],
                correct: 1
            },
            {
                question: "¿Quién escribió 'El principito'?",
                options: ["Jules Verne", "Antoine de Saint-Exupéry", "Victor Hugo", "Albert Camus"],
                correct: 1
            },
            {
                question: "¿Quién pintó 'Los girasoles'?",
                options: ["Monet", "Van Gogh", "Renoir", "Cézanne"],
                correct: 1
            },
            {
                question: "¿Quién escribió 'El Quijote'?",
                options: ["Lope de Vega", "Miguel de Cervantes", "Francisco de Quevedo", "Calderón de la Barca"],
                correct: 1
            }
        ]
    },
    naturaleza: {
        name: "Naturaleza",
        icon: "🦁",
        questions: [
            {
                question: "¿Cuál es el animal más rápido del mundo?",
                options: ["Guepardo", "León", "Águila", "Peregrino"],
                correct: 0
            },
            {
                question: "¿Cuál es el animal más grande del mundo?",
                options: ["Elefante africano", "Ballena azul", "Jirafa", "Oso polar"],
                correct: 1
            },
            {
                question: "¿Cuál es el animal más venenoso del mundo?",
                options: ["Cobra real", "Araña viuda negra", "Medusa avispa de mar", "Serpiente taipán"],
                correct: 2
            },
            {
                question: "¿Cuál es el animal que vive más años?",
                options: ["Tortuga gigante", "Ballena de Groenlandia", "Elefante africano", "Tiburón de Groenlandia"],
                correct: 1
            },
            {
                question: "¿Cuál es el animal más pequeño del mundo?",
                options: ["Colibrí abeja", "Rana Paedophryne amauensis", "Musaraña etrusca", "Camaleón Brookesia micra"],
                correct: 1
            },
            {
                question: "¿Cuál es el animal más fuerte del mundo?",
                options: ["Elefante", "Gorila", "Escarabajo rinoceronte", "Hormiga cortadora de hojas"],
                correct: 2
            },
            {
                question: "¿Cuál es el animal que puede regenerar sus extremidades?",
                options: ["Lagarto", "Estrella de mar", "Salamandra", "Pulpo"],
                correct: 1
            },
            {
                question: "¿Cuál es el animal que duerme más horas al día?",
                options: ["Perezoso", "Koala", "Tigre", "León"],
                correct: 0
            },
            {
                question: "¿Cuál es el animal que tiene la mejor visión?",
                options: ["Águila", "Búho", "Gato", "Camaleón"],
                correct: 0
            },
            {
                question: "¿Cuál es el animal que puede cambiar de color?",
                options: ["Lagarto", "Pulpo", "Camaleón", "Sepia"],
                correct: 2
            }
        ]
    },
    deportes: {
        name: "Deportes",
        icon: "⚽",
        questions: [
            {
                question: "¿En qué país se originó el fútbol?",
                options: ["Brasil", "Inglaterra", "Argentina", "España"],
                correct: 1
            },
            {
                question: "¿Cuántos jugadores tiene un equipo de voleibol en cancha?",
                options: ["5", "6", "7", "8"],
                correct: 1
            },
            {
                question: "¿En qué deporte se usa un 'birdie'?",
                options: ["Tenis", "Bádminton", "Squash", "Ping Pong"],
                correct: 1
            },
            {
                question: "¿Cuántos jugadores tiene un equipo de baloncesto en cancha?",
                options: ["4", "5", "6", "7"],
                correct: 1
            },
            {
                question: "¿En qué año se celebró el primer Mundial de Fútbol?",
                options: ["1928", "1930", "1934", "1938"],
                correct: 1
            },
            {
                question: "¿Cuál es el deporte más practicado del mundo?",
                options: ["Fútbol", "Cricket", "Tenis", "Baloncesto"],
                correct: 0
            },
            {
                question: "¿En qué deporte se usa un 'shuttlecock'?",
                options: ["Tenis", "Bádminton", "Squash", "Ping Pong"],
                correct: 1
            },
            {
                question: "¿Cuántos jugadores tiene un equipo de rugby en cancha?",
                options: ["13", "14", "15", "16"],
                correct: 2
            },
            {
                question: "¿En qué deporte se usa un 'puck'?",
                options: ["Hockey sobre hielo", "Hockey sobre césped", "Lacrosse", "Waterpolo"],
                correct: 0
            },
            {
                question: "¿Cuál es el deporte más rápido del mundo?",
                options: ["Fórmula 1", "Bádminton", "Squash", "Hockey sobre hielo"],
                correct: 2
            }
        ]
    }
}; 