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
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const lessons_repository_1 = require("./lessons.repository");
let LessonsService = class LessonsService {
    lessonsRepository;
    constructor(lessonsRepository) {
        this.lessonsRepository = lessonsRepository;
    }
    create(dto) {
        return this.lessonsRepository.create(dto);
    }
    findAllByModule(moduleId) {
        return this.lessonsRepository.findAllByModule(moduleId);
    }
    findOne(id) {
        return this.lessonsRepository.findOne(id);
    }
    findBySlug(slug) {
        return this.lessonsRepository.findBySlug(slug);
    }
    update(id, dto) {
        return this.lessonsRepository.update(id, dto);
    }
    remove(id) {
        return this.lessonsRepository.remove(id);
    }
    getProgress(lessonId, userId) {
        return this.lessonsRepository.getProgress(lessonId, userId);
    }
    completeLesson(lessonId, userId) {
        return this.lessonsRepository.completeLesson(lessonId, userId);
    }
    getCourseProgress(courseId, userId) {
        return this.lessonsRepository.getCourseProgress(courseId, userId);
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lessons_repository_1.LessonsRepository])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map