// Fixes específicos para el carrito en móvil
console.log('Mobile Cart Fixes cargado');

// Función mejorada para mostrar carrito con mejor error handling
function showCartMobile() {
  console.log('showCartMobile llamado');
  
  try {
    // Verificar si los elementos existen
    const sideCartContainer = document.getElementById('side-cart-container');
    const sideCartContent = document.getElementById('side-cart-content');
    
    if (!sideCartContainer) {
      console.error('side-cart-container no encontrado');
      // Crear el elemento si no existe
      createCartElements();
      return;
    }
    
    if (!sideCartContent) {
      console.error('side-cart-content no encontrado');
      return;
    }
    
    console.log('Elementos del carrito encontrados, abriendo...');
    
    // Abrir carrito
    sideCartContainer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    
    // Renderizar contenido con mejor error handling
    renderCartContentMobile(sideCartContent);
    
  } catch (error) {
    console.error('Error al abrir carrito en móvil:', error);
    alert('Error al abrir el carrito. Por favor, recarga la página.');
  }
}

// Función para crear elementos del carrito si no existen
function createCartElements() {
  console.log('Creando elementos del carrito...');
  
  // Verificar si ya existe
  if (document.getElementById('side-cart-container')) {
    return;
  }
  
  const cartHTML = `
    <div id="side-cart-container" class="side-cart-container">
      <div id="side-cart-overlay" class="side-cart-overlay"></div>
      <div id="side-cart" class="side-cart">
        <button id="close-cart-btn" class="close-cart-btn">&times;</button>
        <div id="side-cart-content" class="side-cart-content">
          <p data-i18n="cart-loading">Cargando carrito...</p>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', cartHTML);
  
  // Configurar eventos
  setupCartEventsMobile();
  
  // Intentar abrir el carrito ahora
  setTimeout(() => showCartMobile(), 100);
}

// Configurar eventos del carrito con mejor handling
function setupCartEventsMobile() {
  console.log('Configurando eventos móviles del carrito...');
  
  const closeCartBtn = document.getElementById('close-cart-btn');
  const sideCartOverlay = document.getElementById('side-cart-overlay');
  
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeCartMobile();
    });
  }
  
  if (sideCartOverlay) {
    sideCartOverlay.addEventListener('click', function(e) {
      e.preventDefault();
      closeCartMobile();
    });
  }
}

// Función mejorada para cerrar carrito
function closeCartMobile() {
  console.log('closeCartMobile llamado');
  
  try {
    const sideCartContainer = document.getElementById('side-cart-container');
    if (sideCartContainer) {
      sideCartContainer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  } catch (error) {
    console.error('Error al cerrar carrito:', error);
  }
}

// Función mejorada para renderizar contenido del carrito
function renderCartContentMobile(container) {
  console.log('renderCartContentMobile llamado');
  
  try {
    if (!container) {
      console.error('Container no existe');
      return;
    }
    
    // Obtener carrito del localStorage
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('raperCart')) || [];
    } catch (e) {
      console.error('Error al parsear carrito:', e);
      cart = [];
    }
    
    console.log('Carrito actual:', cart);
    
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
                <button class="quantity-btn" onclick="updateCartQuantityMobile('${item.id}', -1)">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantityMobile('${item.id}', 1)">+</button>
              </div>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toLocaleString()} ARS</div>
            <button class="cart-item-remove" onclick="removeFromCartMobile('${item.id}')">&times;</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <div class="summary-total">
          <span class="summary-total-label">Total:</span>
          <span class="summary-total-value">$${total.toLocaleString()} ARS</span>
        </div>
        <button class="checkout-button" onclick="proceedToCheckout()">Finalizar Compra</button>
        <button id="clear-cart" onclick="clearCartMobile()">Vaciar Carrito</button>
      </div>
    `;
    
  } catch (error) {
    console.error('Error al renderizar carrito:', error);
    container.innerHTML = `
      <div class="empty-cart">
        <h3>Error al cargar el carrito</h3>
        <p>Por favor, recarga la página</p>
        <button onclick="location.reload()">Recargar</button>
      </div>
    `;
  }
}

// Funciones auxiliares con mejor error handling
function updateCartQuantityMobile(productId, change) {
  console.log('updateCartQuantityMobile:', productId, change);
  
  try {
    // Usar la función original si existe, o implementar nuestra versión
    if (typeof updateCartQuantity === 'function') {
      updateCartQuantity(productId, change);
    } else {
      // Implementación propia
      let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== productId);
        }
        localStorage.setItem('raperCart', JSON.stringify(cart));
        
        // Actualizar UI
        const container = document.getElementById('side-cart-content');
        if (container) {
          renderCartContentMobile(container);
        }
        
        // Actualizar contador
        if (typeof updateCartCount === 'function') {
          updateCartCount();
        }
      }
    }
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
  }
}

function removeFromCartMobile(productId) {
  console.log('removeFromCartMobile:', productId);
  
  try {
    if (typeof removeFromCart === 'function') {
      removeFromCart(productId);
    } else {
      let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('raperCart', JSON.stringify(cart));
      
      const container = document.getElementById('side-cart-content');
      if (container) {
        renderCartContentMobile(container);
      }
      
      if (typeof updateCartCount === 'function') {
        updateCartCount();
      }
    }
  } catch (error) {
    console.error('Error al remover del carrito:', error);
  }
}

function clearCartMobile() {
  console.log('clearCartMobile llamado');
  
  try {
    if (typeof clearCart === 'function') {
      clearCart();
    } else {
      localStorage.setItem('raperCart', JSON.stringify([]));
      
      const container = document.getElementById('side-cart-content');
      if (container) {
        renderCartContentMobile(container);
      }
      
      if (typeof updateCartCount === 'function') {
        updateCartCount();
      }
    }
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
  }
}

// Reemplazar función showCart en móvil
function detectMobileAndSetup() {
  if (window.innerWidth <= 767) {
    console.log('Dispositivo móvil detectado, configurando carrito móvil...');
    
    // Reemplazar showCart en móvil
    window.showCart = showCartMobile;
    
    // Configurar eventos cuando la página esté lista
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCartEventsMobile);
    } else {
      setupCartEventsMobile();
    }
  }
}

// Inicializar
detectMobileAndSetup();

// Re-detectar en resize
window.addEventListener('resize', detectMobileAndSetup);

// Debug: exponer funciones globalmente
window.showCartMobile = showCartMobile;
window.closeCartMobile = closeCartMobile;

console.log('Mobile Cart Fixes inicializado'); 