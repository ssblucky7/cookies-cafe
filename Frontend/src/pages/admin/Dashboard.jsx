import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { 
  FiUsers, FiShoppingBag, FiShoppingCart, FiDollarSign,
  FiTrendingUp, FiAlertCircle, FiPackage, FiMessageSquare
} from 'react-icons/fi';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiService.admin.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button onClick={fetchStats} className="mt-2 text-red-700 underline">
          Try Again
        </button>
      </div>
    );
  }

  const { overview, recentOrders, ordersByStatus, topProducts, lowStockProducts, recentUsers } = stats || {};

  if (!overview) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-600">No data available</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${overview.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'bg-green-500',
      change: '+12.5%',
      link: '/admin/orders'
    },
    {
      title: 'Total Orders',
      value: overview.totalOrders.toLocaleString(),
      icon: FiShoppingCart,
      color: 'bg-blue-500',
      change: '+8.2%',
      link: '/admin/orders'
    },
    {
      title: 'Total Users',
      value: overview.totalUsers.toLocaleString(),
      icon: FiUsers,
      color: 'bg-purple-500',
      change: '+15.3%',
      link: '/admin/users'
    },
    {
      title: 'Total Products',
      value: overview.totalProducts.toLocaleString(),
      icon: FiShoppingBag,
      color: 'bg-amber-500',
      change: '+5.1%',
      link: '/admin/products'
    },
  ];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <FiTrendingUp className="mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pending Orders</h3>
            <FiShoppingCart className="text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{overview.pendingOrders}</p>
          <p className="text-sm text-gray-600 mt-2">
            ${overview.pendingRevenue.toLocaleString()} pending
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Avg Order Value</h3>
            <FiDollarSign className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">${overview.avgOrderValue.toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-2">Per transaction</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
            <FiAlertCircle className="text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{lowStockProducts.length}</p>
          <p className="text-sm text-gray-600 mt-2">
            {overview.outOfStockProducts} out of stock
          </p>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ordersByStatus.map((status, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{status.count}</p>
              <p className="text-sm text-gray-600 capitalize mt-1">{status.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm text-amber-600 hover:text-amber-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {order.user?.name || 'Guest'}
                  </p>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">${order.totalPrice}</p>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
            <Link to="/admin/products" className="text-sm text-amber-600 hover:text-amber-700">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.totalSold} sold</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">${product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FiAlertCircle className="text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-red-800">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="flex items-center p-3 bg-white rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-red-600">Only {product.stock} left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
          <Link to="/admin/users" className="text-sm text-amber-600 hover:text-amber-700">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.slice(0, 5).map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
