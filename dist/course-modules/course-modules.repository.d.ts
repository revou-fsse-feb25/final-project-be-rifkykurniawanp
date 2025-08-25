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
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }>;
    findAll(skip: number, take: number, filter?: CourseModuleFilter): Promise<({
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    })[]>;
    findById(id: number, filter?: CourseModuleFilter): Promise<({
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }) | null>;
    findByIdIncludingDeleted(id: number): Promise<({
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }) | null>;
    update(id: number, data: UpdateCourseModuleDto): Promise<{
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }>;
    softDelete(id: number): Promise<{
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }>;
    hardDelete(id: number): Promise<{
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }>;
    restore(id: number): Promise<{
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
            students: number;
        };
        lessons: {
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
        }[];
    } & {
        title: string;
        id: number;
        deletedAt: Date | null;
        courseId: number;
        orderNumber: number;
    }>;
}
