import { ProductOrdersService } from './product-orders.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
export declare class ProductOrdersController {
    private readonly service;
    constructor(service: ProductOrdersService);
    create(dto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        items: {
            id: number;
            orderId: number;
            productId: number;
            quantity: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<({
        items: {
            id: number;
            orderId: number;
            productId: number;
            quantity: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
