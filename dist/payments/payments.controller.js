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
const payments_service_1 = require("./payments.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_payment_dto_1 = require("./dto/request/create-payment.dto");
const update_payment_status_dto_ts_1 = require("./dto/request/update-payment-status.dto.ts");
const cancel_payment_dto_1 = require("./dto/request/cancel-payment.dto");
const payment_response_dto_1 = require("./dto/response/payment.response.dto");
const swagger_1 = require("@nestjs/swagger");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async getAll() {
        return this.paymentsService.getAll();
    }
    async getById(id) {
        return this.paymentsService.getById(+id);
    }
    async getByUser(userId) {
        return this.paymentsService.getByUser(+userId);
    }
    async create(dto) {
        return this.paymentsService.createPayment(dto);
    }
    async updateStatus(id, dto) {
        return this.paymentsService.updateStatus(+id, dto.status);
    }
    async verify(id) {
        return this.paymentsService.verify(+id);
    }
    async cancel(id, dto) {
        return this.paymentsService.cancel(+id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all payments" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get payment by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("user/:userId"),
    (0, swagger_1.ApiOperation)({ summary: "Get payments by user" }),
    (0, swagger_1.ApiParam)({ name: "userId", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [payment_response_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new payment" }),
    (0, swagger_1.ApiBody)({ type: create_payment_dto_1.CreatePaymentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id/status"),
    (0, swagger_1.ApiOperation)({ summary: "Update payment status" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: update_payment_status_dto_ts_1.UpdatePaymentStatusDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_status_dto_ts_1.UpdatePaymentStatusDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Post)(":id/verify"),
    (0, swagger_1.ApiOperation)({ summary: "Verify a payment" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)(":id/cancel"),
    (0, swagger_1.ApiOperation)({ summary: "Cancel a payment" }),
    (0, swagger_1.ApiParam)({ name: "id", type: Number }),
    (0, swagger_1.ApiBody)({ type: cancel_payment_dto_1.CancelPaymentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: payment_response_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_payment_dto_1.CancelPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "cancel", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)("payments"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("payments"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map