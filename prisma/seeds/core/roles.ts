// prisma/seeds/core/roles.ts
import { PrismaClient, RoleName } from "@prisma/client";
import { seedPermissions } from "./permissions";

const prisma = new PrismaClient();

export async function seedRoles() {
  console.log("🛡️ Seeding roles and linking permissions...");

  try {
    // Seed permissions first
    const permissions = await seedPermissions();

    // Define role data
    const rolesData = [
      {
        name: RoleName.ADMIN,
        description: "System administrator with full access",
        permissionNames: permissions.map(p => p.name), // All permissions
      },
      {
        name: RoleName.SUPPLIER,
        description: "Product supplier",
        permissionNames: ["VIEW_DASHBOARD", "MANAGE_PRODUCTS", "MANAGE_ORDERS"],
      },
      {
        name: RoleName.INSTRUCTOR,
        description: "Course instructor",
        permissionNames: ["VIEW_DASHBOARD", "MANAGE_COURSES"],
      },
      {
        name: RoleName.USER,
        description: "Regular user",
        permissionNames: ["VIEW_DASHBOARD"],
      },
    ];

    // Upsert roles and assign permissions
    for (const roleData of rolesData) {
      const role = await prisma.role.upsert({
        where: { name: roleData.name },
        update: { description: roleData.description },
        create: { name: roleData.name, description: roleData.description },
      });

      console.log(`✅ Role upserted: ${role.name}`);

      // Link permissions
      for (const permName of roleData.permissionNames) {
        const permission = permissions.find(p => p.name === permName);
        if (!permission) {
          console.warn(`⚠️ Permission ${permName} not found for role ${role.name}`);
          continue;
        }

        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: { roleId: role.id, permissionId: permission.id },
          },
          update: {},
          create: { roleId: role.id, permissionId: permission.id },
        });
      }
      console.log(`🔗 Permissions linked for role: ${role.name}`);
    }

    console.log("✅ All roles and permissions seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    throw error;
  }
}
