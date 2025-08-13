import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('👤 Seeding core users...');

  // Get roles
  const adminRole = await prisma.role.findUniqueOrThrow({ where: { name: RoleName.ADMIN } });
  const supplierRole = await prisma.role.findUniqueOrThrow({ where: { name: RoleName.SUPPLIER } });
  const instructorRole = await prisma.role.findUniqueOrThrow({ where: { name: RoleName.INSTRUCTOR } });
  const userRole = await prisma.role.findUniqueOrThrow({ where: { name: RoleName.USER } });

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@coffeeshop.com' },
    update: {},
    create: {
      email: 'admin@coffeeshop.com',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Admin',
      phone: '+6281234567890',
      address: 'Jakarta, Indonesia',
      roleId: adminRole.id,
      isBuyer: true,
      isStudent: true
    }
  });

  // Supplier user
  const supplier = await prisma.user.upsert({
    where: { email: 'supplier@coffeeshop.com' },
    update: {},
    create: {
      email: 'supplier@coffeeshop.com',
      password: hashedPassword,
      firstName: 'Coffee',
      lastName: 'Supplier',
      phone: '+6281234567891',
      address: 'Bandung, Indonesia',
      roleId: supplierRole.id,
      isBuyer: false,
      isStudent: false
    }
  });

  // Instructor user
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@coffeeshop.com' },
    update: {},
    create: {
      email: 'instructor@coffeeshop.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Barista',
      phone: '+6281234567892',
      address: 'Yogyakarta, Indonesia',
      roleId: instructorRole.id,
      isBuyer: true,
      isStudent: false
    }
  });

  // Regular user
  const user = await prisma.user.upsert({
    where: { email: 'user@coffeeshop.com' },
    update: {},
    create: {
      email: 'user@coffeeshop.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '+6281234567893',
      address: 'Surabaya, Indonesia',
      roleId: userRole.id,
      isBuyer: true,
      isStudent: true
    }
  });

  console.log('✅ Core users seeded successfully');
  return { admin, supplier, instructor, user };
}