import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCreditCard, FiMapPin, FiUser } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../services/apiService'

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    phone: user?.phone || '',
    paymentMethod: 'cash'
  })

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const subtotal = getTotal()
      const shipping = 5
      const tax = subtotal * 0.1
      const total = subtotal + shipping + tax

      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        phone: formData.phone,
        paymentMethod: formData.paymentMethod
      }

      await ordersAPI.create(orderData)
      clearCart()
      navigate('/order-success')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-darkBrown mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-darkBrown mb-4 flex items-center gap-2">
                  <FiUser /> Customer Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-brown font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      disabled
                      className="w-full px-4 py-2 border border-brown rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-brown font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-brown rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-brown font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-darkBrown mb-4 flex items-center gap-2">
                  <FiMapPin /> Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-brown font-semibold mb-2">Street Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-brown font-semibold mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-brown font-semibold mb-2">Postal Code</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-darkBrown mb-4 flex items-center gap-2">
                  <FiCreditCard /> Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-brown">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span className="text-brown">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-darkBrown mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brown">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-darkBrown font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-brown pt-3 space-y-2">
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
                <div className="border-t border-brown pt-2 flex justify-between text-xl font-bold text-darkBrown">
                  <span>Total</span>
                  <span>${(getTotal() + 5 + getTotal() * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
