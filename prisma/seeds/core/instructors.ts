// prisma/seeds/core/instructors.ts
import { PrismaClient, Instructor, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedInstructors(): Promise<Instructor[]> {
  console.log("👨‍🏫 Seeding instructor profiles...");

  // Pastikan role INSTRUCTOR ada
  const instructorRole = await prisma.userRole.findUnique({
    where: { name: Role.INSTRUCTOR },
  });

  if (!instructorRole) {
    throw new Error("❌ Role INSTRUCTOR not found. Please seed roles first.");
  }

  // Cari user dengan role instructor
  let instructorUser = await prisma.user.findUnique({
    where: { email: "instructor@example.com" },
  });

  // Kalau belum ada → bikin user instructor baru
  if (!instructorUser) {
    const hashedPassword = await bcrypt.hash("password123", 10); // hash password

    instructorUser = await prisma.user.create({
      data: {
        email: "instructor@example.com",
        password: hashedPassword,
        firstName: "Jane",
        lastName: "Doe",
        roleId: instructorRole.id,
        isStudent: false,
      },
    });
    console.log(`✅ User instructor created: ${instructorUser.email}`);
  }

  // Buat / update instructor profile
  const instructorProfile = await prisma.instructor.upsert({
    where: { userId: instructorUser.id },
    update: {
      bio: "Expert in coffee brewing and tea ceremony.",
      expertise: ["COFFEE_BREWING", "TEA_CEREMONY"],
      experience: "5 years",
      socialLinks: { instagram: "https://instagram.com/example" },
      isVerified: true,
    },
    create: {
      userId: instructorUser.id,
      bio: "Expert in coffee brewing and tea ceremony.",
      expertise: ["COFFEE_BREWING", "TEA_CEREMONY"],
      experience: "5 years",
      socialLinks: { instagram: "https://instagram.com/example" },
      isVerified: true,
    },
  });

  console.log(`✅ Instructor profile ready for ${instructorUser.email}`);
  return [instructorProfile];
}
