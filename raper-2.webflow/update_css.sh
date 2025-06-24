#!/bin/bash

echo "🎨 Actualizando CSS con estilos del reproductor de música RAPER..."

# Create new CSS with music player styles
cat > css/mobile-responsive-fixes.css << 'CSS_EOF'
/* ===== MOBILE RESPONSIVE FIXES - RAPER COMPANY ===== */

/* DESKTOP - Asegurar navegación correcta */
@media (min-width: 769px) {
  .nav-links {
    display: flex !important;
  }
  
  .mobile-menu-toggle {
    display: none !important;
  }
  
  .mobile-menu {
    display: none !important;
  }
}

/* Navegación principal en móvil */
@media (max-width: 768px) {
  .navbar-sticky__wrapper {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    padding: 0 20px !important;
  }
  
  .nav-links {
    display: none !important;
  }
  
  .navbar-actions {
    display: flex !important;
    align-items: center !important;
    gap: 15px !important;
  }
  
  .mobile-menu-toggle {
    display: flex !important;
  }
}

/* Menú móvil mejorado */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 100%;
  max-width: 350px;
  height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
  backdrop-filter: blur(20px);
  z-index: 9999;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 30px 30px;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
  margin-bottom: 40px;
}

.mobile-menu-link {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  padding: 15px 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
}

