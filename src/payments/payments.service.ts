import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto.ts';
import { Payment, PaymentStatus, PayableType } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePaymentDto, userId: number, role: string): Promise<Payment> {
  // validasi role / user sesuai kebutuhan
  const user = await this.prisma.user.findFirst({
    where: { id: userId, deletedAt: null },
  });
  if (!user) throw new NotFoundException('User not found');

  return this.prisma.payment.create({
    data: {
      userId,
      cartId: dto.cartId,
      amount: dto.amount,
      paymentMethod: dto.paymentMethod,
      status: PaymentStatus.PENDING,
      payableType: dto.payableType,
      payableId: dto.payableId,
    },
  });
}

async findAll(page: number, limit: number, role: string) {
  return this.prisma.payment.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: { user: true, cart: true },
  });
}

async getDeleted(page: number, limit: number, role: string) {
  return this.prisma.payment.findMany({
    where: { deletedAt: { not: null } },
    skip: (page - 1) * limit,
    take: limit,
  });
}

async getStats(role: string) {
  return this.prisma.payment.groupBy({
    by: ['status'],
    _count: { status: true },
    _sum: { amount: true },
  });
}

async findByStatus(status: PaymentStatus, role: string) {
  return this.prisma.payment.findMany({
    where: { status },
    include: { user: true },
  });
}

async findByPayableType(payableType: PayableType, role: string) {
  return this.prisma.payment.findMany({
    where: { payableType },
  });
}

async findByUser(userId: number, requestUserId: number, role: string) {
  if (role !== 'ADMIN' && userId !== requestUserId) {
    throw new BadRequestException('Not authorized to view this user’s payments');
  }
  return this.prisma.payment.findMany({ where: { userId } });
}

async getUserPaymentStats(userId: number, requestUserId: number, role: string) {
  if (role !== 'ADMIN' && userId !== requestUserId) {
    throw new BadRequestException('Not authorized');
  }
  return this.prisma.payment.groupBy({
    by: ['status'],
    where: { userId },
    _count: { status: true },
    _sum: { amount: true },
  });
}

async findOne(id: number, requestUserId: number, role: string) {
  const payment = await this.prisma.payment.findUnique({
    where: { id },
    include: { user: true, cart: true },
  });
  if (!payment) throw new NotFoundException('Payment not found');

  if (role !== 'ADMIN' && payment.userId !== requestUserId) {
    throw new BadRequestException('Not authorized to view this payment');
  }
  return payment;
}

async update(id: number, dto: UpdatePaymentDto, requestUserId: number, role: string) {
  const payment = await this.findOne(id, requestUserId, role);
  return this.prisma.payment.update({
    where: { id },
    data: dto,
  });
}

async remove(id: number, requestUserId: number, role: string) {
  const payment = await this.findOne(id, requestUserId, role);
  return this.prisma.payment.update({
    where: { id },
    data: { deletedAt: new Date() }, // soft delete
  });
}

async forceDelete(id: number, role: string) {
  if (role !== 'ADMIN') throw new BadRequestException('Only admin can delete permanently');
  return this.prisma.payment.delete({ where: { id } });
}

async restore(id: number, role: string) {
  if (role !== 'ADMIN') throw new BadRequestException('Only admin can restore');
  return this.prisma.payment.update({
    where: { id },
    data: { deletedAt: null },
  });
}
}