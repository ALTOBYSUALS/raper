// Objeto con las traducciones
const translations = {
  en: {
    // Navigation
    'overview': 'Overview',
    'store': 'Store',
    'about': 'About Us',
    'careers': 'Careers',
    
    // Cart
    'cart-loading': 'Loading cart...',
    'cart-empty': 'Your cart is empty',
    'cart-title': 'Your Cart',
    'cart-total': 'Total:',
    'cart-checkout': 'Proceed to Checkout',
    'cart-clear': 'Clear Cart',
    'cart-added': 'Product added to cart',
    'cart-error': 'Error loading cart. Try again.',
    
    // Product
    'add-to-cart': 'Add to Cart',
    'product-added': '✓ Added to Cart',
    'our-products': 'Our Products',
    'back-to-cart': 'Back to Cart',
    
    // Checkout
    'checkout-title': 'Checkout',
    'your-info': 'Your Information',
    'full-name': 'Full Name',
    'address': 'Address',
    'city': 'City',
    'zip-code': 'ZIP Code',
    'country': 'Country',
    'select-country': 'Select Country',
    'payment-info': 'Payment Information',
    'card-number': 'Card Number',
    'card-expiry': 'Expiry (MM/YY)',
    'card-cvv': 'CVV',
    'place-order': 'Place Order',
    'order-summary': 'Order Summary',
    'subtotal': 'Subtotal:',
    'shipping': 'Shipping:',
    'shipping-calc': 'Calculated at next step'
  },
  es: {
    // Navegación
    'overview': 'Inicio',
    'store': 'Tienda',
    'about': 'Quiénes Somos',
    'careers': 'Trabaja con Nosotros',
    
    // Carrito
    'cart-loading': 'Cargando carrito...',
    'cart-empty': 'Tu carrito está vacío',
    'cart-title': 'Tu Carrito',
    'cart-total': 'Total:',
    'cart-checkout': 'Finalizar Compra',
    'cart-clear': 'Vaciar Carrito',
    'cart-added': '¡Producto agregado al carrito!',
    'cart-error': 'Error al cargar el carrito. Intentá de nuevo.',
    
    // Producto
    'add-to-cart': 'Agregar al Carrito',
    'product-added': '✓ ¡Agregado!',
    'our-products': 'Nuestros Productos',
    'back-to-cart': 'Volver al Carrito',
    
    // Checkout
    'checkout-title': 'Finalizar Compra',
    'your-info': 'Tus Datos',
    'full-name': 'Nombre Completo',
    'address': 'Dirección',
    'city': 'Ciudad',
    'zip-code': 'Código Postal',
    'country': 'País',
    'select-country': 'Seleccionar País',
    'payment-info': 'Información de Pago',
    'card-number': 'Número de Tarjeta',
    'card-expiry': 'Vencimiento (MM/AA)',
    'card-cvv': 'CVV',
    'place-order': 'Realizar Pedido',
    'order-summary': 'Resumen del Pedido',
    'subtotal': 'Subtotal:',
    'shipping': 'Envío:',
    'shipping-calc': 'Se calcula en el siguiente paso'
  }
};

// Idioma actual
let currentLang = localStorage.getItem('raperLang') || 'es';

// Función para cambiar el idioma
function switchLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') return;
  currentLang = lang;
  localStorage.setItem('raperLang', lang);
  translatePage();
}

// Función para traducir la página
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translations[currentLang][key];
      } else {
        element.textContent = translations[currentLang][key];
      }
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  translatePage();
  
  // Agregar el selector de idioma si no existe
  if (!document.querySelector('.language-selector')) {
    const navbar = document.querySelector('.navbar-actions');
    if (navbar) {
      const langSelector = document.createElement('div');
      langSelector.className = 'language-selector';
      langSelector.innerHTML = `
        <button onclick="switchLanguage('es')" class="lang-btn ${currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
        <button onclick="switchLanguage('en')" class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
      `;
      navbar.insertBefore(langSelector, navbar.firstChild);
    }
  }
});

// Exportar para uso en otros archivos
window.switchLanguage = switchLanguage; 