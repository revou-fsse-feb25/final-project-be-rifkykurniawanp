import { PrismaClient, Permission } from "@prisma/client"; // import Permission type

const prisma = new PrismaClient();

export async function seedPermissions() {
  console.log("🔑 Seeding permissions...");

  const permissionsData = [
    { name: "VIEW_DASHBOARD" as const, description: "Can view dashboard and analytics" },
    { name: "MANAGE_ORDERS" as const, description: "Can manage product orders" },
    { name: "MANAGE_PRODUCTS" as const, description: "Can manage products and inventory" },
    { name: "MANAGE_COURSES" as const, description: "Can manage courses and content" },
    { name: "MANAGE_USERS" as const, description: "Can manage users and roles" },
  ];

  // Fix: explicitly type the array
  const seededPermissions: Permission[] = [];

  for (const perm of permissionsData) {
    const permission = await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: { name: perm.name, description: perm.description },
    });

    console.log(`✅ Permission upserted: ${perm.name}`);
    seededPermissions.push(permission);
  }

  console.log("✅ All permissions seeded successfully.");
  return seededPermissions;
}
