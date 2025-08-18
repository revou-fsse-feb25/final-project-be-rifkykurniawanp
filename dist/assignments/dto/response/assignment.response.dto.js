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
exports.AssignmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AssignmentResponseDto {
    id;
    lessonId;
    title;
    instructions;
    dueDate;
    createdAt;
    updatedAt;
}
exports.AssignmentResponseDto = AssignmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], AssignmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], AssignmentResponseDto.prototype, "lessonId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Intro Assignment' }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Complete the quiz and submit screenshots', required: false }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-20T23:59:00Z', required: false }),
    __metadata("design:type", String)
], AssignmentResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", Date)
], AssignmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-16T12:00:00Z' }),
    __metadata("design:type", Date)
], AssignmentResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=assignment.response.dto.js.map