export declare enum CartItemType {
    PRODUCT = "PRODUCT",
    COURSE = "COURSE"
}
export declare class AddToCartDto {
    userId: number;
    itemType: CartItemType;
    itemId: number;
    quantity: number;
    price: number;
}
