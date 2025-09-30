import { Category, Quiz } from "@/types/quiz";

export const categories: Category[] = [
  {
    id: "science",
    name: "Ciencias",
    description: "Preguntas sobre biología, física y química",
    icon: "🔬",
    questionCount: 10,
    color: "bg-gradient-primary"
  },
  {
    id: "history",
    name: "Historia",
    description: "Eventos históricos y personajes importantes",
    icon: "📚",
    questionCount: 8,
    color: "bg-gradient-success"
  },
  {
    id: "technology",
    name: "Tecnología",
    description: "Programación, desarrollo web y tecnología moderna",
    icon: "💻",
    questionCount: 12,
    color: "bg-gradient-card"
  },
  {
    id: "sports",
    name: "Deportes",
    description: "Deportes, atletas y competiciones",
    icon: "⚽",
    questionCount: 6,
    color: "bg-gradient-primary"
  }
];

export const quizzes: Record<string, Quiz> = {
  science: {
    categoryId: "science",
    questions: [
      {
        id: "sci1",
        question: "¿Cuál es el elemento químico más abundante en el universo?",
        options: ["Oxígeno", "Hidrógeno", "Carbono", "Helio"],
        correctAnswer: 1,
        explanation: "El hidrógeno representa aproximadamente el 75% de toda la materia bariónica del universo."
      },
      {
        id: "sci2",
        question: "¿Qué tipo de animal es una ballena?",
        options: ["Pez", "Mamífero", "Reptil", "Anfibio"],
        correctAnswer: 1,
        explanation: "Las ballenas son mamíferos marinos que respiran aire y amamantan a sus crías."
      },
      {
        id: "sci3",
        question: "¿Cuántos huesos tiene el cuerpo humano adulto aproximadamente?",
        options: ["186", "206", "226", "246"],
        correctAnswer: 1,
        explanation: "Un adulto tiene 206 huesos, mientras que los bebés nacen con aproximadamente 270 huesos."
      },
      {
        id: "sci4",
        question: "¿Cuál es la velocidad de la luz en el vacío?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correctAnswer: 0,
        explanation: "La velocidad de la luz en el vacío es de aproximadamente 299,792,458 metros por segundo."
      },
      {
        id: "sci5",
        question: "¿Qué planeta es conocido como el 'planeta rojo'?",
        options: ["Venus", "Júpiter", "Marte", "Saturno"],
        correctAnswer: 2,
        explanation: "Marte es conocido como el planeta rojo debido al óxido de hierro en su superficie."
      }
    ]
  },
  
  history: {
    categoryId: "history",
    questions: [
      {
        id: "hist1",
        question: "¿En qué año comenzó la Segunda Guerra Mundial?",
        options: ["1938", "1939", "1940", "1941"],
        correctAnswer: 1,
        explanation: "La Segunda Guerra Mundial comenzó el 1 de septiembre de 1939 con la invasión alemana de Polonia."
      },
      {
        id: "hist2",
        question: "¿Quién fue el primer presidente de Estados Unidos?",
        options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Adams"],
        correctAnswer: 2,
        explanation: "George Washington fue el primer presidente de Estados Unidos, sirviendo desde 1789 hasta 1797."
      },
      {
        id: "hist3",
        question: "¿En qué año cayó el Muro de Berlín?",
        options: ["1987", "1988", "1989", "1990"],
        correctAnswer: 2,
        explanation: "El Muro de Berlín cayó el 9 de noviembre de 1989, marcando el fin simbólico de la Guerra Fría."
      },
      {
        id: "hist4",
        question: "¿Cuál fue el imperio más grande de la historia?",
        options: ["Imperio Romano", "Imperio Británico", "Imperio Mongol", "Imperio Otomano"],
        correctAnswer: 1,
        explanation: "El Imperio Británico fue el más grande de la historia, cubriendo aproximadamente 35 millones de km²."
      }
    ]
  },
  
  technology: {
    categoryId: "technology",
    questions: [
      {
        id: "tech1",
        question: "¿Qué significa HTML?",
        options: ["Hypertext Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: 0,
        explanation: "HTML significa HyperText Markup Language y es el lenguaje estándar para crear páginas web."
      },
      {
        id: "tech2",
        question: "¿Quién fundó Microsoft?",
        options: ["Steve Jobs", "Bill Gates y Paul Allen", "Mark Zuckerberg", "Larry Page"],
        correctAnswer: 1,
        explanation: "Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975."
      },
      {
        id: "tech3",
        question: "¿Qué significa 'AI' en tecnología?",
        options: ["Advanced Intelligence", "Artificial Intelligence", "Automated Interface", "Application Integration"],
        correctAnswer: 1,
        explanation: "AI significa Artificial Intelligence (Inteligencia Artificial)."
      },
      {
        id: "tech4",
        question: "¿En qué año se lanzó el primer iPhone?",
        options: ["2006", "2007", "2008", "2009"],
        correctAnswer: 1,
        explanation: "El primer iPhone fue lanzado por Apple el 29 de junio de 2007."
      }
    ]
  },
  
  sports: {
    categoryId: "sports",
    questions: [
      {
        id: "sport1",
        question: "¿Cada cuántos años se celebran los Juegos Olímpicos de Verano?",
        options: ["2 años", "3 años", "4 años", "5 años"],
        correctAnswer: 2,
        explanation: "Los Juegos Olímpicos de Verano se celebran cada 4 años desde 1896."
      },
      {
        id: "sport2",
        question: "¿En qué deporte destacó Michael Jordan?",
        options: ["Fútbol", "Tenis", "Baloncesto", "Baseball"],
        correctAnswer: 2,
        explanation: "Michael Jordan es considerado uno de los mejores jugadores de baloncesto de todos los tiempos."
      },
      {
        id: "sport3",
        question: "¿Cuántos jugadores tiene un equipo de fútbol en el campo?",
        options: ["10", "11", "12", "13"],
        correctAnswer: 1,
        explanation: "Un equipo de fútbol tiene 11 jugadores en el campo, incluyendo el portero."
      }
    ]
  }
};