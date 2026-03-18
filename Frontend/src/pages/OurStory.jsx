import { useState } from 'react'
import { FiX } from 'react-icons/fi'

const OurStory = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600',
      alt: 'Freshly baked cookies',
      title: 'Fresh Baked Daily'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600',
      alt: 'Chocolate chip cookies',
      title: 'Classic Favorites'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600',
      alt: 'Cookie assortment',
      title: 'Variety Selection'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600',
      alt: 'Cookies on plate',
      title: 'Perfect Presentation'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600',
      alt: 'Café interior',
      title: 'Our Cozy Space'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
      alt: 'Coffee and cookies',
      title: 'Perfect Pairing'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600',
      alt: 'Baking process',
      title: 'Made with Love'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600',
      alt: 'Cookie ingredients',
      title: 'Quality Ingredients'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600',
      alt: 'Decorated cookies',
      title: 'Artistic Creations'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1590080876876-5a8e0c5e0d8f?w=600',
      alt: 'Cookie display',
      title: 'Beautiful Display'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      alt: 'Cookie jar',
      title: 'Sweet Storage'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
      alt: 'Special cookies',
      title: 'Unique Flavors'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-96 bg-darkBrown overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920"
          alt="Our Story"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Story</h1>
            <p className="text-xl md:text-2xl">A Journey of Passion & Sweetness</p>
          </div>
        </div>
      </section>

      {/* How We Begin Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Featured Image */}
            <div className="order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                  alt="How we began"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkBrown/50 to-transparent"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300"
                    alt="Baking"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300"
                    alt="Cookies"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300"
                    alt="Café"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-darkBrown mb-6">
                How We Begin
              </h2>
              <div className="space-y-6 text-brown text-lg leading-relaxed">
                <p>
                  Cookies Café started with a simple love for baking and sharing happiness. 
                  What began in a small kitchen soon grew into a place where every cookie is 
                  made with care and passion.
                </p>
                <p>
                  We believe cookies are more than just a treat—they bring joy, comfort, and 
                  sweet moments to everyday life. Our mission is simple: to make your day a 
                  little sweeter with every bite.
                </p>
                <p>
                  From our humble beginnings to becoming a beloved community gathering spot, 
                  we've stayed true to our core values: quality ingredients, traditional 
                  recipes, and a warm, welcoming atmosphere.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-caramel mb-2">10+</div>
                  <div className="text-sm text-brown">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-caramel mb-2">50+</div>
                  <div className="text-sm text-brown">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-caramel mb-2">10K+</div>
                  <div className="text-sm text-brown">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkBrown mb-4">Our Values</h2>
            <p className="text-brown text-lg">What makes us special</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🍪</span>
              </div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Quality First</h3>
              <p className="text-brown">
                We use only the finest ingredients to ensure every cookie is perfect.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Made with Love</h3>
              <p className="text-brown">
                Every cookie is handcrafted with care and passion by our skilled bakers.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Community</h3>
              <p className="text-brown">
                We're more than a café—we're a place where memories are made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Gallery Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-darkBrown mb-4">Our Gallery</h2>
            <p className="text-brown text-lg">
              Moments captured, memories made, and cookies shared
            </p>
          </div>

          {/* Gallery Grid - 4 columns on desktop, responsive on smaller screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 text-center">
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button (Optional) */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              View More Photos
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-caramel transition z-10"
          >
            <FiX size={32} />
          </button>

          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-white text-center text-xl mt-4 font-semibold">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-lg mb-8 text-cream">
            Visit us today and experience the warmth, flavor, and joy that make 
            Cookies Café special. We can't wait to share our passion with you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-caramel hover:bg-cream hover:text-brown text-white px-8 py-3 rounded-lg transition font-semibold">
              Visit Our Café
            </button>
            <button className="bg-white text-brown hover:bg-cream px-8 py-3 rounded-lg transition font-semibold">
              View Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurStory
