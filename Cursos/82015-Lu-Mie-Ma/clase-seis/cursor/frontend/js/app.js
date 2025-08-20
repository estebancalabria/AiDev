// Configuración de la API
const API_BASE_URL = 'http://localhost:3000/api';

// Estado global de la aplicación
let currentSection = 'hero';
let products = [];
let cart = [];
let featuredProducts = [];
let currentCarouselSlide = 0;
let carouselInterval = null;

// Elementos del DOM
const sections = {
    hero: document.getElementById('heroSection'),
    products: document.getElementById('productsSection'),
    cart: document.getElementById('cartSection'),
    checkout: document.getElementById('checkoutSection'),
    orderConfirmation: document.getElementById('orderConfirmation')
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    loadCart();
});

// Inicializar la aplicación
function initializeApp() {
    showSection('hero');
    updateCartCount();
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación
    document.getElementById('homeBtn').addEventListener('click', () => showSection('hero'));
    document.getElementById('productsBtn').addEventListener('click', () => showSection('products'));
    document.getElementById('cartBtn').addEventListener('click', () => showSection('cart'));
    
    // Botones del hero
    document.getElementById('exploreBtn').addEventListener('click', () => showSection('products'));
    document.getElementById('categoriesBtn').addEventListener('click', () => showSection('products'));
    
    // Filtros de productos
    document.getElementById('allProductsBtn').addEventListener('click', () => filterProducts('all'));
    document.getElementById('electronicsBtn').addEventListener('click', () => filterProducts('Electronics'));
    
    // Carrito
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    document.getElementById('checkoutBtn').addEventListener('click', () => showSection('checkout'));
    document.getElementById('backToCartBtn').addEventListener('click', () => showSection('cart'));
    
    // Checkout
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
    document.getElementById('continueShoppingBtn').addEventListener('click', () => {
        showSection('hero');
        document.getElementById('checkoutForm').reset();
    });
    
    // Búsqueda
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
}

// Mostrar sección específica
function showSection(sectionName) {
  // Ocultar todas las secciones
  Object.values(sections).forEach(section => {
    if (section) section.classList.add('hidden');
  });
  
  // Mostrar la sección solicitada
  if (sections[sectionName]) {
    sections[sectionName].classList.remove('hidden');
    currentSection = sectionName;
  }
  
  // Actualizar navegación activa
  updateActiveNavigation(sectionName);
  
  // Manejar carousel según la sección
  if (sectionName === 'hero') {
    // Reiniciar carousel cuando se vuelve al inicio
    if (featuredProducts.length > 0) {
      goToSlide(0);
      startCarouselAutoplay();
    }
  } else {
    // Pausar carousel cuando se sale del inicio
    pauseCarouselAutoplay();
  }
}

// Actualizar navegación activa
function updateActiveNavigation(activeSection) {
    const navButtons = ['homeBtn', 'productsBtn', 'cartBtn'];
    navButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            if (btnId === 'homeBtn' && activeSection === 'hero') {
                btn.classList.add('text-primary');
                btn.classList.remove('text-gray-700');
            } else if (btnId === 'productsBtn' && activeSection === 'products') {
                btn.classList.add('text-primary');
                btn.classList.remove('text-gray-700');
            } else if (btnId === 'cartBtn' && activeSection === 'cart') {
                btn.classList.add('text-primary');
                btn.classList.remove('text-gray-700');
            } else {
                btn.classList.remove('text-primary');
                btn.classList.add('text-gray-700');
            }
        }
    });
}

// Cargar productos desde la API
async function loadProducts() {
  try {
    showLoading(true);
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Error al cargar productos');
    
    products = await response.json();
    
    // Seleccionar productos destacados (los primeros 6 productos)
    featuredProducts = products.slice(0, 6);
    
    renderProducts(products);
    initializeCarousel();
  } catch (error) {
    console.error('Error:', error);
    showToast('Error al cargar productos', 'error');
  } finally {
    showLoading(false);
  }
}

