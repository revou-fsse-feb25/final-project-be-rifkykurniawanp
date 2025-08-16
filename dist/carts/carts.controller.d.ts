import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/request/add-to-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsController {
    private readonly service;
    constructor(service: CartsService);
    addItem(dto: AddToCartDto): Promise<{
        id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        cartId: number;
    }>;
    updateItem(cartItemId: number, dto: UpdateCartDto): import(".prisma/client").Prisma.Prisma__CartItemClient<{
        id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        cartId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getCartByUser(userId: number): import(".prisma/client").Prisma.Prisma__CartClient<({
        items: {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            itemType: import(".prisma/client").$Enums.CartItemType;
            itemId: number;
            quantity: number;
            cartId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    removeItem(cartItemId: number): import(".prisma/client").Prisma.Prisma__CartItemClient<{
        id: number;
        price: import("@prisma/client/runtime/library").Decimal;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        cartId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
