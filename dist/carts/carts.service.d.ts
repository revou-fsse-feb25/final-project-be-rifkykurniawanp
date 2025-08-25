import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/request/create-cart.dto';
import { UpdateCartDto } from './dto/request/update-cart.dto';
import { Cart, RoleName } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class CartsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateCartDto, role: RoleName): Promise<Cart>;
    findAll(userId: number, role: RoleName): Promise<Cart[]>;
    findOne(id: number, userId: number, role: RoleName): Promise<Cart>;
    update(id: number, dto: UpdateCartDto, userId: number, role: RoleName): Promise<Cart>;
    remove(id: number, userId: number, role: RoleName): Promise<Cart>;
    addItem(cartId: number, userId: number, itemType: 'PRODUCT' | 'COURSE', itemId: number, quantity: number, role: RoleName): Promise<{
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }>;
    removeItem(cartId: number, userId: number, itemId: number, role: RoleName): Promise<{
        id: number;
        deletedAt: Date | null;
        price: Prisma.Decimal;
        cartId: number;
        itemType: import(".prisma/client").$Enums.CartItemType;
        itemId: number;
        quantity: number;
    }>;
}
