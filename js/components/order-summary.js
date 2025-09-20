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