import { PaymentStatus, PayableType } from '@prisma/client';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto.ts';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentService);
    create(dto: CreatePaymentDto, req: any): Promise<{
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
    findAll(page?: string, limit?: string, req?: any): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
    getDeleted(page?: string, limit?: string, req?: any): Promise<{
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
    getStats(req: any): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PaymentGroupByOutputType, "status"[]> & {
        _count: {
            status: number;
        };
        _sum: {
            amount: import("@prisma/client/runtime/library").Decimal | null;
        };
    })[]>;
    findByStatus(status: PaymentStatus, req: any): Promise<({
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
    findByPayableType(payableType: PayableType, req: any): Promise<{
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
    findByUser(userId: number, req: any): Promise<{
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
    getUserStats(userId: number, req: any): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PaymentGroupByOutputType, "status"[]> & {
        _count: {
            status: number;
        };
        _sum: {
            amount: import("@prisma/client/runtime/library").Decimal | null;
        };
    })[]>;
    findOne(id: number, req: any): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
            deletedAt: Date | null;
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
    update(id: number, dto: UpdatePaymentDto, req: any): Promise<{
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
    remove(id: number, req: any): Promise<{
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
    forceDelete(id: number, req: any): Promise<{
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
    restore(id: number, req: any): Promise<{
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