// Renderizar productos en la grilla
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">${product.name}</h4>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-bold text-primary">$${product.price.toFixed(2)}</span>
                    <span class="text-sm text-gray-500">Stock: ${product.stock}</span>
                </div>
                <button onclick="addToCart(${product.id})" 
                        class="w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                    <i class="fas fa-cart-plus mr-2"></i>Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Filtrar productos por categoría
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
        document.getElementById('allProductsBtn').classList.add('bg-primary', 'text-white');
        document.getElementById('allProductsBtn').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('electronicsBtn').classList.remove('bg-primary', 'text-white');
        document.getElementById('electronicsBtn').classList.add('bg-gray-200', 'text-gray-700');
    } else {
        const filteredProducts = products.filter(p => p.category === category);
        renderProducts(filteredProducts);
        document.getElementById('electronicsBtn').classList.add('bg-primary', 'text-white');
        document.getElementById('electronicsBtn').classList.remove('bg-gray-200', 'text-gray-700');
        document.getElementById('allProductsBtn').classList.remove('bg-primary', 'text-white');
        document.getElementById('allProductsBtn').classList.add('bg-gray-200', 'text-gray-700');
    }
}

// Manejar búsqueda de productos
async function handleSearch(event) {
    const query = event.target.value.trim();
    
    if (query.length < 2) {
        renderProducts(products);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/products/search/${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Error en la búsqueda');
        
        const searchResults = await response.json();
        renderProducts(searchResults);
    } catch (error) {
        console.error('Error en búsqueda:', error);
        showToast('Error en la búsqueda', 'error');
    }
}

// Agregar producto al carrito
async function addToCart(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        if (!response.ok) throw new Error('Error al agregar al carrito');
        
        const result = await response.json();
        cart = result.cart;
        updateCartCount();
        updateCartDisplay();
        showToast('Producto agregado al carrito', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al agregar al carrito', 'error');
    }
}

// Cargar carrito desde la API
async function loadCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart`);
        if (!response.ok) throw new Error('Error al cargar carrito');
        
        cart = await response.json();
        updateCartCount();
        updateCartDisplay();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Actualizar contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 text-lg">Tu carrito está vacío</p>
                <button onclick="showSection('products')" class="mt-4 bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg">
                    Ir a Productos
                </button>
            </div>
        `;
        cartSummary.classList.add('hidden');
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="bg-white rounded-lg shadow-md p-4">
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${item.name}</h4>
                        <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" 
                                class="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="w-12 text-center font-semibold">${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" 
                                class="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold text-gray-900">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart(${item.id})" 
                                class="text-red-500 hover:text-red-700 text-sm">
                            <i class="fas fa-trash mr-1"></i>Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        updateCartTotal();
        cartSummary.classList.remove('hidden');
    }
}

// Actualizar cantidad de item en carrito
async function updateCartItemQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        await removeFromCart(itemId);
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/cart/update/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });
        
        if (!response.ok) throw new Error('Error al actualizar carrito');
        
        const result = await response.json();
        cart = result.cart;
        updateCartCount();
        updateCartDisplay();
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al actualizar carrito', 'error');
    }
}

