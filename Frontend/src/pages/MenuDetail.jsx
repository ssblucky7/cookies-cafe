import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar, FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { productsAPI, reviewsAPI, wishlistAPI } from '../services/apiService'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ReviewForm from '../components/reviews/ReviewForm'
import ReviewList from '../components/reviews/ReviewList'
import { sanitizeProduct, decodeImageUrl } from '../utils/imageUtils'

const MenuDetail = () => {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        // Fetch by slug instead of ID
        const { data } = await productsAPI.getBySlug(slug)
        const sanitizedProduct = sanitizeProduct(data.data)
        setProduct(sanitizedProduct)
        
        // Fetch related products using the product ID
        const { data: related } = await productsAPI.getRelated(sanitizedProduct.id)
        const sanitizedRelated = related.data.map(p => sanitizeProduct(p))
        setRelatedProducts(sanitizedRelated.slice(0, 4))

        // Fetch reviews
        fetchReviews(sanitizedProduct.id)

        // Check wishlist status
        if (user) {
          checkWishlistStatus(sanitizedProduct.id)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug, user])

  const fetchReviews = async (productId) => {
    try {
      setReviewsLoading(true)
      const { data } = await reviewsAPI.getByProduct(productId)
      setReviews(data.data || [])
    } catch (err) {
      console.error('Failed to load reviews:', err)
    } finally {
      setReviewsLoading(false)
    }
  }

  const handleReviewSubmitted = (newReview) => {
    setReviews([newReview, ...reviews])
    setActiveTab('reviews')
  }

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return

    try {
      await reviewsAPI.delete(reviewId)
      setReviews(reviews.filter(r => r.id !== reviewId))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete review')
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const checkWishlistStatus = async (productId) => {
    try {
      const { data } = await wishlistAPI.getAll()
      const inList = data.data?.some(item => item.productId === productId)
      setInWishlist(inList)
    } catch (err) {
      console.error('Failed to check wishlist:', err)
    }
  }

  const toggleWishlist = async () => {
    if (!user) {
      alert('Please login to add to wishlist')
      return
    }

    if (!product) return

    try {
      if (inWishlist) {
        await wishlistAPI.remove(product.id)
        setInWishlist(false)
      } else {
        await wishlistAPI.add(product.id)
        setInWishlist(true)
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update wishlist')
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error || !product) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Product not found'}</div>
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
                onError={(e) => {
                  console.error('Image load error:', product.name);
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                }}
              />
              {product.badge && (
                <span className="absolute top-4 right-4 bg-caramel text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.badge}
                </span>
              )}
              {product.isFeatured && (
                <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
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
                  <img 
                    src={img} 
                    alt={`View ${idx + 1}`} 
                    className="w-full h-20 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
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
                    fill={i < Math.floor(parseFloat(product.rating) || 0) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-brown">
                {parseFloat(product.rating || 0).toFixed(1)} ({product.numReviews || 0} reviews)
              </span>
            </div>

            <p className="text-brown mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-caramel">${product.price}</span>
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
              <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center justify-center gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
              <button 
                onClick={toggleWishlist}
                className={`border-2 px-6 py-3 rounded-lg transition ${
                  inWishlist 
                    ? 'bg-red-500 border-red-500 text-white hover:bg-red-600' 
                    : 'bg-white border-brown text-brown hover:bg-brown hover:text-white'
                }`}
              >
                <FiHeart size={24} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-white p-6 rounded-lg">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-brown">Category:</span>
                  <span className="font-semibold text-darkBrown capitalize">{product.category?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown">Availability:</span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brown">SKU:</span>
                  <span className="font-semibold text-darkBrown">{product.id.slice(0, 8)}</span>
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
                    <span className="text-brown capitalize">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-2xl font-semibold text-darkBrown mb-6">Customer Reviews</h3>
              
              {/* Review Stats */}
              <div className="bg-cream rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-caramel">
                      {parseFloat(product.rating || 0).toFixed(1)}
                    </div>
                    <div className="flex text-caramel justify-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} size={20} fill={i < Math.floor(parseFloat(product.rating) || 0) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-sm text-brown mt-1">{product.numReviews || 0} reviews</p>
                  </div>
                </div>
              </div>

              {/* Review Form */}
              <div className="mb-6">
                <ReviewForm productId={product.id} onReviewSubmitted={handleReviewSubmitted} />
              </div>

              {/* Reviews List */}
              {reviewsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caramel mx-auto"></div>
                </div>
              ) : (
                <ReviewList reviews={reviews} onDelete={handleDeleteReview} />
              )}
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
                  to={`/menu/${item.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-darkBrown mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-caramel">${item.price}</span>
                      <div className="flex text-caramel">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} size={14} fill={i < Math.floor(parseFloat(item.rating) || 0) ? 'currentColor' : 'none'} />
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
