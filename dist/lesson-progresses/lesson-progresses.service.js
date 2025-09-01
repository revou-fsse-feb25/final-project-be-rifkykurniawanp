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
exports.LessonProgressesService = void 0;
const common_1 = require("@nestjs/common");
const lesson_progresses_repository_1 = require("./lesson-progresses.repository");
let LessonProgressesService = class LessonProgressesService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    getProgress(userId, lessonId) {
        return this.repository.findOne(userId, lessonId);
    }
    markCompleted(userId, lessonId) {
        return this.repository.markCompleted(userId, lessonId);
    }
    getAllByUser(userId) {
        return this.repository.findAllByUser(userId);
    }
};
exports.LessonProgressesService = LessonProgressesService;
exports.LessonProgressesService = LessonProgressesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lesson_progresses_repository_1.LessonProgressesRepository])
], LessonProgressesService);
//# sourceMappingURL=lesson-progresses.service.js.map