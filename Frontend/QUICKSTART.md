# Quick Start Guide - Cookies Café Menu System

## Getting Started in 5 Minutes

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

## Quick Navigation

- **Home Page**: `/`
- **Menu Listing**: `/menu`
- **Product Detail**: `/menu/1` (replace 1 with any product ID)

## Key Files to Know

### Pages
- `src/pages/Home.jsx` - Homepage with all sections
- `src/pages/Menu.jsx` - Menu listing with filters
- `src/pages/MenuDetail.jsx` - Individual product page

### Components
- `src/components/Navbar.jsx` - Navigation header
- `src/components/Footer.jsx` - Site footer
- `src/components/HeroSection.jsx` - Homepage hero slider
- `src/components/FeaturedSection.jsx` - Product showcase
- `src/components/GallerySection.jsx` - Image gallery
- `src/components/ReviewSection.jsx` - Customer reviews
- `src/components/ConnectSection.jsx` - Social media
- `src/components/LocationSection.jsx` - Map & contact form

### Data
- `src/utils/menuData.js` - All product data

## Common Tasks

### Add a New Product
Edit `src/utils/menuData.js`:
```javascript
{
  id: 13,
  name: 'New Cookie',
  description: 'Delicious new flavor',
  price: 5.99,
  category: 'special',
  image: 'https://your-image-url.com/image.jpg',
  rating: 4.5,
  reviews: 10,
  popularity: 75,
  date: '2024-01-26',
  badge: 'New'
}
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  cream: '#FFF8F0',
  caramel: '#C08552',
  brown: '#8C5A3C',
  darkBrown: '#4B2E2B',
}
```

### Add a New Page
1. Create file in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`:
```javascript
<Route path="/your-page" element={<YourPage />} />
```

### Modify Navigation
Edit `src/components/Navbar.jsx` - add links in the navigation section

## Testing the Menu System

### Test Sorting
1. Go to `/menu`
2. Use the "Sort by" dropdown
3. Try: Newest, Price Low-High, Price High-Low, Popular

### Test Filtering
1. Go to `/menu`
2. Click "Filters" (mobile) or use sidebar (desktop)
3. Select different categories
4. Adjust price range slider
5. Click "Reset Filters"

### Test Product Detail
1. Go to `/menu`
2. Click any product card
3. Try:
   - Clicking thumbnail images
   - Zoom button (magnifying glass)
   - Quantity +/- buttons
   - Switching tabs (Overview, Ingredients, Reviews)
   - Clicking related products

### Test Responsive Design
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1920px

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder

## Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
Change port in `vite.config.js`:
```javascript
server: {
  port: 3001  // Change to any available port
}
```

### Images Not Loading
- Check internet connection (using external URLs)
- Replace with local images in `public/` folder
- Update image paths in `menuData.js`

### Styles Not Applying
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

## Project Structure Overview

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components (routes)
│   ├── utils/          # Data and helper functions
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

## Next Steps

1. ✅ Explore the homepage
2. ✅ Browse the menu
3. ✅ View product details
4. ✅ Test all features
5. 📝 Customize content
6. 🎨 Adjust styling
7. 🚀 Deploy to production

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [React Router](https://reactrouter.com)
- [Swiper.js](https://swiperjs.com)

## Need Help?

- Check `README.md` for detailed information
- See `MENU_DOCUMENTATION.md` for menu system details
- Review component files for inline comments

Happy coding! 🍪☕
