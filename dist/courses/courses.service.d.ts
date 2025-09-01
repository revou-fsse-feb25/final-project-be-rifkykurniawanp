import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
import { RoleName } from '@prisma/client';
export declare class CoursesService {
    private readonly coursesRepository;
    constructor(coursesRepository: CoursesRepository);
    create(dto: CreateCourseDto, userId: number, role: RoleName): Promise<CourseResponseDto>;
    findAll(page?: number, limit?: number): Promise<CourseResponseDto[]>;
    findOne(id: number): Promise<CourseResponseDto>;
    findBySlug(slug: string): Promise<CourseResponseDto>;
    findByInstructorId(instructorId: number): Promise<CourseResponseDto[]>;
    update(id: number, dto: UpdateCourseDto, userId: number, role: RoleName): Promise<CourseResponseDto>;
    remove(id: number, userId: number, role: RoleName): Promise<void>;
    forceDelete(id: number, role: RoleName): Promise<void>;
    restore(id: number, role: RoleName): Promise<CourseResponseDto>;
    private toResponseDto;
}
