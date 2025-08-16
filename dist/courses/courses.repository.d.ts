import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';
import { ICoursesRepository, CreateCourseData, UpdateCourseData, CourseFilter } from './interfaces/courses.repository.interface';
export declare class CoursesRepository implements ICoursesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCourseData): Promise<Course>;
    findById(id: number): Promise<Course | null>;
    findBySlug(slug: string): Promise<Course | null>;
    findAll(skip?: number, take?: number, filter?: CourseFilter): Promise<Course[]>;
    update(id: number, data: UpdateCourseData): Promise<Course>;
    delete(id: number): Promise<Course>;
    updateRating(id: number, rating: number): Promise<Course>;
    incrementStudentCount(id: number): Promise<Course>;
    findByInstructorId(instructorId: number): Promise<Course[]>;
}
