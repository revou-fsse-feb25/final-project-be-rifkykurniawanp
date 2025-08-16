import { ProductOrdersRepository } from './product-order.repository';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
export declare class ProductOrdersService {
    private readonly repository;
    constructor(repository: ProductOrdersRepository);
    create(dto: CreateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        items: {
            id: number;
            productId: number;
            quantity: number;
            orderId: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<({
        items: {
            id: number;
            productId: number;
            quantity: number;
            orderId: number;
            priceEach: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateOrderDto): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderClient<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        buyerId: number;
        paymentId: number;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
