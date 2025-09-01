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
exports.CertificateResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CertificateResponseDto {
    id;
    enrollmentId;
    userId;
    courseId;
    finalLessonsCompleted;
    finalAssignmentsCompleted;
    eligible;
    issuedAt;
    certificateUrl;
}
exports.CertificateResponseDto = CertificateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Unique ID of the certificate' }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Unique ID of the associated enrollment' }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "enrollmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Unique ID of the user who received the certificate (from enrollment.studentId)' }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 201, description: 'Unique ID of the course the certificate is for (from enrollment.courseId)' }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether all required lessons are completed' }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "finalLessonsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether all required assignments are completed' }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "finalAssignmentsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Overall eligibility status for the certificate' }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "eligible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T12:00:00Z',
        description: 'The date and time the certificate was issued',
        required: false,
        type: String,
        format: 'date-time',
    }),
    __metadata("design:type", Date)
], CertificateResponseDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/certificate.pdf',
        description: 'URL to download the certificate PDF',
        required: false,
    }),
    __metadata("design:type", String)
], CertificateResponseDto.prototype, "certificateUrl", void 0);
//# sourceMappingURL=certificate.response.dto.js.map