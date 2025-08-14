// prisma/seeds/core/roles.seed.ts
import { PrismaClient, RoleName } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = [
    { name: RoleName.ADMIN, description: 'Administrator with full access' },
    { name: RoleName.SUPPLIER, description: 'Supplier for products' },
    { name: RoleName.INSTRUCTOR, description: 'Course instructor' },
    { name: RoleName.USER, description: 'Regular customer' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log('✅ Roles seeded');
}
