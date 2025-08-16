import { LessonProgressesService } from './lesson-progresses.service';
export declare class LessonProgressesController {
    private readonly service;
    constructor(service: LessonProgressesService);
    getAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    }[]>;
    markCompleted(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getProgress(userId: number, lessonId: number): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        userId: number;
        updatedAt: Date;
        lessonId: number;
        completed: boolean;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
