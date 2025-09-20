/* js/components/product-filter.js - Product filtering and sorting functionality */

class ProductFilter {
  constructor() {
    this.products = [];
    this.filterCallbacks = [];
    this.searchCallbacks = [];
    this.sortCallbacks = [];
    this.currentCategory = 'all';
    this.currentSearch = '';
    this.currentSort = 'name';
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

    // Sort select
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.setSort(e.target.value);
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
   * Set current sort option
   */
  setSort(sortOption) {
    this.currentSort = sortOption;
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
    
    // Apply sorting
    filtered = this.sortProducts(filtered, this.currentSort);
    
    // Notify listeners
    this.notifyFilterChange(filtered);
  }

  /**
   * Sort products based on sort option
   */
  sortProducts(products, sortOption) {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceA - priceB;
        });
      case 'price-high':
        return sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceB - priceA;
        });
      case 'popularity':
        // For demo, we'll sort by category (premium first)
        return sorted.sort((a, b) => {
          const priority = {
            'Premium': 1,
            'Signature': 2,
            'Popular': 3,
            'Classic': 4,
            'Seasonal': 5,
            'Artisan': 6,
            'Gourmet': 7
          };
          return (priority[a.category] || 99) - (priority[b.category] || 99);
        });
      case 'name':
      default:
        return sorted.sort((a, b) => a.flavor.localeCompare(b.flavor));
    }
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.currentCategory = 'all';
    this.currentSearch = '';
    this.currentSort = 'name';
    
    // Reset UI
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'name';
    
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
   * Notify sort change listeners
   */
  notifySortChange(sortedProducts) {
    this.sortCallbacks.forEach(callback => callback(sortedProducts));
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

  /**
   * Register sort change callback
   */
  onSortChange(callback) {
    this.sortCallbacks.push(callback);
  }
}