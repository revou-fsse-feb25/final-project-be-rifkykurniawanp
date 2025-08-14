import { PrismaClient, RoleName } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function seedUsers() {
  const defaultPassword = await bcrypt.hash("password123", 10);

  const users = [
    {
      email: "admin@example.com",
      password: defaultPassword,
      firstName: "Admin",
      role: RoleName.ADMIN,
    },
    {
      email: "supplier@example.com",
      password: defaultPassword,
      firstName: "Supplier",
      role: RoleName.SUPPLIER,
    },
    {
      email: "instructor@example.com",
      password: defaultPassword,
      firstName: "Instructor",
      role: RoleName.INSTRUCTOR,
    },
    {
      email: "user@example.com",
      password: defaultPassword,
      firstName: "User",
      role: RoleName.USER,
    },
  ];

  for (const u of users) {
    const role = await prisma.role.findUnique({ where: { name: u.role } });
    if (!role) continue;

    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password: u.password,
        firstName: u.firstName,
        roleId: role.id,
      },
    });
  }

  console.log("✅ Users seeded");
}
