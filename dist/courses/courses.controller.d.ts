import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(createCourseDto: CreateCourseDto): Promise<CourseResponseDto>;
    findAll(page?: number, limit?: number): Promise<CourseResponseDto[]>;
    findOne(id: string): Promise<CourseResponseDto>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseResponseDto>;
    remove(id: string): Promise<void>;
}
