import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/request/update-course-module.dto';
import { CourseModuleResponseDto } from './dto/response/course-module.response.dto';
export declare class CourseModulesController {
    private readonly service;
    constructor(service: CourseModulesService);
    create(createDto: CreateCourseModuleDto, courseId: number): Promise<CourseModuleResponseDto>;
    findAll(courseId: number): Promise<CourseModuleResponseDto[]>;
    findOne(id: number): Promise<CourseModuleResponseDto>;
    update(id: number, updateDto: UpdateCourseModuleDto): Promise<CourseModuleResponseDto>;
    remove(id: number): Promise<void>;
    forceDelete(id: number): Promise<void>;
    restore(id: number): Promise<CourseModuleResponseDto>;
}
