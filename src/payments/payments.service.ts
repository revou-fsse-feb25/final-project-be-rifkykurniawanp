import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PaymentsRepository } from './payments.repository';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import {
  PaymentResponseDto,
  PaymentQueryDto,
  PaymentStatsDto,
  PaginatedPaymentResponseDto,
} from './dto/response/payment.response.dto';
import { PaymentStatus, PayableType } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly repository: PaymentsRepository) {}

  async create(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    if (dto.amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }
    await this.validateCartOwnership(dto.cartId, dto.userId);
    await this.validatePayableItem(dto.payableType, dto.payableId);

    return this.repository.create({
      ...dto,
      status: PaymentStatus.PENDING,
    });
  }

  async findAll(query: PaymentQueryDto): Promise<PaginatedPaymentResponseDto> {
    const { page = 1, limit = 10, ...filters } = query;
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.repository.findAll(filters, offset, limit),
      this.repository.count(filters),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  }

  async findOne(id: number): Promise<PaymentResponseDto> {
    const payment = await this.repository.findOne(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async findByUser(userId: number): Promise<PaymentResponseDto[]> {
    return this.repository.findByUser(userId);
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const existing = await this.findOne(id);

    if (dto.status && dto.status !== existing.status) {
      this.validateStatusTransition(existing.status, dto.status);
    }

    const updateData: Partial<UpdatePaymentDto & { paidAt?: string }> = {
      ...dto,
    };

    if (
      dto.status === PaymentStatus.COMPLETED &&
      existing.status !== PaymentStatus.COMPLETED
    ) {
      updateData.paidAt = new Date().toISOString();
    }

    const updated = await this.repository.update(id, updateData);

    if (
      dto.status === PaymentStatus.COMPLETED &&
      existing.status !== PaymentStatus.COMPLETED
    ) {
      this.handleCompletedPayment(updated.id).catch(console.error);
    }

    return updated;
  }

  async updateStatus(id: number, status: PaymentStatus): Promise<PaymentResponseDto> {
    return this.update(id, { status });
  }

  async processPayment(id: number): Promise<PaymentResponseDto> {
    const payment = await this.findOne(id);
    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Only pending payments can be processed');
    }

    try {
      return await this.update(id, {
        status: PaymentStatus.COMPLETED,
        paidAt: new Date().toISOString(),
      });
    } catch (error) {
      await this.update(id, { status: PaymentStatus.FAILED });
      throw new BadRequestException(`Payment processing failed: ${error.message}`);
    }
  }

  async handleWebhook(payload: any, req: any): Promise<void> {
    // TODO: validate signature
    // TODO: map payload to UpdatePaymentDto
    console.log('Webhook received:', payload);
  }

  // --- Helpers ---

  private validateStatusTransition(
    current: PaymentStatus,
    next: PaymentStatus,
  ): void {
    const allowed: Record<PaymentStatus, PaymentStatus[]> = {
      [PaymentStatus.PENDING]: [
        PaymentStatus.COMPLETED,
        PaymentStatus.FAILED,
        PaymentStatus.CANCELLED,
      ],
      [PaymentStatus.COMPLETED]: [],
      [PaymentStatus.FAILED]: [PaymentStatus.PENDING, PaymentStatus.CANCELLED],
      [PaymentStatus.CANCELLED]: [],
    };

    if (!allowed[current]?.includes(next)) {
      throw new BadRequestException(
        `Invalid transition from ${current} to ${next}`,
      );
    }
  }

  private async validateCartOwnership(cartId: number, userId: number) {
    const cartOwner = await this.repository.getCartOwner(cartId);
    if (!cartOwner) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
    if (cartOwner.userId !== userId) {
      throw new BadRequestException('Cart does not belong to the user');
    }
  }

  private async validatePayableItem(type: PayableType, id: number) {
    const exists = await this.repository.checkPayableExists(type, id);
    if (!exists) {
      throw new NotFoundException(`${type.toLowerCase()} ${id} not found`);
    }
  }

  private async handleCompletedPayment(paymentId: number): Promise<void> {
    const payment = await this.findOne(paymentId);
    if (payment.payableType === PayableType.PRODUCT) {
      await this.repository.createProductOrderFromPayment(paymentId);
    } else if (payment.payableType === PayableType.COURSE) {
      await this.repository.createCourseEnrollmentFromPayment(paymentId);
    }
  }
}
