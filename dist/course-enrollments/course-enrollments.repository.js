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
exports.CourseEnrollmentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseEnrollmentsRepository = class CourseEnrollmentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    enroll(dto) {
        return this.prisma.courseEnrollment.create({ data: { ...dto, paymentId: dto.paymentId } });
    }
    findAll() {
        return this.prisma.courseEnrollment.findMany({ include: { course: true, student: true, payment: true, certificate: true } });
    }
    findOne(id) {
        return this.prisma.courseEnrollment.findUnique({ where: { id }, include: { course: true, student: true, payment: true, certificate: true } });
    }
    update(id, dto) {
        return this.prisma.courseEnrollment.update({ where: { id }, data: dto });
    }
    remove(id) {
        return this.prisma.courseEnrollment.delete({ where: { id } });
    }
};
exports.CourseEnrollmentsRepository = CourseEnrollmentsRepository;
exports.CourseEnrollmentsRepository = CourseEnrollmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseEnrollmentsRepository);
//# sourceMappingURL=course-enrollments.repository.js.map