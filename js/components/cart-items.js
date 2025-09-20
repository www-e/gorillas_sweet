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