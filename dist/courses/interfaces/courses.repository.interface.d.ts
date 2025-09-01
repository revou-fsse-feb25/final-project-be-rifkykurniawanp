import { Course } from '@prisma/client';
import { CreateCourseDto } from '../dto/request/create-course.dto';
import { UpdateCourseDto } from '../dto/request/update-course.dto';
export interface CourseFilter {
    deletedAt?: Date | null;
    [key: string]: any;
}
export interface ICoursesRepository {
    create(data: CreateCourseDto & {
        instructorId: number;
    }): Promise<Course>;
    findAll(skip: number, take: number, filter?: CourseFilter): Promise<Course[]>;
    findById(id: number, filter?: CourseFilter): Promise<Course | null>;
    findByIdIncludingDeleted(id: number): Promise<Course | null>;
    findBySlug(slug: string, filter?: CourseFilter): Promise<Course | null>;
    findBySlugIncludingDeleted(slug: string): Promise<Course | null>;
    findByInstructorId(instructorId: number, filter?: CourseFilter): Promise<Course[]>;
    update(id: number, data: UpdateCourseDto): Promise<Course>;
    softDelete(id: number): Promise<void>;
    hardDelete(id: number): Promise<void>;
    restore(id: number): Promise<Course>;
}
