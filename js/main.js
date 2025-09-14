/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {

    // Define the theme data. These keys directly match the CSS variables in index.html
    const flavorThemes = [
        {
            flavor: 'Strawberry Swirl Cheesecake',
            image: 'assets/images/strawberry.png',
            colors: {
                '--page-bg': '#FFE8F4', '--hero-card-bg': '#FFF6FA', '--text-primary': '#8C3A63',
                '--text-secondary': '#6D2E4D', '--text-muted': '#bba9b1', '--wave-fill': '#FFF6FA',
                '--btn-gradient-from': '#C75B8F', '--btn-gradient-to': '#e08bb6',
                '--btn-shadow': 'rgba(140, 58, 99, 0.3)', '--btn-ghost-border': '#f0e4e9'
            }
        },
        {
            flavor: 'Vanilla Bean Cake',
            image: 'assets/images/vanilla.png',
            colors: {
                '--page-bg': '#F5F8FF', '--hero-card-bg': '#FBFCFF', '--text-primary': '#4A4A4A',
                '--text-secondary': '#313131', '--text-muted': '#9e9e9e', '--wave-fill': '#FBFCFF',
                '--btn-gradient-from': '#343434', '--btn-gradient-to': '#555555',
                '--btn-shadow': 'rgba(50, 50, 50, 0.3)', '--btn-ghost-border': '#e0e0e0'
            }
        },
        {
            flavor: 'Mint Chocolate Cookie',
            image: 'assets/images/mint.png',
            colors: {
                '--page-bg': '#F0FFF9', '--hero-card-bg': '#F8FFFD', '--text-primary': '#3C7A5D',
                '--text-secondary': '#2E5C47', '--text-muted': '#95b3a7', '--wave-fill': '#F8FFFD',
                '--btn-gradient-from': '#0C4B33', '--btn-gradient-to': '#1f7c57',
                '--btn-shadow': 'rgba(12, 75, 51, 0.3)', '--btn-ghost-border': '#d4e5de'
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
                title = 'BAKED GOODS';
            } else if (flavorName.includes('Chocolate')) {
                title = 'CHOCOLATE';
            }
            
            heroTitleElement.textContent = title;
            
            // Apply chocolate drip effect for chocolate desserts
            if (flavorName.includes('Chocolate')) {
                heroTitleElement.classList.add('chocolate-drip');
            } else {
                heroTitleElement.classList.remove('chocolate-drip');
            }
        }
    }

    // Set up callback for carousel slide changes
    window.onCarouselSlideChange = function(index, slideData) {
        updateHeroTitle(slideData.flavor);
    };

    initializeCarousel(flavorThemes);

});