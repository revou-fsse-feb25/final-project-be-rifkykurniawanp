import { PrismaClient, CourseCategory, CourseLevel } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedCourses() {
  const instructor = await prisma.user.findFirst({ where: { role: 'INSTRUCTOR' } });
  if (!instructor) throw new Error('Instructor user not found');

  const coursesData = Array.from({ length: 5 }).map(() => ({
    title: faker.company.catchPhrase(),
    slug: faker.helpers.slugify(faker.company.catchPhrase() + '-' + faker.string.uuid()),
    description: faker.lorem.paragraph(),
    syllabus: faker.lorem.paragraphs(2),
    price: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
    instructorId: instructor.id,
    level: faker.helpers.arrayElement(Object.values(CourseLevel)),
    category: faker.helpers.arrayElement(Object.values(CourseCategory)),
    language: 'id',
    certificate: true,
  }));

  for (const course of coursesData) {
    await prisma.course.create({ data: course });
  }

  console.log('Courses seeded');
}
