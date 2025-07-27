 // Enhanced JavaScript functionality
 document.addEventListener('DOMContentLoaded', function() {
    // Background Music Setup
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeControl = document.getElementById('volumeControl');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = false;

    // Set initial volume
    backgroundMusic.volume = 0.5;

    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        const iconElement = this.querySelector('i');
        const textElement = this.querySelector('span');
        
        if (isPlaying) {
            backgroundMusic.pause();
            iconElement.className = 'fa-solid fa-play';
            textElement.textContent = 'Play Birds';
            this.classList.remove('playing');
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio autoplay was prevented. User needs to interact first.');
                // Show a subtle notification
                showMusicNotification();
            });
            iconElement.className = 'fa-solid fa-pause';
            textElement.textContent = 'Pause Birds';
            this.classList.add('playing');
            isPlaying = true;
        }
    });

    // Show/hide volume control on music button hover
    musicToggle.addEventListener('mouseenter', function() {
        volumeControl.classList.add('show');
    });

    musicToggle.addEventListener('mouseleave', function() {
        setTimeout(() => {
            if (!volumeControl.matches(':hover')) {
                volumeControl.classList.remove('show');
            }
        }, 300);
    });

    volumeControl.addEventListener('mouseleave', function() {
        this.classList.remove('show');
    });

    // Volume control
    volumeSlider.addEventListener('input', function() {
        backgroundMusic.volume = this.value / 100;
    });

    // Auto-start music after user interaction (respects browser policies)
    let userInteracted = false;
    const startMusicAfterInteraction = () => {
        if (!userInteracted) {
            userInteracted = true;
            // Wait a bit then start music softly
            setTimeout(() => {
                if (!isPlaying) {
                    musicToggle.click();
                }
            }, 3000);
        }
    };

    // Listen for first user interaction
    ['click', 'touchstart', 'keydown'].forEach(event => {
        document.addEventListener(event, startMusicAfterInteraction, { once: true });
    });

    // Music notification function
    function showMusicNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = '🎵 Click the music button to enjoy nature sounds 🎵';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10001;
            font-size: 0.9em;
            animation: slideInRight 0.5s ease;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    // Loading screen
    const loading = document.getElementById('loading');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    setTimeout(() => {
        loading.classList.add('hide');
        setTimeout(() => {
            welcomeMessage.classList.add('show');
            setTimeout(() => {
                welcomeMessage.classList.remove('show');
            }, 3000);
        }, 500);
    }, 2000);

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dynamic background colors with smooth transitions - only for body, not affecting .home section
    const colors = [
        "#edf6f9", 
        "#d8f3dc", 
        "#fefae0", 
        "#faedcd", 
        "#e9f5db"
    ];
    
    let colorIndex = 0;
    setInterval(() => {
        document.body.style.background = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 3000);

    // Nature quotes rotation
    const quotes = [
        "There's a silent poetry in every breeze, a story whispered by trees, and a calm that only the forest can bring. Take a moment. Breathe deeply. Let the earth remind you what peace feels like.",
        "In every walk with nature, one receives far more than they seek. The mountains are calling, and I must go. 🏔️",
        "Look deep into nature, and then you will understand everything better. The earth has music for those who listen. 🎵",
        "Nature does not hurry, yet everything is accomplished. Find peace in the rhythm of the natural world. ⏰",
        "The clearest way into the Universe is through a forest wilderness. Let nature be your teacher. 🌲"
    ];
    
    let quoteIndex = 0;
    const quoteElement = document.getElementById('natureQuote');
    
    setInterval(() => {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteElement.innerHTML = quotes[quoteIndex];
            quoteElement.style.opacity = '1';
        }, 500);
    }, 8000);

    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        const colors = ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.querySelector('.home').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }

    // Create particles periodically
    setInterval(createParticle, 1000);

    // Form validation with enhanced feedback
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    function showFeedback(input, message, isValid) {
        let feedback = input.parentNode.querySelector('.feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback';
            feedback.style.cssText = `
                position: absolute;
                bottom: -25px;
                left: 20px;
                font-size: 0.8em;
                transition: all 0.3s ease;
            `;
            input.parentNode.appendChild(feedback);
        }
        feedback.textContent = message;
        feedback.style.color = isValid ? '#4CAF50' : '#f44336';
        input.style.borderColor = isValid ? '#4CAF50' : '#f44336';
    }

    emailInput.addEventListener('blur', function() {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        showFeedback(this, isValid ? '✓ Valid email' : '✗ Please enter a valid email', isValid);
    });

    passwordInput.addEventListener('input', function() {
        const strength = this.value.length >= 8 ? 'Strong' : this.value.length >= 6 ? 'Medium' : 'Weak';
        const isValid = this.value.length >= 6;
        showFeedback(this, `Password strength: ${strength}`, isValid);
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Entering the Forest... 🌲';
        submitBtn.style.background = 'linear-gradient(45deg, #FF9800, #FFC107)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Welcome to Nature! 🎉';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 2000);
        }, 2000);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.navigateur a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            welcomeMessage.classList.remove('show');
        }
    });

    // Mouse trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        if (mouseTrail.length > 10) {
            mouseTrail.shift();
        }
        
        // Remove old trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    });

    // Performance optimization
    let ticking = false;
    function updateAnimations() {
        // Update any continuous animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    // Console welcome message
    console.log(`
🌿 Welcome to Salma's Nature Website! 🌿
🌱 Built with love for nature enthusiasts
🌲 Enjoy exploring the digital forest!
    `);
});