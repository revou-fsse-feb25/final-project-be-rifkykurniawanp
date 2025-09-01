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
exports.CartSummaryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cart_item_response_dto_1 = require("./cart-item.response.dto");
class CartSummaryResponseDto {
    totalItems;
    totalAmount;
    uniqueItems;
    items;
}
exports.CartSummaryResponseDto = CartSummaryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Total number of items in cart' }),
    __metadata("design:type", Number)
], CartSummaryResponseDto.prototype, "totalItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75000, description: 'Total amount of all items in cart' }),
    __metadata("design:type", Number)
], CartSummaryResponseDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Number of unique items (different products/courses)' }),
    __metadata("design:type", Number)
], CartSummaryResponseDto.prototype, "uniqueItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [cart_item_response_dto_1.CartItemResponseDto] }),
    __metadata("design:type", Array)
], CartSummaryResponseDto.prototype, "items", void 0);
//# sourceMappingURL=cart-summary.response.dto.js.map