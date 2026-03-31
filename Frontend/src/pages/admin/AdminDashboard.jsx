import { useState, useEffect } from 'react';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp, FiPackage, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/apiService';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const { data } = await adminAPI.getStats();
      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-caramel"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.overview?.totalRevenue || '0.00'}`,
      icon: FiDollarSign,
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats?.overview?.totalOrders || 0,
      icon: FiShoppingBag,
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Users',
      value: stats?.overview?.totalUsers || 0,
      icon: FiUsers,
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Products',
      value: stats?.overview?.totalProducts || 0,
      icon: FiPackage,
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-darkBrown">Admin Dashboard</h1>
          <p className="text-brown mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg shadow-lg p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-brown font-semibold mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-darkBrown">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <stat.icon size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-darkBrown mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/products')}
              className="bg-caramel text-white px-6 py-4 rounded-lg hover:bg-brown transition font-semibold"
            >
              Manage Products
            </button>
            <button
              onClick={() => navigate('/admin/orders')}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/admin/users')}
              className="bg-purple-600 text-white px-6 py-4 rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Manage Users
            </button>
            <button
              onClick={() => navigate('/admin/community')}
              className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Community Posts
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-darkBrown mb-4">Recent Orders</h2>
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-brown font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 text-brown font-semibold">Customer</th>
                    <th className="text-left py-3 px-4 text-brown font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 text-brown font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-brown font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-cream transition">
                      <td className="py-3 px-4 text-darkBrown font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="py-3 px-4 text-darkBrown">{order.user?.name || 'Guest'}</td>
                      <td className="py-3 px-4 text-darkBrown font-semibold">${order.totalAmount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brown text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-brown text-center py-8">No recent orders</p>
          )}
        </div>

        {/* Order Status Breakdown */}
        {stats?.ordersByStatus && stats.ordersByStatus.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-darkBrown mb-4">Orders by Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.ordersByStatus.map((item) => (
                <div key={item.status} className="bg-cream rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-darkBrown">{item.count}</p>
                  <p className="text-sm text-brown capitalize">{item.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
