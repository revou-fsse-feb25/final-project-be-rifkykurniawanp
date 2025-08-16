import { CourseCategory, CourseLevel } from '@prisma/client';
import { InstructorResponseDto } from './instructor.response.dto';
export declare class CourseResponseDto {
    id: number;
    title: string;
    slug: string;
    description?: string;
    syllabus?: string;
    price: number;
    rating: number;
    students: number;
    duration?: string;
    level: CourseLevel;
    category: CourseCategory;
    language: string;
    certificate: boolean;
    createdAt: Date;
    instructor: InstructorResponseDto;
    modules?: Array<any>;
    enrollments?: Array<any>;
}
