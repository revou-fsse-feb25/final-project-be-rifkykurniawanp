import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
export declare class ProductOrdersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        buyerId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        items: {
            id: number;
            productId: number;
            quantity: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        buyerId: number;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<({
        items: {
            id: number;
            productId: number;
            quantity: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        buyerId: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        buyerId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        buyerId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
