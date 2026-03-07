import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/request/create-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(req: any, dto: CreateCartDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    findAll(req: any, page?: string, limit?: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }[]>;
    findOne(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    update(id: number, dto: UpdateCartDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    remove(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
    }>;
    addItem(cartId: number, body: {
        itemType: 'PRODUCT' | 'COURSE';
        itemId: number;
        quantity: number;
    }, req: any): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
        addedAt: Date;
    }>;
    removeItem(cartId: number, itemId: number, req: any): Promise<{
        id: number;
        deletedAt: Date | null;
        productId: number | null;
        courseId: number | null;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        quantity: number;
        priceSnapshot: import("@prisma/client/runtime/library").Decimal;
        addedAt: Date;
    }>;
}
