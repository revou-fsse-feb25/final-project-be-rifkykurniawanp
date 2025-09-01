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
exports.SubmissionController = void 0;
const common_1 = require("@nestjs/common");
const assignment_submissions_service_1 = require("./assignment-submissions.service");
const create_submission_dto_1 = require("./dto/request/create-submission.dto");
const update_submission_dto_1 = require("./dto/request/update-submission.dto");
const grade_assignment_submission_dto_1 = require("./dto/request/grade-assignment-submission.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let SubmissionController = class SubmissionController {
    submissionService;
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    async getAssignmentSubmissions(assignmentId, req, page = 1, limit = 20, graded, userId) {
        return this.submissionService.getAssignmentSubmissions(assignmentId, req.user.id, req.user.role, page, limit, graded, userId);
    }
    async submitAssignment(assignmentId, createSubmissionDto, req) {
        return this.submissionService.submitAssignment(assignmentId, createSubmissionDto, req.user.id);
    }
    async getSubmissionById(id, req) {
        return this.submissionService.getSubmissionById(id, req.user.id, req.user.role);
    }
    async updateSubmission(id, updateSubmissionDto, req) {
        return this.submissionService.updateSubmission(id, updateSubmissionDto, req.user.id, req.user.role);
    }
    async deleteSubmission(id, req) {
        return this.submissionService.deleteSubmission(id, req.user.id, req.user.role);
    }
    async gradeSubmission(id, gradeSubmissionDto, req) {
        return this.submissionService.gradeSubmission(id, gradeSubmissionDto, req.user.id, req.user.role);
    }
    async getSubmissionStats(assignmentId, req) {
        return this.submissionService.getSubmissionStats(assignmentId, req.user.id, req.user.role);
    }
};
exports.SubmissionController = SubmissionController;
__decorate([
    (0, common_1.Get)('assignments/:id/submissions'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('graded', common_1.ParseBoolPipe)),
    __param(5, (0, common_1.Query)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Boolean, Number]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getAssignmentSubmissions", null);
__decorate([
    (0, common_1.Post)('assignments/:id/submit'),
    (0, roles_decorator_1.Roles)('USER'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_submission_dto_1.CreateAssignmentSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "submitAssignment", null);
__decorate([
    (0, common_1.Get)('submissions/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR', 'USER'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getSubmissionById", null);
__decorate([
    (0, common_1.Put)('submissions/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_submission_dto_1.UpdateAssignmentSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "updateSubmission", null);
__decorate([
    (0, common_1.Delete)('submissions/:id'),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "deleteSubmission", null);
__decorate([
    (0, common_1.Put)('submissions/:id/grade'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, grade_assignment_submission_dto_1.GradeAssignmentSubmissionDto, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "gradeSubmission", null);
__decorate([
    (0, common_1.Get)('assignments/:id/submissions/stats'),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getSubmissionStats", null);
exports.SubmissionController = SubmissionController = __decorate([
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [assignment_submissions_service_1.AssignmentSubmissionService])
], SubmissionController);
//# sourceMappingURL=assignment-submissions.controller.js.map