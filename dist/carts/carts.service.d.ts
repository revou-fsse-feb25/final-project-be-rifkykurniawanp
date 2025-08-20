import { CartsRepository } from './carts.repository';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsService {
    private readonly repository;
    constructor(repository: CartsRepository);
    getCartByUser(userId: number): Promise<{
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
    addItem(dto: AddToCartDto & {
        cartId?: number;
    }): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateItem(cartItemId: number, dto: Partial<UpdateCartDto>): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    removeItem(cartItemId: number): Promise<{
        id: number;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    checkout(cartId: number, userId: number): Promise<{
        message: string;
    }>;
}
