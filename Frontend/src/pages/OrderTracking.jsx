import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { ordersAPI } from '../services/apiService';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await ordersAPI.getById(id);
      setOrder(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order');
      setLoading(false);
    }
  };

  const getStepStatus = (currentStatus, stepStatus) => {
    const statusOrder = ['received', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);
    
    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepIndex <= currentIndex) return 'completed';
    if (stepIndex === currentIndex + 1) return 'active';
    return 'pending';
  };

  const getStatusIcon = (status, stepStatus) => {
    const state = getStepStatus(status, stepStatus);
    
    if (state === 'completed') {
      return <FiCheckCircle className="text-green-600" size={32} />;
    } else if (state === 'active') {
      return <FiClock className="text-caramel animate-pulse" size={32} />;
    } else if (state === 'cancelled') {
      return <FiPackage className="text-red-600" size={32} />;
    }
    return <FiPackage className="text-gray-400" size={32} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-caramel mx-auto mb-4"></div>
          <p className="text-brown">Loading order...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <FiPackage className="mx-auto text-brown mb-4" size={64} />
          <h2 className="text-2xl font-bold text-darkBrown mb-2">Order Not Found</h2>
          <p className="text-brown mb-6">{error}</p>
          <Link to="/profile" className="btn-primary">
            View All Orders
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { status: 'received', label: 'Order Received', description: 'We received your order' },
    { status: 'preparing', label: 'Preparing', description: 'Your order is being prepared' },
    { status: 'ready', label: 'Ready', description: 'Your order is ready' },
    { status: 'delivered', label: 'Delivered', description: 'Order completed' }
  ];

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-darkBrown mb-2">
                Order #{order.id.slice(0, 8)}
              </h1>
              <p className="text-brown">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold ${
              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          {order.estimatedTime && order.status !== 'delivered' && (
            <div className="bg-caramel bg-opacity-10 border border-caramel rounded-lg p-4">
              <p className="text-brown">
                <FiClock className="inline mr-2" />
                Estimated ready time: <span className="font-semibold">{order.estimatedTime} minutes</span>
              </p>
            </div>
          )}
        </div>

        {/* Order Status Stepper */}
        {order.status !== 'cancelled' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-darkBrown mb-6">Order Status</h2>
            
            <div className="relative">
              {steps.map((step, index) => {
                const state = getStepStatus(order.status, step.status);
                
                return (
                  <div key={step.status} className="relative">
                    <div className="flex items-center mb-8">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                        state === 'completed' ? 'bg-green-100' :
                        state === 'active' ? 'bg-yellow-100' :
                        'bg-gray-100'
                      }`}>
                        {getStatusIcon(order.status, step.status)}
                      </div>

                      {/* Content */}
                      <div className="ml-6 flex-1">
                        <h3 className={`text-lg font-semibold ${
                          state === 'completed' || state === 'active' ? 'text-darkBrown' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </h3>
                        <p className={`text-sm ${
                          state === 'completed' || state === 'active' ? 'text-brown' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>

                      {/* Checkmark */}
                      {state === 'completed' && (
                        <FiCheckCircle className="text-green-600" size={24} />
                      )}
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className={`absolute left-8 top-16 w-0.5 h-8 ${
                        state === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-darkBrown mb-4">Order Items</h2>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-darkBrown">{item.name}</h3>
                    <p className="text-sm text-brown">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-caramel">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-brown">
              <span>Subtotal</span>
              <span>${order.totalAmount}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${order.discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-darkBrown pt-2 border-t">
              <span>Total</span>
              <span>${order.finalAmount || order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-darkBrown mb-4">Delivery Information</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FiTruck className="text-caramel mt-1" size={20} />
              <div>
                <p className="font-semibold text-darkBrown">Delivery Type</p>
                <p className="text-brown capitalize">{order.deliveryType || 'Pickup'}</p>
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="flex items-start gap-3">
                <FiMapPin className="text-caramel mt-1" size={20} />
                <div>
                  <p className="font-semibold text-darkBrown">Delivery Address</p>
                  <p className="text-brown">{order.deliveryAddress}</p>
                </div>
              </div>
            )}

            {order.notes && (
              <div className="flex items-start gap-3">
                <FiMail className="text-caramel mt-1" size={20} />
                <div>
                  <p className="font-semibold text-darkBrown">Order Notes</p>
                  <p className="text-brown">{order.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link to="/profile" className="flex-1 text-center bg-white border-2 border-brown text-brown px-6 py-3 rounded-lg hover:bg-brown hover:text-white transition font-semibold">
            View All Orders
          </Link>
          <Link to="/menu" className="flex-1 btn-primary text-center">
            Order Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
