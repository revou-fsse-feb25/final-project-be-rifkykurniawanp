import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
export declare class PaymentsService {
    private readonly repository;
    constructor(repository: PaymentsRepository);
    create(dto: CreatePaymentDto): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdatePaymentDto): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PaymentClient<{
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
