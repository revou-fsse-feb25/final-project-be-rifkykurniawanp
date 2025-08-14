import { PrismaClient, CourseCategory } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedSampleCourses() {
  const instructor = await prisma.user.findFirst({
    where: { role: { name: "INSTRUCTOR" } },
  });
  if (!instructor) {
    console.warn("⚠ No instructor found, skipping courses seeding");
    return;
  }

  const course = await prisma.course.upsert({
    where: { slug: "coffee-brewing-101" },
    update: {},
    create: {
      title: "Coffee Brewing 101",
      slug: "coffee-brewing-101",
      price: 200000,
      instructorId: instructor.id,
      category: CourseCategory.COFFEE_BREWING,
      language: "id",
    },
  });

  await prisma.courseModule.create({
    data: {
      courseId: course.id,
      title: "Introduction to Brewing",
      orderNumber: 1,
      lessons: {
        create: [
          { title: "History of Coffee", orderNumber: 1 },
          { title: "Brewing Basics", orderNumber: 2 },
        ],
      },
    },
  });

  console.log("✅ Sample courses seeded");
}
