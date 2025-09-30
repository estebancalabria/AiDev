import ProductGrid from '../ProductGrid';
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';
import breadboardImage from '@assets/generated_images/Electronic_breadboard_with_jumper_wires_3a9d6e7a.png';
import ledImage from '@assets/generated_images/RGB_LED_strip_lights_b17b2e79.png';
import sensorImage from '@assets/generated_images/Ultrasonic_distance_sensor_module_6dcafa56.png';

export default function ProductGridExample() {
  const mockProducts = [
    {
      id: '1',
      name: 'Arduino Uno R3 - Microcontrolador para Proyectos',
      price: 45.99,
      stock: 15,
      imageUrl: arduinoImage,
    },
    {
      id: '2',
      name: 'Protoboard 830 Puntos + Cables Jumper',
      price: 12.50,
      stock: 3,
      imageUrl: breadboardImage,
    },
    {
      id: '3',
      name: 'Tira LED RGB 5050 - 5 metros',
      price: 28.75,
      stock: 0,
      imageUrl: ledImage,
    },
    {
      id: '4',
      name: 'Sensor Ultrasónico HC-SR04',
      price: 8.99,
      stock: 25,
      imageUrl: sensorImage,
    },
  ];

  return (
    <div className="p-6">
      <ProductGrid 
        products={mockProducts}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onViewProduct={(id) => console.log('View product:', id)}
      />
    </div>
  );
}