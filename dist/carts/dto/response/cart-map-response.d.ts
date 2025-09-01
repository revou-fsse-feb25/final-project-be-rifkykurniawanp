import { CartItemResponseDto } from './cart-item.response.dto';
import { Cart, CartItem } from '@prisma/client';
import { CartResponseDto } from './cart.response.dto';
export declare class CartMapper {
    static toCartItemDto(item: CartItem & {
        product?: any;
        course?: any;
    }): CartItemResponseDto;
    static toCartDto(cart: Cart & {
        items: (CartItem & {
            product?: any;
            course?: any;
        })[];
        user?: any;
    }): CartResponseDto;
}
