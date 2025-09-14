/* js/components/modal.js - Modal component for dessert details */

class DessertModal {
    constructor() {
        this.isOpen = false;
        this.currentDessert = null;
        this.modal = null;
        this.modalContent = null;
    }

    /**
     * Initialize modal
     */
    init() {
        this.modal = document.getElementById('dessert-modal');
        this.modalContent = document.getElementById('modal-content');
        
        if (!this.modal || !this.modalContent) {
            console.error('Modal elements not found');
            return false;
        }

        this.setupEventListeners();
        return true;
    }

    /**
     * Setup modal event listeners
     */
    setupEventListeners() {
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Open modal with dessert data
     */
    open(dessertData) {
        if (!dessertData || !this.modal || !this.modalContent) return;

        this.currentDessert = dessertData;
        
        // Build modal content
        this.modalContent.innerHTML = this.buildModalContent(dessertData);
        
        // Setup close button
        const closeBtn = this.modalContent.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Show modal
        this.modal.classList.remove('opacity-0', 'pointer-events-none');
        this.modal.classList.add('opacity-100', 'pointer-events-auto');
        this.modalContent.classList.remove('scale-95');
        this.modalContent.classList.add('scale-100');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus management
        if (closeBtn) closeBtn.focus();
    }

    /**
     * Close modal
     */
    close() {
        if (!this.modal || !this.modalContent) return;

        this.modal.classList.add('opacity-0', 'pointer-events-none');
        this.modal.classList.remove('opacity-100', 'pointer-events-auto');
        this.modalContent.classList.add('scale-95');
        this.modalContent.classList.remove('scale-100');

        // Restore body scroll
        document.body.style.overflow = '';
        this.isOpen = false;
        this.currentDessert = null;
    }

    /**
     * Build modal content HTML
     */
    buildModalContent(dessert) {
        const ingredientsList = dessert.ingredients.map(ingredient => 
            `<span class="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mr-2 mb-2">${ingredient}</span>`
        ).join('');

        return `
            <div class="p-6 sm:p-8">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center space-x-4">
                        <img src="${dessert.image}" alt="${dessert.flavor}" 
                             class="w-16 h-16 object-contain rounded-xl shadow-md">
                        <div>
                            <h2 class="text-2xl sm:text-3xl font-bold transition-colors duration-300" 
                                style="color: var(--text-secondary, #6D2E4D);">
                                ${dessert.flavor}
                            </h2>
                            <div class="flex items-center space-x-4 mt-2">
                                <span class="text-xl sm:text-2xl font-bold transition-colors duration-300" 
                                      style="color: var(--text-primary, #8C3A63);">
                                    ${dessert.price}
                                </span>
                                <span class="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                                    ${dessert.category}
                                </span>
                                <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                    ${dessert.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button class="modal-close-btn w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" 
                            aria-label="Close modal">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Description -->
                <div class="mb-6">
                    <p class="text-gray-600 leading-relaxed text-base sm:text-lg">
                        ${dessert.description}
                    </p>
                </div>

                <!-- Nutrition Facts (FDA Style) -->
                <div class="bg-white border-2 border-black mb-6 max-w-sm">
                    <div class="bg-black text-white p-2">
                        <h3 class="text-lg font-bold">Nutrition Facts</h3>
                        <p class="text-sm">Per serving</p>
                    </div>
                    <div class="p-3 space-y-2 text-sm">
                        <div class="flex justify-between border-b border-gray-300 pb-1">
                            <span class="font-semibold">Calories</span>
                            <span class="font-bold">${dessert.nutritionFacts.calories}</span>
                        </div>
                        <div class="space-y-1">
                            <div class="flex justify-between">
                                <span>Total Fat</span>
                                <span>${dessert.nutritionFacts.fat}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Total Carbohydrates</span>
                                <span>${dessert.nutritionFacts.carbs}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Protein</span>
                                <span>${dessert.nutritionFacts.protein}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Total Sugars</span>
                                <span>${dessert.nutritionFacts.sugar}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Dietary Fiber</span>
                                <span>${dessert.nutritionFacts.fiber}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ingredients -->
                <div class="mb-6">
                    <h4 class="text-lg font-bold mb-3 transition-colors duration-300"
                        style="color: var(--text-secondary, #6D2E4D);">
                        Ingredients
                    </h4>
                    <div class="ingredients-list">
                        ${ingredientsList}
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button class="w-full sm:w-auto font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-white shadow-lg hover:-translate-y-1"
                            style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
                        Add to Cart - ${dessert.price}
                    </button>
                    <button class="w-full sm:w-auto border-2 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:-translate-y-1"
                            style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);">
                        Save Recipe
                    </button>
                </div>
            </div>
        `;
    }
}

// Create global instance
window.DessertModal = new DessertModal();
