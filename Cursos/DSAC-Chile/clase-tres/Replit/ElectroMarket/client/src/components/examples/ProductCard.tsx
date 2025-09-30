import ProductCard from '../ProductCard';
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';

export default function ProductCardExample() {
  return (
    <div className="w-64">
      <ProductCard 
        id="1"
        name="Arduino Uno R3 - Microcontrolador para Proyectos de Electrónica"
        price={45.99}
        stock={3}
        imageUrl={arduinoImage}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onViewProduct={(id) => console.log('View product:', id)}
      />
    </div>
  );
}