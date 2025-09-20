/* js/pages/cart.js - Cart page main logic */

class CartPage {
  constructor() {
    this.cartManager = null;
    this.cartItemsComponent = null;
  }

  /**
   * Initialize cart page
   */
  async init() {
    try {
      console.log("🚀 Initializing Cart page...");
      
      // Initialize components
      this.initializeComponents();
      
      // Display cart contents
      this.displayCart();
      
      // Setup event listeners
      this.setupEventListeners();
      
      console.log("✅ Cart page initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Cart page:", error);
      this.showError();
    }
  }

  /**
   * Initialize components
   */
  initializeComponents() {
    // Initialize cart manager
    this.cartManager = new CartManager();
    
    // Initialize cart items component
    this.cartItemsComponent = new CartItems();
    this.cartItemsComponent.init(this.cartManager);
  }

  /**
   * Display cart contents
   */
  displayCart() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const emptyCartState = document.getElementById('empty-cart-state');
    const checkoutButton = document.getElementById('checkout-button');
    
    if (!cartItemsContainer || !emptyCartState || !checkoutButton) return;
    
    const cartItems = this.cartManager.getItems();
    
    if (cartItems.length === 0) {
      cartItemsContainer.classList.add('hidden');
      emptyCartState.classList.remove('hidden');
      checkoutButton.classList.add('hidden');
    } else {
      cartItemsContainer.classList.remove('hidden');
      emptyCartState.classList.add('hidden');
      checkoutButton.classList.remove('hidden');
      
      // Render cart items
      this.cartItemsComponent.render(cartItems, cartItemsContainer);
      
      // Update order summary
      this.updateOrderSummary();
    }
  }

  /**
   * Update order summary
   */
  updateOrderSummary() {
    if (!this.cartManager) return;
    
    const subtotalAmount = document.getElementById('subtotal-amount');
    const totalAmount = document.getElementById('total-amount');
    
    const subtotal = this.cartManager.getTotalPrice();
    const total = subtotal; // No delivery fee in this implementation
    
    if (subtotalAmount) subtotalAmount.textContent = subtotal.toFixed(2);
    if (totalAmount) totalAmount.textContent = total.toFixed(2);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
      this.displayCart();
    });
    
    // Listen for item removal
    window.addEventListener('itemRemoved', () => {
      this.displayCart();
    });
    
    // Listen for quantity updates
    window.addEventListener('quantityUpdated', () => {
      this.updateOrderSummary();
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
  const cartPage = new CartPage();
  await cartPage.init();
});