// Team Cards Cyberpunk - RAPER
document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-card');
    
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
        }
    };
    
    // Event listeners para cada card
    teamCards.forEach(card => {
        const memberKey = card.getAttribute('data-member');
        const data = teamData[memberKey];
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            // Efecto de sonido sutil
            playHoverSound();
        });
        
        // Click para efectos de partículas
        card.addEventListener('click', () => {
            createParticleEffect(card, data.color);
        });
    });
    
    // Función para efecto de sonido
    function playHoverSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.08);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.08);
        } catch (e) {
            // Audio context no disponible
        }
    }
    
    // Función para crear efecto de partículas
    function createParticleEffect(element, color) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 3px;
                height: 3px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 0 8px ${color};
            `;
            
            document.body.appendChild(particle);
            
            // Animación de partícula
            const angle = (i / 8) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            const duration = 600 + Math.random() * 300;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Animación de entrada con intersection observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    teamCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}); 