import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Payment, PaymentStatus, PayableType } from "@prisma/client";
import { IPaymentsRepository } from "./interfaces/payments.repository.interface";

@Injectable()
export class PaymentsRepository implements IPaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      include: { user: true, cart: true },
    });
  }

  async findById(id: number): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
      include: { user: true, cart: true },
    });
  }

  async findByUser(userId: number): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { cart: true },
    });
  }

  async create(data: {
    userId: number;
    cartId: number;
    amount: number;
    paymentMethod: string;
    payableType: PayableType;
    payableId: number;
  }): Promise<Payment> {
    return this.prisma.payment.create({
      data: {
        userId: data.userId,
        cartId: data.cartId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        payableType: data.payableType,
        payableId: data.payableId,
        status: PaymentStatus.PENDING,
      },
    });
  }

  async updateStatus(id: number, status: PaymentStatus): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  async cancel(id: number): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: { status: PaymentStatus.CANCELLED },
    });
  }

  async verify(id: number): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: { status: PaymentStatus.COMPLETED },
    });
  }
}
