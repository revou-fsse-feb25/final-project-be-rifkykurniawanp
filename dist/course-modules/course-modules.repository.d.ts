import { PrismaService } from '../prisma/prisma.service';
import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
export declare class CourseModulesRepository implements ICourseModulesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateModuleDto): Promise<{
        course: {
            id: number;
            title: string;
            slug: string;
        };
        lessons: {
            id: number;
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        orderNumber: number;
    }>;
    findAll(): Promise<({
        course: {
            id: number;
            title: string;
            slug: string;
        };
        lessons: {
            id: number;
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        orderNumber: number;
    })[]>;
    findById(id: number): Promise<({
        course: {
            id: number;
            title: string;
            slug: string;
        };
        lessons: {
            id: number;
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        orderNumber: number;
    }) | null>;
    findByCourseId(courseId: number): Promise<({
        course: {
            id: number;
            title: string;
            slug: string;
        };
        lessons: {
            id: number;
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        orderNumber: number;
    })[]>;
    update(id: number, data: UpdateModuleDto): Promise<{
        course: {
            id: number;
            title: string;
            slug: string;
        };
        lessons: {
            id: number;
            type: import(".prisma/client").$Enums.LessonType;
            title: string;
            slug: string | null;
            duration: string | null;
            orderNumber: number;
        }[];
    } & {
        id: number;
        title: string;
        courseId: number;
        orderNumber: number;
    }>;
    delete(id: number): Promise<void>;
}
