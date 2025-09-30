import CategoryNav from '../CategoryNav';

export default function CategoryNavExample() {
  const mockCategories = [
    { id: '1', name: 'Arduino' },
    { id: '2', name: 'Sensores' },
    { id: '3', name: 'LEDs' },
    { id: '4', name: 'Resistencias' },
    { id: '5', name: 'Motores' },
  ];

  return (
    <CategoryNav 
      categories={mockCategories}
      activeCategory="2"
      onCategoryClick={(id) => console.log('Category clicked:', id)}
    />
  );
}