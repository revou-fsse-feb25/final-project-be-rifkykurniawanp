export declare class CartResponseDto {
    id: number;
    userId: number;
    status: string;
    items: CartItemResponseDto[];
}
export declare class CartItemResponseDto {
    id: number;
    itemId: number;
    quantity: number;
    price: number;
}
