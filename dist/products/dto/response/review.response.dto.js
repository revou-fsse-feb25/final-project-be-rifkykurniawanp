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
exports.ProductResponseDto = void 0;
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class ProductResponseDto {
    id;
    slug;
    name;
    description;
    price;
    stock;
    image;
    category;
    status;
    rating;
    reviewCount;
    origin;
    weight;
    tags;
    createdAt;
    supplier;
    reviews;
}
exports.ProductResponseDto = ProductResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique ID of the product', example: 1 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Unique slug for the product', example: 'premium-coffee-beans' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the product', example: 'Premium Coffee Beans' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description of the product' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Price of the product', example: 150000 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Stock quantity of the product', example: 100 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL to the product image' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category of the product', enum: client_1.ProductCategory }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the product', enum: client_1.ProductStatus }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current rating of the product', example: 4.5 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total number of reviews for the product', example: 10 }),
    __metadata("design:type", Number)
], ProductResponseDto.prototype, "reviewCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Origin of the product', enum: client_1.ProductOrigin }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Weight of the product', example: '500g' }),
    __metadata("design:type", String)
], ProductResponseDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tags associated with the product', enum: client_1.ProductTagName, isArray: true }),
    __metadata("design:type", Array)
], ProductResponseDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date of the product', example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProductResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Supplier of the product',
        type: 'object',
        properties: {
            id: { type: 'number' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
        },
    }),
    __metadata("design:type", Object)
], ProductResponseDto.prototype, "supplier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reviews for the product',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                rating: { type: 'number' },
                comment: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Array)
], ProductResponseDto.prototype, "reviews", void 0);
//# sourceMappingURL=review.response.dto.js.map