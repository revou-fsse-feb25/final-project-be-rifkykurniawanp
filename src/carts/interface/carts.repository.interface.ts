import { AddToCartDto } from '../dto/request/add-to-cart.dto';
import { UpdateCartDto } from '../dto/request/update-cart.dto';
import { RemoveFromCartDto } from '../dto/request/remove-form-cart.dto';

export interface ICartsRepository {
  addToCart(dto: AddToCartDto): Promise<any>;
  updateCart(dto: UpdateCartDto): Promise<any>;
  removeFromCart(dto: RemoveFromCartDto): Promise<any>;
  getCartByUserId(userId: number): Promise<any>;
}
