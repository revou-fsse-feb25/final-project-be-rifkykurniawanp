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
exports.PaymentSummaryDto = exports.PaymentStatsDto = exports.PaginatedPaymentResponseDto = exports.PaymentQueryDto = exports.CourseSummaryDto = exports.ProductSummaryDto = exports.CartSummaryDto = exports.UserSummaryDto = exports.PaymentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
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
    user;
    cart;
    product;
    course;
}
exports.PaymentResponseDto = PaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Payment ID' }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'User ID who made the payment' }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Cart ID associated with payment' }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000.50, description: 'Payment amount' }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CREDIT_CARD', description: 'Payment method used' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentStatus,
        example: client_1.PaymentStatus.PENDING,
        description: 'Current payment status'
    }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PayableType,
        example: client_1.PayableType.PRODUCT,
        description: 'Type of item being paid for'
    }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'ID of the product or course being paid for' }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T12:00:00Z',
        nullable: true,
        description: 'Timestamp when payment was completed'
    }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T10:00:00Z',
        description: 'Timestamp when payment was created'
    }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'User information (included when requested)'
    }),
    __metadata("design:type", UserSummaryDto)
], PaymentResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Cart information (included when requested)'
    }),
    __metadata("design:type", CartSummaryDto)
], PaymentResponseDto.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Product information (included when payableType is PRODUCT)'
    }),
    __metadata("design:type", ProductSummaryDto)
], PaymentResponseDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Course information (included when payableType is COURSE)'
    }),
    __metadata("design:type", CourseSummaryDto)
], PaymentResponseDto.prototype, "course", void 0);
class UserSummaryDto {
    id;
    email;
    firstName;
    lastName;
}
exports.UserSummaryDto = UserSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserSummaryDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', nullable: true }),
    __metadata("design:type", Object)
], UserSummaryDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', nullable: true }),
    __metadata("design:type", Object)
], UserSummaryDto.prototype, "lastName", void 0);
class CartSummaryDto {
    id;
    createdAt;
    updatedAt;
    totalItems;
}
exports.CartSummaryDto = CartSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T09:00:00Z' }),
    __metadata("design:type", String)
], CartSummaryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T10:00:00Z' }),
    __metadata("design:type", String)
], CartSummaryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Total items in cart' }),
    __metadata("design:type", Number)
], CartSummaryDto.prototype, "totalItems", void 0);
class ProductSummaryDto {
    id;
    slug;
    name;
    price;
    category;
    status;
}
exports.ProductSummaryDto = ProductSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProductSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'premium-arabica-coffee' }),
    __metadata("design:type", String)
], ProductSummaryDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Premium Arabica Coffee' }),
    __metadata("design:type", String)
], ProductSummaryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 125000.00 }),
    __metadata("design:type", Number)
], ProductSummaryDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COFFEE' }),
    __metadata("design:type", String)
], ProductSummaryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE' }),
    __metadata("design:type", String)
], ProductSummaryDto.prototype, "status", void 0);
class CourseSummaryDto {
    id;
    slug;
    title;
    price;
    category;
    level;
}
exports.CourseSummaryDto = CourseSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CourseSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'coffee-brewing-masterclass' }),
    __metadata("design:type", String)
], CourseSummaryDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Coffee Brewing Masterclass' }),
    __metadata("design:type", String)
], CourseSummaryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 299000.00 }),
    __metadata("design:type", Number)
], CourseSummaryDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COFFEE_BREWING' }),
    __metadata("design:type", String)
], CourseSummaryDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'INTERMEDIATE' }),
    __metadata("design:type", String)
], CourseSummaryDto.prototype, "level", void 0);
class PaymentQueryDto {
    userId;
    status;
    payableType;
    page = 1;
    limit = 10;
    startDate;
    endDate;
}
exports.PaymentQueryDto = PaymentQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 1,
        description: 'Filter by user ID'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], PaymentQueryDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PaymentStatus,
        required: false,
        description: 'Filter by payment status'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PaymentStatus),
    __metadata("design:type", String)
], PaymentQueryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.PayableType,
        required: false,
        description: 'Filter by payable type'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.PayableType),
    __metadata("design:type", String)
], PaymentQueryDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 1,
        minimum: 1,
        description: 'Page number for pagination'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], PaymentQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: 10,
        minimum: 1,
        maximum: 100,
        description: 'Number of items per page'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Transform)(({ value }) => parseInt(value)),
    __metadata("design:type", Number)
], PaymentQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2025-08-01T00:00:00Z',
        description: 'Filter payments from this date'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaymentQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: '2025-08-31T23:59:59Z',
        description: 'Filter payments until this date'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PaymentQueryDto.prototype, "endDate", void 0);
class PaginatedPaymentResponseDto {
    data;
    total;
    page;
    limit;
    totalPages;
    hasNext;
    hasPrev;
}
exports.PaginatedPaymentResponseDto = PaginatedPaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PaymentResponseDto],
        description: 'Array of payment records'
    }),
    __metadata("design:type", Array)
], PaginatedPaymentResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Total number of records' }),
    __metadata("design:type", Number)
], PaginatedPaymentResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginatedPaymentResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginatedPaymentResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PaginatedPaymentResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether there is a next page' }),
    __metadata("design:type", Boolean)
], PaginatedPaymentResponseDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Whether there is a previous page' }),
    __metadata("design:type", Boolean)
], PaginatedPaymentResponseDto.prototype, "hasPrev", void 0);
class PaymentStatsDto {
    totalAmount;
    totalPayments;
    completedPayments;
    pendingPayments;
    processingPayments;
    failedPayments;
    cancelledPayments;
    successRate;
    averageAmount;
}
exports.PaymentStatsDto = PaymentStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000000.00,
        description: 'Total revenue from completed payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 150,
        description: 'Total number of payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 120,
        description: 'Number of completed payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "completedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20,
        description: 'Number of pending payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "pendingPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Number of processing payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "processingPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Number of failed payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "failedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0,
        description: 'Number of cancelled payments'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "cancelledPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 80.0,
        description: 'Success rate percentage'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "successRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 41666.67,
        description: 'Average payment amount'
    }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "averageAmount", void 0);
class PaymentSummaryDto {
    id;
    amount;
    status;
    paymentMethod;
    createdAt;
    paidAt;
}
exports.PaymentSummaryDto = PaymentSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000.50 }),
    __metadata("design:type", Number)
], PaymentSummaryDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaymentStatus, example: client_1.PaymentStatus.COMPLETED }),
    __metadata("design:type", String)
], PaymentSummaryDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CREDIT_CARD' }),
    __metadata("design:type", String)
], PaymentSummaryDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", String)
], PaymentSummaryDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:30:00Z', nullable: true }),
    __metadata("design:type", Object)
], PaymentSummaryDto.prototype, "paidAt", void 0);
//# sourceMappingURL=payment.response.dto.js.map