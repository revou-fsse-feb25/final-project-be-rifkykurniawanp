import { ProductOrderItemsService } from './product-order-items.service';
import { CreateOrderItemDto } from './dto/request/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/request/update-order-item.dto';
export declare class ProductOrderItemsController {
    private readonly service;
    constructor(service: ProductOrderItemsService);
    create(dto: CreateOrderItemDto): import(".prisma/client").Prisma.Prisma__ProductOrderItemClient<{
        id: number;
        productId: number;
        quantity: number;
        priceEach: import("@prisma/client/runtime/library").Decimal;
        orderId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        productId: number;
        quantity: number;
        priceEach: import("@prisma/client/runtime/library").Decimal;
        orderId: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderItemClient<{
        id: number;
        productId: number;
        quantity: number;
        priceEach: import("@prisma/client/runtime/library").Decimal;
        orderId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateOrderItemDto): import(".prisma/client").Prisma.Prisma__ProductOrderItemClient<{
        id: number;
        productId: number;
        quantity: number;
        priceEach: import("@prisma/client/runtime/library").Decimal;
        orderId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__ProductOrderItemClient<{
        id: number;
        productId: number;
        quantity: number;
        priceEach: import("@prisma/client/runtime/library").Decimal;
        orderId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
