import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { RemoveFromCartDto } from './dto/request/remove-form-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly cartsRepo: CartsRepository) {}

  async addToCart(dto: AddToCartDto) {
    return this.cartsRepo.addToCart(dto);
  }

  async updateCart(dto: UpdateCartDto) {
    return this.cartsRepo.updateCart(dto);
  }

  async removeFromCart(dto: RemoveFromCartDto) {
    return this.cartsRepo.removeFromCart(dto);
  }

  async getUserCart(userId: number) {
    return this.cartsRepo.getCartByUserId(userId);
  }
}
