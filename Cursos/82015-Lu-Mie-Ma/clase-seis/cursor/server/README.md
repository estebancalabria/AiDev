# E-commerce Server

Backend API REST para el e-commerce desarrollado en Node.js con Express.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

## Ejecución

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints de la API

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `GET /api/products/category/:category` - Obtener productos por categoría
- `GET /api/products/search/:query` - Buscar productos
- `POST /api/products/reload` - Recargar productos desde archivo JSON

### Carrito
- `GET /api/cart` - Obtener carrito
- `POST /api/cart/add` - Agregar producto al carrito
- `PUT /api/cart/update/:id` - Actualizar cantidad en carrito
- `DELETE /api/cart/remove/:id` - Eliminar item del carrito
- `DELETE /api/cart/clear` - Limpiar carrito

### Órdenes
- `GET /api/orders` - Obtener todas las órdenes
- `GET /api/orders/:id` - Obtener orden por ID
- `POST /api/orders` - Crear nueva orden
- `PUT /api/orders/:id/status` - Actualizar estado de orden

## Archivos de Datos

### productos.json
El archivo `productos.json` contiene el catálogo de productos del e-commerce. Incluye:
- **25 productos** variados de tecnología
- **Categorías**: Todos los productos están en la categoría "Electronics"
- **Información completa**: ID, nombre, precio, descripción, imagen, categoría y stock
- **Imágenes**: URLs de Unsplash para cada producto

Para modificar productos:
1. Edita el archivo `productos.json`
2. Usa el endpoint `POST /api/products/reload` para recargar
3. O reinicia el servidor

## Estructura de datos

### Producto
```json
{
  "id": 1,
  "name": "Nombre del producto",
  "price": 99.99,
  "description": "Descripción del producto",
  "image": "URL de la imagen",
  "category": "Categoría",
  "stock": 10
}
```

### Item del carrito
```json
{
  "id": 1234567890,
  "productId": 1,
  "name": "Nombre del producto",
  "price": 99.99,
  "image": "URL de la imagen",
  "quantity": 2
}
```

### Orden
```json
{
  "id": 1234567890,
  "items": [...],
  "total": 199.98,
  "customerInfo": {...},
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
``` 