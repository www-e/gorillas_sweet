/* js/pages/confirmation.js - Order confirmation page logic */

class ConfirmationPage {
  constructor() {
    this.orderManager = null;
    this.receiptComponent = null;
    this.printComponent = null;
    this.order = null;
  }

  /**
   * Initialize confirmation page
   */
  async init() {
    try {
      console.log("🚀 Initializing Confirmation page...");
      
      // Get order ID from URL
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId');
      
      if (!orderId) {
        // Redirect to menu if no order ID
        window.location.href = 'menu.html';
        return;
      }
      
      // Initialize components
      this.initializeComponents();
      
      // Load and display order
      await this.loadOrder(orderId);
      
      // Setup event listeners
      this.setupEventListeners();
      
      console.log("✅ Confirmation page initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Confirmation page:", error);
      this.showError();
    }
  }

  /**
   * Initialize components
   */
  initializeComponents() {
    // Initialize order manager
    this.orderManager = new SupabaseOrderManager();
    
    // Initialize receipt component
    this.receiptComponent = new Receipt();
    
    // Initialize print component
    this.printComponent = new PrintReceipt();
  }

  /**
   * Load and display order
   */
  async loadOrder(orderId) {
    this.order = await this.orderManager.getOrderById(orderId);
    
    if (!this.order) {
      // Redirect to menu if order not found
      window.location.href = 'menu.html';
      return;
    }
    
    // Display order information
    this.displayOrderInfo();
    
    // Display order items
    this.displayOrderItems();
    
    // Display order summary
    this.displayOrderSummary();
  }

  /**
   * Display order information
   */
  displayOrderInfo() {
    const orderIdElement = document.getElementById('order-id');
    const orderDateElement = document.getElementById('order-date');
    const customerNameElement = document.getElementById('customer-name');
    const customerPhoneElement = document.getElementById('customer-phone');
    const customerAddressElement = document.getElementById('customer-address');
    const deliveryInstructionsElement = document.getElementById('delivery-instructions');

    if (orderIdElement) orderIdElement.textContent = this.order.id;
    if (orderDateElement) {
      const date = new Date(this.order.timestamp);
      orderDateElement.textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    if (customerNameElement) customerNameElement.textContent = this.order.customer.name;
    if (customerPhoneElement) customerPhoneElement.textContent = this.order.customer.phone;
    if (customerAddressElement) customerAddressElement.textContent = this.order.customer.address;
    if (deliveryInstructionsElement) {
      deliveryInstructionsElement.textContent = this.order.delivery_instructions && this.order.delivery_instructions.trim() !== ''
        ? this.order.delivery_instructions
        : 'None';
    }
  }

  /**
   * Display order items
   */
  displayOrderItems() {
    const receiptItems = document.getElementById('receipt-items');
    
    if (!receiptItems) return;
    
    this.receiptComponent.renderItems(this.order.items, receiptItems);
  }

  /**
   * Display order summary
   */
  displayOrderSummary() {
    const receiptSubtotal = document.getElementById('receipt-subtotal');
    const receiptTotal = document.getElementById('receipt-total');
    
    if (!receiptSubtotal || !receiptTotal) return;
    
    const subtotal = this.order.total;
    const total = subtotal; // No delivery fee in this implementation
    
    receiptSubtotal.textContent = subtotal.toFixed(2);
    receiptTotal.textContent = total.toFixed(2);
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    const printButton = document.getElementById('print-receipt-btn');
    
    if (printButton) {
      printButton.addEventListener('click', () => {
        this.printReceipt();
      });
    }
  }

  /**
   * Print receipt
   */
  printReceipt() {
    if (this.order) {
      this.printComponent.print(this.order);
    }
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
  const confirmationPage = new ConfirmationPage();
  await confirmationPage.init();
});