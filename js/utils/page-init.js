/* js/utils/page-init.js - Shared page initialization for all pages */

class PageInitializer {
  /**
   * Initialize page components for all pages
   */
  static async init() {
    // Load DOM loader if not already loaded
    if (!window.DOMLoader) {
      console.warn('DOMLoader not available');
      return;
    }

    // Check if this is the index page (which loads all components via main.js)
    const isIndexPage = window.location.pathname === '/' || 
                        window.location.pathname.includes('index.html') ||
                        window.location.pathname === '';
    
    // For index page, we only need to ensure drawer is initialized
    // since main.js handles all other component loading
    if (isIndexPage) {
      console.log("PageInitializer: Index page detected, initializing drawer only");
      
      // Initialize drawer if it exists on the page
      setTimeout(() => {
        if (document.getElementById('mobile-drawer')) {
          // Check if DrawerManager class exists and instance doesn't already exist
          if (typeof DrawerManager !== 'undefined' && !window.DrawerManagerInstance) {
            window.DrawerManagerInstance = new DrawerManager();
            console.log("✅ Drawer component initialized on index page");
          }
        }
      }, 100);
      return;
    }

    // For other pages, load the header component
    console.log("PageInitializer: Non-index page detected, loading header component");
    
    // Load header component only (other pages don't need all components)
    const components = [
      { path: "components/header.html", target: "#header-component" }
    ];

    try {
      const success = await window.DOMLoader.loadComponents(components);
      if (success) {
        console.log("✅ Header component loaded successfully");
        
        // Initialize drawer if it exists on the page
        setTimeout(() => {
          if (document.getElementById('mobile-drawer')) {
            // Check if DrawerManager class exists and instance doesn't already exist
            if (typeof DrawerManager !== 'undefined' && !window.DrawerManagerInstance) {
              window.DrawerManagerInstance = new DrawerManager();
              console.log("✅ Drawer component initialized");
            }
          }
          
          // Update cart count in header
          if (window.CartManager) {
            const cartManager = new window.CartManager();
            cartManager.updateCartIcon();
          }
        }, 100);
      } else {
        console.error("❌ Failed to load header component");
      }
    } catch (error) {
      console.error("❌ Error loading components:", error);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Run on all pages that have a header component container
  if (document.getElementById('header-component')) {
    await PageInitializer.init();
  }
});