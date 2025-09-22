/* js/components/drawer.js - Mobile drawer navigation component */

class DrawerManager {
  constructor() {
    this.drawer = document.getElementById('mobile-drawer');
    this.toggleButton = document.getElementById('drawer-toggle');
    this.closeButton = document.getElementById('drawer-close');
    this.backdrop = document.getElementById('drawer-backdrop');
    this.drawerPanel = document.getElementById('drawer-panel');
    
    this.isOpen = false;
    this.init();
  }

  /**
   * Initialize drawer component
   */
  init() {
    if (!this.drawer) {
      console.warn('Drawer component not found in DOM');
      return;
    }

    // Bind event listeners
    this.bindEvents();
    
    // Close drawer on window resize if it's open
    window.addEventListener('resize', () => {
      if (this.isOpen && window.innerWidth >= 768) {
        this.close();
      }
    });
    
    console.log('DrawerManager initialized');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Open drawer
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
    
    // Close drawer
    if (this.closeButton) {
      this.closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }
    
    // Close when clicking backdrop
    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Handle navigation clicks
    const navButtons = this.drawer.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // If it's a button (not a link), handle navigation
        if (button.tagName === 'BUTTON') {
          e.preventDefault();
          const page = button.dataset.page;
          if (page) {
            this.handleNavigation(page);
          }
        }
        // Close drawer after navigation
        this.close();
      });
    });
  }

  /**
   * Toggle drawer state
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open drawer
   */
  open() {
    if (!this.drawer) return;
    
    this.drawer.classList.remove('hidden');
    // Force reflow
    this.drawer.offsetHeight;
    this.drawerPanel.classList.remove('translate-x-full');
    
    this.isOpen = true;
    document.body.classList.add('overflow-hidden');
    
    // Focus first focusable element
    const firstFocusable = this.drawerPanel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  /**
   * Close drawer
   */
  close() {
    if (!this.drawer || !this.isOpen) return;
    
    this.drawerPanel.classList.add('translate-x-full');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      if (this.drawer) {
        this.drawer.classList.add('hidden');
      }
      document.body.classList.remove('overflow-hidden');
    }, 300);
    
    this.isOpen = false;
  }

  /**
   * Handle navigation within the app
   */
  handleNavigation(page) {
    // If we have access to the main app, use its navigation handler
    if (window.GorillaApp && typeof window.GorillaApp.handleNavigation === 'function') {
      const button = this.drawer.querySelector(`.nav-button[data-page="${page}"]`);
      if (button) {
        window.GorillaApp.handleNavigation(button);
      }
    } else {
      // Fallback to simple scroll behavior
      switch (page) {
        case 'home':
          if (window.location.pathname === '/menu.html' || 
              window.location.pathname === '/cart.html' || 
              window.location.pathname === '/checkout.html' || 
              window.location.pathname === '/confirmation.html') {
            window.location.href = 'index.html';
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
        case 'about':
          // Scroll to gallery section as placeholder
          const gallerySection = document.getElementById('gallery-component');
          if (gallerySection) {
            gallerySection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 'contact':
          // Scroll to social section at bottom
          const socialSection = document.getElementById('social-component');
          if (socialSection) {
            socialSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
      }
    }
  }
}

// Make available globally
window.DrawerManager = DrawerManager;