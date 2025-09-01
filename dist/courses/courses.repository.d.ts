import { PrismaService } from '../prisma/prisma.service';
import { ICoursesRepository, CourseFilter } from './interfaces/courses.repository.interface';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { Course } from '@prisma/client';
export declare class CoursesRepository implements ICoursesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCourseDto & {
        instructorId: number;
    }): Promise<Course>;
    findAll(skip: number, take: number, filter?: CourseFilter): Promise<Course[]>;
    findById(id: number, filter?: CourseFilter): Promise<Course | null>;
    findBySlug(slug: string, filter?: CourseFilter): Promise<Course | null>;
    findByInstructorId(instructorId: number, filter?: CourseFilter): Promise<Course[]>;
    update(id: number, data: UpdateCourseDto): Promise<Course>;
    softDelete(id: number): Promise<void>;
    hardDelete(id: number): Promise<void>;
    restore(id: number): Promise<Course>;
    findBySlugIncludingDeleted(slug: string): Promise<Course | null>;
    findByIdIncludingDeleted(id: number): Promise<Course | null>;
}
