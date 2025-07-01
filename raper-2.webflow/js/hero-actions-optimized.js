// ===== HERO ACTIONS OPTIMIZADO PARA PERFORMANCE =====
// Versión simplificada sin operaciones costosas

// Información de la empresa RAPER Company
const heroCompany = {
  name: "RAPER Company",
  tagline: "Producimos tu carrera",
  description: "Sello discográfico y productora musical de vanguardia"
};

// Producto auricular celeste protagonista
const heroProduct = {
  id: 1,
  name: "RAPER Celeste Místico",
  price: 250000,
  image: "https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398980/BANNER3_oixnxb.png",
  description: "Edición Limitada • Cancelación Activa • 25h Batería"
};

// Función optimizada para agregar al carrito (sin animaciones costosas)
function addHeroToCart() {
  console.log('Agregando producto del hero al carrito...');
  
  // Usar addToCart si está disponible
  if (typeof window.addToCart === 'function') {
    try {
      const success = window.addToCart(heroProduct.id);
      if (success !== false) {
        console.log('✅ Producto del hero agregado exitosamente');
        showSimpleNotification("✅ Agregado al carrito", "success");
        return true;
      }
    } catch (error) {
      console.error('Error con addToCart:', error);
    }
  }
  
  // Fallback directo sin setTimeout costosos
  return addHeroProductDirectly();
}

// Método directo optimizado
function addHeroProductDirectly() {
  try {
    let cart = JSON.parse(localStorage.getItem('raperCart')) || [];
    
    const existingItem = cart.find(item => item.id == heroProduct.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: heroProduct.id,
        name: heroProduct.name,
        price: heroProduct.price,
        image: heroProduct.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('raperCart', JSON.stringify(cart));
    updateCartCountOptimized();
    showSimpleNotification("✅ Producto agregado", "success");
    
    return true;
    
  } catch (error) {
    console.error('❌ Error al agregar producto:', error);
    showSimpleNotification("❌ Error al agregar", "error");
    return false;
  }
}

// Contador optimizado sin animaciones
function updateCartCountOptimized() {
  try {
    const cart = JSON.parse(localStorage.getItem('raperCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
    
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  } catch (error) {
    console.error('Error actualizando contador:', error);
  }
}

// Notificación simple sin animaciones complejas
function showSimpleNotification(message, type = "success") {
  // Remover notificación anterior
  const existing = document.querySelector('.hero-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'hero-notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#4fd1c5" : "#ff6b6b"};
    color: #000;
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    opacity: 1;
    transform: translateZ(0);
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Remover después de 2 segundos sin animaciones costosas
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 200);
    }
  }, 2000);
}

// Función para mostrar info de empresa (simplificada)
function showCompanyInfo() {
  showSimpleNotification(`🎵 ${heroCompany.name} - ${heroCompany.tagline}`, "success");
}

// Inicialización optimizada
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Hero actions optimizado inicializado');
  
  // Actualizar contador una sola vez
  updateCartCountOptimized();
  
  // Configurar botón sin múltiples verificaciones
  const heroButton = document.querySelector('.hero-cta-secondary');
  if (heroButton) {
    heroButton.onclick = addHeroToCart;
  }
});

// Exponer función global
window.addHeroToCart = addHeroToCart;
window.showCompanyInfo = showCompanyInfo; 