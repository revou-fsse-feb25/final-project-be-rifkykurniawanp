import { CartItemType } from '@prisma/client';
export declare class ProductBasicDto {
    id: number;
    name: string;
    slug: string;
    image?: string;
    price: number;
    stock: number;
}
export declare class CourseBasicDto {
    id: number;
    title: string;
    slug: string;
    price: number;
    level: string;
    category: string;
}
export declare class CartItemResponseDto {
    id: number;
    cartId: number;
    itemType: CartItemType;
    itemId: number;
    quantity: number;
    price: number;
    subtotal: number;
    product?: ProductBasicDto;
    course?: CourseBasicDto;
}
