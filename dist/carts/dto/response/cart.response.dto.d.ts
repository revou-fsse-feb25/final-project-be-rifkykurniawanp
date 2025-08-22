import { CartItemResponseDto } from './cart-item.response.dto';
export declare class UserBasicDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
}
export declare class CartResponseDto {
    id: number;
    userId: number;
    user?: UserBasicDto;
    items: CartItemResponseDto[];
    totalItems: number;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
}
