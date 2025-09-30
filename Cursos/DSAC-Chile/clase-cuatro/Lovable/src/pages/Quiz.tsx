import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { quizzes, categories } from "@/data/mockData";
import { Question, UserAnswer } from "@/types/quiz";

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const quiz = categoryId ? quizzes[categoryId] : null;
  const category = categories.find(cat => cat.id === categoryId);
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  useEffect(() => {
    if (!quiz || !category) {
      navigate("/");
      return;
    }
    
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, category, navigate, startTime]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const questionStartTime = userAnswers.length === 0 ? startTime : Date.now() - (timeSpent * 1000);
    
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: Math.floor((Date.now() - questionStartTime) / 1000)
    };

    setUserAnswers([...userAnswers, userAnswer]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed - navigate to results
      const results = {
        categoryId: categoryId!,
        totalQuestions: quiz.questions.length,
        correctAnswers: userAnswers.filter(answer => answer.isCorrect).length + (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0),
        score: Math.round(((userAnswers.filter(answer => answer.isCorrect).length + (selectedAnswer === currentQuestion?.correctAnswer ? 1 : 0)) / quiz.questions.length) * 100),
        timeSpent
      };
      
      navigate(`/results/${categoryId}`, { state: { results, userAnswers: [...userAnswers, {
        questionId: currentQuestion!.id,
        selectedAnswer: selectedAnswer!,
        isCorrect: selectedAnswer === currentQuestion!.correctAnswer,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }] } });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quiz || !category || !currentQuestion) {
    return <div>Cargando...</div>;
  }

  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isCorrectAnswer = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Button>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeSpent)}</span>
              </div>
              <div className="text-foreground font-medium">
                {category.icon} {category.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}
          </span>
          <span className="text-sm font-medium text-foreground">
            {Math.round(progress)}% completado
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-card border border-border shadow-card">
          <div className="p-8 space-y-8">
            <h2 className="text-2xl font-semibold text-foreground leading-relaxed">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "w-full justify-start text-left p-6 border border-border hover:border-primary transition-all duration-200";
                let icon = null;

                if (showFeedback) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonStyle += " bg-success/20 border-success text-success-foreground";
                    icon = <CheckCircle className="w-5 h-5 text-success" />;
                  } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                    buttonStyle += " bg-destructive/20 border-destructive text-destructive-foreground";
                    icon = <XCircle className="w-5 h-5 text-destructive" />;
                  }
                } else if (selectedAnswer === index) {
                  buttonStyle += " bg-primary/20 border-primary text-primary-foreground";
                }

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={buttonStyle}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base">{option}</span>
                      {icon}
                    </div>
                  </Button>
                );
              })}
            </div>

            {showFeedback && currentQuestion.explanation && (
              <div className="bg-muted/50 border border-border rounded-lg p-6">
                <h4 className="font-medium text-foreground mb-2">Explicación:</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              {!showFeedback ? (
                <Button 
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  Confirmar Respuesta
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? "Siguiente Pregunta" : "Ver Resultados"}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;