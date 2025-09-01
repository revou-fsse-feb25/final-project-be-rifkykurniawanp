import { PrismaClient, LessonType } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
export async function seedLessons() {
    const modules = await prisma.courseModule.findMany();
    for (const module of modules) {
        const lessons = Array.from({ length: 3 }).map((_, i) => ({
            moduleId: module.id,
            slug: faker.helpers.slugify(module.title + '-' + i + '-' + faker.string.uuid()),
            title: `Lesson ${i + 1} - ${faker.lorem.words(3)}`,
            description: faker.lorem.sentence(),
            duration: `${faker.number.int({ min: 5, max: 30 })} min`,
            type: LessonType.VIDEO,
            videoUrl: faker.internet.url(),
            content: faker.lorem.paragraph(),
            orderNumber: i + 1,
        }));
        for (const lesson of lessons)
            await prisma.lesson.create({ data: lesson });
    }
    console.log('Lessons seeded');
}
//# sourceMappingURL=lesson.sample.js.map