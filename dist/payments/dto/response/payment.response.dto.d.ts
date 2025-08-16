import { PaymentStatus, PayableType } from '@prisma/client';
export declare class PaymentResponseDto {
    id: number;
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    status: PaymentStatus;
    payableType: PayableType;
    payableId: number;
    paidAt?: string;
    createdAt: Date;
}
