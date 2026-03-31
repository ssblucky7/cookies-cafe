import sequelize from './src/config/database.js';
import { Product } from './src/models/index.js';

const decodeHtmlEntities = (str) => {
  if (!str) return str;
  
  return str
    .replace(/&amp;#x2F;/g, '/')
    .replace(/&#x2F;/g, '/')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const fixDatabaseUrls = async () => {
  try {
    console.log('🔧 Fixing HTML-encoded URLs in database...\n');
    
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    const products = await Product.findAll();
    console.log(`📦 Found ${products.length} products\n`);

    let fixedCount = 0;

    for (const product of products) {
      let needsUpdate = false;
      const updates = {};

      // Check and fix image URL
      if (product.image && (product.image.includes('&#') || product.image.includes('&amp;'))) {
        const oldUrl = product.image;
        const newUrl = decodeHtmlEntities(product.image);
        updates.image = newUrl;
        needsUpdate = true;
        
        console.log(`Product: ${product.name}`);
        console.log(`  Old: ${oldUrl}`);
        console.log(`  New: ${newUrl}`);
      }

      // Check and fix gallery URLs
      if (product.gallery && Array.isArray(product.gallery)) {
        const newGallery = product.gallery.map(url => decodeHtmlEntities(url));
        if (JSON.stringify(newGallery) !== JSON.stringify(product.gallery)) {
          updates.gallery = newGallery;
          needsUpdate = true;
          console.log(`  Fixed gallery URLs`);
        }
      }

      if (needsUpdate) {
        await product.update(updates);
        fixedCount++;
        console.log(`  ✅ Updated\n`);
      }
    }

    console.log(`\n✅ Fixed ${fixedCount} products`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

fixDatabaseUrls();
