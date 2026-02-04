/* ============================================
   VEDANTA SPA - MAIN JAVASCRIPT
   ============================================ */

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initSmoothScrolling();
    setActiveNavLink();
});

// Initialize on window load
window.addEventListener('load', function() {
    hidePreloader();
});

/* ============ PRELOADER ============ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Set timeout to hide preloader if page takes too long
    setTimeout(() => hidePreloader(), 5000);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    preloader.classList.add('hidden');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
}

/* ============ MOBILE MENU ============ */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuBtn || !mobileMenu) return;

    // Toggle menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    const navLinks = mobileMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    });
}

/* ============ SMOOTH SCROLLING ============ */
function initSmoothScrolling() {
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
}

/* ============ ACTIVE NAV LINK ============ */
function setActiveNavLink() {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ============ HEADER SHADOW ON SCROLL ============ */
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
});

/* ============ FORM VALIDATION ============ */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!validateEmail(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePhone(data.phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Log form data (replace with actual submission logic)
    console.log('Form Data:', data);
    alert('Thank you for reaching out! We will contact you shortly.');
    form.reset();
}

/* ============ LAZY LOADING ============ */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============ UTILITY FUNCTIONS ============ */

// Debounce function for scroll events
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============ ANALYTICS (Optional) ============ */
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Add your analytics provider here (Google Analytics, Mixpanel, etc.)
}

/* ============ INITIALIZATION ============ */
console.log('Vedanta International Wellness Spa - Website Loaded');
