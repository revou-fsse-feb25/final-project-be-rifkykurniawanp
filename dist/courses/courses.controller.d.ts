import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseCategory, CourseLevel } from '@prisma/client';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): string;
    findAll(page?: number, limit?: number, category?: CourseCategory, level?: CourseLevel): string;
    findOne(id: number): string;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
    remove(id: number): string;
}
