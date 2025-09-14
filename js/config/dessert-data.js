/* js/config/dessert-data.js - Centralized dessert data and themes */

const DESSERT_DATA = {
    themes: [
        {
            id: 'tiramisu',
            flavor: 'Tiramisu Cake',
            image: 'assets/images/tiramisu.png',
            price: '$24.99',
            difficulty: 'Expert',
            category: 'Premium',
            description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
            nutritionFacts: {
                calories: 380,
                fat: '18g',
                carbs: '48g',
                protein: '8g',
                sugar: '32g',
                fiber: '2g'
            },
            ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa Powder', 'Sugar', 'Eggs'],
            colors: {
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
        },
        {
            id: 'red-velvet',
            flavor: 'Red Velvet Cake',
            image: 'assets/images/red-velvet.png',
            price: '$22.99',
            difficulty: 'Easy',
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
        {
            id: 'cheesecake',
            flavor: 'Classic Cheesecake',
            image: 'assets/images/cheesecake.png',
            price: '$28.99',
            difficulty: 'Expert',
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
        {
            id: 'chocolate',
            flavor: 'Molten Chocolate Cake',
            image: 'assets/images/chocolate.png',
            price: '$26.99',
            difficulty: 'Medium',
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
        {
            id: 'cookies',
            flavor: 'Cookie Crumble Tart',
            image: 'assets/images/cookies.png',
            price: '$18.99',
            difficulty: 'Medium',
            category: 'Artisan',
            description: 'Buttery tart shell filled with vanilla custard and chocolate chip cookie crumbles',
            nutritionFacts: {
                calories: 380,
                fat: '22g',
                carbs: '42g',
                protein: '6g',
                sugar: '24g',
                fiber: '2g'
            },
            ingredients: ['Tart Shell', 'Vanilla Custard', 'Chocolate Chips', 'Cookie Crumbles', 'Butter'],
            colors: {
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
            }
        },
        {
            id: 'pistachio',
            flavor: 'Pistachio Delight Tart',
            image: 'assets/images/pistachio.png',
            price: '$32.99',
            difficulty: 'Expert',
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
        {
            id: 'cupcake',
            flavor: 'Triple Berry Cupcake',
            image: 'assets/images/cupcake.png',
            price: '$8.99',
            difficulty: 'Simple',
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
    ],

    getDessertById(id) {
        return this.themes.find(dessert => dessert.id === id);
    },

    getAllDesserts() {
        return this.themes;
    },

    getThemeColors(id) {
        const dessert = this.getDessertById(id);
        return dessert ? dessert.colors : null;
    }
};

// Make globally available
window.DESSERT_DATA = DESSERT_DATA;
