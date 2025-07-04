// Sistema de carrito unificado para RAPER
let cart = JSON.parse(localStorage.getItem('raperCart')) || [];

// Datos de productos
const productData = {
  1: { name: 'RAPER Celeste Místico', price: 250000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398980/9_tl7qox.jpg' },
  2: { name: 'RAPER Violeta Real', price: 250000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398979/1_bkqjfk.jpg' },
  3: { name: 'RAPER Negro Obsidiana', price: 250000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748451429/10_oriq88.jpg' },
  4: { name: 'RAPER Blanco Perla', price: 199000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398979/4_ljygwt.jpg' },
  5: { name: 'RAPER Gris Titanio', price: 199000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398979/5_1_jygqx3.jpg' },
  6: { name: 'RAPER Azul Océano', price: 199000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398979/6_mt8tn6.jpg' },
  7: { name: 'RAPER Verde Esmeralda', price: 199000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398978/7_1_zq3fig.jpg' },
  8: { name: 'RAPER Rojo Carmesí', price: 199000, image: 'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398978/8_1_ixbyop.jpg' },
  100: { name: 'RAPER Basketball Premium', price: 85000, image: 'https://pub-573f900cac3744cfbb3b1f02894f7042.r2.dev/balon.jpg' },
  200: { name: 'RAPER Director Chair Premium', price: 149999, image: 'https://pub-573f900cac3744cfbb3b1f02894f7042.r2.dev/silla.jpg' }
};

// Función para mostrar el carrito (llamada desde el navbar)
function showCart() {
  openSideCart();
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  setupCartEvents();

  // Verificar si hay productos en el carrito y actualizar UI
  if (cart.length > 0) {
    console.log(`Carrito cargado con ${cart.length} productos`);
  }
});

// Hacer las funciones disponibles globalmente
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.showCart = showCart;

// Configurar eventos del carrito
function setupCartEvents() {
  const closeCartBtn = document.getElementById('close-cart-btn');
  const sideCartOverlay = document.getElementById('side-cart-overlay');
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeSideCart);
  }
  
  if (sideCartOverlay) {
    sideCartOverlay.addEventListener('click', closeSideCart);
  }
  
  // Cerrar carrito con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSideCart();
    }
  });
}

// Función para abrir el carrito lateral
function openSideCart() {
  const sideCartContainer = document.getElementById('side-cart-container');
  const sideCartContent = document.getElementById('side-cart-content');
  
  if (!sideCartContainer) return;
  
  sideCartContainer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  
  // Renderizar contenido del carrito
  renderCartContent(sideCartContent);
}

// Función para cerrar el carrito lateral
function closeSideCart() {
  const sideCartContainer = document.getElementById('side-cart-container');
  if (!sideCartContainer) return;
  
  sideCartContainer.classList.remove('is-open');
  document.body.style.overflow = '';
}

// Función para renderizar el contenido del carrito
function renderCartContent(container) {
  if (!container) return;
  
  // Sincronizar carrito con localStorage antes de renderizar
  cart = JSON.parse(localStorage.getItem('raperCart')) || [];
  console.log('🔄 Sincronizando carrito para renderizar:', cart.length, 'items');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Tu carrito está vacío</h3>
        <p>Agrega algunos productos para comenzar</p>
        <a href="/store.html" class="continue-shopping-btn">Continuar Comprando</a>
      </div>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  container.innerHTML = `
    <div class="cart-header">
      <h3>Tu Carrito (${cart.reduce((sum, item) => sum + item.quantity, 0)} productos)</h3>
    </div>
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image-wrapper">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toLocaleString()} ARS</p>
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
          <div class="cart-item-total">$${(item.price * item.quantity).toLocaleString()} ARS</div>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <div class="summary-total">
        <span class="summary-total-label">Total:</span>
        <span class="summary-total-value">$${total.toLocaleString()} ARS</span>
      </div>
      <button class="checkout-button" onclick="proceedToCheckout()">Finalizar Compra</button>
      <button id="clear-cart" onclick="clearCart()">Vaciar Carrito</button>
    </div>
  `;
}

// Función para agregar al carrito
function addToCart(productId) {
  const product = productData[productId];
  if (!product) {
    console.error(`Producto con ID ${productId} no encontrado`);
    return false;
  }

  // Normalizar el ID como string para consistencia
  const normalizedId = String(productId);
  
  // Buscar si el producto ya existe en el carrito
  const existingItem = cart.find(item => String(item.id) === normalizedId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: normalizedId, // Guardar como string
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  // Guardar en localStorage
  localStorage.setItem('raperCart', JSON.stringify(cart));

  // Mostrar notificación
  showCartNotification(`${product.name} agregado al carrito`);
  
  // Actualizar contador del carrito
  updateCartCount();
  
  console.log(`Producto agregado: ${product.name}. Total items en carrito: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);
  
  return true;
}

// Función para actualizar cantidad en el carrito
function updateCartQuantity(productId, change) {
  // Asegurar que el productId sea string para comparación
  const normalizedId = String(productId);
  const item = cart.find(item => String(item.id) === normalizedId);
  if (!item) {
    console.error(`No se encontró el producto con ID: ${productId}`);
    return;
  }
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  
  console.log(`🔄 Cantidad actualizada: ${item.name} - Cantidad: ${item.quantity}`);
  
  // Re-renderizar carrito si está abierto
  const sideCartContent = document.getElementById('side-cart-content');
  if (sideCartContent && document.getElementById('side-cart-container').classList.contains('is-open')) {
    renderCartContent(sideCartContent);
  }
}

// Función para remover del carrito
function removeFromCart(productId) {
  // Asegurar que el productId sea string para comparación
  const normalizedId = String(productId);
  const originalLength = cart.length;
  cart = cart.filter(item => String(item.id) !== normalizedId);
  
  if (cart.length === originalLength) {
    console.error(`No se pudo eliminar el producto con ID: ${productId}`);
    return;
  }
  
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  
  console.log(`🗑️ Producto eliminado del carrito: ID ${productId}`);
  
  // Re-renderizar carrito si está abierto
  const sideCartContent = document.getElementById('side-cart-content');
  if (sideCartContent && document.getElementById('side-cart-container').classList.contains('is-open')) {
    renderCartContent(sideCartContent);
  }
}

// Función para vaciar el carrito
function clearCart() {
  cart = [];
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  
  // Re-renderizar carrito si está abierto
  const sideCartContent = document.getElementById('side-cart-content');
  if (sideCartContent && document.getElementById('side-cart-container').classList.contains('is-open')) {
    renderCartContent(sideCartContent);
  }
  
  showCartNotification('Carrito vaciado');
}

// Función para proceder al checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  // Redirigir a la página de checkout
  window.location.href = 'checkout.html';
}

// Función para mostrar notificación del carrito
function showCartNotification(message) {
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification-content">
        <div class="cart-notification-icon">✓</div>
        <div class="cart-notification-text">${message}</div>
      </div>
    `;
    document.body.appendChild(notification);
  } else {
    notification.querySelector('.cart-notification-text').textContent = message;
  }

  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  // Siempre sincronizar con localStorage primero
  cart = JSON.parse(localStorage.getItem('raperCart')) || [];
  
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    console.log('🔢 Contador del carrito actualizado:', totalItems, 'items');
    
    // Efecto de animación
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
      cartCount.style.transform = 'scale(1)';
    }, 300);
  }
}

// Función para obtener el carrito (para usar en checkout)
function getCart() {
  return cart;
}

// Función para obtener el total del carrito
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Exponer funciones globalmente para acceso desde otras páginas
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.showCart = showCart;
window.getCart = getCart;
window.getCartTotal = getCartTotal;
window.updateCartCount = updateCartCount; 