.mobile-menu-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(95, 164, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.mobile-menu-link:hover::before {
  left: 100%;
}

.mobile-menu-link:hover,
.mobile-menu-link:focus {
  background: rgba(95, 164, 255, 0.2);
  border-color: rgba(95, 164, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(95, 164, 255, 0.3);
  color: #fff;
  text-decoration: none;
}

/* Contacto en menú móvil */
.mobile-menu-contact {
  width: 100%;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 25px;
  display: none;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
}

.flag {
  font-size: 1.6rem;
}

.phone {
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* Hamburguesa mejorada */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  position: relative;
  overflow: hidden;
}

.mobile-menu-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(95, 164, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.mobile-menu-toggle:hover::before {
  opacity: 1;
}

.mobile-menu-toggle:hover {
  background: rgba(95, 164, 255, 0.2);
  border-color: rgba(95, 164, 255, 0.5);
  transform: scale(1.05);
}

.mobile-menu-toggle.active {
  background: rgba(95, 164, 255, 0.3);
  border-color: rgba(95, 164, 255, 0.7);
}

.hamburger-line {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
  background: #5fa4ff;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
  background: #5fa4ff;
}

/* Centrado general para todas las secciones */
@media (max-width: 768px) {
  .container-large {
    padding-left: 5px !important;
    padding-right: 5px !important;
    margin: 0 auto !important;
    max-width: none !important;
    width: 100% !important;
  }
  
  .footer-container {
    max-width: none !important;
    padding: 0 5px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }
  
  .footer-content {
    width: 100% !important;
    max-width: none !important;
  }
  
  .container-medium,
  .container-small {
    padding-left: 20px !important;
    padding-right: 20px !important;
    margin: 0 auto !important;
  }
  
  /* Centrado específico para contenido de páginas */
  .team-grid,
  .careers-grid,
  .store-grid,
  .product-grid {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 20px !important;
  }
  
  /* Headers centrados */
  .section-heading,
  .page-title,
  h1, h2, h3 {
    text-align: center !important;
  }
  
  /* Párrafos centrados */
  .text-center-mobile {
    text-align: center !important;
  }
}

/* Mobile específico */
@media (max-width: 480px) {
  /* Reglas ultra-específicas para forzar el ancho completo */
  .container-large,
  div.container-large,
  section .container-large,
  .page-wrapper .container-large {
    padding-left: 2px !important;
    padding-right: 2px !important;
    max-width: none !important;
    width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  .footer-container,
  div.footer-container,
  section .footer-container {
    max-width: none !important;
    padding: 0 2px !important;
    margin: 0 auto !important;
    width: 100% !important;
  }
  
  .footer-content,
  div.footer-content {
    width: 100% !important;
    max-width: none !important;
    padding: 0 !important;
  }

  /* Regla general para todos los contenedores principales */
  .container,
  [class*="container"] {
    max-width: none !important;
    width: 100% !important;
  }

  .mobile-menu {
    max-width: 100% !important;
    padding: 40px 20px 20px !important;
  }
  
  .mobile-menu-link {
    font-size: 1.6rem !important;
    padding: 12px 16px !important;
  }
  
  .contact-item {
    font-size: 1.2rem !important;
    flex-direction: column !important;
    gap: 5px !important;
  }
  
  .mobile-menu-toggle {
    width: 40px !important;
    height: 40px !important;
  }
  
  .hamburger-line {
    width: 22px !important;
    height: 2.5px !important;
  }
}

/* Overlay para cerrar menú */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Fix para que el cuerpo no haga scroll cuando el menú está abierto */
body.menu-open {
  overflow: auto !important;
}

/* ===== REPRODUCTOR DE MÚSICA RAPER - SOLO MÓVIL ===== */

/* Ocultar en desktop */
.raper-music-widget {
  display: none;
}

.raper-playlists-widget {
  display: none;
}

.raper-music-player {
  display: none;
}

/* Mostrar solo en móvil */
@media (max-width: 768px) {
  .raper-music-player {
    display: block;
    margin: 3rem 1.5rem;
    position: relative;
  }

  /* Header del reproductor */
  .music-player-header {
    margin-bottom: 1.5rem;
  }

  .music-player-title {
    font-size: 3.2rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #5fa4ff 0%, #4fd1c5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0 0 0.5rem 0;
    text-align: left;
    text-shadow: 0 0 30px rgba(95, 164, 255, 0.3);
  }

  .music-player-subtitle p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    font-weight: 400;
    margin: 0;
    line-height: 1.3;
  }

  .music-player-subtitle p:first-child {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.2rem;
  }

  /* Tarjeta principal del reproductor */
  .music-player-card {
    background: linear-gradient(145deg, 
      rgba(139, 69, 19, 0.95) 0%, 
      rgba(160, 82, 45, 0.95) 50%, 
      rgba(139, 69, 19, 0.95) 100%);
    border-radius: 20px;
    padding: 2rem;
    border: 1px solid rgba(95, 164, 255, 0.3);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(15px);
    position: relative;
    overflow: hidden;
  }

  /* Efecto shimmer */
  .music-player-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(95, 164, 255, 0.1), transparent);
    animation: musicPlayerShimmer 8s ease-in-out infinite;
  }

  @keyframes musicPlayerShimmer {
    0%, 100% { left: -100%; }
    50% { left: 100%; }
  }

  /* Cover del álbum con logo RAPER */
  .album-cover-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }

  .album-cover-raper {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #5fa4ff 0%, #4fd1c5 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(95, 164, 255, 0.4);
    position: relative;
    overflow: hidden;
  }

  .album-cover-raper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.1) 100%);
    animation: coverGlow 3s ease-in-out infinite alternate;
  }

  @keyframes coverGlow {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }

  .raper-text {
    color: #000;
    font-weight: 900;
    font-size: 1.4rem;
    letter-spacing: 0.1em;
    position: relative;
    z-index: 2;
  }

  /* Información del álbum */
  .album-info {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }

  .album-title {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    line-height: 1.2;
  }

  .album-artist {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0 0 1.5rem 0;
  }

  /* Botón de Spotify */
  .spotify-save-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .spotify-save-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }

  .spotify-icon {
    width: 18px;
    height: 18px;
    color: #1db954;
  }

  /* Controles de reproducción */
  .player-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    position: relative;
    z-index: 2;
  }

  .control-buttons-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .control-button {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.7);
  }

  .control-button:hover {
    background: rgba(95, 164, 255, 0.2);
    color: #5fa4ff;
    transform: scale(1.05);
  }

  .control-button svg {
    width: 20px;
    height: 20px;
  }

  .main-play-button {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #5fa4ff 0%, #4fd1c5 100%);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(95, 164, 255, 0.4);
    color: #000;
  }

  .main-play-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(95, 164, 255, 0.5);
  }

  .main-play-button svg {
    width: 26px;
    height: 26px;
    margin-left: 3px;
  }

  /* Lista de canciones */
  .track-list {
    position: relative;
    z-index: 2;
  }

  .track-item-player {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .track-item-player:hover {
    background: rgba(95, 164, 255, 0.1);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 8px;
    border-bottom-color: transparent;
  }

  .track-item-player:last-child {
    border-bottom: none;
  }

  .track-number-player {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    font-weight: 500;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .track-info-player {
    flex: 1;
    min-width: 0;
  }

  .track-title-player {
    display: block;
    color: #fff;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-artist-player {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .track-duration-player {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.1rem;
    font-weight: 500;
    flex-shrink: 0;
  }
}

/* Versión compacta para móviles pequeños */
@media (max-width: 480px) {
  .raper-music-player {
    margin: 2rem 1rem;
  }

  .music-player-title {
    font-size: 2.8rem;
  }

  .music-player-card {
    padding: 1.5rem;
  }

  .album-cover-raper {
    width: 100px;
    height: 100px;
  }

  .raper-text {
    font-size: 1.2rem;
  }

  .album-title {
    font-size: 1.8rem;
  }

  .main-play-button {
    width: 52px;
    height: 52px;
  }

  .main-play-button svg {
    width: 22px;
    height: 22px;
  }

  .track-title-player {
    font-size: 1.2rem;
  }
}
CSS_EOF

echo "✅ CSS actualizado con nuevo reproductor de música"
echo "🎵 Usando colores azules de RAPER: #5fa4ff y #4fd1c5"
echo "📱 Optimizado para móvil únicamente"

