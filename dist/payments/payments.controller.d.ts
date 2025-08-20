import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/request/create-payment.dto";
import { UpdatePaymentStatusDto } from "./dto/request/update-payment-status.dto.ts";
import { CancelPaymentDto } from "./dto/request/cancel-payment.dto";
import { PaymentResponseDto } from "./dto/response/payment.response.dto";
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getAll(): Promise<PaymentResponseDto[]>;
    getById(id: string): Promise<PaymentResponseDto>;
    getByUser(userId: string): Promise<PaymentResponseDto[]>;
    create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
    updateStatus(id: string, dto: UpdatePaymentStatusDto): Promise<PaymentResponseDto>;
    verify(id: string): Promise<PaymentResponseDto>;
    cancel(id: string, dto: CancelPaymentDto): Promise<PaymentResponseDto>;
}
