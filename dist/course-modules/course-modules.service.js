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
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDto, courseId) {
        const module = await this.repo.create({ ...createDto, courseId });
        return this.toResponseDto(module);
    }
    async findAll(courseId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const modules = await this.repo.findAll(skip, limit, { courseId, deletedAt: null });
        return modules.map(m => this.toResponseDto(m));
    }
    async findOne(id) {
        const module = await this.repo.findById(id, { deletedAt: null });
        if (!module)
            throw new common_1.NotFoundException('Course module not found');
        return this.toResponseDto(module);
    }
    async update(id, updateDto) {
        const existing = await this.repo.findById(id, { deletedAt: null });
        if (!existing)
            throw new common_1.NotFoundException('Course module not found');
        const updated = await this.repo.update(id, updateDto);
        return this.toResponseDto(updated);
    }
    async remove(id) {
        const existing = await this.repo.findById(id, { deletedAt: null });
        if (!existing)
            throw new common_1.NotFoundException('Course module not found');
        await this.repo.softDelete(id);
    }
    async forceDelete(id) {
        const existing = await this.repo.findByIdIncludingDeleted(id);
        if (!existing)
            throw new common_1.NotFoundException('Course module not found');
        await this.repo.hardDelete(id);
    }
    async restore(id) {
        const module = await this.repo.findByIdIncludingDeleted(id);
        if (!module || !module.deletedAt)
            throw new common_1.NotFoundException('Deleted course module not found');
        const restored = await this.repo.restore(id);
        return this.toResponseDto(restored);
    }
    toResponseDto(module) {
        return {
            id: module.id,
            title: module.title,
            orderNumber: module.orderNumber,
            courseId: module.courseId,
            lessons: module.lessons,
            createdAt: module.createdAt,
        };
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_modules_repository_1.CourseModulesRepository])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map