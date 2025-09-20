# Cart and Checkout Pages Implementation Plan

## Overview
Detailed technical plan for implementing the Cart and Checkout pages for the Godzilla Bakery website with a receipt-based ordering system.

## Cart Page (`cart.html`)

### Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Cart - Godzilla Bakery</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="assets/images/logo.webp">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com/3.4.3"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;700&display=swap" rel="stylesheet">
</head>

<body class="font-fredoka min-h-screen transition-colors duration-600 ease-in-out" 
      style="background-color: var(--page-bg, #ffe8f4)">
  
  <!-- Header -->
  <header class="flex items-center justify-between p-4 md:p-6 z-10 animate-fade-in">
    <h2 class="text-2xl font-bold transition-colors duration-300" 
        style="color: var(--text-secondary, #6D2E4D);">
      Gorilla Sweet
    </h2>
    <nav class="hidden md:flex items-center gap-8">
      <a href="index.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="home">
        Home
      </a>
      <a href="menu.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="menu">
        Menu
      </a>
      <a href="#about" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="about">
        About
      </a>
      <a href="#contact" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="contact">
        Contact
      </a>
    </nav>
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" 
          style="color: var(--text-secondary, #6D2E4D)">Your Shopping Cart</h1>
    </div>
    
    <!-- Cart Content -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items -->
      <div class="lg:w-2/3">
        <div id="cart-items-container">
          <!-- Cart items will be dynamically inserted here -->
        </div>
        
        <!-- Empty Cart State -->
        <div id="empty-cart-state" class="hidden text-center py-12">
          <div class="text-6xl mb-4">🛒</div>
          <h3 class="text-2xl font-bold mb-2 transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D)">Your Cart is Empty</h3>
          <p class="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet</p>
          <a href="menu.html" 
             class="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
             style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
            Browse Our Menu
          </a>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:w-1/3">
        <div class="bg-white rounded-3xl shadow-lg p-6 sticky top-6">
          <h2 class="text-2xl font-bold mb-6 transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D)">Order Summary</h2>
          
          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP <span id="subtotal-amount">0.00</span>
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Delivery</span>
              <span class="font-medium transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP 0.00
              </span>
            </div>
            <div class="flex justify-between pt-4 border-t border-gray-200">
              <span class="text-lg font-bold transition-colors duration-300" 
                    style="color: var(--text-secondary, #6D2E4D);">
                Total
              </span>
              <span class="text-lg font-bold transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP <span id="total-amount">0.00</span>
              </span>
            </div>
          </div>
          
          <a href="checkout.html" 
             id="checkout-button"
             class="block w-full py-4 text-center font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6)); color: white;">
            Proceed to Checkout
          </a>
          
          <div class="mt-4 text-center">
            <a href="menu.html" class="text-gray-600 hover:underline transition-colors duration-300"
               style="color: var(--text-muted, #bba9b1);">
              ← Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="py-8 text-center">
    <div class="container mx-auto px-4">
      <p class="text-gray-600">
        &copy; 2023 Godzilla Bakery. All rights reserved.
      </p>
    </div>
  </footer>
  
  <!-- JavaScript -->
  <script src="js/utils/cart-manager.js"></script>
  <script src="js/components/cart-items.js"></script>
  <script src="js/pages/cart.js"></script>
</body>
</html>
```

## Cart Page JavaScript (`js/pages/cart.js`)

```javascript
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
```

## Cart Items Component (`js/components/cart-items.js`)

```javascript
/* js/components/cart-items.js - Cart items display component */

class CartItems {
  constructor() {
    this.cartManager = null;
  }

  /**
   * Initialize cart items component
   */
  init(cartManager) {
    this.cartManager = cartManager;
  }

  /**
   * Render cart items
   */
  render(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    items.forEach(item => {
      const cartItem = this.createCartItem(item);
      container.appendChild(cartItem);
    });
  }

