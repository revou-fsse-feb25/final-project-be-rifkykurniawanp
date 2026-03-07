import { LessonProgressesRepository } from './lesson-progresses.repository';
export declare class LessonProgressesService {
    private readonly repository;
    constructor(repository: LessonProgressesRepository);
    getProgress(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    markCompleted(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    }[]>;
}
