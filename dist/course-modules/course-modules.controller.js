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
    async create(createModuleDto) {
        return await this.courseModulesService.create(createModuleDto);
    }
    async findAll(courseId) {
        if (courseId) {
            return await this.courseModulesService.findByCourse(courseId);
        }
        return await this.courseModulesService.findAll();
    }
    async findOne(id) {
        return await this.courseModulesService.findOne(id);
    }
    async findByCourse(courseId) {
        return await this.courseModulesService.findByCourse(courseId);
    }
    async update(id, updateModuleDto) {
        return await this.courseModulesService.update(id, updateModuleDto);
    }
    async remove(id) {
        return await this.courseModulesService.remove(id);
    }
};
exports.CourseModulesController = CourseModulesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course module' }),
    (0, swagger_1.ApiBody)({ type: create_module_dto_1.CreateModuleDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Course module created successfully',
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or course not found',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all course modules' }),
    (0, swagger_1.ApiQuery)({
        name: 'courseId',
        required: false,
        description: 'Filter by course ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of course modules retrieved successfully',
        type: [module_response_dto_1.ModuleResponseDto],
    }),
    __param(0, (0, common_1.Query)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a course module by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Course module ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Course module retrieved successfully',
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course module not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all modules for a specific course' }),
    (0, swagger_1.ApiParam)({
        name: 'courseId',
        description: 'Course ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Course modules retrieved successfully',
        type: [module_response_dto_1.ModuleResponseDto],
    }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a course module' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Course module ID',
        type: Number,
    }),
    (0, swagger_1.ApiBody)({ type: update_module_dto_1.UpdateModuleDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Course module updated successfully',
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course module not found',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data or course not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a course module' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Course module ID',
        type: Number,
    }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Course module deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Course module not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "remove", null);
exports.CourseModulesController = CourseModulesController = __decorate([
    (0, swagger_1.ApiTags)('Course Modules'),
    (0, common_1.Controller)('course-modules'),
    __metadata("design:paramtypes", [course_modules_service_1.CourseModulesService])
], CourseModulesController);
//# sourceMappingURL=course-modules.controller.js.map