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
exports.CertificatesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CertificatesRepository = class CertificatesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    includeEnrollment = {
        enrollment: { select: { studentId: true, courseId: true } },
    };
    async findAll() {
        return this.prisma.certificate.findMany({
            include: this.includeEnrollment,
        });
    }
    async findOne(id) {
        return this.prisma.certificate.findUnique({
            where: { id },
            include: this.includeEnrollment,
        });
    }
    async findByEnrollmentId(enrollmentId) {
        return this.prisma.certificate.findUnique({
            where: { enrollmentId },
            include: this.includeEnrollment,
        });
    }
    async findByUser(studentId) {
        return this.prisma.certificate.findMany({
            where: { enrollment: { studentId } },
            include: this.includeEnrollment,
        });
    }
    async findByCourse(courseId) {
        return this.prisma.certificate.findMany({
            where: { enrollment: { courseId } },
            include: this.includeEnrollment,
        });
    }
    async create(data) {
        return this.prisma.certificate.create({
            data,
            include: this.includeEnrollment,
        });
    }
    async update(id, data) {
        return this.prisma.certificate.update({
            where: { id },
            data,
            include: this.includeEnrollment,
        });
    }
    async remove(id) {
        await this.prisma.certificate.delete({ where: { id } });
    }
    async isUserInstructorForCourse(userId, courseId) {
        return true;
    }
    async getCourseProgress(enrollmentId) {
        return {
            finalLessonsCompleted: true,
            finalAssignmentsCompleted: true,
        };
    }
};
exports.CertificatesRepository = CertificatesRepository;
exports.CertificatesRepository = CertificatesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CertificatesRepository);
//# sourceMappingURL=certificates.repository.js.map