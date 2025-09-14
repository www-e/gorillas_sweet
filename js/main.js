/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {

    // Define the theme data. These keys directly match the CSS variables in index.html
    const flavorThemes = [
        {
            flavor: 'Tiramisu Cake',
            image: 'assets/images/tiramisu.png',
            colors: {
                '--page-bg': '#F0E6D2', '--hero-card-bg': '#F8F4E9', '--text-primary': '#8B4513',
                '--text-secondary': '#5D2E0A', '--text-muted': '#A08C7D', '--wave-fill': '#F8F4E9',
                '--btn-gradient-from': '#8B4513', '--btn-gradient-to': '#A0522D',
                '--btn-shadow': 'rgba(139, 69, 19, 0.3)', '--btn-ghost-border': '#D4C8B5'
            }
        },
        {
            flavor: 'Red Velvet Cake',
            image: 'assets/images/red-velvet.png',
            colors: {
                '--page-bg': '#FFF0F0', '--hero-card-bg': '#FFF8F8', '--text-primary': '#9B2C2C',
                '--text-secondary': '#7A2020', '--text-muted': '#c5a3a3', '--wave-fill': '#FFF8F8',
                '--btn-gradient-from': '#C53030', '--btn-gradient-to': '#F56565',
                '--btn-shadow': 'rgba(155, 44, 44, 0.3)', '--btn-ghost-border': '#fed7d7'
            }
        },
        {
            flavor: 'Classic Cheesecake',
            image: 'assets/images/cheesecake.png',
            colors: {
                '--page-bg': '#FFFBEB', '--hero-card-bg': '#FEFDF6', '--text-primary': '#B7791F',
                '--text-secondary': '#975A16', '--text-muted': '#d4b791', '--wave-fill': '#FEFDF6',
                '--btn-gradient-from': '#D69E2E', '--btn-gradient-to': '#EDC9A1',
                '--btn-shadow': 'rgba(183, 121, 31, 0.3)', '--btn-ghost-border': '#f7e4c3'
            }
        },
        {
            flavor: 'Molten Chocolate Cake',
            image: 'assets/images/chocolate.png',
            colors: {
                '--page-bg': '#F5EFEA', '--hero-card-bg': '#F9F6F3', '--text-primary': '#5C3A21',
                '--text-secondary': '#422815', '--text-muted': '#a39387', '--wave-fill': '#F9F6F3',
                '--btn-gradient-from': '#744210', '--btn-gradient-to': '#8C5B38',
                '--btn-shadow': 'rgba(92, 58, 33, 0.3)', '--btn-ghost-border': '#e0d1c4'
            }
        },
        {
            flavor: 'Cookie Crumble Tart',
            image: 'assets/images/cookies.png',
            colors: {
                '--page-bg': '#F4F2EF', '--hero-card-bg': '#FAF9F7', '--text-primary': '#695546',
                '--text-secondary': '#4A3B2F', '--text-muted': '#a89d94', '--wave-fill': '#FAF9F7',
                '--btn-gradient-from': '#745f4d', '--btn-gradient-to': '#907f6f',
                '--btn-shadow': 'rgba(116, 95, 77, 0.3)', '--btn-ghost-border': '#ddd5ce'
            }
        },
        {
            flavor: 'Pistachio Delight Tart',
            image: 'assets/images/pistachio.png',
            colors: {
                '--page-bg': '#F6FFF2', '--hero-card-bg': '#FDFFF8', '--text-primary': '#38A169',
                '--text-secondary': '#2F855A', '--text-muted': '#a7c7b6', '--wave-fill': '#FDFFF8',
                '--btn-gradient-from': '#38A169', '--btn-gradient-to': '#68D391',
                '--btn-shadow': 'rgba(56, 161, 105, 0.3)', '--btn-ghost-border': '#c6f6d5'
            }
        },
        {
            flavor: 'Triple Berry Cupcake',
            image: 'assets/images/cupcake.png',
            colors: {
                '--page-bg': '#FFF0F8', '--hero-card-bg': '#FFF8FC', '--text-primary': '#C2185B',
                '--text-secondary': '#880E4F', '--text-muted': '#CE93D8', '--wave-fill': '#FFF8FC',
                '--btn-gradient-from': '#C2185B', '--btn-gradient-to': '#E91E63',
                '--btn-shadow': 'rgba(194, 24, 91, 0.3)', '--btn-ghost-border': '#F8BBD0'
            }
        }
    ];

    // Function to update the hero title based on current flavor
    function updateHeroTitle(flavorName) {
        const heroTitleElement = document.getElementById('hero-title');
        if (heroTitleElement) {
            // Extract the main dessert type from the flavor name
            let title = 'DESSERTS';
            if (flavorName.includes('Cake') || flavorName.includes('Cheesecake')) {
                title = 'CAKES';
            } else if (flavorName.includes('Cookie') || flavorName.includes('Tart')) {
                title = 'BAKED';
            } else if (flavorName.includes('Chocolate')) {
                title = 'CHOCOLATE';
            } else if (flavorName.includes('Tiramisu')) {
                title = 'ITALIAN DESSERTS';
            } else if (flavorName.includes('Cupcake')) {
                title = 'CUPCAKES';
            }
            
            heroTitleElement.textContent = title;
        }
    }

    // Set up callback for carousel slide changes
    window.onCarouselSlideChange = function(index, slideData) {
        updateHeroTitle(slideData.flavor);
        // Update the flavors section theme to match the current carousel item
        updateFlavorsSectionTheme(slideData.colors);
    };

    // Function to update the flavors section theme
    function updateFlavorsSectionTheme(themeColors) {
        const flavorCards = document.querySelectorAll('.flavor-card');
        const flavorCardBg = document.querySelectorAll('.flavor-card-bg');
        
        // Apply the background color to the flavor cards
        flavorCards.forEach(card => {
            card.style.backgroundColor = '#ffffff'; // Keep white background for cards
        });
        
        // Apply the theme background color to the flavor card backgrounds
        flavorCardBg.forEach(bg => {
            bg.style.backgroundColor = themeColors['--hero-card-bg'];
        });
        
        // Update the section title color to match the current theme
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.style.color = themeColors['--text-secondary'];
        }
        
        // Update the flavor card text colors
        const flavorTitles = document.querySelectorAll('.flavor-card h3');
        const flavorDescriptions = document.querySelectorAll('.flavor-card p');
        
        flavorTitles.forEach(title => {
            title.style.color = themeColors['--text-secondary'];
        });
        
        flavorDescriptions.forEach(desc => {
            desc.style.color = '#9ca3af'; // Keep the muted gray color for descriptions
        });
    }

    initializeCarousel(flavorThemes);

});