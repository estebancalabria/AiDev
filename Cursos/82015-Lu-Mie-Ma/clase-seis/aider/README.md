# ShopEasy E-commerce

A modern e-commerce application with a Node.js REST API backend and HTML/CSS frontend using Tailwind CSS.

## Features

- Browse products by category
- Add products to cart
- Manage cart items (update quantity, remove items)
- Checkout process
- Responsive design

## Setup Instructions

### Backend (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on http://localhost:3000

### Frontend

1. Open `frontend/index.html` in your web browser
2. Make sure the backend server is running

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Electronics` - Get products by category
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **API**: RESTful API
