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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaymentStatsDto {
    totalPayments;
    pendingPayments;
    completedPayments;
    failedPayments;
    totalRevenue;
    pendingAmount;
    completedAmount;
    successRate;
}
exports.PaymentStatsDto = PaymentStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Total number of payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, description: 'Number of pending payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "pendingPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Number of completed payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "completedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, description: 'Number of failed payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "failedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500000, description: 'Total revenue from completed payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalRevenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500000, description: 'Total amount in pending payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "pendingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500000, description: 'Total amount from completed payments' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "completedAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 80.5, description: 'Success rate percentage' }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "successRate", void 0);
//# sourceMappingURL=payment-stat.response.dto.js.map