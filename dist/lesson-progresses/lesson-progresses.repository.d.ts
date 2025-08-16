import { PrismaService } from '../prisma/prisma.service';
export declare class LessonProgressesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    markCompleted(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    }[]>;
}
