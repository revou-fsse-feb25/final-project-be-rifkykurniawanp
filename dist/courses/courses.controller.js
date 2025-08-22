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
exports.CoursesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const courses_service_1 = require("./courses.service");
const create_course_dto_1 = require("./dto/request/create-course.dto");
const update_course_dto_1 = require("./dto/request/update-course.dto");
const course_response_dto_1 = require("./dto/response/course.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let CoursesController = class CoursesController {
    coursesService;
    constructor(coursesService) {
        this.coursesService = coursesService;
    }
    async create(createCourseDto, req) {
        return this.coursesService.create(createCourseDto, req.user.id, req.user.role);
    }
    async findAll(page = 1, limit = 10) {
        return this.coursesService.findAll(Number(page), Number(limit));
    }
    async findBySlug(slug) {
        return this.coursesService.findBySlug(slug);
    }
    async findByInstructorId(instructorId) {
        return this.coursesService.findByInstructorId(instructorId);
    }
    async findOne(id) {
        return this.coursesService.findOne(id);
    }
    async update(id, updateCourseDto, req) {
        return this.coursesService.update(id, updateCourseDto, req.user.id, req.user.role);
    }
    async remove(id, req) {
        return this.coursesService.remove(id, req.user.id, req.user.role);
    }
    async forceDelete(id, req) {
        return this.coursesService.forceDelete(id, req.user.role);
    }
    async restore(id, req) {
        return this.coursesService.restore(id, req.user.role);
    }
};
exports.CoursesController = CoursesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new course' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The course has been successfully created.', type: course_response_dto_1.CourseResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Course slug already exists' }),
    (0, swagger_1.ApiBody)({ type: create_course_dto_1.CreateCourseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses with pagination' }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of courses', type: [course_response_dto_1.CourseResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Page number for pagination', type: 'number', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, description: 'Number of items per page', type: 'number', example: 10 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a course by its slug' }),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'The unique slug of the course', type: 'string' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The course with the given slug', type: course_response_dto_1.CourseResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Course not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('instructor/:instructorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all courses by an instructor ID' }),
    (0, swagger_1.ApiParam)({ name: 'instructorId', description: 'The unique ID of the instructor', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of courses by the specified instructor', type: [course_response_dto_1.CourseResponseDto] }),
    __param(0, (0, common_1.Param)('instructorId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findByInstructorId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single course by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the course', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The course with the given ID', type: course_response_dto_1.CourseResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a course by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the course', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The updated course', type: course_response_dto_1.CourseResponseDto }),
    (0, swagger_1.ApiBody)({ type: update_course_dto_1.UpdateCourseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Course not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input or slug already exists' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_course_dto_1.UpdateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a course by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the course', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Course successfully deleted (soft delete)' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id/force'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Permanently delete a course by ID (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the course', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Course permanently deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Course not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted course (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the course', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Course successfully restored', type: course_response_dto_1.CourseResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Deleted course not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CoursesController.prototype, "restore", null);
exports.CoursesController = CoursesController = __decorate([
    (0, swagger_1.ApiTags)('Courses'),
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [courses_service_1.CoursesService])
], CoursesController);
//# sourceMappingURL=courses.controller.js.map