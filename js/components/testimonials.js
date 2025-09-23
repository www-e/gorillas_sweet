/* js/components/testimonials.js - Testimonials carousel component */

class TestimonialsManager {
    constructor() {
        this.isInitialized = false;
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.autoSlideInterval = null;
        this.slideDuration = 5000; // 5 seconds
    }

    /**
     * Initialize testimonials carousel
     */
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Get carousel elements
            this.container = document.querySelector('.testimonials-container');
            this.wrapper = document.querySelector('.testimonials-wrapper');
            this.slides = document.querySelectorAll('.testimonial-slide');
            this.prevButton = document.getElementById('prev-testimonial');
            this.nextButton = document.getElementById('next-testimonial');
            this.dots = document.querySelectorAll('.dot-button');

            if (!this.wrapper || !this.slides.length) {
                console.warn('Testimonials carousel elements not found');
                return false;
            }

            this.totalSlides = this.slides.length;

            // Setup event listeners
            this.setupEventListeners();

            // Start auto sliding
            this.startAutoSlide();

            this.isInitialized = true;
            console.log('Testimonials carousel initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize testimonials carousel:', error);
            return false;
        }
    }

    /**
     * Setup event listeners for carousel controls
     */
    setupEventListeners() {
        // Previous button
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.previous();
            });
        }

        // Next button
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.next();
            });
        }

        // Dot buttons
        if (this.dots.length) {
            this.dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    if (!isNaN(index)) {
                        this.goToSlide(index);
                    }
                });
            });
        }

        // Pause auto slide on hover
        if (this.container) {
            this.container.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            this.container.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        // Handle window visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }

    /**
     * Go to next slide
     */
    next() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    /**
     * Go to previous slide
     */
    previous() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateCarousel();
        }
    }

    /**
     * Update carousel position and indicators
     */
    updateCarousel() {
        // Update slide position
        if (this.wrapper) {
            const translateX = -this.currentSlide * 100;
            this.wrapper.style.transform = `translateX(${translateX}%)`;
        }

        // Update active dot
        if (this.dots.length) {
            this.dots.forEach((dot, index) => {
                if (index === this.currentSlide) {
                    dot.classList.add('active');
                    dot.classList.remove('bg-pink-300');
                    dot.classList.add('bg-pink-500');
                } else {
                    dot.classList.remove('active');
                    dot.classList.remove('bg-pink-500');
                    dot.classList.add('bg-pink-300');
                }
            });
        }
    }

    /**
     * Start automatic sliding
     */
    startAutoSlide() {
        this.stopAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.next();
        }, this.slideDuration);
    }

    /**
     * Stop automatic sliding
     */
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    /**
     * Update testimonials section theme colors
     */
    updateTheme(themeColors) {
        if (!this.isInitialized || !themeColors) return;

        // Update any dynamic elements with theme colors if needed
        // Currently using CSS variables which are handled by theme manager
    }
}

// Make globally available
window.TestimonialsManager = TestimonialsManager;