import express from 'express';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Overall system health check
router.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    services: {},
    memory: {},
    cpu: {},
  };

  try {
    // Check database connection
    const dbStart = Date.now();
    await sequelize.authenticate();
    const dbDuration = Date.now() - dbStart;
    health.services.database = {
      status: 'connected',
      responseTime: `${dbDuration}ms`,
    };
  } catch (error) {
    health.services.database = {
      status: 'disconnected',
      error: error.message,
    };
    health.status = 'ERROR';
  }

  // Memory usage
  const memUsage = process.memoryUsage();
  health.memory = {
    rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
  };

  // CPU usage
  const cpuUsage = process.cpuUsage();
  health.cpu = {
    user: `${(cpuUsage.user / 1000000).toFixed(2)}s`,
    system: `${(cpuUsage.system / 1000000).toFixed(2)}s`,
  };

  const statusCode = health.status === 'OK' ? 200 : 503;
  
  // Log health check
  if (health.status !== 'OK') {
    logger.warn('Health check failed', health);
  }

  res.status(statusCode).json(health);
});

// Readiness probe - checks if app is ready to receive traffic
router.get('/health/ready', async (req, res) => {
  try {
    // Check database
    await sequelize.authenticate();
    
    // All checks passed
    res.status(200).json({
      ready: true,
      timestamp: Date.now(),
      message: 'Application is ready to receive traffic',
    });
  } catch (error) {
    logger.error('Readiness check failed', { error: error.message });
    res.status(503).json({
      ready: false,
      timestamp: Date.now(),
      error: error.message,
      message: 'Application is not ready',
    });
  }
});

// Liveness probe - checks if app is alive
router.get('/health/live', (req, res) => {
  res.status(200).json({
    alive: true,
    timestamp: Date.now(),
    uptime: process.uptime(),
    message: 'Application is alive',
  });
});

// Detailed health check with all services
router.get('/health/detailed', async (req, res) => {
  const detailed = {
    timestamp: Date.now(),
    uptime: {
      seconds: Math.floor(process.uptime()),
      formatted: formatUptime(process.uptime()),
    },
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    services: {},
    memory: {},
    cpu: {},
    disk: {},
  };

  // Database check
  try {
    const dbStart = Date.now();
    await sequelize.authenticate();
    const dbDuration = Date.now() - dbStart;
    
    const [results] = await sequelize.query('SELECT COUNT(*) as count FROM "Users"');
    
    detailed.services.database = {
      status: 'connected',
      responseTime: `${dbDuration}ms`,
      userCount: results[0].count,
      dialect: sequelize.getDialect(),
    };
  } catch (error) {
    detailed.services.database = {
      status: 'error',
      error: error.message,
    };
  }

  // Memory details
  const memUsage = process.memoryUsage();
  detailed.memory = {
    rss: {
      bytes: memUsage.rss,
      formatted: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    },
    heapUsed: {
      bytes: memUsage.heapUsed,
      formatted: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      percentage: `${((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2)}%`,
    },
    heapTotal: {
      bytes: memUsage.heapTotal,
      formatted: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    },
    external: {
      bytes: memUsage.external,
      formatted: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
    },
  };

  // CPU details
  const cpuUsage = process.cpuUsage();
  detailed.cpu = {
    user: {
      microseconds: cpuUsage.user,
      formatted: `${(cpuUsage.user / 1000000).toFixed(2)}s`,
    },
    system: {
      microseconds: cpuUsage.system,
      formatted: `${(cpuUsage.system / 1000000).toFixed(2)}s`,
    },
  };

  res.status(200).json(detailed);
});

// Database-specific health check
router.get('/health/database', async (req, res) => {
  try {
    const start = Date.now();
    await sequelize.authenticate();
    const duration = Date.now() - start;

    const [userCount] = await sequelize.query('SELECT COUNT(*) as count FROM "Users"');
    const [productCount] = await sequelize.query('SELECT COUNT(*) as count FROM "Products"');
    const [orderCount] = await sequelize.query('SELECT COUNT(*) as count FROM "Orders"');

    res.status(200).json({
      status: 'connected',
      responseTime: `${duration}ms`,
      dialect: sequelize.getDialect(),
      database: sequelize.getDatabaseName(),
      statistics: {
        users: userCount[0].count,
        products: productCount[0].count,
        orders: orderCount[0].count,
      },
    });
  } catch (error) {
    logger.error('Database health check failed', { error: error.message });
    res.status(503).json({
      status: 'error',
      error: error.message,
    });
  }
});

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(' ') || '0s';
}

export default router;
