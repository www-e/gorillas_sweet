/* js/components/customer-form.js - Customer form validation and management */

class CustomerForm {
  /**
   * Get form data
   */
  getFormData() {
    return {
      name: document.getElementById('customer-name')?.value.trim() || '',
      phone: document.getElementById('customer-phone')?.value.trim() || '',
      address: document.getElementById('delivery-address')?.value.trim() || '',
      instructions: document.getElementById('delivery-instructions')?.value.trim() || ''
    };
  }

  /**
   * Validate form data
   */
  validateForm(data) {
    let isValid = true;
    const errors = [];

    // Validate name
    if (!data.name) {
      errors.push('Please enter your full name');
      isValid = false;
    }

    // Validate phone
    if (!data.phone) {
      errors.push('Please enter your phone number');
      isValid = false;
    } else if (!this.isValidPhone(data.phone)) {
      errors.push('Phone number must be exactly 11 digits starting with 0 (e.g., 01154688628)');
      isValid = false;
    }

    // Validate address
    if (!data.address) {
      errors.push('Please enter your delivery address');
      isValid = false;
    }

    // Display errors if any
    if (!isValid) {
      this.showErrors(errors);
    }

    return isValid;
  }

 /**
   * Validate phone number format
   */
 isValidPhone(phone) {
   // Strict validation for exactly 11 digits (Egyptian format starting with 0)
   const phoneRegex = /^0[0-9]{10}$/; // Starts with 0, followed by exactly 10 digits
   const cleanPhone = phone.replace(/\s/g, '');
   return phoneRegex.test(cleanPhone) && cleanPhone.length === 11;
 }

  /**
   * Show validation errors
   */
  showErrors(errors) {
    // Remove existing error messages
    this.clearErrors();
    
    // Create error container
    const errorContainer = document.createElement('div');
    errorContainer.id = 'validation-errors';
    errorContainer.className = 'mb-6 p-4 rounded-xl text-red-700 bg-red-50 border border-red-200';
    
    const errorList = document.createElement('ul');
    errorList.className = 'list-disc pl-5 space-y-1';
    
    errors.forEach(error => {
      const errorItem = document.createElement('li');
      errorItem.textContent = error;
      errorList.appendChild(errorItem);
    });
    
    errorContainer.appendChild(errorList);
    
    // Insert at the top of the form
    const form = document.getElementById('checkout-form');
    if (form) {
      form.insertBefore(errorContainer, form.firstChild);
    }
  }

  /**
   * Clear validation errors
   */
  clearErrors() {
    const errorContainer = document.getElementById('validation-errors');
    if (errorContainer) {
      errorContainer.remove();
    }
  }
}