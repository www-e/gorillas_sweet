/* js/components/theme-manager.js - Theme management system */

class ThemeManager {
  constructor() {
    this.currentTheme = null;
    this.root = document.documentElement;
    this.transitionDuration = 600;
  }

  /**
   * Apply theme colors to CSS variables
   */
  applyTheme(themeColors) {
    if (!themeColors) return;

    // Apply all CSS custom properties
    Object.entries(themeColors).forEach(([property, value]) => {
      this.root.style.setProperty(property, value);
    });

    this.currentTheme = themeColors;
  }

  /**
   * Update hero title based on dessert type
   */
  updateHeroTitle(dessertName) {
    const heroTitleElement = document.getElementById("hero-title");
    if (!heroTitleElement) return;

    let title = "DESSERTS";

    if (dessertName.includes("Cake") || dessertName.includes("Cheesecake")) {
      title = "CAKES";
    } else if (dessertName.includes("Cookie") || dessertName.includes("Tart")) {
      title = "BAKED GOODS";
    } else if (dessertName.includes("Chocolate")) {
      title = "CHOCOLATE";
    } else if (dessertName.includes("Tiramisu")) {
      title = "ITALIAN TREATS";
    } else if (dessertName.includes("Cupcake")) {
      title = "CUPCAKES";
    }

    // Apply animation class for smooth transition
    heroTitleElement.classList.remove("text-transition");
    heroTitleElement.style.opacity = "0";
    
    setTimeout(() => {
      heroTitleElement.textContent = title;
      heroTitleElement.classList.add("text-transition");
      heroTitleElement.style.opacity = "1";
    }, 150);
  }

  /**
   * Update gallery section colors
   */
  updateGalleryTheme(themeColors) {
    if (!themeColors) return;

    // Update card backgrounds
    const cardBackgrounds = document.querySelectorAll(".dessert-card-bg");
    cardBackgrounds.forEach((bg) => {
      bg.style.backgroundColor = themeColors["--hero-card-bg"];
    });

    // Update section title
    const sectionTitle = document.querySelector("#gallery-content h2");
    if (sectionTitle) {
      sectionTitle.style.color = themeColors["--text-secondary"];
    }

    // Update card titles
    const cardTitles = document.querySelectorAll(".dessert-card h3");
    cardTitles.forEach((title) => {
      title.style.color = themeColors["--text-secondary"];
    });
  }

  /**
   * Update founder section colors
   */
  updateFounderTheme(themeColors) {
    if (!themeColors) return;

    // Update section title
    const sectionTitle = document.querySelector("#founder-component h2");
    if (sectionTitle) {
      sectionTitle.style.color = themeColors["--text-secondary"];
    }

    // Update founder name
    const founderName = document.querySelector("#founder-component h3");
    if (founderName) {
      founderName.style.color = themeColors["--text-primary"];
    }
  }

  /**
   * Update testimonials section colors
   */
  updateTestimonialsTheme(themeColors) {
    if (!themeColors) return;

    // Update section title
    const sectionTitle = document.querySelector("#testimonials-component h2");
    if (sectionTitle) {
      sectionTitle.style.color = themeColors["--text-secondary"];
    }
  }

  /**
   * Handle theme change from carousel
   */
  onCarouselChange(index, dessertData) {
    this.applyTheme(dessertData.colors);
    this.updateHeroTitle(dessertData.flavor);
    this.updateGalleryTheme(dessertData.colors);
    this.updateFounderTheme(dessertData.colors);
    this.updateTestimonialsTheme(dessertData.colors);

    console.log(`Theme updated: ${dessertData.flavor}`);
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Set up global callback for carousel changes
    const self = this;
    window.onCarouselSlideChange = (index, slideData) => {
      self.onCarouselChange(index, slideData);
    };

    console.log("ThemeManager initialized");
  }

  /**
   * Get current theme colors
   */
  getCurrentTheme() {
    return this.currentTheme;
  }
}

// Make globally available
window.ThemeManager = ThemeManager;
