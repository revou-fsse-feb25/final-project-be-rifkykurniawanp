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
exports.EnrollmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EnrollmentResponseDto {
    id;
    courseId;
    studentId;
    paymentId;
    pricePaid;
    progress;
    certificateAwarded;
    enrolledAt;
}
exports.EnrollmentResponseDto = EnrollmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200000.00 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "pricePaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], EnrollmentResponseDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], EnrollmentResponseDto.prototype, "certificateAwarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", Date)
], EnrollmentResponseDto.prototype, "enrolledAt", void 0);
//# sourceMappingURL=enrollment.response.dto.js.map