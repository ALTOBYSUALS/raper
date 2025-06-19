document.addEventListener('DOMContentLoaded', () => {
    // Aplicar siempre el tema oscuro (sin opción de cambio)
    document.body.classList.add('dark-mode');
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar-sticky');
    const scrollThreshold = 50; // pixels to scroll before applying effect
    
    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    // Initialize navbar state
    updateNavbar();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateNavbar);
    
    // Video Hero Parallax Effect
    const videoHero = document.querySelector('.video-hero-section');
    const heroLogo = document.querySelector('.hero-logo-wrapper');
    const heroVideo = document.querySelector('.hero-background-video');
    
    if (videoHero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const heroHeight = videoHero.offsetHeight;
            
            // Only apply effect when in view
            if (scrollPosition <= heroHeight) {
                // Subtle scale effect on the video
                const scaleValue = 1 + (scrollPosition * 0.0003);
                heroVideo.style.transform = `scale(${scaleValue})`;
                
                // Parallax effect on the logo
                if (heroLogo) {
                    heroLogo.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                    heroLogo.style.opacity = 1 - (scrollPosition / (heroHeight * 0.5));
                }
            }
        });
    }
    
    // Add smooth entrances to various elements
    function addEntranceAnimations() {
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        // Add fade-in-up animation to cart items, product cards, etc.
        function animateElements() {
            const animatableElements = document.querySelectorAll('.product-card, .section-title, .product-details-grid > *, .h2__h2-video, .paragraph-big');
            
            animatableElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('has-animated')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                    element.classList.add('has-animated');
                }
            });
        }
        
        // Set initial animation CSS
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .product-card, .section-title, .product-details-grid > *, .h2__h2-video, .paragraph-big {
                opacity: 0;
            }
        `;
        document.head.appendChild(styleElement);
        
        // Run once on load
        setTimeout(animateElements, 300);
        
        // Run on scroll
        window.addEventListener('scroll', animateElements);
    }
    
    // Initialize animations
    addEntranceAnimations();
}); 