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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsRepository = class ProductsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.product.create({ data });
    }
    async findAll(skip, take, filter = {}) {
        return this.prisma.product.findMany({
            skip,
            take,
            where: {
                category: filter.category,
                origin: filter.origin,
                status: filter.status,
                supplierId: filter.supplierId,
                price: {
                    gte: filter.minPrice,
                    lte: filter.maxPrice,
                },
                deletedAt: filter.deletedAt ?? null,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                supplier: true,
                reviews: true,
            },
        });
    }
    async findById(id, filter = {}) {
        return this.prisma.product.findFirst({
            where: { id, deletedAt: filter.deletedAt ?? null },
            include: { supplier: true, reviews: true },
        });
    }
    async findBySlug(slug, filter = {}) {
        return this.prisma.product.findFirst({
            where: { slug, deletedAt: filter.deletedAt ?? null },
            include: { supplier: true, reviews: true },
        });
    }
    async findBySlugIncludingDeleted(slug) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: { supplier: true, reviews: true },
        });
    }
    async findBySupplierId(supplierId, filter = {}) {
        return this.prisma.product.findMany({
            where: { supplierId, deletedAt: filter.deletedAt ?? null },
            include: { supplier: true, reviews: true },
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: { supplier: true, reviews: true },
        });
    }
    async update(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
            include: { supplier: true, reviews: true },
        });
    }
    async updateRating(id, rating, reviewCount) {
        return this.prisma.product.update({
            where: { id },
            data: { rating, reviewCount },
            include: { supplier: true, reviews: true },
        });
    }
    async softDelete(id) {
        await this.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async hardDelete(id) {
        await this.prisma.product.delete({ where: { id } });
    }
    async restore(id) {
        return this.prisma.product.update({
            where: { id },
            data: { deletedAt: null },
            include: { supplier: true, reviews: true },
        });
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map