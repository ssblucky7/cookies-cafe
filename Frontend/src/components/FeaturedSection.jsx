import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { decodeImageUrl } from '../utils/imageUtils'

const FeaturedSection = ({ products }) => {
  const { addToCart } = useCart()

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBrown mb-4">Featured Menu</h2>
          <p className="text-brown">Discover our most popular cookies and special offers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
              <Link to={`/menu/${product.slug}`} className="relative overflow-hidden block">
                <img 
                  src={decodeImageUrl(product.image)} 
                  alt={product.name} 
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
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
              </Link>
              
              <div className="p-6">
                <Link to={`/menu/${product.slug}`}>
                  <h3 className="text-xl font-semibold text-darkBrown mb-2 hover:text-caramel">{product.name}</h3>
                </Link>
                <p className="text-brown text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-caramel">${product.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-brown hover:bg-darkBrown text-white p-3 rounded-lg transition"
                  >
                    <FiShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
