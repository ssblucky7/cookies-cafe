import sequelize from './src/config/database.js';
import { Product } from './src/models/index.js';

const fixImageUrls = async () => {
  try {
    console.log('🔧 Fixing protocol-relative image URLs...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Get all products
    const products = await Product.findAll();
    console.log(`📦 Found ${products.length} products`);

    let fixedCount = 0;

    for (const product of products) {
      if (product.image && product.image.startsWith('//')) {
        const oldUrl = product.image;
        const newUrl = `https:${product.image}`;
        
        await product.update({ image: newUrl });
        console.log(`✅ Fixed: ${product.name}`);
        console.log(`   Old: ${oldUrl}`);
        console.log(`   New: ${newUrl}`);
        fixedCount++;
      }
    }

    console.log(`\n✅ Fixed ${fixedCount} product image URLs`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixImageUrls();
