import { CartItemResponseDto } from './cart-item.response.dto';
export declare class CartSummaryResponseDto {
    totalItems: number;
    totalAmount: number;
    uniqueItems: number;
    items: CartItemResponseDto[];
}
