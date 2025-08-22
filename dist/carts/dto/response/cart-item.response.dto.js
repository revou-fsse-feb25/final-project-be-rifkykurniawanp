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
exports.CartItemResponseDto = exports.CourseBasicDto = exports.ProductBasicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class ProductBasicDto {
    id;
    name;
    slug;
    image;
    price;
    stock;
}
exports.ProductBasicDto = ProductBasicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProductBasicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Arabica Premium' }),
    __metadata("design:type", String)
], ProductBasicDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'arabica-premium' }),
    __metadata("design:type", String)
], ProductBasicDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'image.jpg' }),
    __metadata("design:type", String)
], ProductBasicDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    __metadata("design:type", Number)
], ProductBasicDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], ProductBasicDto.prototype, "stock", void 0);
class CourseBasicDto {
    id;
    title;
    slug;
    price;
    level;
    category;
}
exports.CourseBasicDto = CourseBasicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CourseBasicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Coffee Brewing Masterclass' }),
    __metadata("design:type", String)
], CourseBasicDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'coffee-brewing-masterclass' }),
    __metadata("design:type", String)
], CourseBasicDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000 }),
    __metadata("design:type", Number)
], CourseBasicDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BEGINNER' }),
    __metadata("design:type", String)
], CourseBasicDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COFFEE_BREWING' }),
    __metadata("design:type", String)
], CourseBasicDto.prototype, "category", void 0);
class CartItemResponseDto {
    id;
    cartId;
    itemType;
    itemId;
    quantity;
    price;
    subtotal;
    product;
    course;
}
exports.CartItemResponseDto = CartItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CartItemType, example: 'PRODUCT' }),
    __metadata("design:type", String)
], CartItemResponseDto.prototype, "itemType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000, description: 'price * quantity' }),
    __metadata("design:type", Number)
], CartItemResponseDto.prototype, "subtotal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProductBasicDto, required: false }),
    __metadata("design:type", ProductBasicDto)
], CartItemResponseDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CourseBasicDto, required: false }),
    __metadata("design:type", CourseBasicDto)
], CartItemResponseDto.prototype, "course", void 0);
//# sourceMappingURL=cart-item.response.dto.js.map