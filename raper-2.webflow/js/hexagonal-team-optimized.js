// Team Cards Cyberpunk - RAPER (OPTIMIZED FOR PERFORMANCE)
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.artist-card');
    
    // Reutilizar AudioContext para mejor performance
    let audioContext = null;
    let audioEnabled = true;
    
    // Initialize audio context once
    function initAudioContext() {
        if (!audioContext && audioEnabled) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                audioEnabled = false;
                console.log('Audio context not available');
            }
        }
    }
    
    // Throttling para hover effects
    const HOVER_THROTTLE_MS = 150;
    let lastHoverTime = 0;
    
    // Datos del equipo
    const teamData = {
        'perro-primo': {
            name: 'Perro Primo',
            role: 'Creative Founder',
            bio: 'El visionario creativo detrás del concepto RAPER. Fusiona música, arte y tecnología para crear experiencias únicas.',
            color: '#FFA500'
        },
        'sofia': {
            name: 'Sofia Martinez',
            role: 'Technical Director',
            bio: 'Ingeniera de audio especializada en tecnología de cancelación de ruido activa. Su expertise técnico convierte las visiones en realidad sonora.',
            color: '#FF1493'
        },
        'dexter': {
            name: 'Dexter',
            role: 'Sound Engineer',
            bio: 'Maestro del sonido que perfecciona cada frecuencia para crear experiencias auditivas que trascienden lo convencional.',
            color: '#00FF7F'
        },
        'alex': {
            name: 'Alex Rodriguez',
            role: 'Brand Director',
            bio: 'Estratega de marca que define la identidad luxury y la experiencia exclusiva RAPER. Arquitecto de la imagen que conquista corazones.',
            color: '#8A2BE2'
        },
        'lucas': {
            name: 'Fabio',
            role: 'Productor Musical',
            bio: 'Maestro en la producción musical que da vida a cada beat y melodía con su toque único y profesional.',
            color: '#FFD700'
        }
    };
    
    // Event listeners optimizados para cada card
    teamCards.forEach(card => {
        const memberKey = card.getAttribute('data-member');
        const data = teamData[memberKey];
        
        // Throttled hover effects
        card.addEventListener('mouseenter', throttle(() => {
            if (audioEnabled) {
                playHoverSoundOptimized();
            }
        }, HOVER_THROTTLE_MS));
        
        // Optimized click para efectos de partículas
        card.addEventListener('click', debounce((e) => {
            if (data) {
                createOptimizedParticleEffect(card, data.color);
            }
        }, 200));
        
        // Preload de hover state
        card.addEventListener('mouseenter', () => {
            card.classList.add('processing-hover');
            requestAnimationFrame(() => {
                card.classList.remove('processing-hover');
            });
        });
    });
    
    // Función optimizada para efecto de sonido
    function playHoverSoundOptimized() {
        if (!audioEnabled || !audioContext) return;
        
        try {
            // Verificar si el contexto está suspended (política de autoplay)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Configuración más eficiente
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.06);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.06);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.06);
            
            // Cleanup automático
            oscillator.onended = () => {
                oscillator.disconnect();
                gainNode.disconnect();
            };
            
        } catch (e) {
            // Deshabilitar audio si hay errores
            audioEnabled = false;
        }
    }
    
    // Función optimizada para crear efecto de partículas
    function createOptimizedParticleEffect(element, color) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Reducir número de partículas para mejor performance
        const particleCount = window.innerWidth < 768 ? 4 : 6;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'performance-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 2px;
                height: 2px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                will-change: transform, opacity;
                box-shadow: 0 0 6px ${color};
            `;
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Animación optimizada con requestAnimationFrame
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = 60 + Math.random() * 30;
            const duration = 400 + Math.random() * 200;
            
            // Usar Web Animations API para mejor performance
            const animation = particle.animate([
                {
                    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
                    opacity: 1
                },
                {
                    transform: `translate3d(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px, 0) scale3d(0, 0, 1)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
        
        // Cleanup de seguridad
        setTimeout(() => {
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        }, 1000);
    }
    
    // Utilities para throttling y debouncing
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Intersection Observer optimizado para lazy loading
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // Initialize audio context when section is visible
                if (!audioContext) {
                    initAudioContext();
                }
            }
        });
    }, observerOptions);
    
    // Observar cards para lazy loading
    teamCards.forEach(card => {
        if (card.style.animationPlayState !== undefined) {
            card.style.animationPlayState = 'paused';
        }
        observer.observe(card);
    });
    
    // Performance monitoring
    if (typeof window.performance !== 'undefined') {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name.includes('team') && entry.duration > 16) {
                    console.warn('Team section performance issue:', entry);
                }
            }
        });
        
        try {
            perfObserver.observe({entryTypes: ['measure', 'navigation', 'paint']});
        } catch (e) {
            // PerformanceObserver not supported
        }
    }
    
    // Cleanup al salir de la página
    window.addEventListener('beforeunload', () => {
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
    });
}); 