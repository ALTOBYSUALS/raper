// Sistema de carrito para Raper
let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
let cartTotal = 0;

// Inicializar carrito
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  // Añadir event listeners a botones "Add to Cart"
  const addToCartButtons = document.querySelectorAll('.button-2');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productCard = this.closest('.product-card');
      const product = {
        id: productCard.dataset.productId || Date.now(), // Usar data-product-id o timestamp como id
        name: productCard.querySelector('.product-title').innerText,
        price: parseFloat(productCard.querySelector('.product-price').innerText.replace('$', '')),
        image: productCard.querySelector('.product-image').src,
        quantity: 1
      };
      
      addToCart(product);
      showCartNotification();
    });
  });
  
  // Event listener para botones de detalles de producto
  const productImages = document.querySelectorAll('.product-image-wrapper');
  productImages.forEach(imgWrapper => {
    imgWrapper.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productId = productCard.dataset.productId || '1';
      window.location.href = `/product-details.html?id=${productId}`;
    });
  });
});

// Añadir producto al carrito
function addToCart(product) {
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex > -1) {
    // Producto ya existe en el carrito, incrementar cantidad
    cart[existingProductIndex].quantity += 1;
  } else {
    // Nuevo producto
    cart.push(product);
  }
  
  // Guardar carrito en localStorage
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.innerText = totalItems;
  
  // Calcular total del carrito
  cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Mostrar notificación de carrito
function showCartNotification() {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <div class="cart-notification-content">
      <div class="cart-notification-icon">✓</div>
      <div class="cart-notification-text">Producto añadido al carrito</div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Animar salida y remover
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}

// Mostrar carrito
function showCart() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  // Redirigir a la página del carrito
  window.location.href = '/cart.html';
}

// Remover item del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id != productId);
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  
  // Si estamos en la página del carrito, actualizar vista
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
}

// Renderizar items del carrito en la página cart.html
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
    document.getElementById('checkout-button').style.display = 'none';
    document.getElementById('cart-total').innerText = '$0.00';
    return;
  }
  
  let cartHTML = '';
  let cartTotalAmount = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotalAmount += itemTotal;
    
    cartHTML += `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-image-wrapper">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button class="cart-item-remove" data-id="${item.id}">×</button>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartHTML;
  document.getElementById('cart-total').innerText = `$${cartTotalAmount.toFixed(2)}`;
  
  // Añadir event listeners a los botones de cantidad y remover
  document.querySelectorAll('.cart-item-remove').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.id;
      removeFromCart(productId);
    });
  });
  
  document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.cart-item').dataset.productId;
      updateQuantity(productId, -1);
    });
  });
  
  document.querySelectorAll('.quantity-btn.increase').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.closest('.cart-item').dataset.productId;
      updateQuantity(productId, 1);
    });
  });
}

// Actualizar cantidad de un producto
function updateQuantity(productId, change) {
  const itemIndex = cart.findIndex(item => item.id == productId);
  if (itemIndex === -1) return;
  
  cart[itemIndex].quantity += change;
  
  // Remover item si la cantidad es 0
  if (cart[itemIndex].quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  
  if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
  }
}

// Proceder al checkout
function proceedToCheckout() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  window.location.href = '/checkout.html';
} 