/* ========================================
   SAFARI WEBSITE - INTEGRATED JAVASCRIPT
   Includes: Mobile Menu + AOS (Animate On Scroll)
======================================== */

/* ========================================
   ANIMATE ON SCROLL (AOS) CLASS
======================================== */
class AOS {
    constructor() {
        this.items = [];
        this.offset = 120;
        this.delay = 0;
        this.duration = 400;
        this.easing = 'ease';
        this.once = true;
        this.mirror = false;
        this.init();
    }

    init() {
        this.refresh();
        this.setupEventListeners();
        this.aos();
    }

    refresh() {
        this.items = Array.from(document.querySelectorAll('[data-aos]')).map(element => ({
            element,
            offset: this.getOffset(element),
            triggered: false,
            options: this.getElementOptions(element)
        }));
    }

    getOffset(element) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.pageYOffset;
    }

    getElementOptions(element) {
        return {
            offset: parseInt(element.getAttribute('data-aos-offset')) || this.offset,
            delay: parseInt(element.getAttribute('data-aos-delay')) || this.delay,
            duration: parseInt(element.getAttribute('data-aos-duration')) || this.duration,
            easing: element.getAttribute('data-aos-easing') || this.easing,
            once: element.getAttribute('data-aos-once') !== 'false',
            mirror: element.getAttribute('data-aos-mirror') === 'true'
        };
    }

    setupEventListeners() {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.aos();
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', () => {
            this.refresh();
            this.aos();
        });
    }

    aos() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        const windowBottom = windowTop + windowHeight;

        this.items.forEach(item => {
            const { element, options } = item;
            const elementTop = this.getOffset(element);
            const elementBottom = elementTop + element.offsetHeight;
            const inViewport = (elementBottom >= windowTop + options.offset) &&
                               (elementTop <= windowBottom - options.offset);

            if (inViewport && !item.triggered) {
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, options.delay);
                if (options.once) item.triggered = true;
            } else if (!inViewport && item.triggered && options.mirror && !options.once) {
                element.classList.remove('aos-animate');
                item.triggered = false;
            }
        });
    }

    refreshAOS() {
        this.refresh();
        this.aos();
    }

    refreshHard() {
        this.items = [];
        this.refresh();
    }
}

/* ========================================
   MOBILE MENU FUNCTIONALITY
======================================== */
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector(".hamburger");
        this.mobileMenu = document.querySelector(".mobile-menu");
        this.closeBtn = document.querySelector(".close-btn");
        this.mobileLinks = document.querySelectorAll(".mobile-nav-links a");
        this.init();
    }

    init() {
        if (!this.hamburger || !this.mobileMenu) return;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.hamburger.addEventListener("click", () => this.openMenu());
        if (this.closeBtn) {
            this.closeBtn.addEventListener("click", () => this.closeMenu());
        }
        this.mobileLinks.forEach(link => link.addEventListener("click", () => this.closeMenu()));
        document.addEventListener("click", (e) => {
            if (this.mobileMenu.classList.contains("active") &&
                !this.mobileMenu.contains(e.target) &&
                !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.mobileMenu.classList.contains("active")) {
                this.closeMenu();
            }
        });
    }

    openMenu() {
        this.mobileMenu.classList.add("active");
        this.hamburger.setAttribute("aria-expanded", "true");
        this.hamburger.classList.add("active");
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.mobileMenu.classList.remove("active");
        this.hamburger.setAttribute("aria-expanded", "false");
        this.hamburger.classList.remove("active");
        document.body.style.overflow = '';
    }

    toggle() {
        if (this.mobileMenu.classList.contains("active")) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
}

/* ========================================
   SMOOTH SCROLLING
======================================== */
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }
}

/* ========================================
   SCROLL EFFECTS
======================================== */
class ScrollEffects {
    constructor() {
        this.nav = document.querySelector('nav');
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        if (!this.nav) return;
        window.addEventListener('scroll', () => this.handleNavScroll(), { passive: true });
    }

    handleNavScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
        this.lastScrollY = currentScrollY;
    }
}

/* ========================================
   CARD ANIMATIONS
======================================== */
class CardAnimations {
    constructor() {
        this.cards = document.querySelectorAll('.mini-card, .samburu-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleCardHover(card));
            card.addEventListener('mouseleave', () => this.handleCardLeave(card));
        });
        this.setupParallaxEffect();
    }

    handleCardHover(card) {
        card.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
        card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    handleCardLeave(card) {
        card.style.transform = '';
    }

    setupParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        }, { passive: true });
    }
}

/* ========================================
   INTERSECTION OBSERVER
======================================== */
class IntersectionAnimations {
    constructor() {
        this.observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        this.init();
    }

    init() {
        this.setupCounterAnimations();
        this.setupImageLazyLoading();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        if (counters.length === 0) return;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, this.observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = parseInt(element.dataset.counterDuration) || 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    setupImageLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (lazyImages.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, this.observerOptions);

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ========================================
   MAIN INITIALIZATION
======================================== */
class SafariWebsite {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            this.components.aos = new AOS();
            this.components.mobileMenu = new MobileMenu();
            this.components.smoothScroll = new SmoothScroll();
            this.components.scrollEffects = new ScrollEffects();
            this.components.cardAnimations = new CardAnimations();
            this.components.intersectionAnimations = new IntersectionAnimations();
            window.AOS = this.components.aos;
            setTimeout(() => this.components.aos.refreshAOS(), 100);
        } catch (error) {
            console.error(error);
        }
    }

    refresh() {
        if (this.components.aos) this.components.aos.refreshHard();
    }

    getComponent(name) {
        return this.components[name];
    }
}

window.SafariWebsite = new SafariWebsite();
window.refreshAnimations = () => window.SafariWebsite?.refresh();

/* ========================================
   UTILITY FUNCTIONS
======================================== */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
}

function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
    );
}