// prisma/seeds/sample/users.ts
import { PrismaClient, Role, UserRole, Permission } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedSampleUsers(): Promise<void> {
  console.log("👤 Seeding sample users...");

  // --- Pre-check: required roles exist ---
  const requiredRoles: Role[] = [Role.USER, Role.SUPPLIER, Role.INSTRUCTOR];

  const roles = await prisma.userRole.findMany({
    where: { name: { in: requiredRoles } },
  });

  const missingRoles = requiredRoles.filter((r) => !roles.some((db) => db.name === r));
  if (missingRoles.length) {
    throw new Error(
      `Missing roles: ${missingRoles.join(", ")}. Seed core roles/permissions first.`
    );
  }

  const roleByName = new Map<Role, UserRole>(roles.map((r) => [r.name, r]));

  // --- Data ---
  const usersData: Array<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    isBuyer: boolean;
    isStudent: boolean;
  }> = [
    {
      email: "user1@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      role: Role.USER,
      isBuyer: true,
      isStudent: true,
    },
    {
      email: "user2@example.com",
      password: "password123",
      firstName: "Jane",
      lastName: "Smith",
      role: Role.USER,
      isBuyer: true,
      isStudent: true,
    },
    {
      email: "supplier1@example.com",
      password: "password123",
      firstName: "Alice",
      lastName: "Supplier",
      role: Role.SUPPLIER,
      isBuyer: false,
      isStudent: false,
    },
    {
      email: "instructor1@example.com",
      password: "password123",
      firstName: "Bob",
      lastName: "Instructor",
      role: Role.INSTRUCTOR,
      isBuyer: false,
      isStudent: false,
    },
  ];

  const created: string[] = [];
  const updated: string[] = [];

  for (const u of usersData) {
    const role = roleByName.get(u.role);
    if (!role) throw new Error(`Role ${u.role} not found`);

    const existing = await prisma.user.findUnique({
      where: { email: u.email },
      select: { id: true },
    });

    const hashedPassword = await bcrypt.hash(u.password, 10);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        firstName: u.firstName,
        lastName: u.lastName,
        password: hashedPassword,
        roleId: role.id,
        isBuyer: u.isBuyer,
        isStudent: u.isStudent,
      },
      create: {
        email: u.email,
        password: hashedPassword,
        firstName: u.firstName,
        lastName: u.lastName,
        roleId: role.id,
        isBuyer: u.isBuyer,
        isStudent: u.isStudent,
      },
      select: { id: true, email: true },
    });

    if (existing) updated.push(u.email);
    else created.push(u.email);

    // --- ABAC assignments ---
    // Example rules per user
    const abacAssignments: Array<{ permissionName: Permission; conditions?: any }> = [];

    if (u.email === "supplier1@example.com") {
      abacAssignments.push({
        permissionName: Permission.MANAGE_PRODUCTS,
        conditions: { resourceOwnerOnly: true },
      });
      abacAssignments.push({
        permissionName: Permission.MANAGE_ORDERS,
        conditions: { resourceOwnerOnly: true },
      });
    } else if (u.email === "instructor1@example.com") {
      abacAssignments.push({
        permissionName: Permission.MANAGE_COURSES,
        conditions: { resourceOwnerOnly: true },
      });
    } else if (u.email === "user1@example.com") {
      // Example: extra ABAC for regular user
      abacAssignments.push({
        permissionName: Permission.VIEW_DASHBOARD,
        conditions: { premiumWidgets: true },
      });
    }

    // Upsert ABAC assignments
    for (const assignment of abacAssignments) {
      const permission = await prisma.userPermission.findUnique({
        where: { name: assignment.permissionName },
      });
      if (!permission) {
        console.warn(`⚠️ Permission ${assignment.permissionName} not found`);
        continue;
      }

      await prisma.userPermissionAssignment.upsert({
        where: {
          userId_permissionId: { userId: user.id, permissionId: permission.id },
        },
        update: { conditions: assignment.conditions },
        create: { userId: user.id, permissionId: permission.id, conditions: assignment.conditions },
      });
    }
  }

  // --- Checklist / validation ---
  const countsByRole = await prisma.user.groupBy({
    by: ["roleId"],
    _count: { roleId: true },
  });

  const roleCounts = {} as Record<Role, number>;
  for (const r of roles) {
    const row = countsByRole.find((c) => c.roleId === r.id);
    roleCounts[r.name] = row?._count.roleId ?? 0;
  }

  console.log("——— Checklist ———");
  console.log(`• Roles present: ${requiredRoles.join(", ")} ✅`);
  console.log(`• Created: ${created.length} -> ${created.join(", ") || "—"}`);
  console.log(`• Updated: ${updated.length} -> ${updated.join(", ") || "—"}`);
  console.log(
    `• Users by role -> USER: ${roleCounts[Role.USER] ?? 0}, SUPPLIER: ${roleCounts[Role.SUPPLIER] ?? 0}, INSTRUCTOR: ${roleCounts[Role.INSTRUCTOR] ?? 0}`
  );
  console.log(
    `• Instructor users exist: ${
      (roleCounts[Role.INSTRUCTOR] ?? 0) > 0 ? "YES ✅" : "NO ❌"
    } (run core/instructors.ts after this to create Instructor profiles)`
  );

  console.log("✅ Sample users seeded successfully with ABAC assignments.");
}
