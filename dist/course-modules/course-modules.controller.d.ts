import { CourseModulesService } from './course-modules.service';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { ModuleResponseDto } from './dto/response/module.response.dto';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    getCourseModules(courseId: number, req: any): Promise<ModuleResponseDto[]>;
    getModule(id: number, req: any): Promise<ModuleResponseDto>;
    createModule(courseId: number, createModuleDto: CreateModuleDto, req: any): Promise<ModuleResponseDto>;
    updateModule(id: number, updateModuleDto: UpdateModuleDto, req: any): Promise<ModuleResponseDto>;
    deleteModule(id: number, req: any): Promise<void>;
}
