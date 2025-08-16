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
    finalLessonsCompleted;
    finalAssignmentsCompleted;
    eligible;
    issuedAt;
    certificateUrl;
}
exports.CertificateResponseDto = CertificateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CertificateResponseDto.prototype, "enrollmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "finalLessonsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "finalAssignmentsCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CertificateResponseDto.prototype, "eligible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z', required: false }),
    __metadata("design:type", Date)
], CertificateResponseDto.prototype, "issuedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/certificate.pdf', required: false }),
    __metadata("design:type", String)
], CertificateResponseDto.prototype, "certificateUrl", void 0);
//# sourceMappingURL=certificate.response.dto.js.map