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
exports.CreatePaymentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
class CreatePaymentDto {
    userId;
    cartId;
    amount;
    paymentMethod;
    status;
    payableType;
    payableId;
    paidAt;
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID of the user making the payment',
        minimum: 1
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID of the cart being paid for',
        minimum: 1
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150000.50,
        description: 'Payment amount (matches Decimal(12,2) from schema)',
        minimum: 0.01
    }),
    (0, class_validator_1.IsDecimal)({ decimal_digits: '2' }),
    (0, class_validator_1.Min)(0.01, { message: 'Amount must be greater than 0' }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CREDIT_CARD',
        description: 'Payment method used',
        examples: ['CREDIT_CARD', 'BANK_TRANSFER', 'E_WALLET', 'CASH_ON_DELIVERY']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100, { message: 'Payment method must be between 1 and 100 characters' }),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentStatus,
        example: client_1.PaymentStatus.PENDING,
        description: 'Payment status - defaults to PENDING if not provided'
    }),
    (0, class_validator_1.IsEnum)(client_1.PaymentStatus, { message: 'Invalid payment status' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PayableType,
        example: client_1.PayableType.PRODUCT,
        description: 'Type of item being paid for (PRODUCT or COURSE)'
    }),
    (0, class_validator_1.IsEnum)(client_1.PayableType, { message: 'Invalid payable type' }),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 101,
        description: 'ID of the product or course being paid for',
        minimum: 1
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T12:00:00Z',
        required: false,
        description: 'Timestamp when payment was completed (ISO 8601 format)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'paidAt must be a valid ISO 8601 date string' }),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "paidAt", void 0);
//# sourceMappingURL=create-payment.dto.js.map