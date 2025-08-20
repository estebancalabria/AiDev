const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de logging personalizado
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`🕐 [${timestamp}] ${req.method} ${req.path} - IP: ${req.ip || 'N/A'}`);
    
    // Log del body para requests POST/PUT
    if (['POST', 'PUT'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
        console.log(`📦 Request Body:`, JSON.stringify(req.body, null, 2));
    }
    
    // Log de query parameters
    if (req.query && Object.keys(req.query).length > 0) {
        console.log(`🔍 Query Params:`, JSON.stringify(req.query, null, 2));
    }
    
    // Log de parámetros de ruta
    if (req.params && Object.keys(req.params).length > 0) {
        console.log(`📍 Route Params:`, JSON.stringify(req.params, null, 2));
    }
    
    next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cargar productos desde archivo JSON
let products = [];

function loadProductsFromFile() {
  try {
    const productsPath = path.join(__dirname, 'productos.json');
    const productsData = fs.readFileSync(productsPath, 'utf8');
    products = JSON.parse(productsData);
    console.log(`📦 [INIT] Productos cargados exitosamente desde productos.json (${products.length} productos)`);
  } catch (error) {
    console.error(`❌ [INIT] Error al cargar productos.json:`, error.message);
    console.log(`📦 [INIT] Usando productos por defecto...`);
    // Productos por defecto en caso de error
    products = [
      {
        id: 1,
        name: "Laptop Gaming Pro",
        price: 1299.99,
        description: "Laptop de alto rendimiento para gaming y trabajo profesional",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
        category: "Electronics",
        stock: 15
      }
    ];
  }
}

let cart = [];
let orders = [];

// Rutas de la API

// Obtener todos los productos
app.get('/api/products', (req, res) => {
  console.log(`📋 [PRODUCTS] Obteniendo todos los productos (${products.length} productos disponibles)`);
  res.json(products);
  console.log(`✅ [PRODUCTS] Respuesta enviada exitosamente`);
});

// Obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  console.log(`🔍 [PRODUCT] Buscando producto con ID: ${productId}`);
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.log(`❌ [PRODUCT] Producto con ID ${productId} no encontrado`);
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  console.log(`✅ [PRODUCT] Producto encontrado: ${product.name}`);
  res.json(product);
});

// Obtener productos por categoría
app.get('/api/products/category/:category', (req, res) => {
  const category = req.params.category;
  console.log(`🏷️ [CATEGORY] Filtrando productos por categoría: ${category}`);
  
  const categoryProducts = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  console.log(`📊 [CATEGORY] Encontrados ${categoryProducts.length} productos en categoría "${category}"`);
  res.json(categoryProducts);
});

// Buscar productos
app.get('/api/products/search/:query', (req, res) => {
  const query = req.params.query;
  console.log(`🔎 [SEARCH] Búsqueda de productos con query: "${query}"`);
  
  const searchResults = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log(`📊 [SEARCH] Encontrados ${searchResults.length} productos que coinciden con "${query}"`);
  res.json(searchResults);
});

// Obtener carrito
app.get('/api/cart', (req, res) => {
  console.log(`🛒 [CART] Obteniendo carrito actual (${cart.length} items)`);
  res.json(cart);
});

// Agregar producto al carrito
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  console.log(`➕ [CART] Agregando producto ID: ${productId}, cantidad: ${quantity}`);
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.log(`❌ [CART] Producto con ID ${productId} no encontrado`);
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  
  console.log(`📦 [CART] Producto encontrado: ${product.name} (Stock: ${product.stock})`);
  
  if (product.stock < quantity) {
    console.log(`❌ [CART] Stock insuficiente. Requerido: ${quantity}, Disponible: ${product.stock}`);
    return res.status(400).json({ message: 'Stock insuficiente' });
  }
  
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
    console.log(`🔄 [CART] Cantidad actualizada para ${product.name}. Nueva cantidad: ${existingItem.quantity}`);
  } else {
    const newItem = {
      id: Date.now(),
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    };
    cart.push(newItem);
    console.log(`✨ [CART] Nuevo item agregado: ${product.name} x${quantity}`);
  }
  
  console.log(`✅ [CART] Carrito actualizado. Total de items: ${cart.length}`);
  res.json({ message: 'Producto agregado al carrito', cart });
});

// Actualizar cantidad en carrito
app.put('/api/cart/update/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  console.log(`🔄 [CART] Actualizando item ID: ${id}, nueva cantidad: ${quantity}`);
  
  const cartItem = cart.find(item => item.id === parseInt(id));
  if (!cartItem) {
    console.log(`❌ [CART] Item con ID ${id} no encontrado en carrito`);
    return res.status(404).json({ message: 'Item no encontrado en carrito' });
  }
  
  console.log(`📦 [CART] Item encontrado: ${cartItem.name} (cantidad actual: ${cartItem.quantity})`);
  
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== parseInt(id));
    console.log(`🗑️ [CART] Item ${cartItem.name} eliminado del carrito (cantidad <= 0)`);
  } else {
    cartItem.quantity = quantity;
    console.log(`✅ [CART] Cantidad actualizada para ${cartItem.name}: ${quantity}`);
  }
  
  console.log(`📊 [CART] Carrito actualizado. Total de items: ${cart.length}`);
  res.json({ message: 'Carrito actualizado', cart });
});