  /**
   * Create cart item element
   */
  createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'flex items-center gap-4 p-4 bg-white rounded-2xl shadow mb-4';
    
    cartItem.innerHTML = `
      <div class="w-20 h-20 flex-shrink-0">
        <img src="${item.image}" alt="${item.name}" 
             class="w-full h-full object-contain">
      </div>
      
      <div class="flex-grow">
        <h3 class="font-bold text-lg transition-colors duration-300" 
            style="color: var(--text-secondary, #6D2E4D);">
          ${item.name}
        </h3>
        
        <div class="flex items-center justify-between mt-2">
          <span class="text-xl font-bold transition-colors duration-300" 
                style="color: var(--text-primary, #8C3A63);">
            ${item.price}
          </span>
          
          <div class="flex items-center gap-2">
            <button class="quantity-btn decrease-btn w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                    style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));"
                    data-item-id="${item.id}">
              -
            </button>
            
            <span class="quantity-display w-10 text-center font-medium">
              ${item.quantity}
            </span>
            
            <button class="quantity-btn increase-btn w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                    style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));"
                    data-item-id="${item.id}">
              +
            </button>
          </div>
        </div>
      </div>
      
      <button class="remove-btn w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
              data-item-id="${item.id}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    `;
    
    // Add event listeners
    const decreaseBtn = cartItem.querySelector('.decrease-btn');
    const increaseBtn = cartItem.querySelector('.increase-btn');
    const removeBtn = cartItem.querySelector('.remove-btn');
    
    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        this.updateQuantity(item.id, item.quantity - 1);
      });
    }
    
    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        this.updateQuantity(item.id, item.quantity + 1);
      });
    }
    
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        this.removeItem(item.id);
      });
    }
    
    return cartItem;
  }

  /**
   * Update item quantity
   */
  updateQuantity(itemId, newQuantity) {
    if (this.cartManager && newQuantity > 0) {
      this.cartManager.updateQuantity(itemId, newQuantity);
      window.dispatchEvent(new CustomEvent('quantityUpdated'));
    } else if (newQuantity <= 0) {
      this.removeItem(itemId);
    }
  }

  /**
   * Remove item from cart
   */
  removeItem(itemId) {
    if (this.cartManager) {
      this.cartManager.removeItem(itemId);
      window.dispatchEvent(new CustomEvent('itemRemoved'));
    }
  }
}
```

## Checkout Page (`checkout.html`)

### Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout - Godzilla Bakery</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="assets/images/logo.webp">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com/3.4.3"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;700&display=swap" rel="stylesheet">
</head>

<body class="font-fredoka min-h-screen transition-colors duration-600 ease-in-out" 
      style="background-color: var(--page-bg, #ffe8f4)">
  
  <!-- Header -->
  <header class="flex items-center justify-between p-4 md:p-6 z-10 animate-fade-in">
    <h2 class="text-2xl font-bold transition-colors duration-300" 
        style="color: var(--text-secondary, #6D2E4D);">
      Gorilla Sweet
    </h2>
    <nav class="hidden md:flex items-center gap-8">
      <a href="index.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="home">
        Home
      </a>
      <a href="menu.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="menu">
        Menu
      </a>
      <a href="#about" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="about">
        About
      </a>
      <a href="#contact" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="contact">
        Contact
      </a>
    </nav>
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    <!-- Page Title -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" 
          style="color: var(--text-secondary, #6D2E4D)">Checkout</h1>
    </div>
    
    <!-- Checkout Form -->
    <div class="max-w-4xl mx-auto">
      <form id="checkout-form" class="bg-white rounded-3xl shadow-lg p-6 md:p-8">
        <!-- Customer Information -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-6 transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D)">Customer Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 mb-2 font-medium">Full Name *</label>
              <input type="text" 
                     id="customer-name"
                     name="customerName"
                     required
                     class="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                     style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                     placeholder="Enter your full name">
            </div>
            
            <div>
              <label class="block text-gray-700 mb-2 font-medium">Phone Number *</label>
              <input type="tel" 
                     id="customer-phone"
                     name="customerPhone"
                     required
                     class="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                     style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                     placeholder="Enter your phone number">
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 mb-2 font-medium">Delivery Address *</label>
              <textarea id="delivery-address"
                        name="deliveryAddress"
                        rows="3"
                        required
                        class="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                        style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                        placeholder="Enter your full delivery address"></textarea>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-gray-700 mb-2 font-medium">Delivery Instructions (Optional)</label>
              <textarea id="delivery-instructions"
                        name="deliveryInstructions"
                        rows="2"
                        class="w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                        style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                        placeholder="Any special delivery instructions"></textarea>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-6 transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D)">Order Summary</h2>
          
          <div id="order-summary-items" class="space-y-4 mb-6">
            <!-- Order items will be dynamically inserted here -->
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP <span id="order-subtotal">0.00</span>
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Delivery</span>
              <span class="font-medium transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP 0.00
              </span>
            </div>
            <div class="flex justify-between pt-3 border-t border-gray-200">
              <span class="text-lg font-bold transition-colors duration-300" 
                    style="color: var(--text-secondary, #6D2E4D);">
                Total
              </span>
              <span class="text-lg font-bold transition-colors duration-300" 
                    style="color: var(--text-primary, #8C3A63);">
                EGP <span id="order-total">0.00</span>
              </span>
            </div>
          </div>
        </div>
        
        <!-- Terms and Conditions -->
        <div class="mb-8">
          <div class="flex items-start">
            <input type="checkbox" 
                   id="terms-checkbox"
                   required
                   class="mt-1 mr-3 w-5 h-5 text-pink-500 rounded focus:ring-pink-400">
            <label for="terms-checkbox" class="text-gray-700">
              I agree to the <a href="#" class="text-pink-500 hover:underline">Terms and Conditions</a> and <a href="#" class="text-pink-500 hover:underline">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" 
                class="w-full py-4 text-center font-bold rounded-full transition-all duration-300 hover:scale-105"
                style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6)); color: white;">
          Place Order
        </button>
      </form>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="py-8 text-center">
    <div class="container mx-auto px-4">
      <p class="text-gray-600">
        &copy; 2023 Godzilla Bakery. All rights reserved.
      </p>
    </div>
  </footer>
  
  <!-- JavaScript -->
  <script src="js/utils/cart-manager.js"></script>
  <script src="js/utils/order-manager.js"></script>
  <script src="js/components/customer-form.js"></script>
  <script src="js/components/order-summary.js"></script>
  <script src="js/pages/checkout.js"></script>
</body>
</html>
```

