/* ==========================================================================
   Theme Management
   ========================================================================== */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

/* ==========================================================================
   Navigation & Scrolling
   ========================================================================== */
// Smooth scrolling for navigation links and scroll hints
document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Handle scroll hints
    document.querySelectorAll('.scroll-hint').forEach(hint => {
        hint.addEventListener('click', () => {
            const currentSection = hint.closest('section');
            const isUpArrow = hint.classList.contains('scroll-hint-up');
            
            if (isUpArrow) {
                // Scroll to top for the "Back to Top" arrow
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Find and scroll to the next section
                const nextSection = currentSection.nextElementSibling;
                if (nextSection && nextSection.tagName === 'SECTION') {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'var(--bg-color)';
        navbar.style.boxShadow = '0 2px 4px var(--shadow-color)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

/* ==========================================================================
   Form Handling
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically handle the form submission
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

/* ==========================================================================
   Scroll Animations
   ========================================================================== */
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .project-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial animation setup
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section, .project-card, .timeline-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initial animation check
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.project-slides');
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize slider
    updateSlider();

    // Previous slide button
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    // Next slide button
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Update slider position and active dot
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Optional: Auto-advance slides
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000); // Change slide every 5 seconds

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Resume auto-advance when mouse leaves
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
}); 
