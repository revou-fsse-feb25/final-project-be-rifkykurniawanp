import { CourseModulesService } from './course-modules.service';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    create(createModuleDto: CreateModuleDto): Promise<{
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
    findAll(courseId?: number): Promise<({
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
    findOne(id: number): Promise<{
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
    findByCourse(courseId: number): Promise<({
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
    update(id: number, updateModuleDto: UpdateModuleDto): Promise<{
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
    remove(id: number): Promise<{
        message: string;
    }>;
}
