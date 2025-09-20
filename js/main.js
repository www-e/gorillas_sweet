/* js/main.js - Main application orchestrator */

class GorillaApp {
  constructor() {
    this.isInitialized = false;
    this.components = {
      themeManager: null,
      carouselManager: null,
      galleryManager: null,
      modal: null,
    };
  }

  /**
   * Initialize the complete application
   */
  async init() {
    try {
      console.log("🚀 Initializing Gorilla Sweet application...");

      // Show loading screen
      if (window.DOMLoader) {
        window.DOMLoader.showLoading();
      }

      // Load all components
      await this.loadComponents();

      // Initialize all modules
      await this.initializeModules();

      // Setup global event listeners
      this.setupEventListeners();

      // Hide loading and show app
      if (window.DOMLoader) {
        window.DOMLoader.hideLoading();
      }

      this.isInitialized = true;
      console.log("✅ Application initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize application:", error);
      this.showError();
    }
  }

  /**
   * Load HTML components
   */
  async loadComponents() {
    if (!window.DOMLoader) {
      console.log("DOMLoader not available, using inline components");
      return;
    }

    const components = [
      { path: "components/header.html", target: "#header-component" },
      { path: "components/hero.html", target: "#hero-component" },
      { path: "components/gallery.html", target: "#gallery-component" },
      { path: "components/wave-separator-2.html", target: "#wave-separator-2" },
      { path: "components/social.html", target: "#social-component" },
      { path: "components/footer.html", target: "#footer-component" },
      { path: "components/modal.html", target: "#modal-container" },
    ];

    const success = await window.DOMLoader.loadComponents(components);
    if (!success) {
      console.log(
        "Some components failed to load, continuing with inline components"
      );
    }
  }

  /**
   * Initialize all modules
   */
  async initializeModules() {
    const initComponent = (componentClass, windowProperty, initCallback) => {
      if (window[windowProperty]) {
        // Check if it's a class (constructor) or an instance
        if (typeof window[windowProperty] === 'function') {
          // It's a class, so instantiate it
          this.components[componentClass] = new window[windowProperty]();
        } else {
          // It's already an instance or object
          this.components[componentClass] = window[windowProperty];
        }
        
        if (initCallback) {
          initCallback(this.components[componentClass]);
        } else if (this.components[componentClass].init && typeof this.components[componentClass].init === 'function') {
          this.components[componentClass].init();
        }
        return true;
      }
      return false;
    };

    // Initialize theme manager
    initComponent('themeManager', 'ThemeManager');

    // Initialize carousel
    if (window.CarouselManager && window.DESSERT_DATA) {
      this.components.carouselManager = new window.CarouselManager();
      const desserts = window.DESSERT_DATA.getAllDesserts();
      this.components.carouselManager.init(desserts);
    }

    // Initialize modal
    initComponent('modal', 'DessertModal');

    // Initialize gallery (with delay for better UX)
    if (window.GalleryManager) {
      this.components.galleryManager = new window.GalleryManager();
      setTimeout(() => {
        this.components.galleryManager.init();
      }, 500);
    }

    // Initialize animations
    if (window.AnimationHelpers) {
      window.AnimationHelpers.initScrollAnimations();
    }
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    // Handle window resize
    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize();
      }, 250)
    );

    // Handle visibility change (pause/resume carousel)
    document.addEventListener("visibilitychange", () => {
      if (this.components.carouselManager) {
        if (document.hidden) {
          this.components.carouselManager.stopAutoSlide();
        } else {
          this.components.carouselManager.startAutoSlide();
        }
      }
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (e) => {
      this.handleGlobalKeydown(e);
    });

    // Handle navigation button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-button")) {
        this.handleComponentEvent('navigationClick', e.target);
      }
    });

    // Set initial active state
    this.setActiveNavigation("home");
  }

  /**
   * Unified event handler for component interactions
   */
  handleComponentEvent(eventType, eventData) {
    switch (eventType) {
      case 'carouselSlideChange':
        if (this.components.carouselManager && !window.DessertModal?.isOpen) {
          if (eventData.key === "ArrowLeft") {
            eventData.preventDefault();
            this.components.carouselManager.previous();
          } else if (eventData.key === "ArrowRight") {
            eventData.preventDefault();
            this.components.carouselManager.next();
          }
        }
        break;
      case 'navigationClick':
        this.handleNavigation(eventData);
        break;
    }
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Update any responsive elements if needed
    console.log("Window resized");
  }

  /**
   * Handle global keyboard events
   */
  handleGlobalKeydown(event) {
    this.handleComponentEvent('carouselSlideChange', event);
  }

  /**
   * Handle navigation button clicks
   */
  handleNavigation(button) {
    const page = button.dataset.page;
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    
    switch (page) {
      case 'home':
        // Scroll to top of page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'menu':
        // Navigate to menu page (for now, scroll to gallery section)
        const gallerySection = document.getElementById('gallery-component');
        if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'about':
        // For now, scroll to gallery section as placeholder
        const gallerySectionAbout = document.getElementById('gallery-component');
        if (gallerySectionAbout) {
          gallerySectionAbout.scrollIntoView({ behavior: 'smooth' });
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

  /**
   * Set active navigation state
   */
  setActiveNavigation(page) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to specified button
    const button = document.querySelector(`.nav-button[data-page="${page}"]`);
    if (button) {
      button.classList.add('active');
    }
  }

  /**
   * Show error state
   */
  showError() {
    const appContainer = document.getElementById("app-container");
    if (appContainer) {
      appContainer.innerHTML = `
                <div class="flex items-center justify-center min-h-screen">
                    <div class="text-center">
                        <div class="text-red-500 mb-4">
                            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"></path>
                            </svg>
                        </div>
                        <h1 class="text-2xl font-bold text-gray-700 mb-2">Something went wrong</h1>
                        <p class="text-gray-500 mb-6">Please refresh the page to try again.</p>
                        <button onclick="location.reload()" 
                                class="px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors">
                            Refresh Page
                        </button>
                    </div>
                </div>
            `;
      appContainer.classList.remove("opacity-0");
    }

    // Hide loading screen
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }

  /**
   * Utility: Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Get application status
   */
  getStatus() {
    return {
      initialized: this.isInitialized,
      components: Object.keys(this.components).reduce((status, key) => {
        status[key] = this.components[key] !== null;
        return status;
      }, {}),
    };
  }
}

// Initialize the application when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  window.GorillaApp = new GorillaApp();
  await window.GorillaApp.init();
});
