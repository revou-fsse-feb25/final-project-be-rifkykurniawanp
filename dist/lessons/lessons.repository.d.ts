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
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(skip: number, take: number, filter?: LessonFilter): Promise<({
        assignments: {
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            title: string;
            id: number;
            deletedAt: Date | null;
            courseId: number;
            orderNumber: number;
        };
        progresses: {
            userId: number;
            updatedAt: Date;
            lessonId: number;
            completed: boolean;
        }[];
    } & {
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findById(id: number, filter?: LessonFilter): Promise<({
        assignments: {
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            title: string;
            id: number;
            deletedAt: Date | null;
            courseId: number;
            orderNumber: number;
        };
        progresses: {
            userId: number;
            updatedAt: Date;
            lessonId: number;
            completed: boolean;
        }[];
    } & {
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    findByIdIncludingDeleted(id: number): Promise<({
        assignments: {
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            title: string;
            id: number;
            deletedAt: Date | null;
            courseId: number;
            orderNumber: number;
        };
        progresses: {
            userId: number;
            updatedAt: Date;
            lessonId: number;
            completed: boolean;
        }[];
    } & {
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    update(id: number, data: UpdateLessonDto): Promise<{
        assignments: {
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            title: string;
            id: number;
            deletedAt: Date | null;
            courseId: number;
            orderNumber: number;
        };
        progresses: {
            userId: number;
            updatedAt: Date;
            lessonId: number;
            completed: boolean;
        }[];
    } & {
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }>;
    softDelete(id: number): Promise<{
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }>;
    hardDelete(id: number): Promise<{
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }>;
    restore(id: number): Promise<{
        assignments: {
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            lessonId: number;
            instructions: string;
            dueDate: Date | null;
        }[];
        module: {
            title: string;
            id: number;
            deletedAt: Date | null;
            courseId: number;
            orderNumber: number;
        };
        progresses: {
            userId: number;
            updatedAt: Date;
            lessonId: number;
            completed: boolean;
        }[];
    } & {
        type: import(".prisma/client").$Enums.LessonType;
        description: string | null;
        title: string;
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        content: string | null;
        slug: string | null;
        duration: string | null;
        orderNumber: number;
        moduleId: number;
        videoUrl: string | null;
        quizQuestions: import("@prisma/client/runtime/library").JsonValue | null;
        passingScore: import("@prisma/client/runtime/library").Decimal;
    }>;
}
