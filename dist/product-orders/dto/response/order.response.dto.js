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
exports.OrderOrderItemResponseDto = exports.OrderResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class OrderResponseDto {
    id;
    buyerId;
    paymentId;
    totalPrice;
    status;
    createdAt;
    items;
}
exports.OrderResponseDto = OrderResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "buyerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200000.00 }),
    __metadata("design:type", Number)
], OrderResponseDto.prototype, "totalPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.OrderStatus }),
    __metadata("design:type", String)
], OrderResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", Date)
], OrderResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [OrderOrderItemResponseDto] }),
    __metadata("design:type", Array)
], OrderResponseDto.prototype, "items", void 0);
class OrderOrderItemResponseDto {
    id;
    productId;
    quantity;
    priceEach;
}
exports.OrderOrderItemResponseDto = OrderOrderItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OrderOrderItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], OrderOrderItemResponseDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], OrderOrderItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000.00 }),
    __metadata("design:type", Number)
], OrderOrderItemResponseDto.prototype, "priceEach", void 0);
//# sourceMappingURL=order.response.dto.js.map