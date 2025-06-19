document.addEventListener('DOMContentLoaded', function() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('raperCart')) || [];
  
  // Update cart count
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.innerText = totalItems;
  }
  
  // Render checkout items
  const checkoutItemsContainer = document.getElementById('checkout-items');
  if (!checkoutItemsContainer) return;
  
  if (cart.length === 0) {
    window.location.href = '/cart.html';
    return;
  }
  
  let checkoutHTML = '';
  let subtotal = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    checkoutHTML += `
      <div class="summary-item">
        <div class="summary-item-name">${item.name}<span class="summary-item-quantity"> × ${item.quantity}</span></div>
        <div class="summary-item-price">$${itemTotal.toFixed(2)}</div>
      </div>
    `;
  });
  
  checkoutItemsContainer.innerHTML = checkoutHTML;
  
  // Update totals
  const subtotalElement = document.getElementById('checkout-subtotal');
  const totalElement = document.getElementById('checkout-total');
  
  if (subtotalElement) subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
  if (totalElement) totalElement.innerText = `$${subtotal.toFixed(2)}`;
});

// Handle place order button click
function placeOrder() {
  // Basic form validation
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const cardNumber = document.getElementById('card-number').value;
  
  if (!name || !email || !address || !cardNumber) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Clear cart and show success message
  localStorage.removeItem('raperCart');
  alert('Thank you for your order! Your purchase has been processed successfully.');
  window.location.href = '/index.html';
} 