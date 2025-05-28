// Sistema de carrito para Raper
let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
let cartTotal = 0;

// DOM Elements for Side Cart
const sideCartContainer = document.getElementById('side-cart-container');
const sideCartOverlay = document.getElementById('side-cart-overlay');
const sideCartElement = document.getElementById('side-cart');
const sideCartContent = document.getElementById('side-cart-content');
const closeCartBtn = document.getElementById('close-cart-btn');

// Inicializar carrito y side cart listeners
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  setupAddToCartButtons();
  setupProductImageLinks();
  setupSideCartListeners();
  
  // Initialize the cart with proper position
  if (sideCartElement) {
    sideCartElement.classList.add('centered-cart');
  }
});

function setupAddToCartButtons() {
  const addToCartButtons = document.querySelectorAll('.button-2, .add-to-cart-big'); // Include product page button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      let productInfo = {};
      if (this.closest('.product-card')) {
        const productCard = this.closest('.product-card');
        productInfo = {
          id: productCard.dataset.productId || Date.now().toString(),
          name: productCard.querySelector('.product-title').innerText,
          price: parseFloat(productCard.querySelector('.product-price').innerText.replace('$', '')),
          image: productCard.querySelector('.product-image').src,
          quantity: 1
        };
      } else if (this.closest('.product-actions')) { // For product-details.html
        const detailsContainer = document.querySelector('[data-product-id]'); // Assuming product ID is on a main container
        productInfo = {
          id: detailsContainer ? detailsContainer.dataset.productId : '1',
          name: document.querySelector('.product-name')?.innerText || document.querySelector('.product-hero-title')?.innerText || 'Producto',
          price: parseFloat((document.querySelector('.product-price-big')?.innerText || document.querySelector('.product-hero-price')?.innerText || '0').replace('$', '')),
          image: document.querySelector('.product-main-image')?.src || 'images/audio.png',
          quantity: parseInt(document.getElementById('product-quantity')?.value) || 1
        };
      }
      
      if (productInfo.id) {
        addToCart(productInfo);
        showCartNotification();
        setTimeout(() => openSideCart(), 500); // Open side cart after notification appears
      }
    });
  });
}

function setupProductImageLinks() {
  const productImages = document.querySelectorAll('.product-image-wrapper');
  productImages.forEach(imgWrapper => {
    imgWrapper.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productId = productCard?.dataset.productId || '1';
      window.location.href = `/product-details.html?id=${productId}`;
    });
  });
}

function setupSideCartListeners() {
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', closeSideCart);
  }
  if (sideCartOverlay) {
    sideCartOverlay.addEventListener('click', closeSideCart);
  }
  
  // Add escape key listener for closing cart
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sideCartContainer?.classList.contains('is-open')) {
      closeSideCart();
    }
  });
}

function addToCart(product) {
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += product.quantity || 1;
  } else {
    cart.push(product);
  }
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount(true); // Add animation
  
  if (sideCartContainer && sideCartContainer.classList.contains('is-open')) {
    renderCartItemsSide(); // Re-render if side cart is open
  }
}

function updateCartCount(animate = false) {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.innerText = totalItems;
  
  // Add animation if requested
  if (animate && totalItems > 0) {
    cartCountElement.style.animation = 'none';
    setTimeout(() => {
      cartCountElement.style.animation = 'countBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }, 10);
  }
  
  // Calcular total del carrito
  cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function showCartNotification() {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.cart-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <div class="cart-notification-content">
      <div class="cart-notification-icon">✓</div>
      <div class="cart-notification-text">¡Producto agregado al carrito!</div>
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => { notification.classList.add('show'); }, 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => { notification.remove(); }, 300);
  }, 2500);
}

// Called by navbar icon: onclick="showCart()"
function showCart() {
  openSideCart();
}

function openSideCart() {
  if (!sideCartContainer) return;
  sideCartContainer.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
  loadCartContent();
  
  // Add animation class
  if (sideCartElement) {
    sideCartElement.style.animation = 'cartPopIn 0.5s forwards cubic-bezier(0.18, 1.25, 0.40, 1.30)';
  }
}

function closeSideCart() {
  if (!sideCartContainer) return;
  sideCartContainer.classList.remove('is-open');
  document.body.style.overflow = ''; // Restore background scroll
  
  // Reset animation
  if (sideCartElement) {
    sideCartElement.style.animation = '';
  }
}

async function loadCartContent() {
  if (!sideCartContent) return;
  sideCartContent.innerHTML = '<p>Cargando carrito...</p>';
  try {
    const response = await fetch('/cart.html');
    if (!response.ok) throw new Error('Error al cargar la página del carrito.');
    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    const cartPageContainer = doc.querySelector('.cart-page-container'); // Main container in cart.html
    
    if (cartPageContainer) {
      sideCartContent.innerHTML = ''; // Clear loading message
      sideCartContent.appendChild(cartPageContainer); // Append the whole container
      // After loading content, re-render cart items using current cart data
      renderCartItemsSide(); 
    } else {
      sideCartContent.innerHTML = '<p>Error: No se pudo cargar el contenido del carrito.</p>';
    }
  } catch (error) {
    console.error('Error loading cart content:', error);
    sideCartContent.innerHTML = '<p>Error al cargar el carrito. Intentá de nuevo.</p>';
  }
}

