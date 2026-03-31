import logger from '../utils/logger.js';
import os from 'os';

// Request duration tracking middleware
export const requestMonitoring = (req, res, next) => {
  const start = Date.now();
  const startMemory = process.memoryUsage();

  // Capture response
  res.on('finish', () => {
    const duration = Date.now() - start;
    const endMemory = process.memoryUsage();
    const memoryDelta = endMemory.heapUsed - startMemory.heapUsed;

    // Log request details
    logger.access(req, res, duration);

    // Log detailed info for slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        method: req.method,
        url: req.originalUrl,
        duration: `${duration}ms`,
        statusCode: res.statusCode,
        memoryDelta: `${(memoryDelta / 1024 / 1024).toFixed(2)} MB`,
        ip: req.ip,
        userId: req.user?.id,
      });
    }

    // Log errors
    if (res.statusCode >= 400) {
      logger.warn('Request failed', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userId: req.user?.id,
      });
    }
  });

  next();
};

// Memory usage monitoring
export const memoryMonitoring = () => {
  const checkMemory = () => {
    const memUsage = process.memoryUsage();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    const metrics = {
      process: {
        rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        external: `${(memUsage.external / 1024 / 1024).toFixed(2)} MB`,
        heapUsedPercent: `${((memUsage.heapUsed / memUsage.heapTotal) * 100).toFixed(2)}%`,
      },
      system: {
        total: `${(totalMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
        free: `${(freeMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
        used: `${(usedMemory / 1024 / 1024 / 1024).toFixed(2)} GB`,
        usedPercent: `${((usedMemory / totalMemory) * 100).toFixed(2)}%`,
      },
    };

    logger.performance('Memory Usage', metrics);

    // Alert if memory usage is high
    if (memUsage.heapUsed / memUsage.heapTotal > 0.9) {
      logger.warn('High memory usage detected', metrics);
    }

    // Alert if system memory is low
    if (freeMemory / totalMemory < 0.1) {
      logger.warn('Low system memory', metrics);
    }
  };

  // Check memory every 5 minutes
  setInterval(checkMemory, 5 * 60 * 1000);
  
  // Initial check
  checkMemory();
};

// CPU usage monitoring
export const cpuMonitoring = () => {
  let lastCpuUsage = process.cpuUsage();
  let lastTime = Date.now();

  const checkCPU = () => {
    const currentCpuUsage = process.cpuUsage(lastCpuUsage);
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;

    const cpuPercent = {
      user: ((currentCpuUsage.user / 1000 / timeDiff) * 100).toFixed(2),
      system: ((currentCpuUsage.system / 1000 / timeDiff) * 100).toFixed(2),
    };

    const cpuInfo = {
      cores: os.cpus().length,
      model: os.cpus()[0].model,
      usage: cpuPercent,
      loadAverage: os.loadavg().map(load => load.toFixed(2)),
    };

    logger.performance('CPU Usage', cpuInfo);

    // Alert if CPU usage is high
    if (parseFloat(cpuPercent.user) > 80 || parseFloat(cpuPercent.system) > 80) {
      logger.warn('High CPU usage detected', cpuInfo);
    }

    lastCpuUsage = process.cpuUsage();
    lastTime = currentTime;
  };

  // Check CPU every 5 minutes
  setInterval(checkCPU, 5 * 60 * 1000);
  
  // Initial check
  setTimeout(checkCPU, 10000); // Wait 10 seconds for initial measurement
};

// Request rate monitoring
class RequestRateMonitor {
  constructor() {
    this.requests = [];
    this.windowSize = 60000; // 1 minute window
  }

  addRequest() {
    const now = Date.now();
    this.requests.push(now);
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowSize);
  }

  getRate() {
    return this.requests.length;
  }

  getStats() {
    const rate = this.getRate();
    return {
      requestsPerMinute: rate,
      requestsPerSecond: (rate / 60).toFixed(2),
    };
  }
}

const requestRateMonitor = new RequestRateMonitor();

export const requestRateTracking = (req, res, next) => {
  requestRateMonitor.addRequest();
  next();
};

export const logRequestRate = () => {
  setInterval(() => {
    const stats = requestRateMonitor.getStats();
    logger.performance('Request Rate', stats);

    // Alert if request rate is very high
    if (stats.requestsPerMinute > 1000) {
      logger.warn('High request rate detected', stats);
    }
  }, 60000); // Every minute
};

// Database connection monitoring
export const databaseMonitoring = (sequelize) => {
  const checkDatabase = async () => {
    try {
      const start = Date.now();
      await sequelize.authenticate();
      const duration = Date.now() - start;

      logger.performance('Database Connection', {
        status: 'connected',
        responseTime: `${duration}ms`,
      });

      // Alert if database is slow
      if (duration > 1000) {
        logger.warn('Slow database connection', {
          responseTime: `${duration}ms`,
        });
      }
    } catch (error) {
      logger.error('Database connection failed', {
        error: error.message,
      });
    }
  };

  // Check database every 5 minutes
  setInterval(checkDatabase, 5 * 60 * 1000);
  
  // Initial check
  checkDatabase();
};

// Application uptime monitoring
export const uptimeMonitoring = () => {
  const startTime = Date.now();

  const logUptime = () => {
    const uptime = process.uptime();
    const uptimeFormatted = {
      seconds: Math.floor(uptime),
      minutes: Math.floor(uptime / 60),
      hours: Math.floor(uptime / 3600),
      days: Math.floor(uptime / 86400),
    };

    logger.info('Application Uptime', uptimeFormatted);
  };

  // Log uptime every hour
  setInterval(logUptime, 60 * 60 * 1000);
};

// Error rate monitoring
class ErrorRateMonitor {
  constructor() {
    this.errors = [];
    this.windowSize = 60000; // 1 minute window
  }

  addError(statusCode) {
    const now = Date.now();
    this.errors.push({ time: now, statusCode });
    
    // Remove old errors outside the window
    this.errors = this.errors.filter(error => now - error.time < this.windowSize);
  }

  getStats() {
    const total = this.errors.length;
    const by4xx = this.errors.filter(e => e.statusCode >= 400 && e.statusCode < 500).length;
    const by5xx = this.errors.filter(e => e.statusCode >= 500).length;

    return {
      totalErrors: total,
      clientErrors: by4xx,
      serverErrors: by5xx,
      errorRate: `${total} errors/min`,
    };
  }
}

const errorRateMonitor = new ErrorRateMonitor();

export const errorRateTracking = (req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode >= 400) {
      errorRateMonitor.addError(res.statusCode);
    }
  });
  next();
};

export const logErrorRate = () => {
  setInterval(() => {
    const stats = errorRateMonitor.getStats();
    
    if (stats.totalErrors > 0) {
      logger.performance('Error Rate', stats);

      // Alert if error rate is high
      if (stats.totalErrors > 50) {
        logger.warn('High error rate detected', stats);
      }
    }
  }, 60000); // Every minute
};

// Initialize all monitoring
export const initializeMonitoring = (sequelize) => {
  logger.info('Initializing monitoring systems...');
  
  memoryMonitoring();
  cpuMonitoring();
  logRequestRate();
  logErrorRate();
  uptimeMonitoring();
  
  if (sequelize) {
    databaseMonitoring(sequelize);
  }
  
  logger.success('Monitoring systems initialized');
};

export default {
  requestMonitoring,
  memoryMonitoring,
  cpuMonitoring,
  requestRateTracking,
  logRequestRate,
  databaseMonitoring,
  uptimeMonitoring,
  errorRateTracking,
  logErrorRate,
  initializeMonitoring,
};
