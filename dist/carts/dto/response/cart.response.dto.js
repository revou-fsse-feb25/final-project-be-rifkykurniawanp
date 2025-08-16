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
exports.CartItemResponseDto = exports.CartResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CartResponseDto {
    id;
    userId;
    status;
    items;
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
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE' }),
    __metadata("design:type", String)
], CartResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [CartItemResponseDto] }),
    __metadata("design:type", Array)
], CartResponseDto.prototype, "items", void 0);
class CartItemResponseDto {
    id;
    itemId;
    quantity;
    price;
}
exports.CartItemResponseDto = CartItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000.00 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "price", void 0);
//# sourceMappingURL=cart.response.dto.js.map