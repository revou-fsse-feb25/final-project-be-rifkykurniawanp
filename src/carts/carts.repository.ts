import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';

@Injectable()
export class CartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addItem(dto: AddToCartDto) {
    // Find the cart by userId, or create a new one if not found
    let cart = await this.prisma.cart.findFirst({
      where: { userId: dto.userId, status: 'ACTIVE' },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId: dto.userId, status: 'ACTIVE' },
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

  updateItem(cartItemId: number, dto: UpdateCartDto) {
    return this.prisma.cartItem.update({ where: { id: cartItemId }, data: dto });
  }

  getCartByUser(userId: number) {
    return this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }

  removeItem(cartItemId: number) {
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
}
