/* js/utils/supabase-order-manager.js - Supabase order management utility */

class SupabaseOrderManager {
  constructor() {
    // Initialize Supabase client - Direct credentials for GitHub Pages
    this.supabaseUrl = 'https://rnixgnpiujxcqlxfjdpj.supabase.co';
    this.supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuaXhnbnBpdWp4Y3FseGZqZHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0OTUzNzUsImV4cCI6MjA3NDA3MTM3NX0.hqj8FGb1CZl6IbraZ7iohqVsTEw0ELewBQQNriUHW4Y';
    this.supabase = supabase.createClient(this.supabaseUrl, this.supabaseAnonKey);
  }

  /**
   * Create a new order in Supabase
   */
  async createOrder(customerInfo, cartItems) {
    try {
      // Generate a unique order number (using the same format as the original)
      const orderNumber = this.generateOrderNumber();
      
      // Calculate total
      const total = this.calculateTotal(cartItems);
      
      // Prepare order data
      const orderData = {
        order_number: orderNumber,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        customer_email: customerInfo.email || null,
        items: cartItems, // Store the items as JSON
        total_amount: total,
        status: 'pending'
      };
      
      // Insert order into Supabase
      const { data, error } = await this.supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating order in Supabase:', error);
        throw new Error(`Failed to create order: ${error.message}`);
      }
      
      // Return the created order
      return {
        id: data.id,
        order_number: data.order_number,
        timestamp: data.created_at,
        customer: {
          name: data.customer_name,
          phone: data.customer_phone,
          address: data.customer_address,
          email: data.customer_email
        },
        items: data.items,
        total: parseFloat(data.total_amount),
        status: data.status
      };
    } catch (error) {
      console.error('Error in SupabaseOrderManager.createOrder:', error);
      throw error;
    }
  }

  /**
   * Get order by ID from Supabase
   */
  async getOrderById(orderId) {
    try {
      const { data, error } = await this.supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Record not found
          return null;
        }
        console.error('Error fetching order from Supabase:', error);
        throw new Error(`Failed to fetch order: ${error.message}`);
      }
      
      if (!data) {
        return null;
      }
      
      // Return formatted order
      return {
        id: data.id,
        order_number: data.order_number,
        timestamp: data.created_at,
        customer: {
          name: data.customer_name,
          phone: data.customer_phone,
          address: data.customer_address,
          email: data.customer_email
        },
        items: data.items,
        total: parseFloat(data.total_amount),
        status: data.status
      };
    } catch (error) {
      console.error('Error in SupabaseOrderManager.getOrderById:', error);
      throw error;
    }
  }

  /**
   * Get all orders from Supabase
   */
  async getOrders() {
    try {
      const { data, error } = await this.supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders from Supabase:', error);
        throw new Error(`Failed to fetch orders: ${error.message}`);
      }
      
      // Format orders
      return data.map(order => ({
        id: order.id,
        order_number: order.order_number,
        timestamp: order.created_at,
        customer: {
          name: order.customer_name,
          phone: order.customer_phone,
          address: order.customer_address,
          email: order.customer_email
        },
        items: order.items,
        total: parseFloat(order.total_amount),
        status: order.status
      }));
    } catch (error) {
      console.error('Error in SupabaseOrderManager.getOrders:', error);
      throw error;
    }
  }

  /**
   * Update order status in Supabase
   */
  async updateOrderStatus(orderId, status) {
    try {
      const { error } = await this.supabase
        .from('orders')
        .update({ status: status })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error updating order status in Supabase:', error);
        throw new Error(`Failed to update order status: ${error.message}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error in SupabaseOrderManager.updateOrderStatus:', error);
      throw error;
    }
  }

  /**
   * Generate a unique order number
   */
  generateOrderNumber() {
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
}