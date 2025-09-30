import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Package, Tag } from "lucide-react";

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

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  onAddProduct?: (product: Omit<Product, 'id'>) => void;
  onEditProduct?: (id: string, product: Partial<Product>) => void;
  onDeleteProduct?: (id: string) => void;
  onAddCategory?: (category: Omit<Category, 'id'>) => void;
  onEditCategory?: (id: string, category: Partial<Category>) => void;
  onDeleteCategory?: (id: string) => void;
}

export default function AdminPanel({
  products,
  categories,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: AdminPanelProps) {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct?.({
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      categoryId: productForm.categoryId,
      imageUrl: productForm.imageUrl || undefined,
    });
    console.log('Add product:', productForm);
    setProductForm({ name: "", description: "", price: "", stock: "", categoryId: "", imageUrl: "" });
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onEditProduct?.(editingProduct.id, {
      name: productForm.name,
      description: productForm.description,
      price: parseFloat(productForm.price),
      stock: parseInt(productForm.stock),
      categoryId: productForm.categoryId,
      imageUrl: productForm.imageUrl || undefined,
    });
    console.log('Edit product:', editingProduct.id, productForm);
    setEditingProduct(null);
    setProductForm({ name: "", description: "", price: "", stock: "", categoryId: "", imageUrl: "" });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory?.(categoryForm);
    console.log('Add category:', categoryForm);
    setCategoryForm({ name: "", description: "" });
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || "Sin categoría";
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" data-testid="text-admin-title">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona productos y categorías del marketplace</p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products" data-testid="tab-products">
            <Package className="h-4 w-4 mr-2" />
            Productos
          </TabsTrigger>
          <TabsTrigger value="categories" data-testid="tab-categories">
            <Tag className="h-4 w-4 mr-2" />
            Categorías
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Add Product Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Productos</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="button-add-product">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">Nombre del producto</Label>
                    <Input
                      id="product-name"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      data-testid="input-product-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-description">Descripción</Label>
                    <Textarea
                      id="product-description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                      data-testid="input-product-description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="product-price">Precio</Label>
                      <Input
                        id="product-price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                        required
                        data-testid="input-product-price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="product-stock">Stock</Label>
                      <Input
                        id="product-stock"
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                        required
                        data-testid="input-product-stock"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="product-category">Categoría</Label>
                    <Select
                      value={productForm.categoryId}
                      onValueChange={(value) => setProductForm(prev => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger data-testid="select-product-category">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="product-image">URL de imagen (opcional)</Label>
                    <Input
                      id="product-image"
                      type="url"
                      value={productForm.imageUrl}
                      onChange={(e) => setProductForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                      data-testid="input-product-image"
                    />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-save-product">
                    {editingProduct ? "Actualizar Producto" : "Crear Producto"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Products List */}
          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id} data-testid={`product-card-${product.id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium" data-testid={`text-product-name-${product.id}`}>
                            {product.name}
                          </h3>
                          <Badge variant="secondary" className="mt-1">
                            {getCategoryName(product.categoryId)}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({
                                name: product.name,
                                description: product.description,
                                price: product.price.toString(),
                                stock: product.stock.toString(),
                                categoryId: product.categoryId,
                                imageUrl: product.imageUrl || "",
                              });
                            }}
                            data-testid={`button-edit-product-${product.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onDeleteProduct?.(product.id)}
                            data-testid={`button-delete-product-${product.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {/* Add Category */}
          <Card>
            <CardHeader>
              <CardTitle>Agregar Nueva Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <Label htmlFor="category-name">Nombre</Label>
                  <Input
                    id="category-name"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    data-testid="input-category-name"
                  />
                </div>
                <div>
                  <Label htmlFor="category-description">Descripción</Label>
                  <Textarea
                    id="category-description"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                    data-testid="input-category-description"
                  />
                </div>
                <Button type="submit" data-testid="button-add-category">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Categoría
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Categories List */}
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id} data-testid={`category-card-${category.id}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1" data-testid={`text-category-name-${category.id}`}>
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setEditingCategory(category);
                          setCategoryForm({
                            name: category.name,
                            description: category.description || "",
                          });
                        }}
                        data-testid={`button-edit-category-${category.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDeleteCategory?.(category.id)}
                        data-testid={`button-delete-category-${category.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}