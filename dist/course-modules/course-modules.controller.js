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
exports.CourseModulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_modules_service_1 = require("./course-modules.service");
const create_module_dto_1 = require("./dto/request/create-module.dto");
const update_module_dto_1 = require("./dto/request/update-module.dto");
const module_response_dto_1 = require("./dto/response/module.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let CourseModulesController = class CourseModulesController {
    courseModulesService;
    constructor(courseModulesService) {
        this.courseModulesService = courseModulesService;
    }
    async getCourseModules(courseId, req) {
        return await this.courseModulesService.findByCourseWithAccess(courseId, req.user);
    }
    async getModule(id, req) {
        return await this.courseModulesService.findOneWithAccess(id, req.user);
    }
    async createModule(courseId, createModuleDto, req) {
        return await this.courseModulesService.createForCourse(courseId, createModuleDto, req.user);
    }
    async updateModule(id, updateModuleDto, req) {
        return await this.courseModulesService.updateWithOwnership(id, updateModuleDto, req.user);
    }
    async deleteModule(id, req) {
        return await this.courseModulesService.removeWithOwnership(id, req.user);
    }
};
exports.CourseModulesController = CourseModulesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, common_1.Get)('courses/:courseId/modules'),
    (0, swagger_1.ApiOperation)({ summary: 'Get course modules' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'Course ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Course modules retrieved successfully', type: [module_response_dto_1.ModuleResponseDto] }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "getCourseModules", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, common_1.Get)('modules/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get module by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Module ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module retrieved successfully', type: module_response_dto_1.ModuleResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "getModule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Post)('courses/:courseId/modules'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new module' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'Course ID', type: Number }),
    (0, swagger_1.ApiBody)({ type: create_module_dto_1.CreateModuleDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Module created successfully', type: module_response_dto_1.ModuleResponseDto }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_module_dto_1.CreateModuleDto, Object]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "createModule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Put)('modules/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update module' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Module ID', type: Number }),
    (0, swagger_1.ApiBody)({ type: update_module_dto_1.UpdateModuleDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module updated successfully', type: module_response_dto_1.ModuleResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_module_dto_1.UpdateModuleDto, Object]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "updateModule", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Delete)('modules/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete module' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Module ID', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Module deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "deleteModule", null);
exports.CourseModulesController = CourseModulesController = __decorate([
    (0, swagger_1.ApiTags)('Course Modules & Lessons'),
    (0, common_1.Controller)('api'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [course_modules_service_1.CourseModulesService])
], CourseModulesController);
//# sourceMappingURL=course-modules.controller.js.map