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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersRepository = class UsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                ...data,
                role: data.role ?? 'USER',
            },
        });
    }
    async findById(id, filters = { deletedAt: null }) {
        return this.prisma.user.findFirst({
            where: { id, ...filters },
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async findByEmail(email, filters = { deletedAt: null }) {
        return this.prisma.user.findFirst({
            where: { email, ...filters },
        });
    }
    async findByEmailIncludingDeleted(email) {
        return this.prisma.user.findFirst({
            where: { email },
        });
    }
    async findAll(skip = 0, take = 10, filters = { deletedAt: null }) {
        return this.prisma.user.findMany({
            where: { ...filters },
            skip,
            take,
            orderBy: { id: 'asc' },
        });
    }
    async findByRole(role, filters = { deletedAt: null }) {
        return this.prisma.user.findMany({
            where: { role, ...filters },
        });
    }
    async countByRole(role, filters = { deletedAt: null }) {
        return this.prisma.user.count({
            where: { role, ...filters },
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async softDelete(id) {
        return this.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async hardDelete(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async restore(id) {
        return this.prisma.user.update({
            where: { id },
            data: { deletedAt: null },
        });
    }
    async findDeleted(skip = 0, take = 10) {
        return this.prisma.user.findMany({
            where: { NOT: { deletedAt: null } },
            skip,
            take,
        });
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map