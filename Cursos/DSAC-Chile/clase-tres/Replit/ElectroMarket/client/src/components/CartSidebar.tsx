import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onRemoveItem?: (productId: string) => void;
  onCheckout?: () => void;
  trigger?: React.ReactNode;
}

export default function CartSidebar({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  trigger 
}: CartSidebarProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent className="w-96 sm:max-w-96">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle data-testid="text-cart-title">Carrito de Compras</SheetTitle>
          <SheetDescription data-testid="text-cart-count">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
          </SheetDescription>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-muted-foreground mb-4" data-testid="text-empty-cart">
              Tu carrito está vacío
            </p>
            <Button onClick={onClose} data-testid="button-continue-shopping">
              Continuar comprando
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 pr-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3" data-testid={`cart-item-${item.productId}`}>
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          data-testid={`img-cart-item-${item.productId}`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2" data-testid={`text-cart-item-name-${item.productId}`}>
                        {item.name}
                      </h4>
                      <p className="text-sm text-primary font-medium" data-testid={`text-cart-item-price-${item.productId}`}>
                        ${item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity?.(item.productId, Math.max(0, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.productId}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.productId}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantity?.(item.productId, item.quantity + 1)}
                            data-testid={`button-increase-${item.productId}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => onRemoveItem?.(item.productId)}
                          data-testid={`button-remove-${item.productId}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold text-primary" data-testid="text-cart-total">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <Button 
                className="w-full" 
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                Proceder al Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}