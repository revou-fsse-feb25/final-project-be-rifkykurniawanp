import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository, CourseModuleFilter } from './interfaces/course-modules.repository.interface';
import { CreateCourseModuleDto } from './dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/request/update-course-module.dto';
export declare class CourseModulesRepository implements ICourseModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCourseModuleDto & {
        courseId: number;
    }): Promise<{
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }>;
    findAll(skip: number, take: number, filter?: CourseModuleFilter): Promise<({
        course: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            duration: string | null;
            createdAt: Date;
            deletedAt: Date | null;
            certificate: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    })[]>;
    findById(id: number, filter?: CourseModuleFilter): Promise<({
        course: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            duration: string | null;
            createdAt: Date;
            deletedAt: Date | null;
            certificate: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }) | null>;
    findByIdIncludingDeleted(id: number): Promise<({
        course: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            duration: string | null;
            createdAt: Date;
            deletedAt: Date | null;
            certificate: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }) | null>;
    update(id: number, data: UpdateCourseModuleDto): Promise<{
        course: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            duration: string | null;
            createdAt: Date;
            deletedAt: Date | null;
            certificate: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }>;
    softDelete(id: number): Promise<{
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }>;
    hardDelete(id: number): Promise<{
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }>;
    restore(id: number): Promise<{
        course: {
            id: number;
            slug: string;
            title: string;
            description: string | null;
            duration: string | null;
            createdAt: Date;
            deletedAt: Date | null;
            certificate: boolean;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        id: number;
        title: string;
        orderNumber: number;
        deletedAt: Date | null;
        courseId: number;
    }>;
}
