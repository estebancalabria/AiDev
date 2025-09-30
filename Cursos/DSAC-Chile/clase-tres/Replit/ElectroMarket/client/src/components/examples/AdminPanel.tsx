import AdminPanel from '../AdminPanel';
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';
import breadboardImage from '@assets/generated_images/Electronic_breadboard_with_jumper_wires_3a9d6e7a.png';

export default function AdminPanelExample() {
  const mockCategories = [
    { id: '1', name: 'Arduino', description: 'Microcontroladores y placas compatibles' },
    { id: '2', name: 'Sensores', description: 'Sensores para proyectos electrónicos' },
    { id: '3', name: 'LEDs', description: 'Diodos emisores de luz y accesorios' },
  ];

  const mockProducts = [
    {
      id: '1',
      name: 'Arduino Uno R3',
      description: 'Microcontrolador oficial Arduino Uno R3',
      price: 45.99,
      stock: 15,
      categoryId: '1',
      imageUrl: arduinoImage,
    },
    {
      id: '2',
      name: 'Protoboard 830 Puntos',
      description: 'Protoboard para prototipos con cables jumper incluidos',
      price: 12.50,
      stock: 25,
      categoryId: '1',
      imageUrl: breadboardImage,
    },
  ];

  return (
    <AdminPanel 
      products={mockProducts}
      categories={mockCategories}
      onAddProduct={(product) => console.log('Add product:', product)}
      onEditProduct={(id, product) => console.log('Edit product:', id, product)}
      onDeleteProduct={(id) => console.log('Delete product:', id)}
      onAddCategory={(category) => console.log('Add category:', category)}
      onEditCategory={(id, category) => console.log('Edit category:', id, category)}
      onDeleteCategory={(id) => console.log('Delete category:', id)}
    />
  );
}