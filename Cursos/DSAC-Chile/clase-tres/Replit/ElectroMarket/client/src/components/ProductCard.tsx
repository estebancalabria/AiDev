import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  onAddToCart?: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  stock, 
  imageUrl, 
  onAddToCart, 
  onViewProduct 
}: ProductCardProps) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <Card className="hover-elevate overflow-hidden transition-all duration-200" data-testid={`card-product-${id}`}>
      <div className="aspect-square relative overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            loading="lazy"
            data-testid={`img-product-${id}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" data-testid={`badge-out-of-stock-${id}`}>
              Agotado
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 
          className="font-medium text-sm line-clamp-2 mb-2 cursor-pointer hover:text-primary"
          onClick={() => onViewProduct?.(id)}
          data-testid={`text-product-name-${id}`}
        >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary" data-testid={`text-price-${id}`}>
            ${price.toFixed(2)}
          </span>
          {isLowStock && !isOutOfStock && (
            <Badge variant="secondary" data-testid={`badge-low-stock-${id}`}>
              Últimos {stock}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProduct?.(id)}
          data-testid={`button-view-${id}`}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-1" />
          Ver
        </Button>
        <Button
          size="sm"
          onClick={() => onAddToCart?.(id)}
          disabled={isOutOfStock}
          data-testid={`button-add-cart-${id}`}
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Agregar
        </Button>
      </CardFooter>
    </Card>
  );
}