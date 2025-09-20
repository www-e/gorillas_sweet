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