import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();
export async function seedUsers() {
    const usersData = [
        { email: 'admin@example.com', password: await bcrypt.hash('admin123', 10), firstName: 'Admin', role: RoleName.ADMIN },
        { email: 'supplier@example.com', password: await bcrypt.hash('supplier123', 10), firstName: 'Supplier', role: RoleName.SUPPLIER },
        { email: 'instructor@example.com', password: await bcrypt.hash('instructor123', 10), firstName: 'Instructor', role: RoleName.INSTRUCTOR },
        { email: 'user@example.com', password: await bcrypt.hash('user123', 10), firstName: 'User', role: RoleName.USER, isBuyer: true, isStudent: true },
    ];
    for (const user of usersData) {
        await prisma.user.upsert({ where: { email: user.email }, update: {}, create: user });
    }
    console.log('Core users seeded');
}
//# sourceMappingURL=user.seed.js.map