import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Core seeds
import { seedRoles } from './core/roles';
import { seedAdminUsers } from './core/admin-users';
import { seedPermissions } from './core/permissions';
import { seedInstructors } from './core/instructors';

// Sample seeds
import { seedSampleUsers } from './sample/users';
import { seedProducts } from './sample/products';
import { seedCourses } from './sample/courses';
// import { seedEnrollments } from './sample/enrollments'; // Remove if not found
import { seedOrders } from './sample/orders';
import { seedPayments } from './sample/payments';
// import { seedCertificates } from './sample/enrollments-certificates'; // Remove if not found or not exported

async function main() {
  console.log('🟢 Starting database seeding...');

  console.log('\n--- Core seeds ---');
  await seedRoles();
  await seedAdminUsers();
  await seedPermissions();
  await seedInstructors();

  console.log('\n--- Sample seeds ---');
  await seedSampleUsers();
  await seedProducts();
  await seedCourses();
  // await seedEnrollments(); // Remove if not found
  await seedOrders();

  console.log('\n--- Payments & Enrollments ---');
  await seedPayments();

  // console.log('\n--- Certificates ---');
  // await seedCertificates(); // Remove if not found or not exported

  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
