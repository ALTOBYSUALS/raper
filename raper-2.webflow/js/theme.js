document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    // Asegúrate de que los SVG de los iconos estén en tu HTML o cárgalos aquí
    const sunIcon = themeToggleButton ? themeToggleButton.querySelector('.theme-icon.sun') : null;
    const moonIcon = themeToggleButton ? themeToggleButton.querySelector('.theme-icon.moon') : null;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };

    const toggleTheme = () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    };

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Cargar el tema guardado o usar el predeterminado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Opcional: Detectar la preferencia del sistema operativo
        // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // applyTheme(prefersDark ? 'dark' : 'light');
        applyTheme('light'); // Predeterminado a modo claro si no hay preferencia guardada o del sistema
    }
    
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
}); 