"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPaymentsRepository = void 0;
const client_1 = require("@prisma/client");
class PrismaPaymentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
    async findAll(filters, offset, limit) {
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
    async findOne(id) {
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
    async update(id, dto) {
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
    async remove(id) {
        await this.prisma.payment.delete({
            where: { id },
        });
    }
    async count(filters) {
        return this.prisma.payment.count({
            where: filters,
        });
    }
    async findByUser(userId) {
        return this.findAll({ userId }, 0, 100);
    }
    async findByCart(cartId) {
        return this.findAll({ cartId }, 0, 100);
    }
    async findByDateRange(startDate, endDate, userId) {
        const where = {
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
    async findByPayableType(payableType) {
        return this.findAll({ payableType }, 0, 1000);
    }
    async getCartOwner(cartId) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            select: { userId: true },
        });
        return cart;
    }
    async checkPayableExists(payableType, payableId) {
        if (payableType === client_1.PayableType.PRODUCT) {
            const product = await this.prisma.product.findUnique({
                where: { id: payableId },
                select: { id: true },
            });
            return !!product;
        }
        else if (payableType === client_1.PayableType.COURSE) {
            const course = await this.prisma.course.findUnique({
                where: { id: payableId },
                select: { id: true },
            });
            return !!course;
        }
        return false;
    }
    async hasRelatedRecords(paymentId) {
        const [productOrders, courseEnrollments] = await Promise.all([
            this.prisma.productOrder.count({ where: { paymentId } }),
            this.prisma.courseEnrollment.count({ where: { paymentId } }),
        ]);
        return productOrders > 0 || courseEnrollments > 0;
    }
    async getPaymentStats(userId) {
        const where = userId ? { userId } : {};
        const [stats, totalAmount] = await Promise.all([
            this.prisma.payment.groupBy({
                by: ['status'],
                where,
                _count: true,
            }),
            this.prisma.payment.aggregate({
                where: { ...where, status: client_1.PaymentStatus.COMPLETED },
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
                case client_1.PaymentStatus.COMPLETED:
                    result.completedPayments = stat._count;
                    break;
                case client_1.PaymentStatus.PENDING:
                case client_1.PaymentStatus.PROCESSING:
                    result.pendingPayments += stat._count;
                    break;
                case client_1.PaymentStatus.FAILED:
                case client_1.PaymentStatus.CANCELLED:
                    result.failedPayments += stat._count;
                    break;
            }
        });
        return result;
    }
    async calculateTotalRevenue(userId) {
        const result = await this.prisma.payment.aggregate({
            where: {
                ...(userId && { userId }),
                status: client_1.PaymentStatus.COMPLETED,
            },
            _sum: { amount: true },
        });
        return Number(result._sum.amount || 0);
    }
    async createProductOrderFromPayment(paymentId) {
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
        if (!payment || !payment.cart.items.length)
            return;
        const order = await this.prisma.productOrder.create({
            data: {
                buyerId: payment.userId,
                paymentId: payment.id,
                totalPrice: payment.amount,
                status: 'PENDING',
            },
        });
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
    async createCourseEnrollmentFromPayment(paymentId) {
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
        if (!payment || !payment.cart.items.length)
            return;
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
    mapToResponseDto(payment) {
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
exports.PrismaPaymentsRepository = PrismaPaymentsRepository;
//# sourceMappingURL=payments.repository.js.map