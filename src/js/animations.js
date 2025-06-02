// Enhanced Animation Library for DevOps Portfolio

class AnimationController {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.animationQueue = [];
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupIntersectionObservers();
        this.initializeCounterAnimations();
        this.initializeParallaxEffects();
        this.initializeHoverAnimations();
        this.setupScrollAnimations();
        
        this.isInitialized = true;
    }

    // Enhanced Intersection Observer for entrance animations
    setupIntersectionObservers() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerEntrance(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for entrance animations
        document.querySelectorAll('.animate-on-scroll, .animate').forEach(el => {
            observer.observe(el);
        });

        this.observers.set('entrance', observer);
    }

    // Trigger entrance animations
    triggerEntrance(element) {
        const animationType = element.getAttribute('data-animation') || 'fadeInUp';
        const delay = element.getAttribute('data-delay') || 0;
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animated', animationType);
        }, delay);
    }

    // Animated counters for statistics
    initializeCounterAnimations() {
        const counters = document.querySelectorAll('.counter, .stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Final display with appropriate suffix
                const parent = counter.closest('.stat-item');
                const label = parent ? parent.querySelector('p').textContent : '';
                
                if (label.includes('Years')) {
                    counter.textContent = target + '+';
                } else if (label.includes('Projects')) {
                    counter.textContent = target + '+';
                } else if (label.includes('Uptime')) {
                    counter.textContent = target + '.9%';
                } else {
                    counter.textContent = target;
                }
            }
        };

        updateCounter();
    }

    // Parallax effects for background elements
    initializeParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = this.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 10);

        window.addEventListener('scroll', handleParallax);
    }

    // Enhanced hover animations
    initializeHoverAnimations() {
        // Project cards hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, 'enter');
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, 'leave');
            });
        });

        // Skill tags hover effects
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                this.animateSkillTag(tag, 'enter');
            });
            
            tag.addEventListener('mouseleave', () => {
                this.animateSkillTag(tag, 'leave');
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.animateButton(btn, 'enter');
            });
            
            btn.addEventListener('mouseleave', () => {
                this.animateButton(btn, 'leave');
            });
        });
    }

    animateProjectCard(card, state) {
        if (state === 'enter') {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.2)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }
    }

    animateSkillTag(tag, state) {
        if (state === 'enter') {
            tag.style.transform = 'scale(1.1)';
            tag.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
        } else {
            tag.style.transform = 'scale(1)';
            tag.style.boxShadow = 'none';
        }
    }

    animateButton(btn, state) {
        if (state === 'enter') {
            btn.style.transform = 'translateY(-2px)';
            btn.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.3)';
        } else {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        }
    }

    // Scroll-based animations
    setupScrollAnimations() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');
        
        const handleScroll = this.throttle(() => {
            const scrollTop = window.pageYOffset;
            
            // Header hide/show animation
            if (header && scrollTop > 100) {
                if (scrollTop > lastScrollTop) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            // Progress indicator
            this.updateScrollProgress(scrollTop);
            
            lastScrollTop = scrollTop;
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }

    updateScrollProgress(scrollTop) {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }

    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Stagger animation for lists
    staggerAnimation(elements, animation = 'fadeInUp', delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.classList.add('animated', animation);
            }, index * delay);
        });
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.isInitialized = false;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller
    window.animationController = new AnimationController();
    
    // Add scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #06b6d4, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Setup initial element classes for animations
    const setupAnimationClasses = () => {
        // Add animation classes to specific elements
        document.querySelectorAll('.stat-card').forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation', 'fadeInUp');
            el.setAttribute('data-delay', i * 100);
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
        
        document.querySelectorAll('.project-card').forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation', 'fadeInUp');
            el.setAttribute('data-delay', i * 150);
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
        
        document.querySelectorAll('.skill-tag').forEach((el, i) => {
            el.classList.add('animate-on-scroll');
            el.setAttribute('data-animation', 'fadeInUp');
            el.setAttribute('data-delay', i * 50);
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        // Handle existing .animate elements
        document.querySelectorAll('.animate').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
    };
    
    // Run setup after a brief delay to ensure DOM is ready
    setTimeout(setupAnimationClasses, 100);
});