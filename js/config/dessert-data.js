/* js/config/dessert-data.js - Centralized dessert data and themes */

const DESSERT_DATA = {
    // All menu items with actual pricing
    menuItems: [
        {
            id: 'cheese-cake',
            name: 'Cheese Cake',
            price: 45,
            image: 'assets/images/cheesecake.webp',
            category: 'Classic',
            description: 'Creamy New York style cheesecake with graham cracker crust',
            isFeatured: true
        },
        {
            id: 'chocolate-cake',
            name: 'chocolate cake',
            price: 50,
            image: 'assets/images/chocolate-cake.webp',
            category: 'Popular',
            description: 'Decadent chocolate creation made with premium cocoa and finest ingredients',
            isFeatured: false
        },
        {
            id: 'red-velvet',
            name: 'Red Velvet',
            price: 50,
            image: 'assets/images/red-velvet.webp',
            category: 'Signature',
            description: 'Rich and decadent red velvet cake with cream cheese frosting',
            isFeatured: true
        },
        {
            id: 'pistachio-cake',
            name: 'Pistachio cake',
            price: 60,
            image: 'assets/images/pistachio-cake.webp',
            category: 'Gourmet',
            description: 'Nutty and sophisticated pistachio dessert with authentic flavors',
            isFeatured: true
        },
        {
            id: 'coffee-cake',
            name: 'Coffee Cake',
            price: 50,
            image: 'assets/images/coffee-cake.webp',
            category: 'Popular',
            description: 'Rich coffee-infused treat perfect for coffee lovers',
            isFeatured: false
        },
        {
            id: 'milk-cake',
            name: 'Milk Cake',
            price: 50,
            image: 'assets/images/milk-cake.webp',
            category: 'Classic',
            description: 'Sweet and creamy milk-based dessert with delicate flavors',
            isFeatured: false
        },
        {
            id: 'molten-cake',
            name: 'Molten Cake',
            price: 65,
            image: 'assets/images/molten-cake.webp',
            category: 'Popular',
            description: 'Decadent chocolate cake with a gooey, molten fudge center',
            isFeatured: true
        },
        {
            id: 'molten-red-velvet',
            name: 'Molten Red Velvet (NEW)',
            price: 70,
            image: 'assets/images/molten-red-velvet.webp',
            category: 'Signature',
            description: 'Warm, gooey center with rich, flowing red velvet filling',
            isFeatured: false
        },
        {
            id: 'molten-pistachio',
            name: 'Molten Pistachio (NEW)',
            price: 80,
            image: 'assets/images/molten-pistachio.webp',
            category: 'Gourmet',
            description: 'Warm, gooey center with rich, flowing pistachio filling',
            isFeatured: false
        },
        {
            id: 'cinnamon-rolls',
            name: 'Cinnamon Rolls',
            price: 50,
            image: 'assets/images/cinnamon-rolls.webp',
            category: 'Artisan',
            description: 'Warm, spiced rolls with cinnamon and sweet glaze',
            isFeatured: false
        },
        {
            id: 'italian-tiramisu',
            name: 'Italian Tiramisu',
            price: 60,
            image: 'assets/images/italian-tiramisu.webp',
            category: 'Premium',
            description: 'Classic Italian dessert with coffee-soaked layers and mascarpone',
            isFeatured: false
        },
        {
            id: 'cookies',
            name: 'Cookies (3 pieces)',
            price: 35,
            image: 'assets/images/cookies.webp',
            category: 'Artisan',
            description: 'Freshly baked cookies with the perfect texture and flavor',
            isFeatured: false
        },
        {
            id: 'lazy-cake',
            name: 'Lazy Cake (NEW)',
            price: 55,
            image: 'assets/images/lazy-cake.webp',
            category: 'Popular',
            description: 'No-bake chocolate cake with simple, delicious ingredients',
            isFeatured: false
        },
        {
            id: 'blueberry-lemon-cake',
            name: 'Blueberry Lemon Cake (NEW)',
            price: 50,
            image: 'assets/images/blueberry-lemon-cake.webp',
            category: 'Seasonal',
            description: 'Bright and refreshing with tart lemon and sweet blueberries',
            isFeatured: false
        },
        {
            id: 'san-sebastian',
            name: 'San Sebastian',
            price: 55,
            image: 'assets/images/san-sebastian.webp',
            category: 'Premium',
            description: 'Traditional Basque burnt cheesecake with caramelized top',
            isFeatured: false
        },
        {
            id: 'honey-cake',
            name: 'Honey Cake',
            price: 50,
            image: 'assets/images/honey-cake.webp',
            category: 'Classic',
            description: 'Sweet honey-infused cake with natural golden flavors',
            isFeatured: false
        },
        {
            id: 'eclair',
            name: 'Eclair',
            price: 30,
            image: 'assets/images/eclair.webp',
            category: 'Artisan',
            description: 'Classic French pastry filled with cream and topped with chocolate',
            isFeatured: false
        },
        {
            id: 'profiteroles',
            name: 'profiteroles',
            price: 25,
            image: 'assets/images/profiteroles.webp',
            category: 'Artisan',
            description: 'Light choux pastry filled with cream and chocolate sauce',
            isFeatured: false
        },
        {
            id: 'cup-cake',
            name: 'Cup Cake',
            price: 15,
            image: 'assets/images/cupcake.webp',
            category: 'Seasonal',
            description: 'Delicate vanilla cupcake topped with fresh strawberries, blueberries, and raspberries',
            isFeatured: true
        },
        {
            id: 'brownies',
            name: 'brownies',
            price: 55,
            image: 'assets/images/brownies.webp',
            category: 'Popular',
            description: 'Rich, fudgy chocolate brownies with intense flavor',
            isFeatured: false
        }
    ],

    // Featured desserts for landing page carousel
    featuredIds: ['cheesecake', 'chocolate', 'red-velvet', 'pistachio', 'cupcake'],

    // Color themes for featured desserts
    themes: {
        'cheesecake': {
            id: 'cheesecake',
            flavor: 'Classic Cheesecake',
            image: 'assets/images/cheesecake.webp',
            price: 'EGP 45',
            category: 'Classic',
            description: 'Creamy New York style cheesecake with graham cracker crust',
            nutritionFacts: {
                calories: 450,
                fat: '32g',
                carbs: '35g',
                protein: '9g',
                sugar: '28g',
                fiber: '1g'
            },
            ingredients: ['Cream Cheese', 'Graham Crackers', 'Butter', 'Sugar', 'Eggs', 'Vanilla'],
            colors: {
                '--page-bg': '#FFFBEB',
                '--hero-card-bg': '#FEFDF6',
                '--text-primary': '#B7791F',
                '--text-secondary': '#975A16',
                '--text-muted': '#d4b791',
                '--wave-fill': '#FEFDF6',
                '--btn-gradient-from': '#D69E2E',
                '--btn-gradient-to': '#EDC9A1',
                '--btn-shadow': 'rgba(183, 121, 31, 0.3)',
                '--btn-ghost-border': '#f7e4c3'
            }
        },
        'chocolate': {
            id: 'chocolate',
            flavor: 'Molten Chocolate Cake',
            image: 'assets/images/chocolate.webp',
            price: 'EGP 65',
            category: 'Popular',
            description: 'Decadent chocolate cake with a gooey, molten fudge center',
            nutritionFacts: {
                calories: 520,
                fat: '28g',
                carbs: '62g',
                protein: '8g',
                sugar: '45g',
                fiber: '4g'
            },
            ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Cocoa Powder'],
            colors: {
                '--page-bg': '#F5EFEA',
                '--hero-card-bg': '#F9F6F3',
                '--text-primary': '#5C3A21',
                '--text-secondary': '#422815',
                '--text-muted': '#a39387',
                '--wave-fill': '#F9F6F3',
                '--btn-gradient-from': '#744210',
                '--btn-gradient-to': '#8C5B38',
                '--btn-shadow': 'rgba(92, 58, 33, 0.3)',
                '--btn-ghost-border': '#e0d1c4'
            }
        },
        'red-velvet': {
            id: 'red-velvet',
            flavor: 'Red Velvet Cake',
            image: 'assets/images/red-velvet.webp',
            price: 'EGP 50',
            category: 'Signature',
            description: 'Rich and decadent red velvet cake with cream cheese frosting',
            nutritionFacts: {
                calories: 420,
                fat: '20g',
                carbs: '55g',
                protein: '6g',
                sugar: '38g',
                fiber: '3g'
            },
            ingredients: ['Red Velvet Cake', 'Cream Cheese', 'Butter', 'Powdered Sugar', 'Vanilla'],
            colors: {
                '--page-bg': '#FFF0F0',
                '--hero-card-bg': '#FFF8F8',
                '--text-primary': '#9B2C2C',
                '--text-secondary': '#7A2020',
                '--text-muted': '#c5a3a3',
                '--wave-fill': '#FFF8F8',
                '--btn-gradient-from': '#C53030',
                '--btn-gradient-to': '#F56565',
                '--btn-shadow': 'rgba(155, 44, 44, 0.3)',
                '--btn-ghost-border': '#fed7d7'
            }
        },
        'pistachio': {
            id: 'pistachio',
            flavor: 'Pistachio Delight Tart',
            image: 'assets/images/pistachio.webp',
            price: 'EGP 60',
            category: 'Gourmet',
            description: 'Authentic pistachio cream tart with roasted pistachio pieces for perfect crunch',
            nutritionFacts: {
                calories: 410,
                fat: '26g',
                carbs: '38g',
                protein: '12g',
                sugar: '22g',
                fiber: '3g'
            },
            ingredients: ['Pistachios', 'Tart Shell', 'Cream', 'Sugar', 'Eggs', 'Almond Extract'],
            colors: {
                '--page-bg': '#F6FFF2',
                '--hero-card-bg': '#FDFFF8',
                '--text-primary': '#38A169',
                '--text-secondary': '#2F855A',
                '--text-muted': '#a7c7b6',
                '--wave-fill': '#FDFFF8',
                '--btn-gradient-from': '#38A169',
                '--btn-gradient-to': '#68D391',
                '--btn-shadow': 'rgba(56, 161, 105, 0.3)',
                '--btn-ghost-border': '#c6f6d5'
            }
        },
        'cupcake': {
            id: 'cupcake',
            flavor: 'Triple Berry Cupcake',
            image: 'assets/images/cupcake.webp',
            price: 'EGP 15',
            category: 'Seasonal',
            description: 'Delicate vanilla cupcake topped with fresh strawberries, blueberries, and raspberries',
            nutritionFacts: {
                calories: 290,
                fat: '12g',
                carbs: '42g',
                protein: '4g',
                sugar: '32g',
                fiber: '2g'
            },
            ingredients: ['Vanilla Cake', 'Strawberries', 'Blueberries', 'Raspberries', 'Buttercream', 'Sugar'],
            colors: {
                '--page-bg': '#FFF0F8',
                '--hero-card-bg': '#FFF8FC',
                '--text-primary': '#C2185B',
                '--text-secondary': '#880E4F',
                '--text-muted': '#CE93D8',
                '--wave-fill': '#FFF8FC',
                '--btn-gradient-from': '#C2185B',
                '--btn-gradient-to': '#E91E63',
                '--btn-shadow': 'rgba(194, 24, 91, 0.3)',
                '--btn-ghost-border': '#F8BBD0'
            }
        }
    },

    // Convert menu item to full dessert object with theme
    convertToDessert(menuItem) {
        const theme = this.themes[menuItem.id];
        if (theme) {
            return theme;
        }

        // Generate theme for non-featured items
        return {
            id: menuItem.id,
            flavor: menuItem.name,
            image: menuItem.image,
            price: `EGP ${menuItem.price}`,
            category: menuItem.category,
            description: menuItem.description,
            nutritionFacts: this.generateNutritionFacts(menuItem.price),
            ingredients: this.generateIngredients(menuItem.name),
            colors: this.getDefaultColors(menuItem.category),
            isNew: menuItem.name.includes('(NEW)')
        };
    },

    // Generate nutrition facts for non-featured items
    generateNutritionFacts(price) {
        const baseCalories = Math.floor(price * 6);
        return {
            calories: baseCalories,
            fat: `${Math.floor(baseCalories * 0.15 / 9)}g`,
            carbs: `${Math.floor(baseCalories * 0.5 / 4)}g`,
            protein: `${Math.floor(baseCalories * 0.1 / 4)}g`,
            sugar: `${Math.floor(baseCalories * 0.25 / 4)}g`,
            fiber: `${Math.floor(baseCalories * 0.05 / 4)}g`
        };
    },

    // Generate ingredients for non-featured items
    generateIngredients(name) {
        const baseIngredients = ['Flour', 'Sugar', 'Eggs', 'Butter', 'Vanilla'];
        const specialIngredients = {
            'cheese': ['Cream Cheese', 'Graham Crackers'],
            'chocolate': ['Cocoa Powder', 'Dark Chocolate'],
            'red velvet': ['Red Food Coloring', 'Cream Cheese', 'Buttermilk'],
            'pistachio': ['Pistachios', 'Almond Extract'],
            'coffee': ['Coffee Extract', 'Espresso'],
            'molten': ['Chocolate Ganache', 'Premium Chocolate'],
            'cinnamon': ['Cinnamon', 'Brown Sugar'],
            'tiramisu': ['Mascarpone', 'Ladyfingers', 'Espresso'],
            'cookies': ['Chocolate Chips', 'Brown Sugar'],
            'lazy': ['Chocolate Biscuits', 'Chocolate', 'Condensed Milk'],
            'blueberry lemon': ['Blueberries', 'Lemon Zest', 'Lemon Juice'],
            'honey': ['Honey', 'Cinnamon'],
            'eclair': ['Choux Pastry', 'Pastry Cream', 'Chocolate Glaze'],
            'profiteroles': ['Choux Pastry', 'Whipped Cream', 'Chocolate Sauce'],
            'cup': ['Fresh Berries', 'Buttercream'],
            'brownies': ['Dark Chocolate', 'Walnuts', 'Cocoa Powder']
        };

        const lowerName = name.toLowerCase();
        for (const [key, ingredients] of Object.entries(specialIngredients)) {
            if (lowerName.includes(key)) {
                return [...baseIngredients, ...ingredients];
            }
        }

        return baseIngredients;
    },

    // Get default colors for categories
    getDefaultColors(category) {
        const colorSchemes = {
            'Classic': {
                '--page-bg': '#FFFBEB',
                '--hero-card-bg': '#FEFDF6',
                '--text-primary': '#B7791F',
                '--text-secondary': '#975A16',
                '--text-muted': '#d4b791',
                '--wave-fill': '#FEFDF6',
                '--btn-gradient-from': '#D69E2E',
                '--btn-gradient-to': '#EDC9A1',
                '--btn-shadow': 'rgba(183, 121, 31, 0.3)',
                '--btn-ghost-border': '#f7e4c3'
            },
            'Popular': {
                '--page-bg': '#F5EFEA',
                '--hero-card-bg': '#F9F6F3',
                '--text-primary': '#5C3A21',
                '--text-secondary': '#422815',
                '--text-muted': '#a39387',
                '--wave-fill': '#F9F6F3',
                '--btn-gradient-from': '#744210',
                '--btn-gradient-to': '#8C5B38',
                '--btn-shadow': 'rgba(92, 58, 33, 0.3)',
                '--btn-ghost-border': '#e0d1c4'
            },
            'Signature': {
                '--page-bg': '#FFF0F0',
                '--hero-card-bg': '#FFF8F8',
                '--text-primary': '#9B2C2C',
                '--text-secondary': '#7A2020',
                '--text-muted': '#c5a3a3',
                '--wave-fill': '#FFF8F8',
                '--btn-gradient-from': '#C53030',
                '--btn-gradient-to': '#F56565',
                '--btn-shadow': 'rgba(155, 44, 44, 0.3)',
                '--btn-ghost-border': '#fed7d7'
            },
            'Gourmet': {
                '--page-bg': '#F6FFF2',
                '--hero-card-bg': '#FDFFF8',
                '--text-primary': '#38A169',
                '--text-secondary': '#2F855A',
                '--text-muted': '#a7c7b6',
                '--wave-fill': '#FDFFF8',
                '--btn-gradient-from': '#38A169',
                '--btn-gradient-to': '#68D391',
                '--btn-shadow': 'rgba(56, 161, 105, 0.3)',
                '--btn-ghost-border': '#c6f6d5'
            },
            'Seasonal': {
                '--page-bg': '#FFF0F8',
                '--hero-card-bg': '#FFF8FC',
                '--text-primary': '#C2185B',
                '--text-secondary': '#880E4F',
                '--text-muted': '#CE93D8',
                '--wave-fill': '#FFF8FC',
                '--btn-gradient-from': '#C2185B',
                '--btn-gradient-to': '#E91E63',
                '--btn-shadow': 'rgba(194, 24, 91, 0.3)',
                '--btn-ghost-border': '#F8BBD0'
            },
            'Artisan': {
                '--page-bg': '#F4F2EF',
                '--hero-card-bg': '#FAF9F7',
                '--text-primary': '#695546',
                '--text-secondary': '#4A3B2F',
                '--text-muted': '#a89d94',
                '--wave-fill': '#FAF9F7',
                '--btn-gradient-from': '#745f4d',
                '--btn-gradient-to': '#907f6f',
                '--btn-shadow': 'rgba(116, 95, 77, 0.3)',
                '--btn-ghost-border': '#ddd5ce'
            },
            'Premium': {
                '--page-bg': '#F0E6D2',
                '--hero-card-bg': '#F8F4E9',
                '--text-primary': '#8B4513',
                '--text-secondary': '#5D2E0A',
                '--text-muted': '#A08C7D',
                '--wave-fill': '#F8F4E9',
                '--btn-gradient-from': '#8B4513',
                '--btn-gradient-to': '#A0522D',
                '--btn-shadow': 'rgba(139, 69, 19, 0.3)',
                '--btn-ghost-border': '#D4C8B5'
            }
        };

        return colorSchemes[category] || colorSchemes['Popular'];
    },

    // Get all desserts for menu page
    getAllDesserts() {
        return this.menuItems.map(item => this.convertToDessert(item));
    },

    // Get featured desserts for landing page
    getFeaturedDesserts() {
        return this.featuredIds.map(id => this.themes[id]);
    },

    // Get dessert by ID
    getDessertById(id) {
        const menuItem = this.menuItems.find(item => item.id === id);
        return menuItem ? this.convertToDessert(menuItem) : null;
    },

    // Get theme colors for a dessert ID
    getThemeColors(id) {
        const dessert = this.getDessertById(id);
        return dessert ? dessert.colors : null;
    }
};

// Make globally available
window.DESSERT_DATA = DESSERT_DATA;
