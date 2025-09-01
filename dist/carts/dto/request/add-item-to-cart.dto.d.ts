import { CartItemType } from '@prisma/client';
export declare class AddItemToCartDto {
    itemType: CartItemType;
    itemId: number;
    quantity: number;
    price: number;
}
