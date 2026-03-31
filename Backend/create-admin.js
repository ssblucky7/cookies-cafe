import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import sequelize from './src/config/database.js';
import { User } from './src/models/index.js';

dotenv.config();

async function createAdminUser() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    const email = 'ssblucky07@gmail.com';
    const name = 'SSB Lucky 7';
    const password = 'Admin@123'; // Change this to your preferred password
    
    console.log(`🔍 Checking if user exists: ${email}`);
    let user = await User.findOne({ where: { email } });

    if (user) {
      console.log(`✅ User found: ${user.name}`);
      console.log(`   Current role: ${user.role}`);

      if (user.role === 'admin') {
        console.log('\n✅ User is already an admin!');
      } else {
        console.log('\n🔄 Updating role to admin...');
        await user.update({ role: 'admin' });
        console.log('✅ Role updated successfully!');
      }
    } else {
      console.log('❌ User not found. Creating new admin user...\n');
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create user with admin role
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        loyaltyPoints: 0
      });

      console.log('✅ Admin user created successfully!');
      console.log(`   Default password: ${password}`);
      console.log('   ⚠️  Please change this password after first login!');
    }

    console.log('\n📊 Admin User Details:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Created: ${user.createdAt}`);

    console.log('\n🎉 Done! You can now login with:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔗 Access admin panel at:');
    console.log('   http://localhost:5173/admin');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

createAdminUser();