function renderCartItemsSide() {
  // This function now targets elements within the loaded side-cart-content
  const cartItemsContainer = sideCartContent.querySelector('#cart-items'); // Assuming #cart-items is inside .cart-page-container
  const cartTotalElement = sideCartContent.querySelector('#cart-total'); // Assuming #cart-total is inside .cart-page-container
  const checkoutButton = sideCartContent.querySelector('#checkout-button'); // Assuming #checkout-button is inside .cart-page-container

  if (!cartItemsContainer || !cartTotalElement) {
    // If the structure isn't fully loaded or cart.html is different, wait or log error
    // For now, if cart.html's structure is not found, it might mean it's still loading or structure is unexpected
    // console.warn('Side cart elements not found for rendering. Content might be loading or cart.html structure is different.');
    return; 
  }

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<div class="empty-cart" style="padding: 20px; text-align: center;">Tu carrito está vacío</div>';
    if(checkoutButton) checkoutButton.style.display = 'none';
    cartTotalElement.innerText = '$0.00';
    // Clear cart button might also need to be handled if present
    const clearCartBtn = sideCartContent.querySelector('#clear-cart-button');
    if(clearCartBtn) clearCartBtn.style.display = 'none';
    return;
  }

  let cartHTML = '';
  let cartTotalAmount = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    cartTotalAmount += itemTotal;
    cartHTML += `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-image-wrapper"><img src="${item.image}" alt="${item.name}" class="cart-item-image"></div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
        <button class="cart-item-remove" data-id="${item.id}">×</button>
      </div>
    `;
  });

  cartItemsContainer.innerHTML = cartHTML;
  cartTotalElement.innerText = `$${cartTotalAmount.toFixed(2)}`;
  if(checkoutButton) {
    checkoutButton.style.display = 'block';
    checkoutButton.innerText = 'Finalizar Compra';
  }
  
  const clearCartBtn = sideCartContent.querySelector('#clear-cart-button');
  if(clearCartBtn) {
    clearCartBtn.style.display = 'block';
    clearCartBtn.innerText = 'Vaciar Carrito';
  }

  attachSideCartItemEventListeners();
}

function attachSideCartItemEventListeners() {
    sideCartContent.querySelectorAll('.cart-item-remove').forEach(button => {
        button.removeEventListener('click', handleRemoveItem); // Prevent multiple listeners
        button.addEventListener('click', handleRemoveItem);
    });
    sideCartContent.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.removeEventListener('click', handleDecreaseQuantity);
        button.addEventListener('click', handleDecreaseQuantity);
    });
    sideCartContent.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.removeEventListener('click', handleIncreaseQuantity);
        button.addEventListener('click', handleIncreaseQuantity);
    });
    // Add listener for clear cart if present
    const clearCartButton = sideCartContent.querySelector('#clear-cart-button');
    if (clearCartButton) {
        clearCartButton.removeEventListener('click', handleClearCart);
        clearCartButton.addEventListener('click', handleClearCart);
    }
    // Checkout button listener (it should just navigate)
    const checkoutBtnElem = sideCartContent.querySelector('#checkout-button');
    if (checkoutBtnElem) {
      checkoutBtnElem.onclick = () => { window.location.href = '/checkout.html'; };
    }
}

function handleRemoveItem() {
  const productId = this.dataset.id;
  removeFromCartLogic(productId);
}

function handleDecreaseQuantity() {
  const productId = this.dataset.id;
  updateQuantityLogic(productId, -1);
}

function handleIncreaseQuantity() {
  const productId = this.dataset.id;
  updateQuantityLogic(productId, 1);
}

function handleClearCart() {
    cart = [];
    localStorage.setItem('raperCart', JSON.stringify(cart));
    updateCartCount();
    renderCartItemsSide();
}

function removeFromCartLogic(productId) {
  cart = cart.filter(item => item.id != productId);
  localStorage.setItem('raperCart', JSON.stringify(cart));
  updateCartCount();
  renderCartItemsSide();
}

function updateQuantityLogic(productId, change) {
  const itemIndex = cart.findIndex(item => String(item.id) === String(productId)); // Ensure ID comparison is robust
  if (itemIndex === -1) return;
  cart[itemIndex].quantity += change;
  if (cart[itemIndex].quantity <= 0) {
    removeFromCartLogic(productId);
  } else {
    localStorage.setItem('raperCart', JSON.stringify(cart));
    updateCartCount();
    renderCartItemsSide();
  }
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