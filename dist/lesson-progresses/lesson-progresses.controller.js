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
exports.LessonProgressesController = void 0;
const common_1 = require("@nestjs/common");
const lesson_progresses_service_1 = require("./lesson-progresses.service");
const swagger_1 = require("@nestjs/swagger");
const lesson_progress_response_dto_1 = require("./dto/response/lesson-progress.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let LessonProgressesController = class LessonProgressesController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAllByUser(userId) {
        return this.service.getAllByUser(userId);
    }
    markCompleted(userId, lessonId) {
        return this.service.markCompleted(userId, lessonId);
    }
    getProgress(userId, lessonId) {
        return this.service.getProgress(userId, lessonId);
    }
};
exports.LessonProgressesController = LessonProgressesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lesson progresses for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [lesson_progress_response_dto_1.LessonProgressResponseDto] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonProgressesController.prototype, "getAllByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER'),
    (0, common_1.Post)(':userId/:lessonId/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark lesson as completed' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: lesson_progress_response_dto_1.LessonProgressResponseDto }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LessonProgressesController.prototype, "markCompleted", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, common_1.Get)(':userId/:lessonId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson progress by user and lesson' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: lesson_progress_response_dto_1.LessonProgressResponseDto }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], LessonProgressesController.prototype, "getProgress", null);
exports.LessonProgressesController = LessonProgressesController = __decorate([
    (0, swagger_1.ApiTags)('Lesson Progresses'),
    (0, common_1.Controller)('lesson-progresses'),
    __metadata("design:paramtypes", [lesson_progresses_service_1.LessonProgressesService])
], LessonProgressesController);
//# sourceMappingURL=lesson-progresses.controller.js.map