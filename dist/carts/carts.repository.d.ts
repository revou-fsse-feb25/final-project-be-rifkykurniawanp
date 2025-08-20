import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCartByUser(userId: number): Promise<({
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
    }) | null>;
    getCartById(cartId: number): Promise<({
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
    }) | null>;
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
}
