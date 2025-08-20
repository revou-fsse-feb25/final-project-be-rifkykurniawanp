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
let CartsRepository = class CartsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCartByUser(userId) {
        return this.prisma.cart.findFirst({
            where: { userId },
            include: { items: true },
        });
    }
    async getCartById(cartId) {
        return this.prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: true },
        });
    }
    async addItem(dto) {
        let cart;
        if (dto.cartId) {
            cart = await this.getCartById(dto.cartId);
            if (!cart)
                throw new common_1.NotFoundException('Cart not found');
        }
        else {
            cart = await this.prisma.cart.findFirst({ where: { userId: dto.userId } });
            if (!cart) {
                cart = await this.prisma.cart.create({ data: { userId: dto.userId } });
            }
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                itemId: dto.itemId,
                itemType: dto.itemType,
            },
        });
        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: existingItem.quantity + dto.quantity,
                    price: dto.price,
                },
            });
        }
        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                itemType: dto.itemType,
                itemId: dto.itemId,
                quantity: dto.quantity,
                price: dto.price,
            },
        });
    }
    async updateItem(cartItemId, dto) {
        const existing = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!existing)
            throw new common_1.NotFoundException('Cart item not found');
        return this.prisma.cartItem.update({
            where: { id: cartItemId },
            data: dto,
        });
    }
    async removeItem(cartItemId) {
        const existing = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
        if (!existing)
            throw new common_1.NotFoundException('Cart item not found');
        return this.prisma.cartItem.delete({ where: { id: cartItemId } });
    }
};
exports.CartsRepository = CartsRepository;
exports.CartsRepository = CartsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsRepository);
//# sourceMappingURL=carts.repository.js.map