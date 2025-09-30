import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  RotateCcw, 
  Home, 
  CheckCircle, 
  XCircle,
  Award,
  TrendingUp
} from "lucide-react";
import { categories } from "@/data/mockData";
import { QuizResult, UserAnswer } from "@/types/quiz";

const Results = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { results, userAnswers } = location.state as { 
    results: QuizResult; 
    userAnswers: UserAnswer[] 
  };

  const category = categories.find(cat => cat.id === categoryId);

  if (!category || !results) {
    navigate("/");
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "¡Excelente! Eres un experto en esta materia.";
    if (score >= 80) return "¡Muy bien! Tienes un buen dominio del tema.";
    if (score >= 70) return "¡Bien hecho! Continúa aprendiendo.";
    if (score >= 60) return "No está mal, pero puedes mejorar.";
    return "Necesitas practicar más. ¡No te rindas!";
  };

  const retakeQuiz = () => {
    navigate(`/quiz/${categoryId}`);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-warning" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Resultados del Quiz
                </h1>
                <p className="text-muted-foreground">
                  {category.icon} {category.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Score Overview */}
        <Card className="bg-gradient-card border border-border shadow-card">
          <div className="p-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto relative">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeDasharray={`${results.score}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(results.score)}`}>
                        {results.score}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">
                  {getScoreMessage(results.score)}
                </h2>
                <p className="text-muted-foreground">
                  Has completado el quiz de {category.name}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border border-border">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {results.correctAnswers}
                </div>
                <div className="text-sm text-muted-foreground">
                  Respuestas correctas
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border border-border">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {results.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total de preguntas
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border border-border">
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-warning/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {formatTime(results.timeSpent)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Tiempo transcurrido
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Badge */}
        {results.score >= 80 && (
          <Card className="bg-gradient-success border border-success/20">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-success-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-success-foreground">
                    ¡Rendimiento Excepcional!
                  </h3>
                  <p className="text-sm text-success-foreground/80">
                    Has demostrado un excelente dominio de {category.name.toLowerCase()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-success-foreground" />
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={retakeQuiz}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Quiz</span>
          </Button>
          
          <Button
            onClick={goHome}
            variant="outline"
            className="flex items-center space-x-2 border-border hover:bg-muted"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;