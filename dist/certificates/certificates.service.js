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
exports.CertificatesService = void 0;
const common_1 = require("@nestjs/common");
const certificates_repository_1 = require("./certificates.repository");
let CertificatesService = class CertificatesService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    mapToResponseDto(cert) {
        return {
            id: cert.id,
            enrollmentId: cert.enrollmentId,
            userId: cert.enrollment.studentId,
            courseId: cert.enrollment.courseId,
            finalLessonsCompleted: cert.finalLessonsCompleted,
            finalAssignmentsCompleted: cert.finalAssignmentsCompleted,
            eligible: cert.eligible,
            issuedAt: cert.issuedAt ?? undefined,
            certificateUrl: cert.certificateUrl ?? undefined,
        };
    }
    async findAll() {
        const certificates = await this.repository.findAll();
        return certificates.map(this.mapToResponseDto);
    }
    async findOne(id) {
        const certificate = await this.repository.findOne(id);
        if (!certificate) {
            throw new common_1.NotFoundException(`Certificate with ID ${id} not found.`);
        }
        return this.mapToResponseDto(certificate);
    }
    async findByUser(userId) {
        const certificates = await this.repository.findByUser(userId);
        return certificates.map(this.mapToResponseDto);
    }
    async findByCourse(courseId, user) {
        const isInstructor = await this.repository.isUserInstructorForCourse(user.id, courseId);
        if (!isInstructor && user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('User is not an instructor for this course.');
        }
        const certificates = await this.repository.findByCourse(courseId);
        return certificates.map(this.mapToResponseDto);
    }
    async generateCertificate(dto) {
        const { enrollmentId } = dto;
        const existingCertificate = await this.repository.findByEnrollmentId(enrollmentId);
        if (existingCertificate) {
            throw new common_1.ConflictException('A certificate has already been issued for this enrollment.');
        }
        const eligibility = await this.checkEligibility(enrollmentId);
        if (!eligibility.eligible) {
            throw new common_1.BadRequestException('User is not eligible to receive this certificate.');
        }
        const certificate = await this.repository.create({
            ...eligibility,
            issuedAt: new Date(),
            enrollment: { connect: { id: enrollmentId } },
        });
        return this.mapToResponseDto(certificate);
    }
    async verifyEligibility(certificateId) {
        const certificate = await this.repository.findOne(certificateId);
        if (!certificate) {
            throw new common_1.NotFoundException(`Certificate with ID ${certificateId} not found.`);
        }
        const eligibility = await this.checkEligibility(certificate.enrollmentId);
        const updated = await this.repository.update(certificateId, { ...eligibility });
        return this.mapToResponseDto(updated);
    }
    async downloadPdf(id) {
        await this.findOne(id);
        return { message: 'PDF download initiated (mocked)' };
    }
    async remove(id) {
        const certificate = await this.repository.findOne(id);
        if (!certificate) {
            throw new common_1.NotFoundException(`Certificate with ID ${id} not found.`);
        }
        await this.repository.remove(id);
    }
    async checkEligibility(enrollmentId) {
        const progress = await this.repository.getCourseProgress(enrollmentId);
        return {
            finalLessonsCompleted: progress.finalLessonsCompleted,
            finalAssignmentsCompleted: progress.finalAssignmentsCompleted,
            eligible: progress.finalLessonsCompleted && progress.finalAssignmentsCompleted,
        };
    }
};
exports.CertificatesService = CertificatesService;
exports.CertificatesService = CertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [certificates_repository_1.CertificatesRepository])
], CertificatesService);
//# sourceMappingURL=certificates.service.js.map