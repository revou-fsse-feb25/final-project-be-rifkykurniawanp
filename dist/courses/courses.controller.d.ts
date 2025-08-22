import { Request } from 'express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
        email: string;
    };
}
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto, req: AuthenticatedRequest): Promise<CourseResponseDto>;
    findAll(page?: number, limit?: number): Promise<CourseResponseDto[]>;
    findBySlug(slug: string): Promise<CourseResponseDto>;
    findByInstructorId(instructorId: number): Promise<CourseResponseDto[]>;
    findOne(id: number): Promise<CourseResponseDto>;
    update(id: number, updateCourseDto: UpdateCourseDto, req: AuthenticatedRequest): Promise<CourseResponseDto>;
    remove(id: number, req: AuthenticatedRequest): Promise<void>;
    forceDelete(id: number, req: AuthenticatedRequest): Promise<void>;
    restore(id: number, req: AuthenticatedRequest): Promise<CourseResponseDto>;
}
export {};
