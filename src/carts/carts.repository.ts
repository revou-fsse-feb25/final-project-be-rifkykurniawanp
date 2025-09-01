// src/carts/carts.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cart, CartItem, CartItemType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

interface CreateCartData {
  userId: number;
}

interface UpdateCartData {
  updatedAt?: Date;
}

interface CreateCartItemData {
  cartId: number;
  itemType: CartItemType;
  itemId: number;
  quantity: number;
  price: Decimal;
}

interface UpdateCartItemData {
  quantity?: number;
  price?: Decimal;
}

@Injectable()
export class CartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCartData): Promise<Cart & { items: any[]; user: any; payments: any[] }> {
    return this.prisma.cart.create({
      data,
      include: {
        payments: true,
        items: { include: { product: true, course: true } },
        user: true,
      },
    });
  }

  async findByUserId(userId: number, args?: Prisma.CartFindFirstArgs) {
  return this.prisma.cart.findFirst({
    where: {
      userId,
      deletedAt: null,
      ...(args?.where ?? {}),
    },
    include: args?.include,
  });
}

  async findById(id: number, options?: { where?: any; include?: any }) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: options?.include ?? { payments: true, items: { include: { product: true, course: true } }, user: true },
    });
  }

  async findAll(skip = 0, take = 10, options?: { where?: any; include?: any }) {
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

  async findByIdIncludingDeleted(id: number) {
    return this.prisma.cart.findUnique({
      where: { id },
      include: { payments: true, items: { include: { product: true, course: true } }, user: true },
    });
  }

  async update(id: number, data: UpdateCartData) {
    return this.prisma.cart.update({
      where: { id },
      data,
      include: { payments: true, items: { include: { product: true, course: true } }, user: true },
    });
  }

  async softDelete(id: number) {
    return this.prisma.cart.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: number) {
    return this.prisma.cart.update({
      where: { id },
      data: { deletedAt: null },
      include: { payments: true, items: { include: { product: true, course: true } }, user: true },
    });
  }

  async hardDelete(id: number) {
    return this.prisma.cart.delete({ where: { id } });
  }

  // ================= CART ITEM =================
  async createItem(data: CreateCartItemData) {
    return this.prisma.cartItem.create({
      data: {
        ...data,
        price: new Decimal(data.price),
      },
      include: { product: true, course: true },
    });
  }

  async findItemByCartAndItem(cartId: number, itemType: CartItemType, itemId: number) {
    return this.prisma.cartItem.findFirst({
      where: { cartId, itemType, itemId },
      include: { product: true, course: true },
    });
  }

  async findItemById(id: number) {
    return this.prisma.cartItem.findUnique({
      where: { id },
      include: { product: true, course: true },
    });
  }

  async findItemsByCart(cartId: number) {
    return this.prisma.cartItem.findMany({
      where: { cartId },
      include: { product: true, course: true },
    });
  }

  async updateItem(id: number, data: UpdateCartItemData) {
    return this.prisma.cartItem.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? new Decimal(data.price) : undefined,
      },
      include: { product: true, course: true },
    });
  }

  async deleteItem(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }

  async deleteItemsByCart(cartId: number) {
    return this.prisma.cartItem.deleteMany({ where: { cartId } });
  }
}
