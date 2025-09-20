# Menu Page Implementation Plan (Updated)

## Overview
Detailed technical plan for implementing the Menu page as the first new page for the Godzilla Bakery website with a receipt-based ordering system.

## Page Structure (`menu.html`)

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Our Menu - Godzilla Bakery</title>
  
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
  <header-component></header-component>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-8">
    <!-- Page Title -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" 
          style="color: var(--text-secondary, #6D2E4D)">Our Delicious Menu</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Handcrafted desserts made with love and the finest ingredients
      </p>
    </div>
    
    <!-- Filters and Search -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <!-- Search -->
        <div class="w-full md:w-1/3">
          <input type="text" 
                 id="search-input"
                 placeholder="Search desserts..."
                 class="w-full px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                 style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);">
        </div>
        
        <!-- Filters -->
        <div class="flex flex-wrap gap-2">
          <button class="filter-btn px-4 py-2 rounded-full border-2 font-medium transition-all duration-300"
                  style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                  data-category="all">
            All
          </button>
          <button class="filter-btn px-4 py-2 rounded-full border-2 font-medium transition-all duration-300"
                  style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                  data-category="cakes">
            Cakes
          </button>
          <button class="filter-btn px-4 py-2 rounded-full border-2 font-medium transition-all duration-300"
                  style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                  data-category="cookies">
            Cookies & Tarts
          </button>
          <button class="filter-btn px-4 py-2 rounded-full border-2 font-medium transition-all duration-300"
                  style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);"
                  data-category="seasonal">
            Seasonal
          </button>
        </div>
      </div>
      
      <!-- Sorting -->
      <div class="flex justify-end">
        <select id="sort-select" 
                class="px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
                style="border-color: var(--btn-ghost-border, #f0e4e9); color: var(--text-secondary, #6D2E4D);">
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
    </div>
    
    <!-- Product Grid -->
    <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Product cards will be dynamically inserted here -->
    </div>
    
    <!-- Empty State -->
    <div id="empty-state" class="hidden text-center py-12">
      <div class="text-6xl mb-4">🧁</div>
      <h3 class="text-2xl font-bold mb-2 transition-colors duration-300" 
          style="color: var(--text-secondary, #6D2E4D)">No Desserts Found</h3>
      <p class="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
      <button id="reset-filters" 
              class="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
              style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
        Reset Filters
      </button>
    </div>
    
    <!-- Cart Summary (Sticky on mobile) -->
    <div id="cart-summary" class="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t border-gray-200 md:hidden transition-transform duration-300 transform translate-y-full">
      <div class="flex justify-between items-center">
        <div>
          <span class="font-bold transition-colors duration-300" 
                style="color: var(--text-secondary, #6D2E4D);">
            <span id="cart-count-mobile">0</span> items
          </span>
          <div class="font-bold text-lg transition-colors duration-300" 
               style="color: var(--text-primary, #8C3A63);">
            EGP <span id="cart-total-mobile">0</span>
          </div>
        </div>
        <a href="cart.html" 
           class="px-6 py-3 rounded-full font-bold text-white transition-all duration-300 hover:scale-105"
           style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6));">
          View Cart
        </a>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer-component></footer-component>
  
  <!-- Toast Notification -->
  <div id="toast" class="fixed bottom-4 right-4 px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-20 opacity-0"
       style="background-color: var(--hero-card-bg, #fff6fa); border: 1px solid var(--btn-ghost-border, #f0e4e9);">
    <div class="flex items-center">
      <span class="mr-2 text-green-500">✓</span>
      <span id="toast-message" class="font-medium transition-colors duration-300" 
            style="color: var(--text-secondary, #6D2E4D)"></span>
    </div>
  </div>
  
  <!-- JavaScript -->
  <script src="js/config/dessert-data.js"></script>
  <script src="js/components/header.js"></script>
  <script src="js/components/footer.js"></script>
  <script src="js/components/product-filter.js"></script>
  <script src="js/components/product-grid.js"></script>
  <script src="js/utils/cart-manager.js"></script>
  <script src="js/pages/menu.js"></script>
