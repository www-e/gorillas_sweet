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
            ${order.delivery_instructions && order.delivery_instructions.trim() !== '' ? `
            <div class="info-item">
              <span class="info-label">Delivery Instructions:</span>
              <span>${order.delivery_instructions}</span>
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