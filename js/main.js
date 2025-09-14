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
    // Initialize theme manager
    if (window.ThemeManager) {
      this.components.themeManager = new window.ThemeManager();
      this.components.themeManager.init();
    }

    // Initialize carousel
    if (window.CarouselManager && window.DESSERT_DATA) {
      this.components.carouselManager = new window.CarouselManager();
      const desserts = window.DESSERT_DATA.getAllDesserts();
      this.components.carouselManager.init(desserts);
    }

    // Initialize modal
    if (window.DessertModal) {
      window.DessertModal.init();
    }

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
    // Arrow key navigation for carousel (when not in modal)
    if (this.components.carouselManager && !window.DessertModal?.isOpen) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.components.carouselManager.previous();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        this.components.carouselManager.next();
      }
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
