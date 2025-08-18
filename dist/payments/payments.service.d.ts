import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
export declare class PaymentsService {
    private readonly repository;
    constructor(repository: PaymentsRepository);
    create(dto: CreatePaymentDto): Promise<import("./dto/response/payment.response.dto").PaymentResponseDto>;
    findAll(): Promise<import("./dto/response/payment.response.dto").PaymentResponseDto[]>;
    findOne(id: number): Promise<import("./dto/response/payment.response.dto").PaymentResponseDto | null>;
    update(id: number, dto: UpdatePaymentDto): Promise<import("./dto/response/payment.response.dto").PaymentResponseDto>;
    remove(id: number): Promise<void>;
}
