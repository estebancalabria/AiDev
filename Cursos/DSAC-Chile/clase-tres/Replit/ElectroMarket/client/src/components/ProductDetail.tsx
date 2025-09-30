import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ProductDetailProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category?: string;
  onAddToCart?: (productId: string, quantity: number) => void;
  onBack?: () => void;
}

export default function ProductDetail({
  id,
  name,
  description,
  price,
  stock,
  imageUrl,
  category,
  onAddToCart,
  onBack,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleAddToCart = () => {
    onAddToCart?.(id, quantity);
    console.log('Added to cart:', id, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
        data-testid="button-back"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al catálogo
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
                data-testid={`img-product-detail-${id}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <span>Sin imagen disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Category */}
          <div>
            {category && (
              <Badge variant="secondary" className="mb-2" data-testid="badge-category">
                {category}
              </Badge>
            )}
            <h1 className="text-3xl font-bold" data-testid="text-product-title">
              {name}
            </h1>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary" data-testid="text-product-price">
              ${price.toFixed(2)}
            </span>
            {isLowStock && !isOutOfStock && (
              <Badge variant="destructive" data-testid="badge-low-stock">
                ¡Últimos {stock} disponibles!
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="destructive" data-testid="badge-out-of-stock">
                Agotado
              </Badge>
            )}
          </div>

          {/* Stock Info */}
          <div className="text-sm text-muted-foreground" data-testid="text-stock-info">
            {isOutOfStock ? (
              "Producto sin stock"
            ) : stock > 10 ? (
              "En stock"
            ) : (
              `Solo ${stock} unidades disponibles`
            )}
          </div>

          {/* Quantity Selector */}
          {!isOutOfStock && (
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Cantidad:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        data-testid="button-decrease-quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium" data-testid="text-quantity">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                        disabled={quantity >= stock}
                        data-testid="button-increase-quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al carrito
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Descripción</h3>
            <Separator />
            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {description}
            </p>
          </div>

          {/* Specifications - Could be extended with more detailed specs */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Especificaciones</h3>
            <Separator />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">SKU:</div>
              <div data-testid="text-product-sku">{id}</div>
              <div className="text-muted-foreground">Stock disponible:</div>
              <div data-testid="text-available-stock">{stock} unidades</div>
              {category && (
                <>
                  <div className="text-muted-foreground">Categoría:</div>
                  <div data-testid="text-product-category">{category}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}