## Checkout Page JavaScript (`js/pages/checkout.js`)

```javascript
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
    this.orderManager = new OrderManager();
    
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
      
      // Create order
      const order = this.orderManager.createOrder(customerInfo, cartItems);
      
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
```

## Customer Form Component (`js/components/customer-form.js`)

```javascript
/* js/components/customer-form.js - Customer form validation and management */

class CustomerForm {
  /**
   * Get form data
   */
  getFormData() {
    return {
      name: document.getElementById('customer-name')?.value.trim() || '',
      phone: document.getElementById('customer-phone')?.value.trim() || '',
      address: document.getElementById('delivery-address')?.value.trim() || '',
      instructions: document.getElementById('delivery-instructions')?.value.trim() || ''
    };
  }

  /**
   * Validate form data
   */
  validateForm(data) {
    let isValid = true;
    const errors = [];

    // Validate name
    if (!data.name) {
      errors.push('Please enter your full name');
      isValid = false;
    }

    // Validate phone
    if (!data.phone) {
      errors.push('Please enter your phone number');
      isValid = false;
    } else if (!this.isValidPhone(data.phone)) {
      errors.push('Please enter a valid phone number');
      isValid = false;
    }

    // Validate address
    if (!data.address) {
      errors.push('Please enter your delivery address');
      isValid = false;
    }

    // Display errors if any
    if (!isValid) {
      this.showErrors(errors);
    }

    return isValid;
  }

  /**
   * Validate phone number format
   */
  isValidPhone(phone) {
    // Simple validation for Egyptian phone numbers
    const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  /**
   * Show validation errors
   */
  showErrors(errors) {
    // Remove existing error messages
    this.clearErrors();
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.id = 'validation-errors';
    errorContainer.className = 'mb-6 p-4 rounded-xl text-red-700 bg-red-50 border border-red-200';
    
    const errorList = document.createElement('ul');
    errorList.className = 'list-disc pl-5 space-y-1';
    
    errors.forEach(error => {
      const errorItem = document.createElement('li');
      errorItem.textContent = error;
      errorList.appendChild(errorItem);
    });
    
    errorContainer.appendChild(errorList);
    
    // Insert at the top of the form
    const form = document.getElementById('checkout-form');
    if (form) {
      form.insertBefore(errorContainer, form.firstChild);
    }
  }

  /**
   * Clear validation errors
   */
  clearErrors() {
    const errorContainer = document.getElementById('validation-errors');
    if (errorContainer) {
      errorContainer.remove();
    }
  }
}
```

