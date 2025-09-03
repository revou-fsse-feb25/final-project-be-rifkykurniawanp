// prisma/seeds/core/instructors.ts
import { PrismaClient, Instructor } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedInstructors(): Promise<Instructor[]> {
  console.log("👨‍🏫 Seeding instructor profiles...");

  // Find all users with role INSTRUCTOR
  const instructorUsers = await prisma.user.findMany({
    where: { role: { name: "INSTRUCTOR" } },
  });

  if (instructorUsers.length === 0) {
    console.warn("⚠️ No instructor users found. Please seed users with INSTRUCTOR role first.");
    return [];
  }

  const seededInstructors: Instructor[] = [];

  for (const user of instructorUsers) {
    const instructorData = {
      userId: user.id,
      bio: "Experienced instructor in coffee, tea, and herbal courses.",
      profileImage: null,
      expertise: ["COFFEE_BREWING", "TEA_CEREMONY"], // example expertise
      experience: "5 years",
      socialLinks: {
        instagram: "https://instagram.com/example",
        linkedin: "https://linkedin.com/in/example",
      },
      isVerified: true,
      rating: 4.7,
      totalStudents: 0,
      totalCourses: 0,
    };

    const instructor = await prisma.instructor.upsert({
      where: { userId: user.id },
      update: { ...instructorData },
      create: { ...instructorData },
    });

    console.log(
      instructor.createdAt.getTime() === instructor.updatedAt.getTime()
        ? `✅ Instructor profile created for ${user.email}`
        : `ℹ️ Instructor profile updated for ${user.email}`
    );

    seededInstructors.push(instructor);
  }

  console.log("✅ All instructor profiles seeded successfully");
  return seededInstructors;
}
