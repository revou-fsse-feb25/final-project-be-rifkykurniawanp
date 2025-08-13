import { PrismaClient, RoleName, PermissionName } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  console.log('🔑 Seeding roles and permissions...');

  // Create permissions first
  const permissions = await Promise.all([
    prisma.permission.upsert({
      where: { name: PermissionName.VIEW_DASHBOARD },
      update: {},
      create: {
        name: PermissionName.VIEW_DASHBOARD,
        description: 'Can view dashboard and analytics'
      }
    }),
    prisma.permission.upsert({
      where: { name: PermissionName.MANAGE_ORDERS },
      update: {},
      create: {
        name: PermissionName.MANAGE_ORDERS,
        description: 'Can manage product orders'
      }
    }),
    prisma.permission.upsert({
      where: { name: PermissionName.MANAGE_PRODUCTS },
      update: {},
      create: {
        name: PermissionName.MANAGE_PRODUCTS,
        description: 'Can manage products and inventory'
      }
    }),
    prisma.permission.upsert({
      where: { name: PermissionName.MANAGE_COURSES },
      update: {},
      create: {
        name: PermissionName.MANAGE_COURSES,
        description: 'Can manage courses and content'
      }
    }),
    prisma.permission.upsert({
      where: { name: PermissionName.MANAGE_USERS },
      update: {},
      create: {
        name: PermissionName.MANAGE_USERS,
        description: 'Can manage users and roles'
      }
    })
  ]);

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: {
      name: RoleName.ADMIN,
      description: 'System administrator with full access'
    }
  });

  const supplierRole = await prisma.role.upsert({
    where: { name: RoleName.SUPPLIER },
    update: {},
    create: {
      name: RoleName.SUPPLIER,
      description: 'Product supplier'
    }
  });

  const instructorRole = await prisma.role.upsert({
    where: { name: RoleName.INSTRUCTOR },
    update: {},
    create: {
      name: RoleName.INSTRUCTOR,
      description: 'Course instructor'
    }
  });

  const userRole = await prisma.role.upsert({
    where: { name: RoleName.USER },
    update: {},
    create: {
      name: RoleName.USER,
      description: 'Regular user'
    }
  });

  // Assign permissions to roles
  // Admin gets all permissions
  for (const permission of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id
        }
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id
      }
    });
  }

  // Supplier permissions
  const supplierPermissions = [
    permissions.find(p => p.name === PermissionName.VIEW_DASHBOARD),
    permissions.find(p => p.name === PermissionName.MANAGE_PRODUCTS),
    permissions.find(p => p.name === PermissionName.MANAGE_ORDERS)
  ].filter(Boolean);

  for (const permission of supplierPermissions) {
    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: supplierRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: supplierRole.id,
          permissionId: permission.id
        }
      });
    }
  }

  // Instructor permissions
  const instructorPermissions = [
    permissions.find(p => p.name === PermissionName.VIEW_DASHBOARD),
    permissions.find(p => p.name === PermissionName.MANAGE_COURSES)
  ].filter(Boolean);

  for (const permission of instructorPermissions) {
    if (permission) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: instructorRole.id,
            permissionId: permission.id
          }
        },
        update: {},
        create: {
          roleId: instructorRole.id,
          permissionId: permission.id
        }
      });
    }
  }

  // User gets VIEW_DASHBOARD only
  const dashboardPermission = permissions.find(p => p.name === PermissionName.VIEW_DASHBOARD);
  if (dashboardPermission) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: userRole.id,
          permissionId: dashboardPermission.id
        }
      },
      update: {},
      create: {
        roleId: userRole.id,
        permissionId: dashboardPermission.id
      }
    });
  }

  console.log('✅ Roles and permissions seeded successfully');
  return { adminRole, supplierRole, instructorRole, userRole, permissions };
}
