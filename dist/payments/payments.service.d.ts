import { IPaymentsRepository } from "./interfaces/payments.repository.interface";
import { PaymentStatus, PayableType } from "@prisma/client";
import { PaymentResponseDto } from "./dto/response/payment.response.dto";
export declare class PaymentsService {
    private readonly paymentsRepo;
    constructor(paymentsRepo: IPaymentsRepository);
    getAll(): Promise<PaymentResponseDto[]>;
    getById(id: number): Promise<PaymentResponseDto>;
    getByUser(userId: number): Promise<PaymentResponseDto[]>;
    createPayment(dto: {
        userId: number;
        cartId: number;
        amount: number;
        paymentMethod: string;
        payableType: PayableType;
        payableId: number;
    }): Promise<PaymentResponseDto>;
    updateStatus(id: number, status: PaymentStatus): Promise<PaymentResponseDto>;
    cancel(id: number): Promise<PaymentResponseDto>;
    verify(id: number): Promise<PaymentResponseDto>;
}
