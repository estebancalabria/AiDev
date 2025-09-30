import CartSidebar from '../CartSidebar';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';
import breadboardImage from '@assets/generated_images/Electronic_breadboard_with_jumper_wires_3a9d6e7a.png';

export default function CartSidebarExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const mockItems = [
    {
      id: '1',
      productId: '1',
      name: 'Arduino Uno R3 - Microcontrolador para Proyectos',
      price: 45.99,
      quantity: 2,
      imageUrl: arduinoImage,
    },
    {
      id: '2',
      productId: '2',
      name: 'Protoboard 830 Puntos + Cables Jumper',
      price: 12.50,
      quantity: 1,
      imageUrl: breadboardImage,
    },
  ];

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Abrir Carrito
      </Button>
      
      <CartSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={mockItems}
        onUpdateQuantity={(productId, quantity) => console.log('Update quantity:', productId, quantity)}
        onRemoveItem={(productId) => console.log('Remove item:', productId)}
        onCheckout={() => console.log('Checkout triggered')}
      />
    </div>
  );
}