// payment.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import { Payment, Prisma } from '@prisma/client';
import { IPaymentRepository, PaymentWithRelations } from './interface/payments.repository.interface';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(private prisma: PrismaService) {}

  private readonly includeRelations = {
    user: {
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    },
    cart: {
      select: {
        id: true,
        status: true,
        items: {
          select: {
            id: true,
            itemType: true,
            itemId: true,
            quantity: true,
            price: true
          }
        }
      }
    },
    productOrders: {
      select: {
        id: true,
        status: true,
        totalPrice: true
      }
    },
    courseEnrollments: {
      select: {
        id: true,
        courseId: true,
        pricePaid: true
      }
    }
  };

  async findAll(search?: string): Promise<PaymentWithRelations[]> {
    const whereCondition: Prisma.PaymentWhereInput | undefined = search ? {
      OR: [
        { paymentMethod: { contains: search, mode: "insensitive" } },
        { status: { contains: search, mode: "insensitive" } },
        { payableType: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } }
      ]
    } : undefined;

    return this.prisma.payment.findMany({
      where: whereCondition,
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: number): Promise<PaymentWithRelations | null> {
    return this.prisma.payment.findUnique({
      where: { id },
      include: this.includeRelations
    });
  }

  async findByUserId(userId: number): Promise<PaymentWithRelations[]> {
    return this.prisma.payment.findMany({
      where: { userId },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findByStatus(status: string): Promise<PaymentWithRelations[]> {
    return this.prisma.payment.findMany({
      where: { status },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return this.prisma.payment.create({
      data
    });
  }

  async update(id: number, data: Prisma.PaymentUpdateInput): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<Payment> {
    return this.prisma.payment.delete({
      where: { id }
    });
  }

  async count(search?: string): Promise<number> {
    const whereCondition: Prisma.PaymentWhereInput | undefined = search ? {
      OR: [
        { paymentMethod: { contains: search, mode: "insensitive" } },
        { status: { contains: search, mode: "insensitive" } },
        { payableType: { contains: search, mode: "insensitive" } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } }
      ]
    } : undefined;

    return this.prisma.payment.count({
      where: whereCondition
    });
  }

  async findPaginated(
    page: number, 
    limit: number, 
    search?: string,
    status?: string,
    userId?: number
  ): Promise<{ 
    data: PaymentWithRelations[], 
    total: number, 
    page: number, 
    limit: number 
  }> {
    const whereConditions: Prisma.PaymentWhereInput[] = [];

    // Add search condition
    if (search) {
      whereConditions.push({
        OR: [
          { paymentMethod: { contains: search, mode: "insensitive" } },
          { status: { contains: search, mode: "insensitive" } },
          { payableType: { contains: search, mode: "insensitive" } },
          { user: { email: { contains: search, mode: "insensitive" } } },
          { user: { firstName: { contains: search, mode: "insensitive" } } },
          { user: { lastName: { contains: search, mode: "insensitive" } } }
        ]
      });
    }

    // Add status filter
    if (status) {
      whereConditions.push({ status });
    }

    // Add user filter
    if (userId) {
      whereConditions.push({ userId });
    }

    const whereCondition: Prisma.PaymentWhereInput = whereConditions.length > 0 
      ? { AND: whereConditions } 
      : {};

    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: whereCondition,
        include: this.includeRelations,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.payment.count({
        where: whereCondition
      })
    ]);

    return {
      data,
      total,
      page,
      limit
    };
  }

  async updateStatus(id: number, status: string): Promise<Payment> {
    const updateData: Prisma.PaymentUpdateInput = {
      status,
      ...(status === 'completed' && { paidAt: new Date() })
    };

    return this.prisma.payment.update({
      where: { id },
      data: updateData
    });
  }

  async findPendingPayments(): Promise<PaymentWithRelations[]> {
    return this.prisma.payment.findMany({
      where: { status: 'pending' },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findByPaymentMethod(paymentMethod: string): Promise<PaymentWithRelations[]> {
    return this.prisma.payment.findMany({
      where: { paymentMethod },
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' }
    });
  }
}