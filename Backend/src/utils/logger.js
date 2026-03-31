import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class Logger {
  constructor() {
    this.logFile = path.join(logsDir, 'app.log');
    this.errorFile = path.join(logsDir, 'error.log');
    this.accessFile = path.join(logsDir, 'access.log');
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.maxFiles = 5;
  }

  // Check and rotate log files if needed
  rotateLogFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        return;
      }

      const stats = fs.statSync(filePath);
      if (stats.size > this.maxFileSize) {
        // Rotate existing backup files
        for (let i = this.maxFiles - 1; i > 0; i--) {
          const oldFile = `${filePath}.${i}`;
          const newFile = `${filePath}.${i + 1}`;
          
          if (fs.existsSync(oldFile)) {
            if (i === this.maxFiles - 1) {
              fs.unlinkSync(oldFile); // Delete oldest file
            } else {
              fs.renameSync(oldFile, newFile);
            }
          }
        }

        // Rotate current file
        fs.renameSync(filePath, `${filePath}.1`);
      }
    } catch (error) {
      console.error('Error rotating log file:', error);
    }
  }

  // Format log entry as JSON
  formatLogEntry(level, message, meta = {}) {
    return {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      ...meta,
      pid: process.pid,
      hostname: process.env.HOSTNAME || 'unknown',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  // Write log to file
  writeToFile(filePath, logEntry) {
    try {
      this.rotateLogFile(filePath);
      const logString = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(filePath, logString);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  // Console output with colors
  consoleOutput(level, message, meta) {
    if (process.env.NODE_ENV === 'production' && level === 'debug') {
      return; // Don't log debug in production
    }

    const colors = {
      error: '\x1b[31m', // Red
      warn: '\x1b[33m',  // Yellow
      info: '\x1b[36m',  // Cyan
      debug: '\x1b[90m', // Gray
      success: '\x1b[32m', // Green
    };

    const reset = '\x1b[0m';
    const color = colors[level] || '';
    const timestamp = new Date().toISOString();

    console.log(
      `${color}[${timestamp}] ${level.toUpperCase()}:${reset} ${message}`,
      Object.keys(meta).length > 0 ? meta : ''
    );
  }

  // Main log method
  log(level, message, meta = {}) {
    const logEntry = this.formatLogEntry(level, message, meta);

    // Console output
    this.consoleOutput(level, message, meta);

    // File output
    this.writeToFile(this.logFile, logEntry);

    // Write errors to separate error log
    if (level === 'error') {
      this.writeToFile(this.errorFile, logEntry);
    }
  }

  // Log levels
  error(message, meta = {}) {
    this.log('error', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  debug(message, meta = {}) {
    this.log('debug', message, meta);
  }

  success(message, meta = {}) {
    this.log('success', message, meta);
  }

  // HTTP access logging
  access(req, res, duration) {
    const logEntry = this.formatLogEntry('access', 'HTTP Request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      userId: req.user?.id,
    });

    this.writeToFile(this.accessFile, logEntry);
  }

  // Database query logging
  query(query, duration, error = null) {
    const logEntry = this.formatLogEntry(
      error ? 'error' : 'debug',
      'Database Query',
      {
        query: query.substring(0, 200), // Limit query length
        duration: `${duration}ms`,
        error: error?.message,
      }
    );

    this.writeToFile(this.logFile, logEntry);
  }

  // External API call logging
  apiCall(service, endpoint, method, duration, statusCode, error = null) {
    const logEntry = this.formatLogEntry(
      error ? 'error' : 'info',
      `External API Call: ${service}`,
      {
        endpoint,
        method,
        duration: `${duration}ms`,
        statusCode,
        error: error?.message,
      }
    );

    this.writeToFile(this.logFile, logEntry);
  }

  // Security event logging
  security(event, details = {}) {
    const logEntry = this.formatLogEntry('warn', `Security Event: ${event}`, details);
    this.writeToFile(this.errorFile, logEntry);
  }

  // Performance metrics logging
  performance(metric, value, unit = 'ms') {
    const logEntry = this.formatLogEntry('info', `Performance: ${metric}`, {
      value,
      unit,
    });

    this.writeToFile(this.logFile, logEntry);
  }

  // Clean old log files
  cleanOldLogs(daysToKeep = 30) {
    try {
      const files = fs.readdirSync(logsDir);
      const now = Date.now();
      const maxAge = daysToKeep * 24 * 60 * 60 * 1000;

      files.forEach(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtime.getTime();

        if (age > maxAge) {
          fs.unlinkSync(filePath);
          this.info(`Deleted old log file: ${file}`);
        }
      });
    } catch (error) {
      this.error('Error cleaning old logs', { error: error.message });
    }
  }

  // Get log statistics
  getStats() {
    try {
      const stats = {
        appLog: this.getFileStats(this.logFile),
        errorLog: this.getFileStats(this.errorFile),
        accessLog: this.getFileStats(this.accessFile),
      };

      return stats;
    } catch (error) {
      this.error('Error getting log stats', { error: error.message });
      return null;
    }
  }

  getFileStats(filePath) {
    if (!fs.existsSync(filePath)) {
      return { exists: false };
    }

    const stats = fs.statSync(filePath);
    return {
      exists: true,
      size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
      created: stats.birthtime,
      modified: stats.mtime,
    };
  }
}

// Create singleton instance
const logger = new Logger();

// Clean old logs on startup
logger.cleanOldLogs();

// Schedule daily log cleanup
setInterval(() => {
  logger.cleanOldLogs();
}, 24 * 60 * 60 * 1000); // Once per day

export default logger;