## Order Summary Component (`js/components/order-summary.js`)

```javascript
/* js/components/order-summary.js - Order summary display component */

class OrderSummary {
  constructor() {
    this.cartManager = null;
  }

  /**
   * Initialize order summary component
   */
  init(cartManager) {
    this.cartManager = cartManager;
  }

  /**
   * Render order items
   */
  renderItems(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    items.forEach(item => {
      const orderItem = this.createOrderItem(item);
      container.appendChild(orderItem);
    });
  }

  /**
   * Create order item element
   */
  createOrderItem(item) {
    const orderItem = document.createElement('div');
    orderItem.className = 'flex justify-between items-center py-3 border-b border-gray-100';
    
    orderItem.innerHTML = `
      <div class="flex items-center">
        <div class="w-12 h-12 mr-4">
          <img src="${item.image}" alt="${item.name}" 
               class="w-full h-full object-contain">
        </div>
        <div>
          <h4 class="font-medium transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D);">
            ${item.name}
          </h4>
          <p class="text-sm text-gray-500">Qty: ${item.quantity}</p>
        </div>
      </div>
      
      <div class="font-bold transition-colors duration-300" 
           style="color: var(--text-primary, #8C3A63);">
        ${item.price}
      </div>
    `;
    
    return orderItem;
  }
}
```

## Order Confirmation Page (`confirmation.html`)

### Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation - Godzilla Bakery</title>
  
  <!-- Favicon -->
  <link rel="icon" type="image/webp" href="assets/images/logo.webp">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com/3.4.3"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;700&display=swap" rel="stylesheet">
</head>

