import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <FiCheckCircle className="mx-auto text-green-600 mb-6" size={100} />
        <h1 className="text-4xl font-bold text-darkBrown mb-4">Order Placed Successfully!</h1>
        <p className="text-brown text-lg mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-darkBrown mb-4">What's Next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <span className="bg-caramel text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-darkBrown">Order Confirmation</h3>
                <p className="text-brown text-sm">You'll receive an email with your order details</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-caramel text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-darkBrown">Preparation</h3>
                <p className="text-brown text-sm">We'll start preparing your delicious cookies</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-caramel text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-darkBrown">Delivery</h3>
                <p className="text-brown text-sm">Your order will be delivered to your address</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/menu" className="bg-white border-2 border-brown text-brown px-6 py-3 rounded-lg hover:bg-brown hover:text-white transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
