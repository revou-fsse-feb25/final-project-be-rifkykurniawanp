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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const lessons_repository_interface_1 = require("./interfaces/lessons.repository.interface");
let LessonsService = class LessonsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(createDto, moduleId) {
        const lesson = await this.repo.create({ ...createDto, moduleId });
        return this.toResponseDto(lesson);
    }
    async findAll(moduleId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const lessons = await this.repo.findAll(skip, limit, { moduleId, deletedAt: null });
        return lessons.map(l => this.toResponseDto(l));
    }
    async findOne(id) {
        const lesson = await this.repo.findById(id, { deletedAt: null });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        return this.toResponseDto(lesson);
    }
    async update(id, updateDto) {
        const existing = await this.repo.findById(id, { deletedAt: null });
        if (!existing)
            throw new common_1.NotFoundException('Lesson not found');
        const updated = await this.repo.update(id, updateDto);
        return this.toResponseDto(updated);
    }
    async remove(id) {
        const existing = await this.repo.findById(id, { deletedAt: null });
        if (!existing)
            throw new common_1.NotFoundException('Lesson not found');
        await this.repo.softDelete(id);
    }
    async forceDelete(id) {
        const existing = await this.repo.findByIdIncludingDeleted(id);
        if (!existing)
            throw new common_1.NotFoundException('Lesson not found');
        await this.repo.hardDelete(id);
    }
    async restore(id) {
        const lesson = await this.repo.findByIdIncludingDeleted(id);
        if (!lesson || !lesson.deletedAt)
            throw new common_1.NotFoundException('Deleted lesson not found');
        const restored = await this.repo.restore(id);
        return this.toResponseDto(restored);
    }
    toResponseDto(lesson) {
        return {
            id: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            description: lesson.description,
            duration: lesson.duration,
            type: lesson.type,
            moduleId: lesson.moduleId,
            orderNumber: lesson.orderNumber,
            videoUrl: lesson.videoUrl,
            content: lesson.content,
            quizQuestions: lesson.quizQuestions,
            passingScore: lesson.passingScore,
            createdAt: lesson.createdAt,
            deletedAt: lesson.deletedAt,
        };
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(lessons_repository_interface_1.ILessonsRepository)),
    __metadata("design:paramtypes", [Object])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map