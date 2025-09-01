import { PrismaService } from '../prisma/prisma.service';
import { ILessonsRepository, LessonFilter } from './interfaces/lessons.repository.interface';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
export declare class LessonsRepository implements ILessonsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateLessonDto & {
        moduleId: number;
    }): Promise<{
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }>;
    findAll(skip: number, take: number, filter?: LessonFilter): Promise<({
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    })[]>;
    findById(id: number, filter?: LessonFilter): Promise<({
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }) | null>;
    findByIdIncludingDeleted(id: number): Promise<({
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }) | null>;
    update(id: number, data: UpdateLessonDto): Promise<{
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }>;
    softDelete(id: number): Promise<{
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }>;
    hardDelete(id: number): Promise<{
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
        deletedAt: Date | null;
    }>;
    restore(id: number): Promise<{
        assignments: {
            id: number;
            title: string;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            id: number;
            title: string;
            orderNumber: number;
            deletedAt: Date | null;
            courseId: number;
        };
        progresses: {
            lessonId: number;
            userId: number;
            completed: boolean;
            updatedAt: Date;
        }[];
    } & {
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
        deletedAt: Date | null;
    }>;
}
