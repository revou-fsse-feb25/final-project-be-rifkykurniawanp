import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly repository: CartsRepository) {}

  addItem(dto: AddToCartDto) {
    return this.repository.addItem(dto);
  }

  updateItem(cartItemId: number, dto: UpdateCartDto) {
    return this.repository.updateItem(cartItemId, dto);
  }

  getCartByUser(userId: number) {
    return this.repository.getCartByUser(userId);
  }

  removeItem(cartItemId: number) {
    return this.repository.removeItem(cartItemId);
  }
}
