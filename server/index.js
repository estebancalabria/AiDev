const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let products = [
  { id: 1, name: 'Smartphone X', price: 699.99, image: 'https://via.placeholder.com/300x200?text=Smartphone+X', description: 'Latest smartphone with OLED display' },
  { id: 2, name: 'Wireless Headphones', price: 199.99, image: 'https://via.placeholder.com/300x200?text=Headphones', description: 'Noise-cancelling wireless headphones' },
  { id: 3, name: 'Smart Watch', price: 249.99, image: 'https://via.placeholder.com/300x200?text=Smart+Watch', description: 'Track your fitness and stay connected' },
  { id: 4, name: 'Laptop Pro', price: 1299.99, image: 'https://via.placeholder.com/300x200?text=Laptop+Pro', description: 'High performance laptop for professionals' },
];

let cart = [];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// Get cart items
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, product });
  }
  res.status(201).json({ message: 'Item added to cart' });
});

// Update cart item quantity
app.put('/api/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;
  const cartItem = cart.find(item => item.productId === productId);
  if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

  cartItem.quantity = quantity;
  res.json({ message: 'Cart updated' });
});

// Remove item from cart
app.delete('/api/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(item => item.productId !== productId);
  res.json({ message: 'Item removed from cart' });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
