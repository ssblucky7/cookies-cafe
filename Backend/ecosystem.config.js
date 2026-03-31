module.exports = {
  apps: [
    {
      name: 'cookies-cafe-api',
      script: './server.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
      error_file: './logs/pm2-err.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,
      wait_ready: true,
      
      // Advanced features
      instance_var: 'INSTANCE_ID',
      
      // Monitoring
      pmx: true,
      
      // Log rotation
      log_type: 'json',
      
      // Environment-specific settings
      env_production: {
        NODE_ENV: 'production',
        PORT: 5001,
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 5002,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 5001,
        watch: true,
      },
    },
  ],

  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-repo/cookies-cafe.git',
      path: '/var/www/cookies-cafe',
      'post-deploy': 'npm install && npm run sync && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt-get install git',
    },
    staging: {
      user: 'deploy',
      host: ['staging-server.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-repo/cookies-cafe.git',
      path: '/var/www/cookies-cafe-staging',
      'post-deploy': 'npm install && npm run sync && pm2 reload ecosystem.config.js --env staging',
    },
  },
};
