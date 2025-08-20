import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { IPaymentsRepository } from "./interfaces/payments.repository.interface";
import { PaymentStatus, PayableType } from "@prisma/client";
import { PaymentResponseDto } from "./dto/response/payment.response.dto"

@Injectable()
export class PaymentsService {
  constructor(@Inject("IPaymentsRepository") private readonly paymentsRepo: IPaymentsRepository) {}

  async getAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepo.findAll();
    return payments.map((p) => new PaymentResponseDto(p));
  }

  async getById(id: number): Promise<PaymentResponseDto> {
    const payment = await this.paymentsRepo.findById(id);
    if (!payment) throw new NotFoundException("Payment not found");
    return new PaymentResponseDto(payment);
  }

  async getByUser(userId: number): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepo.findByUser(userId);
    return payments.map((p) => new PaymentResponseDto(p));
  }

  async createPayment(dto: {
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    payableType: PayableType;
    payableId: number;
  }): Promise<PaymentResponseDto> {
    const payment = await this.paymentsRepo.create(dto);
    return new PaymentResponseDto(payment);
  }

  async updateStatus(id: number, status: PaymentStatus): Promise<PaymentResponseDto> {
    await this.getById(id);
    const updated = await this.paymentsRepo.updateStatus(id, status);
    return new PaymentResponseDto(updated);
  }

  async cancel(id: number): Promise<PaymentResponseDto> {
    await this.getById(id);
    const cancelled = await this.paymentsRepo.cancel(id);
    return new PaymentResponseDto(cancelled);
  }

  async verify(id: number): Promise<PaymentResponseDto> {
    await this.getById(id);
    const verified = await this.paymentsRepo.verify(id);
    return new PaymentResponseDto(verified);
  }
}