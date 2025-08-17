import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
export declare class CourseModulesRepository implements ICourseModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateModuleDto): Promise<{
        course: {
            title: string;
            id: number;
            slug: string;
        };
        lessons: {
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            id: number;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        title: string;
        id: number;
        courseId: number;
        orderNumber: number;
    }>;
    findAll(): Promise<({
        course: {
            title: string;
            id: number;
            slug: string;
        };
        lessons: {
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            id: number;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        title: string;
        id: number;
        courseId: number;
        orderNumber: number;
    })[]>;
    findById(id: number): Promise<({
        course: {
            title: string;
            id: number;
            slug: string;
        };
        lessons: {
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            id: number;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        title: string;
        id: number;
        courseId: number;
        orderNumber: number;
    }) | null>;
    findByCourseId(courseId: number): Promise<({
        course: {
            title: string;
            id: number;
            slug: string;
        };
        lessons: {
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            id: number;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        title: string;
        id: number;
        courseId: number;
        orderNumber: number;
    })[]>;
    update(id: number, data: UpdateModuleDto): Promise<{
        course: {
            title: string;
            id: number;
            slug: string;
        };
        lessons: {
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            id: number;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        title: string;
        id: number;
        courseId: number;
        orderNumber: number;
    }>;
    delete(id: number): Promise<void>;
}
