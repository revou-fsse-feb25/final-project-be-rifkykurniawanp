import { PaymentStatus, PayableType } from '@prisma/client';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import { PaymentResponseDto } from './dto/response/payment.response.dto';
export interface PaymentsRepository {
    create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
    findAll(filters: Partial<{
        userId: number;
        status: PaymentStatus;
        payableType: PayableType;
    }>, offset: number, limit: number): Promise<PaymentResponseDto[]>;
    findOne(id: number): Promise<PaymentResponseDto | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto>;
    remove(id: number): Promise<void>;
    count(filters: Partial<{
        userId: number;
        status: PaymentStatus;
        payableType: PayableType;
    }>): Promise<number>;
    findByUser(userId: number): Promise<PaymentResponseDto[]>;
    findByCart(cartId: number): Promise<PaymentResponseDto[]>;
    findByDateRange(startDate: string, endDate: string, userId?: number): Promise<PaymentResponseDto[]>;
    findByPayableType(payableType: PayableType): Promise<PaymentResponseDto[]>;
    getCartOwner(cartId: number): Promise<{
        userId: number;
    } | null>;
    checkPayableExists(payableType: PayableType, payableId: number): Promise<boolean>;
    hasRelatedRecords(paymentId: number): Promise<boolean>;
    getPaymentStats(userId?: number): Promise<{
        totalAmount: number;
        totalPayments: number;
        completedPayments: number;
        pendingPayments: number;
        failedPayments: number;
    }>;
    calculateTotalRevenue(userId?: number): Promise<number>;
    createProductOrderFromPayment(paymentId: number): Promise<void>;
    createCourseEnrollmentFromPayment(paymentId: number): Promise<void>;
}
export declare class PrismaPaymentsRepository implements PaymentsRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
    findAll(filters: any, offset: number, limit: number): Promise<PaymentResponseDto[]>;
    findOne(id: number): Promise<PaymentResponseDto | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto>;
    remove(id: number): Promise<void>;
    count(filters: any): Promise<number>;
    findByUser(userId: number): Promise<PaymentResponseDto[]>;
    findByCart(cartId: number): Promise<PaymentResponseDto[]>;
    findByDateRange(startDate: string, endDate: string, userId?: number): Promise<PaymentResponseDto[]>;
    findByPayableType(payableType: PayableType): Promise<PaymentResponseDto[]>;
    getCartOwner(cartId: number): Promise<{
        userId: number;
    } | null>;
    checkPayableExists(payableType: PayableType, payableId: number): Promise<boolean>;
    hasRelatedRecords(paymentId: number): Promise<boolean>;
    getPaymentStats(userId?: number): Promise<{
        totalAmount: number;
        totalPayments: number;
        completedPayments: number;
        pendingPayments: number;
        failedPayments: number;
    }>;
    calculateTotalRevenue(userId?: number): Promise<number>;
    createProductOrderFromPayment(paymentId: number): Promise<void>;
    createCourseEnrollmentFromPayment(paymentId: number): Promise<void>;
    private mapToResponseDto;
}
