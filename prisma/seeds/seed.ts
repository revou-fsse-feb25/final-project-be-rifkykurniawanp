import { seedUsers } from './core/user.seed';
import { seedProducts } from './sample/product.sample';
import { seedCourses } from './sample/course.sample';
import { seedModules } from './sample/module.sample';
import { seedLessons } from './sample/lesson.sample';
import { seedAssignments } from './sample/assignment.sample';
import { seedCarts } from './sample/cart.sample';
import { seedPayments } from './sample/payment.sample';
import { seedEnrollments } from './sample/enrollment.sample';
import { seedCertificates } from './sample/certificate.sample';

async function main() {
  console.log('Seeding core data...');
  await seedUsers();

  console.log('Seeding sample data...');
  await seedProducts();
  await seedCourses();
  await seedModules();
  await seedLessons();
  await seedAssignments();
  await seedCarts();
  await seedPayments();
  await seedEnrollments();
  await seedCertificates();

  console.log('All data seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
