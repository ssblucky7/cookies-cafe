import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

// Now import database and models
import { connectDB } from '../config/database.js';
import { User, Category, Product, Event, Wishlist, Review, Order, CommunityPost } from '../models/index.js';

// Sample data
const categories = [
  { name: 'Classic', description: 'Traditional cookie favorites' },
  { name: 'Chocolate', description: 'Rich chocolate cookies' },
  { name: 'Special', description: 'Premium specialty cookies' },
  { name: 'Seasonal', description: 'Limited time seasonal treats' },
  { name: 'Vegan', description: 'Plant-based delicious cookies' },
];

const seedDatabase = async () => {
  try {
    console.log('🔗 Connecting to database...');
    console.log('📍 Database URL:', process.env.DATABASE_URL ? 'Loaded ✅' : 'Missing ❌');
    
    await connectDB();

    // Clear existing data (in correct order to respect foreign keys)
    console.log('🗑️  Clearing existing data...');
    await Review.destroy({ where: {}, truncate: true, cascade: true });
    await Order.destroy({ where: {}, truncate: true, cascade: true });
    await CommunityPost.destroy({ where: {}, truncate: true, cascade: true });
    await Event.destroy({ where: {}, truncate: true, cascade: true });
    await Wishlist.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Category.destroy({ where: {}, truncate: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, cascade: true });

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@cookiescafe.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin',
    });

    // Create sample users
    console.log('👥 Creating sample users...');
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      avatar: 'https://i.pravatar.cc/150?img=1',
    });

    await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      avatar: 'https://i.pravatar.cc/150?img=2',
    });

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.bulkCreate(categories);

    // Create products
    console.log('🍪 Creating products...');
    const products = [
      {
        name: 'Classic Chocolate Chip',
        description: 'Traditional chocolate chip cookies with premium dark chocolate chunks',
        fullDescription: 'Our signature chocolate chip cookies are made with the finest Belgian chocolate and organic butter.',
        price: 4.99,
        oldPrice: 6.99,
        categoryId: createdCategories[0].id,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
        gallery: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800'],
        badge: 'Hot',
        rating: 4.8,
        popularity: 95,
        ingredients: ['Premium flour', 'Belgian dark chocolate', 'Organic butter', 'Brown sugar'],
        stock: 100,
        isFeatured: true,
      },
      {
        name: 'Double Chocolate Fudge',
        description: 'Rich double chocolate cookies with white chocolate chips',
        fullDescription: 'Indulge in our decadent double chocolate fudge cookies.',
        price: 5.99,
        categoryId: createdCategories[1].id,
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
        gallery: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800'],
        badge: 'New',
        rating: 4.9,
        popularity: 92,
        ingredients: ['Premium cocoa powder', 'White chocolate chips', 'Organic butter'],
        stock: 80,
        isFeatured: true,
      },
      {
        name: 'Oatmeal Raisin',
        description: 'Healthy oatmeal cookies with plump raisins and cinnamon',
        fullDescription: 'A wholesome treat made with rolled oats and sweet raisins.',
        price: 4.49,
        categoryId: createdCategories[0].id,
        image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800',
        gallery: ['https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800'],
        rating: 4.5,
        popularity: 75,
        ingredients: ['Rolled oats', 'Raisins', 'Whole wheat flour', 'Honey'],
        stock: 90,
      },
      {
        name: 'Peanut Butter Delight',
        description: 'Creamy peanut butter cookies with a melt-in-mouth texture',
        fullDescription: 'Made with natural peanut butter and topped with a classic fork pattern.',
        price: 5.49,
        oldPrice: 6.49,
        categoryId: createdCategories[2].id,
        image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800',
        gallery: ['https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800'],
        badge: 'Sale',
        rating: 4.7,
        popularity: 88,
        ingredients: ['Natural peanut butter', 'All-purpose flour', 'Brown sugar'],
        stock: 70,
      },
      {
        name: 'White Chocolate Macadamia',
        description: 'Premium white chocolate with crunchy macadamia nuts',
        fullDescription: 'A luxurious combination of creamy white chocolate and buttery macadamia nuts.',
        price: 6.99,
        categoryId: createdCategories[2].id,
        image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800',
        gallery: ['https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800'],
        badge: 'Offer',
        rating: 4.9,
        popularity: 90,
        ingredients: ['White chocolate chips', 'Macadamia nuts', 'Premium flour'],
        stock: 60,
        isFeatured: true,
      },
    ];

    await Product.bulkCreate(products);

    // Create events
    console.log('📅 Creating events...');
    const events = [
      {
        title: 'Cookie Decorating Workshop',
        description: 'Join us for a fun cookie decorating session!',
        date: new Date('2024-02-15'),
        time: '2:00 PM - 4:00 PM',
        location: 'Cookies Café Main Location',
        capacity: 30,
      },
      {
        title: 'Coffee Tasting Event',
        description: 'Explore different coffee varieties and learn about perfect cookie pairings.',
        date: new Date('2024-02-22'),
        time: '10:00 AM - 12:00 PM',
        location: 'Cookies Café Main Location',
        capacity: 25,
      },
    ];

    await Event.bulkCreate(events);

    console.log('✅ Database seeded successfully!');
    console.log(`\n📧 Admin Email: ${admin.email}`);
    console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@123'}`);
    console.log('\n🎉 You can now start the server with: npm run dev\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

seedDatabase();
