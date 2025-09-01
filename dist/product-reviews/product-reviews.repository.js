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
exports.ProductReviewsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const reviewSelect = {
    id: true,
    productId: true,
    userId: true,
    rating: true,
    comment: true,
    createdAt: true,
    updatedAt: true,
};
let ProductReviewsRepository = class ProductReviewsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(userId, dto) {
        return this.prisma.productReview.create({
            data: { ...dto, userId },
            select: reviewSelect,
        });
    }
    async findByProductId(productId) {
        return this.prisma.productReview.findMany({
            where: { productId },
            select: reviewSelect,
        });
    }
    async findByUserId(userId) {
        return this.prisma.productReview.findMany({
            where: { userId },
            select: reviewSelect,
        });
    }
    async getProductAverageRating(productId) {
        const result = await this.prisma.productReview.aggregate({
            where: { productId },
            _avg: { rating: true },
        });
        return result._avg.rating || 0;
    }
    async updateReview(reviewId, dto) {
        return this.prisma.productReview.update({
            where: { id: reviewId },
            data: dto,
            select: reviewSelect,
        });
    }
    async deleteReview(reviewId) {
        await this.prisma.productReview.delete({ where: { id: reviewId } });
    }
};
exports.ProductReviewsRepository = ProductReviewsRepository;
exports.ProductReviewsRepository = ProductReviewsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductReviewsRepository);
//# sourceMappingURL=product-reviews.repository.js.map