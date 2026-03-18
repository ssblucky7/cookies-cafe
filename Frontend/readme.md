# Cookies Café Frontend

A modern, responsive React + Tailwind CSS website for Cookies Café.

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ SEO optimized
- ✅ Dynamic hero section with slider support
- ✅ E-commerce features (product cards, cart, wishlist)
- ✅ Advanced menu system with filtering and sorting
- ✅ Product detail pages with zoom functionality
- ✅ Our Story page with brand narrative and gallery
- ✅ Responsive gallery (4-column grid, 1:1 aspect ratio)
- ✅ Community page with user engagement features
- ✅ Like, comment, and share functionality
- ✅ Events and updates section
- ✅ User contribution system
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
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── MenuDetail.jsx
│   │   ├── OurStory.jsx
│   │   └── Community.jsx
│   ├── utils/
│   │   ├── menuData.js
│   │   └── communityData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── README.md
├── MENU_DOCUMENTATION.md
├── OUR_STORY_DOCUMENTATION.md
└── COMMUNITY_DOCUMENTATION.md
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

## Menu System

### Menu Listing Page
- **Sorting**: Price (Low/High), Date (Newest/Oldest), Popularity
- **Filtering**: Category, Price Range
- **Product Cards**: Images, ratings, prices, badges, add to cart
- **Badges**: Hot, New, Sale, Offer, Discount
- **Responsive Filters**: Collapsible sidebar on mobile

### Menu Detail Page
- **Image Gallery**: Multiple images with thumbnail navigation
- **Zoom Functionality**: Full-screen image viewer with navigation
- **Product Info**: Description, price, ratings, reviews, SKU
- **Quantity Selector**: Increment/decrement controls
- **Tabbed Content**: Overview, Ingredients, Reviews
- **Related Products**: 4 similar items from same category
- **Actions**: Add to cart, add to wishlist

For detailed menu system documentation, see [MENU_DOCUMENTATION.md](./MENU_DOCUMENTATION.md)

## Our Story Page

### Brand Story Section
- **Hero Banner**: Full-width image with overlay
- **How We Begin**: Brand origin story with featured images
- **Statistics**: Years in business, recipes, happy customers
- **Values Display**: Quality, Love, Community

### Gallery Section
- **Grid Layout**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Aspect Ratio**: Perfect 1:1 squares for all images
- **Auto-Wrapping**: Images automatically flow to next row
- **Hover Effects**: Image zoom and title overlay
- **Lightbox**: Full-screen image viewer
- **12 Pre-loaded Images**: Curated gallery content

For detailed Our Story documentation, see [OUR_STORY_DOCUMENTATION.md](./OUR_STORY_DOCUMENTATION.md)

## Community Page

### Community Feed
- **Post Display**: Grid layout with user posts (photos, reviews, stories)
- **Filter System**: All, Photos, Reviews, Stories, Trending
- **Engagement**: Like, comment, and share functionality
- **User Info**: Avatars, names, dates on all posts

### User Contributions
- **Share Your Story**: Full contribution form modal
- **Post Types**: Photos, Reviews, Stories
- **Rating System**: 5-star rating for reviews
- **Photo Upload**: Drag & drop image upload
- **Tags**: Hashtag system for organization

### Featured Content
- **Featured Stories**: 3 highlighted customer experiences
- **Events & Updates**: 4 upcoming café events with registration
- **Trending Posts**: Popular content highlighted
- **Hashtags**: #SweetMoments, #CookieLove, #CafeVibes, etc.

### Engagement Features
- **Like System**: Toggle like/unlike with visual feedback
- **Comment System**: Comment counts and input (UI ready)
- **Share System**: Share functionality (UI ready)
- **Rating Display**: 1-5 stars for reviews
- **Post Details**: Expandable modal for full post view

For detailed Community documentation, see [COMMUNITY_DOCUMENTATION.md](./COMMUNITY_DOCUMENTATION.md)

## About Us Page

### Brand Story
- **Introduction**: Welcoming message and brand purpose
- **Our Story**: Complete narrative from founding to present
- **Mission & Vision**: Clear statements with objectives
- **Timeline**: 6 key milestones from 2014-2024

### Values & Differentiation
- **Our Values**: 4 core values with icons (Quality, Love, Freshness, Satisfaction)
- **Why Choose Us**: 6 unique selling points
- **Statistics**: Key metrics (10+ years, 50+ recipes, 10K+ customers)

### Team & Trust
- **Team Section**: 4 team members with photos and bios
- **Visual Elements**: High-quality images throughout
- **Call to Action**: 3 prominent CTAs (Menu, Community, Visit)

For detailed About Us documentation, see [ABOUT_US_DOCUMENTATION.md](./ABOUT_US_DOCUMENTATION.md)

## Contact Page

### Contact Information
- **4 Info Cards**: Address, Phone, Email, Opening Hours
- **Visual Icons**: Map pin, phone, mail, clock
- **Quick Access**: All essential contact details

### Contact Form
- **4 Fields**: Name, Email, Subject, Message
- **Validation**: Required field validation
- **Success Feedback**: Confirmation message
- **Auto-Reset**: Form clears after submission

### Additional Features
- **Interactive Map**: Google Maps integration
- **Social Media**: 4 platform links (Facebook, Instagram, Twitter, YouTube)
- **FAQ Section**: 8 common questions with accordion
- **Call-to-Action**: Multiple contact methods
- **Responsive**: Optimized for all devices

For detailed Contact documentation, see [CONTACT_COMPLETION.md](./CONTACT_COMPLETION.md)

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

---

## 📚 Additional Documentation

For more detailed information, check out these documentation files:

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[MENU_DOCUMENTATION.md](./MENU_DOCUMENTATION.md)** - Complete menu system guide
- **[FEATURES_CHECKLIST.md](./FEATURES_CHECKLIST.md)** - All implemented features
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Project overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[VISUAL_GUIDE.md](./VISUAL_GUIDE.md)** - Visual layout guide
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Documentation index
- **[PROJECT_COMPLETION.md](./PROJECT_COMPLETION.md)** - Completion summary
