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