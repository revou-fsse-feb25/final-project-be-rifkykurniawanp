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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CartsService = class CartsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto, role) {
        if (role !== 'USER')
            throw new common_1.ForbiddenException('Access denied');
        return this.prisma.cart.create({
            data: {
                ...dto,
                userId,
            },
        });
    }
    async findAll(userId, role) {
        if (role === 'ADMIN') {
            return this.prisma.cart.findMany({
                include: { user: true, items: { include: { product: true, course: true } }, payments: true },
            });
        }
        return this.prisma.cart.findMany({
            where: { userId },
            include: { user: true, items: { include: { product: true, course: true } }, payments: true },
        });
    }
    async findOne(id, userId, role) {
        const cart = await this.prisma.cart.findUnique({
            where: { id },
            include: { user: true, items: { include: { product: true, course: true } }, payments: true },
        });
        if (!cart)
            throw new common_1.NotFoundException(`Cart ${id} not found`);
        if (role !== 'ADMIN' && cart.userId !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return cart;
    }
    async update(id, dto, userId, role) {
        const cart = await this.findOne(id, userId, role);
        return this.prisma.cart.update({
            where: { id },
            data: dto,
            include: { items: { include: { product: true, course: true } }, payments: true },
        });
    }
    async remove(id, userId, role) {
        const cart = await this.findOne(id, userId, role);
        return this.prisma.cart.delete({ where: { id } });
    }
    async addItem(cartId, userId, itemType, itemId, quantity, role) {
        const cart = await this.findOne(cartId, userId, role);
        if (itemType === 'PRODUCT') {
            const product = await this.prisma.product.findUnique({ where: { id: itemId } });
            if (!product)
                throw new common_1.BadRequestException('Product not found');
        }
        else if (itemType === 'COURSE') {
            const course = await this.prisma.course.findUnique({ where: { id: itemId } });
            if (!course)
                throw new common_1.BadRequestException('Course not found');
        }
        return this.prisma.cartItem.create({
            data: { cartId, itemType, itemId, quantity, price: new client_1.Prisma.Decimal(0) },
        });
    }
    async removeItem(cartId, userId, itemId, role) {
        const cart = await this.findOne(cartId, userId, role);
        const item = await this.prisma.cartItem.findFirst({ where: { cartId, id: itemId } });
        if (!item)
            throw new common_1.NotFoundException('CartItem not found');
        return this.prisma.cartItem.delete({ where: { id: item.id } });
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsService);
//# sourceMappingURL=carts.service.js.map