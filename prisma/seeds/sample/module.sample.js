import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
export async function seedModules() {
    const courses = await prisma.course.findMany();
    for (const course of courses) {
        const modules = Array.from({ length: 3 }).map((_, i) => ({
            courseId: course.id,
            title: `Module ${i + 1} - ${faker.company.name()}`,
            orderNumber: i + 1,
        }));
        for (const module of modules)
            await prisma.courseModule.create({ data: module });
    }
    console.log('Modules seeded');
}
//# sourceMappingURL=module.sample.js.map