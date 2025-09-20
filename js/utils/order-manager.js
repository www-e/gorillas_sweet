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