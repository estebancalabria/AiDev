const express = require('express');
const router = express.Router();

// Mock cart data - in a real app, this would be stored in a database
let cart = [];

// Get cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Add item to cart
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Product ID and valid quantity are required' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.status(201).json(cart);
});

// Update item quantity in cart
router.put('/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 0) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }

  const item = cart.find(item => item.productId === productId);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (quantity === 0) {
    cart = cart.filter(item => item.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  res.json(cart);
});

// Remove item from cart
router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  cart = cart.filter(item => item.productId !== productId);
  res.json(cart);
});

// Clear cart
router.delete('/', (req, res) => {
  cart = [];
  res.json(cart);
});

module.exports = router;
