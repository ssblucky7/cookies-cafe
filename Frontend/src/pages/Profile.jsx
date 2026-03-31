import { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiPackage, FiAward } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authAPI, ordersAPI } from '../services/apiService';
import ImageUpload from '../components/upload/ImageUpload';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const { data } = await ordersAPI.getMyOrders();
      setOrders(data.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (uploadResult) => {
    try {
      await authAPI.updateProfile({ avatarUrl: uploadResult.url });
      window.location.reload();
    } catch (error) {
      console.error('Avatar update failed:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user?.avatarUrl || 'https://via.placeholder.com/150'}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-darkBrown">{user?.name}</h1>
              <p className="text-brown">{user?.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-caramel text-white px-3 py-1 rounded-full text-sm">
                  {user?.role || 'Customer'}
                </span>
                <span className="flex items-center gap-1 text-brown">
                  <FiAward className="text-caramel" />
                  {user?.loyaltyPoints || 0} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-caramel text-white'
                  : 'text-brown hover:bg-cream'
              }`}
            >
              <FiUser className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'orders'
                  ? 'bg-caramel text-white'
                  : 'text-brown hover:bg-cream'
              }`}
            >
              <FiPackage className="inline mr-2" />
              Orders
            </button>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Avatar Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-darkBrown mb-4">Profile Picture</h3>
                  <ImageUpload
                    onUploadSuccess={handleAvatarUpload}
                    folder="cookies-cafe/avatars"
                    maxSize={2}
                    preview={false}
                  />
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-darkBrown">Personal Information</h3>
                    {!editing ? (
                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 text-caramel hover:text-brown"
                      >
                        <FiEdit2 /> Edit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 btn-primary"
                      >
                        <FiSave /> {loading ? 'Saving...' : 'Save'}
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-brown font-semibold mb-2">
                      <FiUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-brown font-semibold mb-2">
                      <FiMail className="inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-2 border border-brown rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-brown font-semibold mb-2">
                      <FiPhone className="inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!editing}
                      className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-brown font-semibold mb-2">
                      <FiMapPin className="inline mr-2" />
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      disabled={!editing}
                      rows="3"
                      className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel disabled:bg-gray-100"
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-darkBrown mb-4">Order History</h3>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FiPackage className="mx-auto text-brown mb-4" size={64} />
                    <p className="text-brown text-lg">No orders yet</p>
                    <a href="/menu" className="btn-primary inline-block mt-4">
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-brown rounded-lg p-4 hover:shadow-lg transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-darkBrown">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-brown">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-brown">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="text-darkBrown font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <span className="text-brown font-semibold">Total:</span>
                          <span className="text-xl font-bold text-caramel">
                            ${order.totalAmount}
                          </span>
                        </div>

                        <a
                          href={`/orders/${order.id}`}
                          className="block text-center mt-3 text-caramel hover:text-brown font-semibold"
                        >
                          View Details →
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
