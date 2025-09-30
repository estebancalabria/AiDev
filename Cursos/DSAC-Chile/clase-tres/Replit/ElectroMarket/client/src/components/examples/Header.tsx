import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      cartCount={3}
      onSearch={(query) => console.log('Search:', query)}
      onCartClick={() => console.log('Cart clicked')}
      onUserClick={() => console.log('User clicked')}
    />
  );
}