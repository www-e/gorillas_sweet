/* js/pages/checkout.js - Checkout page main logic */

class CheckoutPage {
  constructor() {
    this.cartManager = null;
    this.orderManager = null;
    this.customerFormComponent = null;
    this.orderSummaryComponent = null;
  }

  /**
   * Initialize checkout page
   */
  async init() {
    try {
      console.log("🚀 Initializing Checkout page...");
      
      // Check if cart has items
      this.cartManager = new CartManager();
      const cartItems = this.cartManager.getItems();
      
      if (cartItems.length === 0) {
        // Redirect to menu if cart is empty
        window.location.href = 'menu.html';
        return;
      }
      
      // Initialize components
      this.initializeComponents();
      
      // Display order summary
      this.displayOrderSummary();
      
      // Setup event listeners
      this.setupEventListeners();
      
      console.log("✅ Checkout page initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Checkout page:", error);
      this.showError();
    }
  }

  /**
   * Initialize components
   */
  initializeComponents() {
    // Initialize order manager
    this.orderManager = new SupabaseOrderManager();
    
    // Initialize customer form component
    this.customerFormComponent = new CustomerForm();
    
    // Initialize order summary component
    this.orderSummaryComponent = new OrderSummary();
    this.orderSummaryComponent.init(this.cartManager);
  }

  /**
   * Display order summary
   */
  displayOrderSummary() {
    const orderSummaryItems = document.getElementById('order-summary-items');
    const orderSubtotal = document.getElementById('order-subtotal');
    const orderTotal = document.getElementById('order-total');
    
    if (!orderSummaryItems || !orderSubtotal || !orderTotal) return;
    
    const cartItems = this.cartManager.getItems();
    
    // Render order items
    this.orderSummaryComponent.renderItems(cartItems, orderSummaryItems);
    
    // Update totals
    const subtotal = this.cartManager.getTotalPrice();
    const total = subtotal; // No delivery fee in this implementation
    
    orderSubtotal.textContent = subtotal.toFixed(2);
    orderTotal.textContent = total.toFixed(2);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitOrder();
      });
    }
  }

  /**
   * Submit order
   */
  async submitOrder() {
    try {
      // Get form data
      const customerInfo = this.customerFormComponent.getFormData();
      
      // Validate form data
      if (!this.customerFormComponent.validateForm(customerInfo)) {
        return;
      }
      
      // Get cart items
      const cartItems = this.cartManager.getItems();
      
      // Create order using Supabase
      const order = await this.orderManager.createOrder(customerInfo, cartItems);
      
      // Clear cart
      this.cartManager.clearCart();
      
      // Redirect to confirmation page
      window.location.href = `confirmation.html?orderId=${order.id}`;
      
    } catch (error) {
      console.error("Failed to submit order:", error);
      this.showErrorMessage("Failed to place order. Please try again.");
    }
  }

  /**
   * Show error message
   */
  showErrorMessage(message) {
    // Create or update error message element
    let errorElement = document.getElementById('form-error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'form-error-message';
      errorElement.className = 'mb-6 p-4 rounded-xl text-red-700 bg-red-50 border border-red-200';
      const form = document.getElementById('checkout-form');
      if (form) {
        form.insertBefore(errorElement, form.firstChild);
      }
    }
    
    errorElement.textContent = message;
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
  const checkoutPage = new CheckoutPage();
  await checkoutPage.init();
});