document.addEventListener('DOMContentLoaded', function() {
  // Thumbnail gallery functionality
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.querySelector('.product-main-image');
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      // Add active class to clicked thumbnail
      this.classList.add('active');
      // Update main image source with animation
      fadeImageTransition(mainImage, this.src);
    });
  });
  
  // Add animation to product details page elements
  animateProductDetails();
  
  // Ensure quantity input only accepts numbers
  const quantityInput = document.getElementById('product-quantity');
  if (quantityInput) {
    quantityInput.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
      if (this.value === '' || parseInt(this.value) < 1) this.value = 1;
      if (parseInt(this.value) > 10) this.value = 10;
    });
  }
  
  // Update cart count on page load
  updateCartCount();
});

// Function to animate image transitions
function fadeImageTransition(imgElement, newSrc) {
  // Create a fade out animation
  imgElement.style.transition = 'opacity 0.3s ease';
  imgElement.style.opacity = 0;
  
  // After fade out, change the source and fade back in
  setTimeout(() => {
    imgElement.src = newSrc;
    imgElement.style.opacity = 1;
  }, 300);
}

// Function to animate product details on page load
function animateProductDetails() {
  // Elements to animate
  const elements = [
    { selector: '.product-breadcrumbs', delay: 100 },
    { selector: '.product-hero-title', delay: 200 },
    { selector: '.product-hero-price', delay: 300 },
    { selector: '.product-image-gallery', delay: 400 },
    { selector: '.product-description-full', delay: 500 },
    { selector: '.product-specs', delay: 600 },
    { selector: '.product-actions', delay: 700 },
    { selector: '.product-meta', delay: 800 }
  ];
  
  // Apply animation to each element
  elements.forEach(item => {
    const element = document.querySelector(item.selector);
    if (element) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, item.delay);
    }
  });
}

// Quantity selector functions
function decrementQuantity() {
  const quantityInput = document.getElementById('product-quantity');
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
    animateButton(document.querySelector('.quantity-btn.minus'));
  }
}

function incrementQuantity() {
  const quantityInput = document.getElementById('product-quantity');
  if (quantityInput.value < 10) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    animateButton(document.querySelector('.quantity-btn.plus'));
  }
}

// Animate button click
function animateButton(button) {
  if (!button) return;
  
  button.style.transform = 'scale(1.2)';
  button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  
  setTimeout(() => {
    button.style.transform = '';
    button.style.backgroundColor = '';
  }, 150);
}

// Function to add product to cart
function addToCart(id, name, price, quantity, image) {
  // Get product quantity
  const quantityInput = document.getElementById('product-quantity');
  const actualQuantity = quantityInput ? parseInt(quantityInput.value) : quantity;
  
  // Create product object
  const product = {
    id: id,
    name: name,
    price: parseFloat(price),
    quantity: actualQuantity,
    image: image
  };
  
  // Get existing cart
  let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingProductIndex].quantity += product.quantity;
  } else {
    // Add new product to cart
    cart.push(product);
  }
  
  // Save cart to localStorage
  localStorage.setItem('raperCart', JSON.stringify(cart));
  
  // Update cart count with animation
  updateCartCount(true);
  
  // Show notification
  showCartNotification();
  
  // Animate add to cart button
  animateAddToCartButton();
  
  // Open side cart after short delay
  setTimeout(() => {
    showCart();
  }, 1000);
}

// Animate add to cart button
function animateAddToCartButton() {
  const addToCartButton = document.querySelector('.add-to-cart-big');
  if (!addToCartButton) return;
  
  // Add success state
  addToCartButton.innerHTML = '✓ Added to Cart';
  addToCartButton.style.backgroundColor = '#34d399';
  addToCartButton.style.transform = 'translateY(-5px)';
  addToCartButton.style.boxShadow = '0 10px 25px rgba(52, 211, 153, 0.4)';
  
  // Reset after delay
  setTimeout(() => {
    addToCartButton.innerHTML = 'Agregar al Carrito';
    addToCartButton.style.backgroundColor = '';
    addToCartButton.style.transform = '';
    addToCartButton.style.boxShadow = '';
  }, 2000);
}

// Show cart notification
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
      <div class="cart-notification-text">Product added to cart</div>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Update cart count in header
function updateCartCount(animate = false) {
  const cart = JSON.parse(localStorage.getItem('raperCart')) || [];
  const cartCount = document.getElementById('cart-count');
  
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalItems;
    
    if (animate && totalItems > 0) {
      // Add bounce animation
      cartCount.style.animation = 'none';
      setTimeout(() => {
        cartCount.style.animation = 'countBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 10);
    }
  }
} 