import { LessonProgressesRepository } from './lesson-progresses.repository';
export declare class LessonProgressesService {
    private readonly repository;
    constructor(repository: LessonProgressesRepository);
    getProgress(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
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
    getAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    }[]>;
}