</body>
</html>
```

## JavaScript Implementation

### Main Menu Page Logic (`js/pages/menu.js`)
```javascript
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
      
      // Update cart summary
      this.updateCartSummary();
      
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
    
    // Listen for cart changes
    if (this.cartManager) {
      // Update cart summary when cart changes
      const updateSummary = () => this.updateCartSummary();
      // We'll call this whenever cart changes in the grid component
    }
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
```

## Component Implementation

### Product Filter Component (`js/components/product-filter.js`)
```javascript
/* js/components/product-filter.js - Product filtering and sorting functionality */

class ProductFilter {
  constructor() {
    this.products = [];
    this.filterCallbacks = [];
    this.searchCallbacks = [];
    this.sortCallbacks = [];
    this.currentCategory = 'all';
    this.currentSearch = '';
    this.currentSort = 'name';
  }

  /**
   * Initialize filter component
   */
  init(products) {
    this.products = products || [];
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.setCategory(e.target.dataset.category);
      });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        // Debounce search input
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.setSearch(e.target.value);
        }, 300);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.setSort(e.target.value);
      });
    }
  }

  /**
   * Set current category filter
   */
  setCategory(category) {
    this.currentCategory = category;
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('font-bold');
        btn.style.backgroundColor = 'var(--hero-card-bg, #fff6fa)';
      } else {
        btn.classList.remove('font-bold');
        btn.style.backgroundColor = '';
      }
    });
    
    // Trigger filter change
    this.applyFilters();
  }

  /**
   * Set current search term
   */
  setSearch(searchTerm) {
    this.currentSearch = searchTerm.toLowerCase();
    this.applyFilters();
  }

  /**
   * Set current sort option
   */
  setSort(sortOption) {
    this.currentSort = sortOption;
    this.applyFilters();
  }

  /**
   * Apply all filters
   */
  applyFilters() {
    let filtered = [...this.products];
    
    // Apply category filter
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(product => {
        const category = product.category.toLowerCase();
        switch (this.currentCategory) {
          case 'cakes':
            return category.includes('cake') || category.includes('cheesecake');
          case 'cookies':
            return category.includes('cookie') || category.includes('tart');
          case 'seasonal':
            return category.includes('seasonal');
          default:
            return true;
        }
      });
    }
    
    // Apply search filter
    if (this.currentSearch) {
      filtered = filtered.filter(product => 
        product.flavor.toLowerCase().includes(this.currentSearch) ||
        product.description.toLowerCase().includes(this.currentSearch)
      );
    }
    
    // Apply sorting
    filtered = this.sortProducts(filtered, this.currentSort);
    
    // Notify listeners
    this.notifyFilterChange(filtered);
  }

  /**
   * Sort products based on sort option
   */
  sortProducts(products, sortOption) {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceB - priceA;
        });
      case 'popularity':
        // For demo, we'll sort by category (premium first)
        return sorted.sort((a, b) => {
          const priority = {
            'Premium': 1,
            'Signature': 2,
            'Popular': 3,
            'Classic': 4,
            'Seasonal': 5,
            'Artisan': 6,
            'Gourmet': 7
          };
          return (priority[a.category] || 99) - (priority[b.category] || 99);
        });
      case 'name':
      default:
        return sorted.sort((a, b) => a.flavor.localeCompare(b.flavor));
    }
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.currentCategory = 'all';
    this.currentSearch = '';
    this.currentSort = 'name';
    
    // Reset UI
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'name';
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.category === 'all') {
        btn.classList.add('font-bold');
        btn.style.backgroundColor = 'var(--hero-card-bg, #fff6fa)';
      } else {
        btn.classList.remove('font-bold');
        btn.style.backgroundColor = '';
      }
    });
    
    this.applyFilters();
  }

  /**
   * Notify filter change listeners
   */
  notifyFilterChange(filteredProducts) {
    this.filterCallbacks.forEach(callback => callback(filteredProducts));
  }

  /**
   * Notify search change listeners
   */
  notifySearchChange(filteredProducts) {
    this.searchCallbacks.forEach(callback => callback(filteredProducts));
  }

  /**
   * Notify sort change listeners
   */
  notifySortChange(sortedProducts) {
    this.sortCallbacks.forEach(callback => callback(sortedProducts));
  }

  /**
   * Register filter change callback
   */
  onFilterChange(callback) {
    this.filterCallbacks.push(callback);
  }

  /**
   * Register search change callback
   */
  onSearchChange(callback) {
    this.searchCallbacks.push(callback);
  }

  /**
   * Register sort change callback
   */
  onSortChange(callback) {
    this.sortCallbacks.push(callback);
  }
}
```

### Product Grid Component (`js/components/product-grid.js`)
```javascript
/* js/components/product-grid.js - Product grid display component */

