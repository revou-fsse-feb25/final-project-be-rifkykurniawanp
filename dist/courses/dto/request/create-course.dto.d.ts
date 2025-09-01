import { CourseCategory, CourseLevel } from '@prisma/client';
export declare class CreateCourseDto {
    title: string;
    slug: string;
    description?: string;
    syllabus?: string;
    price: number;
    instructorId: number;
    duration?: string;
    level: CourseLevel;
    category: CourseCategory;
    language?: string;
    certificate?: boolean;
}
