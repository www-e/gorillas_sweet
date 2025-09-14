/* js/carousel.js */

function initializeCarousel(slidesData) {
    const slider = document.querySelector('.image-slider');
    const nav = document.querySelector('.slider-nav');
    const root = document.documentElement;

    if (!slider || !nav) {
        console.error("Carousel elements not found. Aborting initialization.");
        return;
    }

    let current = 0;
    let autoSlideInterval;

    function setupCarousel() {
        slidesData.forEach((slide, index) => {
            // Create the slide element with Tailwind classes
            const slideEl = document.createElement('div');
            // These classes handle the position, size, and transition of each slide
            slideEl.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]';
            slideEl.innerHTML = `<img src="${slide.image}" alt="${slide.flavor}" class="w-full h-full object-contain drop-shadow-2xl">`;
            slider.appendChild(slideEl);

            // Create the navigation dot
            const dotEl = document.createElement('div');
            dotEl.className = 'w-2.5 h-2.5 bg-gray-300 rounded-full cursor-pointer transition-colors';
            dotEl.addEventListener('click', () => {
                updateSlide(index);
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(autoSlide, 5000);
            });
            nav.appendChild(dotEl);
        });
    }

    function updateSlide(newIndex) {
        current = newIndex;
        const slides = document.querySelectorAll('.image-slider > div');
        const dots = document.querySelectorAll('.slider-nav > div');
        
        slides.forEach((slide, i) => {
            // Remove all state classes
            slide.classList.remove('opacity-100', 'scale-100', 'z-10', 'opacity-50', 'scale-75', 'blur-sm');

            const prevIndex = (current - 1 + slides.length) % slides.length;
            const nextIndex = (current + 1 + slides.length) % slides.length;
            
            if (i === current) { // Active slide
                slide.classList.add('opacity-100', 'scale-100', 'z-10');
                slide.style.transform = 'translate(-50%, -50%)';
            } else if (i === prevIndex) { // Previous slide
                slide.classList.add('opacity-50', 'scale-75', 'blur-sm');
                slide.style.transform = 'translate(-100%, -50%)';
            } else if (i === nextIndex) { // Next slide
                slide.classList.add('opacity-50', 'scale-75', 'blur-sm');
                slide.style.transform = 'translate(0%, -50%)';
            } else { // Hidden slides
                slide.classList.add('opacity-0', 'scale-75');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.remove('dot-active');
            if(i === current) dot.classList.add('dot-active');
        });

        // Update theme by setting CSS variables
        const activeTheme = slidesData[current].colors;
        for (const [key, value] of Object.entries(activeTheme)) {
            root.style.setProperty(key, value);
        }
        
        // Call any custom update function if defined
        if (window.onCarouselSlideChange) {
            window.onCarouselSlideChange(current, slidesData[current]);
        }
    }
    
    function autoSlide() {
        const nextIndex = (current + 1) % slidesData.length;
        updateSlide(nextIndex);
    }

    setupCarousel();
    updateSlide(0);
    
    autoSlideInterval = setInterval(autoSlide, 5000);
}