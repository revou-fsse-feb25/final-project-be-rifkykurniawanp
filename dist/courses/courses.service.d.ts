import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
import { CourseFilter } from './interfaces/courses.repository.interface';
import { RoleName } from '@prisma/client';
export declare class CoursesService {
    private coursesRepository;
    constructor(coursesRepository: CoursesRepository);
    create(createCourseDto: CreateCourseDto, currentUserId: number, currentUserRole: RoleName): Promise<CourseResponseDto>;
    findAll(page?: number, limit?: number, filter?: CourseFilter): Promise<CourseResponseDto[]>;
    findOne(id: number): Promise<CourseResponseDto>;
    findBySlug(slug: string): Promise<CourseResponseDto>;
    findByInstructorId(instructorId: number): Promise<CourseResponseDto[]>;
    update(id: number, updateCourseDto: UpdateCourseDto, currentUserId: number, currentUserRole: RoleName): Promise<CourseResponseDto>;
    remove(id: number, currentUserId: number, currentUserRole: RoleName): Promise<void>;
    private toResponseDto;
}
