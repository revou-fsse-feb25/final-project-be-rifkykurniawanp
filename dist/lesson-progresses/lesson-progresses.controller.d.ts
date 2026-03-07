import { LessonProgressesService } from './lesson-progresses.service';
export declare class LessonProgressesController {
    private readonly service;
    constructor(service: LessonProgressesService);
    getAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    }[]>;
    markCompleted(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getProgress(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        lessonId: number;
        completed: boolean;
        timeSpent: number | null;
        completedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
