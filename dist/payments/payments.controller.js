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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const payments_service_1 = require("./payments.service");
const create_payment_dto_1 = require("./dto/request/create-payment.dto");
const update_payment_dto_ts_1 = require("./dto/request/update-payment.dto.ts");
const payment_response_dto_1 = require("./dto/response/payment.response.dto");
const payment_stat_response_dto_1 = require("./dto/response/payment-stat.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    create(dto, req) {
        const { user } = req;
        return this.paymentsService.create(dto, user?.sub, user?.role);
    }
    findAll(page, limit, req) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const { user } = req;
        return this.paymentsService.findAll(pageNum, limitNum, user?.role);
    }
    getDeleted(page, limit, req) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const { user } = req;
        return this.paymentsService.getDeleted(pageNum, limitNum, user?.role);
    }
    getStats(req) {
        const { user } = req;
        return this.paymentsService.getStats(user?.role);
    }
    findByStatus(status, req) {
        const { user } = req;
        return this.paymentsService.findByStatus(status, user?.role);
    }
    findByPayableType(payableType, req) {
        const { user } = req;
        return this.paymentsService.findByPayableType(payableType, user?.role);
    }
    findByUser(userId, req) {
        const { user } = req;
        return this.paymentsService.findByUser(userId, user?.sub, user?.role);
    }
    getUserStats(userId, req) {
        const { user } = req;
        return this.paymentsService.getUserPaymentStats(userId, user?.sub, user?.role);
    }
    findOne(id, req) {
        const { user } = req;
        return this.paymentsService.findOne(id, user?.sub, user?.role);
    }
    update(id, dto, req) {
        const { user } = req;
        return this.paymentsService.update(id, dto, user?.sub, user?.role);
    }
    remove(id, req) {
        const { user } = req;
        return this.paymentsService.remove(id, user?.sub, user?.role);
    }
    forceDelete(id, req) {
        const { user } = req;
        return this.paymentsService.forceDelete(id, user?.role);
    }
    restore(id, req) {
        const { user } = req;
        return this.paymentsService.restore(id, user?.role);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payment' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments with pagination (Admin only)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('deleted'),
    (0, swagger_1.ApiOperation)({ summary: 'Get soft deleted payments (Admin only)' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getDeleted", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_stat_response_dto_1.PaymentStatsDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getStats", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('status/:status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments by status (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'status', enum: client_1.PaymentStatus }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Param)('status')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('type/:payableType'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments by payable type (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'payableType', enum: client_1.PayableType }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Param)('payableType')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findByPayableType", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments by user ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findByUser", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.Get)('user/:userId/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user payment statistics' }),
    (0, swagger_1.ApiParam)({ name: 'userId', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_stat_response_dto_1.PaymentStatsDto }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a payment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payment' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_payment_dto_ts_1.UpdatePaymentDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a payment' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Payment soft deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id/force'),
    (0, swagger_1.ApiOperation)({ summary: 'Permanently delete a payment (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Payment permanently deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted payment (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "restore", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map