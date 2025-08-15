import { AddToCartDto } from '../dto/request/add-to-cart.dto';
import { UpdateCartDto } from '../dto/request/update-cart.dto';

export interface ICartsRepository {
  addItem(dto: AddToCartDto);
  updateItem(cartItemId: number, dto: UpdateCartDto);
  getCartByUser(userId: number);
  removeItem(cartItemId: number);
}
