import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { RemoveFromCartDto } from './dto/request/remove-form-cart.dto';
import { ICartsRepository } from './interface/carts.repository.interface';

@Injectable()
export class CartsRepository implements ICartsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(dto: AddToCartDto) {
    return this.prisma.cartItem.create({
      data: {
        cart: {
          connectOrCreate: {
            where: { userId: dto.userId },
            create: { userId: dto.userId },
          },
        },
        itemType: dto.itemType,
        itemId: dto.itemId,
        quantity: dto.quantity,
        price: dto.price,
      },
      include: { cart: true },
    });
  }

  async updateCart(dto: UpdateCartDto) {
    return this.prisma.cartItem.update({
      where: { id: dto.cartItemId },
      data: { quantity: dto.quantity },
      include: { cart: true },
    });
  }

  async removeFromCart(dto: RemoveFromCartDto) {
    return this.prisma.cartItem.delete({
      where: { id: dto.cartItemId },
    });
  }

  async getCartByUserId(userId: number) {
    return this.prisma.cart.findFirst({
      where: { userId, status: 'active' },
      include: { items: true },
    });
  }
}
