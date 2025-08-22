import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/request/create-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(req: any, dto: CreateCartDto): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    findAll(req: any, page?: string, limit?: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }[]>;
    findOne(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateCartDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    remove(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        userId: number;
        updatedAt: Date;
    }>;
    addItem(cartId: number, body: {
        itemType: 'PRODUCT' | 'COURSE';
        itemId: number;
        quantity: number;
    }, req: any): Promise<{
        id: number;
        deletedAt: Date | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
    removeItem(cartId: number, itemId: number, req: any): Promise<{
        id: number;
        deletedAt: Date | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
        price: import("@prisma/client/runtime/library").Decimal;
    }>;
}
