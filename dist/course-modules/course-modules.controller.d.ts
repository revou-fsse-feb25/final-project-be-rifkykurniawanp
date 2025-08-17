import { CourseModulesService } from './course-modules.service';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    create(createModuleDto: CreateModuleDto): Promise<{
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
    findAll(courseId?: number): Promise<({
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
    findOne(id: number): Promise<{
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
    findByCourse(courseId: number): Promise<({
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
    update(id: number, updateModuleDto: UpdateModuleDto): Promise<{
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
    remove(id: number): Promise<{
        message: string;
    }>;
}
