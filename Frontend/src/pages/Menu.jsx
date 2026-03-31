import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar, FiFilter, FiX } from 'react-icons/fi'
import { menuData } from '../utils/menuData'

const Menu = () => {
  const [products, setProducts] = useState(menuData)
  const [filteredProducts, setFilteredProducts] = useState(menuData)
  const [sortBy, setSortBy] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50])
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['all', 'chocolate', 'classic', 'special', 'seasonal', 'vegan']

  useEffect(() => {
    let filtered = [...products]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [sortBy, selectedCategory, priceRange, products])

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Hot': return 'bg-red-500'
      case 'New': return 'bg-green-500'
      case 'Sale': return 'bg-orange-500'
      case 'Offer': return 'bg-purple-500'
      case 'Discount': return 'bg-yellow-500 text-darkBrown'
      default: return 'bg-caramel'
    }
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-darkBrown mb-4">Our Menu</h1>
          <p className="text-brown">Discover our delicious selection of handcrafted cookies</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 btn-primary"
          >
            <FiFilter /> Filters
          </button>

          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-brown font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          <div className="text-brown">
            Showing {filteredProducts.length} of {products.length} items
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white p-6 rounded-lg shadow-lg h-fit`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-darkBrown">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="md:hidden">
                <FiX />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-brown mb-3">Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel bg-white capitalize"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="capitalize">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-brown mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all')
                setPriceRange([0, 50])
              }}
              className="w-full btn-secondary text-sm"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/menu/${product.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                    />
                    {product.badge && (
                      <span className={`absolute top-4 right-4 ${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('Added to wishlist')
                      }}
                      className="absolute top-4 left-4 bg-white p-2 rounded-full hover:bg-caramel hover:text-white transition"
                    >
                      <FiHeart size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-darkBrown mb-2">{product.name}</h3>
                    <p className="text-brown text-sm mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-caramel">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            size={16}
                            fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brown">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through text-sm mr-2">
                            ${product.oldPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-caramel">${product.price}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          console.log('Added to cart')
                        }}
                        className="bg-brown hover:bg-darkBrown text-white p-3 rounded-lg transition"
                      >
                        <FiShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-brown text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
