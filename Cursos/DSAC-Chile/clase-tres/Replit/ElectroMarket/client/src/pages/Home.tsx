import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryNav from "@/components/CategoryNav";
import ProductGrid from "@/components/ProductGrid";
import CartSidebar from "@/components/CartSidebar";
import ProductDetail from "@/components/ProductDetail";
import CheckoutForm from "@/components/CheckoutForm";
import AuthModal from "@/components/AuthModal";
import AdminPanel from "@/components/AdminPanel";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

// TODO: remove mock functionality - replace with real data from API
import arduinoImage from '@assets/generated_images/Arduino_microcontroller_board_product_50ab5b5d.png';
import breadboardImage from '@assets/generated_images/Electronic_breadboard_with_jumper_wires_3a9d6e7a.png';
import ledImage from '@assets/generated_images/RGB_LED_strip_lights_b17b2e79.png';
import sensorImage from '@assets/generated_images/Ultrasonic_distance_sensor_module_6dcafa56.png';
import servoImage from '@assets/generated_images/Small_servo_motor_component_89322f10.png';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function Home() {
  // TODO: remove mock functionality - replace with real state management
  const [currentView, setCurrentView] = useState<'catalog' | 'product' | 'checkout' | 'admin'>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // TODO: remove mock functionality - replace with API calls
  const [categories] = useState<Category[]>([
    { id: '1', name: 'Arduino', description: 'Microcontroladores y placas compatibles' },
    { id: '2', name: 'Sensores', description: 'Sensores para proyectos electrónicos' },
    { id: '3', name: 'LEDs', description: 'Diodos emisores de luz y accesorios' },
    { id: '4', name: 'Motores', description: 'Servomotores y motores paso a paso' },
    { id: '5', name: 'Protoboards', description: 'Placas de pruebas y prototipos' },
  ]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Arduino Uno R3 - Microcontrolador Oficial',
      description: 'El Arduino Uno R3 es la placa de microcontrolador más popular y versátil de la familia Arduino. Perfecta para principiantes y proyectos avanzados, cuenta con 14 pines digitales de entrada/salida, 6 entradas analógicas, un cristal de 16 MHz, conexión USB, conector de alimentación, conector ICSP y botón de reset.',
      price: 45.99,
      stock: 15,
      categoryId: '1',
      imageUrl: arduinoImage,
    },
    {
      id: '2',
      name: 'Protoboard 830 Puntos + Cables Jumper',
      description: 'Kit completo de protoboard de 830 puntos de conexión con 65 cables jumper de colores. Ideal para prototipos rápidos y experimentación. Incluye líneas de alimentación y masa claramente marcadas.',
      price: 12.50,
      stock: 25,
      categoryId: '5',
      imageUrl: breadboardImage,
    },
    {
      id: '3',
      name: 'Tira LED RGB 5050 - 5 metros',
      description: 'Tira de LEDs RGB de alta calidad con chips 5050. 5 metros de longitud, 60 LEDs por metro. Incluye control remoto IR y fuente de alimentación. Perfecta para iluminación decorativa y proyectos de domótica.',
      price: 28.75,
      stock: 8,
      categoryId: '3',
      imageUrl: ledImage,
    },
    {
      id: '4',
      name: 'Sensor Ultrasónico HC-SR04',
      description: 'Sensor de distancia ultrasónico de alta precisión. Rango de medición de 2cm a 400cm con precisión de 3mm. Voltaje de operación 5V DC. Ideal para robots, sistemas de seguridad y proyectos de medición.',
      price: 8.99,
      stock: 42,
      categoryId: '2',
      imageUrl: sensorImage,
    },
    {
      id: '5',
      name: 'Servo Motor SG90 - Micro 9g',
      description: 'Servomotor de alta calidad y bajo costo. Torque de 1.8kg-cm, velocidad de 0.1s/60°. Perfecto para robots, brazos mecánicos y proyectos de control de posición. Incluye cables de conexión y accesorios de montaje.',
      price: 6.99,
      stock: 0,
      categoryId: '4',
      imageUrl: servoImage,
    },
  ]);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || product.categoryId === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart functions
  const addToCart = (productId: string, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.productId === productId);
    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      };
      setCartItems(items => [...items, newItem]);
    }
    console.log('Product added to cart:', productId, quantity);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Auth functions
  const handleLogin = (email: string, password: string) => {
    // TODO: remove mock functionality - implement real authentication
    const mockUser: User = {
      id: '1',
      name: email === 'admin@electromarket.com' ? 'Admin User' : 'Usuario Demo',
      email,
      isAdmin: email === 'admin@electromarket.com',
    };
    setUser(mockUser);
    setIsAuthOpen(false);
    console.log('User logged in:', mockUser);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // TODO: remove mock functionality - implement real registration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      isAdmin: false,
    };
    setUser(newUser);
    setIsAuthOpen(false);
    console.log('User registered:', newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('catalog');
    console.log('User logged out');
  };

  const getCategoryById = (id: string) => categories.find(c => c.id === id);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        cartCount={cartCount}
        onSearch={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        onUserClick={() => setIsAuthOpen(true)}
      />
      
      {/* User Status Bar */}
      {user && (
        <div className="bg-muted border-b px-4 py-2">
          <div className="container mx-auto flex items-center justify-between">
            <span className="text-sm">
              Bienvenido, <strong>{user.name}</strong>
              {user.isAdmin && <span className="text-primary ml-2">(Administrador)</span>}
            </span>
            <div className="flex items-center gap-2">
              {user.isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('admin')}
                  data-testid="button-admin-panel"
                >
                  Panel Admin
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('catalog')}
                data-testid="button-catalog"
              >
                Catálogo
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'catalog' && (
        <>
          <CategoryNav
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
          <main className="container mx-auto px-4 py-6">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Resultados para "{searchQuery}" ({filteredProducts.length} productos)
                </p>
              </div>
            )}
            <ProductGrid
              products={filteredProducts}
              onAddToCart={addToCart}
              onViewProduct={(productId) => {
                const product = products.find(p => p.id === productId);
                if (product) {
                  setSelectedProduct(product);
                  setCurrentView('product');
                }
              }}
            />
          </main>
        </>
      )}

      {currentView === 'product' && selectedProduct && (
        <ProductDetail
          id={selectedProduct.id}
          name={selectedProduct.name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          stock={selectedProduct.stock}
          imageUrl={selectedProduct.imageUrl}
          category={getCategoryById(selectedProduct.categoryId)?.name}
          onAddToCart={addToCart}
          onBack={() => setCurrentView('catalog')}
        />
      )}

      {currentView === 'checkout' && (
        <CheckoutForm
          items={cartItems}
          onBack={() => setIsCartOpen(true)}
          onSubmit={(orderData) => {
            console.log('Order placed:', orderData);
            setCartItems([]);
            setCurrentView('catalog');
            // TODO: remove mock functionality - implement real order processing
          }}
        />
      )}

      {currentView === 'admin' && user?.isAdmin && (
        <AdminPanel
          products={products}
          categories={categories}
          onAddProduct={(product) => console.log('Add product:', product)}
          onEditProduct={(id, product) => console.log('Edit product:', id, product)}
          onDeleteProduct={(id) => console.log('Delete product:', id)}
          onAddCategory={(category) => console.log('Add category:', category)}
          onEditCategory={(id, category) => console.log('Edit category:', id, category)}
          onDeleteCategory={(id) => console.log('Delete category:', id)}
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Guest User Notice */}
      {!user && (
        <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-4 shadow-lg max-w-sm">
          <p className="text-sm mb-2">
            ¡Bienvenido a ElectroMarket! 
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            Inicia sesión para acceder a todas las funciones. Usuario admin: admin@electromarket.com
          </p>
          <Button
            size="sm"
            onClick={() => setIsAuthOpen(true)}
            data-testid="button-login-prompt"
          >
            Iniciar Sesión
          </Button>
        </div>
      )}
    </div>
  );
}