import sequelize from './src/config/database.js';
import { Product } from './src/models/index.js';

const checkImageUrls = async () => {
  try {
    console.log('🔍 Checking image URLs in database...\n');
    
    await sequelize.authenticate();

    const products = await Product.findAll();
    
    products.forEach(product => {
      console.log(`Product: ${product.name}`);
      console.log(`Image URL: ${product.image}`);
      console.log(`Starts with //: ${product.image?.startsWith('//')}`);
      console.log(`Starts with http: ${product.image?.startsWith('http')}`);
      console.log('---');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkImageUrls();