// Eliminar item del carrito
app.delete('/api/cart/remove/:id', (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ [CART] Eliminando item del carrito ID: ${id}`);
  
  const cartItem = cart.find(item => item.id === parseInt(id));
  if (cartItem) {
    console.log(`📦 [CART] Item a eliminar: ${cartItem.name} x${cartItem.quantity}`);
  }
  
  cart = cart.filter(item => item.id !== parseInt(id));
  console.log(`✅ [CART] Item eliminado. Carrito actualizado. Total de items: ${cart.length}`);
  res.json({ message: 'Item eliminado del carrito', cart });
});

// Limpiar carrito
app.delete('/api/cart/clear', (req, res) => {
  console.log(`🧹 [CART] Limpiando carrito completo (${cart.length} items)`);
  
  if (cart.length > 0) {
    console.log(`📋 [CART] Items que se van a eliminar:`);
    cart.forEach(item => {
      console.log(`   - ${item.name} x${item.quantity} ($${item.price})`);
    });
  }
  
  cart = [];
  console.log(`✅ [CART] Carrito limpiado exitosamente`);
  res.json({ message: 'Carrito limpiado', cart });
});

// Crear orden
app.post('/api/orders', (req, res) => {
  const { customerInfo } = req.body;
  console.log(`🛍️ [ORDER] Creando nueva orden para cliente: ${customerInfo.firstName} ${customerInfo.lastName}`);
  console.log(`📧 [ORDER] Email del cliente: ${customerInfo.email}`);
  
  if (cart.length === 0) {
    console.log(`❌ [ORDER] Error: El carrito está vacío`);
    return res.status(400).json({ message: 'El carrito está vacío' });
  }
  
  console.log(`📋 [ORDER] Items en el carrito (${cart.length} items):`);
  cart.forEach(item => {
    console.log(`   - ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`);
  });
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  console.log(`💰 [ORDER] Total de la orden: $${total.toFixed(2)}`);
  
  const order = {
    id: Date.now(),
    items: [...cart],
    total,
    customerInfo,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(order);
  console.log(`📝 [ORDER] Orden creada con ID: ${order.id}`);
  
  // Actualizar stock
  console.log(`📦 [ORDER] Actualizando stock de productos:`);
  cart.forEach(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      const oldStock = product.stock;
      product.stock -= item.quantity;
      console.log(`   - ${product.name}: ${oldStock} → ${product.stock} (vendidos: ${item.quantity})`);
    }
  });
  
  // Limpiar carrito
  const cartItemsCount = cart.length;
  cart = [];
  console.log(`🛒 [ORDER] Carrito limpiado (${cartItemsCount} items eliminados)`);
  console.log(`✅ [ORDER] Orden procesada exitosamente. Total de órdenes: ${orders.length}`);
  
  res.json({ message: 'Orden creada exitosamente', order });
});

// Obtener todas las órdenes
app.get('/api/orders', (req, res) => {
  console.log(`📋 [ORDERS] Obteniendo todas las órdenes (${orders.length} órdenes totales)`);
  res.json(orders);
});

// Obtener una orden por ID
app.get('/api/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  console.log(`🔍 [ORDER] Buscando orden con ID: ${orderId}`);
  
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    console.log(`❌ [ORDER] Orden con ID ${orderId} no encontrada`);
    return res.status(404).json({ message: 'Orden no encontrada' });
  }
  
  console.log(`✅ [ORDER] Orden encontrada: ID ${orderId}, Cliente: ${order.customerInfo.firstName} ${order.customerInfo.lastName}, Total: $${order.total.toFixed(2)}`);
  res.json(order);
});

// Actualizar estado de orden
app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(`🔄 [ORDER] Actualizando estado de orden ID: ${id} a: ${status}`);
  
  const order = orders.find(o => o.id === parseInt(id));
  if (!order) {
    console.log(`❌ [ORDER] Orden con ID ${id} no encontrada`);
    return res.status(404).json({ message: 'Orden no encontrada' });
  }
  
  const oldStatus = order.status;
  order.status = status;
  console.log(`✅ [ORDER] Estado actualizado: ${oldStatus} → ${status}`);
  console.log(`📋 [ORDER] Cliente: ${order.customerInfo.firstName} ${order.customerInfo.lastName}`);
  
  res.json({ message: 'Estado de orden actualizado', order });
});

// Ruta de prueba
app.get('/', (req, res) => {
  console.log(`🏠 [ROOT] Acceso a la ruta principal de la API`);
  res.json({ message: 'API E-commerce funcionando correctamente' });
});

// Endpoint para recargar productos desde archivo (útil para desarrollo)
app.post('/api/products/reload', (req, res) => {
  console.log(`🔄 [PRODUCTS] Recargando productos desde archivo...`);
  try {
    loadProductsFromFile();
    console.log(`✅ [PRODUCTS] Productos recargados exitosamente (${products.length} productos)`);
    res.json({ 
      message: 'Productos recargados exitosamente', 
      count: products.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`❌ [PRODUCTS] Error al recargar productos:`, error.message);
    res.status(500).json({ 
      message: 'Error al recargar productos', 
      error: error.message 
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Cargar productos al iniciar el servidor
loadProductsFromFile();

app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log('🚀    E-COMMERCE API SERVER INICIADO');
  console.log('🚀 ========================================');
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`🔌 API disponible en http://localhost:${PORT}/api`);
  console.log(`📊 Productos disponibles: ${products.length}`);
  console.log(`🛒 Carrito inicial: ${cart.length} items`);
  console.log(`📋 Órdenes existentes: ${orders.length}`);
  console.log('🚀 ========================================');
  console.log('📝 Logs detallados activados para debugging');
  console.log('🚀 ========================================');
}); 