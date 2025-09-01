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
exports.PaymentResponseDto = exports.CourseEnrollmentDto = exports.ProductOrderDto = exports.CartBasicDto = exports.UserBasicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class UserBasicDto {
    id;
    email;
    firstName;
    lastName;
}
exports.UserBasicDto = UserBasicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserBasicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john@example.com' }),
    __metadata("design:type", String)
], UserBasicDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    __metadata("design:type", String)
], UserBasicDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    __metadata("design:type", String)
], UserBasicDto.prototype, "lastName", void 0);
class CartBasicDto {
    id;
    totalItems;
    totalAmount;
}
exports.CartBasicDto = CartBasicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartBasicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], CartBasicDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75000 }),
    __metadata("design:type", Number)
], CartBasicDto.prototype, "totalAmount", void 0);
class ProductOrderDto {
    id;
    totalPrice;
    status;
    itemCount;
}
exports.ProductOrderDto = ProductOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProductOrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75000 }),
    __metadata("design:type", Number)
], ProductOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COMPLETED' }),
    __metadata("design:type", String)
], ProductOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], ProductOrderDto.prototype, "itemCount", void 0);
class CourseEnrollmentDto {
    id;
    courseId;
    courseName;
    pricePaid;
    progress;
}
exports.CourseEnrollmentDto = CourseEnrollmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CourseEnrollmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CourseEnrollmentDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Coffee Brewing Masterclass' }),
    __metadata("design:type", String)
], CourseEnrollmentDto.prototype, "courseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000 }),
    __metadata("design:type", Number)
], CourseEnrollmentDto.prototype, "pricePaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75 }),
    __metadata("design:type", Number)
], CourseEnrollmentDto.prototype, "progress", void 0);
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
    productOrders;
    courseEnrollments;
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
    (0, swagger_1.ApiProperty)({ example: 75000 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'credit_card' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaymentStatus, example: 'COMPLETED' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PayableType, example: 'PRODUCT' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "payableType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "payableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserBasicDto }),
    __metadata("design:type", UserBasicDto)
], PaymentResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CartBasicDto }),
    __metadata("design:type", CartBasicDto)
], PaymentResponseDto.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ProductOrderDto] }),
    __metadata("design:type", Array)
], PaymentResponseDto.prototype, "productOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CourseEnrollmentDto] }),
    __metadata("design:type", Array)
], PaymentResponseDto.prototype, "courseEnrollments", void 0);
//# sourceMappingURL=payment.response.dto.js.map