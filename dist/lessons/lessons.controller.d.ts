import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(moduleId: number, dto: CreateLessonDto): import(".prisma/client").Prisma.Prisma__LessonClient<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAllByModule(moduleId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__LessonClient<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findBySlug(slug: string): import(".prisma/client").Prisma.Prisma__LessonClient<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateLessonDto): import(".prisma/client").Prisma.Prisma__LessonClient<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__LessonClient<{
        id: number;
        moduleId: number;
        slug: string | null;
        title: string;
        description: string | null;
        duration: string | null;
        type: import(".prisma/client").$Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
        orderNumber: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getProgress(lessonId: number, req: any): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        lessonId: number;
        userId: number;
        completed: boolean;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    completeLesson(lessonId: number, req: any): import(".prisma/client").Prisma.Prisma__LessonProgressClient<{
        lessonId: number;
        userId: number;
        completed: boolean;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getCourseProgress(courseId: number, req: any): import(".prisma/client").Prisma.PrismaPromise<({
        lesson: {
            id: number;
            moduleId: number;
            title: string;
            module: {
                id: number;
                title: string;
                orderNumber: number;
                courseId: number;
            };
        };
    } & {
        lessonId: number;
        userId: number;
        completed: boolean;
        updatedAt: Date;
    })[]>;
}