<body class="font-fredoka min-h-screen transition-colors duration-600 ease-in-out" 
      style="background-color: var(--page-bg, #ffe8f4)">
  
  <!-- Header -->
  <header class="flex items-center justify-between p-4 md:p-6 z-10 animate-fade-in">
    <h2 class="text-2xl font-bold transition-colors duration-300" 
        style="color: var(--text-secondary, #6D2E4D);">
      Gorilla Sweet
    </h2>
    <nav class="hidden md:flex items-center gap-8">
      <a href="index.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="home">
        Home
      </a>
      <a href="menu.html" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="menu">
        Menu
      </a>
      <a href="#about" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="about">
        About
      </a>
      <a href="#contact" class="nav-button font-medium relative transition-all duration-300 rounded-full px-4 py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" 
         style="color: var(--text-muted, #bba9b1);" data-page="contact">
        Contact
      </a>
    </nav>
    <div class="flex items-center gap-2">
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
      <span class="w-3 h-3 rounded-full border transition-colors duration-300" 
            style="border-color: var(--btn-ghost-border, #f0e4e9);"></span>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    <!-- Success Message -->
    <div class="text-center mb-12">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" 
          style="color: var(--text-secondary, #6D2E4D)">Order Placed Successfully!</h1>
      
      <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Thank you for your order. We've received your details and will contact you shortly to confirm your delivery.
      </p>
    </div>
    
    <!-- Order Receipt -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <!-- Receipt Header -->
        <div class="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white text-center">
          <h2 class="text-3xl font-bold mb-2">Order Receipt</h2>
          <p class="text-pink-100">Thank you for choosing Godzilla Bakery</p>
        </div>
        
        <!-- Receipt Content -->
        <div class="p-6 md:p-8">
          <!-- Order Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4 transition-colors duration-300" 
                  style="color: var(--text-secondary, #6D2E4D)">Order Details</h3>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Order Number:</span>
                  <span class="font-medium" id="order-id">#GS-000000</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Order Date:</span>
                  <span class="font-medium" id="order-date">January 1, 2023</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Order Status:</span>
                  <span class="font-medium text-green-600">Confirmed</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-bold mb-4 transition-colors duration-300" 
                  style="color: var(--text-secondary, #6D2E4D)">Customer Information</h3>
              
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Name:</span>
                  <span class="font-medium" id="customer-name">-</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Phone:</span>
                  <span class="font-medium" id="customer-phone">-</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Delivery Address:</span>
                  <span class="font-medium text-right" id="customer-address">-</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Order Items -->
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 transition-colors duration-300" 
                style="color: var(--text-secondary, #6D2E4D)">Order Items</h3>
            
            <div id="receipt-items" class="border border-gray-200 rounded-xl overflow-hidden">
              <!-- Order items will be dynamically inserted here -->
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="mb-8">
            <h3 class="text-xl font-bold mb-4 transition-colors duration-300" 
                style="color: var(--text-secondary, #6D2E4D)">Order Summary</h3>
            
            <div class="space-y-3 max-w-xs ml-auto">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium transition-colors duration-300" 
                      style="color: var(--text-primary, #8C3A63);">
                  EGP <span id="receipt-subtotal">0.00</span>
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Delivery</span>
                <span class="font-medium transition-colors duration-300" 
                      style="color: var(--text-primary, #8C3A63);">
                  EGP 0.00
                </span>
              </div>
              <div class="flex justify-between pt-3 border-t border-gray-200">
                <span class="text-lg font-bold transition-colors duration-300" 
                      style="color: var(--text-secondary, #6D2E4D);">
                  Total
                </span>
                <span class="text-lg font-bold transition-colors duration-300" 
                      style="color: var(--text-primary, #8C3A63);">
                  EGP <span id="receipt-total">0.00</span>
                </span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button id="print-receipt-btn"
                    class="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
                    style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
              Print Receipt
            </button>
            
            <a href="menu.html" 
               class="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 text-center"
               style="background: linear-gradient(45deg, #6D2E4D, #8C3A63);">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="py-8 text-center">
    <div class="container mx-auto px-4">
      <p class="text-gray-600">
        &copy; 2023 Godzilla Bakery. All rights reserved.
      </p>
    </div>
  </footer>
  
  <!-- JavaScript -->
  <script src="js/utils/order-manager.js"></script>
  <script src="js/components/receipt.js"></script>
  <script src="js/components/print-receipt.js"></script>
  <script src="js/pages/confirmation.js"></script>
