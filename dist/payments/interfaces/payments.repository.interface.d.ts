import { Payment, PaymentStatus, PayableType, Prisma } from '@prisma/client';
export interface CreatePaymentData {
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    status?: PaymentStatus;
    payableType: PayableType;
    payableId: number;
    paidAt?: Date;
}
export interface UpdatePaymentData {
    amount?: number;
    paymentMethod?: string;
    status?: PaymentStatus;
    paidAt?: Date;
}
export interface IPaymentsRepository {
    create(data: CreatePaymentData): Promise<Payment>;
    findById(id: number, where?: Prisma.PaymentWhereInput): Promise<Payment | null>;
    findByIdIncludingDeleted(id: number): Promise<Payment | null>;
    findByUserId(userId: number, where?: Prisma.PaymentWhereInput): Promise<Payment[]>;
    findByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<Payment[]>;
    findByPayableType(payableType: PayableType, where?: Prisma.PaymentWhereInput): Promise<Payment[]>;
    findAll(skip?: number, take?: number, where?: Prisma.PaymentWhereInput): Promise<Payment[]>;
    findDeleted(skip?: number, take?: number): Promise<Payment[]>;
    update(id: number, data: UpdatePaymentData): Promise<Payment>;
    softDelete(id: number): Promise<Payment>;
    hardDelete(id: number): Promise<Payment>;
    restore(id: number): Promise<Payment>;
    countByUser(userId: number, where?: Prisma.PaymentWhereInput): Promise<number>;
    countByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<number>;
    sumAmountByUser(userId: number, where?: Prisma.PaymentWhereInput): Promise<number>;
    sumAmountByStatus(status: PaymentStatus, where?: Prisma.PaymentWhereInput): Promise<number>;
}
