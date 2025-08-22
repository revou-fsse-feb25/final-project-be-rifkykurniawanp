import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto.ts';
import { Payment, PaymentStatus, PayableType } from '@prisma/client';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePaymentDto, userId: number, role: string): Promise<Payment>;
    findAll(page: number, limit: number, role: string): Promise<({
        user: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        cart: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            userId: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    })[]>;
    getDeleted(page: number, limit: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }[]>;
    getStats(role: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PaymentGroupByOutputType, "status"[]> & {
        _count: {
            status: number;
        };
        _sum: {
            amount: import("@prisma/client/runtime/library").Decimal | null;
        };
    })[]>;
    findByStatus(status: PaymentStatus, role: string): Promise<({
        user: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    })[]>;
    findByPayableType(payableType: PayableType, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }[]>;
    findByUser(userId: number, requestUserId: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }[]>;
    getUserPaymentStats(userId: number, requestUserId: number, role: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PaymentGroupByOutputType, "status"[]> & {
        _count: {
            status: number;
        };
        _sum: {
            amount: import("@prisma/client/runtime/library").Decimal | null;
        };
    })[]>;
    findOne(id: number, requestUserId: number, role: string): Promise<{
        user: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
        };
        cart: {
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
            userId: number;
            updatedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }>;
    update(id: number, dto: UpdatePaymentDto, requestUserId: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }>;
    remove(id: number, requestUserId: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }>;
    forceDelete(id: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }>;
    restore(id: number, role: string): Promise<{
        id: number;
        createdAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
        cartId: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentMethod: string;
        payableType: import(".prisma/client").$Enums.PayableType;
        payableId: number;
        paidAt: Date | null;
    }>;
}
