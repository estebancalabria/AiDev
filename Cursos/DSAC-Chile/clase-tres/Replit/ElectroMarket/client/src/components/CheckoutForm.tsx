import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CheckoutFormProps {
  items: CartItem[];
  onBack?: () => void;
  onSubmit?: (orderData: any) => void;
}

export default function CheckoutForm({ items, onBack, onSubmit }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "credit_card",
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10; // Free shipping over $50
  const total = subtotal + shipping;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      items,
      subtotal,
      shipping,
      total,
    };
    onSubmit?.(orderData);
    console.log('Order submitted:', orderData);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
        data-testid="button-back-to-cart"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al carrito
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Información de Envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Juan Pérez"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="juan@email.com"
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 234 567 8900"
                  data-testid="input-phone"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Calle Principal 123, Apt 4B"
                  data-testid="input-address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="México D.F."
                    data-testid="input-city"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    placeholder="12345"
                    data-testid="input-postal-code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Método de Pago
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Demo de pago simulado
                </p>
                <p className="text-sm">
                  En la versión completa se integrarán métodos de pago reales.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3" data-testid={`order-item-${item.productId}`}>
                    <div className="w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">
                          Cantidad: {item.quantity}
                        </span>
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío:</span>
                  <span data-testid="text-shipping">
                    {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span data-testid="text-total">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ¡Envío gratis por compra mayor a $50!
                  </p>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.address}
                data-testid="button-place-order"
              >
                Realizar Pedido
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}