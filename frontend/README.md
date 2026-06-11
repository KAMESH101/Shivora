# Shivora Fashion — React Website

A fully responsive, multi-page fashion website built in React, inspired by your Figma design (teal/blue-green palette, Poppins typography, elegant fashion aesthetic).

## 🗂 Project Structure

```
fashion-website/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button/           # Reusable button (primary, secondary, ghost, dark variants)
│   │   ├── Navbar/           # Sticky nav with mobile hamburger menu
│   │   ├── Hero/             # Auto-sliding hero with 3 slides
│   │   ├── FeaturedProducts/ # Product grid with category filter tabs
│   │   ├── Categories/       # Shop-by-category grid
│   │   ├── Newsletter/       # Email signup section
│   │   ├── Footer/           # Multi-column footer
│   │   └── ProductCard/      # Card with wishlist, add-to-cart, hover effects
│   ├── pages/
│   │   ├── Home/             # Hero + Banner + Categories + Products + Promo + Testimonials + Newsletter
│   │   ├── Shop/             # Filterable, sortable product grid with sidebar
│   │   ├── Collections/      # Seasonal collections showcase
│   │   ├── About/            # Brand story, values, team
│   │   ├── Contact/          # Contact form + info cards + hours
│   │   └── NotFound/         # 404 page
│   ├── utils/
│   │   └── data.js           # Product & category data
│   ├── styles/
│   │   └── globals.css       # CSS variables, reset, utilities
│   ├── App.jsx               # Router + layout
│   └── index.js              # Entry point
└── package.json
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🎨 Design Tokens (CSS Variables)

| Variable            | Value      | Usage                  |
|---------------------|------------|------------------------|
| `--primary`         | `#6da9b5`  | Teal — main brand color|
| `--accent`          | `#c9a98a`  | Warm gold accent        |
| `--bg`              | `#f9f5f0`  | Off-white background    |
| `--font-display`    | Cormorant Garamond | Headings        |
| `--font-body`       | Poppins    | Body text               |

## 📱 Responsive Breakpoints

| Breakpoint   | Layout                             |
|--------------|------------------------------------|
| `< 480px`    | Mobile (single column, stacked)    |
| `480–768px`  | Tablet portrait (2-col grids)      |
| `768–1024px` | Tablet landscape (adjusted grids)  |
| `1024–1280px`| Laptop                             |
| `> 1280px`   | Desktop (max-width container)      |

## ✨ Features

- **Hero Slider** — 3 auto-rotating slides with smooth transitions
- **Responsive Navbar** — Sticky on scroll, hamburger on mobile with animated open/close
- **Product Filtering** — Filter by category, price range, and search; sort by price/newest
- **Wishlist & Cart** — Add-to-cart animation and wishlist toggle per product card
- **Newsletter Signup** — Email validation with success/error feedback
- **Contact Form** — Fully functional form with success state
- **Smooth Scroll to Top** — On every route change
- **SEO-ready** — Proper meta tags, semantic HTML
