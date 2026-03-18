import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar, FiZoomIn, FiZoomOut, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { menuData } from '../utils/menuData'

const MenuDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const foundProduct = menuData.find(p => p.id === parseInt(id))
    setProduct(foundProduct)
    
    if (foundProduct) {
      const related = menuData
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [id])

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const allMedia = [product.image, ...(product.gallery || [])]

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-brown">
          <Link to="/" className="hover:text-caramel">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/menu" className="hover:text-caramel">Menu</Link>
          <span className="mx-2">/</span>
          <span className="text-darkBrown">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden mb-4 group">
              <img
                src={allMedia[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 right-4 bg-caramel text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setShowZoom(true)}
                className="absolute bottom-4 right-4 bg-white p-3 rounded-full hover:bg-caramel hover:text-white transition opacity-0 group-hover:opacity-100"
              >
                <FiZoomIn size={20} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {allMedia.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'border-caramel' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-darkBrown mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-caramel">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={20}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-brown">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-brown mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-xl mr-3">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-4xl font-bold text-caramel">${product.price}</span>
              {product.oldPrice && (
                <span className="ml-3 text-green-600 font-semibold">
                  Save ${(product.oldPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-brown font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-white border border-brown px-4 py-2 rounded-lg hover:bg-brown hover:text-white transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-white border border-brown px-4 py-2 rounded-lg hover:bg-brown hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 btn-primary flex items-center justify-center gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
              <button className="bg-white border-2 border-brown text-brown px-6 py-3 rounded-lg hover:bg-brown hover:text-white transition">
                <FiHeart size={24} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-white p-6 rounded-lg">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brown">Category:</span>
                  <span className="font-semibold text-darkBrown capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown">Availability:</span>
                  <span className="font-semibold text-green-600">In Stock</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown">SKU:</span>
                  <span className="font-semibold text-darkBrown">CK-{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {['overview', 'ingredients', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-caramel border-b-2 border-caramel'
                    : 'text-brown hover:text-caramel'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-semibold text-darkBrown mb-4">Product Overview</h3>
              <p className="text-brown mb-4">{product.fullDescription || product.description}</p>
              <ul className="list-disc list-inside space-y-2 text-brown">
                <li>Freshly baked daily</li>
                <li>Made with premium ingredients</li>
                <li>Perfect for any occasion</li>
                <li>Can be customized for dietary needs</li>
              </ul>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div>
              <h3 className="text-2xl font-semibold text-darkBrown mb-4">Ingredients</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(product.ingredients || [
                  'Premium flour',
                  'Organic butter',
                  'Brown sugar',
                  'Free-range eggs',
                  'Vanilla extract',
                  'Baking soda',
                  'Salt',
                  'Chocolate chips'
                ]).map((ingredient, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-caramel rounded-full"></span>
                    <span className="text-brown">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-semibold text-darkBrown mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {(product.customerReviews || [
                  {
                    name: 'Sarah Johnson',
                    rating: 5,
                    date: '2024-01-15',
                    comment: 'Absolutely delicious! Best cookies I\'ve ever had.'
                  },
                  {
                    name: 'Mike Chen',
                    rating: 4,
                    date: '2024-01-10',
                    comment: 'Great taste and quality. Will order again!'
                  }
                ]).map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-darkBrown">{review.name}</h4>
                      <span className="text-sm text-brown">{review.date}</span>
                    </div>
                    <div className="flex text-caramel mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-brown">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-darkBrown mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(item => (
                <Link
                  key={item.id}
                  to={`/menu/${item.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-darkBrown mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-caramel">${item.price}</span>
                      <div className="flex text-caramel">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={14} fill={i < Math.floor(item.rating) ? 'currentColor' : 'none'} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Zoom Modal */}
        {showZoom && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 text-white hover:text-caramel"
            >
              <FiX size={32} />
            </button>
            
            <button
              onClick={() => setSelectedImage((selectedImage - 1 + allMedia.length) % allMedia.length)}
              className="absolute left-4 text-white hover:text-caramel"
            >
              <FiChevronLeft size={48} />
            </button>

            <img
              src={allMedia[selectedImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />

            <button
              onClick={() => setSelectedImage((selectedImage + 1) % allMedia.length)}
              className="absolute right-4 text-white hover:text-caramel"
            >
              <FiChevronRight size={48} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuDetail
