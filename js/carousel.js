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
            // Create the slide element with an IMAGE
            const slideEl = document.createElement('div');
            slideEl.classList.add('slide');
            slideEl.innerHTML = `<img src="${slide.image}" alt="${slide.flavor}">`;
            slider.appendChild(slideEl);

            // Create the navigation dot
            const dotEl = document.createElement('div');
            dotEl.classList.add('dot');
            dotEl.addEventListener('click', () => {
                updateSlide(index);
                // Reset the auto-slide timer on manual interaction
                clearInterval(autoSlideInterval);
                autoSlideInterval = setInterval(autoSlide, 5000);
            });
            nav.appendChild(dotEl);
        });
    }

    function updateSlide(newIndex) {
        current = newIndex;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        
        // Loop through all slides to update their class
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next');

            const prevIndex = (current - 1 + slides.length) % slides.length;
            const nextIndex = (current + 1) % slides.length;

            if (i === current) {
                slide.classList.add('active');
            } else if (i === prevIndex) {
                slide.classList.add('prev');
            } else if (i === nextIndex) {
                slide.classList.add('next');
            }
        });

        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));

        // Update theme colors
        const activeTheme = slidesData[current].colors;
        for (const [key, value] of Object.entries(activeTheme)) {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            root.style.setProperty(cssVar, value);
        }
    }
    
    // Function for the automatic slide transition
    function autoSlide() {
        const nextIndex = (current + 1) % slidesData.length;
        updateSlide(nextIndex);
    }

    setupCarousel();
    updateSlide(0); // Set the initial state
    
    // Start the automatic slideshow
    autoSlideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds
}