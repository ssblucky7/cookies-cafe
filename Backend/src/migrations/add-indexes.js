import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

export const addIndexes = async () => {
  const queryInterface = sequelize.getQueryInterface();

  try {
    logger.info('Starting database index creation...');

    // Users table indexes
    logger.info('Creating indexes for Users table...');
    
    try {
      await queryInterface.addIndex('Users', ['email'], {
        name: 'users_email_idx',
        unique: true,
      });
      logger.success('✓ Created unique index on Users.email');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index users_email_idx already exists');
    }

    try {
      await queryInterface.addIndex('Users', ['role'], {
        name: 'users_role_idx',
      });
      logger.success('✓ Created index on Users.role');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index users_role_idx already exists');
    }

    // Products table indexes
    logger.info('Creating indexes for Products table...');
    
    try {
      await queryInterface.addIndex('Products', ['categoryId'], {
        name: 'products_category_idx',
      });
      logger.success('✓ Created index on Products.categoryId');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index products_category_idx already exists');
    }

    try {
      await queryInterface.addIndex('Products', ['isFeatured'], {
        name: 'products_featured_idx',
      });
      logger.success('✓ Created index on Products.isFeatured');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index products_featured_idx already exists');
    }

    // Orders table indexes
    logger.info('Creating indexes for Orders table...');
    
    try {
      await queryInterface.addIndex('Orders', ['userId'], {
        name: 'orders_user_idx',
      });
      logger.success('✓ Created index on Orders.userId');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index orders_user_idx already exists');
    }

    try {
      await queryInterface.addIndex('Orders', ['status'], {
        name: 'orders_status_idx',
      });
      logger.success('✓ Created index on Orders.status');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index orders_status_idx already exists');
    }

    try {
      await queryInterface.addIndex('Orders', ['createdAt'], {
        name: 'orders_created_idx',
      });
      logger.success('✓ Created index on Orders.createdAt');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index orders_created_idx already exists');
    }

    // Reviews table indexes
    logger.info('Creating indexes for Reviews table...');
    
    try {
      await queryInterface.addIndex('Reviews', ['productId'], {
        name: 'reviews_product_idx',
      });
      logger.success('✓ Created index on Reviews.productId');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index reviews_product_idx already exists');
    }

    try {
      await queryInterface.addIndex('Reviews', ['userId'], {
        name: 'reviews_user_idx',
      });
      logger.success('✓ Created index on Reviews.userId');
    } catch (error) {
      if (!error.message.includes('already exists')) {
        throw error;
      }
      logger.info('Index reviews_user_idx already exists');
    }

    logger.success('✅ All database indexes created successfully!');
    return true;
  } catch (error) {
    logger.error('Failed to create database indexes', {
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  addIndexes()
    .then(() => {
      logger.success('Index creation completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Index creation failed', { error: error.message });
      process.exit(1);
    });
}

export default addIndexes;
