"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId, role) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, deletedAt: null },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.prisma.payment.create({
            data: {
                userId,
                cartId: dto.cartId,
                amount: dto.amount,
                paymentMethod: dto.paymentMethod,
                status: client_1.PaymentStatus.PENDING,
                payableType: dto.payableType,
                payableId: dto.payableId,
            },
        });
    }
    async findAll(page, limit, role) {
        return this.prisma.payment.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: { user: true, cart: true },
        });
    }
    async getDeleted(page, limit, role) {
        return this.prisma.payment.findMany({
            where: { deletedAt: { not: null } },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async getStats(role) {
        return this.prisma.payment.groupBy({
            by: ['status'],
            _count: { status: true },
            _sum: { amount: true },
        });
    }
    async findByStatus(status, role) {
        return this.prisma.payment.findMany({
            where: { status },
            include: { user: true },
        });
    }
    async findByPayableType(payableType, role) {
        return this.prisma.payment.findMany({
            where: { payableType },
        });
    }
    async findByUser(userId, requestUserId, role) {
        if (role !== 'ADMIN' && userId !== requestUserId) {
            throw new common_1.BadRequestException('Not authorized to view this user’s payments');
        }
        return this.prisma.payment.findMany({ where: { userId } });
    }
    async getUserPaymentStats(userId, requestUserId, role) {
        if (role !== 'ADMIN' && userId !== requestUserId) {
            throw new common_1.BadRequestException('Not authorized');
        }
        return this.prisma.payment.groupBy({
            by: ['status'],
            where: { userId },
            _count: { status: true },
            _sum: { amount: true },
        });
    }
    async findOne(id, requestUserId, role) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: { user: true, cart: true },
        });
        if (!payment)
            throw new common_1.NotFoundException('Payment not found');
        if (role !== 'ADMIN' && payment.userId !== requestUserId) {
            throw new common_1.BadRequestException('Not authorized to view this payment');
        }
        return payment;
    }
    async update(id, dto, requestUserId, role) {
        const payment = await this.findOne(id, requestUserId, role);
        return this.prisma.payment.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, requestUserId, role) {
        const payment = await this.findOne(id, requestUserId, role);
        return this.prisma.payment.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async forceDelete(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.BadRequestException('Only admin can delete permanently');
        return this.prisma.payment.delete({ where: { id } });
    }
    async restore(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.BadRequestException('Only admin can restore');
        return this.prisma.payment.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payments.service.js.map