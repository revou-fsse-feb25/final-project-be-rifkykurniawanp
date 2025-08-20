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
exports.EnrollmentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const update_enrollment_dto_1 = require("./dto/request/update-enrollment.dto");
let EnrollmentsRepository = class EnrollmentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    toResponse(entity) {
        return {
            id: entity.id,
            courseId: entity.courseId,
            studentId: entity.studentId,
            paymentId: entity.paymentId,
            pricePaid: entity.pricePaid.toNumber(),
            progress: entity.progress,
            certificateAwarded: entity.certificateAwarded,
            status: update_enrollment_dto_1.EnrollmentStatus.ACTIVE,
            enrolledAt: entity.enrolledAt,
        };
    }
    async create(dto) {
        const created = await this.prisma.courseEnrollment.create({
            data: {
                ...dto,
                pricePaid: dto.pricePaid,
            },
        });
        return this.toResponse(created);
    }
    async findAll() {
        const records = await this.prisma.courseEnrollment.findMany();
        return records.map((r) => this.toResponse(r));
    }
    async findById(id) {
        const record = await this.prisma.courseEnrollment.findUnique({ where: { id } });
        return record ? this.toResponse(record) : null;
    }
    async update(id, dto) {
        const updated = await this.prisma.courseEnrollment.update({
            where: { id },
            data: {
                ...(dto.progress !== undefined && { progress: dto.progress }),
                ...(dto.certificateAwarded !== undefined && { certificateAwarded: dto.certificateAwarded }),
            },
        });
        return this.toResponse(updated);
    }
    async remove(id) {
        await this.prisma.courseEnrollment.delete({ where: { id } });
    }
};
exports.EnrollmentsRepository = EnrollmentsRepository;
exports.EnrollmentsRepository = EnrollmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsRepository);
//# sourceMappingURL=course-enrollments.repository.js.map