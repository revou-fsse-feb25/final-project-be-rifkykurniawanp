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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
let CourseModulesService = class CourseModulesService {
    courseModulesRepository;
    constructor(courseModulesRepository) {
        this.courseModulesRepository = courseModulesRepository;
    }
    async findByCourseWithAccess(courseId, user) {
        const courseExists = await this.courseModulesRepository.checkCourseExists(courseId);
        if (!courseExists) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (user.role === 'USER') {
        }
        const modules = await this.courseModulesRepository.findByCourseIdWithLessons(courseId);
        return modules.map(module => this.mapToResponseDto(module));
    }
    async findOneWithAccess(id, user) {
        const module = await this.courseModulesRepository.findByIdWithLessons(id);
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        if (user.role === 'USER') {
        }
        return this.mapToResponseDto(module);
    }
    async createForCourse(courseId, createModuleDto, user) {
        const courseExists = await this.courseModulesRepository.checkCourseExists(courseId);
        if (!courseExists) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (user.role === 'INSTRUCTOR') {
        }
        try {
            const module = await this.courseModulesRepository.create({
                ...createModuleDto,
                courseId,
            });
            return this.mapToResponseDto(module);
        }
        catch {
            throw new common_1.BadRequestException('Failed to create module');
        }
    }
    async updateWithOwnership(id, updateModuleDto, user) {
        const module = await this.courseModulesRepository.findById(id);
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        if (user.role === 'INSTRUCTOR') {
            const hasAccess = await this.courseModulesRepository.checkModuleOwnership(id, user.id);
            if (!hasAccess) {
                throw new common_1.ForbiddenException('You do not have permission to update this module');
            }
        }
        try {
            const updatedModule = await this.courseModulesRepository.update(id, updateModuleDto);
            return this.mapToResponseDto(updatedModule);
        }
        catch {
            throw new common_1.BadRequestException('Failed to update module');
        }
    }
    async removeWithOwnership(id, user) {
        const module = await this.courseModulesRepository.findById(id);
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        if (user.role === 'INSTRUCTOR') {
            const hasAccess = await this.courseModulesRepository.checkModuleOwnership(id, user.id);
            if (!hasAccess) {
                throw new common_1.ForbiddenException('You do not have permission to delete this module');
            }
        }
        try {
            await this.courseModulesRepository.delete(id);
        }
        catch {
            throw new common_1.BadRequestException('Failed to delete module');
        }
    }
    mapToResponseDto(module) {
        return {
            id: module.id,
            courseId: module.courseId,
            title: module.title,
            orderNumber: module.orderNumber,
            course: {
                id: module.course.id,
                title: module.course.title,
                instructorId: module.course.instructorId,
            },
            lessons: module.lessons?.map(lesson => ({
                id: lesson.id,
                slug: lesson.slug,
                title: lesson.title,
                description: lesson.description,
                duration: lesson.duration,
                type: lesson.type,
                orderNumber: lesson.orderNumber,
            })) || [],
            createdAt: module.createdAt || new Date(),
        };
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ICourseModulesRepository')),
    __metadata("design:paramtypes", [Object])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map