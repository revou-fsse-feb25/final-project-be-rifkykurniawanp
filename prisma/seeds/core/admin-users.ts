// prisma/seeds/core/admin-users.ts
import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedAdminUsers() {
  console.log("👤 Seeding admin users...");

  try {
    // Find ADMIN role
    const adminRole = await prisma.role.findUnique({
      where: { name: RoleName.ADMIN },
    });

    if (!adminRole) {
      throw new Error("ADMIN role not found. Please seed roles first.");
    }

    // Sample admin users
    const adminUsersData = [
      {
        email: "admin@example.com",
        password: "admin123",
        firstName: "Super",
        lastName: "Admin",
      },
      {
        email: "admin2@example.com",
        password: "admin123",
        firstName: "Main",
        lastName: "Administrator",
      },
    ];

    for (const userData of adminUsersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          password: hashedPassword,
          roleId: adminRole.id,
          isBuyer: false,
          isStudent: false,
        },
        create: {
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          roleId: adminRole.id,
          isBuyer: false,
          isStudent: false,
        },
      });

      console.log(`✅ Admin user upserted: ${userData.email}`);
    }

    console.log("✅ All admin users seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding admin users:", error);
    throw error;
  }
}
