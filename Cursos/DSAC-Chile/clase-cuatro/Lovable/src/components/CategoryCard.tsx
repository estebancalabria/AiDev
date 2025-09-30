import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz/${category.id}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border border-border hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="relative p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-4xl">{category.icon}</div>
          <div className="text-sm text-muted-foreground">
            {category.questionCount} preguntas
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {category.description}
          </p>
        </div>
        
        <Button 
          onClick={handleStartQuiz}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover:shadow-glow"
        >
          Comenzar Quiz
        </Button>
      </div>
    </Card>
  );
};