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
exports.CartResponseDto = exports.UserBasicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_item_response_dto_1 = require("./cart-item.response.dto");
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
class CartResponseDto {
    id;
    userId;
    user;
    items;
    totalItems;
    totalAmount;
    createdAt;
    updatedAt;
}
exports.CartResponseDto = CartResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserBasicDto }),
    __metadata("design:type", UserBasicDto)
], CartResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [cart_item_response_dto_1.CartItemResponseDto] }),
    __metadata("design:type", Array)
], CartResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Total number of items in cart' }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75000, description: 'Total amount of all items' }),
    __metadata("design:type", Number)
], CartResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], CartResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=cart.response.dto.js.map