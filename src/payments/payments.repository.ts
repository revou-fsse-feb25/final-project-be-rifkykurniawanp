import { PaymentStatus, PayableType, Prisma } from '@prisma/client';
import { CreatePaymentDto } from './dto/request/create-payment.dto';
import { UpdatePaymentDto } from './dto/request/update-payment.dto';
import { PaymentResponseDto } from './dto/response/payment.response.dto';
import { PrismaClient } from '@prisma/client';

export interface PaymentsRepository {
  // Core CRUD operations
  create(dto: CreatePaymentDto): Promise<PaymentResponseDto>;
  findAll(
    filters: Partial<{
      userId: number;
      status: PaymentStatus;
      payableType: PayableType;
    }>,
    offset: number,
    limit: number
  ): Promise<PaymentResponseDto[]>;
  findOne(id: number): Promise<PaymentResponseDto | null>;
  update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto>;
  remove(id: number): Promise<void>;

  // Query operations
  count(filters: Partial<{
    userId: number;
    status: PaymentStatus;
    payableType: PayableType;
  }>): Promise<number>;
  findByUser(userId: number): Promise<PaymentResponseDto[]>;
  findByCart(cartId: number): Promise<PaymentResponseDto[]>;
  findByDateRange(startDate: string, endDate: string, userId?: number): Promise<PaymentResponseDto[]>;
  findByPayableType(payableType: PayableType): Promise<PaymentResponseDto[]>;

  // Validation operations
  getCartOwner(cartId: number): Promise<{ userId: number } | null>;
  checkPayableExists(payableType: PayableType, payableId: number): Promise<boolean>;
  hasRelatedRecords(paymentId: number): Promise<boolean>;

  // Statistics operations
  getPaymentStats(userId?: number): Promise<{
    totalAmount: number;
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
  }>;
  calculateTotalRevenue(userId?: number): Promise<number>;

  // Post-payment operations (these create related records after successful payment)
  createProductOrderFromPayment(paymentId: number): Promise<void>;
  createCourseEnrollmentFromPayment(paymentId: number): Promise<void>;
}