class ProductGrid {
  constructor() {
    this.cartManager = null;
  }

  /**
   * Initialize product grid component
   */
  init(cartManager) {
    this.cartManager = cartManager;
  }

  /**
   * Render product grid
   */
  render(products, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
      const productCard = this.createProductCard(product);
      container.appendChild(productCard);
    });
  }

  /**
   * Create product card element
   */
  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500';
    
    // Category colors mapping
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
      <div class="p-6">
        <div class="relative mb-4">
          <div class="dessert-card-bg w-full p-4 rounded-2xl transition-colors duration-500"
               style="background-color: var(--hero-card-bg, #fff6fa);">
            <img src="${product.image}" alt="${product.flavor}" 
                 class="w-full h-48 object-contain drop-shadow-lg transition-transform duration-500 hover:scale-110">
          </div>
          <div class="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[product.category] || 'text-gray-600 bg-gray-100'}">
            ${product.category}
          </div>
        </div>
        
        <div class="text-center">
          <h3 class="text-xl font-bold mb-2 transition-colors duration-300" 
              style="color: var(--text-secondary, #6D2E4D);">
            ${product.flavor}
          </h3>
          <p class="text-gray-500 text-sm mb-4 leading-relaxed h-12 overflow-hidden">
            ${product.description}
          </p>
          
          <div class="flex items-center justify-between mb-4">
            <span class="text-2xl font-bold transition-colors duration-300" 
                  style="color: var(--text-primary, #8C3A63);">
              ${product.price}
            </span>
          </div>
          
          <button class="add-to-cart-btn w-full py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
                  style="background: linear-gradient(45deg, var(--btn-gradient-from, #C75B8F), var(--btn-gradient-to, #e08bb6)); color: white;"
                  data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to the add to cart button
    const addButton = card.querySelector('.add-to-cart-btn');
    if (addButton) {
      addButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.addToCart(product);
      });
    }
    
    return card;
  }

  /**
   * Add product to cart
   */
  addToCart(product) {
    if (this.cartManager) {
      this.cartManager.addItem({
        id: product.id,
        name: product.flavor,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      
      // Show toast notification
      this.showToast(`${product.flavor} added to cart!`);
      
      // Notify menu page to update cart summary
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }

  /**
   * Show toast notification
   */
  showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      
      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }
  }
}
```

### Cart Manager Utility (`js/utils/cart-manager.js`)
```javascript
/* js/utils/cart-manager.js - Cart state management utility */

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.updateCartIcon();
  }

  /**
   * Load cart from localStorage
   */
  loadCart() {
    try {
      const savedCart = localStorage.getItem('gorillaSweetCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  }

  /**
   * Save cart to localStorage
   */
  saveCart() {
    try {
      localStorage.setItem('gorillaSweetCart', JSON.stringify(this.cart));
      this.updateCartIcon();
      // Dispatch event for cart updates
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }

  /**
   * Add item to cart
   */
  addItem(item) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.cart.push({
        ...item,
        quantity: item.quantity || 1
      });
    }
    
    this.saveCart();
  }

  /**
   * Remove item from cart
   */
  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
      }
    }
  }

  /**
   * Get cart total items
   */
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total price
   */
  getTotalPrice() {
    return this.cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  }

  /**
   * Get cart items
   */
  getItems() {
    return [...this.cart];
  }

  /**
   * Clear cart
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  /**
   * Update cart icon with item count
   */
  updateCartIcon() {
    const cartIcons = document.querySelectorAll('.cart-count');
    const totalItems = this.getTotalItems();
    
    cartIcons.forEach(icon => {
      if (totalItems > 0) {
        icon.textContent = totalItems;
        icon.classList.remove('hidden');
      } else {
        icon.classList.add('hidden');
      }
    });
  }
}
```

## Order Manager Utility (`js/utils/order-manager.js`)
```javascript
/* js/utils/order-manager.js - Order processing and storage utility */

