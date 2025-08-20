import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';

@Injectable()
export class CartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartByUser(userId: number) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  async getCartById(cartId: number) {
    return this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
  }

  async addItem(dto: AddToCartDto & { cartId?: number }) {
    let cart;

    if (dto.cartId) {
      cart = await this.getCartById(dto.cartId);
      if (!cart) throw new NotFoundException('Cart not found');
    } else {
      cart = await this.prisma.cart.findFirst({ where: { userId: dto.userId } });
      if (!cart) {
        cart = await this.prisma.cart.create({ data: { userId: dto.userId } });
      }
    }

    // 🔑 Cek apakah item sudah ada di cart
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
          price: dto.price, // update harga terakhir
        },
      });
    }

    // kalau belum ada, create baru
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

  async updateItem(cartItemId: number, dto: Partial<UpdateCartDto>) {
    const existing = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!existing) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: dto,
    });
  }

  async removeItem(cartItemId: number) {
    const existing = await this.prisma.cartItem.findUnique({ where: { id: cartItemId } });
    if (!existing) throw new NotFoundException('Cart item not found');

    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
}
