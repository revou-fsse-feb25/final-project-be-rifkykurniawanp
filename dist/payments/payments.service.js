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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const payment_response_dto_1 = require("./dto/response/payment.response.dto");
let PaymentsService = class PaymentsService {
    paymentsRepo;
    constructor(paymentsRepo) {
        this.paymentsRepo = paymentsRepo;
    }
    async getAll() {
        const payments = await this.paymentsRepo.findAll();
        return payments.map((p) => new payment_response_dto_1.PaymentResponseDto(p));
    }
    async getById(id) {
        const payment = await this.paymentsRepo.findById(id);
        if (!payment)
            throw new common_1.NotFoundException("Payment not found");
        return new payment_response_dto_1.PaymentResponseDto(payment);
    }
    async getByUser(userId) {
        const payments = await this.paymentsRepo.findByUser(userId);
        return payments.map((p) => new payment_response_dto_1.PaymentResponseDto(p));
    }
    async createPayment(dto) {
        const payment = await this.paymentsRepo.create(dto);
        return new payment_response_dto_1.PaymentResponseDto(payment);
    }
    async updateStatus(id, status) {
        await this.getById(id);
        const updated = await this.paymentsRepo.updateStatus(id, status);
        return new payment_response_dto_1.PaymentResponseDto(updated);
    }
    async cancel(id) {
        await this.getById(id);
        const cancelled = await this.paymentsRepo.cancel(id);
        return new payment_response_dto_1.PaymentResponseDto(cancelled);
    }
    async verify(id) {
        await this.getById(id);
        const verified = await this.paymentsRepo.verify(id);
        return new payment_response_dto_1.PaymentResponseDto(verified);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IPaymentsRepository")),
    __metadata("design:paramtypes", [Object])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map