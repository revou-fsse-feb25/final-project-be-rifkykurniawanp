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
exports.ProductReviewResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("./user.response.dto");
class ProductReviewResponseDto {
    id;
    rating;
    comment;
    createdAt;
    user;
}
exports.ProductReviewResponseDto = ProductReviewResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ProductReviewResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Rating from 1 to 5' }),
    __metadata("design:type", Number)
], ProductReviewResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Produk ini sangat bagus', nullable: true }),
    __metadata("design:type", Object)
], ProductReviewResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T14:12:00.000Z' }),
    __metadata("design:type", Date)
], ProductReviewResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_response_dto_1.UserResponseDto }),
    __metadata("design:type", user_response_dto_1.UserResponseDto)
], ProductReviewResponseDto.prototype, "user", void 0);
//# sourceMappingURL=product-review.response.dto.js.map