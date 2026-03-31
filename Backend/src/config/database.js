import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not defined in .env file');
  console.error('Please create a .env file with DATABASE_URL');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 20,          // Maximum connections in pool
    min: 5,           // Minimum connections in pool
    acquire: 60000,   // Maximum time (ms) to acquire connection
    idle: 10000,      // Maximum idle time (ms) before releasing
    evict: 1000,      // Time interval to check for idle connections
  },
  retry: {
    max: 3,           // Maximum retry attempts
    timeout: 3000,    // Timeout for each retry
  },
  benchmark: process.env.NODE_ENV === 'development', // Log query execution time
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected Successfully');
    
    // Sync all models with database
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database Synchronized');
    }
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default sequelize;
