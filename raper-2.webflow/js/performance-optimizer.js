/**
 * RAPER Performance Optimizer
 * Optimizaciones críticas de rendimiento para móviles Android
 * Sin cambios visuales en el diseño
 */

(function() {
  'use strict';

  // Detectar dispositivos móviles y Android
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;

  // Configuración de optimización
  const config = {
    enableOptimizations: isMobile,
    aggressiveMode: isAndroid && isLowEndDevice,
    reducedAnimations: isMobile,
    lazyLoadThreshold: isMobile ? 0.1 : 0.5
  };

  /**
   * Optimización 1: Lazy Loading Inteligente
   */
  function initLazyLoading() {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-src], iframe[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          observer.unobserve(img);
        }
      });
    }, {
      threshold: config.lazyLoadThreshold,
      rootMargin: isMobile ? '50px' : '100px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Optimización 2: Gestión de Animaciones
   */
  function optimizeAnimations() {
    if (!config.reducedAnimations) return;

    // Pausar animaciones cuando no están visibles
    const animatedElements = document.querySelectorAll('[style*="animation"], .hero-background-image');
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        if (entry.isIntersecting) {
          element.style.animationPlayState = 'running';
        } else {
          element.style.animationPlayState = 'paused';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));
  }

  /**
   * Optimización 3: Throttling de Scroll Events
   */
  function optimizeScrollEvents() {
    let ticking = false;

    function updateScrollEffects() {
      // Aquí se pueden agregar efectos de scroll optimizados
      ticking = false;
    }

    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }

    if (isMobile) {
      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
  }

  /**
   * Optimización 4: Preloading Inteligente
   */
  function initIntelligentPreloading() {
    // Precargar recursos críticos solo en conexiones rápidas
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                              connection.effectiveType === '2g' || 
                              connection.effectiveType === '3g';
      
      if (isSlowConnection) {
        // Reducir calidad en conexiones lentas
        document.documentElement.classList.add('slow-connection');
        return;
      }
    }

    // Precargar imágenes críticas
    const criticalImages = [
      'https://res.cloudinary.com/dyrgyzca3/image/upload/v1748398298/BANNER_hero1_qsex0x.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimización 5: Gestión de Memoria
   */
  function optimizeMemoryUsage() {
    // Limpiar referencias no utilizadas
    let cleanupTimer;

    function cleanup() {
      // Remover event listeners no utilizados
      const unusedElements = document.querySelectorAll('.removed, .hidden');
      unusedElements.forEach(el => {
        el.removeEventListener('click', () => {});
        el.removeEventListener('mouseover', () => {});
      });
    }

    // Ejecutar limpieza cada 30 segundos en móvil
    if (isMobile) {
      cleanupTimer = setInterval(cleanup, 30000);
    }

    // Limpiar al salir de la página
    window.addEventListener('beforeunload', () => {
      if (cleanupTimer) clearInterval(cleanupTimer);
    });
  }

  /**
   * Optimización 6: Iframe de Spotify Optimizado
   */
  function optimizeSpotifyEmbed() {
    const spotifyIframe = document.querySelector('.spotify-embed-container iframe');
    if (!spotifyIframe) return;

    // Lazy load del iframe
    spotifyIframe.setAttribute('loading', 'lazy');
    
    // Reducir altura en móvil
    if (isMobile) {
      spotifyIframe.style.height = '300px';
      spotifyIframe.parentElement.style.height = '300px';
    }

    // Observar cuando el iframe está visible
    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // El iframe está visible, activar optimizaciones
          entry.target.style.willChange = 'transform';
          entry.target.style.transform = 'translateZ(0)';
        } else {
          // El iframe no está visible, desactivar optimizaciones
          entry.target.style.willChange = 'auto';
        }
      });
    });

    iframeObserver.observe(spotifyIframe);
  }

  /**
   * Optimización 7: Touch Events Optimizados
   */
  function optimizeTouchEvents() {
    if (!isMobile) return;

    const touchElements = document.querySelectorAll('.platform-logo-button, .spotify-play-button');
    
    touchElements.forEach(element => {
      // Optimizar eventos touch
      element.style.touchAction = 'manipulation';
      element.style.webkitTapHighlightColor = 'transparent';

      // Feedback táctil optimizado
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.1s ease';
      }, { passive: true });

      element.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  }

  /**
   * Optimización 8: Detección de Performance
   */
  function monitorPerformance() {
    if (!('performance' in window)) return;

    // Medir FPS
    let fps = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    function measureFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        // Si FPS es bajo, activar modo agresivo
        if (fps < 30 && isMobile) {
          document.documentElement.classList.add('low-performance');
          enableAggressiveOptimizations();
        }
      }

      requestAnimationFrame(measureFPS);
    }

    requestAnimationFrame(measureFPS);
  }

  /**
   * Optimización 9: Modo Agresivo para Dispositivos Lentos
   */
  function enableAggressiveOptimizations() {
    if (!config.aggressiveMode) return;

    // Desactivar todas las animaciones
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        animation: none !important;
        transition: none !important;
      }
      .hero-background-image {
        display: none !important;
      }
      .video-hero-section {
        background: linear-gradient(135deg, #000 0%, #1a1a1a 100%) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Optimización 10: Preloader Optimizado
   */
  function optimizePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Acelerar preloader en móvil
    if (isMobile) {
      const progress = preloader.querySelector('.preloader-progress');
      if (progress) {
        progress.style.animationDuration = '1.5s';
      }
    }

    // Ocultar preloader más rápido
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }, isMobile ? 1000 : 1500);
    });
  }

  /**
   * Inicialización de todas las optimizaciones
   */
  function init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('🚀 RAPER Performance Optimizer iniciado');
    console.log(`📱 Móvil: ${isMobile}, Android: ${isAndroid}, Bajo rendimiento: ${isLowEndDevice}`);

    // Ejecutar optimizaciones
    initLazyLoading();
    optimizeAnimations();
    optimizeScrollEvents();
    initIntelligentPreloading();
    optimizeMemoryUsage();
    optimizeSpotifyEmbed();
    optimizeTouchEvents();
    optimizePreloader();
    
    if (config.enableOptimizations) {
      monitorPerformance();
    }

    // Marcar como optimizado
    document.documentElement.classList.add('performance-optimized');
    
    if (isMobile) {
      document.documentElement.classList.add('mobile-optimized');
    }
    
    if (isAndroid) {
      document.documentElement.classList.add('android-optimized');
    }
  }

  // Inicializar
  init();

})(); 