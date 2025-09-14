# Godzilla Bakery 🧁

A modern, colorful e-commerce website for selling delicious baked goods including chocolate cookies, cheesecakes, honey cakes, blueberry cakes, and other trendy treats.

## 🎯 Project Overview

This is a static e-commerce website built with HTML, Tailwind CSS, and JavaScript, using Supabase as the backend for database storage and authentication. The site allows customers to browse products, add items to their cart, and place orders without payment integration. Admin users can manage products, categories, and view orders through a dedicated admin panel.

The website is designed to be hosted on GitHub Pages with Supabase handling all backend services, making it a cost-effective solution with 100% free hosting.

## 🚀 Key Features

### For Customers
- Browse products by categories
- Add items to shopping cart
- Place orders with personal information
- No account creation required
- Mobile-responsive design

### For Admins
- Secure login to admin panel
- Manage product categories
- Add, edit, and delete products
- View and manage customer orders
- Contact customers directly

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Interactivity and logic
- **AOS Library** - Scroll-based animations
- **localStorage** - Client-side data persistence

### Backend
- **Supabase** - Database, Authentication, and Storage
  - PostgreSQL database
  - Row Level Security (RLS) policies
  - Authentication for admin users
  - Storage for product images

### Deployment
- **GitHub Pages** - Frontend hosting
- **Supabase** - Backend services
- **No environment variables** - Secure key handling

## 📁 Project Structure

```
godzilla/
├── docs/                   # Project documentation
│   ├── rules/              # Project rules and guidelines
│   ├── design_research.md  # Design research and inspiration
│   ├── project_planning.md # Project planning document
│   ├── technical_architecture.md # Technical architecture
│   └── ...                 # Other documentation files
├── README.md               # This file
└── QWEN.md                 # Qwen Code rules (to be created)
```

## 🎨 Design Concept

The website features a vibrant, modern design with a bakery theme that includes:
- Warm, inviting color palette with rich browns, creams, and accent colors
- Playful typography and graphics
- High-quality food photography
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive user experience

## 🔐 Security

- Row Level Security (RLS) policies implemented in Supabase
- Admin-only access to management functions
- Public read-only access to products and categories
- Secure handling of customer data
- No sensitive information stored in client-side code

## 🚀 Deployment

1. Frontend hosted on GitHub Pages
2. Backend services powered by Supabase
3. No environment variables required (all configuration in client-side code)
4. 100% free hosting solution

## 📚 Documentation

All project documentation is located in the `docs/` directory:
- [Project Planning](docs/project_planning.md) - Comprehensive project planning
- [Technical Architecture](docs/technical_architecture.md) - Detailed technical architecture
- [Design Research](docs/design_research.md) - Design research and inspiration
- [Qwen Rules](docs/rules/qwen_rules.md) - Qwen Code rules and guidelines

## 🤝 Development Process

This project follows a strict planning-first approach:
1. **Research and Planning** - Comprehensive research before implementation
2. **Design Phase** - Wireframes and mockups creation
3. **Prototyping** - Interactive prototypes for validation
4. **Implementation** - Clean code following project rules
5. **Testing** - Cross-browser and device testing
6. **Deployment** - GitHub Pages and Supabase configuration

## 📋 Prerequisites

Before working on this project, ensure you have:
- A GitHub account for hosting
- A Supabase account for backend services
- Node.js and npm for development tools
- A modern code editor
- Basic knowledge of HTML, CSS, and JavaScript

## 🤓 Getting Started

1. Fork this repository
2. Create a Supabase project
3. Configure the database schema
4. Set up Row Level Security policies
5. Create an admin user
6. Obtain your Supabase credentials
7. Begin implementation following the project rules

## 📝 Contributing

This project follows strict Qwen Code rules defined in [docs/rules/qwen_rules.md](docs/rules/qwen_rules.md). Please read these rules carefully before contributing.

## 📧 Contact

For questions or support, please open an issue in this repository.