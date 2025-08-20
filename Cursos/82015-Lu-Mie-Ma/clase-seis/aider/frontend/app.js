const API_URL = 'http://localhost:3000/api';
let products = [];
let cart = [];
let currentCategory = 'all';

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutModal = document.getElementById('checkout-modal');

// Event Listeners
document.getElementById('view-cart').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('checkout-btn').addEventListener('click', openCheckout);
document.getElementById('cancel-checkout').addEventListener('click', closeCheckout);
document.getElementById('checkout-form').addEventListener('submit', placeOrder);

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        loadProducts();
    });
});

// Initialize
loadProducts();
loadCart();

// Functions
async function loadProducts() {
    try {
        const url = currentCategory === 'all' 
            ? `${API_URL}/products` 
            : `${API_URL}/products?category=${currentCategory}`;
        
        const response = await fetch(url);
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts() {
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">${product.name}</h3>
                <p class="text-gray-600 text-sm mt-1">${product.description}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-xl font-bold text-gray-900">$${product.price.toFixed(2)}</span>
                    <button onclick="addToCart('${product.id}')" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Add to Cart</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
}

async function loadCart() {
    try {
        const response = await fetch(`${API_URL}/cart`);
        cart = await response.json();
        updateCartCount();
        displayCartItems();
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

async function addToCart(productId) {
    try {
        await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        loadCart();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item flex items-center space-x-4 py-4 border-b';
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-semibold">${product.name}</h4>
                    <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity('${product.id}', ${item.quantity - 1})" class="quantity-btn px-2 py-1 rounded">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${product.id}', ${item.quantity + 1})" class="quantity-btn px-2 py-1 rounded">+</button>
                </div>
                <button onclick="removeFromCart('${product.id}')" class="text-red-500 hover:text-red-700">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        }
    });
    
    cartTotal.textContent = total.toFixed(2);
}

async function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        await removeFromCart(productId);
        return;
    }
    
    try {
        await fetch(`${API_URL}/cart/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        });
        loadCart();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

async function removeFromCart(productId) {
    try {
        await fetch(`${API_URL}/cart/${productId}`, {
            method: 'DELETE'
        });
        loadCart();
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
}

function openCart() {
    cartModal.classList.remove('hidden');
}

function closeCart() {
    cartModal.classList.add('hidden');
}

function openCheckout() {
    closeCart();
    checkoutModal.classList.remove('hidden');
}

function closeCheckout() {
    checkoutModal.classList.add('hidden');
}

async function placeOrder(e) {
    e.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('customer-address').value;
    
    const items = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            productId: item.productId,
            name: product.name,
            price: product.price,
            quantity: item.quantity
        };
    });
    
    try {
        await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items,
                customerInfo: { name, email, address }
            })
        });
        
        // Clear cart
        await fetch(`${API_URL}/cart`, { method: 'DELETE' });
        
        alert('Order placed successfully!');
        closeCheckout();
        loadCart();
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
    if (e.target === checkoutModal) closeCheckout();
});
