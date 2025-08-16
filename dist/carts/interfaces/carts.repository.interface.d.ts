import { AddToCartDto } from '../dto/request/add-to-cart.dto';
import { UpdateCartDto } from '../dto/request/update-cart.dto';
export interface ICartsRepository {
    addItem(dto: AddToCartDto): any;
    updateItem(cartItemId: number, dto: UpdateCartDto): any;
    getCartByUser(userId: number): any;
    removeItem(cartItemId: number): any;
}