// Eliminar item del carrito
async function removeFromCart(itemId) {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/remove/${itemId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Error al eliminar del carrito');
        
        const result = await response.json();
        cart = result.cart;
        updateCartCount();
        updateCartDisplay();
        showToast('Producto eliminado del carrito', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al eliminar del carrito', 'error');
    }
}

// Limpiar carrito
async function clearCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/clear`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Error al limpiar carrito');
        
        cart = [];
        updateCartCount();
        updateCartDisplay();
        showToast('Carrito limpiado', 'success');
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al limpiar carrito', 'error');
    }
}

// Actualizar total del carrito
function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Manejar checkout
async function handleCheckout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const customerInfo = {
        firstName: formData.get('firstName') || document.getElementById('firstName').value,
        lastName: formData.get('lastName') || document.getElementById('lastName').value,
        email: formData.get('email') || document.getElementById('email').value,
        address: formData.get('address') || document.getElementById('address').value,
        city: formData.get('city') || document.getElementById('city').value,
        state: formData.get('state') || document.getElementById('state').value,
        zipCode: formData.get('zipCode') || document.getElementById('zipCode').value
    };
    
    try {
        showLoading(true);
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerInfo })
        });
        
        if (!response.ok) throw new Error('Error al procesar orden');
        
        const result = await response.json();
        showToast('¡Orden procesada exitosamente!', 'success');
        showSection('orderConfirmation');
        
        // Limpiar formulario
        event.target.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showToast('Error al procesar orden', 'error');
    } finally {
        showLoading(false);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.toggle('hidden', !show);
    }
}

// Mostrar toast notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                   type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Inicializar carousel
function initializeCarousel() {
  if (featuredProducts.length === 0) return;
  
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselIndicators = document.getElementById('carouselIndicators');
  
  if (!carouselTrack || !carouselIndicators) return;
  
  // Generar slides del carousel
  carouselTrack.innerHTML = featuredProducts.map(product => `
    <div class="carousel-slide min-w-full h-96 relative group cursor-pointer" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h4 class="text-2xl font-bold mb-2">${product.name}</h4>
        <p class="text-lg mb-3">$${product.price.toFixed(2)}</p>
        <button class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors">
          Ver Detalles
        </button>
      </div>
    </div>
  `).join('');
  
  // Generar indicadores
  carouselIndicators.innerHTML = featuredProducts.map((_, index) => `
    <button class="carousel-indicator w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-primary' : 'bg-gray-300'}" data-slide="${index}"></button>
  `).join('');
  
  // Configurar event listeners
  setupCarouselEvents();
  
  // Iniciar autoplay
  startCarouselAutoplay();
  
  // Mostrar información del primer producto
  showFeaturedProductInfo(featuredProducts[0]);
}

// Configurar eventos del carousel
function setupCarouselEvents() {
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const slides = document.querySelectorAll('.carousel-slide');
  
  // Botones de navegación
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateCarousel('prev'));
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateCarousel('next'));
  }
  
  // Indicadores
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const slideIndex = parseInt(indicator.dataset.slide);
      goToSlide(slideIndex);
    });
  });
  
  // Clicks en slides
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const productId = parseInt(slide.dataset.productId);
      const product = featuredProducts.find(p => p.id === productId);
      if (product) {
        showFeaturedProductInfo(product);
      }
    });
  });
}

// Navegar carousel
function navigateCarousel(direction) {
  if (direction === 'next') {
    currentCarouselSlide = (currentCarouselSlide + 1) % featuredProducts.length;
  } else {
    currentCarouselSlide = currentCarouselSlide === 0 ? featuredProducts.length - 1 : currentCarouselSlide - 1;
  }
  
  goToSlide(currentCarouselSlide);
}

// Ir a slide específico
function goToSlide(slideIndex) {
  currentCarouselSlide = slideIndex;
  
  const carouselTrack = document.getElementById('carouselTrack');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (carouselTrack) {
    carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
  }
  
  // Actualizar indicadores
  indicators.forEach((indicator, index) => {
    if (index === slideIndex) {
      indicator.classList.add('bg-primary');
      indicator.classList.remove('bg-gray-300');
    } else {
      indicator.classList.remove('bg-primary');
      indicator.classList.add('bg-gray-300');
    }
  });
  
  // Mostrar información del producto
  if (featuredProducts[slideIndex]) {
    showFeaturedProductInfo(featuredProducts[slideIndex]);
  }
  
  // Reiniciar autoplay
  resetCarouselAutoplay();
}

// Mostrar información del producto destacado
function showFeaturedProductInfo(product) {
  const productInfoPanel = document.getElementById('productInfoPanel');
  const productName = document.getElementById('featuredProductName');
  const productDescription = document.getElementById('featuredProductDescription');
  const productPrice = document.getElementById('featuredProductPrice');
  const productStock = document.getElementById('featuredProductStock');
  const productImage = document.getElementById('featuredProductImage');
  const addToCartBtn = document.getElementById('featuredAddToCartBtn');
  
  if (!productInfoPanel) return;
  
  // Actualizar contenido
  if (productName) productName.textContent = product.name;
  if (productDescription) productDescription.textContent = product.description;
  if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
  if (productStock) productStock.textContent = `Stock: ${product.stock}`;
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
  }
  
  // Configurar botón de agregar al carrito
  if (addToCartBtn) {
    addToCartBtn.onclick = () => addToCart(product.id);
  }
  
  // Mostrar panel con animación
  productInfoPanel.classList.remove('hidden');
  productInfoPanel.classList.add('product-info-enter');
  
  // Remover clase de animación después de completarse
  setTimeout(() => {
    productInfoPanel.classList.remove('product-info-enter');
  }, 500);
}

// Iniciar autoplay del carousel
function startCarouselAutoplay() {
  carouselInterval = setInterval(() => {
    navigateCarousel('next');
  }, 5000); // Cambiar cada 5 segundos
}

// Reiniciar autoplay
function resetCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    startCarouselAutoplay();
  }
}

// Pausar autoplay (opcional, para cuando el usuario interactúa)
function pauseCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
}

// Función debounce para búsqueda
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Hacer funciones disponibles globalmente
window.addToCart = addToCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeFromCart = removeFromCart;
window.showSection = showSection; 