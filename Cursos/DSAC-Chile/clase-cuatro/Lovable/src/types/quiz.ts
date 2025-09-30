export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  color: string;
}

export interface Quiz {
  categoryId: string;
  questions: Question[];
}

export interface QuizResult {
  categoryId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}