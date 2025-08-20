import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsController {
    private readonly service;
    constructor(service: CartsService);
    getCart(req: any): Promise<{
        items: {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCartById(cartId: number): Promise<{
        items: {
            id: number;
            cartId: number;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            price: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addItem(cartId: number, dto: AddToCartDto, req: any): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateItem(cartId: number, itemId: number, dto: UpdateCartDto): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    removeItem(cartId: number, itemId: number): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    checkout(cartId: number, req: any): Promise<{
        message: string;
    }>;
}
