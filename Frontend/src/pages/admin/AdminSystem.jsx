import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { FiActivity, FiDatabase, FiServer, FiCpu, FiRefreshCw } from 'react-icons/fi';

function AdminSystem() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.admin.getSystemHealth();
      setHealth(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load system health');
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  if (loading && !health) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">System Health</h1>
          <p className="text-gray-600 mt-1">Monitor system performance and status</p>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
        >
          <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {health && (
        <>
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">System Status</h3>
                <FiActivity className={`${health.status === 'healthy' ? 'text-green-500' : 'text-red-500'}`} size={24} />
              </div>
              <p className={`text-2xl font-bold ${health.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                {health.status.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600 mt-2">All systems operational</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Uptime</h3>
                <FiServer className="text-blue-500" size={24} />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatUptime(health.uptime)}
              </p>
              <p className="text-sm text-gray-600 mt-2">Server running time</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Database</h3>
                <FiDatabase className={`${health.database.status === 'connected' ? 'text-green-500' : 'text-red-500'}`} size={24} />
              </div>
              <p className={`text-2xl font-bold ${health.database.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
                {health.database.status.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600 mt-2">Latency: {health.database.latency}</p>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Memory Usage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">RSS (Resident Set Size)</p>
                <p className="text-2xl font-bold text-gray-800">{health.memory.rss}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Heap Used</p>
                <p className="text-2xl font-bold text-gray-800">{health.memory.heapUsed}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Heap Total</p>
                <p className="text-2xl font-bold text-gray-800">{health.memory.heapTotal}</p>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium text-gray-800">
                  {new Date(health.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Environment</span>
                <span className="font-medium text-gray-800">
                  {process.env.NODE_ENV || 'development'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Auto-refresh</span>
                <span className="font-medium text-gray-800">Every 30 seconds</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Database Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Connection Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Connection Status</span>
                    <span className={`text-sm font-medium ${health.database.status === 'connected' ? 'text-green-600' : 'text-red-600'}`}>
                      {health.database.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Time</span>
                    <span className="text-sm font-medium text-gray-800">{health.database.latency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminSystem;
