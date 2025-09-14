/* js/components/carousel.js - Updated carousel component */

class CarouselManager {
    constructor() {
        this.slider = null;
        this.nav = null;
        this.slidesData = [];
        this.current = 0;
        this.autoSlideInterval = null;
        this.isInitialized = false;
    }

    /**
     * Initialize carousel with data
     */
    init(slidesData) {
        this.slider = document.querySelector('.image-slider');
        this.nav = document.querySelector('.slider-nav');

        if (!this.slider || !this.nav) {
            console.error("Carousel elements not found");
            return false;
        }

        if (!slidesData || slidesData.length === 0) {
            console.error("No slides data provided");
            return false;
        }

        this.slidesData = slidesData;
        this.setupCarousel();
        this.updateSlide(0);
        this.startAutoSlide();
        
        this.isInitialized = true;
        console.log('Carousel initialized successfully');
        return true;
    }

    /**
     * Setup carousel slides and navigation
     */
    setupCarousel() {
        // Clear existing content
        this.slider.innerHTML = '';
        this.nav.innerHTML = '';

        this.slidesData.forEach((slide, index) => {
            // Create slide element
            const slideEl = document.createElement('div');
            slideEl.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-700 ease-out';
            slideEl.innerHTML = `
                <img src="${slide.image}" alt="${slide.flavor}" 
                     class="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500" 
                     loading="lazy">
            `;
            this.slider.appendChild(slideEl);

            // Create navigation dot
            const dotEl = document.createElement('div');
            dotEl.className = 'w-2.5 h-2.5 bg-gray-300 rounded-full cursor-pointer transition-all duration-300 hover:scale-110';
            dotEl.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dotEl.setAttribute('tabindex', '0');
            
            dotEl.addEventListener('click', () => this.goToSlide(index));
            dotEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(index);
                }
            });
            
            this.nav.appendChild(dotEl);
        });
    }

    /**
     * Update slide display
     */
    updateSlide(newIndex) {
        if (newIndex < 0 || newIndex >= this.slidesData.length) return;

        this.current = newIndex;
        const slides = this.slider.querySelectorAll('div');
        const dots = this.nav.querySelectorAll('div');
        
        slides.forEach((slide, i) => {
            // Reset classes
            slide.classList.remove('opacity-100', 'scale-100', 'z-10', 'opacity-50', 'scale-75', 'blur-sm', 'opacity-0');

            const prevIndex = (this.current - 1 + slides.length) % slides.length;
            const nextIndex = (this.current + 1) % slides.length;
            
            if (i === this.current) {
                // Active slide
                slide.classList.add('opacity-100', 'scale-100', 'z-10');
                slide.style.transform = 'translate(-50%, -50%)';
            } else if (i === prevIndex) {
                // Previous slide
                slide.classList.add('opacity-50', 'scale-75', 'blur-sm');
                slide.style.transform = 'translate(-100%, -50%)';
            } else if (i === nextIndex) {
                // Next slide
                slide.classList.add('opacity-50', 'scale-75', 'blur-sm');
                slide.style.transform = 'translate(0%, -50%)';
            } else {
                // Hidden slides
                slide.classList.add('opacity-0', 'scale-75');
            }
        });

        // Update navigation dots
        dots.forEach((dot, i) => {
            if (i === this.current) {
                dot.style.backgroundColor = 'var(--text-primary, #8C3A63)';
                dot.classList.add('scale-125');
            } else {
                dot.style.backgroundColor = '#d1d5db';
                dot.classList.remove('scale-125');
            }
        });

        // Apply theme
        if (window.ThemeManager) {
            const currentSlide = this.slidesData[this.current];
            window.ThemeManager.applyTheme(currentSlide.colors);
            window.ThemeManager.updateHeroTitle(currentSlide.flavor);
            window.ThemeManager.updateGalleryTheme(currentSlide.colors);
        }

        // Call global callback if defined
        if (window.onCarouselSlideChange) {
            window.onCarouselSlideChange(this.current, this.slidesData[this.current]);
        }
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        this.updateSlide(index);
        this.resetAutoSlide();
    }

    /**
     * Go to next slide
     */
    next() {
        const nextIndex = (this.current + 1) % this.slidesData.length;
        this.updateSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    previous() {
        const prevIndex = (this.current - 1 + this.slidesData.length) % this.slidesData.length;
        this.updateSlide(prevIndex);
    }

    /**
     * Start auto slide
     */
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    /**
     * Reset auto slide timer
     */
    resetAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.startAutoSlide();
        }
    }

    /**
     * Stop auto slide
     */
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    /**
     * Destroy carousel
     */
    destroy() {
        this.stopAutoSlide();
        this.isInitialized = false;
        console.log('Carousel destroyed');
    }
}

// Make globally available
window.CarouselManager = CarouselManager;
