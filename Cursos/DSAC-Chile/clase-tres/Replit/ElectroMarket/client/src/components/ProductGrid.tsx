import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
  loading?: boolean;
}

export default function ProductGrid({ 
  products, 
  onAddToCart, 
  onViewProduct,
  loading = false 
}: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted aspect-square rounded-md mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12" data-testid="text-no-products">
        <p className="text-muted-foreground">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          stock={product.stock}
          imageUrl={product.imageUrl}
          onAddToCart={onAddToCart}
          onViewProduct={onViewProduct}
        />
      ))}
    </div>
  );
}