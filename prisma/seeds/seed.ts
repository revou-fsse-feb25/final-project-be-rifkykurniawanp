import { PrismaClient } from '@prisma/client';

// Core seeds
import { seedRoles } from './core/roles.seed';
import { seedUsers } from './core/users.seed';
import { seedCategories } from './core/categories.seed';

// Sample seeds
import { seedSampleProducts } from './sample/products.sample.seed';
import { seedSampleCourses } from './sample/courses.sample.seed';
import { seedSampleOrders } from './sample/orders.sample.seed';
import { seedSampleReviews } from './sample/reviews.sample.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Core data seeding (required for app to function)
    console.log('📋 Seeding core data...');
    await seedRoles();
    await seedUsers();
    await seedCategories();
    console.log('✅ Core data seeded successfully\n');

    // Check if we should seed sample data
    const shouldSeedSamples = process.env.SEED_SAMPLES === 'true' || process.argv.includes('--samples');
    
    if (shouldSeedSamples) {
      console.log('📦 Seeding sample data...');
      await seedSampleProducts();
      await seedSampleCourses();
      await seedSampleOrders();
      await seedSampleReviews();
      console.log('✅ Sample data seeded successfully\n');
    } else {
      console.log('⏭️  Skipping sample data seeding (use --samples flag or SEED_SAMPLES=true env var to include)\n');
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Seeded data summary:');
    
    // Display summary
    const counts = await Promise.all([
      prisma.role.count(),
      prisma.user.count(),
      prisma.productCategory.count(),
      prisma.courseCategory.count(),
      prisma.product.count(),
      prisma.course.count(),
      prisma.productOrder.count(),
      prisma.courseEnrollment.count()
    ]);

    console.log(`   • Roles: ${counts[0]}`);
    console.log(`   • Users: ${counts[1]}`);
    console.log(`   • Product Categories: ${counts[2]}`);
    console.log(`   • Course Categories: ${counts[3]}`);
    console.log(`   • Products: ${counts[4]}`);
    console.log(`   • Courses: ${counts[5]}`);
    console.log(`   • Product Orders: ${counts[6]}`);
    console.log(`   • Course Enrollments: ${counts[7]}`);

    console.log('\n🔑 Default login credentials:');
    console.log('   • Admin: admin@coffeeshop.com / password123');
    console.log('   • Supplier: supplier@coffeeshop.com / password123');
    console.log('   • Instructor: instructor@coffeeshop.com / password123');
    console.log('   • User: user@coffeeshop.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });