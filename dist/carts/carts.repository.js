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
exports.CartsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let CartsRepository = class CartsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.cart.create({
            data,
            include: {
                payments: true,
                items: { include: { product: true, course: true } },
                user: true,
            },
        });
    }
    async findByUserId(userId, args) {
        return this.prisma.cart.findFirst({
            where: {
                userId,
                deletedAt: null,
                ...(args?.where ?? {}),
            },
            include: args?.include,
        });
    }
    async findById(id, options) {
        return this.prisma.cart.findUnique({
            where: { id },
            include: options?.include ?? { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async findAll(skip = 0, take = 10, options) {
        return this.prisma.cart.findMany({
            skip,
            take,
            where: options?.where ?? { deletedAt: null },
            include: options?.include ?? { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async findDeleted(skip = 0, take = 10) {
        return this.prisma.cart.findMany({
            skip,
            take,
            where: { NOT: { deletedAt: null } },
            include: { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.cart.findUnique({
            where: { id },
            include: { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async update(id, data) {
        return this.prisma.cart.update({
            where: { id },
            data,
            include: { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async softDelete(id) {
        return this.prisma.cart.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async restore(id) {
        return this.prisma.cart.update({
            where: { id },
            data: { deletedAt: null },
            include: { payments: true, items: { include: { product: true, course: true } }, user: true },
        });
    }
    async hardDelete(id) {
        return this.prisma.cart.delete({ where: { id } });
    }
    async createItem(data) {
        return this.prisma.cartItem.create({
            data: {
                ...data,
                price: new library_1.Decimal(data.price),
            },
            include: { product: true, course: true },
        });
    }
    async findItemByCartAndItem(cartId, itemType, itemId) {
        return this.prisma.cartItem.findFirst({
            where: { cartId, itemType, itemId },
            include: { product: true, course: true },
        });
    }
    async findItemById(id) {
        return this.prisma.cartItem.findUnique({
            where: { id },
            include: { product: true, course: true },
        });
    }
    async findItemsByCart(cartId) {
        return this.prisma.cartItem.findMany({
            where: { cartId },
            include: { product: true, course: true },
        });
    }
    async updateItem(id, data) {
        return this.prisma.cartItem.update({
            where: { id },
            data: {
                ...data,
                price: data.price ? new library_1.Decimal(data.price) : undefined,
            },
            include: { product: true, course: true },
        });
    }
    async deleteItem(id) {
        return this.prisma.cartItem.delete({ where: { id } });
    }
    async deleteItemsByCart(cartId) {
        return this.prisma.cartItem.deleteMany({ where: { cartId } });
    }
};
exports.CartsRepository = CartsRepository;
exports.CartsRepository = CartsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsRepository);
//# sourceMappingURL=carts.repository.js.map