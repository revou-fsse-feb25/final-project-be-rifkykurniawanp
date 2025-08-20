export declare class PaymentResponseDto {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
    cart: {
        id: number;
        totalAmount: number;
    } | null;
    amount: number;
    status: string;
    paymentMethod: string;
    payableType: string;
    payableId: number;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    constructor(payment: any);
}
