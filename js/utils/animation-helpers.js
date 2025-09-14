/* js/utils/animation-helpers.js - Animation utility functions */

const AnimationHelpers = {
    /**
     * Staggered animation for gallery cards
     */
    animateGalleryCards() {
        const cards = document.querySelectorAll('.dessert-card');
        cards.forEach((card, index) => {
            const delay = index * 100; // 100ms delay between cards
            
            setTimeout(() => {
                card.classList.remove('opacity-0', 'translate-y-8');
                card.classList.add('opacity-100', 'translate-y-0');
            }, delay);
        });
    },

    /**
     * Intersection Observer for scroll-based animations
     */
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('animate-on-scroll')) {
                        element.classList.add('animate-fade-in');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },

    /**
     * Smooth fade transition between states
     */
    fadeTransition(element, newContent, duration = 300) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;

        setTimeout(() => {
            if (newContent) {
                element.innerHTML = newContent;
            }
            element.style.opacity = '1';
        }, duration / 2);
    },

    /**
     * Add loading state with spinner
     */
    showLoadingState(container, message = 'Loading...') {
        if (!container) return;

        const loadingHTML = `
            <div class="flex flex-col items-center justify-center py-12">
                <div class="animate-spin-slow w-8 h-8 border-4 border-gray-200 rounded-full mb-4"
                     style="border-top-color: var(--text-primary, #8C3A63);"></div>
                <p class="text-gray-500 text-sm">${message}</p>
            </div>
        `;

        container.innerHTML = loadingHTML;
    },

    /**
     * Remove loading state
     */
    hideLoadingState(container, newContent) {
        if (!container) return;

        this.fadeTransition(container, newContent);
    }
};

// Make globally available
window.AnimationHelpers = AnimationHelpers;
