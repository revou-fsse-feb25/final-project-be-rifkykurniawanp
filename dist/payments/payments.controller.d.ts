import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import { PaymentResponseDto } from './dto/response/payment.response.dto';
export declare class PaymentsController {
    private readonly service;
    constructor(service: PaymentsService);
    create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
    findAll(): Promise<PaymentResponseDto[]>;
    findOne(id: number): Promise<PaymentResponseDto | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto>;
    remove(id: number): Promise<void>;
}
