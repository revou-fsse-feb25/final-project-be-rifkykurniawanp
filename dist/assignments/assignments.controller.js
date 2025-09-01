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
exports.AssignmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assignments_service_1 = require("./assignments.service");
const create_assignment_dto_1 = require("./dto/request/create-assignment.dto");
const update_assignment_dto_1 = require("./dto/request/update-assignment.dto");
const create_submission_dto_1 = require("./dto/request/create-submission.dto");
const update_submission_dto_1 = require("./dto/request/update-submission.dto");
const assignment_response_dto_1 = require("./dto/response/assignment.response.dto");
const submission_response_dto_1 = require("./dto/response/submission.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let AssignmentsController = class AssignmentsController {
    assignmentsService;
    constructor(assignmentsService) {
        this.assignmentsService = assignmentsService;
    }
    create(dto, req) {
        const { user } = req;
        return this.assignmentsService.create(dto, user.sub, user.role);
    }
    findAll(page, limit, req) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const { user } = req;
        return this.assignmentsService.findAll(pageNum, limitNum, user.role);
    }
    getDeleted(page, limit, req) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const { user } = req;
        return this.assignmentsService.getDeleted(pageNum, limitNum, user.role);
    }
    findByLesson(lessonId, req) {
        const { user } = req;
        return this.assignmentsService.findByLesson(lessonId, user.sub, user.role);
    }
    findByCourse(courseId, req) {
        const { user } = req;
        return this.assignmentsService.findByCourse(courseId, user.sub, user.role);
    }
    findOne(id, req) {
        const { user } = req;
        return this.assignmentsService.findOne(id, user.sub, user.role);
    }
    update(id, dto, req) {
        const { user } = req;
        return this.assignmentsService.update(id, dto, user.sub, user.role);
    }
    remove(id, req) {
        const { user } = req;
        return this.assignmentsService.remove(id, user.sub, user.role);
    }
    forceDelete(id, req) {
        const { user } = req;
        return this.assignmentsService.forceDelete(id, user.role);
    }
    restore(id, req) {
        const { user } = req;
        return this.assignmentsService.restore(id, user.role);
    }
    createSubmission(dto, req) {
        const { user } = req;
        return this.assignmentsService.createSubmission(dto, user.sub, user.role);
    }
    getSubmissionsByAssignment(assignmentId, req) {
        const { user } = req;
        return this.assignmentsService.findSubmissionsByAssignment(assignmentId, user.sub, user.role);
    }
    getSubmissionsByUser(userId, req) {
        const { user } = req;
        return this.assignmentsService.findSubmissionsByUser(userId, user.sub, user.role);
    }
    updateSubmission(id, dto, req) {
        const { user } = req;
        return this.assignmentsService.updateSubmission(id, dto, user.sub, user.role);
    }
    removeSubmission(id, req) {
        const { user } = req;
        return this.assignmentsService.removeSubmission(id, user.sub, user.role);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new assignment' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assignments with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [assignment_response_dto_1.AssignmentResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('deleted'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft deleted assignments (Admin only)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [assignment_response_dto_1.AssignmentResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getDeleted", null);
__decorate([
    (0, common_1.Get)('lesson/:lessonId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assignments by lesson ID' }),
    (0, swagger_1.ApiParam)({ name: 'lessonId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [assignment_response_dto_1.AssignmentResponseDto] }),
    __param(0, (0, common_1.Param)('lessonId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findByLesson", null);
__decorate([
    (0, common_1.Get)('course/:courseId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assignments by course ID' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [assignment_response_dto_1.AssignmentResponseDto] }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get an assignment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an assignment' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_assignment_dto_1.UpdateAssignmentDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete an assignment' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/force'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Permanently delete an assignment (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.Patch)(':id/restore'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted assignment (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "restore", null);
__decorate([
    (0, common_1.Post)('submissions'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new submission' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: submission_response_dto_1.SubmissionResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_dto_1.CreateSubmissionDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "createSubmission", null);
__decorate([
    (0, common_1.Get)(':id/submissions'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by assignment ID (Instructors & Admins only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [submission_response_dto_1.SubmissionResponseDto] }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getSubmissionsByAssignment", null);
__decorate([
    (0, common_1.Get)('submissions/user/:userId'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by user ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [submission_response_dto_1.SubmissionResponseDto] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getSubmissionsByUser", null);
__decorate([
    (0, common_1.Patch)('submissions/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a submission' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: submission_response_dto_1.SubmissionResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_submission_dto_1.UpdateSubmissionDto, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "updateSubmission", null);
__decorate([
    (0, common_1.Delete)('submissions/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a submission' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "removeSubmission", null);
exports.AssignmentsController = AssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('Assignments'),
    (0, common_1.Controller)('assignments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
//# sourceMappingURL=assignments.controller.js.map