// Example Prisma implementation (you would implement this)
export class PrismaPaymentsRepository implements PaymentsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(dto: CreatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.prisma.payment.create({
      data: dto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        cart: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return this.mapToResponseDto(payment);
  }

  async findAll(filters: any, offset: number, limit: number): Promise<PaymentResponseDto[]> {
    const payments = await this.prisma.payment.findMany({
      where: filters,
      skip: offset,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        cart: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return payments.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<PaymentResponseDto | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        cart: true,
      },
    });

    return payment ? this.mapToResponseDto(payment) : null;
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const payment = await this.prisma.payment.update({
      where: { id },
      data: dto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        cart: true,
      },
    });

    return this.mapToResponseDto(payment);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.payment.delete({
      where: { id },
    });
  }

  async count(filters: any): Promise<number> {
    return this.prisma.payment.count({
      where: filters,
    });
  }

  async findByUser(userId: number): Promise<PaymentResponseDto[]> {
    return this.findAll({ userId }, 0, 100); // Or implement separately
  }

  async findByCart(cartId: number): Promise<PaymentResponseDto[]> {
    return this.findAll({ cartId }, 0, 100); // Or implement separately
  }

  async findByDateRange(startDate: string, endDate: string, userId?: number): Promise<PaymentResponseDto[]> {
    const where: any = {
      createdAt: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };

    if (userId) {
      where.userId = userId;
    }

    const payments = await this.prisma.payment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        cart: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return payments.map(this.mapToResponseDto);
  }

  async findByPayableType(payableType: PayableType): Promise<PaymentResponseDto[]> {
    return this.findAll({ payableType }, 0, 1000);
  }

  async getCartOwner(cartId: number): Promise<{ userId: number } | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      select: { userId: true },
    });

    return cart;
  }

  async checkPayableExists(payableType: PayableType, payableId: number): Promise<boolean> {
    if (payableType === PayableType.PRODUCT) {
      const product = await this.prisma.product.findUnique({
        where: { id: payableId },
        select: { id: true },
      });
      return !!product;
    } else if (payableType === PayableType.COURSE) {
      const course = await this.prisma.course.findUnique({
        where: { id: payableId },
        select: { id: true },
      });
      return !!course;
    }

    return false;
  }

  async hasRelatedRecords(paymentId: number): Promise<boolean> {
    const [productOrders, courseEnrollments] = await Promise.all([
      this.prisma.productOrder.count({ where: { paymentId } }),
      this.prisma.courseEnrollment.count({ where: { paymentId } }),
    ]);

    return productOrders > 0 || courseEnrollments > 0;
  }

  async getPaymentStats(userId?: number): Promise<{
    totalAmount: number;
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
  }> {
    const where = userId ? { userId } : {};

    const [stats, totalAmount] = await Promise.all([
      this.prisma.payment.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      this.prisma.payment.aggregate({
        where: { ...where, status: PaymentStatus.COMPLETED },
        _sum: { amount: true },
      }),
    ]);

    const result = {
      totalAmount: Number(totalAmount._sum.amount || 0),
      totalPayments: 0,
      completedPayments: 0,
      pendingPayments: 0,
      failedPayments: 0,
    };

    stats.forEach((stat) => {
      result.totalPayments += stat._count;
      switch (stat.status) {
        case PaymentStatus.COMPLETED:
          result.completedPayments = stat._count;
          break;
        case PaymentStatus.PENDING:
        case PaymentStatus.COMPLETED:
          result.pendingPayments += stat._count;
          break;
        case PaymentStatus.FAILED:
        case PaymentStatus.CANCELLED:
          result.failedPayments += stat._count;
          break;
      }
    });

    return result;
  }

  async calculateTotalRevenue(userId?: number): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      where: {
        ...(userId && { userId }),
        status: PaymentStatus.COMPLETED,
      },
      _sum: { amount: true },
    });

    return Number(result._sum.amount || 0);
  }

  async createProductOrderFromPayment(paymentId: number): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        cart: {
          include: {
            items: {
              where: { itemType: 'PRODUCT' },
              include: { product: true },
            },
          },
        },
      },
    });

    if (!payment || !payment.cart.items.length) return;

    // Create product order
    const order = await this.prisma.productOrder.create({
      data: {
        buyerId: payment.userId,
        paymentId: payment.id,
        totalPrice: payment.amount,
        status: 'PENDING',
      },
    });

    // Create order items
    const orderItems = payment.cart.items.map((item) => ({
      orderId: order.id,
      productId: item.itemId,
      quantity: item.quantity,
      priceEach: item.price,
    }));

    await this.prisma.productOrderItem.createMany({
      data: orderItems,
    });
  }

  async createCourseEnrollmentFromPayment(paymentId: number): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        cart: {
          include: {
            items: {
              where: { itemType: 'COURSE' },
            },
          },
        },
      },
    });

    if (!payment || !payment.cart.items.length) return;

    // Create course enrollments for each course in cart
    const enrollments = payment.cart.items.map((item) => ({
      courseId: item.itemId,
      studentId: payment.userId,
      paymentId: payment.id,
      pricePaid: item.price,
    }));

    await this.prisma.courseEnrollment.createMany({
      data: enrollments,
    });
  }

  private mapToResponseDto(payment: any): PaymentResponseDto {
    return {
      id: payment.id,
      userId: payment.userId,
      cartId: payment.cartId,
      amount: Number(payment.amount),
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      payableType: payment.payableType,
      payableId: payment.payableId,
      paidAt: payment.paidAt?.toISOString() || null,
      createdAt: payment.createdAt.toISOString(),
      user: payment.user,
      cart: payment.cart ? {
        id: payment.cart.id,
        createdAt: payment.cart.createdAt.toISOString(),
        updatedAt: payment.cart.updatedAt.toISOString(),
      } : undefined,
    };
  }
}