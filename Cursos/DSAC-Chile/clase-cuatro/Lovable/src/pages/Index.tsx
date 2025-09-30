import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/mockData";
import { Brain, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-primary/10 opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Brain className="w-12 h-12 text-primary-foreground" />
              <Sparkles className="w-8 h-8 text-primary-foreground animate-pulse" />
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground leading-tight">
              Quiz<span className="text-primary-glow">Master</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Pon a prueba tus conocimientos con nuestros quizzes interactivos. 
              Aprende mientras te diviertes en diferentes categorías.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Múltiples categorías</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span>Resultados instantáneos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-glow rounded-full" />
                <span>Explicaciones detalladas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Elige tu Categoría
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecciona la categoría que más te interese y comienza a desafiar tus conocimientos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
