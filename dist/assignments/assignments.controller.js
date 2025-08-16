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
const assignments_service_1 = require("./assignments.service");
const create_assignment_dto_1 = require("./dto/request/create-assignment.dto");
const update_assignment_dto_1 = require("./dto/request/update-assignment.dto");
const swagger_1 = require("@nestjs/swagger");
const assignment_response_dto_1 = require("./dto/response/assignment.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let AssignmentsController = class AssignmentsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.AssignmentsController = AssignmentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new assignment' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assignment_dto_1.CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all assignments' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [assignment_response_dto_1.AssignmentResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assignment by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an assignment' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: assignment_response_dto_1.AssignmentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_assignment_dto_1.UpdateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an assignment' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "remove", null);
exports.AssignmentsController = AssignmentsController = __decorate([
    (0, swagger_1.ApiTags)('Assignments'),
    (0, common_1.Controller)('assignments'),
    __metadata("design:paramtypes", [assignments_service_1.AssignmentsService])
], AssignmentsController);
//# sourceMappingURL=assignments.controller.js.map