import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import GallerySection from '../components/GallerySection'
import ReviewSection from '../components/ReviewSection'
import ConnectSection from '../components/ConnectSection'
import LocationSection from '../components/LocationSection'

const Home = () => {
  const heroSlides = [
    {
      type: 'video',
      src: 'https://cdn.pixabay.com/video/2022/08/01/126339-736581965_large.mp4',
      title: 'Welcome to Cookies Café',
      description: 'Handcrafted cookies made with love',
      button: 'Order Now'
    }
  ]

  const products = [
    {
      id: 1,
      name: 'Chocolate Chip',
      description: 'Classic chocolate chip cookies',
      price: 4.99,
      oldPrice: 6.99,
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
      badge: 'Hot'
    },
    {
      id: 2,
      name: 'Double Chocolate',
      description: 'Rich double chocolate delight',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Oatmeal Raisin',
      description: 'Healthy and delicious',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500'
    },
    {
      id: 4,
      name: 'Peanut Butter',
      description: 'Creamy peanut butter cookies',
      price: 5.49,
      oldPrice: 6.49,
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500',
      badge: 'Sale'
    }
  ]

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', alt: 'Cookie 1', title: 'Fresh Baked' },
    { src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400', alt: 'Cookie 2', title: 'Chocolate Delight' },
    { src: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400', alt: 'Cookie 3', title: 'Sweet Treats' },
    { src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400', alt: 'Cookie 4', title: 'Artisan Cookies' },
    { src: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400', alt: 'Cafe', title: 'Our Café' },
    { src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', alt: 'Coffee', title: 'Premium Coffee' },
    { src: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400', alt: 'Interior', title: 'Cozy Interior' },
    { src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400', alt: 'Baking', title: 'Baking Process' }
  ]

  const reviews = [
    {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Best cookies in town! The chocolate chip is absolutely divine.',
      product: 'Chocolate Chip'
    },
    {
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      comment: 'Amazing quality and great service. Will definitely come back!',
      product: 'Double Chocolate'
    },
    {
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      comment: 'Love the cozy atmosphere and delicious treats.',
      product: 'Oatmeal Raisin'
    },
    {
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?img=4',
      rating: 5,
      comment: 'Perfect spot for coffee and cookies. Highly recommend!',
      product: 'Peanut Butter'
    }
  ]

  return (
    <div>
      <HeroSection slides={heroSlides} />
      <FeaturedSection products={products} />
      <GallerySection images={galleryImages} />
      <ReviewSection reviews={reviews} />
      <ConnectSection />
      <LocationSection />
    </div>
  )
}

export default Home
