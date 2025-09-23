/* js/components/product-filter.js - Product filtering functionality */

class ProductFilter {
  constructor() {
    this.products = [];
    this.filterCallbacks = [];
    this.searchCallbacks = [];
    this.currentCategory = 'all';
    this.currentSearch = '';
  }

  /**
   * Initialize filter component
   */
  init(products) {
    this.products = products || [];
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Category filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.setCategory(e.target.dataset.category);
      });
    });

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        // Debounce search input
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          this.setSearch(e.target.value);
        }, 300);
      });
    }
  }

  /**
   * Set current category filter
   */
  setCategory(category) {
    this.currentCategory = category;
    
    // Update UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('font-bold');
        btn.style.backgroundColor = 'var(--hero-card-bg, #fff6fa)';
      } else {
        btn.classList.remove('font-bold');
        btn.style.backgroundColor = '';
      }
    });
    
    // Trigger filter change
    this.applyFilters();
  }

  /**
   * Set current search term
   */
  setSearch(searchTerm) {
    this.currentSearch = searchTerm.toLowerCase();
    this.applyFilters();
  }

  /**
   * Apply all filters
   */
  applyFilters() {
    let filtered = [...this.products];

    // Apply category filter
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(product => {
        const category = product.category.toLowerCase();
        switch (this.currentCategory) {
          case 'cakes':
            return category.includes('cake') || category.includes('cheesecake');
          case 'cookies':
            return category.includes('cookie') || category.includes('tart');
          case 'seasonal':
            return category.includes('seasonal');
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (this.currentSearch) {
      filtered = filtered.filter(product =>
        product.flavor.toLowerCase().includes(this.currentSearch) ||
        product.description.toLowerCase().includes(this.currentSearch)
      );
    }

    // Notify listeners
    this.notifyFilterChange(filtered);
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.currentCategory = 'all';
    this.currentSearch = '';
    
    // Reset UI
    const searchInput = document.getElementById('search-input');
    
    if (searchInput) searchInput.value = '';
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      if (btn.dataset.category === 'all') {
        btn.classList.add('font-bold');
        btn.style.backgroundColor = 'var(--hero-card-bg, #fff6fa)';
      } else {
        btn.classList.remove('font-bold');
        btn.style.backgroundColor = '';
      }
    });
    
    this.applyFilters();
  }

  /**
   * Notify filter change listeners
   */
  notifyFilterChange(filteredProducts) {
    this.filterCallbacks.forEach(callback => callback(filteredProducts));
  }

  /**
   * Notify search change listeners
   */
  notifySearchChange(filteredProducts) {
    this.searchCallbacks.forEach(callback => callback(filteredProducts));
  }

  /**
   * Register filter change callback
   */
  onFilterChange(callback) {
    this.filterCallbacks.push(callback);
  }

  /**
   * Register search change callback
   */
  onSearchChange(callback) {
    this.searchCallbacks.push(callback);
  }
}