</body>
</html>
```

## Confirmation Page JavaScript (`js/pages/confirmation.js`)

```javascript
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
    this.orderManager = new OrderManager();
    
    // Initialize receipt component
    this.receiptComponent = new Receipt();
    
    // Initialize print component
    this.printComponent = new PrintReceipt();
  }

  /**
   * Load and display order
   */
  async loadOrder(orderId) {
    this.order = this.orderManager.getOrderById(orderId);
    
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
```

## Receipt Component (`js/components/receipt.js`)

```javascript
/* js/components/receipt.js - Receipt display component */

class Receipt {
  /**
   * Render receipt items
   */
  renderItems(items, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    // Create table header
    const header = document.createElement('div');
    header.className = 'grid grid-cols-12 bg-gray-50 p-4 font-bold border-b';
    header.innerHTML = `
      <div class="col-span-6">Item</div>
      <div class="col-span-2 text-center">Qty</div>
      <div class="col-span-2 text-center">Price</div>
      <div class="col-span-2 text-right">Total</div>
    `;
    container.appendChild(header);
    
    // Create table rows
    items.forEach(item => {
      const row = this.createReceiptRow(item);
      container.appendChild(row);
    });
  }

  /**
   * Create receipt row element
   */
  createReceiptRow(item) {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 p-4 border-b';
    
    const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
    const total = price * item.quantity;
    
    row.innerHTML = `
      <div class="col-span-6">
        <div class="font-medium transition-colors duration-300" 
             style="color: var(--text-secondary, #6D2E4D);">
          ${item.name}
        </div>
      </div>
      <div class="col-span-2 text-center">${item.quantity}</div>
      <div class="col-span-2 text-center">${item.price}</div>
      <div class="col-span-2 text-right font-medium transition-colors duration-300" 
           style="color: var(--text-primary, #8C3A63);">
        EGP ${total.toFixed(2)}
      </div>
    `;
    
    return row;
  }
}
```

## Print Receipt Component (`js/components/print-receipt.js`)

```javascript
/* js/components/print-receipt.js - Print receipt functionality */

class PrintReceipt {
  /**
   * Print receipt
   */
  print(order) {
    // Create print window
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow popups to print your receipt');
      return;
    }
    
    // Generate print content
    const printContent = this.generatePrintContent(order);
    
    // Write content to print window
    printWindow.document.write(printContent);
    
    // Close document and print
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }

  /**
   * Generate print content
   */
  generatePrintContent(order) {
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Generate items HTML
    let itemsHtml = '';
    let subtotal = 0;
    
    order.items.forEach(item => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      const total = price * item.quantity;
      subtotal += total;
      
      itemsHtml += `
        <tr>
          <td>${item.name}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-center">${item.price}</td>
          <td class="text-right">EGP ${total.toFixed(2)}</td>
        </tr>
      `;
    });
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Receipt - ${order.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .info-item {
            display: flex;
          }
          .info-label {
            font-weight: bold;
            width: 150px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          .total-row {
            font-weight: bold;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Godzilla Bakery</h1>
          <p>Order Receipt</p>
        </div>
        
        <div class="section">
          <div class="section-title">Order Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Order Number:</span>
              <span>${order.id}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Order Date:</span>
              <span>${formattedDate}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Order Status:</span>
              <span>Confirmed</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Name:</span>
              <span>${order.customer.name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Phone:</span>
              <span>${order.customer.phone}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Delivery Address:</span>
              <span>${order.customer.address}</span>
            </div>
            ${order.customer.instructions ? `
            <div class="info-item">
              <span class="info-label">Instructions:</span>
              <span>${order.customer.instructions}</span>
            </div>
            ` : ''}
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Order Items</div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">Qty</th>
                <th class="text-center">Price</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Order Summary</div>
          <table>
            <tr>
              <td>Subtotal</td>
              <td class="text-right">EGP ${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery</td>
              <td class="text-right">EGP 0.00</td>
            </tr>
            <tr class="total-row">
              <td>Total</td>
              <td class="text-right">EGP ${subtotal.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>Thank you for choosing Godzilla Bakery!</p>
          <p>We'll contact you shortly to confirm your delivery.</p>
        </div>
      </body>
      </html>
    `;
  }
}