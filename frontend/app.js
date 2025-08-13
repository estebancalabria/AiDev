const API_BASE = 'http://localhost:3000/api';

let products = [];
let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadCart();

  // Cart button click
  document.getElementById('cart-button').addEventListener('click', openCart);

  // Close cart modal
  document.getElementById('close-cart').addEventListener('click', closeCart);

  // Clear cart
  document.getElementById('clear-cart').addEventListener('click', clearCart);
});

async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    products = await res.json();
    renderProducts();
  } catch (err) {
    console.error('Error loading products:', err);
  }
}

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full">
      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-900">${product.name}</h3>
        <p class="text-gray-600 text-sm mt-1">${product.description}</p>
        <p class="text-xl font-bold text-gray-900 mt-2">$${product.price.toFixed(2)}</p>
        <button 
          class="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

async function loadCart() {
  try {
    const res = await fetch(`${API_BASE}/cart`);
    cart = await res.json();
    updateCartCount();
    renderCartItems();
  } catch (err) {
    console.error('Error loading cart:', err);
  }
}

async function addToCart(productId) {
  try {
    await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    loadCart();
  } catch (err) {
    console.error('Error adding to cart:', err);
  }
}

async function updateCartItemQuantity(productId, quantity) {
  if (quantity <= 0) {
    await removeFromCart(productId);
    return;
  }

  try {
    await fetch(`${API_BASE}/cart/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    loadCart();
  } catch (err) {
    console.error('Error updating cart:', err);
  }
}

async function removeFromCart(productId) {
  try {
    await fetch(`${API_BASE}/cart/${productId}`, { method: 'DELETE' });
    loadCart();
  } catch (err) {
    console.error('Error removing from cart:', err);
  }
}

async function clearCart() {
  try {
    await fetch(`${API_BASE}/cart`, { method: 'DELETE' });
    loadCart();
  } catch (err) {
    console.error('Error clearing cart:', err);
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
    document.getElementById('cart-total').textContent = '0.00';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'flex items-center space-x-4';
    const itemTotal = item.product.price * item.quantity;
    total += itemTotal;

    div.innerHTML = `
      <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 rounded object-cover">
      <div class="flex-1">
        <h4 class="font-bold">${item.product.name}</h4>
        <p class="text-gray-600">$${item.product.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <div class="flex items-center space-x-2">
        <button class="px-2 py-1 bg-gray-200 rounded" onclick="updateCartItemQuantity(${item.productId}, ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button class="px-2 py-1 bg-gray-200 rounded" onclick="updateCartItemQuantity(${item.productId}, ${item.quantity + 1})">+</button>
        <button class="ml-2 text-red-600" onclick="removeFromCart(${item.productId})">Remove</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function openCart() {
  document.getElementById('cart-modal').classList.remove('hidden');
}

function closeCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}
