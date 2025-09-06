import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Core seeds
import { seedPermissions } from './core/permissions';
import { seedRoles } from './core/roles';
import { seedAdminUsers } from './core/admin-users';
import { seedInstructors } from './core/instructors';

// Sample seeds
import { seedSampleUsers } from './sample/users';
import { seedProducts } from './sample/products';
import { seedCourses } from './sample/courses';
import { seedModulesAndLessons } from './sample/modules-lesson';
import { seedAssignments } from './sample/assignments';
import { seedCarts } from './sample/carts';
import { seedOrders } from './sample/orders';
import { seedPayments } from './sample/payments';
import { seedEnrollmentsAndCertificates } from './sample/enrollments-certificates';

async function main() {
  console.log('🟢 Starting database seeding...');

  // --- Core ---
  console.log('\n--- Core seeds ---');
  await seedPermissions();
  await seedRoles();
  await seedAdminUsers();
  await seedInstructors();

  // --- Sample (users & marketplace/courses) ---
  console.log('\n--- Sample seeds ---');
  await seedSampleUsers();
  await seedProducts();
  await seedCourses();
  await seedModulesAndLessons();
  await seedAssignments();

  // --- Commerce flow (cart, order, payment, enrollment) ---
  console.log('\n--- Transactions ---');
  await seedCarts();
  await seedOrders();
  await seedPayments();
  await seedEnrollmentsAndCertificates();

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
