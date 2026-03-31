import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { decodeImageUrl } from '../utils/imageUtils'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FiShoppingBag className="mx-auto text-brown mb-4" size={80} />
          <h1 className="text-3xl font-bold text-darkBrown mb-4">Your Cart is Empty</h1>
          <p className="text-brown mb-6">Add some delicious cookies to get started!</p>
          <Link to="/menu" className="btn-primary inline-block">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-darkBrown">Shopping Cart</h1>
          <Link to="/menu" className="text-caramel hover:underline flex items-center gap-2">
            <FiArrowLeft /> Continue Shopping
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-4 flex gap-4">
                <img
                  src={decodeImageUrl(item.image)}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-darkBrown">{item.name}</h3>
                  <p className="text-brown text-sm mb-2">{item.description}</p>
                  <p className="text-xl font-bold text-caramel">${item.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={20} />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-cream px-3 py-1 rounded hover:bg-brown hover:text-white"
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-cream px-3 py-1 rounded hover:bg-brown hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold text-darkBrown">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-darkBrown mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-brown">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brown">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between text-brown">
                  <span>Tax (10%)</span>
                  <span>${(getTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-brown pt-3 flex justify-between text-xl font-bold text-darkBrown">
                  <span>Total</span>
                  <span>${(getTotal() + 5 + getTotal() * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/menu"
                className="block text-center text-caramel hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