class OrderManager {
  constructor() {
    this.orders = this.loadOrders();
  }

  /**
   * Load orders from localStorage
   */
  loadOrders() {
    try {
      const savedOrders = localStorage.getItem('gorillaSweetOrders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Failed to load orders from localStorage:', error);
      return [];
    }
  }

  /**
   * Save orders to localStorage
   */
  saveOrders() {
    try {
      localStorage.setItem('gorillaSweetOrders', JSON.stringify(this.orders));
    } catch (error) {
      console.error('Failed to save orders to localStorage:', error);
    }
  }

  /**
   * Create a new order
   */
  createOrder(customerInfo, cartItems) {
    const order = {
      id: this.generateOrderId(),
      timestamp: new Date().toISOString(),
      customer: customerInfo,
      items: cartItems,
      total: this.calculateTotal(cartItems),
      status: 'pending'
    };
    
    this.orders.push(order);
    this.saveOrders();
    
    return order;
  }

  /**
   * Generate a unique order ID
   */
  generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `GS-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Calculate total price for order items
   */
  calculateTotal(items) {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  }

  /**
   * Get all orders
   */
  getOrders() {
    return [...this.orders];
  }

  /**
   * Get order by ID
   */
  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  /**
   * Clear all orders (for testing purposes)
   */
  clearOrders() {
    this.orders = [];
    this.saveOrders();
  }
}
```

## Implementation Steps

### 1. Create File Structure
1. Create `menu.html` in the root directory
2. Create `js/pages/menu.js`
3. Create `js/components/product-filter.js`
4. Create `js/components/product-grid.js`
5. Create `js/utils/cart-manager.js`
6. Create `js/utils/order-manager.js`

### 2. Update Navigation
Update the header component to include navigation to the menu page:
- Add a "Menu" link that navigates to `menu.html`
- Ensure the active state is properly managed

### 3. Implement Components
1. Implement the ProductFilter component for filtering functionality
2. Implement the ProductGrid component for displaying products
3. Implement the CartManager utility for cart functionality
4. Implement the OrderManager utility for order processing
5. Implement the main MenuPage class to orchestrate everything

### 4. Styling
Use Tailwind CSS classes exclusively for styling:
- Responsive grid layout for product display
- Consistent color scheme using CSS variables
- Hover effects and transitions for enhanced UX
- Proper spacing and typography
- Mobile-friendly cart summary

### 5. Testing
1. Test filtering functionality
2. Test search functionality
3. Test sorting functionality
4. Test add to cart functionality
5. Test responsive design on different screen sizes
6. Test accessibility features

## Key Features
1. **Responsive Design**: Works on all device sizes
2. **Filtering**: Category-based filtering
3. **Search**: Real-time product search
4. **Sorting**: Multiple sorting options
5. **Cart Integration**: Add products to cart
6. **Toast Notifications**: User feedback for actions
7. **Persistent Cart**: Cart saved in localStorage
8. **Mobile Cart Summary**: Sticky cart summary on mobile
9. **Accessibility**: Keyboard navigation and screen reader support
10. **Order Processing**: Receipt-based ordering system

## Receipt-Based Ordering Flow
1. Customer browses menu and adds items to cart
2. Customer views cart and proceeds to checkout
3. Customer fills out information form (name, phone, delivery location)
4. Customer reviews order summary and submits
5. Customer receives beautiful receipt with all order details
6. Order information is stored locally for reference

This implementation will provide a modern, user-friendly menu page that integrates seamlessly with the existing website design and functionality, while supporting the receipt-based ordering system.