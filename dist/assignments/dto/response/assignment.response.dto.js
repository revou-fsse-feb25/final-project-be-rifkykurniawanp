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
exports.AssignmentListResponseDto = exports.AssignmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AssignmentResponseDto {
    id;
    lessonId;
    title;
    instructions;
    dueDate;
    createdAt;
    _count;
    userSubmission;
}
exports.AssignmentResponseDto = AssignmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], AssignmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], AssignmentResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Essay on Climate Change' }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Write a 2000-word essay...' }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-09-01T23:59:59Z' }),
    __metadata("design:type", Object)
], AssignmentResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-20T10:00:00Z' }),
    __metadata("design:type", Date)
], AssignmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { submissions: 5 },
        description: 'Optional relation counts',
    }),
    __metadata("design:type", Object)
], AssignmentResponseDto.prototype, "_count", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: {
            id: 101,
            content: 'My essay content...',
            grade: 90,
            submittedAt: '2025-08-20T11:00:00Z',
        },
        description: 'Student’s submission if exists',
    }),
    __metadata("design:type", Object)
], AssignmentResponseDto.prototype, "userSubmission", void 0);
class AssignmentListResponseDto {
    assignments;
    total;
    page;
    limit;
}
exports.AssignmentListResponseDto = AssignmentListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AssignmentResponseDto] }),
    __metadata("design:type", Array)
], AssignmentListResponseDto.prototype, "assignments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 50 }),
    __metadata("design:type", Number)
], AssignmentListResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    __metadata("design:type", Number)
], AssignmentListResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10 }),
    __metadata("design:type", Number)
], AssignmentListResponseDto.prototype, "limit", void 0);
//# sourceMappingURL=assignment.response.dto.js.map