// prisma/seeds/core/permissions.ts
import { PrismaClient, Permission, UserPermission, UserPermissionAssignment } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedPermissions() {
  console.log("🔑 Seeding permissions...");

  const permissionsData: { name: Permission; description: string }[] = [
    { name: Permission.VIEW_DASHBOARD, description: "Can view dashboard and analytics" },
    { name: Permission.MANAGE_ORDERS, description: "Can manage product orders" },
    { name: Permission.MANAGE_PRODUCTS, description: "Can manage products and inventory" },
    { name: Permission.MANAGE_COURSES, description: "Can manage courses and content" },
    { name: Permission.MANAGE_USERS, description: "Can manage users and roles" },
  ];

  const seededPermissions: UserPermission[] = [];

  for (const perm of permissionsData) {
    const permission = await prisma.userPermission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: { name: perm.name, description: perm.description },
    });

    console.log(`✅ Permission upserted: ${perm.name}`);
    seededPermissions.push(permission);
  }

  // --- ABAC Example Seeding ---
  // Give user with ID=1 explicit permissions (independent of role)
  const abacAssignments: { userId: number; permissionName: Permission }[] = [
    { userId: 1, permissionName: Permission.VIEW_DASHBOARD },
    { userId: 1, permissionName: Permission.MANAGE_PRODUCTS },
  ];

  const seededAssignments: UserPermissionAssignment[] = [];

  for (const assignment of abacAssignments) {
    const permission = seededPermissions.find(p => p.name === assignment.permissionName);
    if (!permission) continue;

    const userPermissionAssignment = await prisma.userPermissionAssignment.upsert({
      where: {
        userId_permissionId: {
          userId: assignment.userId,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        userId: assignment.userId,
        permissionId: permission.id,
      },
    });

    console.log(
      `🔗 ABAC assignment: User ${assignment.userId} → ${assignment.permissionName}`
    );

    seededAssignments.push(userPermissionAssignment);
  }

  console.log("✅ All permissions (RBAC + ABAC) seeded successfully.");
  return { seededPermissions, seededAssignments };
}
