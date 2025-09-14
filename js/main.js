/* js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // Define the expanded theme data for all desserts
    // IMPORTANT: Make sure your image files in 'assets/images/' match these names.
    const flavorThemes = [
        {
            flavor: 'Strawb\'ar Swirl',
            image: 'assets/images/strawberry.png',
            colors: {
                pageBg: '#FFE8F4', heroCardBg: '#FFF6FA', textColorPrimary: '#8C3A63',
                textColorSecondary: '#6D2E4D', textColorMuted: '#bba9b1', waveFill: '#FFF6FA',
                buttonGradient: 'linear-gradient(45deg, #C75B8F, #e08bb6)',
                buttonShadowColor: 'rgba(140, 58, 99, 0.3)', buttonGhostBorderColor: '#f0e4e9'
            }
        },
        {
            flavor: 'Swedish Vanilla',
            image: 'assets/images/vanilla.png',
            colors: {
                pageBg: '#F5F8FF', heroCardBg: '#FBFCFF', textColorPrimary: '#4A4A4A',
                textColorSecondary: '#313131', textColorMuted: '#9e9e9e', waveFill: '#FBFCFF',
                buttonGradient: 'linear-gradient(45deg, #343434, #555555)',
                buttonShadowColor: 'rgba(50, 50, 50, 0.3)', buttonGhostBorderColor: '#e0e0e0'
            }
        },
        {
            flavor: 'Mint Chokladchip',
            image: 'assets/images/mint.png',
            colors: {
                pageBg: '#F0FFF9', heroCardBg: '#F8FFFD', textColorPrimary: '#3C7A5D',
                textColorSecondary: '#2E5C47', textColorMuted: '#95b3a7', waveFill: '#F8FFFD',
                buttonGradient: 'linear-gradient(45deg, #0C4B33, #1f7c57)',
                buttonShadowColor: 'rgba(12, 75, 51, 0.3)', buttonGhostBorderColor: '#d4e5de'
            }
        },
        {
            flavor: 'Red Velvet Cake',
            image: 'assets/images/red-velvet.png',
            colors: {
                pageBg: '#FFF0F0', heroCardBg: '#FFF8F8', textColorPrimary: '#9B2C2C',
                textColorSecondary: '#7A2020', textColorMuted: '#c5a3a3', waveFill: '#FFF8F8',
                buttonGradient: 'linear-gradient(45deg, #C53030, #F56565)',
                buttonShadowColor: 'rgba(155, 44, 44, 0.3)', buttonGhostBorderColor: '#fed7d7'
            }
        },
        {
            flavor: 'Classic Cheesecake',
            image: 'assets/images/cheesecake.png',
            colors: {
                pageBg: '#FFFBEB', heroCardBg: '#FEFDF6', textColorPrimary: '#B7791F',
                textColorSecondary: '#975A16', textColorMuted: '#d4b791', waveFill: '#FEFDF6',
                buttonGradient: 'linear-gradient(45deg, #D69E2E, #EDC9A1)',
                buttonShadowColor: 'rgba(183, 121, 31, 0.3)', buttonGhostBorderColor: '#f7e4c3'
            }
        },
        {
            flavor: 'Molten Chocolate',
            image: 'assets/images/chocolate.png',
            colors: {
                pageBg: '#F5EFEA', heroCardBg: '#F9F6F3', textColorPrimary: '#5C3A21',
                textColorSecondary: '#422815', textColorMuted: '#a39387', waveFill: '#F9F6F3',
                buttonGradient: 'linear-gradient(45deg, #744210, #8C5B38)',
                buttonShadowColor: 'rgba(92, 58, 33, 0.3)', buttonGhostBorderColor: '#e0d1c4'
            }
        },
        {
            flavor: 'Cookie Crumble',
            image: 'assets/images/cookies.png',
            colors: {
                pageBg: '#F4F2EF', heroCardBg: '#FAF9F7', textColorPrimary: '#695546',
                textColorSecondary: '#4A3B2F', textColorMuted: '#a89d94', waveFill: '#FAF9F7',
                buttonGradient: 'linear-gradient(45deg, #745f4d, #907f6f)',
                buttonShadowColor: 'rgba(116, 95, 77, 0.3)', buttonGhostBorderColor: '#ddd5ce'
            }
        },
        {
            flavor: 'Pistachio Delight',
            image: 'assets/images/pistachio.png',
            colors: {
                pageBg: '#F6FFF2', heroCardBg: '#FDFFF8', textColorPrimary: '#38A169',
                textColorSecondary: '#2F855A', textColorMuted: '#a7c7b6', waveFill: '#FDFFF8',
                buttonGradient: 'linear-gradient(45deg, #38A169, #68D391)',
                buttonShadowColor: 'rgba(56, 161, 105, 0.3)', buttonGhostBorderColor: '#c6f6d5'
            }
        }
    ];

    initializeCarousel(flavorThemes);
});