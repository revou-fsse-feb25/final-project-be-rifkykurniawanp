import { Injectable, NotFoundException } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly repository: CartsRepository) {}

  async getCartByUser(userId: number) {
    const cart = await this.repository.getCartByUser(userId);
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async addItem(dto: AddToCartDto & { cartId?: number }) {
    return this.repository.addItem(dto);
  }

  async updateItem(cartItemId: number, dto: Partial<UpdateCartDto>) {
    return this.repository.updateItem(cartItemId, dto);
  }

  async removeItem(cartItemId: number) {
    return this.repository.removeItem(cartItemId);
  }

  async checkout(cartId: number, userId: number) {
    const cart = await this.repository.getCartById(cartId);

    if (!cart || cart.userId !== userId) {
      throw new NotFoundException('Cart not found for user');
    }

    // Dummy logic, integrate with PaymentService later
    return { message: `Cart ${cartId} checked out by user ${userId}` };
  }
}
