import { ICourseModulesRepository } from './interfaces/course-modules.repository.interface';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { ModuleResponseDto } from './dto/response/module.response.dto';
export declare class CourseModulesService {
    private readonly courseModulesRepository;
    constructor(courseModulesRepository: ICourseModulesRepository);
    findByCourseWithAccess(courseId: number, user: any): Promise<ModuleResponseDto[]>;
    findOneWithAccess(id: number, user: any): Promise<ModuleResponseDto>;
    createForCourse(courseId: number, createModuleDto: CreateModuleDto, user: any): Promise<ModuleResponseDto>;
    updateWithOwnership(id: number, updateModuleDto: UpdateModuleDto, user: any): Promise<ModuleResponseDto>;
    removeWithOwnership(id: number, user: any): Promise<void>;
    private mapToResponseDto;
}
