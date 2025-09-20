/* js/components/gallery.js - Gallery component with animations */

class GalleryManager {
    constructor() {
        this.isInitialized = false;
        this.dessertsData = null;
        this.currentModal = null;
    }

    /**
     * Initialize gallery with data
     */
    async init() {
        try {
            // Wait for dessert data to be available
            if (!window.DESSERT_DATA) {
                console.error('DESSERT_DATA not available');
                return false;
            }

            this.dessertsData = window.DESSERT_DATA.getAllDesserts();
            
            // Show loading state
            this.showLoadingState();
            
            // Simulate loading delay for UX
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Build and show gallery
            this.buildGallery();
            this.showGallery();
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('Gallery initialized successfully');
            return true;
            
        } catch (error) {
            console.error('Failed to initialize gallery:', error);
            this.showError();
            return false;
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        const galleryLoading = document.getElementById('gallery-loading');
        if (galleryLoading) {
            galleryLoading.classList.remove('hidden');
        }
    }

    /**
     * Build gallery HTML
     */
    buildGallery() {
        const galleryContainer = document.querySelector('#gallery-content .grid');
        if (!galleryContainer || !this.dessertsData) return;

        // Clear existing content
        galleryContainer.innerHTML = '';

        // Create dessert cards
        this.dessertsData.forEach((dessert, index) => {
            const card = this.createDessertCard(dessert, index);
            galleryContainer.appendChild(card);
        });
    }

    /**
     * Create individual dessert card
     */
    createDessertCard(dessert, index) {
        const card = document.createElement('div');
        card.className = 'dessert-card opacity-0 translate-y-8 bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-500';
        card.dataset.dessertId = dessert.id;
        card.dataset.animationDelay = index * 100;

        const categoryColors = {
            'Premium': 'text-amber-600 bg-amber-100',
            'Signature': 'text-red-600 bg-red-100',
            'Popular': 'text-blue-600 bg-blue-100',
            'Seasonal': 'text-pink-600 bg-pink-100',
            'Classic': 'text-green-600 bg-green-100',
            'Artisan': 'text-orange-600 bg-orange-100',
            'Gourmet': 'text-purple-600 bg-purple-100'
        };

        card.innerHTML = `
            <div class="dessert-image-wrapper relative overflow-hidden">
                <div class="dessert-card-bg w-full p-6 transition-colors duration-500">
                    <img src="${dessert.image}" alt="${dessert.flavor}" 
                         class="h-48 w-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
                         width="200" height="200" loading="lazy">
                </div>
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[dessert.category] || 'text-gray-600 bg-gray-100'}">
                    ${dessert.category}
                </div>
            </div>
            <div class="p-6 text-center">
                <h3 class="text-2xl font-bold mb-2 transition-colors duration-300" 
                    style="color: var(--text-secondary, #6D2E4D);">
                    ${dessert.flavor}
                </h3>
                <p class="text-gray-400 text-sm mb-4 leading-relaxed">
                    ${dessert.description}
                </p>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold transition-colors duration-300" 
                          style="color: var(--text-primary, #8C3A63);">
                        ${dessert.price}
                    </span>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Show gallery with animation
     */
    showGallery() {
        const galleryLoading = document.getElementById('gallery-loading');
        const galleryContent = document.getElementById('gallery-content');

        if (galleryLoading && galleryContent) {
            // Hide loading, show content
            galleryLoading.classList.add('hidden');
            galleryContent.classList.remove('hidden');

            // Animate cards in
            setTimeout(() => {
                if (window.AnimationHelpers) {
                    window.AnimationHelpers.animateGalleryCards();
                }
            }, 100);
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Card click listeners
        const cards = document.querySelectorAll('.dessert-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
            
            // Keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleCardClick(e);
                }
            });
        });
    }

    /**
     * Handle dessert card click
     */
    handleCardClick(event) {
        const card = event.currentTarget;
        const dessertId = card.dataset.dessertId;
        
        if (dessertId && window.DessertModal) {
            const dessertData = window.DESSERT_DATA.getDessertById(dessertId);
            if (dessertData) {
                window.DessertModal.open(dessertData);
            }
        }
    }

    /**
     * Update gallery theme colors
     */
    updateTheme(themeColors) {
        if (!this.isInitialized || !themeColors) return;

        // Update card backgrounds
        const cardBgs = document.querySelectorAll('.dessert-card-bg');
        cardBgs.forEach(bg => {
            bg.style.backgroundColor = themeColors['--hero-card-bg'];
        });

        // Update section title
        const sectionTitle = document.querySelector('#gallery-content h2');
        if (sectionTitle) {
            sectionTitle.style.color = themeColors['--text-secondary'];
        }

        // Update card titles and prices
        const cardTitles = document.querySelectorAll('.dessert-card h3');
        const cardPrices = document.querySelectorAll('.dessert-card .text-2xl.font-bold:not(h3)');
        
        cardTitles.forEach(title => {
            title.style.color = themeColors['--text-secondary'];
        });
        
        cardPrices.forEach(price => {
            price.style.color = themeColors['--text-primary'];
        });
    }

    /**
     * Show error state
     */
    showError() {
        const galleryLoading = document.getElementById('gallery-loading');
        if (galleryLoading) {
            galleryLoading.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-red-500 mb-4">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-700 mb-2">Gallery Temporarily Unavailable</h3>
                    <p class="text-gray-500 mb-6">We're having trouble loading our dessert gallery.</p>
                    <button onclick="location.reload()" 
                            class="px-6 py-3 rounded-full font-bold text-white transition-all"
                            style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Make globally available
window.GalleryManager = GalleryManager;
