const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock orders data - in a real app, this would be stored in a database
let orders = [];

// Get all orders (for admin - simplified)
router.get('/', (req, res) => {
  res.json(orders);
});

// Get order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Create new order
router.post('/', (req, res) => {
  const { items, customerInfo } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items are required' });
  }

  if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.address) {
    return res.status(400).json({ error: 'Customer information is required' });
  }

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const newOrder = {
    id: uuidv4(),
    items,
    customerInfo,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Update order status (admin only - simplified)
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  res.json(order);
});

module.exports = router;
