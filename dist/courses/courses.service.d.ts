import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
export declare class CoursesService {
    create(createCourseDto: CreateCourseDto): string;
    findAll(page: number, limit: number, p0: unknown): string;
    findOne(id: number): string;
    update(id: number, updateCourseDto: UpdateCourseDto): string;
    remove(id: number): string;
}
