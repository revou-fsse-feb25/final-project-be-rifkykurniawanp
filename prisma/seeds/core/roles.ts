// prisma/seeds/core/roles.ts
import { PrismaClient, Role, Permission, UserRole } from "@prisma/client";
import { seedPermissions } from "./permissions";

const prisma = new PrismaClient();

export async function seedRoles(): Promise<UserRole[]> {
  console.log("🛡️ Seeding roles and linking permissions...");

  try {
    // ✅ Seed permissions first (returns RBAC + ABAC objects)
    const { seededPermissions } = await seedPermissions();

    // ✅ Define role data
    const rolesData: {
      name: Role;
      description: string;
      permissionNames: Permission[];
    }[] = [
      {
        name: Role.ADMIN,
        description: "System administrator with full access",
        permissionNames: seededPermissions.map((p) => p.name), // all permissions
      },
      {
        name: Role.SUPPLIER,
        description: "Product supplier",
        permissionNames: [
          Permission.VIEW_DASHBOARD,
          Permission.MANAGE_PRODUCTS,
          Permission.MANAGE_ORDERS,
        ],
      },
      {
        name: Role.INSTRUCTOR,
        description: "Course instructor",
        permissionNames: [
          Permission.VIEW_DASHBOARD,
          Permission.MANAGE_COURSES,
        ],
      },
      {
        name: Role.USER,
        description: "Regular user",
        permissionNames: [Permission.VIEW_DASHBOARD],
      },
    ];

    const seededRoles: UserRole[] = [];

    // ✅ Upsert roles and assign permissions
    for (const roleData of rolesData) {
      const role = await prisma.userRole.upsert({
        where: { name: roleData.name },
        update: { description: roleData.description },
        create: { name: roleData.name, description: roleData.description },
      });

      console.log(`✅ Role upserted: ${role.name}`);

      // ✅ Link permissions (RBAC)
      for (const permName of roleData.permissionNames) {
        const permission = seededPermissions.find((p) => p.name === permName);
        if (!permission) {
          console.warn(`⚠️ Permission ${permName} not found for role ${role.name}`);
          continue;
        }

        await prisma.userRolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: { roleId: role.id, permissionId: permission.id },
        });
      }

      console.log(`🔗 Permissions linked for role: ${role.name}`);
      seededRoles.push(role);
    }

    console.log("✅ All roles and permissions seeded successfully.");
    return seededRoles;
  } catch (error) {
    console.error("❌ Error seeding roles:", error);
    throw error;
  }
}
