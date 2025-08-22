import { PaymentStatus } from '@prisma/client';
export declare class UpdatePaymentDto {
    amount?: number;
    paymentMethod?: string;
    status?: PaymentStatus;
    paidAt?: Date;
}
