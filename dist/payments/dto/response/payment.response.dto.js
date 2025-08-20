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
class PaymentResponseDto {
    id;
    user;
    cart;
    amount;
    status;
    paymentMethod;
    payableType;
    payableId;
    paidAt;
    createdAt;
    updatedAt;
    constructor(payment) {
        this.id = payment.id;
        this.user = payment.user
            ? {
                id: payment.user.id,
                name: payment.user.name,
                email: payment.user.email,
            }
            : null;
        this.cart = payment.cart
            ? {
                id: payment.cart.id,
                totalAmount: payment.cart.totalAmount,
            }
            : null;
        this.amount = payment.amount;
        this.status = payment.status;
        this.paymentMethod = payment.paymentMethod;
        this.payableType = payment.payableType;
        this.payableId = payment.payableId;
        this.paidAt = payment.paidAt;
        this.createdAt = payment.createdAt;
        this.updatedAt = payment.updatedAt;
    }
}
exports.PaymentResponseDto = PaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { id: 1, name: "John Doe", email: "john@example.com" },
        nullable: true,
    }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { id: 12, totalAmount: 50000 },
        nullable: true,
    }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PENDING" }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CREDIT_CARD" }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "ORDER" }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-08-19T10:00:00.000Z", nullable: true }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-08-19T09:00:00.000Z" }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-08-19T09:30:00.000Z" }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=payment.response.dto.js.map