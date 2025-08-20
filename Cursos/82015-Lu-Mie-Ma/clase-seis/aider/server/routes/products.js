const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Mock data - in a real app, this would come from a database
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Premium wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 15
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Advanced smartwatch with health tracking',
    category: 'Electronics',
    stock: 8
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Comfortable running shoes for all terrains',
    category: 'Footwear',
    stock: 20
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Automatic drip coffee maker with timer',
    category: 'Home',
    stock: 12
  },
  {
    id: '5',
    name: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Durable backpack for everyday use',
    category: 'Accessories',
    stock: 25
  },
  {
    id: '6',
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Non-slip yoga mat for home workouts',
    category: 'Fitness',
    stock: 30
  }
];

// Get all products
router.get('/', (req, res) => {
  const { category } = req.query;
  let filteredProducts = products;

  if (category) {
    filteredProducts = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json(filteredProducts);
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Create new product (admin only - simplified for demo)
router.post('/', (req, res) => {
  const { name, price, image, description, category, stock } = req.body;
  
  if (!name || !price || !image || !description || !category || stock === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    price,
    image,
    description,
    category,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
