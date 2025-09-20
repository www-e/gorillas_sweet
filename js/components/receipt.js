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