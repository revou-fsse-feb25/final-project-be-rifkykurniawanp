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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/request/create-user.dto");
const update_user_dto_1 = require("./dto/request/update-user.dto");
const user_response_dto_1 = require("./dto/response/user.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(dto) {
        return this.usersService.create(dto);
    }
    findAll(page, limit) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        return this.usersService.findAll(pageNum, limitNum);
    }
    findByRole(role) {
        return this.usersService.findByRole(role);
    }
    findOne(id, req) {
        return this.usersService.findOne(id, req.user.id, req.user.role);
    }
    update(id, dto, req) {
        return this.usersService.update(id, dto, req.user.id, req.user.role);
    }
    remove(id, req) {
        return this.usersService.remove(id, req.user.id, req.user.role);
    }
    getDeleted(req, page, limit) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        return this.usersService.getDeleted(pageNum, limitNum, req.user.role);
    }
    forceDelete(id, req) {
        return this.usersService.forceDelete(id, req.user.role);
    }
    restore(id, req) {
        return this.usersService.restore(id, req.user.role);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The user has been successfully created.', type: user_response_dto_1.UserResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Email already exists' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of users', type: [user_response_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('role/:role'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get users by role' }),
    (0, swagger_1.ApiParam)({ name: 'role', enum: client_1.RoleName }),
    (0, swagger_1.ApiOkResponse)({ description: 'Users with the specified role', type: [user_response_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Param)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findByRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'The user with the given ID', type: user_response_dto_1.UserResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'The updated user', type: user_response_dto_1.UserResponseDto }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input or email already exists' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a user' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully deleted (soft delete)' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('deleted'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all soft deleted users (Admin only)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of deleted users', type: [user_response_dto_1.UserResponseDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getDeleted", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id/force'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Permanently delete a user by ID (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'User permanently deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted user (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiOkResponse)({ description: 'User successfully restored', type: user_response_dto_1.UserResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Deleted user not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "restore", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map