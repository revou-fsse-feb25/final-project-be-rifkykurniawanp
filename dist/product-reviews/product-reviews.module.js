"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const product_reviews_controller_1 = require("./product-reviews.controller");
const product_reviews_service_1 = require("./product-reviews.service");
const product_reviews_repository_1 = require("./product-reviews.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductReviewsModule = class ProductReviewsModule {
};
exports.ProductReviewsModule = ProductReviewsModule;
exports.ProductReviewsModule = ProductReviewsModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_reviews_controller_1.ProductReviewsController],
        providers: [
            prisma_service_1.PrismaService,
            product_reviews_service_1.ProductReviewsService,
            {
                provide: 'IProductReviewsRepository',
                useClass: product_reviews_repository_1.ProductReviewsRepository,
            },
        ],
        exports: [product_reviews_service_1.ProductReviewsService],
    })
], ProductReviewsModule);
//# sourceMappingURL=product-reviews.module.js.map