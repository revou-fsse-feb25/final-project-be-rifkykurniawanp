// prisma/seeds/sample/users.ts
import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * SAMPLE USERS
 * - Mirrors your earlier sample with Supplier + Instructor + Students
 * - Uses role relation via roleId (resolved from RoleName)
 * - Idempotent (safe to run repeatedly)
 * - Console checklist + summary
 */
export async function seedSampleUsers() {
  console.log("👤 Seeding sample users...");

  // --- Pre-check: required roles exist ---
  const requiredRoles: RoleName[] = [
    RoleName.USER,
    RoleName.SUPPLIER,
    RoleName.INSTRUCTOR,
  ];

  const roles = await prisma.role.findMany({
    where: { name: { in: requiredRoles } },
  });

  const missingRoles = requiredRoles.filter(
    (r) => !roles.some((db) => db.name === r)
  );

  if (missingRoles.length) {
    throw new Error(
      `Missing roles: ${missingRoles.join(
        ", "
      )}. Seed core roles/permissions first.`
    );
  }

  const roleByName = new Map(roles.map((r) => [r.name, r]));

  // --- Data ---
  const usersData = [
    // Students/Buyers
    {
      email: "user1@example.com",
      password: "password123",
      firstName: "John",
      lastName: "Doe",
      role: RoleName.USER,
      isBuyer: true,
      isStudent: true,
    },
    {
      email: "user2@example.com",
      password: "password123",
      firstName: "Jane",
      lastName: "Smith",
      role: RoleName.USER,
      isBuyer: true,
      isStudent: true,
    },

    // Supplier
    {
      email: "supplier1@example.com",
      password: "password123",
      firstName: "Alice",
      lastName: "Supplier",
      role: RoleName.SUPPLIER,
      isBuyer: false,
      isStudent: false,
    },

    // Instructor (will be picked up by core/instructors.ts to create Instructor profile)
    {
      email: "instructor1@example.com",
      password: "password123",
      firstName: "Bob",
      lastName: "Instructor",
      role: RoleName.INSTRUCTOR,
      isBuyer: false,
      isStudent: false,
    },
  ] as const;

  // --- Upsert loop with created/updated tracking ---
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

    await prisma.user.upsert({
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
    });

    if (existing) updated.push(u.email);
    else created.push(u.email);
  }

  // --- Checklist / validation ---
  const countsByRole = await prisma.user.groupBy({
    by: ["roleId"],
    _count: { roleId: true },
  });

  const roleCounts: Record<string, number> = {};
  for (const r of roles) {
    const row = countsByRole.find((c) => c.roleId === r.id);
    roleCounts[r.name] = row?._count.roleId ?? 0;
  }

  console.log("——— Checklist ———");
  console.log(`• Roles present: ${requiredRoles.join(", ")} ✅`);
  console.log(`• Created: ${created.length} -> ${created.join(", ") || "—"}`);
  console.log(`• Updated: ${updated.length} -> ${updated.join(", ") || "—"}`);
  console.log(
    `• Users by role -> USER: ${roleCounts.USER}, SUPPLIER: ${roleCounts.SUPPLIER}, INSTRUCTOR: ${roleCounts.INSTRUCTOR}`
  );
  console.log(
    `• Instructor users exist: ${
      roleCounts.INSTRUCTOR > 0 ? "YES ✅" : "NO ❌"
    } (run core/instructors.ts after this to create Instructor profiles)`
  );

  console.log("✅ Sample users seeded successfully.");
}
