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
exports.PaymentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let PaymentsRepository = class PaymentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.payment.findMany({
            include: { user: true, cart: true },
        });
    }
    async findById(id) {
        return this.prisma.payment.findUnique({
            where: { id },
            include: { user: true, cart: true },
        });
    }
    async findByUser(userId) {
        return this.prisma.payment.findMany({
            where: { userId },
            include: { cart: true },
        });
    }
    async create(data) {
        return this.prisma.payment.create({
            data: {
                userId: data.userId,
                cartId: data.cartId,
                amount: data.amount,
                paymentMethod: data.paymentMethod,
                payableType: data.payableType,
                payableId: data.payableId,
                status: client_1.PaymentStatus.PENDING,
            },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.payment.update({
            where: { id },
            data: { status },
        });
    }
    async cancel(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { status: client_1.PaymentStatus.CANCELLED },
        });
    }
    async verify(id) {
        return this.prisma.payment.update({
            where: { id },
            data: { status: client_1.PaymentStatus.COMPLETED },
        });
    }
};
exports.PaymentsRepository = PaymentsRepository;
exports.PaymentsRepository = PaymentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsRepository);
//# sourceMappingURL=payments.repository.js.map