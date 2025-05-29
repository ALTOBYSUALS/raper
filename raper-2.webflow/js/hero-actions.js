// Producto auricular celeste protagonista
const heroProduct = {
  id: 1,
  name: "RAPER Celeste Místico",
  price: 250000,
  image: "https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398980/BANNER3_oixnxb.png",
  description: "Edición Limitada • Cancelación Activa • 25h Batería"
};

// Función específica para agregar producto del hero al carrito
function addHeroToCart() {
  console.log('Agregando producto del hero al carrito...');
  
  // Esperar a que cart.js esté disponible
  if (typeof window.addToCart === 'function') {
    try {
      const success = window.addToCart(heroProduct.id);
      if (success !== false) {
        console.log('✅ Producto del hero agregado exitosamente');
        showHeroSuccessMessage();
        return true;
      }
    } catch (error) {
      console.error('Error con addToCart:', error);
    }
  }
  
  // Fallback: agregar directamente
  console.log('Usando método fallback...');
  return addHeroProductDirectly();
}

// Método directo para agregar producto
function addHeroProductDirectly() {
  try {
    let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
    
    // Buscar si el producto ya existe
    const existingItem = cart.find(item => item.id == heroProduct.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      console.log('Cantidad aumentada:', existingItem.quantity);
    } else {
      cart.push({
        id: heroProduct.id,
        name: heroProduct.name,
        price: heroProduct.price,
        image: heroProduct.image,
        quantity: 1
      });
      console.log('Producto agregado al carrito');
    }
    
    // Guardar en localStorage
    localStorage.setItem('raperCart', JSON.stringify(cart));
    
    // Actualizar contador del carrito
    updateCartCountManually();
    
    // Mostrar notificación
    showHeroSuccessMessage();
    
    console.log('✅ Producto agregado exitosamente:', heroProduct.name);
    return true;
    
  } catch (error) {
    console.error('❌ Error al agregar producto:', error);
    showHeroErrorMessage();
    return false;
  }
}

// Actualizar contador del carrito manualmente
function updateCartCountManually() {
  try {
    const cart = JSON.parse(localStorage.getItem('raperCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    console.log('Contador actualizado:', totalItems);
  } catch (error) {
    console.error('Error actualizando contador:', error);
  }
}

// Mostrar mensaje de éxito con animación
function showHeroSuccessMessage() {
  // Remover notificación anterior si existe
  const existingNotification = document.querySelector('.hero-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Crear nueva notificación
  const notification = document.createElement('div');
  notification.className = 'hero-notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #5fa4ff, #4fd1c5);
    color: #000;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(95, 164, 255, 0.4);
    transform: translateX(300px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;
  
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-size: 18px;">✅</span>
      <div>
        <div style="font-weight: 700;">${heroProduct.name}</div>
        <div style="font-size: 12px; opacity: 0.8;">Agregado al carrito</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
    notification.style.opacity = '1';
  }, 100);
  
  // Animar salida después de 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(300px)';
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 400);
  }, 3000);
}

// Mostrar mensaje de error
function showHeroErrorMessage() {
  alert('❌ Error al agregar el producto al carrito. Por favor, intenta nuevamente.');
}

// Configurar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Hero actions inicializado');
  
  // Actualizar contador al cargar
  setTimeout(updateCartCountManually, 500);
  
  // Verificar el botón del hero
  const heroButton = document.querySelector('.hero-cta-secondary');
  if (heroButton) {
    console.log('✅ Botón del hero encontrado');
    // Cambiar el onclick para usar nuestra función
    heroButton.setAttribute('onclick', 'addHeroToCart()');
  }
});

// Hacer la función global para el onclick del HTML
window.addHeroToCart = addHeroToCart; 