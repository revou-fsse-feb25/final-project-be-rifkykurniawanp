import { PrismaService } from "../prisma/prisma.service";
import { Payment, PaymentStatus, PayableType } from "@prisma/client";
import { IPaymentsRepository } from "./interfaces/payments.repository.interface";
export declare class PaymentsRepository implements IPaymentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Payment[]>;
    findById(id: number): Promise<Payment | null>;
    findByUser(userId: number): Promise<Payment[]>;
    create(data: {
        userId: number;
        cartId: number;
        amount: number;
        paymentMethod: string;
        payableType: PayableType;
        payableId: number;
    }): Promise<Payment>;
    updateStatus(id: number, status: PaymentStatus): Promise<Payment>;
    cancel(id: number): Promise<Payment>;
    verify(id: number): Promise<Payment>;
}
