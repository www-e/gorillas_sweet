/* js/pages/menu.js - Menu page main logic */

class MenuPage {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.filterComponent = null;
    this.gridComponent = null;
    this.cartManager = null;
  }

  /**
   * Initialize menu page
   */
  async init() {
    try {
      console.log("🚀 Initializing Menu page...");
      
      // Load product data
      await this.loadProductData();
      
      // Initialize components
      this.initializeComponents();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Display initial products
      this.displayProducts();
      
      console.log("✅ Menu page initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Menu page:", error);
      this.showError();
    }
  }

  /**
   * Load product data
   */
  async loadProductData() {
    if (window.DESSERT_DATA) {
      this.products = window.DESSERT_DATA.getAllDesserts();
      this.filteredProducts = [...this.products];
    } else {
      throw new Error("DESSERT_DATA not available");
    }
  }

  /**
   * Initialize components
   */
  initializeComponents() {
    // Initialize cart manager
    this.cartManager = new CartManager();
    
    // Initialize filter component
    this.filterComponent = new ProductFilter();
    this.filterComponent.init(this.products);
    
    // Initialize product grid component
    this.gridComponent = new ProductGrid();
    this.gridComponent.init(this.cartManager);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for filter changes
    this.filterComponent.onFilterChange((filteredProducts) => {
      this.filteredProducts = filteredProducts;
      this.displayProducts();
    });
    
    // Listen for search changes
    this.filterComponent.onSearchChange((filteredProducts) => {
      this.filteredProducts = filteredProducts;
      this.displayProducts();
    });
    
    // Listen for sort changes
    this.filterComponent.onSortChange((sortedProducts) => {
      this.filteredProducts = sortedProducts;
      this.displayProducts();
    });
    
    // Reset filters button
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filterComponent.resetFilters();
        this.filteredProducts = [...this.products];
        this.displayProducts();
      });
    }
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
      this.updateCartSummary();
    });
  }

  /**
   * Display products in grid
   */
  displayProducts() {
    const productGrid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!productGrid || !emptyState) return;
    
    if (this.filteredProducts.length === 0) {
      productGrid.classList.add('hidden');
      emptyState.classList.remove('hidden');
    } else {
      productGrid.classList.remove('hidden');
      emptyState.classList.add('hidden');
      this.gridComponent.render(this.filteredProducts, productGrid);
    }
    
    // Update cart summary
    this.updateCartSummary();
  }

  /**
   * Update cart summary in header and mobile view
   */
  updateCartSummary() {
    if (!this.cartManager) return;
    
    const totalItems = this.cartManager.getTotalItems();
    const totalPrice = this.cartManager.getTotalPrice();
    
    // Update mobile cart summary
    const cartCountMobile = document.getElementById('cart-count-mobile');
    const cartTotalMobile = document.getElementById('cart-total-mobile');
    
    if (cartCountMobile) cartCountMobile.textContent = totalItems;
    if (cartTotalMobile) cartTotalMobile.textContent = totalPrice.toFixed(2);
    
    // Show/hide mobile cart summary
    const cartSummary = document.getElementById('cart-summary');
    if (cartSummary) {
      if (totalItems > 0) {
        cartSummary.classList.remove('translate-y-full');
      } else {
        cartSummary.classList.add('translate-y-full');
      }
    }
    
    // Update header cart icon
    const cartIcons = document.querySelectorAll('.cart-count');
    cartIcons.forEach(icon => {
      if (totalItems > 0) {
        icon.textContent = totalItems;
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
    });
  }

  /**
   * Show error state
   */
  showError() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="flex items-center justify-center min-h-screen">
          <div class="text-center">
            <div class="text-red-500 mb-4">
              <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"></path>
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-gray-700 mb-2">Something went wrong</h1>
            <p class="text-gray-500 mb-6">Please refresh the page to try again.</p>
            <button onclick="location.reload()" 
                    class="px-6 py-3 rounded-full font-bold text-white transition-colors"
                    style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
              Refresh Page
            </button>
          </div>
        </div>
      `;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const menuPage = new MenuPage();
  await menuPage.init();
});