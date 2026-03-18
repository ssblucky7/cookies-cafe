# Cookies Café Frontend

A modern, responsive React + Tailwind CSS website for Cookies Café.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ SEO optimized
- ✅ Dynamic hero section with slider support
- ✅ E-commerce features (product cards, cart, wishlist)
- ✅ Gallery with lightbox
- ✅ Customer reviews carousel
- ✅ Contact form with map integration
- ✅ Social media integration
- ✅ Modular component architecture

## Color Theme

- Cream: `#FFF8F0`
- Caramel: `#C08552`
- Brown: `#8C5A3C`
- Dark Brown: `#4B2E2B`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Swiper.js (for sliders)
- React Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── FeaturedSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── ReviewSection.jsx
│   │   ├── ConnectSection.jsx
│   │   └── LocationSection.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Components

### Navbar
- Responsive navigation with mobile menu
- Search functionality
- Cart icon with counter
- Login/Signup links

### Hero Section
- Dynamic slider with Swiper.js
- Support for images and videos
- Customizable text and buttons

### Featured Section
- Product cards with e-commerce features
- Add to cart functionality
- Wishlist/favorite option
- Sale badges

### Gallery Section
- Responsive grid layout
- Lightbox for full-size images
- Hover effects

### Review Section
- Customer testimonials carousel
- Star ratings
- Product-specific reviews

### Connect Section
- Social media links
- Contact information

### Location Section
- Google Maps integration
- Contact form with validation

### Footer
- Quick links
- Contact details
- Service hours
- Social media links
- Copyright information

## Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`

### Modifying Colors
Edit `tailwind.config.js` to change the color theme.

### Adding Products
Update the `products` array in `src/pages/Home.jsx` or create a separate data file.

## SEO Optimization

- Semantic HTML structure
- Meta tags in `index.html`
- Alt text for images
- Proper heading hierarchy
- Fast loading with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved © Cookies Café
