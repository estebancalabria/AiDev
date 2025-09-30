import CheckoutForm from '../CheckoutForm';
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';
import breadboardImage from '@assets/generated_images/Electronic_breadboard_with_jumper_wires_3a9d6e7a.png';

export default function CheckoutFormExample() {
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
    <CheckoutForm 
      items={mockItems}
      onBack={() => console.log('Back to cart')}
      onSubmit={(orderData) => console.log('Order submitted:', orderData)}
    />
  );
}