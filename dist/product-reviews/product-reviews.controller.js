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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_reviews_service_1 = require("./product-reviews.service");
const create_review_dto_1 = require("./dto/request/create-review.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let ProductReviewsController = class ProductReviewsController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createReview(userId, dto) {
        return this.service.createReview(userId, dto);
    }
    async getByProduct(productId) {
        return this.service.findByProductId(productId);
    }
    async getByUser(userId) {
        return this.service.findByUserId(userId);
    }
    async getAverage(productId) {
        return this.service.getProductAverageRating(productId);
    }
    async updateReview(reviewId, dto) {
        return this.service.updateReview(reviewId, dto);
    }
    async deleteReview(reviewId) {
        return this.service.deleteReview(reviewId);
    }
};
exports.ProductReviewsController = ProductReviewsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "createReview", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "getByProduct", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Get)('product/:productId/average-rating'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "getAverage", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER', 'SUPPLIER'),
    (0, common_1.Patch)(':reviewId'),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "updateReview", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'USER', 'SUPPLIER'),
    (0, common_1.Delete)(':reviewId'),
    __param(0, (0, common_1.Param)('reviewId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductReviewsController.prototype, "deleteReview", null);
exports.ProductReviewsController = ProductReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Product Reviews'),
    (0, common_1.Controller)('product-reviews'),
    __metadata("design:paramtypes", [product_reviews_service_1.ProductReviewsService])
], ProductReviewsController);
//# sourceMappingURL=product-reviews.controller.js.map