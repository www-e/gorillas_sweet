/* js/utils/dom-loader.js - DOM loading utilities */

const DOMLoader = {
    /**
     * Load HTML component into target element
     */
    async loadComponent(componentPath, targetSelector) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
            
            const html = await response.text();
            const targetElement = document.querySelector(targetSelector);
            
            if (targetElement) {
                targetElement.innerHTML = html;
                return true;
            } else {
                console.error(`Target element ${targetSelector} not found`);
                return false;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            return false;
        }
    },

    /**
     * Load multiple components in parallel
     */
    async loadComponents(components) {
        const promises = components.map(({ path, target }) => 
            this.loadComponent(path, target)
        );
        
        try {
            const results = await Promise.all(promises);
            return results.every(result => result === true);
        } catch (error) {
            console.error('Error loading components:', error);
            return false;
        }
    },

    /**
     * Show loading screen
     */
    showLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    },

    /**
     * Hide loading screen
     */
    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const appContainer = document.getElementById('app-container');
        
        if (loadingScreen && appContainer) {
            setTimeout(() => {
                loadingScreen.classList.add('opacity-0');
                appContainer.classList.remove('opacity-0');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 500);
        }
    }
};

// Make globally available
window.DOMLoader = DOMLoader;
