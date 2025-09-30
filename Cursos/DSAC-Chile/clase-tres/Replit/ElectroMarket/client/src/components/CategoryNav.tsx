import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  id: string;
  name: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onCategoryClick }: CategoryNavProps) {
  return (
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex space-x-1 py-3">
            <Button
              variant={!activeCategory ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryClick?.("")}
              data-testid="button-category-all"
              className="whitespace-nowrap"
            >
              Todos
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryClick?.(category.id)}
                data-testid={`button-category-${category.id}`}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}