/**
 * WhatsApp Manager - Handles WhatsApp integration for Godzilla Bakery
 * Provides status-based messaging with proper formatting
 */

class WhatsAppManager {
  constructor() {
    this.businessPhone = '+201154688628'; // Replace with actual business WhatsApp number
    this.businessName = 'Godzilla Bakery';
  }

  /**
   * Generate WhatsApp message based on order status
   * @param {Object} order - Order object with customer details
   * @param {string} status - Current order status
   * @returns {string} - Formatted WhatsApp message
   */
  generateMessage(order, status) {
    const customerName = order.customer_name;
    const orderNumber = order.order_number;
    const totalAmount = parseFloat(order.total_amount).toFixed(2);

    switch (status) {
      case 'pending':
        return this.getPendingMessage(customerName, orderNumber);

      case 'confirmed':
        return this.getConfirmedMessage(customerName, orderNumber);

      case 'preparing':
        return this.getPreparingMessage(customerName, orderNumber);

      case 'ready':
        return this.getReadyMessage(customerName, orderNumber, totalAmount);

      case 'delivered':
        return this.getDeliveredMessage(customerName, orderNumber);

      default:
        return this.getDefaultMessage(customerName, orderNumber);
    }
  }

  /**
   * Get pending order message
   */
  getPendingMessage(customerName, orderNumber) {
    return `*مرحبا ${customerName}!* 👋\n` +
           `*شكرا لك على طلبك من ${this.businessName}!*\n\n` +
           `✅ *تم استلام طلبك رقم*: #${orderNumber}\n` +
           `🔄 *حالة الطلب*: قيد المراجعة\n\n` +
           `سنقوم بمراجعة طلبك وتأكيده في أقرب وقت ممكن.\n\n` +
           `📞 *للاستفسارات*: يمكنك التواصل معنا في أي وقت\n\n` +
           `*${this.businessName}*\n` +
           `_نخبز بحب لنقدم لك أشهى المخبوزات_`;
  }

  /**
   * Get confirmed order message
   */
  getConfirmedMessage(customerName, orderNumber) {
    return `*مرحبا ${customerName}!* 🎉\n` +
           `*تم تأكيد طلبك من ${this.businessName}!*\n\n` +
           `✅ *رقم الطلب*: #${orderNumber}\n` +
           `🔄 *حالة الطلب*: تم التأكيد - قيد التحضير\n\n` +
           `بدأنا في تحضير طلبك بعناية فائقة!\n\n` +
           `⏰ *سيتم إشعارك عندما يكون الطلب جاهزاً*\n\n` +
           `*${this.businessName}*\n` +
           `_نخبز بحب لنقدم لك أشهى المخبوزات_`;
  }

  /**
   * Get preparing order message
   */
  getPreparingMessage(customerName, orderNumber) {
    return `*مرحبا ${customerName}!* 👨‍🍳\n` +
           `*طلبك في الفرن الآن!*\n\n` +
           `✅ *رقم الطلب*: #${orderNumber}\n` +
           `🔄 *حالة الطلب*: قيد التحضير\n\n` +
           `فريقنا يعمل بكل حب على تحضير طلبك!\n\n` +
           `🔥 *مخبوزات طازجة ولذيذة في طريقها إليك*\n\n` +
           `*${this.businessName}*\n` +
           `_نخبز بحب لنقدم لك أشهى المخبوزات_`;
  }

  /**
   * Get ready order message
   */
  getReadyMessage(customerName, orderNumber, totalAmount) {
    return `*مرحبا ${customerName}!* 🚚\n` +
           `*طلبك جاهز للتسليم!*\n\n` +
           `✅ *رقم الطلب*: #${orderNumber}\n` +
           `💰 *المبلغ الإجمالي*: ${totalAmount} جنيه مصري\n` +
           `🔄 *حالة الطلب*: جاهز للتسليم\n\n` +
           `طلبك أصبح جاهزاً وفي انتظارك!\n\n` +
           `📍 *محلنا*: شارع [عنوان المحل]\n` +
           `⏰ *ساعات العمل*: 9 صباحاً - 11 مساءً\n\n` +
           `*${this.businessName}*\n` +
           `_نخبز بحب لنقدم لك أشهى المخبوزات_`;
  }

  /**
   * Get delivered order message
   */
  getDeliveredMessage(customerName, orderNumber) {
    return `*مرحبا ${customerName}!* ✨\n` +
           `*تم تسليم طلبك بنجاح!*\n\n` +
           `✅ *رقم الطلب*: #${orderNumber}\n` +
           `✅ *حالة الطلب*: تم التسليم\n\n` +
           `*شكرا لك على ثقتك بنا!*\n\n` +
           `🌟 *نأمل أن تكون راضياً عن منتجاتنا*\n` +
           `💬 *شاركنا رأيك وتقييمك*\n\n` +
           `📱 *تابعنا على وسائل التواصل الاجتماعي*\n\n` +
           `*${this.businessName}*\n` +
           `_نخبز بحب لنقدم لك أشهى المخبوزات_`;
  }

  /**
   * Get default message for unknown status
   */
  getDefaultMessage(customerName, orderNumber) {
    return `*مرحبا ${customerName}!*\n\n` +
           `*طلبك من ${this.businessName}*\n\n` +
           `رقم الطلب: #${orderNumber}\n\n` +
           `شكرا لك على تواصلك معنا!\n\n` +
           `*${this.businessName}*`;
  }

  /**
   * Generate WhatsApp URL with pre-filled message
   * @param {string} phoneNumber - Customer's phone number
   * @param {string} message - Message to send
   * @returns {string} - WhatsApp URL
   */
  generateWhatsAppURL(phoneNumber, message) {
    // Clean phone number (remove any non-digit characters)
    let cleanPhone = phoneNumber.replace(/\D/g, '');

    // Ensure Egyptian phone number format (+20)
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '20' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('20')) {
      // Already in correct format
    } else if (!cleanPhone.startsWith('+')) {
      cleanPhone = '20' + cleanPhone;
    }

    // Remove any + prefix for wa.me format
    cleanPhone = cleanPhone.replace('+', '');

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Return WhatsApp URL (wa.me for international format)
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }

  /**
   * Open WhatsApp with message
   * @param {string} phoneNumber - Customer's phone number
   * @param {string} message - Message to send
   */
  openWhatsApp(phoneNumber, message) {
    const url = this.generateWhatsAppURL(phoneNumber, message);
    window.open(url, '_blank');
  }

  /**
   * Get status-specific styling for WhatsApp button
   * @param {string} status - Order status
   * @returns {Object} - CSS classes and styling
   */
  getWhatsAppButtonStyle(status) {
    const baseStyles = {
      background: 'linear-gradient(45deg, #25D366, #128C7E)',
      hover: 'hover:shadow-lg hover:scale-105',
      active: 'active:scale-95'
    };

    return {
      classes: `whatsapp-btn p-2 rounded-full text-white transition-all duration-200 ${baseStyles.hover} ${baseStyles.active}`,
      style: `background: ${baseStyles.background};`
    };
  }
}

// Export for use in other modules
window.WhatsAppManager = WhatsAppManager;