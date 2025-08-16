"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
const course_modules_repository_1 = require("./course-modules.repository");
let CourseModulesService = class CourseModulesService {
    courseModulesRepository;
    constructor(courseModulesRepository) {
        this.courseModulesRepository = courseModulesRepository;
    }
    async create(createModuleDto) {
        try {
            return await this.courseModulesRepository.create(createModuleDto);
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Course not found');
            }
            throw error;
        }
    }
    async findAll() {
        return await this.courseModulesRepository.findAll();
    }
    async findOne(id) {
        const module = await this.courseModulesRepository.findById(id);
        if (!module) {
            throw new common_1.NotFoundException(`Course module with ID ${id} not found`);
        }
        return module;
    }
    async findByCourse(courseId) {
        return await this.courseModulesRepository.findByCourseId(courseId);
    }
    async update(id, updateModuleDto) {
        const existingModule = await this.courseModulesRepository.findById(id);
        if (!existingModule) {
            throw new common_1.NotFoundException(`Course module with ID ${id} not found`);
        }
        try {
            return await this.courseModulesRepository.update(id, updateModuleDto);
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Course not found');
            }
            throw error;
        }
    }
    async remove(id) {
        const existingModule = await this.courseModulesRepository.findById(id);
        if (!existingModule) {
            throw new common_1.NotFoundException(`Course module with ID ${id} not found`);
        }
        await this.courseModulesRepository.delete(id);
        return { message: 'Course module deleted successfully' };
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_modules_repository_1.CourseModulesRepository])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map