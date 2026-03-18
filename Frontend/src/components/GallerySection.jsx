import { useState } from 'react'

const GallerySection = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBrown mb-4">Our Story</h2>
          <p className="text-brown max-w-2xl mx-auto">
            Every cookie tells a story. Explore our journey through moments captured in time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(image)}
              className="relative overflow-hidden rounded-lg cursor-pointer group aspect-square"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 transition font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          >
            <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-full rounded-lg" />
          </div>
        )}
      </div>
    </section>
  )
}

export default GallerySection
