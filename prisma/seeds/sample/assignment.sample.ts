import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedAssignments() {
  const lessons = await prisma.lesson.findMany();

  for (const lesson of lessons) {
    const assignment = {
      lessonId: lesson.id,
      title: `Assignment - ${faker.lorem.words(3)}`,
      instructions: faker.lorem.paragraph(),
      dueDate: faker.date.future(),
    };
    await prisma.assignment.create({ data: assignment });
  }

  console.log('Assignments seeded');
}
