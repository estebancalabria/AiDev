import ProductDetail from '../ProductDetail';
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';

export default function ProductDetailExample() {
  return (
    <ProductDetail 
      id="arduino-uno-r3"
      name="Arduino Uno R3 - Microcontrolador Oficial"
      description="El Arduino Uno R3 es la placa de microcontrolador más popular y versátil de la familia Arduino. Perfecta para principiantes y proyectos avanzados, cuenta con 14 pines digitales de entrada/salida, 6 entradas analógicas, un cristal de 16 MHz, conexión USB, conector de alimentación, conector ICSP y botón de reset. Ideal para prototipado rápido y aprendizaje de electrónica."
      price={45.99}
      stock={8}
      imageUrl={arduinoImage}
      category="Arduino"
      onAddToCart={(id, quantity) => console.log('Add to cart:', id, quantity)}
      onBack={() => console.log('Back to catalog')}
    />
  );
}