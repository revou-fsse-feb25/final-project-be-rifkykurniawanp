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
        return this.prisma.product.create({
            data,
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findById(id) {
        return this.prisma.product.findUnique({
            where: { id },
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findBySlug(slug) {
        return this.prisma.product.findUnique({
            where: { slug },
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findAll(skip = 0, take = 10, filter) {
        const where = {};
        if (filter) {
            if (filter.category)
                where.category = filter.category;
            if (filter.origin)
                where.origin = filter.origin;
            if (filter.status)
                where.status = filter.status;
            if (filter.supplierId)
                where.supplierId = filter.supplierId;
            if (filter.tags && filter.tags.length > 0) {
                where.tags = {
                    hasSome: filter.tags,
                };
            }
            if (filter.minPrice || filter.maxPrice) {
                where.price = {};
                if (filter.minPrice)
                    where.price.gte = filter.minPrice;
                if (filter.maxPrice)
                    where.price.lte = filter.maxPrice;
            }
        }
        return this.prisma.product.findMany({
            where,
            skip,
            take,
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });
    }
    async delete(id) {
        return this.prisma.product.delete({
            where: { id },
        });
    }
    async updateRating(id, rating, reviewCount) {
        return this.prisma.product.update({
            where: { id },
            data: {
                rating,
                reviewCount,
            },
        });
    }
    async findBySupplierId(supplierId) {
        return this.prisma.product.findMany({
            where: { supplierId },
            include: {
                supplier: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map