import { PayableType } from "@prisma/client";
export declare class CreatePaymentDto {
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    payableType: PayableType;
    payableId: number;
}
