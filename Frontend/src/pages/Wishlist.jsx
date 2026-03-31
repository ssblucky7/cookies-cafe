import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { wishlistAPI } from '../services/apiService'
import { decodeImageUrl } from '../utils/imageUtils'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await wishlistAPI.getAll();
      setWishlist(data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await wishlistAPI.remove(productId);
      setWishlist(wishlist.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Please Login</h2>
          <p className="text-gray-600 mb-4">Login to view your wishlist</p>
          <Link to="/login" className="bg-darkBrown text-white px-6 py-2 rounded-lg hover:bg-caramel transition">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkBrown mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <FiHeart className="text-3xl text-darkBrown" />
          <h1 className="text-3xl font-bold text-darkBrown">My Wishlist</h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Add products you love to your wishlist</p>
            <Link to="/menu" className="bg-darkBrown text-white px-6 py-3 rounded-lg hover:bg-caramel transition">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <Link to={`/menu/${item.product.slug}`}>
                  <img
                    src={decodeImageUrl(item.product.image)}
                    alt={item.product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/menu/${item.product.slug}`}>
                    <h3 className="font-bold text-lg mb-2 hover:text-caramel transition">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-darkBrown">
                        ${item.product.price}
                      </span>
                      {item.product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${item.product.oldPrice}
                        </span>
                      )}
                    </div>
                    {item.product.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {item.product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.product)}
                      className="flex-1 bg-darkBrown text-white py-2 rounded-lg hover:bg-caramel transition flex items-center justify-center gap-2"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
