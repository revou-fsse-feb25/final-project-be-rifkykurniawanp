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
exports.PaymentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class PaymentResponseDto {
    id;
    userId;
    cartId;
    amount;
    paymentMethod;
    status;
    payableType;
    payableId;
    paidAt;
    createdAt;
}
exports.PaymentResponseDto = PaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000.00 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CREDIT_CARD' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaymentStatus }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PayableType }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z', required: false }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=payment.response.dto.js.map