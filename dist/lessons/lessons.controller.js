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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
const lessons_service_1 = require("./lessons.service");
const create_lesson_dto_1 = require("./dto/request/create-lesson.dto");
const update_lesson_dto_1 = require("./dto/request/update-lesson.dto");
const lesson_response_dto_1 = require("./dto/response/lesson.response.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let LessonsController = class LessonsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(createDto, moduleId) {
        return this.service.create(createDto, moduleId);
    }
    findAll(moduleId) {
        return this.service.findAll(moduleId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, updateDto) {
        return this.service.update(id, updateDto);
    }
    remove(id) {
        return this.service.remove(id);
    }
    forceDelete(id) {
        return this.service.forceDelete(id);
    }
    restore(id) {
        return this.service.restore(id);
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lesson' }),
    (0, swagger_1.ApiCreatedResponse)({ type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)('moduleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lesson_dto_1.CreateLessonDto, Number]),
    __metadata("design:returntype", Promise)
], LessonsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('module/:moduleId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lessons of a module' }),
    (0, swagger_1.ApiOkResponse)({ type: [lesson_response_dto_1.LessonResponseDto] }),
    __param(0, (0, common_1.Param)('moduleId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get lesson by ID' }),
    (0, swagger_1.ApiOkResponse)({ type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lesson by ID' }),
    (0, swagger_1.ApiOkResponse)({ type: lesson_response_dto_1.LessonResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_lesson_dto_1.UpdateLessonDto]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a lesson by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/force'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Force delete a lesson by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted lesson by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "restore", null);
exports.LessonsController = LessonsController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), role_guard_1.RolesGuard),
    (0, common_1.Controller)('lessons'),
    __metadata("design:paramtypes", [lessons_service_1.LessonsService])
], LessonsController);
//# sourceMappingURL=lessons.controller.js.map